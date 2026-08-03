import Link from "next/link";
import { Newspaper, CalendarDays } from "lucide-react";

export type PostCardData = {
  slug: string;
  title: string;
  excerpt?: string;
  publishedAt?: string | Date | null;
  coverImageUrl?: string;
};

export default function PostCard({ post, tone = "light" }: { post: PostCardData; tone?: "light" | "dark" }) {
  const dark = tone === "dark";

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group flex flex-col overflow-hidden rounded-3xl transition-transform hover:-translate-y-1 ${
        dark ? "glass" : "glass-light"
      }`}
    >
      <div className={`relative h-44 w-full overflow-hidden ${dark ? "bg-white/5" : "bg-navy-950/5 dark:bg-white/5"}`}>
        {post.coverImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.coverImageUrl}
            alt=""
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className={`flex h-full items-center justify-center ${dark ? "text-white/25" : "text-navy-950/15 dark:text-white/25"}`}>
            <Newspaper size={36} />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        {post.publishedAt && (
          <p className={`flex items-center gap-1.5 text-xs ${dark ? "text-white/50" : "text-navy-700/60 dark:text-white/50"}`}>
            <CalendarDays size={12} />
            {new Date(post.publishedAt).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        )}
        <h3 className={`mt-1.5 text-base font-semibold ${dark ? "text-white" : "text-navy-950 dark:text-white"}`}>
          {post.title}
        </h3>
        {post.excerpt && (
          <p className={`mt-3 line-clamp-2 text-sm leading-relaxed ${dark ? "text-white/65" : "text-navy-700/75 dark:text-white/65"}`}>
            {post.excerpt}
          </p>
        )}
      </div>
    </Link>
  );
}
