import HomePageStyles from "../home/HomePageStyles";
import FooterSection from "../home/FooterSection";
import EventDetailsBody from "./EventDetailsBody";
import type { EventPost } from "@/lib/content/types";

type EventDetailsPageProps = {
  post: EventPost;
  contact?: {
    email?: string;
    phone?: string;
  };
};

export default function EventDetailsPage({
  post,
  contact,
}: EventDetailsPageProps) {
  return (
    <>
      <HomePageStyles />
      <EventDetailsBody post={post} contact={contact} />
      <div className="mt-100">
        <FooterSection />
      </div>
    </>
  );
}
