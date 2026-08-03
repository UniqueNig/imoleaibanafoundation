import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";

export type EventCardData = {
  slug: string;
  title: string;
  excerpt?: string;
  location?: string;
  startDate: string | Date;
  coverImageUrl?: string;
};

export default function EventCard({ event, tone = "light" }: { event: EventCardData; tone?: "light" | "dark" }) {
  const date = new Date(event.startDate);
  const dark = tone === "dark";

  return (
    <Link
      href={`/events/${event.slug}`}
      className={`group flex flex-col overflow-hidden rounded-3xl transition-transform hover:-translate-y-1 ${
        dark ? "glass" : "glass-light"
      }`}
    >
      <div className={`relative h-44 w-full overflow-hidden ${dark ? "bg-white/5" : "bg-navy-950/5 dark:bg-white/5"}`}>
        {event.coverImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={event.coverImageUrl}
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className={`flex h-full items-center justify-center ${dark ? "text-white/25" : "text-navy-950/15 dark:text-white/25"}`}>
            <CalendarDays size={36} />
          </div>
        )}
        <div
          className={`absolute left-3 top-3 rounded-xl px-3 py-1.5 text-xs font-semibold ${
            dark ? "glass-gold text-white" : "bg-navy-950 text-white"
          }`}
        >
          {date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className={`text-base font-semibold ${dark ? "text-white" : "text-navy-950 dark:text-white"}`}>{event.title}</h3>
        {event.location && (
          <p className={`mt-1.5 flex items-center gap-1.5 text-xs ${dark ? "text-white/50" : "text-navy-700/60 dark:text-white/50"}`}>
            <MapPin size={12} />
            {event.location}
          </p>
        )}
        {event.excerpt && (
          <p className={`mt-3 line-clamp-2 text-sm leading-relaxed ${dark ? "text-white/65" : "text-navy-700/75 dark:text-white/65"}`}>
            {event.excerpt}
          </p>
        )}
      </div>
    </Link>
  );
}
