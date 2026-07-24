import { compressImageFile } from "./compressImage";

const pending = new Map<string, File>();
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

async function walk(value: unknown): Promise<unknown> {
  if (typeof value === "string" && value.startsWith("blob:")) {
    const file = pending.get(value);
    if (!file) {
      throw new Error(
        "A new image preview is missing. Choose the image again."
      );
    }
    const url = await uploadFile(file);
    discardPendingImage(value);
    return url;
  }

  if (Array.isArray(value)) {
    return Promise.all(value.map(walk));
  }

  if (value && typeof value === "object") {
    const entries = await Promise.all(
      Object.entries(value as Record<string, unknown>).map(
        async ([key, child]) => [key, await walk(child)] as const
      )
    );
    return Object.fromEntries(entries);
  }

  return value;
}

/** Upload any local blob: previews, return content with permanent URLs. */
export async function resolvePendingImages<T>(content: T): Promise<T> {
  return (await walk(content)) as T;
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
