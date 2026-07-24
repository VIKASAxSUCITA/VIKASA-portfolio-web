"use client";

import InsightDetailsBody from "@/app/components/insights/InsightDetailsBody";
import type { InsightPost } from "@/lib/content/types";

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
        <p className="text text-14 admin-detail-toolbar-hint">
          Edit the hero fields and article with the rich text toolbar. Click
          Save in the top bar to publish.
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
      />
    </div>
  );
}
