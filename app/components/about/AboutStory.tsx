export default function AboutStory() {
  return (
    <section className="about-story section-padding" aria-labelledby="about-story-heading">
      <div className="container">
        <div className="about-story-inner text-center">
          <div
            className="subheading text-20 subheading-bg about-story-badge"
            data-aos="fade-up"
          >
            <svg
              className="icon icon-14"
              xmlns="http://www.w3.org/2000/svg"
              width={14}
              height={14}
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M8.71401 5.28599C11.7514 5.4205 14 5.9412 14 7C14 8.0588 11.7514 8.5795 8.71401 8.71401C8.5795 11.7514 8.0588 14 7 14C5.9412 14 5.4205 11.7514 5.28599 8.71401C2.2486 8.5795 -1.33117e-07 8.0588 0 7C4.62818e-08 5.94119 2.2486 5.4205 5.28599 5.28599C5.4205 2.2486 5.9412 0 7 0C8.0588 0 8.5795 2.2486 8.71401 5.28599Z"
                fill="currentColor"
              />
            </svg>
            <span>Our Story</span>
            <svg
              className="icon icon-14"
              xmlns="http://www.w3.org/2000/svg"
              width={14}
              height={14}
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M8.71401 5.28599C11.7514 5.4205 14 5.9412 14 7C14 8.0588 11.7514 8.5795 8.71401 8.71401C8.5795 11.7514 8.0588 14 7 14C5.9412 14 5.4205 11.7514 5.28599 8.71401C2.2486 8.5795 -1.33117e-07 8.0588 0 7C4.62818e-08 5.94119 2.2486 5.4205 5.28599 5.28599C5.4205 2.2486 5.9412 0 7 0C8.0588 0 8.5795 2.2486 8.71401 5.28599Z"
                fill="currentColor"
              />
            </svg>
          </div>

          <h2
            id="about-story-heading"
            className="heading text-50 about-story-title"
            data-aos="fade-up"
            data-aos-delay="50"
          >
            Why Vikasa Exists
          </h2>

          <p
            className="text text-18 about-story-desc"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Vikasa was founded to help businesses overcome challenges, embrace
            innovation, and achieve sustainable growth. We believe that
            accountability, continuous improvement, and strategic thinking
            enable organizations to transform today while preparing for
            tomorrow.
          </p>
        </div>
      </div>
    </section>
  );
}
