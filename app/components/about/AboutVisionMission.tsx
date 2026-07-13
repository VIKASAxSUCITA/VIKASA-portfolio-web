const items = [
  {
    id: "vision",
    label: "Our Vision",
    text: "To empower businesses by reshaping the future, refining excellence, and reimagining possibilities through accountable and innovative strategies that drive sustainable growth and transformation.",
  },
  {
    id: "mission",
    label: "Our Mission",
    text: "Our mission is to provide businesses with actionable insights and transformative solutions by reinforcing accountability, driving continuous improvement, and fostering innovative strategies that unlock growth and reimagine new possibilities for success.",
  },
] as const;

export default function AboutVisionMission() {
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
