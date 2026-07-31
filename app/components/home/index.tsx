import HomeBody from "./HomeBody";
import HomeHashScroll from "./HomeHashScroll";
import HomePageStyles from "./HomePageStyles";
import FooterSection from "./FooterSection";
import type { EventPost, HomeContent, InsightPost } from "@/lib/content/types";
import type { LocalizedString } from "@/lib/i18n/locale";

export { default as HomePageStyles } from "./HomePageStyles";
export { default as HomeHeader } from "./HomeHeader";
export { default as HomeBody } from "./HomeBody";
export { default as HomeHero } from "./HomeHero";
export { default as HomeAbout } from "./HomeAbout";
export { default as HomeCta } from "./HomeCta";
export { default as HomeServices } from "./HomeServices";
export { default as HomeInsights } from "./HomeInsights";
export { default as HomeEvents } from "./HomeEvents";
export { default as HomeContact } from "./HomeContact";
export { default as HomeFooter } from "./HomeFooter";
export { default as HomeHashScroll } from "./HomeHashScroll";

type HomeContentProps = {
  content: HomeContent;
  insightsHeading: LocalizedString | string;
  latestInsights: InsightPost[];
  eventsHeading: LocalizedString | string;
  latestEvents: EventPost[];
};

export default function HomeContent({
  content,
  insightsHeading,
  latestInsights,
  eventsHeading,
  latestEvents,
}: HomeContentProps) {
  return (
    <>
      <HomePageStyles />
      <HomeHashScroll />
      <HomeBody
        content={content}
        insightsHeading={insightsHeading}
        latestInsights={latestInsights}
        eventsHeading={eventsHeading}
        latestEvents={latestEvents}
      />
      <FooterSection />
    </>
  );
}
