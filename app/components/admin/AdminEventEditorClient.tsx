"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import AdminGuard from "@/app/components/admin/AdminGuard";
import AdminEventDetailEditor from "@/app/components/admin/AdminEventDetailEditor";
import AdminShell from "@/app/components/admin/AdminShell";
import { usePageEditor } from "@/app/components/admin/usePageEditor";
import AutoTranslateButton from "@/app/components/i18n/AutoTranslateButton";
import LocaleEditTabs from "@/app/components/i18n/LocaleEditTabs";
import { createEmptyEvent } from "@/lib/content/events";
import { applyUploadedBlobCache } from "@/lib/content/pendingImages";
import type { EventPost } from "@/lib/content/types";
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

export default function AdminEventEditorClient({ postId }: Props) {
  const router = useRouter();
  const { content, loading, saving, message, saveSnapshot } =
    usePageEditor("events");
  const [editLocale, setEditLocale] = useState<Locale>("en");
  const [draft, setDraft] = useState<EventPost | null>(null);
  const [dirty, setDirty] = useState(false);
  const [localMessage, setLocalMessage] = useState("");
  const readyRef = useRef(false);

  const isNew = postId === "new";

  useEffect(() => {
    if (loading || readyRef.current) return;
    if (isNew) {
      setDraft(createEmptyEvent());
      setDirty(false);
      readyRef.current = true;
      return;
    }
    const found = content.posts.find((post) => post.id === postId) ?? null;
    if (!found) {
      router.replace("/admin/events");
      return;
    }
    setDraft(found);
    setDirty(false);
    readyRef.current = true;
  }, [content.posts, isNew, loading, postId, router]);

  const translateSources = useMemo(
    () => (draft ? [draft.title, draft.summary, draft.body] : []),
    [draft]
  );

  function patchDraft(updater: (post: EventPost) => EventPost) {
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
    router.push("/admin/events");
  }

  async function handleSave() {
    if (!draft) return;
    if (!draft.title.trim()) {
      setLocalMessage("Add a title before saving.");
      return;
    }
    const nextPosts = isNew
      ? [draft, ...content.posts.filter((post) => post.id !== draft.id)]
      : content.posts.map((post) => (post.id === draft.id ? draft : post));
    try {
      await saveSnapshot({ ...content, posts: nextPosts });
      setDirty(false);
      router.push("/admin/events");
    } catch {
      setDraft((prev) =>
        prev ? applyUploadedBlobCache(prev) : prev
      );
    }
  }

  async function handleDelete() {
    if (!draft || isNew) {
      router.push("/admin/events");
      return;
    }
    const confirmed = window.confirm("Remove this event?");
    if (!confirmed) return;
    try {
      await saveSnapshot({
        ...content,
        posts: content.posts.filter((post) => post.id !== draft.id),
      });
      router.push("/admin/events");
    } catch {
      // message from hook
    }
  }

  if (loading || !draft) {
    return (
      <AdminGuard>
        <AdminShell pageTitle="Events">
          <p className="admin-cms admin-cms-empty">Loading…</p>
        </AdminShell>
      </AdminGuard>
    );
  }

  return (
    <AdminGuard>
      <AdminShell
        pageTitle="Events"
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
                const [titleVal, summaryVal, bodyVal] = values;
                patchDraft((prev) => {
                  if (target === "km") {
                    return {
                      ...prev,
                      titleKm: titleVal ?? prev.titleKm,
                      summaryKm: summaryVal ?? prev.summaryKm,
                      bodyKm: bodyVal ?? prev.bodyKm,
                    };
                  }
                  if (target === "zh") {
                    return {
                      ...prev,
                      titleZh: titleVal ?? prev.titleZh,
                      summaryZh: summaryVal ?? prev.summaryZh,
                      bodyZh: bodyVal ?? prev.bodyZh,
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
                aria-label="Delete event"
                title="Delete"
              >
                <TrashIcon />
              </button>
            ) : null}
          </>
        }
      >
        <AdminEventDetailEditor
          post={draft}
          editLocale={editLocale}
          onChange={patchDraft}
        />
      </AdminShell>
    </AdminGuard>
  );
}
