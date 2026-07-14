import type { Metadata } from "next";
import HomeContent from "./components/home";
import { loadPageContent } from "@/lib/content/firestore";
import { getLatestInsights } from "@/lib/content/insights";

export const metadata: Metadata = {
  title: "VIKASA",
  description:
    "VIKASA — creative business consulting for corporate entities and professional businesses.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Page() {
  const [content, insights] = await Promise.all([
    loadPageContent("home"),
    loadPageContent("insights"),
  ]);

  return (
    <HomeContent
      content={content}
      insightsHeading={insights.heading}
      latestInsights={getLatestInsights(insights.posts, 3)}
    />
  );
}
