import type { Locale } from "@/lib/i18n/locale";
import { mergeLocalized } from "@/lib/i18n/localized";
import { localeToBcp47, ui, uiT } from "@/lib/i18n/ui";
import { defaultEventsContent } from "./defaults";
import type { EventPost, EventsContent } from "./types";

export function createEmptyEvent(): EventPost {
  const stamp = Date.now().toString(36);
  const startsAt = new Date();
  startsAt.setMinutes(0, 0, 0);

  return {
    id: `new_event_${stamp}`,
    title: "",
    titleKm: "",
    titleZh: "",
    coverImage: "",
    image: "",
    kind: "Event",
    startsAt: startsAt.toISOString(),
    endsAt: "",
    location: "",
    summary: "",
    summaryKm: "",
    summaryZh: "",
    body: "",
    bodyKm: "",
    bodyZh: "",
    createdAt: new Date().toISOString(),
  };
}

export function normalizeEventKind(value: unknown): string {
  if (typeof value !== "string") return "Event";
  const trimmed = value.trim();
  if (!trimmed) return "Event";

  const key = trimmed.toLowerCase();
  if (key === "event") return "Event";
  if (key === "announcement") return "Announcement";
  return trimmed;
}

export function normalizeEventPost(
  post: Partial<EventPost> & { id: string }
): EventPost {
  const fallbackImage = post.image || "/assets/img/blog/1.jpg";
  const bodyRaw = post.body?.trim() || "";
  const bodyKmRaw = post.bodyKm?.trim() || "";
  const bodyZhRaw = post.bodyZh?.trim() || "";

  // TipTap stores HTML; migrate legacy plain text on read.
  const toHtml = (value: string) => {
    if (!value) return "";
    if (/<[a-z][\s\S]*>/i.test(value)) return value;
    return value
      .split(/\n\s*\n/)
      .map((part) => part.trim())
      .filter(Boolean)
      .map(
        (part) =>
          `<p>${part
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/\n/g, "<br />")}</p>`
      )
      .join("");
  };

  return {
    id: post.id,
    title: post.title?.trim() || "New Event",
    titleKm: post.titleKm?.trim() || "",
    titleZh: post.titleZh?.trim() || "",
    coverImage: post.coverImage || fallbackImage,
    image: fallbackImage,
    kind: normalizeEventKind(post.kind),
    startsAt: post.startsAt || new Date().toISOString(),
    endsAt: post.endsAt?.trim() || "",
    location: post.location?.trim() || "",
    summary: post.summary?.trim() || "",
    summaryKm: post.summaryKm?.trim() || "",
    summaryZh: post.summaryZh?.trim() || "",
    body: toHtml(bodyRaw),
    bodyKm: toHtml(bodyKmRaw),
    bodyZh: toHtml(bodyZhRaw),
    createdAt: post.createdAt || "1970-01-01T00:00:00.000Z",
  };
}

/** Localized event field with English fallback. */
export function eventText(
  post: EventPost,
  field: "title" | "summary" | "body",
  locale: Locale
): string {
  if (locale === "km") {
    const value = field === "title" ? post.titleKm : field === "summary" ? post.summaryKm : post.bodyKm;
    if (value.trim()) return value;
  }
  if (locale === "zh") {
    const value = field === "title" ? post.titleZh : field === "summary" ? post.summaryZh : post.bodyZh;
    if (value.trim()) return value;
  }
  return post[field] || "";
}

export function mergeEventsContent(
  saved: Partial<EventsContent>
): EventsContent {
  const posts = saved.posts?.map((post, index) => {
    const normalized = normalizeEventPost({
      ...post,
      id: post.id || `event_${index + 1}`,
    });
    const fallback = defaultEventsContent.posts.find(
      (item) => item.id === normalized.id
    );
    if (!fallback) return normalized;

    const titleMatches =
      normalized.title.trim().toLowerCase() ===
      fallback.title.trim().toLowerCase();
    const summaryMatches =
      normalized.summary.trim().toLowerCase() ===
      fallback.summary.trim().toLowerCase();
    const bodyMatches =
      normalized.body.trim().toLowerCase() ===
      fallback.body.trim().toLowerCase();

    return {
      ...normalized,
      titleKm:
        normalized.titleKm || (titleMatches ? fallback.titleKm : ""),
      titleZh:
        normalized.titleZh || (titleMatches ? fallback.titleZh : ""),
      summaryKm:
        normalized.summaryKm || (summaryMatches ? fallback.summaryKm : ""),
      summaryZh:
        normalized.summaryZh || (summaryMatches ? fallback.summaryZh : ""),
      bodyKm: normalized.bodyKm || (bodyMatches ? fallback.bodyKm : ""),
      bodyZh: normalized.bodyZh || (bodyMatches ? fallback.bodyZh : ""),
    };
  });

  return {
    heroTitle: mergeLocalized(
      saved.heroTitle,
      defaultEventsContent.heroTitle
    ),
    heading: mergeLocalized(saved.heading, defaultEventsContent.heading),
    posts: posts ?? defaultEventsContent.posts,
  };
}

/** Local midnight for calendar-day comparisons. */
function startOfLocalDay(date = new Date()): number {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  ).getTime();
}

function eventStartTime(post: EventPost): number {
  const time = new Date(post.startsAt).getTime();
  return Number.isNaN(time) ? 0 : time;
}

/**
 * Upcoming = starts on/after today (calendar day), or still ongoing (ends after
 * today started). Past = fully before today.
 *
 * Order example (today = day 3):
 *   starts 1, 2, 4, 10, 25  →  4, 10, 25, 2, 1
 * Upcoming soonest-first, then past newest-first.
 */
export function sortEventsBySchedule(posts: EventPost[]): EventPost[] {
  const today = startOfLocalDay();
  return [...posts].sort((a, b) => {
    const aTime = eventStartTime(a);
    const bTime = eventStartTime(b);
    const aEnd = a.endsAt ? new Date(a.endsAt).getTime() : NaN;
    const bEnd = b.endsAt ? new Date(b.endsAt).getTime() : NaN;
    const aUpcoming =
      aTime >= today || (!Number.isNaN(aEnd) && aEnd >= today);
    const bUpcoming =
      bTime >= today || (!Number.isNaN(bEnd) && bEnd >= today);

    if (aUpcoming !== bUpcoming) {
      return aUpcoming ? -1 : 1;
    }
    if (aUpcoming) {
      return aTime - bTime;
    }
    return bTime - aTime;
  });
}

export function getLatestEvents(posts: EventPost[], limit = 3): EventPost[] {
  return sortEventsBySchedule(posts).slice(0, limit);
}

export function findEventById(
  posts: EventPost[],
  id: string
): EventPost | undefined {
  return posts.find((post) => post.id === id);
}

export function formatEventDateTime(iso: string, locale: Locale = "en"): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime()) || date.getFullYear() < 1971) {
    return "";
  }
  return date.toLocaleString(localeToBcp47(locale), {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function formatEventDate(iso: string, locale: Locale = "en"): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime()) || date.getFullYear() < 1971) {
    return "";
  }
  return date.toLocaleDateString(localeToBcp47(locale), {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/** Compact badge date like "Jan 10, 2025". */
export function formatEventBadgeDate(iso: string, locale: Locale = "en"): string {
  const parts = formatEventBadgeParts(iso, locale);
  if (!parts) return "";
  return `${parts.month} ${parts.day}, ${parts.year}`;
}

/** Split badge parts so month can sit above day/year. */
export function formatEventBadgeParts(
  iso: string,
  locale: Locale = "en"
): { month: string; day: string; year: string } | null {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime()) || date.getFullYear() < 1971) {
    return null;
  }
  return {
    month: date.toLocaleDateString(localeToBcp47(locale), { month: "short" }),
    day: String(date.getDate()),
    year: String(date.getFullYear()),
  };
}

export function formatEventTime(iso: string, locale: Locale = "en"): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime()) || date.getFullYear() < 1971) {
    return "";
  }
  return date.toLocaleTimeString(localeToBcp47(locale), {
    hour: "numeric",
    minute: "2-digit",
  });
}

export function formatEventTimeRange(
  startsAt: string,
  endsAt?: string,
  locale: Locale = "en"
): string {
  const start = formatEventTime(startsAt, locale);
  if (!start) return "";
  const end = endsAt ? formatEventTime(endsAt, locale) : "";
  return end ? `${start} – ${end}` : start;
}

export function eventKindLabel(kind: string, locale: Locale = "en"): string {
  const normalized = normalizeEventKind(kind);
  if (normalized === "Announcement") {
    return uiT(ui.events.kindAnnouncement, locale);
  }
  return uiT(ui.events.kindEvent, locale);
}

export function eventExcerpt(
  post: EventPost,
  max = 160,
  locale: Locale = "en"
): string {
  const raw =
    eventText(post, "summary", locale) || eventText(post, "body", locale);
  const text = raw
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= max) return text;
  return `${text.slice(0, max).trim()}…`;
}

/** Convert ISO string to datetime-local input value. */
export function toDateTimeLocalValue(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

/** Convert datetime-local value to ISO string. */
export function fromDateTimeLocalValue(value: string): string {
  if (!value.trim()) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString();
}
