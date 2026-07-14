type InsightCardLinkProps = {
  href: string;
  title: string;
  image: string;
  index: number;
};

function ArrowIcon() {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
    >
      <path
        d="M7.5 4.5L13 10L7.5 15.5"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Pathfinder-style insight tile: cover image, title, arrow; hover shows index. */
export default function InsightCardLink({
  href,
  title,
  image,
  index,
}: InsightCardLinkProps) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <a href={href} className="insight-tile" aria-label={title}>
      <span
        className="insight-tile-media"
        style={{ backgroundImage: `url(${image})` }}
      />
      <span className="insight-tile-overlay" aria-hidden />
      <span className="insight-tile-index" aria-hidden>
        {number}.
      </span>
      <span className="insight-tile-footer">
        <span className="insight-tile-title heading">{title}</span>
        <span className="insight-tile-arrow" aria-hidden>
          <ArrowIcon />
        </span>
      </span>
    </a>
  );
}
