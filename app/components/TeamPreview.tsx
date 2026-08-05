import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";
import { connectDB } from "@/lib/db";
import TeamMember from "@/lib/models/TeamMember";

export default async function TeamPreview() {
  await connectDB();
  const members = await TeamMember.find({ published: true })
    .sort({ order: 1, createdAt: 1 })
    .limit(3)
    .lean();

  if (members.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-background py-24 sm:py-32">
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-royal-500">
            The People Behind The Mission
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-navy-950 dark:text-white sm:text-4xl">
            Our Leadership Team
          </h2>
          <p className="mt-4 text-base leading-relaxed text-navy-700/80 dark:text-white/70 sm:text-lg">
            A dedicated group called to serve, combining experience and community passion to move
            our mission forward.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {members.map((member) => (
            <div
              key={String(member._id)}
              className="glass-light overflow-hidden rounded-3xl"
            >
              <div className="aspect-square w-full overflow-hidden bg-navy-950/5 dark:bg-white/5">
                {member.photo?.url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={member.photo.url} alt="" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-navy-950/15 dark:text-white/25">
                    <Users size={40} />
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-navy-950 dark:text-white">{member.name}</h3>
                <p className="mt-0.5 text-xs font-medium uppercase tracking-wide text-gold-600 dark:text-gold-400">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/team"
            className="inline-flex items-center gap-1.5 rounded-full border border-navy-950/15 px-5 py-2.5 text-sm font-semibold text-navy-950 transition-colors hover:bg-navy-950/5 dark:border-white/20 dark:text-white dark:hover:bg-white/10"
          >
            View all team members
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
