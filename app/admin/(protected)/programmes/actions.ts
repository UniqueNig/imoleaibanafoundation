"use server";

import { z } from "zod";
import DOMPurify from "isomorphic-dompurify";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";
import { requireAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Programme from "@/lib/models/Programme";
import { PROGRAMME_ICON_NAMES } from "@/lib/programmeIcons";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export type ProgrammeActionState = { error?: string; success?: boolean } | undefined;

const programmeSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters long."),
  icon: z.enum(PROGRAMME_ICON_NAMES),
});

function revalidateProgrammePaths() {
  revalidatePath("/admin/programmes");
  revalidatePath("/programmes");
  revalidatePath("/");
}

export async function saveProgramme(
  _prevState: ProgrammeActionState,
  formData: FormData
): Promise<ProgrammeActionState> {
  await requireAdmin();

  const parsed = programmeSchema.safeParse({
    title: formData.get("title"),
    icon: formData.get("icon"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const id = String(formData.get("id") ?? "");
  const description = DOMPurify.sanitize(String(formData.get("description") ?? ""));

  const payload = {
    title: parsed.data.title,
    icon: parsed.data.icon,
    excerpt: String(formData.get("excerpt") ?? "").trim(),
    description,
    coverImage: {
      url: String(formData.get("coverImageUrl") ?? ""),
      publicId: String(formData.get("coverImagePublicId") ?? ""),
    },
    published: formData.get("published") === "on",
  };

  await connectDB();

  if (id) {
    const existing = await Programme.findById(id);
    if (!existing) return { error: "Programme not found." };

    if (
      existing.coverImage?.publicId &&
      existing.coverImage.publicId !== payload.coverImage.publicId
    ) {
      await cloudinary.uploader.destroy(existing.coverImage.publicId).catch(() => {});
    }

    Object.assign(existing, payload);
    await existing.save();
  } else {
    await Programme.create(payload);
  }

  revalidateProgrammePaths();
  return { success: true };
}

export async function deleteProgramme(id: string) {
  await requireAdmin();
  await connectDB();

  const programme = await Programme.findByIdAndDelete(id);
  if (programme?.coverImage?.publicId) {
    await cloudinary.uploader.destroy(programme.coverImage.publicId).catch(() => {});
  }

  revalidateProgrammePaths();
}

export async function togglePublish(id: string, nextPublished: boolean) {
  await requireAdmin();
  await connectDB();
  await Programme.findByIdAndUpdate(id, { published: nextPublished });
  revalidateProgrammePaths();
}
