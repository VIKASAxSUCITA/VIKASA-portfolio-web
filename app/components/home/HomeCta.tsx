import type { HomeContent } from "@/lib/content/types";
import {
  ArrowIcon,
  EditableField,
  SectionButton,
} from "../admin/EditableField";
import EditableText from "../admin/EditableText";

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
  const text = (key: "badge" | "title" | "text" | "buttonLabel") =>
    edit
      ? {
          onChange: (value: string) =>
            edit.onChange((prev) => ({ ...prev, [key]: value })),
        }
      : undefined;

  return (
    <div className="text-banner mt-100">
      <div className="container-fluid">
        <div className="text-banner-inner radius18">
          <div className="section-headings">
            <div className="subheading text-20 subheading-bg" data-aos="fade-up">
              <PlayIcon />
              {edit ? (
                <EditableText
                  value={content.badge}
                  label="CTA badge"
                  onChange={text("badge")!.onChange}
                />
              ) : (
                <span>{content.badge}</span>
              )}
              <PlayIcon />
            </div>
            <EditableField
              as="h2"
              className="heading text-80"
              value={content.title}
              aos="fade-up"
              label="CTA title"
              edit={text("title")}
            />
            <EditableField
              as="p"
              className="text text-24"
              value={content.text}
              multiline
              aos="fade-up"
              label="CTA text"
              edit={text("text")}
            />
            <div className="buttons" data-aos="fade-up">
              <SectionButton
                label={content.buttonLabel}
                href="/#contact"
                className="button button--secondary"
                ariaLabel="See More Services"
                edit={text("buttonLabel")}
              >
                <ArrowIcon />
                <span className="visually-hidden">
                  To learn more about the service, click this button.
                </span>
              </SectionButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
