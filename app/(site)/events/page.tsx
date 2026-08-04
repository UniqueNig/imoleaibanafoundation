import type { Metadata } from "next";
import { connectDB } from "@/lib/db";
import Event from "@/lib/models/Event";
import EventCard from "@/app/components/EventCard";
import { startOfToday } from "@/lib/dates";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming and past events from Imole Aibana Foundation.",
  alternates: { canonical: "/events" },
  openGraph: {
    url: "/events",
    title: "Events | Imole Aibana Foundation",
    description: "Upcoming and past events from Imole Aibana Foundation.",
  },
};

export default async function EventsPage() {
  await connectDB();
  const events = await Event.find({ published: true }).sort({ startDate: -1 }).lean();

  const cutoff = startOfToday().getTime();
  const upcoming = events.filter((e) => new Date(e.startDate).getTime() >= cutoff).reverse();
  const past = events.filter((e) => new Date(e.startDate).getTime() < cutoff);

  return (
    <div className="mesh-hero relative overflow-hidden py-28 sm:py-36">
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
            Get Involved
          </span>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Events</h1>
          <p className="mt-4 text-base leading-relaxed text-white/65 sm:text-lg">
            Join us at an upcoming outreach, or look back at what we've done together.
          </p>
        </div>

        <section className="mt-16">
          <h2 className="text-lg font-semibold text-white">Upcoming</h2>
          {upcoming.length === 0 ? (
            <p className="mt-4 text-sm text-white/55">
              No upcoming events right now. Check back soon.
            </p>
          ) : (
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {upcoming.map((event) => (
                <EventCard
                  key={String(event._id)}
                  tone="dark"
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
        </section>

        {past.length > 0 && (
          <section className="mt-16">
            <h2 className="text-lg font-semibold text-white">Past Events</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {past.map((event) => (
                <EventCard
                  key={String(event._id)}
                  tone="dark"
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
          </section>
        )}
      </div>
    </div>
  );
}
