"use client";

import { useState } from "react";
import InsightDetailsBody from "@/app/components/insights/InsightDetailsBody";
import AutoTranslateButton from "@/app/components/i18n/AutoTranslateButton";
import LocaleEditTabs from "@/app/components/i18n/LocaleEditTabs";
import type { InsightPost } from "@/lib/content/types";
import type { Locale } from "@/lib/i18n/locale";

type AdminInsightDetailEditorProps = {
  post: InsightPost;
  onChange: (updater: (post: InsightPost) => InsightPost) => void;
  onBack: () => void;
  onDelete: () => void;
  saving?: boolean;
};

export default function AdminInsightDetailEditor({
  post,
  onChange,
  onBack,
  onDelete,
  saving = false,
}: AdminInsightDetailEditorProps) {
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
          ← Back to Insights
        </button>
        <div className="admin-detail-toolbar-locale">
          <LocaleEditTabs locale={editLocale} onChange={setEditLocale} />
          <AutoTranslateButton
            sources={[post.title, post.bodyHtml]}
            onTranslated={(target, values) => {
              const [titleVal, bodyVal] = values;
              onChange((prev) => {
                if (target === "km") {
                  return {
                    ...prev,
                    titleKm: titleVal ?? prev.titleKm,
                    bodyHtmlKm: bodyVal ?? prev.bodyHtmlKm,
                  };
                }
                if (target === "zh") {
                  return {
                    ...prev,
                    titleZh: titleVal ?? prev.titleZh,
                    bodyHtmlZh: bodyVal ?? prev.bodyHtmlZh,
                  };
                }
                return prev;
              });
            }}
          />
        </div>
        <p className="text text-14 admin-detail-toolbar-hint">
          Write in English first. Save auto-fills empty Khmer/Chinese. Switch
          language above to edit translations.
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
      <InsightDetailsBody
        post={post}
        edit={{ onChange }}
        editLocale={editLocale}
        onEditLocaleChange={setEditLocale}
        hideLocaleBar
      />
    </div>
  );
}
