"use client";

import { useEffect, useState } from "react";
import AdminGuard from "@/app/components/admin/AdminGuard";
import AdminShell from "@/app/components/admin/AdminShell";
import AdminSitePreview from "@/app/components/admin/AdminSitePreview";
import HomeHero from "@/app/components/home/HomeHero";
import HomeAbout from "@/app/components/home/HomeAbout";
import HomeCta from "@/app/components/home/HomeCta";
import HomeServices from "@/app/components/home/HomeServices";
import HomeInsights from "@/app/components/home/HomeInsights";
import HomeEvents from "@/app/components/home/HomeEvents";
import HomeContact from "@/app/components/home/HomeContact";
import LogoMarquee from "@/app/components/home/LogoMarquee";
import { usePageEditor } from "@/app/components/admin/usePageEditor";
import { usePageWithFooterEditor } from "@/app/components/admin/usePageWithFooterEditor";
import { getLatestEvents } from "@/lib/content/events";
import { getLatestInsights } from "@/lib/content/insights";
import { CLIENT_LOGOS, PARTNER_LOGOS } from "@/lib/content/logos";
import type {
  EventsContent,
  HomeContent,
  InsightsContent,
} from "@/lib/content/types";

export default function AdminHomeEditor() {
  const {
    content,
    loading,
    saving,
    dirty,
    message,
    update,
    save,
    footerContent,
    footerUpdate,
  } = usePageWithFooterEditor("home");

  const insightsEditor = usePageEditor("insights");
  const eventsEditor = usePageEditor("events");
  const [insightsPreview, setInsightsPreview] = useState<InsightsContent | null>(
    null
  );
  const [eventsPreview, setEventsPreview] = useState<EventsContent | null>(null);

  useEffect(() => {
    if (!insightsEditor.loading) {
      setInsightsPreview(insightsEditor.content);
    }
  }, [insightsEditor.loading, insightsEditor.content]);

  useEffect(() => {
    if (!eventsEditor.loading) {
      setEventsPreview(eventsEditor.content);
    }
  }, [eventsEditor.loading, eventsEditor.content]);

  const shellProps = {
    pageTitle: "Home",
    onSave: save,
    saving,
    dirty,
    message,
  };

  if (loading || insightsEditor.loading || eventsEditor.loading) {
    return (
      <AdminGuard>
        <AdminShell {...shellProps}>
          <p className="admin-main text text-16">Loading home content...</p>
        </AdminShell>
      </AdminGuard>
    );
  }

  const latestInsights = getLatestInsights(insightsPreview?.posts ?? [], 6);
  const insightsHeading = insightsPreview?.heading ?? "Latest Insights From Us";
  const latestEvents = getLatestEvents(eventsPreview?.posts ?? [], 3);
  const eventsHeading =
    eventsPreview?.heading ?? "Upcoming Events & Announcements";

  const sectionEdit = <K extends keyof HomeContent>(key: K) => ({
    onChange: (updater: (prev: HomeContent[K]) => HomeContent[K]) =>
      update((prev) => ({ ...prev, [key]: updater(prev[key]) })),
  });

  return (
    <AdminGuard>
      <AdminShell {...shellProps}>
        <AdminSitePreview footer={footerContent} footerUpdate={footerUpdate}>
          <main>
            <HomeHero content={content.hero} edit={sectionEdit("hero")} />
            <HomeAbout content={content.about} edit={sectionEdit("about")} />
            <HomeCta content={content.cta} edit={sectionEdit("cta")} />
            <HomeServices
              content={content.services}
              edit={sectionEdit("services")}
            />
            <LogoMarquee
              id="partners"
              title="Our Partners"
              subtitle="Trusted collaborators across investment and growth."
              items={PARTNER_LOGOS}
              direction="forward"
            />
            <LogoMarquee
              id="clients"
              title="Our Clients"
              subtitle="Organizations we support with clarity and execution."
              items={CLIENT_LOGOS}
              direction="reverse"
            />
            <HomeInsights
              heading={insightsHeading}
              posts={latestInsights}
              adminLinks
            />
            <HomeEvents
              heading={eventsHeading}
              posts={latestEvents}
              adminLinks
            />
            <HomeContact
              content={content.contact}
              edit={sectionEdit("contact")}
            />
          </main>
        </AdminSitePreview>
      </AdminShell>
    </AdminGuard>
  );
}
