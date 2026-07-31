"use client";

import { useState, type ReactNode } from "react";
import AutoTranslateButton from "@/app/components/i18n/AutoTranslateButton";
import LocaleEditTabs from "@/app/components/i18n/LocaleEditTabs";
import { useLocale } from "@/app/components/i18n/LocaleProvider";
import type { Locale, LocalizedString } from "@/lib/i18n/locale";
import { asLocalized, readLocalized } from "@/lib/i18n/localized";

type LocalizedSectionProps = {
  /** When set, shows language tabs + auto-translate for admin. */
  edit?: boolean;
  /** English source strings used by auto-translate. */
  translateSources?: string[];
  /**
   * Apply translated values back. `values` matches `translateSources` order.
   * Called once for km and once for zh.
   */
  onAutoTranslated?: (locale: Locale, values: string[]) => void;
  children: (locale: Locale) => ReactNode;
};

/** Provides the active locale for a section (site locale, or edit-locale in admin). */
export default function LocalizedSection({
  edit = false,
  translateSources,
  onAutoTranslated,
  children,
}: LocalizedSectionProps) {
  const { locale: siteLocale } = useLocale();
  const [editLocale, setEditLocale] = useState<Locale>("en");
  const locale = edit ? editLocale : siteLocale;

  return (
    <>
      {edit ? (
        <div className="locale-edit-bar">
          <LocaleEditTabs locale={editLocale} onChange={setEditLocale} />
          {translateSources && onAutoTranslated ? (
            <AutoTranslateButton
              sources={translateSources}
              onTranslated={onAutoTranslated}
            />
          ) : null}
        </div>
      ) : null}
      {children(locale)}
    </>
  );
}

export function localizedList(
  items: Array<LocalizedString | string>,
  locale: Locale
): string[] {
  return items.map((item) => readLocalized(asLocalized(item), locale));
}
