export default function HomeHero() {
  return (
    <div className="hero-slider with-floating-header with-fixed-bg">
      <div className="slider-card overlay">
        <picture className="slider-media">
          <img
            src="/assets/img/vikasa/home_page_banner.png"
            width={1920}
            height={1000}
            loading="eager"
            alt="VIKASA team"
          />
        </picture>
        <div className="slider-content">
          <div className="container height-100 d-flex align-items-center justify-content-center text-center">
            <div className="content-box section-headings">
              <h2
                className="heading text-90 fw-700"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                VIKASA
              </h2>
              <div
                className="text text-18"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                Transform your business with expert consultancy services our
                team of seasoned consultants unparalleled. Transform your
                business.
              </div>
              <div className="buttons" data-aos="fade-up" data-aos-delay="300">
                <a
                  href="/#contact"
                  className="button button--primary"
                  aria-label="Book Strategy Call"
                >
                  Free Consultation
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
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
