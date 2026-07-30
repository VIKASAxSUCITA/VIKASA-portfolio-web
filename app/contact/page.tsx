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
    <>
      <section
        className="vikasa-hero-cinematic about-hero-cinematic page-hero-banner"
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
          <div className="container text-center">
            <div className="vikasa-hero-copy section-headings page-hero-copy">
              <h1 className="heading vikasa-hero-title" data-aos="fade-up">
                Contact
              </h1>
              <p
                className="text text-18 vikasa-hero-text page-hero-text"
                data-aos="fade-up"
                data-aos-delay="80"
              >
                Tell us about your goals. We will follow up with a clear next
                step.
              </p>
            </div>
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
