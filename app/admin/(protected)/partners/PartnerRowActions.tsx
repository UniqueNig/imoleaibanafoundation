"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CheckCircle2, RotateCcw, Trash2 } from "lucide-react";
import { togglePartnerStatus, deletePartnerRequest } from "./actions";

export default function PartnerRowActions({
  id,
  organizationName,
  status,
}: {
  id: string;
  organizationName: string;
  status: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function handleToggle() {
    startTransition(async () => {
      const next = status === "contacted" ? "new" : "contacted";
      await togglePartnerStatus(id, next);
      toast.success(next === "contacted" ? "Marked as contacted" : "Marked as new");
      router.refresh();
    });
  }

  function handleDelete() {
    if (!window.confirm(`Delete the request from ${organizationName}? This can't be undone.`)) return;
    startTransition(async () => {
      await deletePartnerRequest(id);
      toast.success("Request deleted");
      router.refresh();
    });
  }

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={handleToggle}
        disabled={pending}
        title={status === "contacted" ? "Mark as new" : "Mark as contacted"}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-navy-700 transition-colors hover:bg-navy-950/5 disabled:opacity-50 dark:text-white/70 dark:hover:bg-white/10"
      >
        {status === "contacted" ? <RotateCcw size={16} /> : <CheckCircle2 size={16} />}
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
