import type { AboutContent } from "@/lib/content/types";

type AboutVisionMissionProps = {
  vision: AboutContent["vision"];
  mission: AboutContent["mission"];
};

export default function AboutVisionMission({
  vision,
  mission,
}: AboutVisionMissionProps) {
  const items = [
    { id: "vision", label: vision.title, text: vision.text },
    { id: "mission", label: mission.title, text: mission.text },
  ] as const;

  return (
    <section
      className="about-vm section-padding"
      aria-label="Our Vision and Mission"
    >
      <div className="container">
        <div className="about-vm-grid">
          {items.map((item, index) => (
            <article
              key={item.id}
              className="about-vm-item"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <h2 className="heading text-36 about-vm-title">{item.label}</h2>
              <p className="text text-18 about-vm-desc">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
