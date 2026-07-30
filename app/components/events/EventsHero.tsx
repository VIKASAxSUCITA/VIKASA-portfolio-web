"use client";

import { useLocale } from "@/app/components/i18n/LocaleProvider";
import type { EventsContent } from "@/lib/content/types";
import { readLocalized } from "@/lib/i18n/localized";

type EventsHeroProps = {
  heroTitle: EventsContent["heroTitle"];
};

export default function EventsHero({ heroTitle }: EventsHeroProps) {
  const { locale } = useLocale();
  const title = readLocalized(heroTitle, locale);
  const homeLabel =
    locale === "km" ? "ទំព័រដើម" : locale === "zh" ? "首页" : "Home";
  const eventsLabel =
    locale === "km" ? "ព្រឹត្តិការណ៍" : locale === "zh" ? "活动" : "Events";

  return (
    <section
      className="vikasa-hero-cinematic about-hero-cinematic page-hero-banner"
      aria-label="Events"
    >
      <div className="vikasa-hero-bg">
        <img
          src="/assets/img/vikasa/banners/events-banner.jpg"
          width={1920}
          height={1080}
          loading="eager"
          alt=""
          className="vikasa-hero-bg-image"
        />
        <div className="vikasa-hero-overlay" aria-hidden />
      </div>
      <div className="vikasa-hero-content">
        <div className="container text-center">
          <div className="vikasa-hero-copy section-headings page-hero-copy">
            <h1 className="heading vikasa-hero-title" data-aos="fade-up">
              {title}
            </h1>
            <ul
              className="breadcrumb list-unstyled page-hero-breadcrumb"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <li>
                <a href="/" className="text text-18" aria-label="Home Page">
                  {homeLabel}
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <span className="text text-18 active">{eventsLabel}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
