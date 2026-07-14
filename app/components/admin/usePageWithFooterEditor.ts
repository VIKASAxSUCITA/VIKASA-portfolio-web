"use client";

import { useCallback } from "react";
import { usePageEditor } from "@/app/components/admin/usePageEditor";
import type { PageContentMap, PageId } from "@/lib/content/types";

type PageWithFooterId = Exclude<PageId, "footer">;

export function usePageWithFooterEditor<T extends PageWithFooterId>(pageId: T) {
  const pageEditor = usePageEditor(pageId);
  const footerEditor = usePageEditor("footer");

  const dirty = pageEditor.dirty || footerEditor.dirty;
  const loading = pageEditor.loading || footerEditor.loading;
  const saving = pageEditor.saving || footerEditor.saving;
  const message = pageEditor.message || footerEditor.message;

  const save = useCallback(async () => {
    if (pageEditor.dirty) {
      await pageEditor.save();
    }
    if (footerEditor.dirty) {
      await footerEditor.save();
    }
  }, [
    pageEditor.dirty,
    pageEditor.save,
    footerEditor.dirty,
    footerEditor.save,
  ]);

  return {
    content: pageEditor.content as PageContentMap[T],
    update: pageEditor.update,
    footerContent: footerEditor.content,
    footerUpdate: footerEditor.update,
    loading,
    saving,
    dirty,
    message,
    save,
  };
}
