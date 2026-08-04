"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";

export type ProfileActionState = { error?: string; success?: boolean } | undefined;

const profileSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().toLowerCase().email("Enter a valid email address."),
  currentPassword: z.string().min(1, "Enter your current password to save changes."),
});

export async function updateProfile(
  _prevState: ProfileActionState,
  formData: FormData
): Promise<ProfileActionState> {
  const session = await requireAdmin();

  const parsed = profileSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    currentPassword: formData.get("currentPassword"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Please check your details." };
  }

  const newPassword = String(formData.get("newPassword") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");
  if (newPassword && newPassword.length < 8) {
    return { error: "New password must be at least 8 characters." };
  }
  if (newPassword && newPassword !== confirmPassword) {
    return { error: "New password and confirmation don't match." };
  }

  await connectDB();
  const user = await User.findById(session.userId).select("+passwordHash");
  if (!user) {
    return { error: "Account not found." };
  }

  const currentPasswordValid = await bcrypt.compare(parsed.data.currentPassword, user.passwordHash);
  if (!currentPasswordValid) {
    return { error: "Current password is incorrect." };
  }

  if (parsed.data.email !== user.email) {
    const existing = await User.findOne({ email: parsed.data.email, _id: { $ne: user._id } });
    if (existing) {
      return { error: "That email is already in use." };
    }
  }

  user.name = parsed.data.name;
  user.email = parsed.data.email;
  if (newPassword) {
    user.passwordHash = await bcrypt.hash(newPassword, 12);
  }
  await user.save();

  revalidatePath("/admin/profile");
  return { success: true };
}
