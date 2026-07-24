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
  featureImage?: string;
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
  if (input.featureImage?.trim()) {
    chunks.push(`<img src="${escapeHtml(input.featureImage.trim())}" alt="">`);
  }

  return chunks.join("") || "<p></p>";
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
