"use client";

import { useEffect } from "react";
import EditableImage from "@/app/components/admin/EditableImage";
import EditableText from "@/app/components/admin/EditableText";
import {
  fromDateTimeLocalValue,
  toDateTimeLocalValue,
} from "@/lib/content/events";
import type { EventKind, EventPost } from "@/lib/content/types";

type AdminEventModalProps = {
  post: EventPost;
  onChange: (updater: (post: EventPost) => EventPost) => void;
  onClose: () => void;
  onDelete: () => void;
  onDone: () => void;
  saving?: boolean;
};

export default function AdminEventModal({
  post,
  onChange,
  onClose,
  onDelete,
  onDone,
  saving = false,
}: AdminEventModalProps) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="admin-insight-modal-overlay"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="admin-insight-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-event-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="admin-insight-modal-header">
          <div>
            <h2 id="admin-event-modal-title" className="heading text-32">
              Edit Event
            </h2>
            <p className="text text-14">
              Set the schedule, details, cover image, and content image. Click
              Done, then Save in the top bar to publish. Delete only applies
              after Save.
            </p>
          </div>
          <button
            type="button"
            className="admin-insight-modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="admin-insight-modal-body">
          <div className="admin-insight-modal-field">
            <span className="text text-14 admin-insight-modal-label">
              Cover image
            </span>
            <p className="text text-14 admin-event-hint">
              Used on the events list and the detail page banner.
            </p>
            <div className="admin-insight-modal-cover radius18">
              <EditableImage
                src={post.coverImage}
                onChange={(coverImage) =>
                  onChange((prev) => ({ ...prev, coverImage }))
                }
                alt=""
              />
            </div>
          </div>

          <div className="admin-insight-modal-field">
            <span className="text text-14 admin-insight-modal-label">
              Content image
            </span>
            <p className="text text-14 admin-event-hint">
              Used in the main content area of the detail page.
            </p>
            <div className="admin-insight-modal-cover radius18">
              <EditableImage
                src={post.image}
                onChange={(image) => onChange((prev) => ({ ...prev, image }))}
                alt=""
              />
            </div>
          </div>

          <div className="admin-insight-modal-field">
            <span className="text text-14 admin-insight-modal-label">Title</span>
            <EditableText
              className="heading text-32"
              value={post.title}
              onChange={(title) => onChange((prev) => ({ ...prev, title }))}
              label="Event title"
            />
          </div>

          <div className="admin-insight-modal-field">
            <span className="text text-14 admin-insight-modal-label">Type</span>
            <select
              className="admin-event-select text text-16"
              value={post.kind}
              onChange={(event) =>
                onChange((prev) => ({
                  ...prev,
                  kind: event.target.value as EventKind,
                }))
              }
              aria-label="Event type"
            >
              <option value="event">Event</option>
              <option value="announcement">Announcement</option>
            </select>
          </div>

          <div className="admin-insight-modal-field">
            <span className="text text-14 admin-insight-modal-label">
              Start date & time
            </span>
            <input
              type="datetime-local"
              className="admin-event-datetime text text-16"
              value={toDateTimeLocalValue(post.startsAt)}
              onChange={(event) =>
                onChange((prev) => ({
                  ...prev,
                  startsAt:
                    fromDateTimeLocalValue(event.target.value) ||
                    prev.startsAt,
                }))
              }
              aria-label="Start date and time"
            />
          </div>

          <div className="admin-insight-modal-field">
            <span className="text text-14 admin-insight-modal-label">
              End date & time (optional)
            </span>
            <input
              type="datetime-local"
              className="admin-event-datetime text text-16"
              value={toDateTimeLocalValue(post.endsAt)}
              onChange={(event) =>
                onChange((prev) => ({
                  ...prev,
                  endsAt: fromDateTimeLocalValue(event.target.value),
                }))
              }
              aria-label="End date and time"
            />
          </div>

          <div className="admin-insight-modal-field">
            <span className="text text-14 admin-insight-modal-label">
              Location
            </span>
            <EditableText
              className="text text-16"
              value={post.location}
              onChange={(location) =>
                onChange((prev) => ({ ...prev, location }))
              }
              label="Location"
            />
          </div>

          <div className="admin-insight-modal-field">
            <span className="text text-14 admin-insight-modal-label">
              Short summary
            </span>
            <EditableText
              multiline
              className="text text-16"
              value={post.summary}
              onChange={(summary) =>
                onChange((prev) => ({ ...prev, summary }))
              }
              label="Short summary"
            />
          </div>

          <div className="admin-insight-modal-field">
            <span className="text text-14 admin-insight-modal-label">
              Full details
            </span>
            <EditableText
              multiline
              className="text text-18"
              value={post.body}
              onChange={(body) => onChange((prev) => ({ ...prev, body }))}
              label="Full details"
            />
            <p className="text text-14 admin-event-hint">
              Separate paragraphs with a blank line.
            </p>
          </div>
        </div>

        <div className="admin-insight-modal-footer">
          <button
            type="button"
            className="button button--secondary"
            onClick={onDelete}
            disabled={saving}
          >
            Delete
          </button>
          <div className="admin-insight-modal-footer-actions">
            <button
              type="button"
              className="button button--secondary"
              onClick={onClose}
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="button"
              className="button button--primary"
              onClick={onDone}
              disabled={saving}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
