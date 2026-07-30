import HomeAbout from "./HomeAbout";
import HomeContact from "./HomeContact";
import HomeCta from "./HomeCta";
import HomeEvents from "./HomeEvents";
import HomeHero from "./HomeHero";
import HomeInsights from "./HomeInsights";
import HomeServices from "./HomeServices";
import LogoMarquee from "./LogoMarquee";
import { CLIENT_LOGOS, PARTNER_LOGOS } from "@/lib/content/logos";
import type { EventPost, HomeContent, InsightPost } from "@/lib/content/types";
import type { LocalizedString } from "@/lib/i18n/locale";

type HomeBodyProps = {
  content: HomeContent;
  insightsHeading: LocalizedString | string;
  latestInsights: InsightPost[];
  eventsHeading: LocalizedString | string;
  latestEvents: EventPost[];
};

/** Home page composition — sections as TSX components. */
export default function HomeBody({
  content,
  insightsHeading,
  latestInsights,
  eventsHeading,
  latestEvents,
}: HomeBodyProps) {
  return (
    <>
      <main>
        <HomeHero content={content.hero} />
        <LogoMarquee
          id="partners"
          title="Our Partners"
          subtitle="Trusted collaborators across investment and growth."
          items={PARTNER_LOGOS}
          direction="forward"
        />
        <LogoMarquee
          id="clients"
          title="Our Clients"
          subtitle="Organizations we support with clarity and execution."
          items={CLIENT_LOGOS}
          direction="reverse"
        />
        <HomeAbout content={content.about} />
        <HomeCta content={content.cta} />
        <HomeServices content={content.services} />
        <HomeInsights heading={insightsHeading} posts={latestInsights} />
        <HomeEvents heading={eventsHeading} posts={latestEvents} />
        <HomeContact content={content.contact} />
      </main>
    </>
  );
}
