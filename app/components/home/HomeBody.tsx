import HomeAbout from "./HomeAbout";
import HomeContact from "./HomeContact";
import HomeCta from "./HomeCta";
import HomeFooter from "./HomeFooter";
import HomeHero from "./HomeHero";
import HomeInsights from "./HomeInsights";
import HomeServices from "./HomeServices";

/** Home page composition — 7 sections as TSX components. */
export default function HomeBody() {
  return (
    <>
      <main>
        <HomeHero />
        <HomeAbout />
        <HomeCta />
        <HomeServices />
        <HomeInsights />
        <HomeContact />
      </main>
      <HomeFooter />
    </>
  );
}
