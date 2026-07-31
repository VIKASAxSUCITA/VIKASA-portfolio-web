"use client";

import { EditableMedia } from "@/app/components/admin/EditableField";

type WhatWeDoMediaProps = {
  src: string;
  alt?: string;
  aos?: string;
  edit?: { onChange: (image: string) => void };
};

export default function WhatWeDoMedia({
  src,
  alt = "What we do",
  aos = "fade-right",
  edit,
}: WhatWeDoMediaProps) {
  const imageEdit = edit
    ? { onChange: edit.onChange }
    : undefined;

  return (
    <div className="media-wrap vikasa-media-blob" data-aos={aos}>
      <span className="vikasa-media-blob-back" aria-hidden />
      <span className="vikasa-media-blob-outline" aria-hidden />
      <span
        className="vikasa-media-blob-dot vikasa-media-blob-dot--top"
        aria-hidden
      />
      <span
        className="vikasa-media-blob-dot vikasa-media-blob-dot--bottom"
        aria-hidden
      />
      <div className="vikasa-media-blob-photo">
        <EditableMedia
          src={src}
          width={360}
          height={450}
          loading="lazy"
          alt={alt}
          className="home-about-image"
          edit={imageEdit}
        />
      </div>
    </div>
  );
}
