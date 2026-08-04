"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import VolunteerApplication from "@/lib/models/VolunteerApplication";

export async function toggleVolunteerStatus(id: string, nextStatus: "new" | "contacted") {
  await requireAdmin();
  await connectDB();
  await VolunteerApplication.findByIdAndUpdate(id, { status: nextStatus });
  revalidatePath("/admin/volunteers");
}

export async function deleteVolunteerApplication(id: string) {
  await requireAdmin();
  await connectDB();
  await VolunteerApplication.findByIdAndDelete(id);
  revalidatePath("/admin/volunteers");
}
