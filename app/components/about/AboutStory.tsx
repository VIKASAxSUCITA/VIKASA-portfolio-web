"use client";

import LocalizedEditableField from "@/app/components/i18n/LocalizedEditableField";
import LocalizedSection from "@/app/components/i18n/LocalizedSection";
import type { AboutContent } from "@/lib/content/types";
import { asLocalized, setLocalized } from "@/lib/i18n/localized";

type Story = AboutContent["story"];

type AboutStoryProps = {
  content: Story;
  edit?: { onChange: (updater: (prev: Story) => Story) => void };
};

export default function AboutStory({ content, edit }: AboutStoryProps) {
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
        <section className="mt-100" aria-labelledby="about-story-heading">
          <div className="container">
            <div className="about-story-inner text-center">
              <LocalizedEditableField
                as="h2"
                id="about-story-heading"
                className="heading text-50 about-story-title"
                value={content.title}
                locale={locale}
                aos="fade-up"
                aosDelay={50}
                label="Story title"
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
                className="text text-18 about-story-desc"
                value={content.text}
                locale={locale}
                multiline
                aos="fade-up"
                aosDelay={100}
                label="Story text"
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
        </section>
      )}
    </LocalizedSection>
  );
}
