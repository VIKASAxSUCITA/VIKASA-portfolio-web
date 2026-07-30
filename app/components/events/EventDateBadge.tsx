import { formatEventBadgeParts } from "@/lib/content/events";

type EventDateBadgeProps = {
  startsAt: string;
};

/** Month on top, day + year below — classic calendar badge. */
export default function EventDateBadge({ startsAt }: EventDateBadgeProps) {
  const parts = formatEventBadgeParts(startsAt);
  if (!parts) return null;

  return (
    <time className="event-date-badge" dateTime={startsAt}>
      <span className="event-date-badge-month">{parts.month}</span>
      <span className="event-date-badge-day">{parts.day}</span>
      <span className="event-date-badge-year">{parts.year}</span>
    </time>
  );
}
