"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  fillEventsContentLocales,
  fillInsightsContentLocales,
} from "@/lib/content/autoTranslate";
import {
  getDefaultContent,
  loadPageContent,
  savePageContent,
} from "@/lib/content/firestore";
import {
  deleteRemovedBlobs,
  resolvePendingImages,
  applyUploadedBlobCache,
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
        let resolved = await resolvePendingImages(snapshot);

        if (pageId === "insights") {
          setMessage("Translating empty KM/ZH…");
          resolved = (await fillInsightsContentLocales(
            resolved as PageContentMap["insights"]
          )) as PageContentMap[T];
        }
        if (pageId === "events") {
          setMessage("Translating empty KM/ZH…");
          resolved = (await fillEventsContentLocales(
            resolved as PageContentMap["events"]
          )) as PageContentMap[T];
        }

        await savePageContent(pageId, resolved);
        setContent(resolved);
        savedRef.current = resolved;
        setDirty(false);
        setMessage("Saved.");
        await deleteRemovedBlobs(previous, resolved);
        return resolved;
      } catch (error) {
        console.error(error);
        // Keep any images that already uploaded so retry doesn't ask to re-pick them.
        setContent(applyUploadedBlobCache(snapshot));
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

  const discard = useCallback(() => {
    setContent(savedRef.current);
    setDirty(false);
    setMessage("");
  }, []);

  return {
    content,
    loading,
    saving,
    dirty,
    message,
    update,
    save,
    saveSnapshot,
    discard,
  };
}
