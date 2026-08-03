"use client";

import { useState } from "react";
import type { Locale } from "@/lib/i18n/locale";

type AutoTranslateButtonProps = {
  /** English source strings to translate. */
  sources: string[];
  /** Fill KM and ZH from English. */
  onTranslated: (locale: Locale, values: string[]) => void;
  disabled?: boolean;
  label?: string;
  /** Compact icon control for admin top bars. */
  variant?: "button" | "icon";
};

function TranslateIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 8h8M9 8c0 5-2 8-6 10M12 8c.8 2.5 2.7 4.6 5.5 5.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 18h7M15.5 14l3.5 8M19.5 14 16 22"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

async function translateBatch(texts: string[], to: Locale): Promise<string[]> {
  const res = await fetch("/api/admin/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ texts, from: "en", to }),
  });
  const data = (await res.json()) as {
    translations?: string[];
    error?: string;
  };
  if (!res.ok) {
    throw new Error(data.error || "Translation failed");
  }
  return data.translations ?? [];
}

/** One-click EN → KM + ZH for admin editors. */
export default function AutoTranslateButton({
  sources,
  onTranslated,
  disabled = false,
  label = "Auto-translate KM + ZH",
  variant = "button",
}: AutoTranslateButtonProps) {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function run() {
    const cleaned = sources.map((item) => item.trim());
    if (cleaned.every((item) => !item)) {
      setMessage("Add English text first.");
      return;
    }

    setBusy(true);
    setMessage(null);
    try {
      const [km, zh] = await Promise.all([
        translateBatch(cleaned, "km"),
        translateBatch(cleaned, "zh"),
      ]);
      onTranslated("km", km);
      onTranslated("zh", zh);
      setMessage("Khmer and Chinese filled. Review before saving.");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Translation failed"
      );
    } finally {
      setBusy(false);
    }
  }

  if (variant === "icon") {
    return (
      <div className="auto-translate auto-translate--icon">
        <button
          type="button"
          className="auto-translate-icon-btn"
          onClick={run}
          disabled={disabled || busy}
          aria-label={busy ? "Translating…" : label}
          title={message || label}
        >
          <TranslateIcon />
        </button>
        {message ? (
          <span className="auto-translate-msg is-inline" role="status">
            {message}
          </span>
        ) : null}
      </div>
    );
  }

  return (
    <div className="auto-translate">
      <button
        type="button"
        className="button button--slim auto-translate-btn"
        onClick={run}
        disabled={disabled || busy}
      >
        {busy ? "Translating…" : label}
      </button>
      {message ? (
        <p className="text text-14 auto-translate-msg">{message}</p>
      ) : null}
    </div>
  );
}
