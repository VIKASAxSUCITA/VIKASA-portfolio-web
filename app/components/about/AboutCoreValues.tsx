const values = [
  {
    id: "accountability",
    title: "Reinforce Accountability",
    text: "Taking responsibility, reliability and delivering with commitment.",
  },
  {
    id: "future",
    title: "Reshape Future",
    text: "Driving transformation through vision and action.",
  },
  {
    id: "growth",
    title: "Revitalize Growth",
    text: "Empowering businesses with strategies for long-term success.",
  },
  {
    id: "excellence",
    title: "Refining Excellence",
    text: "Conveys a sense of continuous improvement and attention to detail, often resulting in a more polished, elegant, or effective outcome.",
  },
  {
    id: "possibilities",
    title: "Reimagine Possibilities",
    text: "Thinking beyond limits to drive innovation and new solutions.",
  },
] as const;

function ValueIcon({ id }: { id: (typeof values)[number]["id"] }) {
  switch (id) {
    case "accountability":
      return (
        <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <path
            d="M24 6L10 12v10c0 9.2 5.9 17.7 14 20.5 8.1-2.8 14-11.3 14-20.5V12L24 6Z"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path
            d="M17.5 24.5 22 29l8.5-9.5"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "future":
      return (
        <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="2.2" />
          <path
            d="M24 14v10l7 4"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M34 10h8v8"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M42 10 30 22"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      );
    case "growth":
      return (
        <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <path
            d="M10 34h28"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M14 28 22 20l6 6 10-12"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M32 14h6v6"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "excellence":
      return (
        <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <path
            d="M24 8 28.5 18.5 40 20.2 31.5 28 33.8 39.5 24 33.8 14.2 39.5 16.5 28 8 20.2l11.5-1.7L24 8Z"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "possibilities":
      return (
        <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <path
            d="M24 8c-6.1 0-11 4.9-11 11 0 4.9 4.2 7.4 5.5 11.2.4 1.2 1.5 2 2.8 2h5.4c1.3 0 2.4-.8 2.8-2C30.8 26.4 35 20.9 35 19c0-6.1-4.9-11-11-11Z"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path
            d="M20 36h8M21.5 40h5"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M24 4v2M10 14H8M40 14h-2M13 8l-1.5-1.5M35 8l1.5-1.5"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </svg>
      );
  }
}

export default function AboutCoreValues() {
  return (
    <section
      className="about-values section-padding"
      aria-labelledby="about-values-heading"
    >
      <div className="container">
        <div className="about-values-head text-center">
          <h2
            id="about-values-heading"
            className="heading text-50 about-values-title"
            data-aos="fade-up"
            data-aos-delay="50"
          >
            Core Values
          </h2>
        </div>

        <div className="about-values-grid">
          {values.map((value, index) => (
            <article
              key={value.id}
              className="about-values-item"
              data-aos="fade-up"
              data-aos-delay={index * 80}
            >
              <div className="about-values-icon" aria-hidden="true">
                <ValueIcon id={value.id} />
              </div>
              <h3 className="heading text-22 about-values-item-title">
                {value.title}
              </h3>
              <p className="text text-16 about-values-item-desc">{value.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
