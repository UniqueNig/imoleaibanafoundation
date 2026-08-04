import type { Metadata } from "next";
import { connectDB } from "@/lib/db";
import Programme from "@/lib/models/Programme";
import ProgrammeCard from "@/app/components/ProgrammeCard";
import PageHero from "@/app/components/PageHero";
import { STOCK_PHOTOS, fallbackPhoto } from "@/lib/placeholderPhoto";

export const metadata: Metadata = {
  title: "Programmes & Projects | Imole Aibana Foundation",
  description: "Explore our education, health, and community programmes.",
};

export default async function ProgrammesPage() {
  await connectDB();
  const programmes = await Programme.find({ published: true }).sort({ createdAt: -1 }).lean();

  return (
    <PageHero
      eyebrow="What We Do"
      title="Programmes & Projects"
      description="The work we do every day, across education, health, and community outreach."
      photo={STOCK_PHOTOS.youthEvent}
    >
      {programmes.length === 0 ? (
        <p className="mt-16 text-center text-sm text-white/55">
          Nothing published yet. Check back soon.
        </p>
      ) : (
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {programmes.map((programme) => (
            <ProgrammeCard
              key={String(programme._id)}
              programme={{
                slug: programme.slug,
                title: programme.title,
                excerpt: programme.excerpt,
                icon: programme.icon,
                coverImageUrl: programme.coverImage?.url || fallbackPhoto(),
              }}
            />
          ))}
        </div>
      )}
    </PageHero>
  );
}
