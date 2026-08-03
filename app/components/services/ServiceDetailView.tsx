"use client";

import { useMemo } from "react";
import {
  EditableField,
  EditableMedia,
  ArrowIcon,
} from "@/app/components/admin/EditableField";
import { useLocale } from "@/app/components/i18n/LocaleProvider";
import InsightImageGallery from "@/app/components/insights/InsightImageGallery";
import InsightRichTextEditor from "@/app/components/insights/InsightRichTextEditor";
import {
  extractBodyImageSrcs,
  stripImagesFromBodyHtml,
} from "@/lib/content/insightHtml";
import {
  SERVICE_DETAILS,
  type ServiceDetail,
} from "@/lib/content/services";
import type { Locale } from "@/lib/i18n/locale";
import { emptyLocalized } from "@/lib/i18n/locale";
import { readLocalized, setLocalized } from "@/lib/i18n/localized";

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

function toEditorHtml(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "<p></p>";
  if (/<[a-z][\s\S]*>/i.test(trimmed)) return trimmed;
  return `<p>${trimmed
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n\n/g, "</p><p>")
    .replace(/\n/g, "<br>")}</p>`;
}

type ServiceDetailViewProps = {
  service: ServiceDetail;
  allServices?: ServiceDetail[];
  edit?: {
    onChange: (updater: (service: ServiceDetail) => ServiceDetail) => void;
  };
  editLocale?: Locale;
};

export default function ServiceDetailView({
  service,
  allServices = SERVICE_DETAILS,
  edit,
  editLocale,
}: ServiceDetailViewProps) {
  const { locale: siteLocale } = useLocale();
  const locale = edit ? (editLocale ?? "en") : siteLocale;

  const title = readLocalized(service.title, locale);
  const description = readLocalized(service.description, locale);
  const body = readLocalized(service.body, locale);
  const related = allServices.filter((item) => item.slug !== service.slug);

  const galleryImages = useMemo(() => extractBodyImageSrcs(body), [body]);
  const proseHtml = useMemo(() => stripImagesFromBodyHtml(body), [body]);

  function patchLocalized(
    field: "title" | "description" | "body",
    value: string
  ) {
    if (!edit) return;
    edit.onChange((prev) => ({
      ...prev,
      [field]: setLocalized(prev[field], locale, value),
    }));
  }

  return (
    <main className="service-detail-page">
      <section
        className="vikasa-hero-cinematic service-detail-hero"
        aria-label={title || "Service"}
      >
        <div className="vikasa-hero-bg">
          <EditableMedia
            src={service.heroImage || service.icon}
            width={1920}
            height={1080}
            loading="eager"
            alt=""
            className="vikasa-hero-bg-image"
            edit={
              edit
                ? {
                    onChange: (heroImage) =>
                      edit.onChange((prev) => ({
                        ...prev,
                        heroImage,
                        icon: heroImage,
                      })),
                  }
                : undefined
            }
          />
          <div className="vikasa-hero-overlay" aria-hidden />
        </div>
        <div className="vikasa-hero-content">
          <div className="container">
            <div className="vikasa-hero-copy section-headings">
              <EditableField
                as="h1"
                className="heading vikasa-hero-title"
                value={title}
                aos={edit ? undefined : "fade-up"}
                label="Service title"
                edit={
                  edit
                    ? { onChange: (value) => patchLocalized("title", value) }
                    : undefined
                }
              />
              <EditableField
                as="p"
                className="text text-18 vikasa-hero-text"
                value={description}
                multiline
                aos={edit ? undefined : "fade-up"}
                aosDelay={edit ? undefined : "60"}
                label="Service subtitle"
                edit={
                  edit
                    ? {
                        onChange: (value) =>
                          patchLocalized("description", value),
                      }
                    : undefined
                }
              />
              <div
                className="buttons vikasa-hero-actions"
                data-aos={edit ? undefined : "fade-up"}
                data-aos-delay={edit ? undefined : "120"}
              >
                <a
                  href={edit ? undefined : "/contact"}
                  className="button button--secondary vikasa-btn-ghost"
                  onClick={edit ? (e) => e.preventDefault() : undefined}
                >
                  {t("cta", locale)}
                  <span className="svg-wrapper" aria-hidden>
                    <ArrowIcon />
                  </span>
                </a>
                <a
                  href={edit ? undefined : "/services"}
                  className="button button--secondary vikasa-btn-ghost"
                  onClick={edit ? (e) => e.preventDefault() : undefined}
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
            <div
              className="service-detail-copy"
              data-aos={edit ? undefined : "fade-right"}
            >
              <h2 className="heading text-40">{t("overview", locale)}</h2>
              {edit ? (
                <div className="service-detail-rte">
                  <InsightRichTextEditor
                    key={`${service.slug}-${locale}`}
                    content={toEditorHtml(body)}
                    placeholder="Write the overview description…"
                    onChange={(html) => patchLocalized("body", html)}
                  />
                </div>
              ) : (
                <>
                  {/<[a-z][\s\S]*>/i.test(proseHtml) ? (
                    <div
                      className="text text-18 insight-rich-body"
                      dangerouslySetInnerHTML={{ __html: proseHtml }}
                    />
                  ) : (
                    <p className="text text-18">{proseHtml}</p>
                  )}
                  {galleryImages.length > 0 ? (
                    <div className="service-detail-gallery">
                      <InsightImageGallery
                        images={galleryImages}
                        altPrefix={title || "Service"}
                      />
                    </div>
                  ) : null}
                  <a
                    href="/contact"
                    className="button button--secondary vikasa-btn-ghost vikasa-btn-ghost--espresso"
                  >
                    {t("cta", locale)}
                  </a>
                </>
              )}
            </div>
            <aside
              className="service-detail-aside"
              data-aos={edit ? undefined : "fade-left"}
            >
              <div className="service-detail-aside-head">
                <h3 className="heading text-28">{t("cover", locale)}</h3>
                {edit ? (
                  <button
                    type="button"
                    className="button button--slim"
                    onClick={() =>
                      edit.onChange((prev) => ({
                        ...prev,
                        items: [...prev.items, emptyLocalized("")],
                      }))
                    }
                  >
                    + Add
                  </button>
                ) : null}
              </div>
              <ul className="service-detail-points list-unstyled">
                {service.items.map((item, index) => (
                  <li key={index}>
                    <span className="service-detail-point-icon">
                      <CheckIcon />
                    </span>
                    {edit ? (
                      <div className="service-detail-point-edit">
                        <EditableField
                          as="span"
                          className="service-detail-point-text"
                          value={readLocalized(item, locale)}
                          label={`Sub-service ${index + 1}`}
                          edit={{
                            onChange: (value) =>
                              edit.onChange((prev) => ({
                                ...prev,
                                items: prev.items.map((entry, i) =>
                                  i === index
                                    ? setLocalized(entry, locale, value)
                                    : entry
                                ),
                              })),
                          }}
                        />
                        <button
                          type="button"
                          className="service-detail-point-remove"
                          aria-label={`Remove point ${index + 1}`}
                          onClick={() =>
                            edit.onChange((prev) => ({
                              ...prev,
                              items: prev.items.filter((_, i) => i !== index),
                            }))
                          }
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <span>{readLocalized(item, locale)}</span>
                    )}
                  </li>
                ))}
              </ul>
            </aside>
          </div>

          {!edit && related.length ? (
            <div className="service-detail-related">
              <h2 className="heading text-40">{t("more", locale)}</h2>
              <div className="vikasa-services-grid">
                {related.map((item, index) => {
                  const relatedIndex = allServices.findIndex(
                    (entry) => entry.slug === item.slug
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
                          <span
                            className="vikasa-service-card-glyph"
                            aria-hidden
                          >
                            <RelatedGlyph index={Math.max(0, relatedIndex)} />
                          </span>
                          <h3 className="heading text-28 vikasa-service-card-title">
                            {readLocalized(item.title, locale)}
                          </h3>
                        </div>
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
