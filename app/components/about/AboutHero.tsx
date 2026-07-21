import type { AboutContent } from "@/lib/content/types";
import { EditableField, EditableMedia } from "../admin/EditableField";

type Hero = AboutContent["hero"];

type AboutHeroProps = {
  content: Hero;
  edit?: { onChange: (updater: (prev: Hero) => Hero) => void };
};

export default function AboutHero({ content, edit }: AboutHeroProps) {
  const text = (key: "title" | "text") =>
    edit
      ? {
          onChange: (value: string) =>
            edit.onChange((prev) => ({ ...prev, [key]: value })),
        }
      : undefined;

  const imageEdit = edit
    ? {
        onChange: (image: string) =>
          edit.onChange((prev) => ({ ...prev, image })),
      }
    : undefined;

  return (
    <section className="page-banner overlay about-hero" aria-label="About VIKASA">
      <picture className="media media-bg">
        <EditableMedia
          src={content.image}
          width={1920}
          height={520}
          loading="eager"
          alt="VIKASA team collaborating"
          edit={imageEdit}
        />
      </picture>
      <div className="page-banner-content">
        <div className="container text-center">
          <EditableField
            as="h1"
            className="heading text-80 fw-700 about-hero-title"
            value={content.title}
            aos="fade-up"
            label="About hero title"
            edit={text("title")}
          />
          <EditableField
            as="p"
            className="text text-18 about-hero-desc"
            value={content.text}
            multiline
            aos="fade-up"
            aosDelay={100}
            label="About hero description"
            edit={text("text")}
          />
        </div>
      </div>
    </section>
  );
}
