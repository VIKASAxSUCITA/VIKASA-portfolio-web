"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type InsightImageGalleryProps = {
  images: string[];
  altPrefix?: string;
};

function Chevron({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg width={20} height={20} viewBox="0 0 20 20" fill="none" aria-hidden>
      {dir === "prev" ? (
        <path
          d="M12.5 4.5 7 10l5.5 5.5"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M7.5 4.5 13 10l-5.5 5.5"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

function ZoomIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M16.5 16.5 21 21"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M11 8.5v5M8.5 11h5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function InsightImageGallery({
  images,
  altPrefix = "Insight image",
}: InsightImageGalleryProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const count = images.length;

  const scrollToIndex = useCallback((next: number, smooth = true) => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.querySelectorAll<HTMLElement>(".insight-gallery-slide")[
      next
    ];
    if (!slide) return;
    track.scrollTo({
      left: slide.offsetLeft,
      behavior: smooth ? "smooth" : "auto",
    });
    setIndex(next);
  }, []);

  const go = useCallback(
    (delta: number) => {
      if (count < 2) return;
      const next = (index + delta + count) % count;
      if (lightboxOpen) {
        setIndex(next);
        return;
      }
      scrollToIndex(next);
    },
    [count, index, lightboxOpen, scrollToIndex]
  );

  const openLightbox = useCallback((at: number) => {
    setIndex(at);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || count < 2) return;

    let frame = 0;
    function onScroll() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!track) return;
        const slides =
          track.querySelectorAll<HTMLElement>(".insight-gallery-slide");
        if (!slides.length) return;
        let closest = 0;
        let closestDist = Number.POSITIVE_INFINITY;
        const left = track.scrollLeft;
        slides.forEach((slide, i) => {
          const dist = Math.abs(slide.offsetLeft - left);
          if (dist < closestDist) {
            closestDist = dist;
            closest = i;
          }
        });
        setIndex(closest);
      });
    }

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
    };
  }, [count]);

  useEffect(() => {
    if (!lightboxOpen) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") go(-1);
      if (event.key === "ArrowRight") go(1);
    }
    window.addEventListener("keydown", onKey);
    document.body.classList.add("scroll-lock");
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("scroll-lock");
    };
  }, [lightboxOpen, closeLightbox, go]);

  if (count === 0) return null;

  const current = images[index] ?? images[0];

  return (
    <>
      <div className="insight-gallery">
        <div className="insight-gallery-frame">
          <div
            ref={trackRef}
            className="insight-gallery-track"
            tabIndex={0}
            aria-label="Insight images"
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft") {
                event.preventDefault();
                go(-1);
              }
              if (event.key === "ArrowRight") {
                event.preventDefault();
                go(1);
              }
            }}
          >
            {images.map((src, i) => (
              <div key={`${src}-${i}`} className="insight-gallery-slide">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`${altPrefix} ${i + 1}`} loading="lazy" />
              </div>
            ))}
          </div>

          <button
            type="button"
            className="insight-gallery-zoom"
            onClick={() => openLightbox(index)}
            aria-label={`Zoom image ${index + 1}`}
            title="Zoom"
          >
            <ZoomIcon />
          </button>
        </div>

        {count > 1 ? (
          <div className="insight-gallery-controls">
            <button
              type="button"
              className="insight-gallery-nav"
              onClick={() => go(-1)}
              aria-label="Previous image"
            >
              <Chevron dir="prev" />
            </button>
            <div className="insight-gallery-dots" role="tablist">
              {images.map((src, i) => (
                <button
                  key={`${src}-dot-${i}`}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  className={`insight-gallery-dot${i === index ? " is-active" : ""}`}
                  onClick={() => scrollToIndex(i)}
                  aria-label={`Show image ${i + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              className="insight-gallery-nav"
              onClick={() => go(1)}
              aria-label="Next image"
            >
              <Chevron dir="next" />
            </button>
          </div>
        ) : null}

        {count > 1 ? (
          <p className="insight-gallery-count">
            {index + 1} / {count}
          </p>
        ) : null}
      </div>

      {lightboxOpen ? (
        <div
          className="insight-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          onClick={closeLightbox}
        >
          <button
            type="button"
            className="insight-lightbox-close"
            onClick={closeLightbox}
            aria-label="Close"
          >
            ×
          </button>
          {count > 1 ? (
            <button
              type="button"
              className="insight-lightbox-nav insight-lightbox-nav--prev"
              onClick={(event) => {
                event.stopPropagation();
                go(-1);
              }}
              aria-label="Previous image"
            >
              <Chevron dir="prev" />
            </button>
          ) : null}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={current}
            alt={`${altPrefix} ${index + 1}`}
            className="insight-lightbox-image"
            onClick={(event) => event.stopPropagation()}
          />
          {count > 1 ? (
            <button
              type="button"
              className="insight-lightbox-nav insight-lightbox-nav--next"
              onClick={(event) => {
                event.stopPropagation();
                go(1);
              }}
              aria-label="Next image"
            >
              <Chevron dir="next" />
            </button>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
