"use client";

import EventDateBadge from "@/app/components/events/EventDateBadge";
import { useLocale } from "@/app/components/i18n/LocaleProvider";
import {
  eventExcerpt,
  eventText,
  formatEventTimeRange,
} from "@/lib/content/events";
import type { EventsContent } from "@/lib/content/types";
import { readLocalized } from "@/lib/i18n/localized";
import { ui, uiT } from "@/lib/i18n/ui";

type EventsListProps = {
  heading: EventsContent["heading"];
  posts: EventsContent["posts"];
};

function PinIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" aria-hidden>
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
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" aria-hidden>
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
    <svg width={16} height={16} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M5 15L15 5M15 5H8M15 5V12"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function EventsList({ heading, posts }: EventsListProps) {
  const { locale } = useLocale();
  const headingText = readLocalized(heading, locale);

  return (
    <div className="events-schedule-section section-padding">
      <div className="container">
        <div className="section-headings text-center">
          <h2
            className="heading text-50"
            data-aos="fade-up"
            data-aos-delay="50"
          >
            {headingText}
          </h2>
        </div>

        {posts.length === 0 ? (
          <p className="text text-18 text-center" data-aos="fade-up">
            {uiT(ui.events.empty, locale)}
          </p>
        ) : (
          <div className="events-card-list">
            {posts.map((post, index) => {
              const title = eventText(post, "title", locale);
              const timeRange = formatEventTimeRange(
                post.startsAt,
                post.endsAt,
                locale
              );

              return (
                <article
                  key={post.id}
                  className="event-list-card"
                  data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
                  data-aos-delay={index * 60}
                >
                  <div className="event-list-card-media">
                    <img
                      src={post.coverImage}
                      alt=""
                      width={420}
                      height={280}
                      loading="lazy"
                    />
                    <EventDateBadge startsAt={post.startsAt} />
                  </div>

                  <div className="event-list-card-body">
                    <h3 className="heading event-list-card-title">
                      <a href={`/events/${post.id}`}>{title}</a>
                    </h3>

                    <ul className="event-list-card-meta list-unstyled">
                      {post.location ? (
                        <li>
                          <PinIcon />
                          <span>{post.location}</span>
                        </li>
                      ) : null}
                      {timeRange ? (
                        <li>
                          <ClockIcon />
                          <span>{timeRange}</span>
                        </li>
                      ) : null}
                    </ul>

                    <p className="text text-16 event-list-card-excerpt">
                      {eventExcerpt(post, 180, locale)}
                    </p>

                    <div className="event-list-card-footer">
                      <a
                        href={`/events/${post.id}`}
                        className="button button--primary event-list-card-cta"
                      >
                        {uiT(ui.events.viewDetails, locale)}
                        <span className="svg-wrapper" aria-hidden>
                          <ArrowIcon />
                        </span>
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
