export default function AboutHero() {
  return (
    <section className="page-banner overlay about-hero" aria-label="About VIKASA">
      <picture className="media media-bg">
        <img
          src="/assets/img/vikasa/aboutUS_Banner_Page.png"
          width={1920}
          height={520}
          loading="eager"
          alt="VIKASA team collaborating"
        />
      </picture>
      <div className="page-banner-content">
        <div className="container text-center">
          <h1
            className="heading text-80 fw-700 about-hero-title"
            data-aos="fade-up"
          >
            About VIKASA
          </h1>
          <p
            className="text text-18 about-hero-desc"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Vikasa helps businesses grow through strategic consulting,
            innovation, and accountable solutions that create sustainable
            transformation.
          </p>
        </div>
      </div>
    </section>
  );
}
