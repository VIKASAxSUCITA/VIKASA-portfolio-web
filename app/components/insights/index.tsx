import HomePageStyles from "../home/HomePageStyles";
import FooterSection from "../home/FooterSection";
import InsightsHero from "./InsightsHero";
import InsightsList from "./InsightsList";
import type { InsightsContent } from "@/lib/content/types";

export { default as InsightsHero } from "./InsightsHero";
export { default as InsightsList } from "./InsightsList";
export { default as InsightCardLink } from "./InsightCardLink";
export { default as InsightDetailsBody } from "./InsightDetailsBody";
export { default as InsightDetailsPage } from "./InsightDetailsPage";

type InsightsBodyProps = {
  content: InsightsContent;
};

export default function InsightsBody({ content }: InsightsBodyProps) {
  return (
    <>
      <HomePageStyles />
      <main>
        <InsightsHero heroTitle={content.heroTitle} />
        <InsightsList heading={content.heading} posts={content.posts} />
      </main>
      <div className="mt-100">
        <FooterSection />
      </div>
    </>
  );
}
