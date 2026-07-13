import AboutHero from "./AboutHero";
import AboutStory from "./AboutStory";
import AboutVisionMission from "./AboutVisionMission";

export { default as AboutHero } from "./AboutHero";
export { default as AboutStory } from "./AboutStory";
export { default as AboutVisionMission } from "./AboutVisionMission";

type AboutBodyProps = {
  restHtml: string;
};

export default function AboutBody({ restHtml }: AboutBodyProps) {
  return (
    <>
      <AboutHero />
      <AboutStory />
      <AboutVisionMission />
      <div dangerouslySetInnerHTML={{ __html: restHtml }} />
    </>
  );
}
