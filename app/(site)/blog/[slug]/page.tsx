import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarDays } from "lucide-react";
import { connectDB } from "@/lib/db";
import Post from "@/lib/models/Post";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  await connectDB();
  const post = await Post.findOne({ slug, published: true }).lean();
  if (!post) return { title: "Post not found" };
  return {
    title: `${post.title} — Imole Aibana Foundation`,
    description: post.excerpt || undefined,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  await connectDB();
  const post = await Post.findOne({ slug, published: true }).lean();
  if (!post) notFound();

  return (
    <article className="bg-background pb-24 pt-32 sm:pt-40">
      <div className="mx-auto max-w-3xl px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-royal-500">
          {(post.tags && post.tags[0]) || "Blog"}
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-navy-950 dark:text-white sm:text-4xl">
          {post.title}
        </h1>

        {post.publishedAt && (
          <div className="mt-4 flex items-center gap-1.5 text-sm text-navy-700/70 dark:text-white/60">
            <CalendarDays size={15} />
            {new Date(post.publishedAt).toLocaleDateString(undefined, {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        )}

        {post.coverImage?.url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.coverImage.url}
            alt=""
            className="mt-8 h-72 w-full rounded-3xl object-cover sm:h-96"
          />
        )}

        {post.content ? (
          <div
            className="prose dark:prose-invert mt-10 max-w-none prose-a:text-royal-500"
            // Sanitized server-side with isomorphic-dompurify at write time (see admin/posts/actions.ts)
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        ) : (
          post.excerpt && (
            <p className="mt-10 leading-relaxed text-navy-700/80 dark:text-white/70">{post.excerpt}</p>
          )
        )}

        {post.tags && post.tags.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2 border-t border-navy-950/10 pt-6 dark:border-white/10">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-navy-950/5 px-3 py-1 text-xs font-medium text-navy-700/70 dark:bg-white/10 dark:text-white/70"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
