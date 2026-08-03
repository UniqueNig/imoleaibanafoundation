import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import Event from "@/lib/models/Event";
import EventForm from "../../EventForm";

function toDateInputValue(date?: Date | null) {
  if (!date) return "";
  return new Date(date).toISOString().slice(0, 10);
}

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  await connectDB();
  const event = await Event.findById(id).lean();
  if (!event) notFound();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-navy-950 dark:text-white">Edit Event</h1>
      <p className="mt-1.5 text-sm text-navy-700/70 dark:text-white/60">{event.title}</p>

      <div className="mt-8">
        <EventForm
          event={{
            id: String(event._id),
            title: event.title,
            excerpt: event.excerpt ?? "",
            description: event.description ?? "",
            startDate: toDateInputValue(event.startDate),
            endDate: toDateInputValue(event.endDate),
            location: event.location ?? "",
            coverImageUrl: event.coverImage?.url ?? "",
            coverImagePublicId: event.coverImage?.publicId ?? "",
            published: event.published ?? false,
          }}
        />
      </div>
    </div>
  );
}
