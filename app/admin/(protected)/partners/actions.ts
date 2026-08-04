"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import PartnerRequest from "@/lib/models/PartnerRequest";

export async function togglePartnerStatus(id: string, nextStatus: "new" | "contacted") {
  await requireAdmin();
  await connectDB();
  await PartnerRequest.findByIdAndUpdate(id, { status: nextStatus });
  revalidatePath("/admin/partners");
}

export async function deletePartnerRequest(id: string) {
  await requireAdmin();
  await connectDB();
  await PartnerRequest.findByIdAndDelete(id);
  revalidatePath("/admin/partners");
}
