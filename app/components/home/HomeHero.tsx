"use client";

import LocalizedEditableField from "@/app/components/i18n/LocalizedEditableField";
import LocalizedSection from "@/app/components/i18n/LocalizedSection";
import type { HomeContent } from "@/lib/content/types";
import type { Locale } from "@/lib/i18n/locale";
import { asLocalized, readLocalized, setLocalized } from "@/lib/i18n/localized";
import {
  ArrowIcon,
  EditableMedia,
  SectionButton,
} from "../admin/EditableField";

type Hero = HomeContent["hero"];

type HomeHeroProps = {
  content: Hero;
  edit?: { onChange: (updater: (prev: Hero) => Hero) => void };
};

const EXPLORE_SERVICES: Record<Locale, string> = {
  en: "Explore Services",
  km: "ស្វែងយល់សេវាកម្ម",
  zh: "探索服务",
};

export default function HomeHero({ content, edit }: HomeHeroProps) {
  const imageEdit = edit
    ? {
        onChange: (image: string) =>
          edit.onChange((prev) => ({ ...prev, image })),
      }
    : undefined;

  return (
    <LocalizedSection
      edit={!!edit}
      translateSources={[
        content.title.en,
        content.text.en,
        content.ctaLabel.en,
      ]}
      onAutoTranslated={(locale, values) => {
        edit?.onChange((prev) => ({
          ...prev,
          title: setLocalized(asLocalized(prev.title), locale, values[0] ?? ""),
          text: setLocalized(asLocalized(prev.text), locale, values[1] ?? ""),
          ctaLabel: setLocalized(
            asLocalized(prev.ctaLabel),
            locale,
            values[2] ?? ""
          ),
        }));
      }}
    >
      {(locale) => {
        const exploreLabel = EXPLORE_SERVICES[locale];

        return (
          <section className="vikasa-hero-cinematic" aria-label="VIKASA">
            <div className="vikasa-hero-bg">
              <EditableMedia
                src={content.image}
                width={1920}
                height={1080}
                loading="eager"
                alt="VIKASA executive team"
                className="vikasa-hero-bg-image"
                edit={imageEdit}
              />
              <div className="vikasa-hero-overlay" aria-hidden />
            </div>

            <div className="vikasa-hero-content">
              <div className="container">
                <div className="vikasa-hero-copy section-headings">
                  <LocalizedEditableField
                    as="h1"
                    className="heading vikasa-hero-title"
                    value={content.title}
                    locale={locale}
                    aos="fade-up"
                    aosDelay={80}
                    label="Hero title"
                    edit={
                      edit
                        ? {
                            onChange: (title) =>
                              edit.onChange((prev) => ({ ...prev, title })),
                          }
                        : undefined
                    }
                  />
                  <LocalizedEditableField
                    className="text text-18 vikasa-hero-text"
                    value={content.text}
                    locale={locale}
                    multiline
                    aos="fade-up"
                    aosDelay={140}
                    label="Hero text"
                    edit={
                      edit
                        ? {
                            onChange: (text) =>
                              edit.onChange((prev) => ({ ...prev, text })),
                          }
                        : undefined
                    }
                  />
                  <div
                    className="buttons vikasa-hero-actions"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    <SectionButton
                      label={readLocalized(content.ctaLabel, locale)}
                      href="/contact"
                      className="button button--secondary vikasa-btn-ghost"
                      ariaLabel={readLocalized(content.ctaLabel, locale)}
                      edit={
                        edit
                          ? {
                              onChange: (label) =>
                                edit.onChange((prev) => ({
                                  ...prev,
                                  ctaLabel: setLocalized(
                                    asLocalized(prev.ctaLabel),
                                    locale,
                                    label
                                  ),
                                })),
                            }
                          : undefined
                      }
                    >
                      <ArrowIcon />
                    </SectionButton>
                    {!edit ? (
                      <a
                        href="/services"
                        className="button button--secondary vikasa-btn-ghost"
                        aria-label={exploreLabel}
                      >
                        {exploreLabel}
                        <span className="svg-wrapper" aria-hidden>
                          <ArrowIcon />
                        </span>
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      }}
    </LocalizedSection>
  );
}
