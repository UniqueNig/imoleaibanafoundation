"use server";

import { z } from "zod";
import DOMPurify from "isomorphic-dompurify";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";
import { requireAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Event from "@/lib/models/Event";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export type EventActionState = { error?: string; success?: boolean } | undefined;

const eventSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters long."),
  startDate: z.string().min(1, "Start date is required."),
});

function revalidateEventPaths() {
  revalidatePath("/admin/events");
  revalidatePath("/events");
  revalidatePath("/");
}

export async function saveEvent(
  _prevState: EventActionState,
  formData: FormData
): Promise<EventActionState> {
  await requireAdmin();

  const parsed = eventSchema.safeParse({
    title: formData.get("title"),
    startDate: formData.get("startDate"),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const id = String(formData.get("id") ?? "");
  const endDateRaw = String(formData.get("endDate") ?? "");
  const description = DOMPurify.sanitize(String(formData.get("description") ?? ""));

  const payload = {
    title: parsed.data.title,
    excerpt: String(formData.get("excerpt") ?? "").trim(),
    description,
    startDate: new Date(parsed.data.startDate),
    endDate: endDateRaw ? new Date(endDateRaw) : undefined,
    location: String(formData.get("location") ?? "").trim(),
    coverImage: {
      url: String(formData.get("coverImageUrl") ?? ""),
      publicId: String(formData.get("coverImagePublicId") ?? ""),
    },
    published: formData.get("published") === "on",
  };

  await connectDB();

  if (id) {
    const existing = await Event.findById(id);
    if (!existing) return { error: "Event not found." };

    if (
      existing.coverImage?.publicId &&
      existing.coverImage.publicId !== payload.coverImage.publicId
    ) {
      await cloudinary.uploader.destroy(existing.coverImage.publicId).catch(() => {});
    }

    Object.assign(existing, payload);
    await existing.save();
  } else {
    await Event.create(payload);
  }

  revalidateEventPaths();
  return { success: true };
}

export async function deleteEvent(id: string) {
  await requireAdmin();
  await connectDB();

  const event = await Event.findByIdAndDelete(id);
  if (event?.coverImage?.publicId) {
    await cloudinary.uploader.destroy(event.coverImage.publicId).catch(() => {});
  }

  revalidateEventPaths();
}

export async function togglePublish(id: string, nextPublished: boolean) {
  await requireAdmin();
  await connectDB();
  await Event.findByIdAndUpdate(id, { published: nextPublished });
  revalidateEventPaths();
}
