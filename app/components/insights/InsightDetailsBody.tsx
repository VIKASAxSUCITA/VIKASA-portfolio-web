"use client";

import Link from "next/link";
import { useMemo } from "react";
import type { InsightPost } from "@/lib/content/insights";
import {
  formatInsightDate,
  insightText,
  insightTitle,
} from "@/lib/content/insights";
import { useLocale } from "@/app/components/i18n/LocaleProvider";
import { t } from "@/lib/i18n/ui";
import { EditableField, EditableMedia } from "@/app/components/admin/EditableField";
import type { TextEdit, ImageEdit } from "@/app/components/admin/usePageEditor";

type Props = {
  post: InsightPost;
  related: InsightPost[];
  edits?: {
    category?: TextEdit;
    title?: TextEdit;
    author?: TextEdit;
    dateLabel?: TextEdit;
    image?: ImageEdit;
    bodyHtml?: TextEdit;
  };
};

export default function InsightDetailsBody({ post, related, edits }: Props) {
  const { locale } = useLocale();
  const title = insightTitle(post, locale);
  const category = insightText(post.category, post.categoryKm, post.categoryZh, locale);
  const author = insightText(post.author, post.authorKm, post.authorZh, locale);
  const dateLabel =
    insightText(post.dateLabel, post.dateLabelKm, post.dateLabelZh, locale) ||
    formatInsightDate(post.date);
  const bodyHtml = insightText(post.bodyHtml, post.bodyHtmlKm, post.bodyHtmlZh, locale);
  const titleKey =
    locale === "km" ? "titleKm" : locale === "zh" ? "titleZh" : "title";
  const categoryKey =
    locale === "km" ? "categoryKm" : locale === "zh" ? "categoryZh" : "category";
  const authorKey =
    locale === "km" ? "authorKm" : locale === "zh" ? "authorZh" : "author";
  const dateLabelKey =
    locale === "km"
      ? "dateLabelKm"
      : locale === "zh"
        ? "dateLabelZh"
        : "dateLabel";
  const bodyKey =
    locale === "km" ? "bodyHtmlKm" : locale === "zh" ? "bodyHtmlZh" : "bodyHtml";

  const relatedCards = useMemo(
    () =>
      related.map((item) => ({
        ...item,
        title: insightTitle(item, locale),
        category: insightText(item.category, item.categoryKm, item.categoryZh, locale),
        dateLabel:
          insightText(item.dateLabel, item.dateLabelKm, item.dateLabelZh, locale) ||
          formatInsightDate(item.date),
      })),
    [locale, related],
  );

  return (
    <>
      <section
        className={`vikasa-hero-cinematic about-hero-cinematic page-hero-banner page-hero-banner--start insight-detail-banner${edits?.image ? " is-editing" : ""}`}
        aria-label={title}
      >
        <div className="vikasa-hero-bg">
          {edits?.image ? (
            <EditableMedia
              src={post.image}
              alt={title}
              edit={edits.image}
              className="vikasa-hero-bg-image insight-detail-banner-media"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.image}
              alt=""
              className="vikasa-hero-bg-image"
              width={1920}
              height={1080}
              loading="eager"
            />
          )}
          <div className="vikasa-hero-overlay" aria-hidden />
        </div>
        <div className="vikasa-hero-content">
          <div className="container">
            <div className="vikasa-hero-copy section-headings page-hero-copy">
              {edits?.category ? (
                <EditableField
                  as="p"
                  className="insight-detail-banner-tag"
                  value={category}
                  edit={edits.category}
                  label={`Insight ${categoryKey}`}
                />
              ) : (
                <p className="insight-detail-banner-tag">{category}</p>
              )}
              {edits?.title ? (
                <EditableField
                  as="h1"
                  className="heading vikasa-hero-title insight-detail-banner-title"
                  value={title}
                  edit={edits.title}
                  label={`Insight ${titleKey}`}
                  multiline
                />
              ) : (
                <h1 className="heading vikasa-hero-title insight-detail-banner-title">
                  {title}
                </h1>
              )}
              <div className="insight-detail-banner-meta">
                {edits?.author ? (
                  <EditableField
                    as="span"
                    className="insight-detail-author"
                    value={author}
                    edit={edits.author}
                    label={`Insight ${authorKey}`}
                  />
                ) : (
                  <span className="insight-detail-author">{author}</span>
                )}
                <span aria-hidden>·</span>
                {edits?.dateLabel ? (
                  <EditableField
                    as="span"
                    value={dateLabel}
                    edit={edits.dateLabel}
                    label={`Insight ${dateLabelKey}`}
                  />
                ) : (
                  <span>{dateLabel}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="insight-detail-article">
        <div className="container">
          <div className="insight-detail-prose">
            {edits?.bodyHtml ? (
              <EditableField
                as="div"
                className="insight-detail-body"
                value={bodyHtml}
                edit={edits.bodyHtml}
                label={`Insight ${bodyKey}`}
                multiline
              />
            ) : (
              <div
                className="insight-detail-body"
                dangerouslySetInnerHTML={{ __html: bodyHtml }}
              />
            )}
          </div>
        </div>
      </section>

      {relatedCards.length > 0 ? (
        <section className="insight-related">
          <div className="container">
            <div className="insight-related-head">
              <h2>{t(locale, "insights.relatedTitle")}</h2>
              <p>{t(locale, "insights.relatedText")}</p>
            </div>
            <div className="row g-4">
              {relatedCards.map((item) => (
                <div key={item.slug} className="col-md-6 col-xl-4">
                  <article className="insight-card h-100">
                    <Link href={`/insights/${item.slug}`} className="insight-card-media">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.image} alt={item.title} loading="lazy" />
                    </Link>
                    <div className="insight-card-body">
                      <div className="insight-card-meta">
                        <span>{item.category}</span>
                        <span aria-hidden>·</span>
                        <span>{item.dateLabel}</span>
                      </div>
                      <h3>
                        <Link href={`/insights/${item.slug}`}>{item.title}</Link>
                      </h3>
                      <p>{item.excerpt}</p>
                      <Link href={`/insights/${item.slug}`} className="insight-card-link">
                        {t(locale, "common.readMore")}
                      </Link>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
