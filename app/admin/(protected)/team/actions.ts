"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";
import { requireAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import TeamMember from "@/lib/models/TeamMember";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export type TeamMemberActionState = { error?: string; success?: boolean } | undefined;

const teamMemberSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters long."),
  role: z.string().trim().min(2, "Role is required."),
});

function revalidateTeamPaths() {
  revalidatePath("/admin/team");
  revalidatePath("/team");
  revalidatePath("/");
}

export async function saveTeamMember(
  _prevState: TeamMemberActionState,
  formData: FormData
): Promise<TeamMemberActionState> {
  await requireAdmin();

  const parsed = teamMemberSchema.safeParse({
    name: formData.get("name"),
    role: formData.get("role"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const id = String(formData.get("id") ?? "");

  const payload = {
    name: parsed.data.name,
    role: parsed.data.role,
    bio: String(formData.get("bio") ?? "").trim(),
    photo: {
      url: String(formData.get("photoUrl") ?? ""),
      publicId: String(formData.get("photoPublicId") ?? ""),
    },
    order: Number(formData.get("order") ?? 0) || 0,
    published: formData.get("published") === "on",
  };

  await connectDB();

  if (id) {
    const existing = await TeamMember.findById(id);
    if (!existing) return { error: "Team member not found." };

    if (existing.photo?.publicId && existing.photo.publicId !== payload.photo.publicId) {
      await cloudinary.uploader.destroy(existing.photo.publicId).catch(() => {});
    }

    Object.assign(existing, payload);
    await existing.save();
  } else {
    await TeamMember.create(payload);
  }

  revalidateTeamPaths();
  return { success: true };
}

export async function deleteTeamMember(id: string) {
  await requireAdmin();
  await connectDB();

  const member = await TeamMember.findByIdAndDelete(id);
  if (member?.photo?.publicId) {
    await cloudinary.uploader.destroy(member.photo.publicId).catch(() => {});
  }

  revalidateTeamPaths();
}

export async function togglePublish(id: string, nextPublished: boolean) {
  await requireAdmin();
  await connectDB();
  await TeamMember.findByIdAndUpdate(id, { published: nextPublished });
  revalidateTeamPaths();
}
