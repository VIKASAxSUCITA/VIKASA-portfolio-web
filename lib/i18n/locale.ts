/** Supported site locales — English, Khmer, Chinese. */
export type Locale = "en" | "km" | "zh";

export const LOCALES: readonly Locale[] = ["en", "km", "zh"] as const;

export const LOCALE_LABELS: Record<Locale, string> = {
  en: "EN",
  km: "KH",
  zh: "CH",
};

export type LocalizedString = {
  en: string;
  km: string;
  zh: string;
};

export function emptyLocalized(en = ""): LocalizedString {
  return { en, km: "", zh: "" };
}

export function localizedFromEn(en: string): LocalizedString {
  return { en, km: en, zh: en };
}

/** Read a localized field; falls back to English then empty. */
export function t(
  value: LocalizedString | string | undefined,
  locale: Locale
): string {
  if (!value) return "";
  if (typeof value === "string") return value;
  return (value[locale] || value.en || "").trim();
}

export function isLocale(value: string): value is Locale {
  return value === "en" || value === "km" || value === "zh";
}
