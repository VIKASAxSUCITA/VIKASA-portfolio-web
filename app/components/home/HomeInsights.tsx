export default function HomeInsights() {
  return (
    <div className="featured-blog blog-style-3 section-padding">
      <div className="container">
        <div className="section-headings text-center">
          <h2
            id="insights"
            className="heading text-50"
            data-aos="fade-up"
            data-aos-delay="50"
          >
            Latest Insights From Us
          </h2>
        </div>
        <div className="section-content">
          <div className="row product-grid justify-content-center">
            <div className="col-12 col-md-6 col-lg-4" data-aos="fade-up">
              <div className="card-blog-list" data-aos="fade-up">
                <div className="card-blog-list-media radius18">
                  <div className="media">
                    <img
                      src="/assets/img/blog/1.jpg"
                      alt="blog image"
                      width={1000}
                      height={707}
                      loading="lazy"
                    />
                  </div>
                </div>
                <h2 className="card-blog-heading heading text-22">
                  <a href="/blog-details" className="heading text-22">
                    Empowering entrepreneu fueling growth knowledge
                  </a>
                </h2>
              </div>
            </div>
            <div
              className="col-12 col-md-6 col-lg-4"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="card-blog-list" data-aos="fade-up">
                <div className="card-blog-list-media radius18">
                  <div className="media">
                    <img
                      src="/assets/img/blog/2.jpg"
                      alt="blog image"
                      width={1000}
                      height={707}
                      loading="lazy"
                    />
                  </div>
                </div>

                <h2 className="card-blog-heading heading text-22">
                  <a href="/blog-details" className="heading text-22">
                    Empowering entrepreneu fueling growth knowledge
                  </a>
                </h2>
              </div>
            </div>
            <div
              className="col-12 col-md-6 col-lg-4"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="card-blog-list" data-aos="fade-up">
                <div className="card-blog-list-media radius18">
                  <div className="media">
                    <img
                      src="/assets/img/blog/3.jpg"
                      alt="blog image"
                      width={1000}
                      height={707}
                      loading="lazy"
                    />
                  </div>
                </div>

                <h2 className="card-blog-heading heading text-22">
                  <a href="/blog-details" className="heading text-22">
                    Empowering entrepreneu fueling growth knowledge
                  </a>
                </h2>
              </div>
            </div>
          </div>

          <div
            className="buttons buttons-discover"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <a
              href="/insights"
              className="button button--primary"
              aria-label="Discover more Insights"
            >
              Discover More
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
    </div>
  );
}
