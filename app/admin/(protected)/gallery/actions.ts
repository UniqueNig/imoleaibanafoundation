"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";
import { requireAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import GalleryItem from "@/lib/models/GalleryItem";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export type GalleryActionState = { error?: string; success?: boolean } | undefined;

const gallerySchema = z.object({
  mediaUrl: z.string().min(1, "Upload a photo or video first."),
  mediaPublicId: z.string().min(1, "Upload a photo or video first."),
});

function revalidateGalleryPaths() {
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  revalidatePath("/");
}

export async function saveGalleryItem(
  _prevState: GalleryActionState,
  formData: FormData
): Promise<GalleryActionState> {
  await requireAdmin();

  const parsed = gallerySchema.safeParse({
    mediaUrl: formData.get("mediaUrl"),
    mediaPublicId: formData.get("mediaPublicId"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const id = String(formData.get("id") ?? "");
  const type: "photo" | "video" = formData.get("mediaType") === "video" ? "video" : "photo";

  const payload: {
    caption: string;
    category: string;
    type: "photo" | "video";
    media: { url: string; publicId: string };
    published: boolean;
  } = {
    caption: String(formData.get("caption") ?? "").trim(),
    category: String(formData.get("category") ?? "").trim(),
    type,
    media: {
      url: parsed.data.mediaUrl,
      publicId: parsed.data.mediaPublicId,
    },
    published: formData.get("published") === "on",
  };

  await connectDB();

  if (id) {
    const existing = await GalleryItem.findById(id);
    if (!existing) return { error: "Gallery item not found." };

    if (existing.media?.publicId && existing.media.publicId !== payload.media.publicId) {
      await cloudinary.uploader
        .destroy(existing.media.publicId, { resource_type: existing.type === "video" ? "video" : "image" })
        .catch(() => {});
    }

    Object.assign(existing, payload);
    await existing.save();
  } else {
    await GalleryItem.create(payload);
  }

  revalidateGalleryPaths();
  return { success: true };
}

export async function deleteGalleryItem(id: string) {
  await requireAdmin();
  await connectDB();

  const item = await GalleryItem.findByIdAndDelete(id);
  if (item?.media?.publicId) {
    await cloudinary.uploader
      .destroy(item.media.publicId, { resource_type: item.type === "video" ? "video" : "image" })
      .catch(() => {});
  }

  revalidateGalleryPaths();
}

export async function togglePublish(id: string, nextPublished: boolean) {
  await requireAdmin();
  await connectDB();
  await GalleryItem.findByIdAndUpdate(id, { published: nextPublished });
  revalidateGalleryPaths();
}
