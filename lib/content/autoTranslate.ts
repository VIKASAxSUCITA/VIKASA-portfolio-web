import type { Locale } from "@/lib/i18n/locale";
import type { EventPost, InsightPost } from "@/lib/content/types";

async function translateBatch(
  texts: string[],
  to: Locale
): Promise<string[]> {
  if (texts.length === 0) return [];
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
    throw new Error(data.error || `Translate failed (${res.status})`);
  }
  return data.translations ?? [];
}

/** Fill empty KM/ZH fields from English. Does not overwrite existing translations. */
export async function fillInsightLocales(
  post: InsightPost
): Promise<InsightPost> {
  const needKmTitle = !post.titleKm.trim() && !!post.title.trim();
  const needKmBody = !post.bodyHtmlKm.trim() && !!post.bodyHtml.trim();
  const needZhTitle = !post.titleZh.trim() && !!post.title.trim();
  const needZhBody = !post.bodyHtmlZh.trim() && !!post.bodyHtml.trim();

  let next = { ...post };

  if (needKmTitle || needKmBody) {
    const sources = [
      needKmTitle ? post.title : "",
      needKmBody ? post.bodyHtml : "",
    ];
    const [titleKm, bodyHtmlKm] = await translateBatch(sources, "km");
    if (needKmTitle && titleKm) next = { ...next, titleKm };
    if (needKmBody && bodyHtmlKm) next = { ...next, bodyHtmlKm };
  }

  if (needZhTitle || needZhBody) {
    const sources = [
      needZhTitle ? post.title : "",
      needZhBody ? post.bodyHtml : "",
    ];
    const [titleZh, bodyHtmlZh] = await translateBatch(sources, "zh");
    if (needZhTitle && titleZh) next = { ...next, titleZh };
    if (needZhBody && bodyHtmlZh) next = { ...next, bodyHtmlZh };
  }

  return next;
}

/** Fill empty KM/ZH fields from English for events. */
export async function fillEventLocales(post: EventPost): Promise<EventPost> {
  const needKmTitle = !post.titleKm.trim() && !!post.title.trim();
  const needKmSummary = !post.summaryKm.trim() && !!post.summary.trim();
  const needKmBody = !post.bodyKm.trim() && !!post.body.trim();
  const needZhTitle = !post.titleZh.trim() && !!post.title.trim();
  const needZhSummary = !post.summaryZh.trim() && !!post.summary.trim();
  const needZhBody = !post.bodyZh.trim() && !!post.body.trim();

  let next = { ...post };

  if (needKmTitle || needKmSummary || needKmBody) {
    const sources = [
      needKmTitle ? post.title : "",
      needKmSummary ? post.summary : "",
      needKmBody ? post.body : "",
    ];
    const [titleKm, summaryKm, bodyKm] = await translateBatch(sources, "km");
    if (needKmTitle && titleKm) next = { ...next, titleKm };
    if (needKmSummary && summaryKm) next = { ...next, summaryKm };
    if (needKmBody && bodyKm) next = { ...next, bodyKm };
  }

  if (needZhTitle || needZhSummary || needZhBody) {
    const sources = [
      needZhTitle ? post.title : "",
      needZhSummary ? post.summary : "",
      needZhBody ? post.body : "",
    ];
    const [titleZh, summaryZh, bodyZh] = await translateBatch(sources, "zh");
    if (needZhTitle && titleZh) next = { ...next, titleZh };
    if (needZhSummary && summaryZh) next = { ...next, summaryZh };
    if (needZhBody && bodyZh) next = { ...next, bodyZh };
  }

  return next;
}

export async function fillInsightsContentLocales<
  T extends { posts: InsightPost[] },
>(content: T): Promise<T> {
  const posts: InsightPost[] = [];
  for (const post of content.posts) {
    posts.push(await fillInsightLocales(post));
  }
  return { ...content, posts };
}

export async function fillEventsContentLocales<
  T extends { posts: EventPost[] },
>(content: T): Promise<T> {
  const posts: EventPost[] = [];
  for (const post of content.posts) {
    posts.push(await fillEventLocales(post));
  }
  return { ...content, posts };
}

/** Convert plain text event body to HTML paragraphs when needed. */
export function ensureEventBodyHtml(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) return "";
  if (/<[a-z][\s\S]*>/i.test(trimmed)) return trimmed;
  return trimmed
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => `<p>${escapeHtml(part).replace(/\n/g, "<br />")}</p>`)
    .join("");
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function stripHtml(value: string): string {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
