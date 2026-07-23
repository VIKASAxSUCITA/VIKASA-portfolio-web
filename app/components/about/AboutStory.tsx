import type { AboutContent } from "@/lib/content/types";
import { EditableField } from "../admin/EditableField";

type Story = AboutContent["story"];

type AboutStoryProps = {
  content: Story;
  edit?: { onChange: (updater: (prev: Story) => Story) => void };
};

export default function AboutStory({ content, edit }: AboutStoryProps) {
  const text = (key: "title" | "text") =>
    edit
      ? {
          onChange: (value: string) =>
            edit.onChange((prev) => ({ ...prev, [key]: value })),
        }
      : undefined;

  return (
    <section className="mt-100" aria-labelledby="about-story-heading">
      <div className="container">
        <div className="about-story-inner text-center">
          <EditableField
            as="h2"
            id="about-story-heading"
            className="heading text-50 about-story-title"
            value={content.title}
            aos="fade-up"
            aosDelay={50}
            label="Story title"
            edit={text("title")}
          />
          <EditableField
            as="p"
            className="text text-18 about-story-desc"
            value={content.text}
            multiline
            aos="fade-up"
            aosDelay={100}
            label="Story text"
            edit={text("text")}
          />
        </div>
      </div>
    </section>
  );
}
