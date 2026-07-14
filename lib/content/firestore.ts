import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { getFirebaseDb } from "@/lib/firebase";
import {
  defaultAboutContent,
  defaultBlogDetailsContent,
  defaultFooterContent,
  defaultHomeContent,
  defaultInsightsContent,
} from "./defaults";
import type { PageContentMap, PageId } from "./types";

const defaults: PageContentMap = {
  home: defaultHomeContent,
  about: defaultAboutContent,
  insights: defaultInsightsContent,
  "blog-details": defaultBlogDetailsContent,
  footer: defaultFooterContent,
};

export function getDefaultContent<T extends PageId>(pageId: T): PageContentMap[T] {
  return structuredClone(defaults[pageId]);
}

export async function loadPageContent<T extends PageId>(
  pageId: T
): Promise<PageContentMap[T]> {
  const snap = await getDoc(doc(getFirebaseDb(), "pages", pageId));
  if (!snap.exists()) {
    return getDefaultContent(pageId);
  }
  const data = snap.data()?.content as PageContentMap[T] | undefined;
  return data ?? getDefaultContent(pageId);
}

export async function savePageContent<T extends PageId>(
  pageId: T,
  content: PageContentMap[T]
) {
  await setDoc(
    doc(getFirebaseDb(), "pages", pageId),
    {
      content,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}
