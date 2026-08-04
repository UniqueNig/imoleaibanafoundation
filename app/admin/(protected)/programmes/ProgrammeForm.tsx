"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import RichTextEditor from "@/app/components/admin/RichTextEditor";
import CoverImageUploader from "@/app/components/admin/CoverImageUploader";
import { PROGRAMME_ICON_NAMES, PROGRAMME_ICON_MAP } from "@/lib/programmeIcons";
import { saveProgramme, type ProgrammeActionState } from "./actions";

export type ProgrammeFormValues = {
  id?: string;
  title: string;
  excerpt: string;
  description: string;
  icon: string;
  coverImageUrl: string;
  coverImagePublicId: string;
  published: boolean;
};

const inputClass =
  "w-full rounded-xl border border-navy-950/15 bg-white px-3.5 py-2.5 text-sm text-navy-950 outline-none focus:border-royal-500 dark:border-white/15 dark:bg-navy-900 dark:text-white";

export default function ProgrammeForm({ programme }: { programme?: ProgrammeFormValues }) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState<ProgrammeActionState, FormData>(
    saveProgramme,
    undefined
  );
  const [icon, setIcon] = useState(programme?.icon ?? "Sparkles");

  useEffect(() => {
    if (state?.success) {
      toast.success(programme ? "Programme updated" : "Programme created");
      router.push("/admin/programmes");
      router.refresh();
    } else if (state?.error) {
      toast.error(state.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <form action={formAction} className="max-w-2xl space-y-6">
      {programme?.id && <input type="hidden" name="id" value={programme.id} />}
      <input type="hidden" name="icon" value={icon} />

      <Field label="Title">
        <input
          name="title"
          defaultValue={programme?.title}
          required
          minLength={3}
          className={inputClass}
        />
      </Field>

      <Field label="Icon">
        <div className="flex flex-wrap gap-2">
          {PROGRAMME_ICON_NAMES.map((name) => {
            const IconComponent = PROGRAMME_ICON_MAP[name];
            const active = icon === name;
            return (
              <button
                key={name}
                type="button"
                onClick={() => setIcon(name)}
                title={name}
                className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
                  active
                    ? "bg-navy-950 text-white dark:bg-white dark:text-navy-950"
                    : "border border-navy-950/15 text-navy-700 hover:bg-navy-950/5 dark:border-white/15 dark:text-white/70 dark:hover:bg-white/10"
                }`}
              >
                <IconComponent size={18} />
              </button>
            );
          })}
        </div>
      </Field>

      <Field label="Excerpt">
        <textarea
          name="excerpt"
          defaultValue={programme?.excerpt}
          rows={2}
          maxLength={300}
          placeholder="Short summary shown on the homepage and programme list."
          className={inputClass}
        />
      </Field>

      <CoverImageUploader
        urlFieldName="coverImageUrl"
        publicIdFieldName="coverImagePublicId"
        initialUrl={programme?.coverImageUrl}
        initialPublicId={programme?.coverImagePublicId}
      />

      <Field label="Description">
        <RichTextEditor name="description" initialContent={programme?.description} />
      </Field>

      <label className="flex items-center gap-2 text-sm font-medium text-navy-950 dark:text-white">
        <input
          type="checkbox"
          name="published"
          defaultChecked={programme?.published}
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
          {pending ? "Saving..." : programme ? "Save changes" : "Create programme"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/programmes")}
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
