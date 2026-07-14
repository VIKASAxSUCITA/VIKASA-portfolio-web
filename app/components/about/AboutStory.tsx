import type { AboutContent } from "@/lib/content/types";

type AboutStoryProps = {
  content: AboutContent["story"];
};

export default function AboutStory({ content }: AboutStoryProps) {
  return (
    <section className="mt-100" aria-labelledby="about-story-heading">
      <div className="container">
        <div className="about-story-inner text-center">
          <h2
            id="about-story-heading"
            className="heading text-50 about-story-title"
            data-aos="fade-up"
            data-aos-delay="50"
          >
            {content.title}
          </h2>

          <p
            className="text text-18 about-story-desc"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {content.text}
          </p>
        </div>
      </div>
    </section>
  );
}
