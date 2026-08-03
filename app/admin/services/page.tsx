"use client";

import { useMemo, useState } from "react";
import AdminGuard from "@/app/components/admin/AdminGuard";
import AdminServiceDetailEditor from "@/app/components/admin/AdminServiceDetailEditor";
import AdminShell from "@/app/components/admin/AdminShell";
import { usePageEditor } from "@/app/components/admin/usePageEditor";
import AutoTranslateButton from "@/app/components/i18n/AutoTranslateButton";
import LocaleEditTabs from "@/app/components/i18n/LocaleEditTabs";
import { excerptText } from "@/lib/content/adminFormat";
import type { ServiceDetail } from "@/lib/content/services";
import type { Locale } from "@/lib/i18n/locale";
import { readLocalized, setLocalized } from "@/lib/i18n/localized";

function EditIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 20h4l10.5-10.5a2.1 2.1 0 0 0-3-3L5 17v3Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="m13.5 6.5 3 3"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function AdminServicesPage() {
  const {
    content,
    loading,
    saving,
    dirty,
    message,
    update,
    save,
    discard,
  } = usePageEditor("services");
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [editLocale, setEditLocale] = useState<Locale>("en");

  const listShellProps = {
    pageTitle: "Services",
    saving,
    message,
  };

  function handleBack() {
    if (dirty) {
      const ok = window.confirm(
        "You have unsaved changes. Leave without saving? Your edits will be discarded."
      );
      if (!ok) return;
      discard();
    }
    setActiveSlug(null);
    setEditLocale("en");
  }

  if (loading) {
    return (
      <AdminGuard>
        <AdminShell {...listShellProps}>
          <p className="admin-cms admin-cms-empty">Loading services…</p>
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
      {activeService ? (
        <ServiceEditShell
          service={activeService}
          editLocale={editLocale}
          onEditLocaleChange={setEditLocale}
          onBack={handleBack}
          onChange={(updater) => updateService(activeService.slug, updater)}
          onSave={save}
          saving={saving}
          dirty={dirty}
          message={message}
        />
      ) : (
        <AdminShell {...listShellProps}>
          <div className="admin-cms">
            <div className="admin-cms-panel">
              <div className="admin-cms-table-wrap">
                <table className="admin-cms-table">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Cover</th>
                      <th>Title</th>
                      <th>Slug</th>
                      <th>Sub-services</th>
                      <th>View</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map((service, index) => (
                      <tr key={service.slug}>
                        <td className="admin-cms-no">{index + 1}</td>
                        <td className="admin-cms-cover">
                          <div className="admin-cms-cover-media">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={service.heroImage || service.icon}
                              alt=""
                            />
                          </div>
                        </td>
                        <td>
                          <div className="admin-cms-title">
                            <strong>
                              {readLocalized(service.title, "en")}
                            </strong>
                            <div className="admin-cms-desc">
                              <span className="admin-cms-excerpt">
                                {excerptText(
                                  readLocalized(service.description, "en")
                                )}
                              </span>
                              <div className="admin-cms-row-actions">
                                <button
                                  type="button"
                                  className="admin-cms-icon-btn"
                                  aria-label="Edit service"
                                  onClick={() => setActiveSlug(service.slug)}
                                >
                                  <EditIcon />
                                </button>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>/services/{service.slug}</td>
                        <td>{service.items.length}</td>
                        <td>
                          <a
                            className="admin-cms-view"
                            href={`/services/${service.slug}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            ##
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </AdminShell>
      )}
    </AdminGuard>
  );
}

function ServiceEditShell({
  service,
  editLocale,
  onEditLocaleChange,
  onBack,
  onChange,
  onSave,
  saving,
  dirty,
  message,
}: {
  service: ServiceDetail;
  editLocale: Locale;
  onEditLocaleChange: (locale: Locale) => void;
  onBack: () => void;
  onChange: (updater: (service: ServiceDetail) => ServiceDetail) => void;
  onSave: () => void;
  saving: boolean;
  dirty: boolean;
  message: string;
}) {
  const translateSources = useMemo(
    () => [
      readLocalized(service.title, "en"),
      readLocalized(service.description, "en"),
      readLocalized(service.body, "en"),
      ...service.items.map((item) => readLocalized(item, "en")),
    ],
    [service.body, service.description, service.items, service.title]
  );

  return (
    <AdminShell
      pageTitle="Services"
      onBack={onBack}
      onSave={onSave}
      saving={saving}
      dirty={dirty}
      message={message}
      topbarTools={
        <>
          <LocaleEditTabs locale={editLocale} onChange={onEditLocaleChange} />
          <AutoTranslateButton
            variant="icon"
            sources={translateSources}
            disabled={saving}
            onTranslated={(target, values) => {
              const [titleVal, subtitleVal, bodyVal, ...itemVals] = values;
              onChange((prev) => ({
                ...prev,
                title: setLocalized(
                  prev.title,
                  target,
                  titleVal ?? readLocalized(prev.title, target)
                ),
                description: setLocalized(
                  prev.description,
                  target,
                  subtitleVal ?? readLocalized(prev.description, target)
                ),
                body: setLocalized(
                  prev.body,
                  target,
                  bodyVal ?? readLocalized(prev.body, target)
                ),
                items: prev.items.map((item, index) =>
                  setLocalized(
                    item,
                    target,
                    itemVals[index] ?? readLocalized(item, target)
                  )
                ),
              }));
            }}
          />
        </>
      }
    >
      <AdminServiceDetailEditor
        service={service}
        editLocale={editLocale}
        onChange={onChange}
      />
    </AdminShell>
  );
}
