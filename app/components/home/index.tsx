import HomeBody from "./HomeBody";
import HomeHashScroll from "./HomeHashScroll";
import HomePageStyles from "./HomePageStyles";
import FooterSection from "./FooterSection";
import type { HomeContent, InsightPost } from "@/lib/content/types";

export { default as HomePageStyles } from "./HomePageStyles";
export { default as HomeHeader } from "./HomeHeader";
export { default as HomeBody } from "./HomeBody";
export { default as HomeHero } from "./HomeHero";
export { default as HomeAbout } from "./HomeAbout";
export { default as HomeCta } from "./HomeCta";
export { default as HomeServices } from "./HomeServices";
export { default as HomeInsights } from "./HomeInsights";
export { default as HomeContact } from "./HomeContact";
export { default as HomeFooter } from "./HomeFooter";
export { default as HomeHashScroll } from "./HomeHashScroll";

type HomeContentProps = {
  content: HomeContent;
  insightsHeading: string;
  latestInsights: InsightPost[];
};

export default function HomeContent({
  content,
  insightsHeading,
  latestInsights,
}: HomeContentProps) {
  return (
    <>
      <HomePageStyles />
      <HomeHashScroll />
      <HomeBody
        content={content}
        insightsHeading={insightsHeading}
        latestInsights={latestInsights}
      />
      <FooterSection />
    </>
  );
}
