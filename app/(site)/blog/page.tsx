import type { Metadata } from "next";
import { connectDB } from "@/lib/db";
import Post from "@/lib/models/Post";
import PostCard from "@/app/components/PostCard";
import PageHero from "@/app/components/PageHero";

export const metadata: Metadata = {
  title: "Blog | Imole Aibana Foundation",
  description: "News, updates, and stories from Imole Aibana Foundation.",
};

export default async function BlogPage() {
  await connectDB();
  const posts = await Post.find({ published: true }).sort({ publishedAt: -1 }).lean();

  return (
    <PageHero
      eyebrow="News & Stories"
      title="Blog"
      description="Updates, success stories, and announcements from the foundation."
      photoSeed="iaf-hero-blog"
    >
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
    </PageHero>
  );
}
