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
  responseStatus?: number | string;
  responseDetails?: string;
  quotaFinished?: boolean;
};

const CHUNK = 420;
const CHUNK_DELAY_MS = 250;

/** Serialize outbound MyMemory calls so admin clicks don't stampede the free API. */
let translateQueue: Promise<void> = Promise.resolve();

function enqueueTranslate<T>(task: () => Promise<T>): Promise<T> {
  const run = translateQueue.then(task, task);
  translateQueue = run.then(
    () => undefined,
    () => undefined
  );
  return run;
}

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

function limitMessage(detail?: string) {
  const base =
    "Daily free translation limit reached (MyMemory). Try again later";
  const tip =
    "or set MYMEMORY_EMAIL in .env.local for a higher daily quota (50k chars).";
  if (detail?.trim()) return `${detail.trim()} — ${tip}`;
  return `${base}, ${tip}`;
}

async function translateChunk(
  text: string,
  from: Locale,
  to: Locale,
  attempt = 1
): Promise<string> {
  const langMap: Record<Locale, string> = {
    en: "en",
    km: "km",
    zh: "zh-CN",
  };

  const url = new URL("https://api.mymemory.translated.net/get");
  url.searchParams.set("q", text);
  url.searchParams.set("langpair", `${langMap[from]}|${langMap[to]}`);
  const email = process.env.MYMEMORY_EMAIL?.trim();
  if (email) url.searchParams.set("de", email);

  const res = await fetch(url.toString(), {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (res.status === 429) {
    if (attempt < 3) {
      await new Promise((resolve) => setTimeout(resolve, 800 * attempt));
      return translateChunk(text, from, to, attempt + 1);
    }
    throw new Error(limitMessage("Too many translation requests"));
  }

  if (!res.ok) {
    throw new Error(`Translate request failed (${res.status})`);
  }

  const data = (await res.json()) as MyMemoryResponse;
  const translated = data.responseData?.translatedText?.trim();
  const status = Number(data.responseStatus);
  const details = String(data.responseDetails || translated || "");

  if (
    data.quotaFinished ||
    status === 429 ||
    /MYMEMORY WARNING/i.test(details) ||
    /YOU USED ALL AVAILABLE/i.test(details)
  ) {
    throw new Error(limitMessage(details));
  }

  if (!translated) {
    throw new Error("Empty translation response");
  }

  if (/^INVALID\b/i.test(translated)) {
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
    if (i > 0) {
      await new Promise((resolve) => setTimeout(resolve, CHUNK_DELAY_MS));
    }
    out.push(await translateChunk(chunks[i], from, to));
  }
  return out.join(trimmed.includes("</p>") ? "" : "\n\n");
}

/**
 * Admin helper: translate English into KM / ZH.
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
    const translations = await enqueueTranslate(async () => {
      const next: string[] = [];
      for (const text of texts) {
        if (next.length > 0) {
          await new Promise((resolve) => setTimeout(resolve, 180));
        }
        next.push(await translateOne(text, from, to as Locale));
      }
      return next;
    });

    return NextResponse.json({
      from,
      to,
      translations,
      translation: translations[0] ?? "",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Translation failed";
    const limited = /limit|429|MYMEMORY WARNING|TOO MANY/i.test(message);
    return NextResponse.json(
      { error: message },
      { status: limited ? 429 : 502 }
    );
  }
}
