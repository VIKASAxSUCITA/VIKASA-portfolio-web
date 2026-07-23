import {
  eventExcerpt,
  formatEventBadgeDate,
  formatEventTimeRange,
} from "@/lib/content/events";
import type { EventsContent } from "@/lib/content/types";

type EventsListProps = {
  heading: EventsContent["heading"];
  posts: EventsContent["posts"];
};

function CalendarIcon() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3"
        y="5"
        width="18"
        height="16"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M3 9h18M8 3v4M16 3v4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

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
  return (
    <div className="events-schedule-section section-padding">
      <div className="container">
        <div className="section-headings text-center">
          <div
            className="subheading text-16 events-schedule-eyebrow"
            data-aos="fade-up"
          >
            Event Schedule
          </div>
          <h2
            className="heading text-50"
            data-aos="fade-up"
            data-aos-delay="50"
          >
            {heading}
          </h2>
        </div>

        {posts.length === 0 ? (
          <p className="text text-18 text-center" data-aos="fade-up">
            No events or announcements yet. Check back soon.
          </p>
        ) : (
          <div className="events-card-list">
            {posts.map((post, index) => {
              const badgeDate = formatEventBadgeDate(post.startsAt);
              const timeRange = formatEventTimeRange(
                post.startsAt,
                post.endsAt
              );

              return (
                <article
                  key={post.id}
                  className="event-list-card"
                  data-aos="fade-up"
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
                    {badgeDate ? (
                      <span className="event-list-card-date">
                        <CalendarIcon />
                        {badgeDate}
                      </span>
                    ) : null}
                  </div>

                  <div className="event-list-card-body">
                    <h3 className="heading event-list-card-title">
                      <a href={`/events/${post.id}`}>{post.title}</a>
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
                      {eventExcerpt(post, 180)}
                    </p>

                    <div className="event-list-card-footer">
                      <a
                        href={`/events/${post.id}`}
                        className="button button--primary event-list-card-cta"
                      >
                        View Details
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
