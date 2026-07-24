import {
  defaultInsightPairedImages,
  defaultInsightParagraphs,
} from "./defaults";
import {
  buildInsightBodyHtmlFromLegacy,
  insightBodyPlainText,
} from "./insightHtml";
import type { InsightPost, InsightsContent } from "./types";

export {
  buildInsightBodyHtmlFromLegacy,
  insightBodyPlainText,
} from "./insightHtml";

export function slugifyInsightName(title: string): string {
  return (
    title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "")
      .slice(0, 48) || "insight"
  );
}

/** Document id like `new_insight_lxyz12` under pages/insights/entries. */
export function createEmptyInsight(): InsightPost {
  const stamp = Date.now().toString(36);
  return {
    id: `new_insight_${stamp}`,
    title: "New Insight",
    image: "/assets/img/blog/1.jpg",
    category: "Insight",
    author: "VIKASA",
    quote: "",
    sectionTitle: "",
    paragraphs: ["", "", "", ""] as InsightPost["paragraphs"],
    pairedImages: [...defaultInsightPairedImages] as InsightPost["pairedImages"],
    bodyHtml: "<p></p>",
    createdAt: new Date().toISOString(),
  };
}

export function normalizeInsightPost(
  post: Partial<InsightPost> & { id: string; title?: string; image?: string }
): InsightPost {
  const paragraphs = Array.isArray(post.paragraphs)
    ? ([0, 1, 2, 3].map(
        (i) => post.paragraphs?.[i] ?? defaultInsightParagraphs[i]
      ) as InsightPost["paragraphs"])
    : ([...defaultInsightParagraphs] as InsightPost["paragraphs"]);

  const pairedImages = Array.isArray(post.pairedImages)
    ? ([0, 1].map(
        (i) => post.pairedImages?.[i] ?? defaultInsightPairedImages[i]
      ) as InsightPost["pairedImages"])
    : ([...defaultInsightPairedImages] as InsightPost["pairedImages"]);

  const quote = post.quote ?? "";
  const sectionTitle = post.sectionTitle ?? "";
  const image = post.image ?? "/assets/img/blog/1.jpg";

  const bodyHtml =
    typeof post.bodyHtml === "string" && post.bodyHtml.trim()
      ? post.bodyHtml
      : buildInsightBodyHtmlFromLegacy({
          paragraphs,
          pairedImages,
          sectionTitle,
          quote,
          featureImage: image,
        });

  return {
    id: post.id,
    title: post.title ?? "New Insight",
    image,
    category: post.category?.trim() || "Insight",
    author: post.author?.trim() || "VIKASA",
    quote,
    sectionTitle,
    paragraphs,
    pairedImages,
    bodyHtml,
    createdAt: post.createdAt ?? "1970-01-01T00:00:00.000Z",
  };
}

export function mergeInsightsContent(
  saved: Partial<InsightsContent>
): InsightsContent {
  const defaultsPosts = saved.posts?.map((post, index) =>
    normalizeInsightPost({
      ...post,
      id: post.id || String(index + 1),
    })
  );

  return {
    heroTitle: saved.heroTitle ?? "Insights",
    heading: saved.heading ?? "Latest Insights From Us",
    posts: defaultsPosts ?? [],
  };
}

/** Newest first. */
export function sortInsightsByLatest(posts: InsightPost[]): InsightPost[] {
  return [...posts].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getLatestInsights(
  posts: InsightPost[],
  count = 3
): InsightPost[] {
  return sortInsightsByLatest(posts).slice(0, count);
}

export function findInsightById(
  posts: InsightPost[],
  id: string
): InsightPost | undefined {
  return posts.find((post) => post.id === id);
}

export function formatInsightDate(iso: string): string {
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

export function insightExcerpt(post: InsightPost, max = 140): string {
  const text =
    insightBodyPlainText(post.bodyHtml) || post.paragraphs[0]?.trim() || "";
  if (text.length <= max) return text;
  return `${text.slice(0, max).trim()}…`;
}
