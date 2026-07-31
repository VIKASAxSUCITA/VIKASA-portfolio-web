"use client";

import LocalizedEditableField from "@/app/components/i18n/LocalizedEditableField";
import LocalizedSection from "@/app/components/i18n/LocalizedSection";
import type { HomeContent } from "@/lib/content/types";
import { asLocalized, readLocalized, setLocalized } from "@/lib/i18n/localized";
import { ArrowIcon, SectionButton } from "../admin/EditableField";

type Cta = HomeContent["cta"];

type HomeCtaProps = {
  content: Cta;
  edit?: { onChange: (updater: (prev: Cta) => Cta) => void };
};

function PlayIcon() {
  return (
    <svg
      className="icon icon-14"
      xmlns="http://www.w3.org/2000/svg"
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />
    </svg>
  );
}

export default function HomeCta({ content, edit }: HomeCtaProps) {
  return (
    <LocalizedSection
      edit={!!edit}
      translateSources={[
        content.badge.en,
        content.title.en,
        content.text.en,
        content.buttonLabel.en,
      ]}
      onAutoTranslated={(locale, values) => {
        edit?.onChange((prev) => ({
          ...prev,
          badge: setLocalized(asLocalized(prev.badge), locale, values[0] ?? ""),
          title: setLocalized(asLocalized(prev.title), locale, values[1] ?? ""),
          text: setLocalized(asLocalized(prev.text), locale, values[2] ?? ""),
          buttonLabel: setLocalized(
            asLocalized(prev.buttonLabel),
            locale,
            values[3] ?? ""
          ),
        }));
      }}
    >
      {(locale) => (
        <section className="consulting-cta vikasa-cta-banner">
          <div className="vikasa-cta-banner-bg" aria-hidden>
            <img
              src="/assets/img/vikasa/aboutUS_Banner_Page.png"
              alt=""
              width={1920}
              height={800}
              loading="lazy"
              className="vikasa-cta-banner-image"
            />
            <div className="vikasa-cta-banner-overlay" />
          </div>

          <div className="container vikasa-cta-banner-content">
            <div className="text-banner-inner">
              <div className="section-headings">
                <div
                  className="subheading text-20 subheading-bg"
                  data-aos="fade-up"
                >
                  <PlayIcon />
                  <LocalizedEditableField
                    as="span"
                    value={content.badge}
                    locale={locale}
                    label="CTA badge"
                    edit={
                      edit
                        ? {
                            onChange: (badge) =>
                              edit.onChange((prev) => ({ ...prev, badge })),
                          }
                        : undefined
                    }
                  />
                </div>
                <LocalizedEditableField
                  as="h2"
                  className="heading text-80"
                  value={content.title}
                  locale={locale}
                  aos="fade-up"
                  label="CTA title"
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
                  as="p"
                  className="text text-24"
                  value={content.text}
                  locale={locale}
                  multiline
                  aos="fade-up"
                  label="CTA text"
                  edit={
                    edit
                      ? {
                          onChange: (text) =>
                            edit.onChange((prev) => ({ ...prev, text })),
                        }
                      : undefined
                  }
                />
                <div className="buttons" data-aos="fade-up">
                  <SectionButton
                    label={readLocalized(content.buttonLabel, locale)}
                    href="/contact"
                    className="button button--secondary vikasa-btn-ghost"
                    ariaLabel={readLocalized(content.buttonLabel, locale)}
                    edit={
                      edit
                        ? {
                            onChange: (label) =>
                              edit.onChange((prev) => ({
                                ...prev,
                                buttonLabel: setLocalized(
                                  asLocalized(prev.buttonLabel),
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
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </LocalizedSection>
  );
}
