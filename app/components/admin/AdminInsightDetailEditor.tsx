"use client";

import EditableImage from "@/app/components/admin/EditableImage";
import EditableText from "@/app/components/admin/EditableText";
import InsightRichTextEditor from "@/app/components/insights/InsightRichTextEditor";
import type { InsightPost } from "@/lib/content/types";
import type { Locale } from "@/lib/i18n/locale";

type AdminInsightDetailEditorProps = {
  post: InsightPost;
  editLocale: Locale;
  onChange: (updater: (post: InsightPost) => InsightPost) => void;
};

function titleKeyFor(locale: Locale): keyof InsightPost {
  if (locale === "km") return "titleKm";
  if (locale === "zh") return "titleZh";
  return "title";
}

function bodyKeyFor(locale: Locale): keyof InsightPost {
  if (locale === "km") return "bodyHtmlKm";
  if (locale === "zh") return "bodyHtmlZh";
  return "bodyHtml";
}

const TITLE_MAX = 120;

export default function AdminInsightDetailEditor({
  post,
  editLocale,
  onChange,
}: AdminInsightDetailEditorProps) {
  const titleKey = titleKeyFor(editLocale);
  const bodyKey = bodyKeyFor(editLocale);
  const titleValue = String(
    post[titleKey] || (editLocale === "en" ? post.title : "")
  );
  const bodyValue = String(
    post[bodyKey] || (editLocale === "en" ? post.bodyHtml : "") || "<p></p>"
  );

  function patch<K extends keyof InsightPost>(key: K, value: InsightPost[K]) {
    onChange((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <div className="admin-composer admin-composer--embedded">
      <div className="admin-composer-body">
        <article className="admin-composer-paper admin-composer-paper--form">
          <div className="admin-composer-slugline">
            {post.id.startsWith("new_insight_") ? (
              <>New insight</>
            ) : (
              <>
                Slug: <span>/insights/{post.id}</span>
              </>
            )}
          </div>

          <div className="admin-form-row">
            <div className="admin-form-label">
              <label htmlFor={`insight-title-${post.id}`}>Title</label>
              <span>
                {titleValue.length}/{TITLE_MAX}
              </span>
            </div>
            <EditableText
              id={`insight-title-${post.id}`}
              value={titleValue}
              onChange={(value) =>
                patch(
                  titleKey,
                  value.slice(0, TITLE_MAX) as InsightPost[typeof titleKey]
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
              <span>Image</span>
            </div>
            <EditableImage
              variant="article"
              src={post.image || ""}
              imageName="Cover"
              onChange={(image) => patch("image", image)}
              onRemove={() => patch("image", "")}
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
                placeholder="Write the insight article…"
                onChange={(html) =>
                  patch(bodyKey, html as InsightPost[typeof bodyKey])
                }
              />
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
