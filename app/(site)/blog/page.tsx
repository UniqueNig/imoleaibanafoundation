import type { Metadata } from "next";
import { connectDB } from "@/lib/db";
import Post from "@/lib/models/Post";
import PostCard from "@/app/components/PostCard";

export const metadata: Metadata = {
  title: "Blog",
  description: "News, updates, and stories from Imole Aibana Foundation.",
  alternates: { canonical: "/blog" },
  openGraph: {
    url: "/blog",
    title: "Blog | Imole Aibana Foundation",
    description: "News, updates, and stories from Imole Aibana Foundation.",
  },
};

export default async function BlogPage() {
  await connectDB();
  const posts = await Post.find({ published: true }).sort({ publishedAt: -1 }).lean();

  return (
    <div className="mesh-hero relative overflow-hidden py-28 sm:py-36">
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
            News &amp; Stories
          </span>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Blog</h1>
          <p className="mt-4 text-base leading-relaxed text-white/65 sm:text-lg">
            Updates, success stories, and announcements from the foundation.
          </p>
        </div>

        {posts.length === 0 ? (
        <p className="mt-16 text-center text-sm text-white/55">
          Nothing published yet. Check back soon.
        </p>
      ) : (
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard
              key={String(post._id)}
              tone="dark"
              post={{
                slug: post.slug,
                title: post.title,
                excerpt: post.excerpt,
                publishedAt: post.publishedAt,
                coverImageUrl: post.coverImage?.url,
              }}
            />
          ))}
        </div>
      )}
      </div>
    </div>
  );
}
