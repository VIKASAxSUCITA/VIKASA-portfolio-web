"use client";

import AdminGuard from "@/app/components/admin/AdminGuard";
import AdminShell from "@/app/components/admin/AdminShell";
import AdminSitePreview from "@/app/components/admin/AdminSitePreview";
import AboutHero from "@/app/components/about/AboutHero";
import AboutWhatWeDo from "@/app/components/about/AboutWhatWeDo";
import AboutStory from "@/app/components/about/AboutStory";
import AboutVisionMission from "@/app/components/about/AboutVisionMission";
import AboutCoreValues from "@/app/components/about/AboutCoreValues";
import LogoMarquee from "@/app/components/home/LogoMarquee";
import { usePageWithFooterEditor } from "@/app/components/admin/usePageWithFooterEditor";
import { CLIENT_LOGOS, PARTNER_LOGOS } from "@/lib/content/logos";
import { ui } from "@/lib/i18n/ui";
import type { AboutContent } from "@/lib/content/types";

export default function AdminAboutEditorPage() {
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
  } = usePageWithFooterEditor("about");

  const shellProps = {
    pageTitle: "About",
    onSave: save,
    saving,
    dirty,
    message,
  };

  if (loading) {
    return (
      <AdminGuard>
        <AdminShell {...shellProps}>
          <p className="admin-main text text-16">Loading about content...</p>
        </AdminShell>
      </AdminGuard>
    );
  }

  const sectionEdit = <K extends keyof AboutContent>(key: K) => ({
    onChange: (updater: (prev: AboutContent[K]) => AboutContent[K]) =>
      update((prev) => ({ ...prev, [key]: updater(prev[key]) })),
  });

  return (
    <AdminGuard>
      <AdminShell {...shellProps}>
        <AdminSitePreview footer={footerContent} footerUpdate={footerUpdate}>
          <main>
            <AboutHero content={content.hero} edit={sectionEdit("hero")} />
            <AboutWhatWeDo
              content={content.whatWeDo}
              edit={sectionEdit("whatWeDo")}
            />
            <AboutStory content={content.story} edit={sectionEdit("story")} />
            <AboutVisionMission
              vision={content.vision}
              mission={content.mission}
              editVision={sectionEdit("vision")}
              editMission={sectionEdit("mission")}
            />
            <AboutCoreValues />
            <LogoMarquee
              id="partners"
              title={ui.partners.title}
              subtitle={ui.partners.subtitle}
              items={PARTNER_LOGOS}
              direction="forward"
            />
            <LogoMarquee
              id="clients"
              title={ui.clients.title}
              subtitle={ui.clients.subtitle}
              items={CLIENT_LOGOS}
              direction="reverse"
            />
          </main>
        </AdminSitePreview>
      </AdminShell>
    </AdminGuard>
  );
}
