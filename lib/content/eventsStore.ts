import {
  collection,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  writeBatch,
  getFirebaseDb,
} from "@/lib/firebase/firestore";
import { defaultEventsContent } from "./defaults";
import {
  mergeEventsContent,
  normalizeEventPost,
  sortEventsBySchedule,
} from "./events";
import type { EventPost, EventsContent } from "./types";

const EVENTS_PAGE_REF = ["pages", "events"] as const;
const ENTRIES_COLLECTION = "entries";

type EventsPageMeta = {
  heroTitle?: string;
  heading?: string;
  entriesReady?: boolean;
};

function entriesCollection() {
  return collection(getFirebaseDb(), ...EVENTS_PAGE_REF, ENTRIES_COLLECTION);
}

function entryDoc(id: string) {
  if (!id?.trim()) {
    throw new Error("Cannot save an event without a valid id.");
  }
  return doc(getFirebaseDb(), ...EVENTS_PAGE_REF, ENTRIES_COLLECTION, id);
}

function eventDocPayload(post: EventPost) {
  return {
    title: post.title,
    coverImage: post.coverImage,
    image: post.image,
    kind: post.kind,
    startsAt: post.startsAt,
    endsAt: post.endsAt,
    location: post.location,
    summary: post.summary,
    body: post.body,
    createdAt: post.createdAt,
  };
}

async function loadPostsFromEntries(): Promise<EventPost[]> {
  const snap = await getDocs(entriesCollection());
  return snap.docs.map((item) =>
    normalizeEventPost({
      id: item.id,
      ...(item.data() as Partial<EventPost>),
    })
  );
}

export async function loadEventsContent(): Promise<EventsContent> {
  const pageSnap = await getDoc(doc(getFirebaseDb(), ...EVENTS_PAGE_REF));
  const meta = (pageSnap.exists() ? pageSnap.data()?.content : undefined) as
    | EventsPageMeta
    | undefined;

  const entryPosts = await loadPostsFromEntries();

  if (meta?.entriesReady) {
    return mergeEventsContent({
      heroTitle: meta.heroTitle,
      heading: meta.heading,
      posts: sortEventsBySchedule(entryPosts),
    });
  }

  if (entryPosts.length === 0) {
    return structuredClone(defaultEventsContent);
  }

  return mergeEventsContent({
    heroTitle: meta?.heroTitle,
    heading: meta?.heading,
    posts: sortEventsBySchedule(entryPosts),
  });
}

export async function loadEventById(id: string): Promise<EventPost | null> {
  const snap = await getDoc(entryDoc(id));
  if (snap.exists()) {
    return normalizeEventPost({
      id: snap.id,
      ...(snap.data() as Partial<EventPost>),
    });
  }

  const all = await loadEventsContent();
  return all.posts.find((post) => post.id === id) ?? null;
}

export async function saveEventsContent(content: EventsContent) {
  const db = getFirebaseDb();
  const pageRef = doc(db, ...EVENTS_PAGE_REF);

  await setDoc(
    pageRef,
    {
      content: {
        heroTitle: content.heroTitle,
        heading: content.heading,
        entriesReady: true,
      },
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );

  const existing = await getDocs(entriesCollection());
  const keepIds = new Set(content.posts.map((post) => post.id));
  const batch = writeBatch(db);

  for (const item of existing.docs) {
    if (!keepIds.has(item.id)) {
      batch.delete(item.ref);
    }
  }

  for (const post of content.posts) {
    batch.set(entryDoc(post.id), eventDocPayload(post), { merge: true });
  }

  await batch.commit();
}
