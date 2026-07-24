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

  const saveSnapshot = useCallback(
    async (snapshot: PageContentMap[T]) => {
      setSaving(true);
      setMessage("");
      const previous = savedRef.current;
      try {
        // 1) Upload new previews → permanent Blob URLs
        const resolved = await resolvePendingImages(snapshot);
        // 2) Persist content first so the site never points at deleted files
        await savePageContent(pageId, resolved);
        setContent(resolved);
        savedRef.current = resolved;
        setDirty(false);
        setMessage("Saved.");
        // 3) Remove replaced/orphaned Blob files (home, about, insights, events, …)
        await deleteRemovedBlobs(previous, resolved);
        return resolved;
      } catch (error) {
        console.error(error);
        const text =
          error instanceof Error ? error.message : "Save failed.";
        setMessage(text);
        throw error;
      } finally {
        setSaving(false);
      }
    },
    [pageId]
  );

  const save = useCallback(async () => {
    await saveSnapshot(content);
  }, [content, saveSnapshot]);

  return {
    content,
    loading,
    saving,
    dirty,
    message,
    update,
    save,
    saveSnapshot,
  };
}
