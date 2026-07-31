"use client";

import { useLocale } from "@/app/components/i18n/LocaleProvider";
import { ArrowIcon } from "@/app/components/admin/EditableField";
import {
  SERVICE_DETAILS,
  type ServiceDetail,
} from "@/lib/content/services";
import type { Locale } from "@/lib/i18n/locale";
import { readLocalized } from "@/lib/i18n/localized";

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

const LABELS = {
  overview: { en: "Overview", km: "ទិដ្ឋភាពទូទៅ", zh: "概览" },
  cover: { en: "What we cover", km: "អ្វីដែលយើងគ្របដណ្តប់", zh: "涵盖内容" },
  cta: {
    en: "Discuss this service",
    km: "ពិភាក្សាសេវាកម្មនេះ",
    zh: "咨询此服务",
  },
  more: {
    en: "Explore more services",
    km: "ស្វែងយល់សេវាកម្មបន្ថែម",
    zh: "探索更多服务",
  },
  back: {
    en: "All services",
    km: "សេវាកម្មទាំងអស់",
    zh: "全部服务",
  },
} as const;

function t(key: keyof typeof LABELS, locale: Locale) {
  return LABELS[key][locale];
}

type ServiceDetailViewProps = {
  service: ServiceDetail;
};

export default function ServiceDetailView({ service }: ServiceDetailViewProps) {
  const { locale } = useLocale();
  const title = readLocalized(service.title, locale);
  const description = readLocalized(service.description, locale);
  const body = readLocalized(service.body, locale);
  const related = SERVICE_DETAILS.filter((item) => item.slug !== service.slug);

  return (
    <main className="service-detail-page">
      <section
        className="vikasa-hero-cinematic service-detail-hero"
        aria-label={title}
      >
        <div className="vikasa-hero-bg">
          <img
            src={service.heroImage}
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
                {title}
              </h1>
              <p
                className="text text-18 vikasa-hero-text"
                data-aos="fade-up"
                data-aos-delay="60"
              >
                {description}
              </p>
              <div
                className="buttons vikasa-hero-actions"
                data-aos="fade-up"
                data-aos-delay="120"
              >
                <a
                  href="/contact"
                  className="button button--secondary vikasa-btn-ghost"
                >
                  {t("cta", locale)}
                  <span className="svg-wrapper" aria-hidden>
                    <ArrowIcon />
                  </span>
                </a>
                <a
                  href="/services"
                  className="button button--secondary vikasa-btn-ghost"
                >
                  {t("back", locale)}
                  <span className="svg-wrapper" aria-hidden>
                    <ArrowIcon />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding service-detail-body">
        <div className="container">
          <div className="service-detail-layout">
            <div className="service-detail-copy" data-aos="fade-right">
              <h2 className="heading text-40">{t("overview", locale)}</h2>
              <p className="text text-18">{body}</p>
              <a
                href="/contact"
                className="button button--secondary vikasa-btn-ghost vikasa-btn-ghost--espresso"
              >
                {t("cta", locale)}
              </a>
            </div>
            <aside className="service-detail-aside" data-aos="fade-left">
              <h3 className="heading text-28">{t("cover", locale)}</h3>
              <ul className="service-detail-points list-unstyled">
                {service.items.map((item, index) => (
                  <li key={index}>
                    <span className="service-detail-point-icon">
                      <CheckIcon />
                    </span>
                    <span>{readLocalized(item, locale)}</span>
                  </li>
                ))}
              </ul>
            </aside>
          </div>

          {related.length ? (
            <div className="service-detail-related">
              <h2 className="heading text-40">{t("more", locale)}</h2>
              <div className="vikasa-services-grid">
                {related.map((item, index) => {
                  const relatedIndex = SERVICE_DETAILS.findIndex(
                    (service) => service.slug === item.slug
                  );
                  return (
                    <article
                      key={item.slug}
                      className="vikasa-service-card"
                      data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
                      data-aos-delay={index * 80}
                    >
                      <a
                        className="vikasa-service-card-inner"
                        href={`/services/${item.slug}`}
                        aria-label={readLocalized(item.title, locale)}
                      >
                        <div className="vikasa-service-card-top">
                          <span className="vikasa-service-card-glyph" aria-hidden>
                            <RelatedGlyph index={Math.max(0, relatedIndex)} />
                          </span>
                          <span className="vikasa-service-card-label">
                            {ADVISORY_LABEL[locale]}
                          </span>
                        </div>
                        <h3 className="heading text-28">
                          {readLocalized(item.title, locale)}
                        </h3>
                        <p className="text text-16">
                          {readLocalized(item.description, locale)}
                        </p>
                        <span className="vikasa-service-card-cta">
                          {VIEW_DETAILS_LABEL[locale]}
                          <span aria-hidden>→</span>
                        </span>
                      </a>
                    </article>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}

const VIEW_DETAILS_LABEL: Record<Locale, string> = {
  en: "Explore service",
  km: "ស្វែងយល់សេវាកម្ម",
  zh: "了解服务",
};

const ADVISORY_LABEL: Record<Locale, string> = {
  en: "Advisory",
  km: "ការពិគ្រោះយោបល់",
  zh: "咨询服务",
};

function RelatedGlyph({ index }: { index: number }) {
  if (index === 0) {
    return (
      <svg width={22} height={22} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M4 19V5M4 19h16"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M8 15v-3M12 15V8M16 15v-5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg width={22} height={22} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M4 16 10 10l4 4 6-7"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15 7h5v5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 19h16M6 19V9l6-4 6 4v10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 19v-5h4v5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
