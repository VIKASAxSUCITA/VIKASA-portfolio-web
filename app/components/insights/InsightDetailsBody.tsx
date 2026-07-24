"use client";

import {
  EditableField,
  EditableMedia,
} from "@/app/components/admin/EditableField";
import InsightRichTextEditor from "@/app/components/insights/InsightRichTextEditor";
import { formatInsightDate } from "@/lib/content/insights";
import type { InsightPost } from "@/lib/content/types";

type InsightDetailsBodyProps = {
  post: InsightPost;
  edit?: { onChange: (updater: (prev: InsightPost) => InsightPost) => void };
};

export default function InsightDetailsBody({
  post,
  edit,
}: InsightDetailsBodyProps) {
  const dateLabel = formatInsightDate(post.createdAt);

  const patch = <K extends keyof InsightPost>(key: K, value: InsightPost[K]) =>
    edit?.onChange((prev) => ({ ...prev, [key]: value }));

  return (
    <main className="insight-detail">
      <section
        className={`insight-detail-hero${edit ? " is-editing" : ""}`}
        style={edit ? undefined : { backgroundImage: `url(${post.image})` }}
        aria-label={post.title}
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
            value={post.title}
            label="Insight title"
            edit={
              edit
                ? { onChange: (title) => patch("title", title) }
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
              content={post.bodyHtml}
              onChange={(bodyHtml) => patch("bodyHtml", bodyHtml)}
            />
          ) : (
            <div
              className="insight-rich-body"
              dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
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
