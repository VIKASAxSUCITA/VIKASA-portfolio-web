"use client";

import EditableImage from "@/app/components/admin/EditableImage";
import EditableText from "@/app/components/admin/EditableText";
import InsightRichTextEditor from "@/app/components/insights/InsightRichTextEditor";
import type { ServiceDetail } from "@/lib/content/services";
import { emptyLocalized, type Locale } from "@/lib/i18n/locale";
import { readLocalized, setLocalized } from "@/lib/i18n/localized";

type Props = {
  service: ServiceDetail;
  editLocale: Locale;
  onChange: (updater: (service: ServiceDetail) => ServiceDetail) => void;
};

const TITLE_MAX = 80;
const SUBTITLE_MAX = 220;
const DEFAULT_COVER = "/assets/img/vikasa/services/investment.jpg";

function toEditorHtml(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "<p></p>";
  if (/<[a-z][\s\S]*>/i.test(trimmed)) return trimmed;
  return `<p>${trimmed
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n/g, "<br>")}</p>`;
}

export default function AdminServiceDetailEditor({
  service,
  editLocale,
  onChange,
}: Props) {
  const title = readLocalized(service.title, editLocale);
  const subtitle = readLocalized(service.description, editLocale);
  const body = toEditorHtml(readLocalized(service.body, editLocale));
  const cover = service.heroImage || service.icon || DEFAULT_COVER;

  function patchLocalized(
    field: "title" | "description" | "body",
    value: string
  ) {
    onChange((prev) => ({
      ...prev,
      [field]: setLocalized(prev[field], editLocale, value),
    }));
  }

  function patchItem(index: number, value: string) {
    onChange((prev) => ({
      ...prev,
      items: prev.items.map((item, i) =>
        i === index ? setLocalized(item, editLocale, value) : item
      ),
    }));
  }

  function addItem() {
    onChange((prev) => ({
      ...prev,
      items: [...prev.items, emptyLocalized()],
    }));
  }

  function removeItem(index: number) {
    onChange((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  }

  return (
    <div className="admin-composer admin-composer--embedded">
      <div className="admin-composer-body">
        <article className="admin-composer-paper admin-composer-paper--form">
          <div className="admin-composer-slugline">
            Slug: <span>/services/{service.slug}</span>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-label">
              <label htmlFor={`service-title-${service.slug}`}>Title</label>
              <span>
                {title.length}/{TITLE_MAX}
              </span>
            </div>
            <EditableText
              id={`service-title-${service.slug}`}
              value={title}
              onChange={(value) =>
                patchLocalized("title", value.slice(0, TITLE_MAX))
              }
              label="Title"
              className="admin-composer-title"
              multiline
            />
          </div>

          <div className="admin-form-row">
            <div className="admin-form-label">
              <label htmlFor={`service-subtitle-${service.slug}`}>
                Subtitle
              </label>
              <span>
                {subtitle.length}/{SUBTITLE_MAX}
              </span>
            </div>
            <EditableText
              id={`service-subtitle-${service.slug}`}
              value={subtitle}
              onChange={(value) =>
                patchLocalized("description", value.slice(0, SUBTITLE_MAX))
              }
              label="Subtitle"
              className="admin-composer-summary"
              multiline
            />
          </div>

          <div className="admin-form-row">
            <div className="admin-form-label">
              <span>Image</span>
            </div>
            <EditableImage
              variant="article"
              src={cover}
              alt={title || "Service cover"}
              imageName="Cover"
              onChange={(heroImage) =>
                onChange((prev) => ({ ...prev, heroImage, icon: heroImage }))
              }
              onRemove={() =>
                onChange((prev) => ({
                  ...prev,
                  heroImage: DEFAULT_COVER,
                  icon: DEFAULT_COVER,
                }))
              }
            />
          </div>

          <div className="admin-form-row">
            <div className="admin-form-label">
              <span>Content</span>
            </div>
            <div className="admin-composer-editor">
              <InsightRichTextEditor
                key={`${service.slug}-${editLocale}`}
                content={body}
                placeholder="Write the service overview…"
                onChange={(html) => patchLocalized("body", html)}
              />
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-label">
              <span>Sub-services</span>
            </div>
            <div className="admin-service-items">
              {service.items.length === 0 ? (
                <p className="admin-service-items-empty">
                  No sub-services yet.
                </p>
              ) : (
                <ul className="admin-service-items-list list-unstyled">
                  {service.items.map((item, index) => (
                    <li
                      key={`${service.slug}-item-${index}`}
                      className="admin-service-item-card"
                    >
                      <EditableText
                        value={readLocalized(item, editLocale)}
                        onChange={(value) => patchItem(index, value)}
                        label={`Sub-service ${index + 1}`}
                        className="admin-composer-input admin-service-item-field"
                      />
                      <button
                        type="button"
                        className="admin-service-item-remove"
                        onClick={() => removeItem(index)}
                        aria-label={`Remove sub-service ${index + 1}`}
                        title="Remove"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          aria-hidden
                        >
                          <path
                            d="M5 7h14M10 11v6M14 11v6M8 7l1-2h6l1 2M7 7l1 12h8l1-12"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              <button
                type="button"
                className="admin-service-item-add"
                onClick={addItem}
              >
                + Add sub-service
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
