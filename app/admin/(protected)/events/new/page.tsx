import EventForm from "../EventForm";

export default function NewEventPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-navy-950 dark:text-white">New Event</h1>
      <p className="mt-1.5 text-sm text-navy-700/70 dark:text-white/60">
        Create an event. Only published events appear on the public site.
      </p>

      <div className="mt-8">
        <EventForm />
      </div>
    </div>
  );
}
