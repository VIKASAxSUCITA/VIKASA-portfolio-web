import HomePageStyles from "../home/HomePageStyles";
import FooterSection from "../home/FooterSection";
import LogoMarquee from "../home/LogoMarquee";
import AboutHero from "./AboutHero";
import AboutWhatWeDo from "./AboutWhatWeDo";
import AboutStory from "./AboutStory";
import AboutVisionMission from "./AboutVisionMission";
import AboutCoreValues from "./AboutCoreValues";
import { CLIENT_LOGOS, PARTNER_LOGOS } from "@/lib/content/logos";
import type { AboutContent } from "@/lib/content/types";
import { ui } from "@/lib/i18n/ui";

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
        <LogoMarquee
          id="partners"
          title={ui.partners.title}
          subtitle={ui.partners.subtitle}
          items={PARTNER_LOGOS}
          direction="forward"
        />
        <LogoMarquee
          id="clients"
          title={ui.clients.title}
          subtitle={ui.clients.subtitle}
          items={CLIENT_LOGOS}
          direction="reverse"
        />
      </main>
      <FooterSection />
    </>
  );
}
