import type { Metadata } from "next";
import HomeContact from "@/app/components/home/HomeContact";
import FooterSection from "@/app/components/home/FooterSection";
import { loadPageContent } from "@/lib/content/firestore";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact VIKASA — request a proposal or speak with our consulting team.",
};

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const content = await loadPageContent("home");

  return (
    <main className="contact-page">
      <HomeContact content={content.contact} />
      <FooterSection />
    </main>
  );
}
