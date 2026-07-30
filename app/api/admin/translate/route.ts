import { NextResponse } from "next/server";
import type { Locale } from "@/lib/i18n/locale";
import { isLocale } from "@/lib/i18n/locale";

export const runtime = "nodejs";

type TranslateBody = {
  text?: string;
  texts?: string[];
  from?: string;
  to?: string;
};

type MyMemoryResponse = {
  responseData?: { translatedText?: string };
  responseStatus?: number;
};

const CHUNK = 420;

function splitChunks(text: string): string[] {
  const trimmed = text.trim();
  if (!trimmed) return [];
  if (trimmed.length <= CHUNK) return [trimmed];

  // Prefer splitting HTML paragraphs, then blank lines, then hard size.
  const parts = trimmed.includes("</p>")
    ? trimmed.split(/(?<=<\/p>)\s*/i).filter(Boolean)
    : trimmed.split(/\n\s*\n/).filter(Boolean);

  const chunks: string[] = [];
  let buf = "";
  for (const part of parts.length ? parts : [trimmed]) {
    if ((buf + part).length <= CHUNK) {
      buf = buf ? `${buf}${part}` : part;
      continue;
    }
    if (buf) chunks.push(buf);
    if (part.length <= CHUNK) {
      buf = part;
    } else {
      for (let i = 0; i < part.length; i += CHUNK) {
        chunks.push(part.slice(i, i + CHUNK));
      }
      buf = "";
    }
  }
  if (buf) chunks.push(buf);
  return chunks;
}

async function translateChunk(
  text: string,
  from: Locale,
  to: Locale
): Promise<string> {
  const langMap: Record<Locale, string> = {
    en: "en",
    km: "km",
    zh: "zh-CN",
  };

  const url = new URL("https://api.mymemory.translated.net/get");
  url.searchParams.set("q", text);
  url.searchParams.set("langpair", `${langMap[from]}|${langMap[to]}`);

  const res = await fetch(url.toString(), {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Translate request failed (${res.status})`);
  }

  const data = (await res.json()) as MyMemoryResponse;
  const translated = data.responseData?.translatedText?.trim();
  if (!translated) {
    throw new Error("Empty translation response");
  }

  if (/^INVALID\b/i.test(translated) || /MYMEMORY WARNING/i.test(translated)) {
    throw new Error(translated);
  }

  return translated;
}

async function translateOne(
  text: string,
  from: Locale,
  to: Locale
): Promise<string> {
  const trimmed = text.trim();
  if (!trimmed) return "";
  if (from === to) return text;

  const chunks = splitChunks(trimmed);
  const out: string[] = [];
  for (let i = 0; i < chunks.length; i += 1) {
    if (i > 0) await new Promise((resolve) => setTimeout(resolve, 140));
    out.push(await translateChunk(chunks[i], from, to));
  }
  return out.join(trimmed.includes("</p>") ? "" : "\n\n");
}

/**
 * Admin helper: translate English into KM / ZH for Insights + Events.
 * Free MyMemory API — review translations before publishing.
 */
export async function POST(request: Request) {
  let body: TranslateBody;
  try {
    body = (await request.json()) as TranslateBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const from = isLocale(body.from || "") ? (body.from as Locale) : "en";
  const to = body.to || "";
  if (!isLocale(to) || to === from) {
    return NextResponse.json(
      { error: "Provide a valid target locale (km or zh)." },
      { status: 400 }
    );
  }

  const texts = Array.isArray(body.texts)
    ? body.texts.map((item) => String(item ?? ""))
    : body.text != null
      ? [String(body.text)]
      : [];

  if (texts.length === 0) {
    return NextResponse.json(
      { error: "Missing text to translate." },
      { status: 400 }
    );
  }

  if (texts.length > 12) {
    return NextResponse.json(
      { error: "Too many strings (max 12 per request)." },
      { status: 400 }
    );
  }

  try {
    const translations: string[] = [];
    for (const text of texts) {
      if (translations.length > 0) {
        await new Promise((resolve) => setTimeout(resolve, 120));
      }
      translations.push(await translateOne(text, from, to as Locale));
    }

    return NextResponse.json({
      from,
      to,
      translations,
      translation: translations[0] ?? "",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Translation failed";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
