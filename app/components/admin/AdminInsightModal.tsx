"use client";

import { useEffect } from "react";
import EditableImage from "@/app/components/admin/EditableImage";
import EditableText from "@/app/components/admin/EditableText";
import type { InsightPost } from "@/lib/content/types";

type AdminInsightModalProps = {
  post: InsightPost;
  onChange: (updater: (post: InsightPost) => InsightPost) => void;
  onClose: () => void;
  onDelete: () => void;
  onDone: () => void;
  saving?: boolean;
};

export default function AdminInsightModal({
  post,
  onChange,
  onClose,
  onDelete,
  onDone,
  saving = false,
}: AdminInsightModalProps) {
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
        aria-labelledby="admin-insight-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="admin-insight-modal-header">
          <div>
            <h2 id="admin-insight-modal-title" className="heading text-32">
              Edit Insight
            </h2>
            <p className="text text-14">
              Edit title, cover image, and article details. Click Done, then
              Save in the top bar to publish. Delete only applies after Save.
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
              label="Insight title"
            />
          </div>

          <div className="admin-insight-modal-field">
            <span className="text text-14 admin-insight-modal-label">
              Category
            </span>
            <EditableText
              className="text text-16"
              value={post.category}
              onChange={(category) =>
                onChange((prev) => ({ ...prev, category }))
              }
              label="Category"
            />
          </div>

          <div className="admin-insight-modal-field">
            <span className="text text-14 admin-insight-modal-label">Author</span>
            <EditableText
              className="text text-16"
              value={post.author}
              onChange={(author) => onChange((prev) => ({ ...prev, author }))}
              label="Author"
            />
          </div>

          <div className="admin-insight-modal-field">
            <span className="text text-14 admin-insight-modal-label">
              Section title (optional)
            </span>
            <EditableText
              className="heading text-22"
              value={post.sectionTitle}
              onChange={(sectionTitle) =>
                onChange((prev) => ({ ...prev, sectionTitle }))
              }
              label="Section title"
            />
          </div>

          {post.paragraphs.map((paragraph, index) => (
            <div key={index} className="admin-insight-modal-field">
              <span className="text text-14 admin-insight-modal-label">
                Paragraph {index + 1}
              </span>
              <EditableText
                multiline
                className="text text-18"
                value={paragraph}
                onChange={(value) =>
                  onChange((prev) => {
                    const paragraphs = [
                      ...prev.paragraphs,
                    ] as InsightPost["paragraphs"];
                    paragraphs[index] = value;
                    return { ...prev, paragraphs };
                  })
                }
                label={`Paragraph ${index + 1}`}
              />
            </div>
          ))}

          <div className="admin-insight-modal-field">
            <span className="text text-14 admin-insight-modal-label">
              Pull quote (optional)
            </span>
            <EditableText
              multiline
              className="text text-18"
              value={post.quote}
              onChange={(quote) => onChange((prev) => ({ ...prev, quote }))}
              label="Quote"
            />
          </div>

          <div className="admin-insight-modal-field">
            <span className="text text-14 admin-insight-modal-label">
              Paired images
            </span>
            <div className="admin-insight-modal-paired">
              {post.pairedImages.map((image, index) => (
                <div key={index} className="admin-insight-modal-paired-item">
                  <EditableImage
                    src={image}
                    onChange={(value) =>
                      onChange((prev) => {
                        const pairedImages = [
                          ...prev.pairedImages,
                        ] as InsightPost["pairedImages"];
                        pairedImages[index] = value;
                        return { ...prev, pairedImages };
                      })
                    }
                    alt=""
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="admin-insight-modal-footer">
          <button
            type="button"
            className="button button--slim admin-insight-delete"
            onClick={onDelete}
            disabled={saving}
          >
            Delete
          </button>
          <div className="admin-insight-modal-footer-actions">
            <button
              type="button"
              className="button button--slim admin-insight-modal-cancel"
              onClick={onClose}
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="button"
              className="button button--primary button--slim"
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
