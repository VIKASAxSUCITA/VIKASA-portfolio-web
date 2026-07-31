"use client";

import { formatEventBadgeParts } from "@/lib/content/events";
import { useLocale } from "@/app/components/i18n/LocaleProvider";

type EventDateBadgeProps = {
  startsAt: string;
};

/** Month on top, day + year below — classic calendar badge. */
export default function EventDateBadge({ startsAt }: EventDateBadgeProps) {
  const { locale } = useLocale();
  const parts = formatEventBadgeParts(startsAt, locale);
  if (!parts) return null;

  return (
    <time className="event-date-badge" dateTime={startsAt}>
      <span className="event-date-badge-month">{parts.month}</span>
      <span className="event-date-badge-day">{parts.day}</span>
      <span className="event-date-badge-year">{parts.year}</span>
    </time>
  );
}
