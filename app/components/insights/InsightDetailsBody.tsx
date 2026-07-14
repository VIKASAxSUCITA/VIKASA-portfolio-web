import type { InsightPost } from "@/lib/content/types";

type InsightDetailsBodyProps = {
  post: InsightPost;
};

export default function InsightDetailsBody({ post }: InsightDetailsBodyProps) {
  return (
    <main>
      <section className="page-banner overlay" aria-label="Insight details">
        <picture className="media media-bg">
          <img
            src="/assets/img/banner/page-banner.jpg"
            width={1920}
            height={520}
            alt=""
          />
        </picture>
        <div className="page-banner-content">
          <div className="container text-center">
            <h1 className="heading text-80 fw-700" data-aos="fade-up">
              Insight
            </h1>
          </div>
        </div>
      </section>

      <div className="page-blog-details mt-100">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="blog-details">
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

                  <div className="card-blog-content">
                    <h2 className="card-blog-heading heading text-50">
                      {post.title}
                    </h2>

                    <div className="blog-description">
                      {post.paragraphs.slice(0, 2).map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}

                      <div className="blog-paired-image">
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

                      {post.paragraphs.slice(2).map((paragraph, index) => (
                        <p key={index + 2}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
