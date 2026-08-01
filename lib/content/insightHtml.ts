/** Shared HTML helpers for insight article bodies (Tiptap). */

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Build Tiptap-compatible HTML from the older fixed article layout. */
export function buildInsightBodyHtmlFromLegacy(input: {
  paragraphs: string[];
  pairedImages: string[];
  sectionTitle?: string;
  quote?: string;
}): string {
  const [lead = "", second = "", third = "", fourth = ""] = input.paragraphs;
  const chunks: string[] = [];

  if (lead.trim()) {
    chunks.push(`<p>${escapeHtml(lead.trim())}</p>`);
  }
  if (second.trim()) {
    chunks.push(`<p>${escapeHtml(second.trim())}</p>`);
  }

  const paired = input.pairedImages.filter((src) => src.trim());
  for (const src of paired) {
    chunks.push(`<img src="${escapeHtml(src)}" alt="">`);
  }

  if (input.sectionTitle?.trim()) {
    chunks.push(`<h2>${escapeHtml(input.sectionTitle.trim())}</h2>`);
  }
  if (third.trim()) {
    chunks.push(`<p>${escapeHtml(third.trim())}</p>`);
  }
  if (input.quote?.trim()) {
    chunks.push(
      `<blockquote><p>${escapeHtml(input.quote.trim())}</p></blockquote>`
    );
  }
  if (fourth.trim()) {
    chunks.push(`<p>${escapeHtml(fourth.trim())}</p>`);
  }

  return chunks.join("") || "<p></p>";
}

/**
 * Remove cover/hero image duplicates from body HTML.
 * Older migrations appended the feature image at the end of the article.
 */
export function stripCoverImageFromBodyHtml(
  html: string,
  coverImage: string
): string {
  const cover = coverImage.trim();
  if (!html.trim()) return html;
  if (!cover) return html;

  const escaped = cover.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(
    `<img\\b[^>]*\\bsrc=["']${escaped}["'][^>]*/?>`,
    "gi"
  );
  const cleaned = html.replace(pattern, "").replace(/(<p>\s*<\/p>)+/gi, "");
  const trimmed = cleaned.trim();
  if (!trimmed) return html.trim() ? "<p></p>" : "";
  return trimmed;
}

/** Collect unique image URLs from insight body HTML. */
export function extractBodyImageSrcs(html: string): string[] {
  const srcs: string[] = [];
  const seen = new Set<string>();
  const pattern = /<img\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(html)) !== null) {
    const src = match[1]?.trim();
    if (!src || seen.has(src)) continue;
    seen.add(src);
    srcs.push(src);
  }
  return srcs;
}

/** Remove all images from body HTML, keeping text/structure. */
export function stripImagesFromBodyHtml(html: string): string {
  if (!html.trim()) return html;
  const cleaned = html
    .replace(/<img\b[^>]*>/gi, "")
    .replace(/<figure\b[^>]*>\s*<\/figure>/gi, "")
    .replace(/(<p>\s*<\/p>)+/gi, "");
  const trimmed = cleaned.trim();
  return trimmed || "<p></p>";
}

/** Plain-text excerpt for cards / SEO snippets. */
export function insightBodyPlainText(html: string): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}
