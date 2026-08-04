"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import GalleryMediaUploader from "@/app/components/admin/GalleryMediaUploader";
import { saveGalleryItem, type GalleryActionState } from "./actions";

export type GalleryFormValues = {
  id?: string;
  caption: string;
  category: string;
  mediaUrl: string;
  mediaPublicId: string;
  mediaType: "photo" | "video";
  published: boolean;
};

const inputClass =
  "w-full rounded-xl border border-navy-950/15 bg-white px-3.5 py-2.5 text-sm text-navy-950 outline-none focus:border-royal-500 dark:border-white/15 dark:bg-navy-900 dark:text-white";

const SUGGESTED_CATEGORIES = [
  "Outreach",
  "Education",
  "Medical Outreach",
  "Youth Empowerment",
  "Community Engagement",
];

export default function GalleryForm({ item }: { item?: GalleryFormValues }) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState<GalleryActionState, FormData>(
    saveGalleryItem,
    undefined
  );

  useEffect(() => {
    if (state?.success) {
      toast.success(item ? "Gallery item updated" : "Added to gallery");
      router.push("/admin/gallery");
      router.refresh();
    } else if (state?.error) {
      toast.error(state.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <form action={formAction} className="max-w-2xl space-y-6">
      {item?.id && <input type="hidden" name="id" value={item.id} />}

      <GalleryMediaUploader
        urlFieldName="mediaUrl"
        publicIdFieldName="mediaPublicId"
        typeFieldName="mediaType"
        initialUrl={item?.mediaUrl}
        initialPublicId={item?.mediaPublicId}
        initialType={item?.mediaType}
      />

      <Field label="Caption (optional)">
        <input name="caption" defaultValue={item?.caption} className={inputClass} />
      </Field>

      <Field label="Category (optional)">
        <input
          name="category"
          defaultValue={item?.category}
          placeholder="Outreach, Education, Medical Outreach..."
          className={inputClass}
          list="gallery-categories"
        />
        <datalist id="gallery-categories">
          {SUGGESTED_CATEGORIES.map((cat) => (
            <option key={cat} value={cat} />
          ))}
        </datalist>
      </Field>

      <label className="flex items-center gap-2 text-sm font-medium text-navy-950 dark:text-white">
        <input
          type="checkbox"
          name="published"
          defaultChecked={item?.published}
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
          {pending ? "Saving…" : item ? "Save changes" : "Add to gallery"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/gallery")}
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
