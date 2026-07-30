import type { Metadata } from "next";
import ServicesGrid from "@/app/components/services/ServicesGrid";
import FooterSection from "@/app/components/home/FooterSection";

export const metadata: Metadata = {
  title: "Services",
  description:
    "VIKASA services — Investment, Business Enhancement, and Business Academy.",
};

export default function ServicesPage() {
  return (
    <>
      <section
      className="vikasa-hero-cinematic about-hero-cinematic page-hero-banner"
        aria-label="Services"
      >
        <div className="vikasa-hero-bg">
          <img
            src="/assets/img/vikasa/banners/home-services-banner.jpg"
            width={1920}
            height={1080}
            loading="eager"
            alt=""
            className="vikasa-hero-bg-image"
          />
          <div className="vikasa-hero-overlay" aria-hidden />
        </div>
        <div className="vikasa-hero-content">
          <div className="container">
            <div className="vikasa-hero-copy section-headings">
              <h1
                className="heading vikasa-hero-title"
                data-aos="fade-up"
              >
                Services
              </h1>
              <p
                className="text text-18 vikasa-hero-text"
                data-aos="fade-up"
                data-aos-delay="80"
              >
                Practical consulting for investment, growth, and leadership
                capability.
              </p>
            </div>
          </div>
        </div>
      </section>
      <ServicesGrid />
      <FooterSection />
    </>
  );
}
