import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { connectDB } from "@/lib/db";
import Event from "@/lib/models/Event";
import EventCard from "@/app/components/EventCard";
import { startOfToday } from "@/lib/dates";

export default async function UpcomingEvents() {
  await connectDB();
  const events = await Event.find({ published: true, startDate: { $gte: startOfToday() } })
    .sort({ startDate: 1 })
    .limit(3)
    .lean();

  return (
    <section id="events" className="relative overflow-hidden bg-background py-24 sm:py-32">
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:items-end">
          <div className="text-center sm:text-left">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-royal-500">
              Get Involved
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-navy-950 dark:text-white sm:text-4xl">
              Upcoming Events
            </h2>
          </div>
          <Link
            href="/events"
            className="flex items-center gap-1.5 text-sm font-semibold text-royal-500 hover:text-royal-600"
          >
            View all events
            <ArrowRight size={15} />
          </Link>
        </div>

        {events.length === 0 ? (
          <div className="mesh-hero relative mt-12 overflow-hidden rounded-3xl px-8 py-16 text-center sm:py-20">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gold-400/25 blur-[90px]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-royal-400/25 blur-[90px]"
            />

            <div className="relative mx-auto flex max-w-md flex-col items-center gap-4">
              <div className="glass-gold flex h-14 w-14 items-center justify-center rounded-2xl">
                <CalendarDays size={26} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Nothing on the calendar just yet</h3>
              <p className="text-sm leading-relaxed text-white/65">
                We're planning our next outreach. Check back soon, or see what we've already done in
                the communities we serve.
              </p>
              <Link
                href="/events"
                className="glass-gold mt-2 inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
              >
                Browse past events
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard
                key={String(event._id)}
                event={{
                  slug: event.slug,
                  title: event.title,
                  excerpt: event.excerpt,
                  location: event.location,
                  startDate: event.startDate,
                  coverImageUrl: event.coverImage?.url,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
