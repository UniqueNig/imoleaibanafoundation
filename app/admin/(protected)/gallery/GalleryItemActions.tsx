"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import ConfirmDialog from "@/app/components/admin/ConfirmDialog";
import { deleteGalleryItem, togglePublish } from "./actions";

export default function GalleryItemActions({
  id,
  caption,
  published,
}: {
  id: string;
  caption: string;
  published: boolean;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [confirmOpen, setConfirmOpen] = useState(false);

  function handleTogglePublish() {
    startTransition(async () => {
      await togglePublish(id, !published);
      toast.success(published ? "Item unpublished" : "Item published");
      router.refresh();
    });
  }

  function handleDelete() {
    startTransition(async () => {
      await deleteGalleryItem(id);
      toast.success("Item deleted");
      setConfirmOpen(false);
      router.refresh();
    });
  }

  return (
    <div className="flex items-center gap-1 rounded-full bg-navy-950/70 p-1 backdrop-blur-sm">
      <ConfirmDialog
        open={confirmOpen}
        title={`Delete "${caption || "this item"}"?`}
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
        className="flex h-7 w-7 items-center justify-center rounded-full text-white/85 transition-colors hover:bg-white/15 disabled:opacity-50"
      >
        {published ? <Eye size={14} /> : <EyeOff size={14} />}
      </button>
      <Link
        href={`/admin/gallery/${id}/edit`}
        title="Edit"
        className="flex h-7 w-7 items-center justify-center rounded-full text-white/85 transition-colors hover:bg-white/15"
      >
        <Pencil size={14} />
      </Link>
      <button
        type="button"
        onClick={() => setConfirmOpen(true)}
        disabled={pending}
        title="Delete"
        className="flex h-7 w-7 items-center justify-center rounded-full text-red-300 transition-colors hover:bg-red-500/20 disabled:opacity-50"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}
