"use client";

import { useRef, useState } from "react";
import {
  discardPendingImage,
  markBlobForDeletion,
  stageImageFile,
} from "@/lib/content/pendingImages";

type EditableImageProps = {
  src: string;
  onChange: (src: string) => void;
  onRemove?: () => void;
  alt?: string;
  className?: string;
  /** Template-style Change / Remove chips on hover. */
  variant?: "default" | "article";
  imageName?: string;
};

export default function EditableImage({
  src,
  onChange,
  onRemove,
  alt = "",
  className = "",
  variant = "default",
  imageName,
}: EditableImageProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [compressing, setCompressing] = useState(false);
  const hasImage = Boolean(src?.trim());

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setCompressing(true);
    try {
      if (hasImage) {
        markBlobForDeletion(src);
        discardPendingImage(src);
      }
      onChange(await stageImageFile(file));
    } catch (error) {
      console.error(error);
      window.alert(
        error instanceof Error
          ? error.message
          : "Could not process that image. Try another file."
      );
    } finally {
      setCompressing(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  if (variant === "article") {
    return (
      <div
        className={`admin-article-image${hasImage ? "" : " is-empty"} ${className}`.trim()}
      >
        {hasImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt="" />
        ) : (
          <div className="admin-article-image-placeholder" aria-hidden />
        )}
        <div className="admin-article-image-actions">
          <span className="admin-article-image-chip">
            {imageName || (hasImage ? "Cover" : "No image")}
          </span>
          <button
            type="button"
            className="admin-article-image-chip"
            onClick={() => inputRef.current?.click()}
            disabled={compressing}
          >
            {compressing ? "…" : hasImage ? "Change" : "Upload"}
          </button>
          {onRemove && hasImage ? (
            <button
              type="button"
              className="admin-article-image-chip is-danger"
              onClick={onRemove}
              disabled={compressing}
            >
              Remove
            </button>
          ) : null}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(event) => void handleFile(event.target.files?.[0])}
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      className={`admin-editable-image ${className}`.trim()}
      onClick={() => inputRef.current?.click()}
      title="Click to change image"
      disabled={compressing}
      aria-busy={compressing}
    >
      {hasImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} />
      ) : (
        <span className="admin-editable-image-empty" aria-hidden />
      )}
      <span className="admin-editable-image-hint">
        {compressing ? "Compressing…" : hasImage ? "Change image" : "Upload image"}
      </span>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(event) => void handleFile(event.target.files?.[0])}
      />
    </button>
  );
}
