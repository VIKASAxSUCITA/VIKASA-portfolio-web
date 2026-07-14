import { redirect } from "next/navigation";
import { loadPageContent } from "@/lib/content/firestore";
import { sortInsightsByLatest } from "@/lib/content/insights";

export const dynamic = "force-dynamic";

/** Old blog-details URL → latest insight detail. */
export default async function Page() {
  const insights = await loadPageContent("insights");
  const latest = sortInsightsByLatest(insights.posts)[0];
  if (latest) {
    redirect(`/insights/${latest.id}`);
  }
  redirect("/insights");
}
