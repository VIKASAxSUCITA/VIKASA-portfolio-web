"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  getDefaultContent,
  loadPageContent,
  savePageContent,
} from "@/lib/content/firestore";
import {
  deleteRemovedBlobs,
  resolvePendingImages,
} from "@/lib/content/pendingImages";
import type { PageContentMap, PageId } from "@/lib/content/types";

export function usePageEditor<T extends PageId>(pageId: T) {
  const [content, setContent] = useState<PageContentMap[T]>(() =>
    getDefaultContent(pageId)
  );
  const savedRef = useRef<PageContentMap[T]>(getDefaultContent(pageId));
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const data = await loadPageContent(pageId);
        if (active) {
          setContent(data);
          savedRef.current = data;
          setDirty(false);
        }
      } catch (error) {
        console.error(error);
        if (active) {
          setMessage("Could not load saved content. Showing defaults.");
        }
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [pageId]);

  const update = useCallback(
    (updater: (prev: PageContentMap[T]) => PageContentMap[T]) => {
      setContent((prev) => updater(prev));
      setDirty(true);
      setMessage("");
    },
    []
  );

  const save = useCallback(async () => {
    setSaving(true);
    setMessage("");
    try {
      const resolved = await resolvePendingImages(content);
      await deleteRemovedBlobs(savedRef.current, resolved);
      setContent(resolved);
      await savePageContent(pageId, resolved);
      savedRef.current = resolved;
      setDirty(false);
      setMessage("Saved.");
    } catch (error) {
      console.error(error);
      const text =
        error instanceof Error ? error.message : "Save failed.";
      setMessage(text);
    } finally {
      setSaving(false);
    }
  }, [pageId, content]);

  return { content, loading, saving, dirty, message, update, save };
}
