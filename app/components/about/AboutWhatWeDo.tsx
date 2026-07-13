const CHECK_ITEMS = [
  "Integrate a diverse range of ideas",
  "Deliver the highest quality outcomes",
  "Believe in power of implication",
] as const;

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={28}
      height={28}
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.81362 13.0268C8.34112 12.7113 7.70994 12.783 7.31911 13.196C6.92886 13.6084 6.89211 14.2431 7.23336 14.6975L10.7334 19.3642C10.9445 19.6453 11.2712 19.8168 11.6229 19.8303C11.9741 19.8431 12.313 19.6972 12.5446 19.4324L20.7113 10.0991C21.1144 9.63883 21.0928 8.94525 20.6623 8.51008C20.2318 8.07492 19.5388 8.04692 19.0739 8.44475L11.5786 14.8696L8.81362 13.0268Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.9327 0.515625C6.52939 0.515625 0.519531 6.52549 0.519531 13.9288C0.519531 21.3321 6.52939 27.3419 13.9327 27.3419C21.336 27.3419 27.3458 21.3321 27.3458 13.9288C27.3458 6.52549 21.336 0.515625 13.9327 0.515625ZM13.9327 1.68166C20.6921 1.68166 26.1798 7.16938 26.1798 13.9288C26.1798 20.6882 20.6921 26.1759 13.9327 26.1759C7.17329 26.1759 1.68557 20.6882 1.68557 13.9288C1.68557 7.16938 7.17329 1.68166 13.9327 1.68166Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function AboutWhatWeDo() {
  return (
    <section
      className="about-what section-padding"
      aria-labelledby="about-what-heading"
    >
      <div className="container">
        <div className="about-what-inner">
          <div
            className="subheading text-20 subheading-bg about-what-badge"
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
            <span>Our Company</span>
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
            id="about-what-heading"
            className="heading text-50 about-what-title"
            data-aos="fade-up"
            data-aos-delay="50"
          >
            What We Do
          </h2>

          <p
            className="text text-18 about-what-desc"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Our mission is to empower businesses of all sizes to thrive in an
            ever-changing marketplace.
          </p>

          <ul className="about-what-list list-unstyled">
            {CHECK_ITEMS.map((item, index) => (
              <li
                key={item}
                className="about-what-list-item text text-18"
                data-aos="fade-up"
                data-aos-delay={150 + index * 50}
              >
                <CheckIcon />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
