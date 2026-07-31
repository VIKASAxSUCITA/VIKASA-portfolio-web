"use client";

import LocalizedEditableField from "@/app/components/i18n/LocalizedEditableField";
import LocalizedSection from "@/app/components/i18n/LocalizedSection";
import type { HomeContent } from "@/lib/content/types";
import { asLocalized, readLocalized, setLocalized } from "@/lib/i18n/localized";
import WhatWeDoMedia from "@/app/components/shared/WhatWeDoMedia";
import EditableText from "../admin/EditableText";

type About = HomeContent["about"];

type HomeAboutProps = {
  content: About;
  edit?: { onChange: (updater: (prev: About) => About) => void };
};

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={28}
      height={28}
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.9327 0.515625C6.52939 0.515625 0.519531 6.52549 0.519531 13.9288C0.519531 21.3321 6.52939 27.3419 13.9327 27.3419C21.336 27.3419 27.3458 21.3321 27.3458 13.9288C27.3458 6.52549 21.336 0.515625 13.9327 0.515625ZM13.9327 1.68166C20.6921 1.68166 26.1798 7.16938 26.1798 13.9288C26.1798 20.6882 20.6921 26.1759 13.9327 26.1759C7.17329 26.1759 1.68557 20.6882 1.68557 13.9288C1.68557 7.16938 7.17329 1.68166 13.9327 1.68166Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.81362 13.0268C8.34112 12.7113 7.70994 12.783 7.31911 13.196C6.92886 13.6084 6.89211 14.2431 7.23336 14.6975L10.7334 19.3642C10.9445 19.6453 11.2712 19.8168 11.6229 19.8303C11.9741 19.8431 12.313 19.6972 12.5446 19.4324L20.7113 10.0991C21.1144 9.63883 21.0928 8.94525 20.6623 8.51008C20.2318 8.07492 19.5388 8.04692 19.0739 8.44475L11.5786 14.8696L8.81362 13.0268Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function HomeAbout({ content, edit }: HomeAboutProps) {
  const itemSources = content.items.map((item) => asLocalized(item).en);

  return (
    <LocalizedSection
      edit={!!edit}
      translateSources={[content.title.en, content.text.en, ...itemSources]}
      onAutoTranslated={(locale, values) => {
        edit?.onChange((prev) => ({
          ...prev,
          title: setLocalized(asLocalized(prev.title), locale, values[0] ?? ""),
          text: setLocalized(asLocalized(prev.text), locale, values[1] ?? ""),
          items: prev.items.map((item, index) =>
            setLocalized(
              asLocalized(item),
              locale,
              values[index + 2] ?? asLocalized(item)[locale]
            )
          ) as About["items"],
        }));
      }}
    >
      {(locale) => (
        <div id="about" className="image-text mt-100">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 col-12">
                <WhatWeDoMedia
                  src={content.image}
                  aos="fade-right"
                  edit={
                    edit
                      ? {
                          onChange: (image) =>
                            edit.onChange((prev) => ({ ...prev, image })),
                        }
                      : undefined
                  }
                />
              </div>
              <div className="col-lg-6 col-12">
                <div className="content section-headings">
                  <LocalizedEditableField
                    as="h2"
                    className="heading text-50"
                    value={content.title}
                    locale={locale}
                    aos="fade-left"
                    label="About title"
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
                    className="text text-18"
                    value={content.text}
                    locale={locale}
                    multiline
                    aos="fade-left"
                    aosDelay={80}
                    label="About text"
                    edit={
                      edit
                        ? {
                            onChange: (text) =>
                              edit.onChange((prev) => ({ ...prev, text })),
                          }
                        : undefined
                    }
                  />
                  <ul className="text-lists list-unstyled">
                    {content.items.map((item, index) => (
                      <li
                        key={index}
                        className="text-item text text-18"
                        data-aos="fade-left"
                        data-aos-delay={120 + index * 60}
                      >
                        <CheckIcon />
                        {edit ? (
                          <EditableText
                            value={readLocalized(item, locale)}
                            label={`About point ${index + 1}`}
                            onChange={(value) =>
                              edit.onChange((prev) => {
                                const items = [...prev.items] as About["items"];
                                items[index] = setLocalized(
                                  asLocalized(items[index]),
                                  locale,
                                  value
                                );
                                return { ...prev, items };
                              })
                            }
                          />
                        ) : (
                          readLocalized(item, locale)
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </LocalizedSection>
  );
}
