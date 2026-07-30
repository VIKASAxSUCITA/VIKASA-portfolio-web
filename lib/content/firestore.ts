import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  getFirebaseDb,
} from "@/lib/firebase/firestore";
import {
  defaultAboutContent,
  defaultEventsContent,
  defaultFooterContent,
  defaultHomeContent,
  defaultInsightsContent,
} from "./defaults";
import {
  loadEventsContent,
  saveEventsContent,
} from "./eventsStore";
import {
  loadInsightsContent,
  saveInsightsContent,
} from "./insightsStore";
import {
  normalizeAboutContent,
  normalizeHomeContent,
} from "./localizeContent";
import type {
  AboutContent,
  FooterContent,
  HomeContent,
  PageContentMap,
  PageId,
} from "./types";

function mergeHomeContent(saved: Partial<HomeContent>): HomeContent {
  return normalizeHomeContent(saved);
}

function mergeAboutContent(saved: Partial<AboutContent>): AboutContent {
  return normalizeAboutContent(saved);
}

function mergeFooterContent(saved: Partial<FooterContent>): FooterContent {
  const defaults = defaultFooterContent;
  return {
    ...defaults,
    ...saved,
    social: { ...defaults.social, ...saved.social },
    contact: { ...defaults.contact, ...saved.contact },
  };
}

const defaults: PageContentMap = {
  home: defaultHomeContent,
  about: defaultAboutContent,
  insights: defaultInsightsContent,
  events: defaultEventsContent,
  footer: defaultFooterContent,
};

export function getDefaultContent<T extends PageId>(pageId: T): PageContentMap[T] {
  return structuredClone(defaults[pageId]);
}

export async function loadPageContent<T extends PageId>(
  pageId: T
): Promise<PageContentMap[T]> {
  if (pageId === "insights") {
    return (await loadInsightsContent()) as PageContentMap[T];
  }
  if (pageId === "events") {
    return (await loadEventsContent()) as PageContentMap[T];
  }

  const snap = await getDoc(doc(getFirebaseDb(), "pages", pageId));
  if (!snap.exists()) {
    return getDefaultContent(pageId);
  }
  const data = snap.data()?.content as PageContentMap[T] | undefined;
  if (!data) return getDefaultContent(pageId);
  if (pageId === "home") {
    return mergeHomeContent(data as Partial<HomeContent>) as PageContentMap[T];
  }
  if (pageId === "about") {
    return mergeAboutContent(data as Partial<AboutContent>) as PageContentMap[T];
  }
  if (pageId === "footer") {
    return mergeFooterContent(data as Partial<FooterContent>) as PageContentMap[T];
  }
  return data;
}

export async function savePageContent<T extends PageId>(
  pageId: T,
  content: PageContentMap[T]
) {
  if (pageId === "insights") {
    await saveInsightsContent(content as PageContentMap["insights"]);
    return;
  }
  if (pageId === "events") {
    await saveEventsContent(content as PageContentMap["events"]);
    return;
  }

  await setDoc(
    doc(getFirebaseDb(), "pages", pageId),
    {
      content,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}
