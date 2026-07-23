import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { getFirebaseDb } from "@/lib/firebase";
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
import type {
  AboutContent,
  FooterContent,
  HomeContent,
  PageContentMap,
  PageId,
} from "./types";

const ABOUT_US_IMAGE = "/assets/img/vikasa/aboutUs_image.png";

function mergeHomeContent(saved: Partial<HomeContent>): HomeContent {
  const defaults = defaultHomeContent;
  const merged: HomeContent = {
    ...defaults,
    ...saved,
    hero: { ...defaults.hero, ...saved.hero },
    about: {
      ...defaults.about,
      ...saved.about,
      image: ABOUT_US_IMAGE,
    },
    cta: { ...defaults.cta, ...saved.cta },
    services: { ...defaults.services, ...saved.services },
    contact: { ...defaults.contact, ...saved.contact },
  };

  // Prefer current defaults for service card labels when CMS still has older copy.
  if (merged.services?.cards) {
    merged.services = {
      ...merged.services,
      cards: merged.services.cards.map((card) => {
        if (card.title !== "Business Enhancement" || !card.items) return card;
        return {
          ...card,
          items: card.items.map((item) =>
            item === "Market Intelligence & Advisory"
              ? "Market Intelligence"
              : item
          ),
        };
      }),
    };
  }

  return merged;
}

function mergeAboutContent(saved: Partial<AboutContent>): AboutContent {
  const defaults = defaultAboutContent;
  return {
    ...defaults,
    ...saved,
    hero: { ...defaults.hero, ...saved.hero },
    whatWeDo: {
      ...defaults.whatWeDo,
      ...saved.whatWeDo,
      image: ABOUT_US_IMAGE,
    },
    story: { ...defaults.story, ...saved.story },
    vision: { ...defaults.vision, ...saved.vision },
    mission: { ...defaults.mission, ...saved.mission },
  };
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
