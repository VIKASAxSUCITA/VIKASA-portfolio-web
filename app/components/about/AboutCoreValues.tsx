"use client";

import { useLocale } from "@/app/components/i18n/LocaleProvider";
import type { Locale } from "@/lib/i18n/locale";

const values = [
  {
    id: "accountability",
    title: {
      en: "Reinforce Accountability",
      km: "ពង្រឹងភាពទទួលខុសត្រូវ",
      zh: "强化问责",
    },
    text: {
      en: "Taking responsibility, reliability and delivering with commitment.",
      km: "ទទួលខុសត្រូវ នូវភាពអាចទុកចិត្តបាន និងបំពេញការងារដោយការប្តេជ្ញាចិត្ត។",
      zh: "承担责任、可靠交付、以承诺兑现结果。",
    },
  },
  {
    id: "future",
    title: {
      en: "Reshape Future",
      km: "ប្តូររូបរាងអនាគត",
      zh: "重塑未来",
    },
    text: {
      en: "Driving transformation through vision and action.",
      km: "ជំរុញការផ្លាស់ប្តូរតាមរយៈចក្ខុវិស័យ និងសកម្មភាព។",
      zh: "以愿景与行动推动变革。",
    },
  },
  {
    id: "growth",
    title: {
      en: "Revitalize Growth",
      km: "បន្ធប់បន្ថយកំណើន",
      zh: "焕新增长",
    },
    text: {
      en: "Empowering businesses with strategies for long-term success.",
      km: "ជួយអាជីវកម្មដោយយុទ្ធសាស្ត្រសម្រាប់ជោគជ័យរយៈពេលវែង។",
      zh: "以长期成功策略赋能企业。",
    },
  },
  {
    id: "excellence",
    title: {
      en: "Refining Excellence",
      km: "កែលម្អភាពល្អឥតខច្ចៗ",
      zh: "精进卓越",
    },
    text: {
      en: "Conveys a sense of continuous improvement and attention to detail, often resulting in a more polished, elegant, or effective outcome.",
      km: "បង្ហាញពីការកែលម្អបន្ត និងការយកចិត្តទុកដាក់លម្អិត ដែលនាំទៅរកលទ្ធផលដែលមានគុណភាព និងមានប្រសិទ្ធភាព។",
      zh: "体现持续改进与细节关注，带来更精致、更有效的结果。",
    },
  },
  {
    id: "possibilities",
    title: {
      en: "Reimagine Possibilities",
      km: "គិតឡើងវិញនូវលទ្ធភាព",
      zh: "重新想象可能",
    },
    text: {
      en: "Thinking beyond limits to drive innovation and new solutions.",
      km: "គិតលើសពីដែនកំណត់ ដើម្បីជំរុញនវានុវត្តន៍ និងដំណោះស្រាយថ្មី។",
      zh: "突破边界思考，驱动创新与新方案。",
    },
  },
] as const;

function localizedCopy(
  field: { en: string; km: string; zh: string },
  locale: Locale
) {
  return (field[locale] || field.en).trim() || field.en;
}

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
  const { locale } = useLocale();
  const sectionTitle =
    locale === "km"
      ? "តម្លៃស្នូល"
      : locale === "zh"
        ? "核心价值观"
        : "Core Values";

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
            {sectionTitle}
          </h2>
        </div>

        <div className="about-values-grid">
          {values.map((value, index) => (
            <article
              key={value.id}
              className="about-values-item"
              data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
              data-aos-delay={index * 80}
            >
              <div className="about-values-icon" aria-hidden="true">
                <ValueIcon id={value.id} />
              </div>
              <h3 className="heading text-22 about-values-item-title">
                {localizedCopy(value.title, locale)}
              </h3>
              <p className="text text-16 about-values-item-desc">
                {localizedCopy(value.text, locale)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
