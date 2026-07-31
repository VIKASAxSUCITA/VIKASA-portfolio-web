"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { LocalizedString } from "@/lib/i18n/locale";
import { readLocalized } from "@/lib/i18n/localized";
import { useLocale } from "@/app/components/i18n/LocaleProvider";
import {
  formatInsightDate,
  insightExcerpt,
  insightText,
} from "@/lib/content/insights";
import type { InsightPost } from "@/lib/content/types";

type HomeInsightsProps = {
  heading: LocalizedString | string;
  posts: InsightPost[];
  /** Admin preview: cards open the Insights editor instead of the public site. */
  adminLinks?: boolean;
};

const EYEBROW: Record<string, string> = {
  en: "Articles & perspectives",
  km: "អត្ថបទ និងទស្សនៈ",
  zh: "文章与观点",
};

const READ_MORE: Record<string, string> = {
  en: "Read more",
  km: "អានបន្ថែម",
  zh: "阅读更多",
};

const VIEW_ALL: Record<string, string> = {
  en: "View all insights",
  km: "មើលអត្ថបទទាំងអស់",
  zh: "查看全部洞察",
};

function Chevron({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg width={18} height={18} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d={dir === "prev" ? "M12.5 4.5L7 10l5.5 5.5" : "M7.5 4.5L13 10l-5.5 5.5"}
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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

function NavButton({
  dir,
  label,
  disabled,
  onClick,
}: {
  dir: "prev" | "next";
  label: string;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={`insights-carousel-nav insights-carousel-nav--${dir}`}
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
    >
      <Chevron dir={dir} />
    </button>
  );
}

function InsightScrollCard({
  href,
  title,
  image,
  category,
  dateLabel,
  excerpt,
  readMore,
}: {
  href: string;
  title: string;
  image: string;
  category: string;
  dateLabel: string;
  excerpt: string;
  readMore: string;
}) {
  return (
    <a href={href} className="insight-scroll-card" aria-label={title}>
      <span className="insight-scroll-card-media">
        <img src={image} alt="" loading="lazy" />
        {category ? (
          <span className="insight-scroll-card-tag">{category}</span>
        ) : null}
      </span>
      <span className="insight-scroll-card-body">
        {dateLabel ? (
          <span className="insight-scroll-card-date">{dateLabel}</span>
        ) : null}
        <span className="insight-scroll-card-title heading">{title}</span>
        {excerpt ? (
          <span className="insight-scroll-card-excerpt text">{excerpt}</span>
        ) : null}
        <span className="insight-scroll-card-cta">
          {readMore}
          <ReadArrow />
        </span>
      </span>
    </a>
  );
}

export default function HomeInsights({
  heading,
  posts,
  adminLinks = false,
}: HomeInsightsProps) {
  const { locale } = useLocale();
  const headingText = readLocalized(heading, locale);
  const listHref = adminLinks ? "/admin/insights" : "/insights";
  const postHref = (id: string) =>
    adminLinks
      ? `/admin/insights?edit=${encodeURIComponent(id)}`
      : `/insights/${id}`;

  const viewportRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [paused, setPaused] = useState(false);
  const reduceMotionRef = useRef(false);

  const updateControls = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    const max = Math.max(0, el.scrollWidth - el.clientWidth);
    setCanPrev(el.scrollLeft > 6);
    setCanNext(el.scrollLeft < max - 6);
  }, []);

  useEffect(() => {
    reduceMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    updateControls();
    el.addEventListener("scroll", updateControls, { passive: true });
    const ro = new ResizeObserver(updateControls);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateControls);
      ro.disconnect();
    };
  }, [posts, updateControls]);

  const getStep = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return 0;
    const slide = el.querySelector(
      ".insights-carousel-slide"
    ) as HTMLElement | null;
    if (!slide) return el.clientWidth * 0.8;
    const track = el.querySelector(".insights-carousel-track");
    const gap = track
      ? Number.parseFloat(
          getComputedStyle(track).columnGap || getComputedStyle(track).gap || "0"
        ) || 0
      : 0;
    return slide.getBoundingClientRect().width + gap;
  }, []);

  const scrollByDir = useCallback(
    (dir: -1 | 1) => {
      const el = viewportRef.current;
      if (!el) return;
      el.scrollBy({ left: dir * getStep(), behavior: "smooth" });
    },
    [getStep]
  );

  useEffect(() => {
    if (posts.length <= 3 || reduceMotionRef.current || paused) return;
    const id = window.setInterval(() => {
      const el = viewportRef.current;
      if (!el) return;
      const max = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft >= max - 6) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollByDir(1);
      }
    }, 5500);
    return () => window.clearInterval(id);
  }, [posts.length, paused, scrollByDir]);

  const showNav = posts.length > 3;
  const eyebrow = EYEBROW[locale] ?? EYEBROW.en;
  const readMore = READ_MORE[locale] ?? READ_MORE.en;
  const viewAll = adminLinks
    ? "Manage Insights"
    : (VIEW_ALL[locale] ?? VIEW_ALL.en);

  let tiles: ReactNode;
  if (posts.length === 0) {
    tiles = (
      <p className="text text-16 insights-carousel-empty">
        {locale === "km"
          ? "មិនទាន់មានអត្ថបទទេ។"
          : locale === "zh"
            ? "暂无洞察文章。"
            : "No insights yet."}
      </p>
    );
  } else {
    tiles = posts.map((post) => (
      <div key={post.id} className="insights-carousel-slide">
        <InsightScrollCard
          href={postHref(post.id)}
          title={insightText(post, "title", locale)}
          image={post.image}
          category={post.category}
          dateLabel={formatInsightDate(post.createdAt, locale)}
          excerpt={insightExcerpt(post, 110, locale)}
          readMore={readMore}
        />
      </div>
    ));
  }

  return (
    <div
      className="insights-tiles-section section-padding"
      style={{ background: "#ffffff", backgroundColor: "#ffffff" }}
    >
      <div className="container">
        <div className="insights-carousel-head">
          <div className="insights-carousel-head-copy section-headings">
            <p className="insights-carousel-eyebrow" data-aos="fade-up">
              {eyebrow}
            </p>
            <h2
              id="insights"
              className="heading text-50"
              data-aos="fade-up"
              data-aos-delay="50"
            >
              {headingText}
            </h2>
            {adminLinks ? (
              <p className="text text-14 admin-insights-preview-note">
                Click a card or Manage Insights to edit in admin.
              </p>
            ) : null}
          </div>

          {showNav ? (
            <div className="insights-carousel-controls" data-aos="fade-up">
              <NavButton
                dir="prev"
                label={
                  locale === "km"
                    ? "មុន"
                    : locale === "zh"
                      ? "上一张"
                      : "Previous insight"
                }
                disabled={!canPrev}
                onClick={() => scrollByDir(-1)}
              />
              <NavButton
                dir="next"
                label={
                  locale === "km"
                    ? "បន្ទាប់"
                    : locale === "zh"
                      ? "下一张"
                      : "Next insight"
                }
                disabled={!canNext}
                onClick={() => scrollByDir(1)}
              />
            </div>
          ) : null}
        </div>

        <div
          className="insights-carousel"
          data-aos="fade-up"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node)) {
              setPaused(false);
            }
          }}
        >
          <div
            ref={viewportRef}
            className="insights-carousel-viewport"
            tabIndex={0}
            role="region"
            aria-roledescription="carousel"
            aria-label={headingText}
          >
            <div className="insights-carousel-track">{tiles}</div>
          </div>
        </div>

        <div
          className="buttons buttons-discover"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <a
            href={listHref}
            className="button button--secondary insights-carousel-view-all"
            aria-label={
              adminLinks ? "Manage Insights in admin" : "View all insights"
            }
          >
            {viewAll}
          </a>
        </div>
      </div>
    </div>
  );
}
