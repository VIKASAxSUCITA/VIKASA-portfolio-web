import {
  eventKindLabel,
  formatEventBadgeDate,
  formatEventTimeRange,
} from "@/lib/content/events";
import type { EventPost } from "@/lib/content/types";

type EventContactInfo = {
  email?: string;
  phone?: string;
};

type EventDetailsBodyProps = {
  post: EventPost;
  contact?: EventContactInfo;
};

export default function EventDetailsBody({
  post,
  contact,
}: EventDetailsBodyProps) {
  const dateLabel = formatEventBadgeDate(post.startsAt);
  const timeRange = formatEventTimeRange(post.startsAt, post.endsAt);
  const paragraphs = post.body
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean);

  const infoRows = [
    { label: "Category", value: eventKindLabel(post.kind) },
    { label: "Date", value: dateLabel },
    { label: "Time", value: timeRange },
    { label: "Phone", value: contact?.phone || "" },
    { label: "Location", value: post.location },
    { label: "E-mail", value: contact?.email || "" },
  ].filter((row) => row.value);

  return (
    <main className="event-detail-page">
      <section className="page-banner overlay" aria-label={post.title}>
        <picture className="media media-bg">
          <img
            src={post.coverImage}
            width={1920}
            height={520}
            loading="eager"
            alt=""
          />
        </picture>
        <div className="page-banner-content">
          <div className="container text-center">
            <h1 className="heading text-80 fw-700" data-aos="fade-up">
              {post.title}
            </h1>
            <ul
              className="breadcrumb list-unstyled"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <li>
                <a href="/" className="text text-18">
                  Home
                </a>
              </li>
              <li>
                <svg
                  width={8}
                  height={12}
                  viewBox="0 0 8 12"
                  fill="none"
                  aria-hidden
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.08929 5.40903C7.24552 5.5653 7.33328 5.77723 7.33328 5.9982C7.33328 6.21917 7.24552 6.43109 7.08929 6.58736L2.37512 11.3015C2.29825 11.3811 2.2063 11.4446 2.10463 11.4883C2.00296 11.532 1.89361 11.5549 1.78296 11.5559C1.67231 11.5569 1.56258 11.5358 1.46016 11.4939C1.35775 11.452 1.2647 11.3901 1.18646 11.3119C1.10822 11.2336 1.04634 11.1406 1.00444 11.0382C0.962537 10.9357 0.941453 10.826 0.942414 10.7154C0.943376 10.6047 0.966364 10.4954 1.01004 10.3937C1.05371 10.292 1.1172 10.2001 1.19679 10.1232L5.32179 5.9982L1.19679 1.8732C1.04499 1.71603 0.960996 1.50553 0.962894 1.28703C0.964793 1.06853 1.05243 0.859522 1.20694 0.705015C1.36145 0.550508 1.57046 0.462868 1.78896 0.460969C2.00745 0.45907 2.21795 0.543066 2.37512 0.694864L7.08929 5.40903Z"
                    fill="currentColor"
                  />
                </svg>
              </li>
              <li>
                <a href="/events" className="text text-18">
                  Events
                </a>
              </li>
              <li>
                <svg
                  width={8}
                  height={12}
                  viewBox="0 0 8 12"
                  fill="none"
                  aria-hidden
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.08929 5.40903C7.24552 5.5653 7.33328 5.77723 7.33328 5.9982C7.33328 6.21917 7.24552 6.43109 7.08929 6.58736L2.37512 11.3015C2.29825 11.3811 2.2063 11.4446 2.10463 11.4883C2.00296 11.532 1.89361 11.5549 1.78296 11.5559C1.67231 11.5569 1.56258 11.5358 1.46016 11.4939C1.35775 11.452 1.2647 11.3901 1.18646 11.3119C1.10822 11.2336 1.04634 11.1406 1.00444 11.0382C0.962537 10.9357 0.941453 10.826 0.942414 10.7154C0.943376 10.6047 0.966364 10.4954 1.01004 10.3937C1.05371 10.292 1.1172 10.2001 1.19679 10.1232L5.32179 5.9982L1.19679 1.8732C1.04499 1.71603 0.960996 1.50553 0.962894 1.28703C0.964793 1.06853 1.05243 0.859522 1.20694 0.705015C1.36145 0.550508 1.57046 0.462868 1.78896 0.460969C2.00745 0.45907 2.21795 0.543066 2.37512 0.694864L7.08929 5.40903Z"
                    fill="currentColor"
                  />
                </svg>
              </li>
              <li>
                <span className="text text-18 active">{post.title}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="event-detail-content section-padding">
        <div className="container">
          <div className="event-detail-layout">
            <div className="event-detail-main">
              <figure className="event-detail-feature radius18">
                <img
                  src={post.image}
                  alt=""
                  width={1200}
                  height={700}
                  loading="eager"
                />
              </figure>

              <h2 className="heading event-detail-title">{post.title}</h2>

              {post.summary ? (
                <p className="text text-18 event-detail-lead">{post.summary}</p>
              ) : null}

              {paragraphs.map((paragraph, index) => (
                <p key={index} className="text text-16 event-detail-copy">
                  {paragraph}
                </p>
              ))}
            </div>

            <aside className="event-detail-sidebar">
              <div className="event-info-card">
                <h3 className="heading text-22 event-info-card-title">
                  Information
                </h3>
                <ul className="event-info-list list-unstyled">
                  {infoRows.map((row) => (
                    <li key={row.label}>
                      <span className="event-info-label">{row.label}</span>
                      {row.label === "E-mail" ? (
                        <a href={`mailto:${row.value}`}>{row.value}</a>
                      ) : row.label === "Phone" ? (
                        <a href={`tel:${row.value.replace(/\s+/g, "")}`}>
                          {row.value}
                        </a>
                      ) : (
                        <span>{row.value}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="event-info-card event-register-card">
                <h3 className="heading text-22 event-info-card-title">
                  Get Involved
                </h3>
                <p className="text text-16">
                  Interested in this {eventKindLabel(post.kind).toLowerCase()}?
                  Reach out and we will share the next steps.
                </p>
                <a href="/#contact" className="button button--primary">
                  Contact Us
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
