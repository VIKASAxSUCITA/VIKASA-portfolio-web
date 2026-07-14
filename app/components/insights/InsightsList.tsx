import type { InsightsContent } from "@/lib/content/types";

type InsightsListProps = {
  heading: InsightsContent["heading"];
  posts: InsightsContent["posts"];
};

export default function InsightsList({ heading, posts }: InsightsListProps) {
  return (
    <div className="featured-blog blog-style-3 section-padding">
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
        <div className="section-content">
          <div className="row product-grid justify-content-center">
            {posts.map((post, index) => (
              <div
                key={post.id}
                className="col-12 col-md-6 col-lg-4"
                data-aos="fade-up"
                data-aos-delay={index % 3 === 0 ? undefined : (index % 3) * 100}
              >
                <div className="card-blog-list" data-aos="fade-up">
                  <div className="card-blog-list-media radius18">
                    <div className="media">
                      <img
                        src={post.image}
                        alt=""
                        width={1000}
                        height={707}
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <h2 className="card-blog-heading heading text-22">
                    <a href="/blog-details" className="heading text-22">
                      {post.title}
                    </a>
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
