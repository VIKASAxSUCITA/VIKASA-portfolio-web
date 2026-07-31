"use client";

import LocalizedEditableField from "@/app/components/i18n/LocalizedEditableField";
import LocalizedSection from "@/app/components/i18n/LocalizedSection";
import type { AboutContent } from "@/lib/content/types";
import { asLocalized, setLocalized } from "@/lib/i18n/localized";

type VmItem = AboutContent["vision"];
type VmEdit = { onChange: (updater: (prev: VmItem) => VmItem) => void };

type AboutVisionMissionProps = {
  vision: AboutContent["vision"];
  mission: AboutContent["mission"];
  editVision?: VmEdit;
  editMission?: VmEdit;
};

function VisionMissionBlock({
  id,
  data,
  edit,
  locale,
}: {
  id: string;
  data: VmItem;
  edit?: VmEdit;
  locale: "en" | "km" | "zh";
}) {
  return (
    <article className="about-vm-item">
      <LocalizedEditableField
        as="h2"
        className="heading text-36 about-vm-title"
        value={data.title}
        locale={locale}
        label={`${id} title`}
        edit={
          edit
            ? {
                onChange: (title) => edit.onChange((prev) => ({ ...prev, title })),
              }
            : undefined
        }
      />
      <LocalizedEditableField
        as="p"
        className="text text-18 about-vm-desc"
        value={data.text}
        locale={locale}
        multiline
        label={`${id} text`}
        edit={
          edit
            ? {
                onChange: (text) => edit.onChange((prev) => ({ ...prev, text })),
              }
            : undefined
        }
      />
    </article>
  );
}

export default function AboutVisionMission({
  vision,
  mission,
  editVision,
  editMission,
}: AboutVisionMissionProps) {
  const items = [
    { id: "vision", data: vision, edit: editVision },
    { id: "mission", data: mission, edit: editMission },
  ] as const;
  const isEditing = Boolean(editVision || editMission);

  return (
    <LocalizedSection
      edit={isEditing}
      translateSources={[
        vision.title.en,
        vision.text.en,
        mission.title.en,
        mission.text.en,
      ]}
      onAutoTranslated={(locale, values) => {
        editVision?.onChange((prev) => ({
          ...prev,
          title: setLocalized(asLocalized(prev.title), locale, values[0] ?? ""),
          text: setLocalized(asLocalized(prev.text), locale, values[1] ?? ""),
        }));
        editMission?.onChange((prev) => ({
          ...prev,
          title: setLocalized(asLocalized(prev.title), locale, values[2] ?? ""),
          text: setLocalized(asLocalized(prev.text), locale, values[3] ?? ""),
        }));
      }}
    >
      {(locale) => (
        <section
          className="about-vm section-padding"
          aria-label="Our Vision and Mission"
        >
          <div className="container">
            <div className="about-vm-grid">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
                  data-aos-delay={index * 100}
                >
                  <VisionMissionBlock
                    id={item.id}
                    data={item.data}
                    edit={item.edit}
                    locale={locale}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </LocalizedSection>
  );
}
