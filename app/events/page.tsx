import type { Metadata } from "next";
import EventsBody from "../components/events";
import { loadPageContent } from "@/lib/content/firestore";
import { sortEventsBySchedule } from "@/lib/content/events";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Events and announcements from VIKASA — workshops, schedules, and company updates.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Page() {
  const content = await loadPageContent("events");
  return (
    <EventsBody
      content={{
        ...content,
        posts: sortEventsBySchedule(content.posts),
      }}
    />
  );
}
