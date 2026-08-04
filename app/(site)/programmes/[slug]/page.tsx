import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import Programme from "@/lib/models/Programme";
import { getProgrammeIcon } from "@/lib/programmeIcons";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  await connectDB();
  const programme = await Programme.findOne({ slug, published: true }).lean();
  if (!programme) return { title: "Programme not found" };
  return {
    title: programme.title,
    description: programme.excerpt || undefined,
    alternates: { canonical: `/programmes/${programme.slug}` },
    openGraph: {
      type: "article",
      url: `/programmes/${programme.slug}`,
      title: `${programme.title} | Imole Aibana Foundation`,
      description: programme.excerpt || undefined,
      images: programme.coverImage?.url ? [{ url: programme.coverImage.url }] : undefined,
    },
  };
}

export default async function ProgrammeDetailPage({ params }: Props) {
  const { slug } = await params;

  await connectDB();
  const programme = await Programme.findOne({ slug, published: true }).lean();
  if (!programme) notFound();

  const Icon = getProgrammeIcon(programme.icon);

  return (
    <article className="bg-background pb-24 pt-32 sm:pt-40">
      <div className="mx-auto max-w-3xl px-6">
        <div className="glass-gold flex h-14 w-14 items-center justify-center rounded-2xl">
          <Icon size={26} className="text-navy-950 dark:text-white" />
        </div>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-navy-950 dark:text-white sm:text-4xl">
          {programme.title}
        </h1>

        {programme.coverImage?.url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={programme.coverImage.url}
            alt=""
            className="mt-8 h-72 w-full rounded-3xl object-cover sm:h-96"
          />
        )}

        {programme.description ? (
          <div
            className="prose dark:prose-invert mt-10 max-w-none prose-a:text-royal-500"
            // Sanitized server-side with isomorphic-dompurify at write time (see admin/programmes/actions.ts)
            dangerouslySetInnerHTML={{ __html: programme.description }}
          />
        ) : (
          programme.excerpt && (
            <p className="mt-10 leading-relaxed text-navy-700/80 dark:text-white/70">
              {programme.excerpt}
            </p>
          )
        )}
      </div>
    </article>
  );
}
