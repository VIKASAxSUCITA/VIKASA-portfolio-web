"use client";

import { useLocale } from "@/app/components/i18n/LocaleProvider";
import {
  SERVICE_DETAILS,
  type ServiceDetail,
} from "@/lib/content/services";
import type { Locale } from "@/lib/i18n/locale";
import { readLocalized } from "@/lib/i18n/localized";

const VIEW_DETAILS: Record<Locale, string> = {
  en: "Explore service",
  km: "ស្វែងយល់សេវាកម្ម",
  zh: "了解服务",
};

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m12 16 4-4-4-4" />
      <path d="M8 12h8" />
    </svg>
  );
}

function ServiceGlyph({ index }: { index: number }) {
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

function ServiceCard({
  service,
  index,
}: {
  service: ServiceDetail;
  index: number;
}) {
  const { locale } = useLocale();
  const title = readLocalized(service.title, locale);
  const description = readLocalized(service.description, locale);

  return (
    <article
      className="vikasa-service-card"
      data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
      data-aos-delay={index * 100}
    >
      <a
        className="vikasa-service-card-inner"
        href={`/services/${service.slug}`}
        aria-label={title}
      >
        <div className="vikasa-service-card-top">
          <span className="vikasa-service-card-glyph" aria-hidden>
            <ServiceGlyph index={index} />
          </span>
          <h3 className="heading text-28 vikasa-service-card-title">{title}</h3>
        </div>
        <p className="text text-16">{description}</p>
        <ul className="vikasa-service-card-points list-unstyled">
          {service.items.map((item, itemIndex) => (
            <li key={itemIndex}>
              <span className="vikasa-service-check" aria-hidden>
                <CheckIcon />
              </span>
              <span>{readLocalized(item, locale)}</span>
            </li>
          ))}
        </ul>
        <span className="vikasa-service-card-cta">
          {VIEW_DETAILS[locale]}
          <span aria-hidden>→</span>
        </span>
      </a>
    </article>
  );
}

export default function ServicesGrid({
  services = SERVICE_DETAILS,
}: {
  services?: ServiceDetail[];
}) {
  const { locale } = useLocale();
  const heading =
    locale === "km"
      ? "សេវាកម្មរបស់យើង"
      : locale === "zh"
        ? "我们的服务"
        : "Our Services";
  const subtitle =
    locale === "km"
      ? "ការវិនិយោគ ការពង្រឹង និងបណ្ឌិត្យសភា — ផ្លូវពិគ្រោះយោបល់បីសម្រាប់អង្គភាពដែលមានមហិច្ឆតា។"
      : locale === "zh"
        ? "投资、业务提升与学院——为进取型组织提供的三条咨询路径。"
        : "Investment, enhancement, and academy — three advisory paths for ambitious organizations.";

  return (
    <section className="vikasa-services section-padding">
      <div className="container">
        <div className="vikasa-services-head section-headings">
          <h2 className="heading text-50" data-aos="fade-up">
            {heading}
          </h2>
          <p
            className="text text-18 vikasa-services-subtitle"
            data-aos="fade-up"
            data-aos-delay="50"
          >
            {subtitle}
          </p>
        </div>
        <div className="vikasa-services-grid">
          {services.map((service, index) => (
            <ServiceCard key={service.slug} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
