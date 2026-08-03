"use client";

import { useMemo, useState } from "react";
import {
  EditableField,
  EditableMedia,
} from "@/app/components/admin/EditableField";
import LocaleEditTabs from "@/app/components/i18n/LocaleEditTabs";
import { useLocale } from "@/app/components/i18n/LocaleProvider";
import InsightImageGallery from "@/app/components/insights/InsightImageGallery";
import InsightRichTextEditor from "@/app/components/insights/InsightRichTextEditor";
import {
  extractBodyImageSrcs,
  stripImagesFromBodyHtml,
} from "@/lib/content/insightHtml";
import {
  formatInsightDate,
  insightText,
} from "@/lib/content/insights";
import type { InsightPost } from "@/lib/content/types";
import type { Locale } from "@/lib/i18n/locale";

type InsightDetailsBodyProps = {
  post: InsightPost;
  related?: InsightPost[];
  edit?: { onChange: (updater: (prev: InsightPost) => InsightPost) => void };
  editLocale?: Locale;
  onEditLocaleChange?: (locale: Locale) => void;
  hideLocaleBar?: boolean;
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

export default function InsightDetailsBody({
  post,
  related = [],
  edit,
  editLocale: editLocaleProp,
  onEditLocaleChange,
  hideLocaleBar = false,
}: InsightDetailsBodyProps) {
  const { locale: siteLocale } = useLocale();
  const [editLocaleState, setEditLocaleState] = useState<Locale>("en");
  const editLocale = editLocaleProp ?? editLocaleState;
  const setEditLocale = onEditLocaleChange ?? setEditLocaleState;
  const locale = edit ? editLocale : siteLocale;

  const title = insightText(post, "title", locale);
  const bodyHtml = insightText(post, "bodyHtml", locale);
  const dateLabel = formatInsightDate(post.createdAt, locale);
  const titleKey = titleKeyFor(locale);
  const bodyKey = bodyKeyFor(locale);

  const galleryImages = useMemo(() => {
    const local = extractBodyImageSrcs(bodyHtml);
    if (local.length) return local;
    return extractBodyImageSrcs(insightText(post, "bodyHtml", "en"));
  }, [bodyHtml, post]);
  const proseHtml = useMemo(
    () => stripImagesFromBodyHtml(bodyHtml),
    [bodyHtml]
  );

  const patch = <K extends keyof InsightPost>(key: K, value: InsightPost[K]) =>
    edit?.onChange((prev) => ({ ...prev, [key]: value }));

  return (
    <main className="insight-detail-page">
      {edit && !hideLocaleBar ? (
        <div className="container admin-inline-locale-bar">
          <LocaleEditTabs locale={editLocale} onChange={setEditLocale} />
        </div>
      ) : null}

      <article className="insight-article">
        <div className="container">
          <div className="insight-article-inner">
            <header className="insight-article-header">
              <div className="insight-article-meta">
                {dateLabel ? (
                  <span className="insight-article-date">{dateLabel}</span>
                ) : null}
              </div>

              <EditableField
                as="h1"
                className="heading insight-article-title"
                value={edit ? String(post[titleKey] || post.title) : title}
                edit={
                  edit
                    ? {
                        onChange: (value) =>
                          patch(
                            titleKey,
                            value as InsightPost[typeof titleKey]
                          ),
                      }
                    : undefined
                }
                label="Insight title"
                multiline
              />
            </header>

            <figure className="insight-article-cover">
              <EditableMedia
                src={post.image}
                alt={title}
                className="insight-article-cover-media"
                width={1200}
                height={675}
                loading="eager"
                edit={
                  edit
                    ? { onChange: (image) => patch("image", image) }
                    : undefined
                }
              />
            </figure>

            {edit ? (
              <div className="insight-article-editor">
                <InsightRichTextEditor
                  content={String(post[bodyKey] || post.bodyHtml)}
                  placeholder="Write your insight article…"
                  onChange={(value) =>
                    patch(bodyKey, value as InsightPost[typeof bodyKey])
                  }
                />
              </div>
            ) : (
              <>
                <div
                  className="insight-article-body insight-rich-body"
                  dangerouslySetInnerHTML={{ __html: proseHtml }}
                />
                {galleryImages.length > 0 ? (
                  <InsightImageGallery
                    images={galleryImages}
                    altPrefix={title}
                  />
                ) : null}
              </>
            )}
          </div>
        </div>
      </article>

      {!edit && related.length > 0 ? (
        <section className="insight-related">
          <div className="container">
            <div className="insight-related-head">
              <h2>
                {locale === "km"
                  ? "អត្ថបទពាក់ព័ន្ធ"
                  : locale === "zh"
                    ? "相关洞察"
                    : "Related Insights"}
              </h2>
            </div>
            <div className="row g-4">
              {related.map((item) => {
                const itemTitle = insightText(item, "title", locale);
                const itemDate = formatInsightDate(item.createdAt, locale);
                return (
                  <div key={item.id} className="col-md-6 col-xl-4">
                    <article className="insight-card h-100">
                      <a
                        href={`/insights/${item.id}`}
                        className="insight-card-media"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.image} alt={itemTitle} loading="lazy" />
                      </a>
                      <div className="insight-card-body">
                        <div className="insight-card-meta">
                          {itemDate ? <span>{itemDate}</span> : null}
                        </div>
                        <h3>
                          <a href={`/insights/${item.id}`}>{itemTitle}</a>
                        </h3>
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
