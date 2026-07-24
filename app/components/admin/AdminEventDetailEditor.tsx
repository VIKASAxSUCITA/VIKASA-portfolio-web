"use client";

import EventDetailsBody from "@/app/components/events/EventDetailsBody";
import type { EventPost } from "@/lib/content/types";

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
        <p className="text text-14 admin-detail-toolbar-hint">
          Edit inline like the live page. Click Save in the top bar to publish.
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
      />
    </div>
  );
}
