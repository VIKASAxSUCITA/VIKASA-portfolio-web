"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type SearchHit = {
  type: "insight" | "event";
  id: string;
  title: string;
  href: string;
};

type SearchIndex = {
  insights: Array<{ id: string; title: string; label?: string }>;
  events: Array<{ id: string; title: string; label?: string }>;
};

export default function SiteSearch() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState<SearchIndex>({ insights: [], events: [] });
  const [indexLoaded, setIndexLoaded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  // Load search data only when the panel opens (skip on every page load).
  useEffect(() => {
    if (!open || indexLoaded) return;
    let active = true;
    (async () => {
      try {
        const res = await fetch("/api/search-index");
        if (!res.ok) return;
        const data = (await res.json()) as SearchIndex;
        if (active) {
          setIndex(data);
          setIndexLoaded(true);
        }
      } catch {
        // ignore
      }
    })();
    return () => {
      active = false;
    };
  }, [open, indexLoaded]);

  const hits = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [] as SearchHit[];

    const insightHits: SearchHit[] = index.insights
      .filter((item) => item.title.toLowerCase().includes(q))
      .slice(0, 6)
      .map((item) => ({
        type: "insight" as const,
        id: item.id,
        title: item.label || item.title,
        href: `/insights/${item.id}`,
      }));

    const eventHits: SearchHit[] = index.events
      .filter((item) => item.title.toLowerCase().includes(q))
      .slice(0, 6)
      .map((item) => ({
        type: "event" as const,
        id: item.id,
        title: item.label || item.title,
        href: `/events/${item.id}`,
      }));

    return [...insightHits, ...eventHits].slice(0, 8);
  }, [query, index]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("mousedown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", onPointerDown);
    };
  }, []);

  function go(href: string) {
    setOpen(false);
    setQuery("");
    router.push(href);
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (hits[0]) go(hits[0].href);
  }

  return (
    <div className="site-search" ref={rootRef}>
      <button
        type="button"
        className="site-search-toggle"
        aria-label="Search insights and events"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        <svg width={18} height={18} viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <path
            d="M20 20l-3.5-3.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {open ? (
        <div className="site-search-panel" role="dialog" aria-label="Search">
          <form onSubmit={onSubmit}>
            <input
              ref={inputRef}
              className="site-search-input"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search insights & events…"
              aria-label="Search by insight or event title"
            />
          </form>
          {query.trim().length >= 2 ? (
            <ul className="site-search-results list-unstyled">
              {hits.length === 0 ? (
                <li className="site-search-empty">No matches found.</li>
              ) : (
                hits.map((hit) => (
                  <li key={`${hit.type}-${hit.id}`}>
                    <button
                      type="button"
                      className="site-search-hit"
                      onClick={() => go(hit.href)}
                    >
                      <span className="site-search-hit-type">{hit.type}</span>
                      <span className="site-search-hit-title">{hit.title}</span>
                    </button>
                  </li>
                ))
              )}
            </ul>
          ) : (
            <p className="site-search-hint">Type at least 2 characters.</p>
          )}
        </div>
      ) : null}
    </div>
  );
}
