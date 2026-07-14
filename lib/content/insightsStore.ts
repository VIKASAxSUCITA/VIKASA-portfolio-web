import {
  collection,
  deleteField,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { getFirebaseDb } from "@/lib/firebase";
import { defaultInsightsContent } from "./defaults";
import {
  mergeInsightsContent,
  normalizeInsightPost,
  sortInsightsByLatest,
} from "./insights";
import type { InsightPost, InsightsContent } from "./types";

/** Page chrome for the Insights listing lives here. */
const INSIGHTS_PAGE_REF = ["pages", "insights"] as const;

/**
 * Each insight article is a document under:
 * pages/insights/entries/{insight_id}
 */
const ENTRIES_COLLECTION = "entries";

/** Older top-level collection used briefly — still read for migration. */
const LEGACY_TOP_LEVEL = "insights";

type InsightsPageMeta = {
  heroTitle?: string;
  heading?: string;
  /**
   * Once true, an empty entries collection means "user deleted everything",
   * not "fall back to demo defaults".
   */
  entriesReady?: boolean;
  /** @deprecated Legacy embedded posts array on the page doc. */
  posts?: Array<
    Partial<InsightPost> & { id?: string; title?: string; image?: string }
  >;
};

function entriesCollection() {
  return collection(
    getFirebaseDb(),
    ...INSIGHTS_PAGE_REF,
    ENTRIES_COLLECTION
  );
}

function entryDoc(id: string) {
  return doc(getFirebaseDb(), ...INSIGHTS_PAGE_REF, ENTRIES_COLLECTION, id);
}

function insightDocPayload(post: InsightPost) {
  return {
    title: post.title,
    image: post.image,
    category: post.category,
    author: post.author,
    quote: post.quote,
    sectionTitle: post.sectionTitle,
    paragraphs: post.paragraphs,
    pairedImages: post.pairedImages,
    createdAt: post.createdAt,
  };
}

function fromLegacyPosts(meta: InsightsPageMeta | undefined): InsightPost[] {
  if (!meta?.posts?.length) return [];
  return meta.posts.map((post, index) =>
    normalizeInsightPost({
      ...post,
      id: post.id || `insight_${index + 1}`,
    })
  );
}

async function loadPostsFromEntries(): Promise<InsightPost[]> {
  const snap = await getDocs(entriesCollection());
  return snap.docs.map((item) =>
    normalizeInsightPost({
      id: item.id,
      ...(item.data() as Partial<InsightPost>),
    })
  );
}

async function loadPostsFromLegacyTopLevel(): Promise<InsightPost[]> {
  const snap = await getDocs(collection(getFirebaseDb(), LEGACY_TOP_LEVEL));
  return snap.docs.map((item) =>
    normalizeInsightPost({
      id: item.id,
      ...(item.data() as Partial<InsightPost>),
    })
  );
}

/** Full insights payload used by admin + public listing pages. */
export async function loadInsightsContent(): Promise<InsightsContent> {
  const pageSnap = await getDoc(doc(getFirebaseDb(), ...INSIGHTS_PAGE_REF));
  const meta = (pageSnap.exists() ? pageSnap.data()?.content : undefined) as
    | InsightsPageMeta
    | undefined;

  const entryPosts = await loadPostsFromEntries();

  // Managed catalog: trust entries even when empty (deletes must stick).
  if (meta?.entriesReady) {
    return mergeInsightsContent({
      heroTitle: meta.heroTitle,
      heading: meta.heading,
      posts: sortInsightsByLatest(entryPosts),
    });
  }

  let posts = entryPosts;

  if (posts.length === 0) {
    posts = await loadPostsFromLegacyTopLevel();
  }

  if (posts.length === 0) {
    posts = fromLegacyPosts(meta);
  }

  if (posts.length === 0) {
    return structuredClone(defaultInsightsContent);
  }

  return mergeInsightsContent({
    heroTitle: meta?.heroTitle,
    heading: meta?.heading,
    posts: sortInsightsByLatest(posts),
  });
}

export async function loadInsightById(
  id: string
): Promise<InsightPost | null> {
  const snap = await getDoc(entryDoc(id));
  if (snap.exists()) {
    return normalizeInsightPost({
      id: snap.id,
      ...(snap.data() as Partial<InsightPost>),
    });
  }

  const legacy = await getDoc(doc(getFirebaseDb(), LEGACY_TOP_LEVEL, id));
  if (legacy.exists()) {
    return normalizeInsightPost({
      id: legacy.id,
      ...(legacy.data() as Partial<InsightPost>),
    });
  }

  const all = await loadInsightsContent();
  return all.posts.find((post) => post.id === id) ?? null;
}

export async function loadLatestInsightPosts(
  count = 3
): Promise<InsightPost[]> {
  const { posts } = await loadInsightsContent();
  return sortInsightsByLatest(posts).slice(0, count);
}

/**
 * Save listing chrome on pages/insights, and each article as
 * pages/insights/entries/{id} with full detail fields.
 */
export async function saveInsightsContent(content: InsightsContent) {
  const db = getFirebaseDb();
  const pageRef = doc(db, ...INSIGHTS_PAGE_REF);

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

  try {
    await updateDoc(pageRef, { "content.posts": deleteField() });
  } catch {
    // Field may not exist yet.
  }

  const existing = await getDocs(entriesCollection());
  const keepIds = new Set(content.posts.map((post) => post.id));
  const batch = writeBatch(db);

  for (const item of existing.docs) {
    if (!keepIds.has(item.id)) {
      batch.delete(item.ref);
    }
  }

  for (const post of content.posts) {
    batch.set(entryDoc(post.id), insightDocPayload(post), { merge: true });
  }

  await batch.commit();

  try {
    const legacySnap = await getDocs(collection(db, LEGACY_TOP_LEVEL));
    if (!legacySnap.empty) {
      const legacyBatch = writeBatch(db);
      for (const item of legacySnap.docs) {
        legacyBatch.delete(item.ref);
      }
      await legacyBatch.commit();
    }
  } catch {
    // Ignore if collection/rules unavailable
  }
}
