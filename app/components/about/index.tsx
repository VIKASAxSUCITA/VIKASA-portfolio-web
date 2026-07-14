import HomeFooter from "../home/HomeFooter";
import HomePageStyles from "../home/HomePageStyles";
import AboutHero from "./AboutHero";
import AboutWhatWeDo from "./AboutWhatWeDo";
import AboutStory from "./AboutStory";
import AboutVisionMission from "./AboutVisionMission";
import AboutCoreValues from "./AboutCoreValues";

export { default as AboutHero } from "./AboutHero";
export { default as AboutWhatWeDo } from "./AboutWhatWeDo";
export { default as AboutStory } from "./AboutStory";
export { default as AboutVisionMission } from "./AboutVisionMission";
export { default as AboutCoreValues } from "./AboutCoreValues";

export default function AboutBody() {
  return (
    <>
      <HomePageStyles />
      <main>
        <AboutHero />
        <AboutWhatWeDo />
        <AboutStory />
        <AboutVisionMission />
        <AboutCoreValues />
      </main>
      <HomeFooter />
    </>
  );
}
