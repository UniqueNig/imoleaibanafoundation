"use server";

import { z } from "zod";
import DOMPurify from "isomorphic-dompurify";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";
import { requireAdmin } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Post from "@/lib/models/Post";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export type PostActionState = { error?: string; success?: boolean } | undefined;

const postSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters long."),
});

function revalidatePostPaths() {
  revalidatePath("/admin/posts");
  revalidatePath("/blog");
  revalidatePath("/");
}

export async function savePost(
  _prevState: PostActionState,
  formData: FormData
): Promise<PostActionState> {
  const session = await requireAdmin();

  const parsed = postSchema.safeParse({ title: formData.get("title") });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const id = String(formData.get("id") ?? "");
  const content = DOMPurify.sanitize(String(formData.get("content") ?? ""));
  const tags = String(formData.get("tags") ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const payload = {
    title: parsed.data.title,
    excerpt: String(formData.get("excerpt") ?? "").trim(),
    content,
    tags,
    coverImage: {
      url: String(formData.get("coverImageUrl") ?? ""),
      publicId: String(formData.get("coverImagePublicId") ?? ""),
    },
    published: formData.get("published") === "on",
  };

  await connectDB();

  if (id) {
    const existing = await Post.findById(id);
    if (!existing) return { error: "Post not found." };

    if (
      existing.coverImage?.publicId &&
      existing.coverImage.publicId !== payload.coverImage.publicId
    ) {
      await cloudinary.uploader.destroy(existing.coverImage.publicId).catch(() => {});
    }

    Object.assign(existing, payload);
    await existing.save();
  } else {
    await Post.create({ ...payload, author: session.userId });
  }

  revalidatePostPaths();
  return { success: true };
}

export async function deletePost(id: string) {
  await requireAdmin();
  await connectDB();

  const post = await Post.findByIdAndDelete(id);
  if (post?.coverImage?.publicId) {
    await cloudinary.uploader.destroy(post.coverImage.publicId).catch(() => {});
  }

  revalidatePostPaths();
}

export async function togglePublish(id: string, nextPublished: boolean) {
  await requireAdmin();
  await connectDB();

  const post = await Post.findById(id);
  if (!post) return;
  post.published = nextPublished;
  if (nextPublished && !post.publishedAt) post.publishedAt = new Date();
  await post.save();

  revalidatePostPaths();
}
