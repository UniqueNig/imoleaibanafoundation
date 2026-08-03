import Link from "next/link";
import { ArrowRight, Newspaper } from "lucide-react";
import { connectDB } from "@/lib/db";
import Post from "@/lib/models/Post";
import PostCard from "@/app/components/PostCard";

export default async function LatestPosts() {
  await connectDB();
  const posts = await Post.find({ published: true }).sort({ publishedAt: -1 }).limit(3).lean();

  return (
    <section id="blog" className="relative overflow-hidden bg-background py-24 sm:py-32">
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:items-end">
          <div className="text-center sm:text-left">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-royal-500">
              News &amp; Stories
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-navy-950 dark:text-white sm:text-4xl">
              Latest from the Blog
            </h2>
          </div>
          <Link
            href="/blog"
            className="flex items-center gap-1.5 text-sm font-semibold text-royal-500 hover:text-royal-600"
          >
            View all posts
            <ArrowRight size={15} />
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="mesh-hero relative mt-12 overflow-hidden rounded-3xl px-8 py-16 text-center sm:py-20">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-royal-400/25 blur-[90px]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-gold-400/25 blur-[90px]"
            />

            <div className="relative mx-auto flex max-w-md flex-col items-center gap-4">
              <div className="glass-gold flex h-14 w-14 items-center justify-center rounded-2xl">
                <Newspaper size={26} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white">Our first story is coming soon</h3>
              <p className="text-sm leading-relaxed text-white/65">
                We're working on updates and stories from the field. Check back soon to read them.
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard
                key={String(post._id)}
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
    </section>
  );
}
