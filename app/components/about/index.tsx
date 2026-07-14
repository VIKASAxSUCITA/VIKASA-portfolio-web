import HomePageStyles from "../home/HomePageStyles";
import FooterSection from "../home/FooterSection";
import AboutHero from "./AboutHero";
import AboutWhatWeDo from "./AboutWhatWeDo";
import AboutStory from "./AboutStory";
import AboutVisionMission from "./AboutVisionMission";
import AboutCoreValues from "./AboutCoreValues";
import type { AboutContent } from "@/lib/content/types";

export { default as AboutHero } from "./AboutHero";
export { default as AboutWhatWeDo } from "./AboutWhatWeDo";
export { default as AboutStory } from "./AboutStory";
export { default as AboutVisionMission } from "./AboutVisionMission";
export { default as AboutCoreValues } from "./AboutCoreValues";

type AboutBodyProps = {
  content: AboutContent;
};

export default function AboutBody({ content }: AboutBodyProps) {
  return (
    <>
      <HomePageStyles />
      <main>
        <AboutHero content={content.hero} />
        <AboutWhatWeDo content={content.whatWeDo} />
        <AboutStory content={content.story} />
        <AboutVisionMission
          vision={content.vision}
          mission={content.mission}
        />
        <AboutCoreValues />
      </main>
      <FooterSection />
    </>
  );
}
