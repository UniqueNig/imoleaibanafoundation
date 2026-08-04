"use client";

import { useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Pencil, Trash2, Eye, EyeOff } from "lucide-react";
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

  function handleTogglePublish() {
    startTransition(async () => {
      await togglePublish(id, !published);
      toast.success(published ? "Item unpublished" : "Item published");
      router.refresh();
    });
  }

  function handleDelete() {
    if (!window.confirm(`Delete "${caption || "this item"}"? This can't be undone.`)) return;
    startTransition(async () => {
      await deleteGalleryItem(id);
      toast.success("Item deleted");
      router.refresh();
    });
  }

  return (
    <div className="flex items-center gap-1 rounded-full bg-navy-950/70 p-1 backdrop-blur-sm">
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
        onClick={handleDelete}
        disabled={pending}
        title="Delete"
        className="flex h-7 w-7 items-center justify-center rounded-full text-red-300 transition-colors hover:bg-red-500/20 disabled:opacity-50"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}
