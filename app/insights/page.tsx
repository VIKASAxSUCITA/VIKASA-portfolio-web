import type { Metadata } from "next";
import InsightsBody from "../components/insights";
import { loadPageContent } from "@/lib/content/firestore";
import { sortInsightsByLatest } from "@/lib/content/insights";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Latest insights and articles from VIKASA — creative business consulting.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Page() {
  const content = await loadPageContent("insights");
  return (
    <InsightsBody
      content={{
        ...content,
        posts: sortInsightsByLatest(content.posts),
      }}
    />
  );
}
