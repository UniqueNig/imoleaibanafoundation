import Link from "next/link";
import { Plus } from "lucide-react";
import { connectDB } from "@/lib/db";
import Event from "@/lib/models/Event";
import EventRowActions from "./EventRowActions";

export default async function EventsListPage() {
  await connectDB();
  const events = await Event.find().sort({ startDate: -1 }).lean();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-navy-950 dark:text-white">Events</h1>
          <p className="mt-1.5 text-sm text-navy-700/70 dark:text-white/60">
            {events.length === 0 ? "No events yet." : `${events.length} event${events.length === 1 ? "" : "s"}`}
          </p>
        </div>
        <Link
          href="/admin/events/new"
          className="flex items-center gap-2 rounded-xl bg-navy-950 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-800 dark:bg-white dark:text-navy-950 dark:hover:bg-white/90"
        >
          <Plus size={16} />
          New Event
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-navy-950/10 bg-white dark:border-white/10 dark:bg-navy-900">
        {events.length === 0 ? (
          <p className="p-8 text-center text-sm text-navy-700/60 dark:text-white/50">
            Create your first event to see it here.
          </p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-navy-950/10 text-xs uppercase tracking-wide text-navy-700/50 dark:border-white/10 dark:text-white/40">
              <tr>
                <th className="px-5 py-3 font-medium">Title</th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr
                  key={String(event._id)}
                  className="border-b border-navy-950/5 last:border-0 dark:border-white/5"
                >
                  <td className="px-5 py-3.5 font-medium text-navy-950 dark:text-white">
                    {event.title}
                  </td>
                  <td className="px-5 py-3.5 text-navy-700/70 dark:text-white/60">
                    {new Date(event.startDate).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        event.published
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400"
                          : "bg-navy-950/5 text-navy-700/60 dark:bg-white/10 dark:text-white/50"
                      }`}
                    >
                      {event.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex justify-end">
                      <EventRowActions
                        id={String(event._id)}
                        title={event.title}
                        published={Boolean(event.published)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
