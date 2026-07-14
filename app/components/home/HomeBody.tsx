import HomeAbout from "./HomeAbout";
import HomeContact from "./HomeContact";
import HomeCta from "./HomeCta";
import HomeHero from "./HomeHero";
import HomeInsights from "./HomeInsights";
import HomeServices from "./HomeServices";
import type { HomeContent } from "@/lib/content/types";

type HomeBodyProps = {
  content: HomeContent;
};

/** Home page composition — 7 sections as TSX components. */
export default function HomeBody({ content }: HomeBodyProps) {
  return (
    <>
      <main>
        <HomeHero content={content.hero} />
        <HomeAbout content={content.about} />
        <HomeCta content={content.cta} />
        <HomeServices content={content.services} />
        <HomeInsights content={content.insights} />
        <HomeContact />
      </main>
    </>
  );
}
