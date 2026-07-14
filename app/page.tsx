import type { Metadata } from "next";
import HomeContent from "./components/home";
import { loadPageContent } from "@/lib/content/firestore";

export const metadata: Metadata = {
  title: "VIKASA",
  description:
    "VIKASA — creative business consulting for corporate entities and professional businesses.",
};

export const dynamic = "force-dynamic";

export default async function Page() {
  const content = await loadPageContent("home");
  return <HomeContent content={content} />;
}
