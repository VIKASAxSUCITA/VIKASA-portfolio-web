"use client";

import LocalizedEditableField from "@/app/components/i18n/LocalizedEditableField";
import LocalizedSection from "@/app/components/i18n/LocalizedSection";
import type { AboutContent } from "@/lib/content/types";
import { asLocalized, setLocalized } from "@/lib/i18n/localized";
import { EditableMedia } from "../admin/EditableField";

type Hero = AboutContent["hero"];

type AboutHeroProps = {
  content: Hero;
  edit?: { onChange: (updater: (prev: Hero) => Hero) => void };
};

export default function AboutHero({ content, edit }: AboutHeroProps) {
  const imageEdit = edit
    ? {
        onChange: (image: string) =>
          edit.onChange((prev) => ({ ...prev, image })),
      }
    : undefined;

  return (
    <LocalizedSection
      edit={!!edit}
      translateSources={[content.title.en, content.text.en]}
      onAutoTranslated={(locale, values) => {
        edit?.onChange((prev) => ({
          ...prev,
          title: setLocalized(asLocalized(prev.title), locale, values[0] ?? ""),
          text: setLocalized(asLocalized(prev.text), locale, values[1] ?? ""),
        }));
      }}
    >
      {(locale) => (
        <section
          className="vikasa-hero-cinematic about-hero-cinematic"
          aria-label="About VIKASA"
        >
          <div className="vikasa-hero-bg">
            <EditableMedia
              src={content.image}
              width={1920}
              height={1080}
              loading="eager"
              alt="VIKASA team collaborating"
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
                  label="About hero title"
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
                  className="text text-18 vikasa-hero-text"
                  value={content.text}
                  locale={locale}
                  multiline
                  aos="fade-up"
                  aosDelay={140}
                  label="About hero description"
                  edit={
                    edit
                      ? {
                          onChange: (text) =>
                            edit.onChange((prev) => ({ ...prev, text })),
                        }
                      : undefined
                  }
                />
              </div>
            </div>
          </div>
        </section>
      )}
    </LocalizedSection>
  );
}
