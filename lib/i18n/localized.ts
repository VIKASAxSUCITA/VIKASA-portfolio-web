import type { Locale, LocalizedString } from "@/lib/i18n/locale";
import { emptyLocalized, t } from "@/lib/i18n/locale";

/** Normalize Firestore/legacy string or object into LocalizedString. */
export function asLocalized(
  value: unknown,
  fallbackEn = ""
): LocalizedString {
  if (typeof value === "string") {
    return { en: value, km: "", zh: "" };
  }
  if (value && typeof value === "object") {
    const obj = value as Partial<LocalizedString>;
    return {
      en: (obj.en ?? fallbackEn).trim() || fallbackEn,
      km: (obj.km ?? "").trim(),
      zh: (obj.zh ?? "").trim(),
    };
  }
  return emptyLocalized(fallbackEn);
}

/** Prefer saved locale strings; fill empty km/zh from defaults when English matches. */
export function mergeLocalized(
  value: unknown,
  fallback: LocalizedString
): LocalizedString {
  const saved = asLocalized(value, fallback.en);
  const enMatches =
    saved.en.trim().toLowerCase() === fallback.en.trim().toLowerCase();
  return {
    en: saved.en || fallback.en,
    km: saved.km || (enMatches ? fallback.km : ""),
    zh: saved.zh || (enMatches ? fallback.zh : ""),
  };
}

export function setLocalized(
  value: LocalizedString,
  locale: Locale,
  next: string
): LocalizedString {
  return { ...value, [locale]: next };
}

export function readLocalized(
  value: LocalizedString | string | undefined,
  locale: Locale
): string {
  return t(value, locale);
}

/** Build LocalizedString from parallel en / km / zh fields (legacy shape). */
export function fromTriple(
  en: string,
  km = "",
  zh = ""
): LocalizedString {
  return { en: en || "", km: km || "", zh: zh || "" };
}
