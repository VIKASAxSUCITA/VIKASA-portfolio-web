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
  alt?: string;
  className?: string;
};

export default function EditableImage({
  src,
  onChange,
  alt = "",
  className = "",
}: EditableImageProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [compressing, setCompressing] = useState(false);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setCompressing(true);
    try {
      // Preview only — upload happens on Save (already compressed).
      // Mark the previous permanent Blob for deletion after Save.
      markBlobForDeletion(src);
      discardPendingImage(src);
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

  return (
    <button
      type="button"
      className={`admin-editable-image ${className}`.trim()}
      onClick={() => inputRef.current?.click()}
      title="Click to change image"
      disabled={compressing}
      aria-busy={compressing}
    >
      <img src={src} alt={alt} />
      <span className="admin-editable-image-hint">
        {compressing ? "Compressing…" : "Change image"}
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
