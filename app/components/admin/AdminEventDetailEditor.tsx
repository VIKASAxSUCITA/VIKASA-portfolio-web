"use client";

import { useMemo } from "react";
import EditableImage from "@/app/components/admin/EditableImage";
import EditableText from "@/app/components/admin/EditableText";
import InsightRichTextEditor from "@/app/components/insights/InsightRichTextEditor";
import {
  fromDateTimeLocalValue,
  toDateTimeLocalValue,
} from "@/lib/content/events";
import {
  extractBodyImageSrcs,
  withSyncedBodyImages,
} from "@/lib/content/insightHtml";
import type { EventPost } from "@/lib/content/types";
import type { Locale } from "@/lib/i18n/locale";

type AdminEventDetailEditorProps = {
  post: EventPost;
  editLocale: Locale;
  onChange: (updater: (post: EventPost) => EventPost) => void;
};

function titleKeyFor(locale: Locale): keyof EventPost {
  if (locale === "km") return "titleKm";
  if (locale === "zh") return "titleZh";
  return "title";
}

function summaryKeyFor(locale: Locale): keyof EventPost {
  if (locale === "km") return "summaryKm";
  if (locale === "zh") return "summaryZh";
  return "summary";
}

function bodyKeyFor(locale: Locale): keyof EventPost {
  if (locale === "km") return "bodyKm";
  if (locale === "zh") return "bodyZh";
  return "body";
}

function sharedImages(post: EventPost): string[] {
  const en = extractBodyImageSrcs(post.body || "");
  if (en.length) return en;
  const km = extractBodyImageSrcs(post.bodyKm || "");
  if (km.length) return km;
  return extractBodyImageSrcs(post.bodyZh || "");
}

const TITLE_MAX = 120;
const SUMMARY_MAX = 280;

export default function AdminEventDetailEditor({
  post,
  editLocale,
  onChange,
}: AdminEventDetailEditorProps) {
  const titleKey = titleKeyFor(editLocale);
  const summaryKey = summaryKeyFor(editLocale);
  const bodyKey = bodyKeyFor(editLocale);
  const titleValue = String(
    post[titleKey] || (editLocale === "en" ? post.title : "")
  );
  const summaryValue = String(
    post[summaryKey] || (editLocale === "en" ? post.summary : "")
  );
  const bodyValue = useMemo(() => {
    // Pass raw HTML to the editor. Do NOT run withSyncedBodyImages here —
    // that rewrites markup on every keystroke and can wipe TipTap images.
    return String(
      post[bodyKey] || (editLocale === "en" ? post.body : "") || "<p></p>"
    );
  }, [bodyKey, editLocale, post]);
  const cover = post.coverImage || post.image || "";

  function patch<K extends keyof EventPost>(key: K, value: EventPost[K]) {
    onChange((prev) => ({ ...prev, [key]: value }));
  }

  function patchBody(html: string) {
    onChange((prev) => {
      const extracted = extractBodyImageSrcs(html);
      const images = extracted.length ? extracted : sharedImages(prev);
      const bodyToStore =
        extracted.length > 0 || images.length === 0
          ? html
          : withSyncedBodyImages(html, images);

      return {
        ...prev,
        body:
          editLocale === "en"
            ? bodyToStore
            : withSyncedBodyImages(prev.body || "<p></p>", images),
        bodyKm:
          editLocale === "km"
            ? bodyToStore
            : withSyncedBodyImages(prev.bodyKm || "<p></p>", images),
        bodyZh:
          editLocale === "zh"
            ? bodyToStore
            : withSyncedBodyImages(prev.bodyZh || "<p></p>", images),
      };
    });
  }

  return (
    <div className="admin-composer admin-composer--embedded">
      <div className="admin-composer-body">
        <article className="admin-composer-paper admin-composer-paper--form">
          <div className="admin-composer-slugline">
            {post.id.startsWith("new_event_") ? (
              <>New event</>
            ) : (
              <>
                Slug: <span>/events/{post.id}</span>
              </>
            )}
          </div>

          <div className="admin-form-row">
            <div className="admin-form-label">
              <label htmlFor={`event-title-${post.id}`}>Title</label>
              <span>
                {titleValue.length}/{TITLE_MAX}
              </span>
            </div>
            <EditableText
              id={`event-title-${post.id}`}
              value={titleValue}
              onChange={(value) =>
                patch(
                  titleKey,
                  value.slice(0, TITLE_MAX) as EventPost[typeof titleKey]
                )
              }
              label="Title"
              className="admin-composer-title"
              placeholder="Add a title…"
              multiline
            />
          </div>

          <div className="admin-form-row">
            <div className="admin-form-label">
              <label htmlFor={`event-summary-${post.id}`}>Summary</label>
              <span>
                {summaryValue.length}/{SUMMARY_MAX}
              </span>
            </div>
            <EditableText
              id={`event-summary-${post.id}`}
              value={summaryValue}
              onChange={(value) =>
                patch(
                  summaryKey,
                  value.slice(0, SUMMARY_MAX) as EventPost[typeof summaryKey]
                )
              }
              label="Summary"
              className="admin-composer-summary"
              placeholder="Short summary…"
              multiline
            />
          </div>

          <div className="admin-form-row">
            <div className="admin-form-label">
              <span>Details</span>
            </div>
            <div className="admin-form-meta-grid">
              <label className="admin-form-meta-field">
                <span>Type</span>
                <EditableText
                  value={post.kind}
                  onChange={(kind) => patch("kind", kind)}
                  label="Type"
                  className="admin-composer-input"
                />
              </label>
              <label className="admin-form-meta-field">
                <span>Location</span>
                <EditableText
                  value={post.location}
                  onChange={(location) => patch("location", location)}
                  label="Location"
                  className="admin-composer-input"
                  placeholder="Location"
                />
              </label>
              <label className="admin-form-meta-field">
                <span>Starts</span>
                <input
                  type="datetime-local"
                  className="admin-composer-input admin-event-datetime"
                  value={toDateTimeLocalValue(post.startsAt)}
                  onChange={(event) => {
                    const next = fromDateTimeLocalValue(event.target.value);
                    if (next) patch("startsAt", next);
                  }}
                  aria-label="Start date and time"
                />
              </label>
              <label className="admin-form-meta-field">
                <span>Ends</span>
                <input
                  type="datetime-local"
                  className="admin-composer-input admin-event-datetime"
                  value={toDateTimeLocalValue(post.endsAt)}
                  onChange={(event) =>
                    patch("endsAt", fromDateTimeLocalValue(event.target.value))
                  }
                  aria-label="End date and time"
                />
              </label>
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-label">
              <span>Image</span>
            </div>
            <EditableImage
              variant="article"
              src={cover}
              imageName="Cover"
              onChange={(coverImage) =>
                onChange((prev) => ({
                  ...prev,
                  coverImage,
                  image: coverImage,
                }))
              }
              onRemove={() =>
                onChange((prev) => ({
                  ...prev,
                  coverImage: "",
                  image: "",
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
                key={`${post.id}-${editLocale}`}
                content={bodyValue}
                placeholder="Write the event details…"
                onChange={patchBody}
              />
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
