const DEFAULT_MAX_EDGE = 1920;
const DEFAULT_QUALITY = 0.8;
const SKIP_UNDER_BYTES = 200 * 1024;

type CompressOptions = {
  maxEdge?: number;
  quality?: number;
};

function canDecodeAsImage(file: File) {
  if (!file.type.startsWith("image/")) return false;
  // Canvas encoding drops animation / vector fidelity.
  if (file.type === "image/gif" || file.type === "image/svg+xml") {
    return false;
  }
  return true;
}

function loadImageBitmap(file: File): Promise<ImageBitmap> {
  return createImageBitmap(file);
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: string,
  quality: number
): Promise<Blob | null> {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), type, quality);
  });
}

function outputTypeFor(file: File) {
  // Prefer WebP for strong compression; keep JPEG if the source is JPEG-only tooling.
  if (typeof document !== "undefined") {
    const probe = document.createElement("canvas");
    if (probe.toDataURL("image/webp").startsWith("data:image/webp")) {
      return "image/webp" as const;
    }
  }
  if (file.type === "image/png") return "image/png" as const;
  return "image/jpeg" as const;
}

function extensionFor(mime: string) {
  if (mime === "image/webp") return "webp";
  if (mime === "image/png") return "png";
  return "jpg";
}

function renameFile(original: string, mime: string) {
  const base = original.replace(/\.[^.]+$/, "") || "image";
  return `${base}.${extensionFor(mime)}`;
}

/**
 * Resize + compress an image in the browser before upload.
 * Falls back to the original file if compression isn't possible or doesn't help.
 */
export async function compressImageFile(
  file: File,
  options: CompressOptions = {}
): Promise<File> {
  if (typeof window === "undefined") return file;
  if (!canDecodeAsImage(file)) return file;
  if (file.size > 0 && file.size < SKIP_UNDER_BYTES) return file;

  const maxEdge = options.maxEdge ?? DEFAULT_MAX_EDGE;
  const quality = options.quality ?? DEFAULT_QUALITY;

  let bitmap: ImageBitmap;
  try {
    bitmap = await loadImageBitmap(file);
  } catch {
    return file;
  }

  try {
    const scale = Math.min(1, maxEdge / Math.max(bitmap.width, bitmap.height));
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;

    ctx.drawImage(bitmap, 0, 0, width, height);
    const mime = outputTypeFor(file);
    const blob = await canvasToBlob(canvas, mime, quality);
    if (!blob || blob.size === 0) return file;

    // Keep original when compression didn't shrink enough to matter.
    if (blob.size >= file.size * 0.95) return file;

    return new File([blob], renameFile(file.name, mime), {
      type: mime,
      lastModified: Date.now(),
    });
  } finally {
    bitmap.close();
  }
}
