"use client";

import { useState } from "react";
import {
  EditableField,
  EditableMedia,
} from "@/app/components/admin/EditableField";
import LocaleEditTabs from "@/app/components/i18n/LocaleEditTabs";
import AutoTranslateButton from "@/app/components/i18n/AutoTranslateButton";
import { useLocale } from "@/app/components/i18n/LocaleProvider";
import InsightRichTextEditor from "@/app/components/insights/InsightRichTextEditor";
import {
  formatInsightDate,
  insightText,
} from "@/lib/content/insights";
import type { InsightPost } from "@/lib/content/types";
import type { Locale } from "@/lib/i18n/locale";

type InsightDetailsBodyProps = {
  post: InsightPost;
  edit?: { onChange: (updater: (prev: InsightPost) => InsightPost) => void };
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
  edit,
}: InsightDetailsBodyProps) {
  const { locale: siteLocale } = useLocale();
  const [editLocale, setEditLocale] = useState<Locale>("en");
  const locale = edit ? editLocale : siteLocale;

  const displayTitle = insightText(post, "title", locale);
  const displayBody = insightText(post, "bodyHtml", locale);
  const dateLabel = formatInsightDate(post.createdAt, locale);

  const titleKey = titleKeyFor(locale);
  const bodyKey = bodyKeyFor(locale);

  const patch = <K extends keyof InsightPost>(key: K, value: InsightPost[K]) =>
    edit?.onChange((prev) => ({ ...prev, [key]: value }));

  return (
    <main className="insight-detail">
      <section
        className={`insight-detail-hero${edit ? " is-editing" : ""}`}
        style={edit ? undefined : { backgroundImage: `url(${post.image})` }}
        aria-label={displayTitle}
      >
        {edit ? (
          <picture className="media media-bg insight-detail-hero-media">
            <EditableMedia
              src={post.image}
              width={1920}
              height={900}
              loading="eager"
              alt=""
              edit={{ onChange: (image) => patch("image", image) }}
            />
          </picture>
        ) : null}
        <div className="insight-detail-hero-overlay" aria-hidden />
        <div className="container insight-detail-hero-content">
          {edit ? (
            <div className="locale-edit-bar">
              <LocaleEditTabs
                locale={editLocale}
                onChange={setEditLocale}
              />
              <AutoTranslateButton
                sources={[post.title, post.bodyHtml]}
                onTranslated={(target, values) => {
                  const [titleVal, bodyVal] = values;
                  edit.onChange((prev) => {
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
          ) : null}
          {edit ? (
            <EditableField
              as="span"
              className="insight-detail-tag"
              value={post.category}
              label="Category"
              edit={{ onChange: (category) => patch("category", category) }}
            />
          ) : (
            <span className="insight-detail-tag">{post.category}</span>
          )}
          <EditableField
            as="h1"
            className="heading insight-detail-hero-title"
            value={
              edit ? String(post[titleKey] || post.title) : displayTitle
            }
            label="Insight title"
            edit={
              edit
                ? {
                    onChange: (value) =>
                      patch(titleKey, value as InsightPost[typeof titleKey]),
                  }
                : undefined
            }
          />
          <div className="insight-detail-hero-meta text text-14">
            {edit ? (
              <EditableField
                as="span"
                className="insight-detail-author"
                value={post.author}
                label="Author"
                edit={{ onChange: (author) => patch("author", author) }}
              />
            ) : (
              <span className="insight-detail-author">{post.author}</span>
            )}
            {dateLabel ? <span>{dateLabel}</span> : null}
          </div>
        </div>
      </section>

      <article className="insight-detail-article">
        <div className="insight-detail-inner">
          {edit ? (
            <InsightRichTextEditor
              content={String(post[bodyKey] || post.bodyHtml)}
              onChange={(value) =>
                patch(bodyKey, value as InsightPost[typeof bodyKey])
              }
            />
          ) : (
            <div
              className="insight-rich-body"
              dangerouslySetInnerHTML={{ __html: displayBody }}
            />
          )}

          <p className="insight-detail-byline text text-16">
            By{" "}
            {edit ? (
              <EditableField
                as="strong"
                value={post.author}
                label="Author"
                edit={{ onChange: (author) => patch("author", author) }}
              />
            ) : (
              <strong>{post.author}</strong>
            )}
          </p>
        </div>
      </article>
    </main>
  );
}
