import InsightCardLink from "@/app/components/insights/InsightCardLink";
import type { InsightPost } from "@/lib/content/types";

type HomeInsightsProps = {
  heading: string;
  posts: InsightPost[];
  /** Admin preview: cards open the Insights editor instead of the public site. */
  adminLinks?: boolean;
};

export default function HomeInsights({
  heading,
  posts,
  adminLinks = false,
}: HomeInsightsProps) {
  const listHref = adminLinks ? "/admin/insights" : "/insights";
  const postHref = (id: string) =>
    adminLinks
      ? `/admin/insights?edit=${encodeURIComponent(id)}`
      : `/insights/${id}`;

  return (
    <div className="insights-tiles-section section-padding">
      <div className="container">
        <div className="section-headings text-center">
          <h2
            id="insights"
            className="heading text-50"
            data-aos="fade-up"
            data-aos-delay="50"
          >
            {heading}
          </h2>
          {adminLinks ? (
            <p className="text text-14 admin-insights-preview-note">
              Click a card or Manage Insights to edit in admin. Use Add Insight
              there to create a new one.
            </p>
          ) : null}
        </div>
      </div>

      <div className="insights-tiles-band" data-aos="fade-up">
        <div
          className="insights-tiles-grid"
          style={
            posts.length > 0 && posts.length < 3
              ? { gridTemplateColumns: `repeat(${posts.length}, minmax(0, 1fr))` }
              : undefined
          }
        >
          {posts.map((post, index) => (
            <InsightCardLink
              key={post.id}
              href={postHref(post.id)}
              title={post.title}
              image={post.image}
              index={index}
            />
          ))}
        </div>
      </div>

      <div className="container">
        <div
          className="buttons buttons-discover"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <a
            href={listHref}
            className="button button--primary"
            aria-label={
              adminLinks ? "Manage Insights in admin" : "Discover more Insights"
            }
          >
            {adminLinks ? "Manage Insights" : "Discover More"}
            <span className="svg-wrapper">
              <svg
                className="icon-20"
                width={20}
                height={20}
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.3365 7.84518L6.16435 15.0173L4.98584 13.8388L12.158 6.66667H5.83652V5H15.0032V14.1667H13.3365V7.84518Z"
                  fill="CurrentColor"
                />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
