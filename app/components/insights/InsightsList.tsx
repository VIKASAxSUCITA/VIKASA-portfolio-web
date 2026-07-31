"use client";

import { useLocale } from "@/app/components/i18n/LocaleProvider";
import {
  formatInsightDate,
  insightExcerpt,
  insightText,
} from "@/lib/content/insights";
import type { InsightsContent } from "@/lib/content/types";
import { readLocalized } from "@/lib/i18n/localized";

type InsightsListProps = {
  heading: InsightsContent["heading"];
  posts: InsightsContent["posts"];
};

function ReadArrow() {
  return (
    <svg width={14} height={14} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M4 10h11M11 5l5 5-5 5"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function InsightsList({ heading, posts }: InsightsListProps) {
  const { locale } = useLocale();
  const headingText = readLocalized(heading, locale);
  const eyebrow =
    locale === "km"
      ? "វិចារណកថារបស់យើង"
      : locale === "zh"
        ? "我们的洞察"
        : "Our Insights";
  const readMore =
    locale === "km" ? "អានបន្ថែម" : locale === "zh" ? "阅读更多" : "Read more";

  return (
    <div className="insights-articles-section section-padding">
      <div className="container">
        <div className="section-headings text-center">
          <div
            className="subheading text-16 insights-articles-eyebrow"
            data-aos="fade-up"
          >
            {eyebrow}
          </div>
          <h2
            className="heading text-50"
            data-aos="fade-up"
            data-aos-delay="50"
          >
            {headingText}
          </h2>
        </div>

        {posts.length === 0 ? (
          <p className="text text-16 text-center" data-aos="fade-up">
            {locale === "km"
              ? "មិនទាន់មានអត្ថបទទេ។"
              : locale === "zh"
                ? "暂无洞察文章。"
                : "No insights yet."}
          </p>
        ) : (
          <div className="insights-articles-grid">
            {posts.map((post, index) => {
              const title = insightText(post, "title", locale);
              const dateLabel = formatInsightDate(post.createdAt, locale);
              const excerpt = insightExcerpt(post, 110, locale);

              return (
                <a
                  key={post.id}
                  href={`/insights/${post.id}`}
                  className="insight-scroll-card"
                  data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
                  data-aos-delay={index % 3 === 0 ? undefined : (index % 3) * 80}
                  aria-label={title}
                >
                  <span className="insight-scroll-card-media">
                    <img src={post.image} alt="" loading="lazy" />
                    {post.category ? (
                      <span className="insight-scroll-card-tag">
                        {post.category}
                      </span>
                    ) : null}
                  </span>
                  <span className="insight-scroll-card-body">
                    {dateLabel ? (
                      <span className="insight-scroll-card-date">
                        {dateLabel}
                      </span>
                    ) : null}
                    <span className="insight-scroll-card-title heading">
                      {title}
                    </span>
                    {excerpt ? (
                      <span className="insight-scroll-card-excerpt text">
                        {excerpt}
                      </span>
                    ) : null}
                    <span className="insight-scroll-card-cta">
                      {readMore}
                      <ReadArrow />
                    </span>
                  </span>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
