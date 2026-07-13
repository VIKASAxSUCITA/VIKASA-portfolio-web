import HomeBody from "./HomeBody";
import HomeHashScroll from "./HomeHashScroll";
import HomePageStyles from "./HomePageStyles";

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

export default function HomeContent() {
  return (
    <>
      <HomePageStyles />
      <HomeHashScroll />
      <HomeBody />
    </>
  );
}
