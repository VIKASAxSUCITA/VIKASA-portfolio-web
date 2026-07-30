import type { Locale } from "@/lib/i18n/locale";
import { asLocalized } from "@/lib/i18n/localized";
import { defaultEventsContent } from "./defaults";
import type { EventPost, EventsContent } from "./types";

export function createEmptyEvent(): EventPost {
  const stamp = Date.now().toString(36);
  const startsAt = new Date();
  startsAt.setMinutes(0, 0, 0);

  return {
    id: `new_event_${stamp}`,
    title: "New Event",
    titleKm: "",
    titleZh: "",
    coverImage: "/assets/img/blog/1.jpg",
    image: "/assets/img/blog/2.jpg",
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
    body: post.body?.trim() || "",
    bodyKm: post.bodyKm?.trim() || "",
    bodyZh: post.bodyZh?.trim() || "",
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
  const posts = saved.posts?.map((post, index) =>
    normalizeEventPost({
      ...post,
      id: post.id || `event_${index + 1}`,
    })
  );

  return {
    heroTitle: asLocalized(saved.heroTitle, defaultEventsContent.heroTitle.en),
    heading: asLocalized(saved.heading, defaultEventsContent.heading.en),
    posts: posts ?? [],
  };
}

/** Soonest upcoming first; past events after, newest past first. */
export function sortEventsBySchedule(posts: EventPost[]): EventPost[] {
  const now = Date.now();
  return [...posts].sort((a, b) => {
    const aTime = new Date(a.startsAt).getTime();
    const bTime = new Date(b.startsAt).getTime();
    const aUpcoming = aTime >= now;
    const bUpcoming = bTime >= now;

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

export function formatEventDateTime(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime()) || date.getFullYear() < 1971) {
    return "";
  }
  return date.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function formatEventDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime()) || date.getFullYear() < 1971) {
    return "";
  }
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/** Compact badge date like "Jan 10, 2025". */
export function formatEventBadgeDate(iso: string): string {
  const parts = formatEventBadgeParts(iso);
  if (!parts) return "";
  return `${parts.month} ${parts.day}, ${parts.year}`;
}

/** Split badge parts so month can sit above day/year. */
export function formatEventBadgeParts(
  iso: string
): { month: string; day: string; year: string } | null {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime()) || date.getFullYear() < 1971) {
    return null;
  }
  return {
    month: date.toLocaleDateString("en-US", { month: "short" }),
    day: String(date.getDate()),
    year: String(date.getFullYear()),
  };
}

export function formatEventTime(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime()) || date.getFullYear() < 1971) {
    return "";
  }
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

export function formatEventTimeRange(startsAt: string, endsAt?: string): string {
  const start = formatEventTime(startsAt);
  if (!start) return "";
  const end = endsAt ? formatEventTime(endsAt) : "";
  return end ? `${start} – ${end}` : start;
}

export function eventKindLabel(kind: string): string {
  return normalizeEventKind(kind);
}

export function eventExcerpt(
  post: EventPost,
  max = 160,
  locale: Locale = "en"
): string {
  const text = (eventText(post, "summary", locale) || eventText(post, "body", locale))
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
