import type { HomeContent } from "@/lib/content/types";

type HomeCtaProps = {
  content: HomeContent["cta"];
};

export default function HomeCta({ content }: HomeCtaProps) {
  return (
    <div className="text-banner mt-100">
      <div className="container-fluid">
        <div className="text-banner-inner radius18">
          <div className="section-headings">
            <div
              className="subheading text-20 subheading-bg"
              data-aos="fade-up"
            >
              <svg
                className="icon icon-14"
                xmlns="http://www.w3.org/2000/svg"
                width={14}
                height={14}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
              </svg>
              <span>{content.badge}</span>
              <svg
                className="icon icon-14"
                xmlns="http://www.w3.org/2000/svg"
                width={14}
                height={14}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
              </svg>
            </div>
            <h2 className="heading text-80" data-aos="fade-up">
              {content.title}
            </h2>
            <p className="text text-24" data-aos="fade-up">
              {content.text}
            </p>
            <div className="buttons" data-aos="fade-up">
              <a
                href="/#contact"
                className="button button--secondary"
                aria-label="See More Services"
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
                <span className="visually-hidden">
                  To learn more about the service, click this button.
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
