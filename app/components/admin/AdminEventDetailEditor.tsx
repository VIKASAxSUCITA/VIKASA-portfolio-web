"use client";

import { useState } from "react";
import EventDetailsBody from "@/app/components/events/EventDetailsBody";
import AutoTranslateButton from "@/app/components/i18n/AutoTranslateButton";
import LocaleEditTabs from "@/app/components/i18n/LocaleEditTabs";
import type { EventPost } from "@/lib/content/types";
import type { Locale } from "@/lib/i18n/locale";

type AdminEventDetailEditorProps = {
  post: EventPost;
  contact?: { email?: string; phone?: string };
  onChange: (updater: (post: EventPost) => EventPost) => void;
  onBack: () => void;
  onDelete: () => void;
  saving?: boolean;
};

export default function AdminEventDetailEditor({
  post,
  contact,
  onChange,
  onBack,
  onDelete,
  saving = false,
}: AdminEventDetailEditorProps) {
  const [editLocale, setEditLocale] = useState<Locale>("en");

  return (
    <div className="admin-detail-editor">
      <div className="admin-detail-toolbar">
        <button
          type="button"
          className="button button--slim admin-detail-back"
          onClick={onBack}
          disabled={saving}
        >
          ← Back to Events
        </button>
        <div className="admin-detail-toolbar-locale">
          <LocaleEditTabs locale={editLocale} onChange={setEditLocale} />
          <AutoTranslateButton
            sources={[post.title, post.summary, post.body]}
            onTranslated={(target, values) => {
              const [titleVal, summaryVal, bodyVal] = values;
              onChange((prev) => {
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
        </div>
        <p className="text text-14 admin-detail-toolbar-hint">
          Write in English first. Save auto-fills empty Khmer/Chinese. Switch
          language above to edit translations. Body supports TipTap images.
        </p>
        <button
          type="button"
          className="button button--slim admin-insight-delete"
          onClick={onDelete}
          disabled={saving}
        >
          Delete
        </button>
      </div>
      <EventDetailsBody
        post={post}
        contact={contact}
        edit={{ onChange }}
        editLocale={editLocale}
        onEditLocaleChange={setEditLocale}
        hideLocaleBar
      />
    </div>
  );
}
