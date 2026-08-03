import { compressImageFile } from "./compressImage";

const pending = new Map<string, File>();
/** Successfully uploaded blob: URLs → permanent URLs (kept until Save fully succeeds). */
const uploadedCache = new Map<string, string>();
/** Vercel Blob URLs replaced in the editor; deleted after a successful Save. */
const pendingDeletes = new Set<string>();

/** Stage a local preview; image is compressed before preview/upload when possible. */
export async function stageImageFile(file: File): Promise<string> {
  const compressed = await compressImageFile(file);
  const url = URL.createObjectURL(compressed);
  pending.set(url, compressed);
  return url;
}

export function discardPendingImage(url: string) {
  if (!url.startsWith("blob:")) return;
  if (pending.has(url)) {
    URL.revokeObjectURL(url);
    pending.delete(url);
  }
  uploadedCache.delete(url);
}

export function isVercelBlobUrl(url: string) {
  try {
    return new URL(url).hostname.endsWith(".blob.vercel-storage.com");
  } catch {
    return false;
  }
}

/**
 * Remember a permanent Blob URL that was replaced in the UI.
 * It is deleted from storage after the next successful Save (if unused).
 */
export function markBlobForDeletion(url: string) {
  if (isVercelBlobUrl(url)) {
    pendingDeletes.add(url);
  }
}

/** Collect permanent Vercel Blob URLs from any content tree. */
export function collectVercelBlobUrls(value: unknown, into = new Set<string>()) {
  if (typeof value === "string") {
    if (isVercelBlobUrl(value)) into.add(value);
    return into;
  }
  if (Array.isArray(value)) {
    for (const item of value) collectVercelBlobUrls(item, into);
    return into;
  }
  if (value && typeof value === "object") {
    for (const child of Object.values(value as Record<string, unknown>)) {
      collectVercelBlobUrls(child, into);
    }
  }
  return into;
}

async function uploadFile(file: File): Promise<string> {
  const body = new FormData();
  body.append("file", file);
  const res = await fetch("/api/admin/upload", {
    method: "POST",
    body,
  });
  if (!res.ok) {
    const data = (await res.json().catch(() => null)) as {
      error?: string;
    } | null;
    throw new Error(data?.error || "Image upload failed");
  }
  const data = (await res.json()) as { url?: string };
  if (!data.url) throw new Error("Image upload returned no URL");
  return data.url;
}

async function resolveBlobUrl(blobUrl: string): Promise<string> {
  const cached = uploadedCache.get(blobUrl);
  if (cached) return cached;

  const file = pending.get(blobUrl);
  if (!file) {
    throw new Error(
      "A new image preview is missing. Choose the image again."
    );
  }

  const url = await uploadFile(file);
  uploadedCache.set(blobUrl, url);
  return url;
}

function replaceCachedBlobs(value: unknown): unknown {
  if (typeof value === "string") {
    if (value.startsWith("blob:")) {
      return uploadedCache.get(value) ?? value;
    }
    if (value.includes("blob:") && uploadedCache.size > 0) {
      let next = value;
      for (const [blobUrl, permanent] of uploadedCache) {
        if (next.includes(blobUrl)) {
          next = next.split(blobUrl).join(permanent);
        }
      }
      return next;
    }
    return value;
  }
  if (Array.isArray(value)) {
    return value.map(replaceCachedBlobs);
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, child]) => [
        key,
        replaceCachedBlobs(child),
      ])
    );
  }
  return value;
}

async function walk(value: unknown, used: Set<string>): Promise<unknown> {
  if (typeof value === "string") {
    if (value.startsWith("blob:")) {
      used.add(value);
      return resolveBlobUrl(value);
    }

    // TipTap bodyHtml (and similar) can embed blob: image URLs inside HTML.
    if (value.includes("blob:")) {
      const blobUrls = [
        ...value.matchAll(/\bblob:(?:https?:\/\/[^"'>\s]+|[^"'>\s]+)/g),
      ].map((match) => match[0]);
      const unique = [...new Set(blobUrls)];
      let next = value;
      for (const blobUrl of unique) {
        used.add(blobUrl);
        const uploaded = await resolveBlobUrl(blobUrl);
        next = next.split(blobUrl).join(uploaded);
      }
      return next;
    }

    return value;
  }

  if (Array.isArray(value)) {
    // Upload sequentially so concurrent puts never collide on the same key.
    const next: unknown[] = [];
    for (const item of value) {
      next.push(await walk(item, used));
    }
    return next;
  }

  if (value && typeof value === "object") {
    const next: Record<string, unknown> = {};
    for (const [key, child] of Object.entries(
      value as Record<string, unknown>
    )) {
      next[key] = await walk(child, used);
    }
    return next;
  }

  return value;
}

function finalizeUsedBlobs(used: Set<string>) {
  for (const blobUrl of used) {
    discardPendingImage(blobUrl);
  }
}

/**
 * Upload any local blob: previews, return content with permanent URLs.
 * Keeps local previews until the whole tree finishes, so a failed Save can retry.
 */
export async function resolvePendingImages<T>(content: T): Promise<T> {
  const used = new Set<string>();
  try {
    const resolved = (await walk(content, used)) as T;
    finalizeUsedBlobs(used);
    return resolved;
  } catch (error) {
    // Leave pending files + upload cache so the next Save can continue.
    throw error;
  }
}

/**
 * Replace any already-uploaded blob: URLs in content with permanent URLs.
 * Useful after a failed Save so the draft no longer points at lost previews.
 */
export function applyUploadedBlobCache<T>(content: T): T {
  return replaceCachedBlobs(content) as T;
}

function urlsToDelete(previous: unknown, next: unknown): string[] {
  const before = collectVercelBlobUrls(previous);
  const after = collectVercelBlobUrls(next);
  const marked = [...pendingDeletes];
  pendingDeletes.clear();

  const removed = new Set<string>();
  for (const url of before) {
    if (!after.has(url)) removed.add(url);
  }
  for (const url of marked) {
    if (!after.has(url)) removed.add(url);
  }
  return [...removed];
}

/**
 * Delete Vercel Blob files that were removed/replaced.
 * Call this only after content has been saved successfully.
 * Soft-fails: logs and returns instead of blocking the editor.
 */
export async function deleteRemovedBlobs(
  previous: unknown,
  next: unknown
): Promise<void> {
  const removed = urlsToDelete(previous, next);
  if (removed.length === 0) return;

  try {
    const res = await fetch("/api/admin/blob", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ urls: removed }),
    });
    if (!res.ok) {
      const data = (await res.json().catch(() => null)) as {
        error?: string;
      } | null;
      console.error(
        data?.error || "Failed to delete replaced images",
        removed
      );
    }
  } catch (error) {
    console.error("Failed to delete replaced images", error, removed);
  }
}
