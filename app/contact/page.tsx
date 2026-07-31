import type { Metadata } from "next";
import HomeContact from "@/app/components/home/HomeContact";
import FooterSection from "@/app/components/home/FooterSection";
import PageHeroCopy from "@/app/components/i18n/PageHeroCopy";
import { loadPageContent } from "@/lib/content/firestore";
import { ui } from "@/lib/i18n/ui";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact VIKASA — request a proposal or speak with our consulting team.",
};

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const content = await loadPageContent("home");

  return (
    <>
      <section
        className="vikasa-hero-cinematic about-hero-cinematic page-hero-banner page-hero-banner--start"
        aria-label="Contact"
      >
        <div className="vikasa-hero-bg">
          <img
            src="/assets/img/vikasa/banners/contact-banner.jpg"
            width={1920}
            height={1080}
            loading="eager"
            alt=""
            className="vikasa-hero-bg-image"
          />
          <div className="vikasa-hero-overlay" aria-hidden />
        </div>
        <div className="vikasa-hero-content">
          <div className="container">
            <PageHeroCopy
              title={ui.pageHero.contactTitle}
              text={ui.pageHero.contactText}
            />
          </div>
        </div>
      </section>
      <main>
        <HomeContact content={content.contact} />
      </main>
      <FooterSection />
    </>
  );
}
