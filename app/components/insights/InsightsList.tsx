import InsightCardLink from "@/app/components/insights/InsightCardLink";
import type { InsightsContent } from "@/lib/content/types";

type InsightsListProps = {
  heading: InsightsContent["heading"];
  posts: InsightsContent["posts"];
};

export default function InsightsList({ heading, posts }: InsightsListProps) {
  return (
    <div className="insights-tiles-section section-padding">
      <div className="container">
        <div className="section-headings text-center">
          <h2
            className="heading text-50"
            data-aos="fade-up"
            data-aos-delay="50"
          >
            {heading}
          </h2>
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
              href={`/insights/${post.id}`}
              title={post.title}
              image={post.image}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
