"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { submitContactMessage, type ContactActionState } from "./actions";

const inputClass =
  "w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-royal-400";

export default function ContactForm() {
  const [state, formAction, pending] = useActionState<ContactActionState, FormData>(
    submitContactMessage,
    undefined
  );

  useEffect(() => {
    if (state && "success" in state) toast.success("Message sent. We'll get back to you soon.");
    else if (state && "error" in state) toast.error(state.error);
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
      <Field label="Subject (optional)">
        <input name="subject" className={inputClass} />
      </Field>
      <Field label="Message">
        <textarea name="message" required rows={5} className={inputClass} />
      </Field>
      <button
        type="submit"
        disabled={pending}
        className="glass-gold flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Send size={16} />
        {pending ? "Sending..." : "Send Message"}
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
