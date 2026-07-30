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
};

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
