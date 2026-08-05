import type { Metadata } from "next";
import { Users } from "lucide-react";
import { connectDB } from "@/lib/db";
import TeamMember from "@/lib/models/TeamMember";
import PageHero from "@/app/components/PageHero";
import { STOCK_PHOTOS } from "@/lib/placeholderPhoto";

export const metadata: Metadata = {
  title: "Our Team",
  description: "Meet the people behind Imole Aibana Foundation.",
  alternates: { canonical: "/team" },
  openGraph: {
    url: "/team",
    title: "Our Team | Imole Aibana Foundation",
    description: "Meet the people behind Imole Aibana Foundation.",
  },
};

export default async function TeamPage() {
  await connectDB();
  const members = await TeamMember.find({ published: true }).sort({ order: 1, createdAt: 1 }).lean();

  return (
    <PageHero
      eyebrow="The People Behind The Mission"
      title="Our Team"
      description="A dedicated group called to serve, combining experience and community passion to move our mission forward."
      photo={STOCK_PHOTOS.youthEvent}
    >
      {members.length === 0 ? (
        <p className="mt-16 text-center text-sm text-white/55">
          We're introducing our team soon. Check back shortly.
        </p>
      ) : (
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <div key={String(member._id)} className="glass overflow-hidden rounded-3xl">
              <div className="aspect-square w-full overflow-hidden bg-white/5">
                {member.photo?.url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={member.photo.url} alt="" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-white/25">
                    <Users size={40} />
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-white">{member.name}</h3>
                <p className="mt-0.5 text-xs font-medium uppercase tracking-wide text-gold-400">
                  {member.role}
                </p>
                {member.bio && (
                  <p className="mt-3 text-sm leading-relaxed text-white/65">{member.bio}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </PageHero>
  );
}
