"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import AdminGuard from "@/app/components/admin/AdminGuard";
import AdminInsightDetailEditor from "@/app/components/admin/AdminInsightDetailEditor";
import AdminShell from "@/app/components/admin/AdminShell";
import { usePageEditor } from "@/app/components/admin/usePageEditor";
import AutoTranslateButton from "@/app/components/i18n/AutoTranslateButton";
import LocaleEditTabs from "@/app/components/i18n/LocaleEditTabs";
import { createEmptyInsight } from "@/lib/content/insights";
import {
  extractBodyImageSrcs,
  withSyncedBodyImages,
} from "@/lib/content/insightHtml";
import { applyUploadedBlobCache } from "@/lib/content/pendingImages";
import type { InsightPost } from "@/lib/content/types";
import type { Locale } from "@/lib/i18n/locale";

function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 7h14M10 11v6M14 11v6M8 7l1-2h6l1 2M7 7l1 12h8l1-12"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type Props = {
  postId: string | "new";
};

export default function AdminInsightEditorClient({ postId }: Props) {
  const router = useRouter();
  const { content, loading, saving, message, saveSnapshot } =
    usePageEditor("insights");
  const [editLocale, setEditLocale] = useState<Locale>("en");
  const [draft, setDraft] = useState<InsightPost | null>(null);
  const [dirty, setDirty] = useState(false);
  const [localMessage, setLocalMessage] = useState("");
  const readyRef = useRef(false);

  const isNew = postId === "new";

  useEffect(() => {
    if (loading || readyRef.current) return;
    if (isNew) {
      setDraft(createEmptyInsight());
      setDirty(false);
      readyRef.current = true;
      return;
    }
    const found = content.posts.find((post) => post.id === postId) ?? null;
    if (!found) {
      router.replace("/admin/insights");
      return;
    }
    setDraft(found);
    setDirty(false);
    readyRef.current = true;
  }, [content.posts, isNew, loading, postId, router]);

  const translateSources = useMemo(
    () => (draft ? [draft.title, draft.bodyHtml] : []),
    [draft]
  );

  function patchDraft(updater: (post: InsightPost) => InsightPost) {
    setDraft((prev) => (prev ? updater(prev) : prev));
    setDirty(true);
    setLocalMessage("");
  }

  function handleBack() {
    if (dirty) {
      const ok = window.confirm(
        "You have unsaved changes. Leave without saving? Your edits will be discarded."
      );
      if (!ok) return;
    }
    router.push("/admin/insights");
  }

  async function handleSave() {
    if (!draft) return;
    const title = draft.title.trim();
    if (!title) {
      setLocalMessage("Add a title before saving.");
      return;
    }
    const nextPosts = isNew
      ? [draft, ...content.posts.filter((post) => post.id !== draft.id)]
      : content.posts.map((post) => (post.id === draft.id ? draft : post));
    try {
      await saveSnapshot({ ...content, posts: nextPosts });
      setDirty(false);
      router.push("/admin/insights");
    } catch {
      setDraft((prev) =>
        prev ? applyUploadedBlobCache(prev) : prev
      );
    }
  }

  async function handleDelete() {
    if (!draft || isNew) {
      router.push("/admin/insights");
      return;
    }
    const confirmed = window.confirm("Remove this insight?");
    if (!confirmed) return;
    try {
      await saveSnapshot({
        ...content,
        posts: content.posts.filter((post) => post.id !== draft.id),
      });
      router.push("/admin/insights");
    } catch {
      // message from hook
    }
  }

  if (loading || !draft) {
    return (
      <AdminGuard>
        <AdminShell pageTitle="Insights">
          <p className="admin-cms admin-cms-empty">Loading…</p>
        </AdminShell>
      </AdminGuard>
    );
  }

  return (
    <AdminGuard>
      <AdminShell
        pageTitle="Insights"
        onBack={handleBack}
        onSave={() => void handleSave()}
        saving={saving}
        dirty={dirty}
        message={localMessage || message}
        topbarTools={
          <>
            <LocaleEditTabs locale={editLocale} onChange={setEditLocale} />
            <AutoTranslateButton
              variant="icon"
              sources={translateSources}
              disabled={saving}
              onTranslated={(target, values) => {
                const [titleVal, bodyVal] = values;
                patchDraft((prev) => {
                  const images = extractBodyImageSrcs(prev.bodyHtml || "");
                  const translatedBody = withSyncedBodyImages(
                    bodyVal ?? "",
                    images
                  );
                  if (target === "km") {
                    return {
                      ...prev,
                      titleKm: titleVal ?? prev.titleKm,
                      bodyHtmlKm: translatedBody,
                      bodyHtmlZh: withSyncedBodyImages(
                        prev.bodyHtmlZh || "<p></p>",
                        images
                      ),
                    };
                  }
                  if (target === "zh") {
                    return {
                      ...prev,
                      titleZh: titleVal ?? prev.titleZh,
                      bodyHtmlZh: translatedBody,
                      bodyHtmlKm: withSyncedBodyImages(
                        prev.bodyHtmlKm || "<p></p>",
                        images
                      ),
                    };
                  }
                  return prev;
                });
              }}
            />
            {!isNew ? (
              <button
                type="button"
                className="admin-topbar-icon-btn is-danger"
                onClick={() => void handleDelete()}
                disabled={saving}
                aria-label="Delete insight"
                title="Delete"
              >
                <TrashIcon />
              </button>
            ) : null}
          </>
        }
      >
        <AdminInsightDetailEditor
          post={draft}
          editLocale={editLocale}
          onChange={patchDraft}
        />
      </AdminShell>
    </AdminGuard>
  );
}
