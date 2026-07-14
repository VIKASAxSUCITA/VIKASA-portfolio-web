import type { Metadata } from "next";
import BlogDetailsContent from "../components/blog-details";
import { loadPageContent } from "@/lib/content/firestore";

export const metadata: Metadata = {
  title: "Insight Details",
  description:
    "Read the latest insights from VIKASA — creative business consulting.",
};

export const dynamic = "force-dynamic";

export default async function Page() {
  const content = await loadPageContent("blog-details");
  return <BlogDetailsContent content={content} />;
}
