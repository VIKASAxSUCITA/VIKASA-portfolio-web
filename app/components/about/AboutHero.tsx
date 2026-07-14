import type { AboutContent } from "@/lib/content/types";

type AboutHeroProps = {
  content: AboutContent["hero"];
};

export default function AboutHero({ content }: AboutHeroProps) {
  return (
    <section className="page-banner overlay about-hero" aria-label="About VIKASA">
      <picture className="media media-bg">
        <img
          src={content.image}
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
            {content.title}
          </h1>
          <p
            className="text text-18 about-hero-desc"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {content.text}
          </p>
        </div>
      </div>
    </section>
  );
}
