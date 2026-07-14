import type { Metadata } from "next";
import { notFound } from "next/navigation";
import InsightDetailsPage from "../../components/insights/InsightDetailsPage";
import { loadInsightById } from "@/lib/content/insightsStore";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const post = await loadInsightById(id);
  return {
    title: post?.title ?? "Insight",
    description:
      "Read the latest insights from VIKASA — creative business consulting.",
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const post = await loadInsightById(id);
  if (!post) notFound();
  return <InsightDetailsPage post={post} />;
}
