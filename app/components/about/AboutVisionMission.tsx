import type { AboutContent } from "@/lib/content/types";
import { EditableField } from "../admin/EditableField";

type VmItem = AboutContent["vision"];
type VmEdit = { onChange: (updater: (prev: VmItem) => VmItem) => void };

type AboutVisionMissionProps = {
  vision: AboutContent["vision"];
  mission: AboutContent["mission"];
  editVision?: VmEdit;
  editMission?: VmEdit;
};

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

  return (
    <section className="about-vm section-padding" aria-label="Our Vision and Mission">
      <div className="container">
        <div className="about-vm-grid">
          {items.map((item, index) => {
            const titleEdit = item.edit
              ? {
                  onChange: (title: string) =>
                    item.edit!.onChange((prev) => ({ ...prev, title })),
                }
              : undefined;
            const textEdit = item.edit
              ? {
                  onChange: (text: string) =>
                    item.edit!.onChange((prev) => ({ ...prev, text })),
                }
              : undefined;

            return (
              <article
                key={item.id}
                className="about-vm-item"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <EditableField
                  as="h2"
                  className="heading text-36 about-vm-title"
                  value={item.data.title}
                  label={`${item.id} title`}
                  edit={titleEdit}
                />
                <EditableField
                  as="p"
                  className="text text-18 about-vm-desc"
                  value={item.data.text}
                  multiline
                  label={`${item.id} text`}
                  edit={textEdit}
                />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
