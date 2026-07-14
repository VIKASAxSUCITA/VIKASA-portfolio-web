import HomeAbout from "./HomeAbout";
import HomeContact from "./HomeContact";
import HomeCta from "./HomeCta";
import HomeHero from "./HomeHero";
import HomeInsights from "./HomeInsights";
import HomeServices from "./HomeServices";
import type { HomeContent, InsightPost } from "@/lib/content/types";

type HomeBodyProps = {
  content: HomeContent;
  insightsHeading: string;
  latestInsights: InsightPost[];
};

/** Home page composition — sections as TSX components. */
export default function HomeBody({
  content,
  insightsHeading,
  latestInsights,
}: HomeBodyProps) {
  return (
    <>
      <main>
        <HomeHero content={content.hero} />
        <HomeAbout content={content.about} />
        <HomeCta content={content.cta} />
        <HomeServices content={content.services} />
        <HomeInsights heading={insightsHeading} posts={latestInsights} />
        <HomeContact content={content.contact} />
      </main>
    </>
  );
}
