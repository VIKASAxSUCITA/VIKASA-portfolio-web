"use client";

import { useState } from "react";
import AdminGuard from "@/app/components/admin/AdminGuard";
import AdminServiceDetailEditor from "@/app/components/admin/AdminServiceDetailEditor";
import AdminShell from "@/app/components/admin/AdminShell";
import AdminSitePreview from "@/app/components/admin/AdminSitePreview";
import { usePageWithFooterEditor } from "@/app/components/admin/usePageWithFooterEditor";
import type { ServiceDetail } from "@/lib/content/services";
import { readLocalized } from "@/lib/i18n/localized";

export default function AdminServicesPage() {
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
  } = usePageWithFooterEditor("services");
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const shellProps = {
    pageTitle: "Services",
    onSave: save,
    saving,
    dirty,
    message,
  };

  if (loading) {
    return (
      <AdminGuard>
        <AdminShell {...shellProps}>
          <p className="admin-main text text-16">Loading services…</p>
        </AdminShell>
      </AdminGuard>
    );
  }

  const services = content.services;
  const activeService =
    services.find((service) => service.slug === activeSlug) ?? null;

  function updateService(
    slug: string,
    updater: (service: ServiceDetail) => ServiceDetail
  ) {
    update((prev) => ({
      ...prev,
      services: prev.services.map((service) =>
        service.slug === slug ? updater(service) : service
      ),
    }));
  }

  return (
    <AdminGuard>
      <AdminShell {...shellProps}>
        <AdminSitePreview footer={footerContent} footerUpdate={footerUpdate}>
          {activeService ? (
            <AdminServiceDetailEditor
              service={activeService}
              allServices={services}
              onBack={() => setActiveSlug(null)}
              onChange={(updater) =>
                updateService(activeService.slug, updater)
              }
              saving={saving}
            />
          ) : (
            <div className="admin-main admin-services-page">
              <div className="admin-services-intro">
                <h1 className="heading text-40">Services</h1>
                <p className="text text-16">
                  Edit the three default VIKASA services. Changes publish to the
                  public Services pages and keep the home service cards in sync.
                </p>
              </div>

              <div className="admin-services-grid">
                {services.map((service) => (
                  <article key={service.slug} className="admin-service-card">
                    <div className="admin-service-card-media">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={service.heroImage || service.icon}
                        alt=""
                        loading="lazy"
                      />
                    </div>
                    <div className="admin-service-card-body">
                      <div className="admin-service-card-copy">
                        <h2 className="heading admin-service-card-title">
                          {readLocalized(service.title, "en")}
                        </h2>
                        <p className="admin-service-card-slug">
                          /services/{service.slug}
                        </p>
                        <p className="admin-service-card-desc">
                          {readLocalized(service.description, "en")}
                        </p>
                      </div>
                      <div className="admin-service-card-actions">
                        <button
                          type="button"
                          className="button button--slim"
                          onClick={() => setActiveSlug(service.slug)}
                        >
                          Edit service
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </AdminSitePreview>
      </AdminShell>
    </AdminGuard>
  );
}
