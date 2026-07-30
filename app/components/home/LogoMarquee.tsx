"use client";

import type { LogoItem } from "@/lib/content/logos";

type LogoMarqueeProps = {
  title: string;
  subtitle?: string;
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
      aria-label={title}
    >
      <div className="container">
        <div className="section-headings text-center logo-marquee-head">
          <h2 className="heading text-50">{title}</h2>
          {subtitle ? <p className="text text-16">{subtitle}</p> : null}
        </div>
      </div>

      <div className="logo-marquee" aria-hidden={false}>
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
