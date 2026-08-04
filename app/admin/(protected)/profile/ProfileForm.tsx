"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { updateProfile, type ProfileActionState } from "./actions";

export type ProfileFormValues = {
  name: string;
  email: string;
};

const inputClass =
  "w-full rounded-xl border border-navy-950/15 bg-white px-3.5 py-2.5 text-sm text-navy-950 outline-none focus:border-royal-500 dark:border-white/15 dark:bg-navy-900 dark:text-white";

export default function ProfileForm({ user }: { user: ProfileFormValues }) {
  const [state, formAction, pending] = useActionState<ProfileActionState, FormData>(
    updateProfile,
    undefined
  );

  useEffect(() => {
    if (state?.success) {
      toast.success("Profile updated");
    } else if (state?.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <form action={formAction} className="max-w-lg space-y-6">
      <Field label="Name">
        <input name="name" defaultValue={user.name} required minLength={2} className={inputClass} />
      </Field>

      <Field label="Email">
        <input name="email" type="email" defaultValue={user.email} required className={inputClass} />
      </Field>

      <div className="border-t border-navy-950/10 pt-6 dark:border-white/10">
        <p className="text-sm font-medium text-navy-950 dark:text-white">Change Password</p>
        <p className="mt-1 text-xs text-navy-700/60 dark:text-white/50">
          Leave blank to keep your current password.
        </p>

        <div className="mt-4 space-y-4">
          <Field label="New Password">
            <input
              name="newPassword"
              type="password"
              autoComplete="new-password"
              minLength={8}
              className={inputClass}
            />
          </Field>
          <Field label="Confirm New Password">
            <input
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              minLength={8}
              className={inputClass}
            />
          </Field>
        </div>
      </div>

      <div className="border-t border-navy-950/10 pt-6 dark:border-white/10">
        <Field label="Current Password">
          <input
            name="currentPassword"
            type="password"
            autoComplete="current-password"
            required
            className={inputClass}
          />
        </Field>
        <p className="mt-2 text-xs text-navy-700/60 dark:text-white/50">
          Required to confirm any changes above.
        </p>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="rounded-xl bg-navy-950 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-800 disabled:opacity-60 dark:bg-white dark:text-navy-950 dark:hover:bg-white/90"
      >
        {pending ? "Saving…" : "Save Changes"}
      </button>
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
