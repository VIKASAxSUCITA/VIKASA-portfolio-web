"use client";

import type { LogoItem } from "@/lib/content/logos";
import { useLocale } from "@/app/components/i18n/LocaleProvider";
import type { LocalizedString } from "@/lib/i18n/locale";
import { t } from "@/lib/i18n/locale";

type LogoMarqueeProps = {
  title: LocalizedString | string;
  subtitle?: LocalizedString | string;
  items: LogoItem[];
  /** `forward` = leftward; `reverse` = rightward (opposite loop). */
  direction?: "forward" | "reverse";
  id?: string;
};

function LogoMark({ item }: { item: LogoItem }) {
  if (item.logo) {
    return (
      <img
        src={item.logo}
        alt={item.name}
        className="logo-marquee-img"
        loading="lazy"
      />
    );
  }
  return <span className="logo-marquee-text">{item.name}</span>;
}

export default function LogoMarquee({
  title,
  subtitle,
  items,
  direction = "forward",
  id,
}: LogoMarqueeProps) {
  const { locale } = useLocale();
  const titleText = t(title, locale);
  const subtitleText = subtitle ? t(subtitle, locale) : "";

  // Enough marks for a smooth loop when the source list is short.
  const base =
    items.length >= 8
      ? items
      : [...items, ...items, ...items, ...items].slice(0, 8);
  const track = [...base, ...base];

  return (
    <section
      id={id}
      className={`logo-marquee-section section-padding${
        direction === "reverse" ? " is-reverse" : ""
      }`}
      aria-label={titleText}
    >
      <div className="container">
        <div className="section-headings text-center logo-marquee-head">
          <h2 className="heading text-50" data-aos="fade-up">
            {titleText}
          </h2>
          {subtitleText ? (
            <p className="text text-16" data-aos="fade-up" data-aos-delay="60">
              {subtitleText}
            </p>
          ) : null}
        </div>
      </div>

      <div
        className="logo-marquee"
        data-aos="fade-up"
        data-aos-delay="100"
        aria-hidden={false}
      >
        <div
          className={`logo-marquee-track logo-marquee-track--${direction}`}
        >
          {track.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="logo-marquee-item"
              title={item.name}
            >
              <LogoMark item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
