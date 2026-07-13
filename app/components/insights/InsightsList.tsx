const POSTS = [
  {
    id: "1",
    image: "/assets/img/blog/1.jpg",
    title: "Empowering entrepreneu fueling growth knowledge",
    href: "/blog-details",
  },
  {
    id: "2",
    image: "/assets/img/blog/2.jpg",
    title: "Empowering entrepreneu fueling growth knowledge",
    href: "/blog-details",
  },
  {
    id: "3",
    image: "/assets/img/blog/3.jpg",
    title: "Empowering entrepreneu fueling growth knowledge",
    href: "/blog-details",
  },
  {
    id: "4",
    image: "/assets/img/blog/1.jpg",
    title: "Empowering entrepreneu fueling growth knowledge",
    href: "/blog-details",
  },
  {
    id: "5",
    image: "/assets/img/blog/2.jpg",
    title: "Empowering entrepreneu fueling growth knowledge",
    href: "/blog-details",
  },
  {
    id: "6",
    image: "/assets/img/blog/3.jpg",
    title: "Empowering entrepreneu fueling growth knowledge",
    href: "/blog-details",
  },
] as const;

export default function InsightsList() {
  return (
    <div className="featured-blog blog-style-3 section-padding">
      <div className="container">
        <div className="section-headings text-center">
          <h2
            className="heading text-50"
            data-aos="fade-up"
            data-aos-delay="50"
          >
            Latest Insights From Us
          </h2>
        </div>
        <div className="section-content">
          <div className="row product-grid justify-content-center">
            {POSTS.map((post, index) => (
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
                    <a href={post.href} className="heading text-22">
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
