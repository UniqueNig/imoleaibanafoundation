import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarDays, MapPin } from "lucide-react";
import { connectDB } from "@/lib/db";
import Event from "@/lib/models/Event";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  await connectDB();
  const event = await Event.findOne({ slug, published: true }).lean();
  if (!event) return { title: "Event not found" };
  return {
    title: `${event.title} — Imole Aibana Foundation`,
    description: event.excerpt || undefined,
  };
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;

  await connectDB();
  const event = await Event.findOne({ slug, published: true }).lean();
  if (!event) notFound();

  const date = new Date(event.startDate);

  return (
    <article className="bg-background pb-24 pt-32 sm:pt-40">
      <div className="mx-auto max-w-3xl px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-royal-500">Event</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-navy-950 dark:text-white sm:text-4xl">
          {event.title}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-navy-700/70 dark:text-white/60">
          <span className="flex items-center gap-1.5">
            <CalendarDays size={15} />
            {date.toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </span>
          {event.location && (
            <span className="flex items-center gap-1.5">
              <MapPin size={15} />
              {event.location}
            </span>
          )}
        </div>

        {event.coverImage?.url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={event.coverImage.url}
            alt=""
            className="mt-8 h-72 w-full rounded-3xl object-cover sm:h-96"
          />
        )}

        {event.description ? (
          <div
            className="prose dark:prose-invert mt-10 max-w-none prose-a:text-royal-500"
            // Sanitized server-side with isomorphic-dompurify at write time (see admin/events/actions.ts)
            dangerouslySetInnerHTML={{ __html: event.description }}
          />
        ) : (
          event.excerpt && (
            <p className="mt-10 leading-relaxed text-navy-700/80 dark:text-white/70">{event.excerpt}</p>
          )
        )}
      </div>
    </article>
  );
}
