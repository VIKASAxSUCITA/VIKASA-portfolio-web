import HomeFooter from "../home/HomeFooter";
import HomePageStyles from "../home/HomePageStyles";
import InsightsHero from "./InsightsHero";
import InsightsList from "./InsightsList";

export { default as InsightsHero } from "./InsightsHero";
export { default as InsightsList } from "./InsightsList";

export default function InsightsBody() {
  return (
    <>
      <HomePageStyles />
      <main>
        <InsightsHero />
        <InsightsList />
      </main>
      <div className="mt-100">
        <HomeFooter />
      </div>
    </>
  );
}
