import type { Metadata } from "next";
import AboutBody from "../components/about";
import { loadPageContent } from "@/lib/content/firestore";

export const metadata: Metadata = {
  title: "About VIKASA",
  description:
    "Vikasa helps businesses grow through strategic consulting, innovation, and accountable solutions that create sustainable transformation.",
};

export const dynamic = "force-dynamic";

export default async function Page() {
  const content = await loadPageContent("about");
  return <AboutBody content={content} />;
}
