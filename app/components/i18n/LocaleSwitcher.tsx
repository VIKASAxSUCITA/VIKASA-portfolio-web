"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "@/app/components/i18n/LocaleProvider";
import type { Locale } from "@/lib/i18n/locale";

const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  km: "ខ្មែរ",
  zh: "中文",
};

function TranslateIcon() {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M5 8h8M9 8c0 4-2 7-6 9M7.5 11.5c1.2 1.6 3.2 2.8 5.5 3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 16h7M16.5 16l3 5M19.5 16l-3 5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width={12}
      height={12}
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
      className={`locale-dropdown-chevron${open ? " is-open" : ""}`}
    >
      <path
        d="M3 4.5 6 7.5 9 4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function LocaleSwitcher() {
  const { locale, setLocale, locales, labels } = useLocale();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("mousedown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  function choose(code: Locale) {
    setLocale(code);
    setOpen(false);
  }

  return (
    <div className="locale-dropdown" ref={rootRef}>
      <button
        type="button"
        className="locale-dropdown-toggle"
        aria-label="Select language"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="locale-dropdown-icon" aria-hidden>
          <TranslateIcon />
        </span>
        <span className="locale-dropdown-current">{labels[locale]}</span>
        <ChevronIcon open={open} />
      </button>

      {open ? (
        <ul className="locale-dropdown-menu" role="listbox" aria-label="Languages">
          {locales.map((code) => (
            <li key={code} role="option" aria-selected={locale === code}>
              <button
                type="button"
                className={`locale-dropdown-option${
                  locale === code ? " is-active" : ""
                }`}
                onClick={() => choose(code)}
              >
                <span className="locale-dropdown-option-code">{labels[code]}</span>
                <span className="locale-dropdown-option-name">
                  {LOCALE_NAMES[code]}
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
