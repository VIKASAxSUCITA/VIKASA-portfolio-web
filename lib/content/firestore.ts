import {
  doc,
  setDoc,
  serverTimestamp,
  getFirebaseDb,
} from "@/lib/firebase/firestore";
import { getDocSafe } from "@/lib/firebase/safeRead";
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
import {
  defaultServicesContent,
  normalizeServicesContent,
} from "./services";
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
  services: defaultServicesContent,
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

  try {
    const snap = await getDocSafe(doc(getFirebaseDb(), "pages", pageId));
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
    if (pageId === "services") {
      return normalizeServicesContent(
        data as Partial<PageContentMap["services"]>
      ) as PageContentMap[T];
    }
    return data;
  } catch (error) {
    console.error(`loadPageContent(${pageId}) failed; using defaults.`, error);
    return getDefaultContent(pageId);
  }
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

  const toSave =
    pageId === "services"
      ? normalizeServicesContent(content as PageContentMap["services"])
      : content;

  await setDoc(
    doc(getFirebaseDb(), "pages", pageId),
    {
      content: toSave,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );

  // Keep home service cards in sync with the services CMS.
  if (pageId === "services") {
    const services = (toSave as PageContentMap["services"]).services;
    const home = await loadPageContent("home");
    const nextHome: HomeContent = {
      ...home,
      services: {
        ...home.services,
        cards: services.map((service) => ({
          title: service.title,
          description: service.description,
          items: service.items,
        })),
      },
    };
    await setDoc(
      doc(getFirebaseDb(), "pages", "home"),
      {
        content: nextHome,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  }
}
