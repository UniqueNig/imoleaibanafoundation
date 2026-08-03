import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import Post from "@/lib/models/Post";
import PostForm from "../../PostForm";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  await connectDB();
  const post = await Post.findById(id).lean();
  if (!post) notFound();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-navy-950 dark:text-white">Edit Post</h1>
      <p className="mt-1.5 text-sm text-navy-700/70 dark:text-white/60">{post.title}</p>

      <div className="mt-8">
        <PostForm
          post={{
            id: String(post._id),
            title: post.title,
            excerpt: post.excerpt ?? "",
            content: post.content ?? "",
            tags: (post.tags ?? []).join(", "),
            coverImageUrl: post.coverImage?.url ?? "",
            coverImagePublicId: post.coverImage?.publicId ?? "",
            published: post.published ?? false,
          }}
        />
      </div>
    </div>
  );
}
