import type { HomeContent } from "@/lib/content/types";
import {
  ArrowIcon,
  EditableField,
  EditableMedia,
  SectionButton,
} from "../admin/EditableField";

type Hero = HomeContent["hero"];

type HomeHeroProps = {
  content: Hero;
  edit?: { onChange: (updater: (prev: Hero) => Hero) => void };
};

export default function HomeHero({ content, edit }: HomeHeroProps) {
  const text = (key: "title" | "text" | "ctaLabel") =>
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
    <div className="hero-slider with-floating-header with-fixed-bg">
      <div className="slider-card overlay">
        <picture className="slider-media">
          <EditableMedia
            src={content.image}
            width={1920}
            height={1000}
            loading="eager"
            alt="VIKASA team"
            edit={imageEdit}
          />
        </picture>
        <div className="slider-content">
          <div className="container height-100 d-flex align-items-center justify-content-center text-center">
            <div className="content-box section-headings">
              <EditableField
                as="h2"
                className="heading text-90 fw-700"
                value={content.title}
                aos="fade-up"
                aosDelay={100}
                label="Hero title"
                edit={text("title")}
              />
              <EditableField
                className="text text-18"
                value={content.text}
                multiline
                aos="fade-up"
                aosDelay={200}
                label="Hero text"
                edit={text("text")}
              />
              <div className="buttons" data-aos="fade-up" data-aos-delay="300">
                <SectionButton
                  label={content.ctaLabel}
                  href="/#contact"
                  className="button button--primary"
                  ariaLabel="Book Strategy Call"
                  edit={text("ctaLabel")}
                >
                  <ArrowIcon />
                </SectionButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
