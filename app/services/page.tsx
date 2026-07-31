import type { Metadata } from "next";
import ServicesGrid from "@/app/components/services/ServicesGrid";
import FooterSection from "@/app/components/home/FooterSection";
import PageHeroCopy from "@/app/components/i18n/PageHeroCopy";
import { ui } from "@/lib/i18n/ui";

export const metadata: Metadata = {
  title: "Services",
  description:
    "VIKASA services — Investment, Business Enhancement, and Business Academy.",
};

export default function ServicesPage() {
  return (
    <>
      <section
        className="vikasa-hero-cinematic about-hero-cinematic page-hero-banner page-hero-banner--start"
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
            <PageHeroCopy
              title={ui.pageHero.servicesTitle}
              text={ui.pageHero.servicesText}
            />
          </div>
        </div>
      </section>
      <ServicesGrid />
      <FooterSection />
    </>
  );
}
