"use client";

import { useEffect } from "react";

/** Smooth-scroll to #hash when landing on or returning to the home page. */
export default function HomeHashScroll() {
  useEffect(() => {
    function scrollToHash() {
      const hash = window.location.hash;
      if (!hash) return;
      const el = document.getElementById(hash.slice(1));
      if (!el) return;
      // Wait a tick for layout / sticky header height
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);

  return null;
}
