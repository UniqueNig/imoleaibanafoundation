"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Mail, MailOpen, Trash2 } from "lucide-react";
import { markMessageRead, deleteContactMessage } from "./actions";

export default function ContactRowActions({
  id,
  name,
  status,
}: {
  id: string;
  name: string;
  status: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function handleToggle() {
    startTransition(async () => {
      const next = status === "read" ? "new" : "read";
      await markMessageRead(id, next);
      toast.success(next === "read" ? "Marked as read" : "Marked as new");
      router.refresh();
    });
  }

  function handleDelete() {
    if (!window.confirm(`Delete the message from ${name}? This can't be undone.`)) return;
    startTransition(async () => {
      await deleteContactMessage(id);
      toast.success("Message deleted");
      router.refresh();
    });
  }

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={handleToggle}
        disabled={pending}
        title={status === "read" ? "Mark as new" : "Mark as read"}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-navy-700 transition-colors hover:bg-navy-950/5 disabled:opacity-50 dark:text-white/70 dark:hover:bg-white/10"
      >
        {status === "read" ? <Mail size={16} /> : <MailOpen size={16} />}
      </button>
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
