import { formatInsightDate } from "@/lib/content/insights";
import type { InsightPost } from "@/lib/content/types";

type InsightDetailsBodyProps = {
  post: InsightPost;
};

export default function InsightDetailsBody({ post }: InsightDetailsBodyProps) {
  const dateLabel = formatInsightDate(post.createdAt);
  const [lead, second, third, fourth] = post.paragraphs;
  const quote = post.quote.trim();
  const sectionTitle = post.sectionTitle.trim();

  return (
    <main className="insight-detail">
      <section
        className="insight-detail-hero"
        style={{ backgroundImage: `url(${post.image})` }}
        aria-label={post.title}
      >
        <div className="insight-detail-hero-overlay" aria-hidden />
        <div className="container insight-detail-hero-content">
          <span className="insight-detail-tag">{post.category}</span>
          <h1 className="heading insight-detail-hero-title">{post.title}</h1>
          <div className="insight-detail-hero-meta text text-14">
            <span className="insight-detail-author">{post.author}</span>
            {dateLabel ? <span>{dateLabel}</span> : null}
          </div>
        </div>
      </section>

      <article className="insight-detail-article">
        <div className="insight-detail-inner">
          {lead ? <p className="insight-detail-lead text">{lead}</p> : null}
          {second ? <p className="text insight-detail-copy">{second}</p> : null}

          <div className="insight-detail-paired">
            {post.pairedImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt=""
                width={768}
                height={700}
                loading="lazy"
              />
            ))}
          </div>

          {sectionTitle ? (
            <h2 className="heading insight-detail-section-title">
              {sectionTitle}
            </h2>
          ) : null}

          {third ? <p className="text insight-detail-copy">{third}</p> : null}

          {quote ? (
            <blockquote className="insight-detail-quote">
              <span className="insight-detail-quote-mark" aria-hidden>
                “
              </span>
              <p>{quote}</p>
            </blockquote>
          ) : null}

          {fourth ? <p className="text insight-detail-copy">{fourth}</p> : null}

          <figure className="insight-detail-feature">
            <img
              src={post.image}
              alt=""
              width={1200}
              height={700}
              loading="lazy"
            />
          </figure>
          <p className="insight-detail-byline text text-16">
            By <strong>{post.author}</strong>
          </p>
        </div>
      </article>
    </main>
  );
}
