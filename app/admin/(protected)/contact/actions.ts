"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import ContactMessage from "@/lib/models/ContactMessage";

export async function markMessageRead(id: string, nextStatus: "new" | "read") {
  await requireAdmin();
  await connectDB();
  await ContactMessage.findByIdAndUpdate(id, { status: nextStatus });
  revalidatePath("/admin/contact");
}

export async function deleteContactMessage(id: string) {
  await requireAdmin();
  await connectDB();
  await ContactMessage.findByIdAndDelete(id);
  revalidatePath("/admin/contact");
}
