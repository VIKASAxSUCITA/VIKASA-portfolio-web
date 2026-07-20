import type { HomeContent } from "@/lib/content/types";

type HomeAboutProps = {
  content: HomeContent["about"];
};

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={28}
      height={28}
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.9327 0.515625C6.52939 0.515625 0.519531 6.52549 0.519531 13.9288C0.519531 21.3321 6.52939 27.3419 13.9327 27.3419C21.336 27.3419 27.3458 21.3321 27.3458 13.9288C27.3458 6.52549 21.336 0.515625 13.9327 0.515625ZM13.9327 1.68166C20.6921 1.68166 26.1798 7.16938 26.1798 13.9288C26.1798 20.6882 20.6921 26.1759 13.9327 26.1759C7.17329 26.1759 1.68557 20.6882 1.68557 13.9288C1.68557 7.16938 7.17329 1.68166 13.9327 1.68166Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.81362 13.0268C8.34112 12.7113 7.70994 12.783 7.31911 13.196C6.92886 13.6084 6.89211 14.2431 7.23336 14.6975L10.7334 19.3642C10.9445 19.6453 11.2712 19.8168 11.6229 19.8303C11.9741 19.8431 12.313 19.6972 12.5446 19.4324L20.7113 10.0991C21.1144 9.63883 21.0928 8.94525 20.6623 8.51008C20.2318 8.07492 19.5388 8.04692 19.0739 8.44475L11.5786 14.8696L8.81362 13.0268Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function HomeAbout({ content }: HomeAboutProps) {
  return (
    <div id="about" className="image-text mt-100">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 col-12">
            <div className="media-wrap" data-aos="zoom-in-up">
              <img
                src={content.image}
                width={360}
                height={450}
                loading="lazy"
                alt="What we do"
                className="home-about-image"
              />
            </div>
          </div>
          <div className="col-lg-6 col-12">
            <div className="content section-headings">
              <h2 className="heading text-50" data-aos="fade-up">
                {content.title}
              </h2>
              <div className="text text-18" data-aos="fade-up">
                {content.text}
              </div>
              <ul className="text-lists list-unstyled">
                {content.items.map((item) => (
                  <li key={item} className="text-item text text-18" data-aos="fade-up">
                    <CheckIcon />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="buttons" data-aos="fade-up">
                <a
                  href="/about"
                  className="button button--primary"
                  aria-label="More About Us"
                >
                  {content.buttonLabel}
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
      </div>
    </div>
  );
}
