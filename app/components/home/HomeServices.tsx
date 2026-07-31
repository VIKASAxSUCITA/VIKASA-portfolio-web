"use client";

import type { ReactNode } from "react";
import LocalizedEditableField from "@/app/components/i18n/LocalizedEditableField";
import LocalizedSection from "@/app/components/i18n/LocalizedSection";
import type { HomeContent } from "@/lib/content/types";
import { resolveServiceSlug } from "@/lib/content/services";
import type { Locale } from "@/lib/i18n/locale";
import { asLocalized, readLocalized, setLocalized } from "@/lib/i18n/localized";
import EditableText from "../admin/EditableText";

const SERVICE_DELAYS = [null, 120, 220] as const;

type Services = HomeContent["services"];

type HomeServicesProps = {
  content: Services;
  edit?: { onChange: (updater: (prev: Services) => Services) => void };
};

const VIEW_DETAILS: Record<Locale, string> = {
  en: "Explore service",
  km: "ស្វែងយល់សេវាកម្ម",
  zh: "了解服务",
};

const ADVISORY: Record<Locale, string> = {
  en: "Advisory",
  km: "ការពិគ្រោះយោបល់",
  zh: "咨询服务",
};

const SUBTITLE: Record<Locale, string> = {
  en: "Investment, enhancement, and academy — three advisory paths for ambitious organizations.",
  km: "ការវិនិយោគ ការពង្រឹង និងបណ្ឌិត្យសភា — ផ្លូវពិគ្រោះយោបល់បីសម្រាប់អង្គភាពដែលមានមហិច្ឆតា។",
  zh: "投资、业务提升与学院——为进取型组织提供的三条咨询路径。",
};

function CheckIcon() {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20 6 9 17l-5-5" />
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

function buildTranslateSources(content: Services): string[] {
  const sources = [content.heading.en];
  for (const card of content.cards) {
    sources.push(card.title.en, card.description.en);
    for (const item of card.items) {
      sources.push(asLocalized(item).en);
    }
  }
  return sources;
}

function applyAutoTranslated(
  prev: Services,
  locale: "km" | "zh",
  values: string[]
): Services {
  let index = 0;
  const heading = setLocalized(
    asLocalized(prev.heading),
    locale,
    values[index++] ?? ""
  );
  const cards = prev.cards.map((card) => {
    const title = setLocalized(
      asLocalized(card.title),
      locale,
      values[index++] ?? ""
    );
    const description = setLocalized(
      asLocalized(card.description),
      locale,
      values[index++] ?? ""
    );
    const items = card.items.map((item) =>
      setLocalized(asLocalized(item), locale, values[index++] ?? "")
    );
    return { ...card, title, description, items };
  });
  return { heading, cards };
}

export default function HomeServices({ content, edit }: HomeServicesProps) {
  const updateCard = (
    index: number,
    patch: Partial<Services["cards"][number]>
  ) =>
    edit?.onChange((prev) => {
      const cards = [...prev.cards];
      cards[index] = { ...cards[index], ...patch };
      return { ...prev, cards };
    });

  return (
    <LocalizedSection
      edit={!!edit}
      translateSources={buildTranslateSources(content)}
      onAutoTranslated={(locale, values) => {
        if (locale === "en") return;
        edit?.onChange((prev) => applyAutoTranslated(prev, locale, values));
      }}
    >
      {(locale) => (
        <section id="services" className="vikasa-services section-padding">
          <div className="container">
            <div className="vikasa-services-head section-headings">
              <LocalizedEditableField
                as="h2"
                className="heading text-50"
                value={content.heading}
                locale={locale}
                aos="fade-up"
                label="Services heading"
                edit={
                  edit
                    ? {
                        onChange: (heading) =>
                          edit.onChange((prev) => ({ ...prev, heading })),
                      }
                    : undefined
                }
              />
              {!edit ? (
                <p
                  className="text text-18 vikasa-services-subtitle"
                  data-aos="fade-up"
                  data-aos-delay="60"
                >
                  {SUBTITLE[locale]}
                </p>
              ) : null}
            </div>

            <div className="vikasa-services-grid">
              {content.cards.map((service, index) => {
                const delay = SERVICE_DELAYS[index] ?? null;
                const slug = resolveServiceSlug(
                  readLocalized(service.title, "en"),
                  index
                );
                const titleLabel = readLocalized(service.title, locale);
                const listItems = service.items;

                const cardInner: ReactNode = (
                  <>
                    <div className="vikasa-service-card-top">
                      <span className="vikasa-service-card-glyph" aria-hidden>
                        <ServiceGlyph index={index} />
                      </span>
                      <span className="vikasa-service-card-label">
                        {ADVISORY[locale]}
                      </span>
                    </div>
                    <LocalizedEditableField
                      as="h3"
                      className="heading text-28"
                      value={service.title}
                      locale={locale}
                      label="Service title"
                      edit={
                        edit
                          ? {
                              onChange: (title) =>
                                updateCard(index, { title }),
                            }
                          : undefined
                      }
                    />
                    <LocalizedEditableField
                      className="text text-16"
                      value={service.description}
                      locale={locale}
                      multiline
                      label="Service description"
                      edit={
                        edit
                          ? {
                              onChange: (description) =>
                                updateCard(index, { description }),
                            }
                          : undefined
                      }
                    />
                    <ul className="vikasa-service-card-points list-unstyled">
                      {listItems.map((item, itemIndex) => (
                        <li key={itemIndex}>
                          <span className="vikasa-service-check" aria-hidden>
                            <CheckIcon />
                          </span>
                          {edit ? (
                            <EditableText
                              value={readLocalized(item, locale)}
                              label={`Service point ${itemIndex + 1}`}
                              onChange={(value) => {
                                const items = [...service.items];
                                items[itemIndex] = setLocalized(
                                  asLocalized(items[itemIndex]),
                                  locale,
                                  value
                                );
                                updateCard(index, { items });
                              }}
                            />
                          ) : (
                            <span>{readLocalized(item, locale)}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                    {!edit ? (
                      <span className="vikasa-service-card-cta">
                        {VIEW_DETAILS[locale]}
                        <span aria-hidden>→</span>
                      </span>
                    ) : null}
                  </>
                );

                return (
                  <article
                    key={index}
                    className="vikasa-service-card"
                    data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
                    {...(delay ? { "data-aos-delay": String(delay) } : {})}
                  >
                    {edit ? (
                      <div className="vikasa-service-card-inner">
                        {cardInner}
                      </div>
                    ) : (
                      <a
                        className="vikasa-service-card-inner"
                        href={`/services/${slug}`}
                        aria-label={titleLabel}
                      >
                        {cardInner}
                      </a>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </LocalizedSection>
  );
}
