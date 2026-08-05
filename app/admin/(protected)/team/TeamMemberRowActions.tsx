"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import ConfirmDialog from "@/app/components/admin/ConfirmDialog";
import { deleteTeamMember, togglePublish } from "./actions";

export default function TeamMemberRowActions({
  id,
  name,
  published,
}: {
  id: string;
  name: string;
  published: boolean;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [confirmOpen, setConfirmOpen] = useState(false);

  function handleTogglePublish() {
    startTransition(async () => {
      await togglePublish(id, !published);
      toast.success(published ? "Member unpublished" : "Member published");
      router.refresh();
    });
  }

  function handleDelete() {
    startTransition(async () => {
      await deleteTeamMember(id);
      toast.success("Team member deleted");
      setConfirmOpen(false);
      router.refresh();
    });
  }

  return (
    <div className="flex items-center gap-1">
      <ConfirmDialog
        open={confirmOpen}
        title={`Delete "${name}"?`}
        description="This can't be undone."
        pending={pending}
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
      />
      <button
        type="button"
        onClick={handleTogglePublish}
        disabled={pending}
        title={published ? "Unpublish" : "Publish"}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-navy-700 transition-colors hover:bg-navy-950/5 dark:text-white/70 dark:hover:bg-white/10 disabled:opacity-50"
      >
        {published ? <Eye size={16} /> : <EyeOff size={16} />}
      </button>
      <Link
        href={`/admin/team/${id}/edit`}
        title="Edit"
        className="flex h-8 w-8 items-center justify-center rounded-lg text-navy-700 transition-colors hover:bg-navy-950/5 dark:text-white/70 dark:hover:bg-white/10"
      >
        <Pencil size={16} />
      </Link>
      <button
        type="button"
        onClick={() => setConfirmOpen(true)}
        disabled={pending}
        title="Delete"
        className="flex h-8 w-8 items-center justify-center rounded-lg text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50 dark:text-red-400 dark:hover:bg-red-500/10"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
