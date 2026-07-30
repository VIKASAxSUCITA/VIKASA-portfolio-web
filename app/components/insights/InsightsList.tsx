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

function ArrowIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M7.5 4.5L13 10L7.5 15.5"
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
    locale === "km" ? "អានបន្ថែម" : locale === "zh" ? "阅读更多" : "Read More";

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

        <div className="insights-articles-grid">
          {posts.map((post, index) => {
            const title = insightText(post, "title", locale);
            const dateLabel = formatInsightDate(post.createdAt);
            const meta = [post.category.toUpperCase(), dateLabel]
              .filter(Boolean)
              .join(" • ");

            return (
              <a
                key={post.id}
                href={`/insights/${post.id}`}
                className="insight-article-card"
                data-aos="fade-up"
                data-aos-delay={index % 3 === 0 ? undefined : (index % 3) * 80}
                style={{
                  ["--insight-card-image" as string]: `url(${post.image})`,
                }}
              >
                <span className="insight-article-card-meta text text-14">
                  {meta}
                </span>
                <h3 className="insight-article-card-title heading">{title}</h3>
                <p className="insight-article-card-excerpt text text-16">
                  {insightExcerpt(post, 140, locale)}
                </p>
                <span className="insight-article-card-cta">
                  <span className="insight-article-card-cta-label">
                    {readMore}
                  </span>
                  <span className="insight-article-card-arrow" aria-hidden>
                    <ArrowIcon />
                  </span>
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
