"use client";

import { useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { deleteProgramme, togglePublish } from "./actions";

export default function ProgrammeRowActions({
  id,
  title,
  published,
}: {
  id: string;
  title: string;
  published: boolean;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function handleTogglePublish() {
    startTransition(async () => {
      await togglePublish(id, !published);
      toast.success(published ? "Programme unpublished" : "Programme published");
      router.refresh();
    });
  }

  function handleDelete() {
    if (!window.confirm(`Delete "${title}"? This can't be undone.`)) return;
    startTransition(async () => {
      await deleteProgramme(id);
      toast.success("Programme deleted");
      router.refresh();
    });
  }

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={handleTogglePublish}
        disabled={pending}
        title={published ? "Unpublish" : "Publish"}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-navy-700 transition-colors hover:bg-navy-950/5 disabled:opacity-50 dark:text-white/70 dark:hover:bg-white/10"
      >
        {published ? <Eye size={16} /> : <EyeOff size={16} />}
      </button>
      <Link
        href={`/admin/programmes/${id}/edit`}
        title="Edit"
        className="flex h-8 w-8 items-center justify-center rounded-lg text-navy-700 transition-colors hover:bg-navy-950/5 dark:text-white/70 dark:hover:bg-white/10"
      >
        <Pencil size={16} />
      </Link>
      <button
        type="button"
        onClick={handleDelete}
        disabled={pending}
        title="Delete"
        className="flex h-8 w-8 items-center justify-center rounded-lg text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50 dark:text-red-400 dark:hover:bg-red-500/10"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
