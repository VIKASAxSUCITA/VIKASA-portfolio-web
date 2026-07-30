"use client";

import EventDateBadge from "@/app/components/events/EventDateBadge";
import { useLocale } from "@/app/components/i18n/LocaleProvider";
import {
  eventExcerpt,
  eventText,
  formatEventTimeRange,
} from "@/lib/content/events";
import type { EventPost } from "@/lib/content/types";
import type { LocalizedString } from "@/lib/i18n/locale";
import { readLocalized } from "@/lib/i18n/localized";

type HomeEventsProps = {
  heading: LocalizedString | string;
  posts: EventPost[];
  /** Admin preview: cards open the Events editor instead of the public site. */
  adminLinks?: boolean;
};

const EYEBROW: Record<string, string> = {
  en: "Schedule",
  km: "កាលវិភាគ",
  zh: "日程",
};

const VIEW_DETAILS: Record<string, string> = {
  en: "View details",
  km: "មើលព័ត៌មាន",
  zh: "查看详情",
};

const VIEW_ALL: Record<string, string> = {
  en: "View all events",
  km: "មើលព្រឹត្តិការណ៍ទាំងអស់",
  zh: "查看全部活动",
};

function PinIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 7v5l3 2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowIcon() {
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

export default function HomeEvents({
  heading,
  posts,
  adminLinks = false,
}: HomeEventsProps) {
  const { locale } = useLocale();
  const headingText = readLocalized(heading, locale);
  const listHref = adminLinks ? "/admin/events" : "/events";
  const postHref = (id: string) =>
    adminLinks
      ? `/admin/events?edit=${encodeURIComponent(id)}`
      : `/events/${id}`;

  const cards = posts.slice(0, 3);
  const eyebrow = EYEBROW[locale] ?? EYEBROW.en;
  const detailsLabel = adminLinks
    ? "Edit event"
    : (VIEW_DETAILS[locale] ?? VIEW_DETAILS.en);
  const viewAll = adminLinks
    ? "Manage Events"
    : (VIEW_ALL[locale] ?? VIEW_ALL.en);

  return (
    <div id="home-events" className="home-events-section section-padding">
      <div className="container">
        <div className="home-events-head section-headings text-center">
          <p className="home-events-eyebrow" data-aos="fade-up">
            {eyebrow}
          </p>
          <h2
            id="events"
            className="heading text-50"
            data-aos="fade-up"
            data-aos-delay="50"
          >
            {headingText}
          </h2>
          {adminLinks ? (
            <p className="text text-14 admin-insights-preview-note">
              Click a card or Manage Events to edit in admin.
            </p>
          ) : null}
        </div>

        {cards.length === 0 ? (
          <p className="text text-16 text-center" data-aos="fade-up">
            {adminLinks
              ? "No events yet. Open Manage Events to create one."
              : "No events or announcements yet. Check back soon."}
          </p>
        ) : (
          <div className="home-events-grid">
            {cards.map((post, index) => {
              const title = eventText(post, "title", locale);
              const timeRange = formatEventTimeRange(
                post.startsAt,
                post.endsAt
              );
              const excerpt = eventExcerpt(post, 90, locale);

              return (
                <a
                  key={post.id}
                  href={postHref(post.id)}
                  className="home-event-card"
                  data-aos="fade-up"
                  data-aos-delay={index * 70}
                  aria-label={title}
                >
                  <span className="home-event-card-media">
                    <img
                      src={post.coverImage}
                      alt=""
                      width={420}
                      height={240}
                      loading="lazy"
                    />
                    <EventDateBadge startsAt={post.startsAt} />
                  </span>

                  <span className="home-event-card-body">
                    {post.kind ? (
                      <span className="home-event-card-kind">{post.kind}</span>
                    ) : null}
                    <span className="home-event-card-title heading">
                      {title}
                    </span>

                    <span className="home-event-card-meta">
                      {post.location ? (
                        <span>
                          <PinIcon />
                          {post.location}
                        </span>
                      ) : null}
                      {timeRange ? (
                        <span>
                          <ClockIcon />
                          {timeRange}
                        </span>
                      ) : null}
                    </span>

                    {excerpt ? (
                      <span className="home-event-card-excerpt text">
                        {excerpt}
                      </span>
                    ) : null}

                    <span className="home-event-card-cta">
                      {detailsLabel}
                      <ArrowIcon />
                    </span>
                  </span>
                </a>
              );
            })}
          </div>
        )}

        <div
          className="buttons buttons-discover"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <a
            href={listHref}
            className="button button--secondary home-events-view-all"
            aria-label={
              adminLinks ? "Manage Events in admin" : "View all events"
            }
          >
            {viewAll}
          </a>
        </div>
      </div>
    </div>
  );
}
