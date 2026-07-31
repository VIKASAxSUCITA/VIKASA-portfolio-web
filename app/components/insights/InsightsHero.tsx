"use client";

import { useLocale } from "@/app/components/i18n/LocaleProvider";
import type { InsightsContent } from "@/lib/content/types";
import { readLocalized } from "@/lib/i18n/localized";
import { ui, uiT } from "@/lib/i18n/ui";

type InsightsHeroProps = {
  heroTitle: InsightsContent["heroTitle"];
};

export default function InsightsHero({ heroTitle }: InsightsHeroProps) {
  const { locale } = useLocale();
  const title = readLocalized(heroTitle, locale);

  return (
    <section
      className="vikasa-hero-cinematic about-hero-cinematic page-hero-banner page-hero-banner--start"
      aria-label="Insights"
    >
      <div className="vikasa-hero-bg">
        <img
          src="/assets/img/vikasa/banners/insights-banner.jpeg"
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
          <div className="vikasa-hero-copy section-headings page-hero-copy">
            <h1 className="heading vikasa-hero-title" data-aos="fade-up">
              {title}
            </h1>
            <p
              className="text text-18 vikasa-hero-text page-hero-text"
              data-aos="fade-up"
              data-aos-delay="80"
            >
              {uiT(ui.pageHero.insightsText, locale)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
