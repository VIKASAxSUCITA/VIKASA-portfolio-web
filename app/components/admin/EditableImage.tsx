"use client";

import { useRef } from "react";
import {
  discardPendingImage,
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

  function handleFile(file: File | undefined) {
    if (!file) return;
    // Preview only — upload happens on Save
    discardPendingImage(src);
    onChange(stageImageFile(file));
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <button
      type="button"
      className={`admin-editable-image ${className}`.trim()}
      onClick={() => inputRef.current?.click()}
      title="Click to change image"
    >
      <img src={src} alt={alt} />
      <span className="admin-editable-image-hint">Change image</span>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(event) => handleFile(event.target.files?.[0])}
      />
    </button>
  );
}
