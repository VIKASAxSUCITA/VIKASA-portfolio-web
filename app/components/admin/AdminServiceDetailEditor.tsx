"use client";

import { useMemo, useState } from "react";
import AutoTranslateButton from "@/app/components/i18n/AutoTranslateButton";
import LocaleEditTabs from "@/app/components/i18n/LocaleEditTabs";
import ServiceDetailView from "@/app/components/services/ServiceDetailView";
import type { ServiceDetail } from "@/lib/content/services";
import type { Locale } from "@/lib/i18n/locale";
import { readLocalized, setLocalized } from "@/lib/i18n/localized";

type Props = {
  service: ServiceDetail;
  allServices: ServiceDetail[];
  onBack: () => void;
  onChange: (updater: (service: ServiceDetail) => ServiceDetail) => void;
  saving?: boolean;
};

export default function AdminServiceDetailEditor({
  service,
  allServices,
  onBack,
  onChange,
  saving = false,
}: Props) {
  const [editLocale, setEditLocale] = useState<Locale>("en");

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
    <div className="admin-detail-editor">
      <div className="admin-detail-toolbar">
        <button
          type="button"
          className="button button--slim admin-detail-back"
          onClick={onBack}
          disabled={saving}
        >
          ← Back to Services
        </button>
        <div className="admin-detail-toolbar-locale">
          <LocaleEditTabs locale={editLocale} onChange={setEditLocale} />
          <AutoTranslateButton
            sources={translateSources}
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
        </div>
        <p className="text text-14 admin-detail-toolbar-hint">
          Click any text or the hero image to edit. Save in the top bar to
          publish.
        </p>
      </div>

      <ServiceDetailView
        service={service}
        allServices={allServices}
        edit={{ onChange }}
        editLocale={editLocale}
      />
    </div>
  );
}
