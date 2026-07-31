"use client";

import { useLocale } from "@/app/components/i18n/LocaleProvider";
import type { LocalizedString } from "@/lib/i18n/locale";
import { uiT } from "@/lib/i18n/ui";

type PageHeroCopyProps = {
  title: LocalizedString;
  text: LocalizedString;
  centered?: boolean;
};

/** Localized title + subtitle for static page heroes (Contact, Services). */
export default function PageHeroCopy({
  title,
  text,
  centered = false,
}: PageHeroCopyProps) {
  const { locale } = useLocale();

  return (
    <div
      className={`vikasa-hero-copy section-headings${
        centered ? " page-hero-copy" : ""
      }`}
    >
      <h1 className="heading vikasa-hero-title" data-aos="fade-up">
        {uiT(title, locale)}
      </h1>
      <p
        className={`text text-18 vikasa-hero-text${
          centered ? " page-hero-text" : ""
        }`}
        data-aos="fade-up"
        data-aos-delay="80"
      >
        {uiT(text, locale)}
      </p>
    </div>
  );
}
