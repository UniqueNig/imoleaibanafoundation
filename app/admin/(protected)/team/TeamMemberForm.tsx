"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import CoverImageUploader from "@/app/components/admin/CoverImageUploader";
import { saveTeamMember, type TeamMemberActionState } from "./actions";

export type TeamMemberFormValues = {
  id?: string;
  name: string;
  role: string;
  bio: string;
  photoUrl: string;
  photoPublicId: string;
  order: number;
  published: boolean;
};

const inputClass =
  "w-full rounded-xl border border-navy-950/15 bg-white px-3.5 py-2.5 text-sm text-navy-950 outline-none focus:border-royal-500 dark:border-white/15 dark:bg-navy-900 dark:text-white";

export default function TeamMemberForm({ member }: { member?: TeamMemberFormValues }) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState<TeamMemberActionState, FormData>(
    saveTeamMember,
    undefined
  );

  useEffect(() => {
    if (state?.success) {
      toast.success(member ? "Team member updated" : "Team member added");
      router.push("/admin/team");
      router.refresh();
    } else if (state?.error) {
      toast.error(state.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <form action={formAction} className="max-w-2xl space-y-6">
      {member?.id && <input type="hidden" name="id" value={member.id} />}

      <Field label="Name">
        <input name="name" defaultValue={member?.name} required minLength={2} className={inputClass} />
      </Field>

      <Field label="Role">
        <input
          name="role"
          defaultValue={member?.role}
          required
          minLength={2}
          placeholder="Founder and President"
          className={inputClass}
        />
      </Field>

      <CoverImageUploader
        urlFieldName="photoUrl"
        publicIdFieldName="photoPublicId"
        initialUrl={member?.photoUrl}
        initialPublicId={member?.photoPublicId}
        label="Photo"
      />

      <Field label="Bio (optional)">
        <textarea
          name="bio"
          defaultValue={member?.bio}
          rows={3}
          maxLength={500}
          placeholder="A short line about this person."
          className={inputClass}
        />
      </Field>

      <Field label="Display Order">
        <input
          name="order"
          type="number"
          defaultValue={member?.order ?? 0}
          className={inputClass}
        />
        <p className="mt-1.5 text-xs text-navy-700/60 dark:text-white/50">
          Lower numbers show first (e.g. the Founder could be 0, directors 1 and 2, and so on).
        </p>
      </Field>

      <label className="flex items-center gap-2 text-sm font-medium text-navy-950 dark:text-white">
        <input
          type="checkbox"
          name="published"
          defaultChecked={member?.published}
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
          {pending ? "Saving..." : member ? "Save changes" : "Add team member"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/team")}
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
