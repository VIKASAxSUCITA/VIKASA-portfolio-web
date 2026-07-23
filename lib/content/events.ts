import type { EventPost, EventsContent } from "./types";

export function createEmptyEvent(): EventPost {
  const stamp = Date.now().toString(36);
  const startsAt = new Date();
  startsAt.setMinutes(0, 0, 0);

  return {
    id: `new_event_${stamp}`,
    title: "New Event",
    coverImage: "/assets/img/blog/1.jpg",
    image: "/assets/img/blog/2.jpg",
    kind: "Event",
    startsAt: startsAt.toISOString(),
    endsAt: "",
    location: "",
    summary: "",
    body: "",
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
    coverImage: post.coverImage || fallbackImage,
    image: fallbackImage,
    kind: normalizeEventKind(post.kind),
    startsAt: post.startsAt || new Date().toISOString(),
    endsAt: post.endsAt?.trim() || "",
    location: post.location?.trim() || "",
    summary: post.summary?.trim() || "",
    body: post.body?.trim() || "",
    createdAt: post.createdAt || "1970-01-01T00:00:00.000Z",
  };
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
    heroTitle: saved.heroTitle ?? "Events",
    heading: saved.heading ?? "Upcoming Events & Announcements",
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

export function eventExcerpt(post: EventPost, max = 160): string {
  const text = (post.summary || post.body).replace(/\s+/g, " ").trim();
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
