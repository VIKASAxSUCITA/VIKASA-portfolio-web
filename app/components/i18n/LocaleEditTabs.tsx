"use client";

import type { Locale } from "@/lib/i18n/locale";
import { LOCALE_LABELS, LOCALES } from "@/lib/i18n/locale";

type LocaleEditTabsProps = {
  locale: Locale;
  onChange: (locale: Locale) => void;
  label?: string;
};

/** Admin helper: switch which language is being edited. */
export default function LocaleEditTabs({
  locale,
  onChange,
  label = "Edit language",
}: LocaleEditTabsProps) {
  return (
    <div className="locale-edit-tabs" role="tablist" aria-label={label}>
      {LOCALES.map((code) => (
        <button
          key={code}
          type="button"
          role="tab"
          aria-selected={locale === code}
          className={`locale-edit-tab${locale === code ? " is-active" : ""}`}
          onClick={() => onChange(code)}
        >
          {LOCALE_LABELS[code]}
        </button>
      ))}
    </div>
  );
}
