"use client";

import { useActionState, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { HeartHandshake, Users, type LucideIcon } from "lucide-react";
import { submitVolunteerApplication, submitPartnerRequest, type FormActionState } from "./actions";

const inputClass =
  "w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-royal-400";

export default function VolunteerPartnerForms() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") === "partner" ? "partner" : "volunteer";
  const [tab, setTab] = useState<"volunteer" | "partner">(initialTab);

  return (
    <div className="glass rounded-3xl p-8 sm:p-10">
      <div className="mb-8 flex gap-2">
        <TabButton active={tab === "volunteer"} onClick={() => setTab("volunteer")} icon={Users} label="Volunteer" />
        <TabButton
          active={tab === "partner"}
          onClick={() => setTab("partner")}
          icon={HeartHandshake}
          label="Partner"
        />
      </div>

      {tab === "volunteer" ? <VolunteerForm /> : <PartnerForm />}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: LucideIcon;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
        active ? "glass-gold text-white" : "text-white/60 hover:text-white"
      }`}
    >
      <Icon size={16} />
      {label}
    </button>
  );
}

function VolunteerForm() {
  const [state, formAction, pending] = useActionState<FormActionState, FormData>(
    submitVolunteerApplication,
    undefined
  );

  useEffect(() => {
    if (state?.success) toast.success("Thanks for signing up! We'll be in touch soon.");
    else if (state?.error) toast.error(state.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name">
          <input name="name" required className={inputClass} />
        </Field>
        <Field label="Email">
          <input name="email" type="email" required className={inputClass} />
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Phone (optional)">
          <input name="phone" className={inputClass} />
        </Field>
        <Field label="Area of interest">
          <input name="areaOfInterest" placeholder="Education, Medical Outreach..." className={inputClass} />
        </Field>
      </div>
      <Field label="Availability">
        <input name="availability" placeholder="Weekends, weekdays, flexible..." className={inputClass} />
      </Field>
      <Field label="Message (optional)">
        <textarea name="message" rows={3} className={inputClass} />
      </Field>
      <button
        type="submit"
        disabled={pending}
        className="glass-gold w-full rounded-xl px-5 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Submitting…" : "Sign Up to Volunteer"}
      </button>
    </form>
  );
}

function PartnerForm() {
  const [state, formAction, pending] = useActionState<FormActionState, FormData>(
    submitPartnerRequest,
    undefined
  );

  useEffect(() => {
    if (state?.success) toast.success("Thanks for reaching out! We'll be in touch soon.");
    else if (state?.error) toast.error(state.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Organization name">
          <input name="organizationName" required className={inputClass} />
        </Field>
        <Field label="Contact person">
          <input name="contactName" required className={inputClass} />
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Email">
          <input name="email" type="email" required className={inputClass} />
        </Field>
        <Field label="Phone (optional)">
          <input name="phone" className={inputClass} />
        </Field>
      </div>
      <Field label="Type of partnership">
        <input
          name="partnershipType"
          placeholder="Corporate sponsorship, in-kind donation..."
          className={inputClass}
        />
      </Field>
      <Field label="Message (optional)">
        <textarea name="message" rows={3} className={inputClass} />
      </Field>
      <button
        type="submit"
        disabled={pending}
        className="glass-gold w-full rounded-xl px-5 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Submitting…" : "Request a Partnership"}
      </button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-white/80">{label}</label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}
