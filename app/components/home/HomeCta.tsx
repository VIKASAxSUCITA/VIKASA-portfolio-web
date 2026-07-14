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
                viewBox="0 0 14 14"
                fill="none"
              >
                <g clipPath="url(#clip0_9088_4143)">
                  <path
                    d="M8.71401 5.28599C11.7514 5.4205 14 5.9412 14 7C14 8.0588 11.7514 8.5795 8.71401 8.71401C8.5795 11.7514 8.0588 14 7 14C5.9412 14 5.4205 11.7514 5.28599 8.71401C2.2486 8.5795 -1.33117e-07 8.0588 0 7C4.62818e-08 5.94119 2.2486 5.4205 5.28599 5.28599C5.4205 2.2486 5.9412 0 7 0C8.0588 0 8.5795 2.2486 8.71401 5.28599Z"
                    fill="CurrentColor"
                  />
                </g>
                <defs>
                  <clipPath>
                    <rect width={14} height={14} fill="CurrentColor" />
                  </clipPath>
                </defs>
              </svg>
              <span>{content.badge}</span>
              <svg
                className="icon icon-14"
                xmlns="http://www.w3.org/2000/svg"
                width={14}
                height={14}
                viewBox="0 0 14 14"
                fill="none"
              >
                <g clipPath="url(#clip0_9088_4143)">
                  <path
                    d="M8.71401 5.28599C11.7514 5.4205 14 5.9412 14 7C14 8.0588 11.7514 8.5795 8.71401 8.71401C8.5795 11.7514 8.0588 14 7 14C5.9412 14 5.4205 11.7514 5.28599 8.71401C2.2486 8.5795 -1.33117e-07 8.0588 0 7C4.62818e-08 5.94119 2.2486 5.4205 5.28599 5.28599C5.4205 2.2486 5.9412 0 7 0C8.0588 0 8.5795 2.2486 8.71401 5.28599Z"
                    fill="CurrentColor"
                  />
                </g>
                <defs>
                  <clipPath>
                    <rect width={14} height={14} fill="CurrentColor" />
                  </clipPath>
                </defs>
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
