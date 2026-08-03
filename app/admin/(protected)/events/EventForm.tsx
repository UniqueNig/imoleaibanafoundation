"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import RichTextEditor from "@/app/components/admin/RichTextEditor";
import CoverImageUploader from "@/app/components/admin/CoverImageUploader";
import { saveEvent, type EventActionState } from "./actions";

export type EventFormValues = {
  id?: string;
  title: string;
  excerpt: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  coverImageUrl: string;
  coverImagePublicId: string;
  published: boolean;
};

const inputClass =
  "w-full rounded-xl border border-navy-950/15 bg-white px-3.5 py-2.5 text-sm text-navy-950 outline-none focus:border-royal-500 dark:border-white/15 dark:bg-navy-900 dark:text-white";

export default function EventForm({ event }: { event?: EventFormValues }) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState<EventActionState, FormData>(
    saveEvent,
    undefined
  );

  useEffect(() => {
    if (state?.success) {
      toast.success(event ? "Event updated" : "Event created");
      router.push("/admin/events");
      router.refresh();
    } else if (state?.error) {
      toast.error(state.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <form action={formAction} className="max-w-2xl space-y-6">
      {event?.id && <input type="hidden" name="id" value={event.id} />}

      <Field label="Title">
        <input
          name="title"
          defaultValue={event?.title}
          required
          minLength={3}
          className={inputClass}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Start date">
          <input
            type="date"
            name="startDate"
            defaultValue={event?.startDate}
            required
            className={inputClass}
          />
        </Field>
        <Field label="End date (optional)">
          <input type="date" name="endDate" defaultValue={event?.endDate} className={inputClass} />
        </Field>
      </div>

      <Field label="Location">
        <input name="location" defaultValue={event?.location} className={inputClass} />
      </Field>

      <Field label="Excerpt">
        <textarea
          name="excerpt"
          defaultValue={event?.excerpt}
          rows={2}
          maxLength={300}
          placeholder="Short summary shown on event cards and list pages."
          className={inputClass}
        />
      </Field>

      <CoverImageUploader
        urlFieldName="coverImageUrl"
        publicIdFieldName="coverImagePublicId"
        initialUrl={event?.coverImageUrl}
        initialPublicId={event?.coverImagePublicId}
      />

      <Field label="Description">
        <RichTextEditor name="description" initialContent={event?.description} />
      </Field>

      <label className="flex items-center gap-2 text-sm font-medium text-navy-950 dark:text-white">
        <input
          type="checkbox"
          name="published"
          defaultChecked={event?.published}
          className="h-4 w-4 rounded border-navy-950/30 dark:border-white/30"
        />
        Published
      </label>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-xl bg-navy-950 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-800 disabled:opacity-60 dark:bg-white dark:text-navy-950 dark:hover:bg-white/90"
        >
          {pending ? "Saving…" : event ? "Save changes" : "Create event"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/events")}
          className="rounded-xl px-5 py-2.5 text-sm font-medium text-navy-700 hover:bg-navy-950/5 dark:text-white/70 dark:hover:bg-white/10"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-navy-950 dark:text-white">{label}</label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}
