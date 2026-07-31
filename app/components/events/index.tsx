import HomePageStyles from "../home/HomePageStyles";
import FooterSection from "../home/FooterSection";
import EventsHero from "./EventsHero";
import EventsList from "./EventsList";
import type { EventsContent } from "@/lib/content/types";

export { default as EventsHero } from "./EventsHero";
export { default as EventsList } from "./EventsList";
export { default as EventDetailsBody } from "./EventDetailsBody";
export { default as EventDetailsPage } from "./EventDetailsPage";

type EventsBodyProps = {
  content: EventsContent;
};

export default function EventsBody({ content }: EventsBodyProps) {
  return (
    <>
      <HomePageStyles />
      <main>
        <EventsHero heroTitle={content.heroTitle} />
        <EventsList heading={content.heading} posts={content.posts} />
      </main>
      <FooterSection />
    </>
  );
}
