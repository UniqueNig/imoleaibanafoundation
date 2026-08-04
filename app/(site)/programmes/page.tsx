import type { Metadata } from "next";
import { connectDB } from "@/lib/db";
import Programme from "@/lib/models/Programme";
import ProgrammeCard from "@/app/components/ProgrammeCard";

export const metadata: Metadata = {
  title: "Programmes & Projects | Imole Aibana Foundation",
  description: "Explore our education, health, and community programmes.",
};

export default async function ProgrammesPage() {
  await connectDB();
  const programmes = await Programme.find({ published: true }).sort({ createdAt: -1 }).lean();

  return (
    <div className="mesh-hero relative overflow-hidden py-28 sm:py-36">
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
            What We Do
          </span>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Programmes &amp; Projects
          </h1>
          <p className="mt-4 text-base leading-relaxed text-white/65 sm:text-lg">
            The work we do every day, across education, health, and community outreach.
          </p>
        </div>

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
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
