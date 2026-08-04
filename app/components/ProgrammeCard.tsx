import Link from "next/link";
import { getProgrammeIcon } from "@/lib/programmeIcons";

export type ProgrammeCardData = {
  slug: string;
  title: string;
  excerpt?: string;
  icon?: string;
  coverImageUrl?: string;
};

export default function ProgrammeCard({ programme }: { programme: ProgrammeCardData }) {
  const Icon = getProgrammeIcon(programme.icon);

  return (
    <Link
      href={`/programmes/${programme.slug}`}
      className="group relative flex min-h-56 flex-col justify-end overflow-hidden rounded-3xl p-7 ring-1 ring-white/10 transition-transform hover:-translate-y-1"
    >
      {programme.coverImageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={programme.coverImageUrl}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-navy-900" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/96 via-navy-950/82 to-navy-950/50" />

      <div className="relative">
        <div className="glass-gold flex h-11 w-11 items-center justify-center rounded-2xl">
          <Icon size={20} className="text-white" />
        </div>
        <h3 className="mt-5 text-lg font-semibold text-white">{programme.title}</h3>
        {programme.excerpt && (
          <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-white/70">
            {programme.excerpt}
          </p>
        )}
      </div>
    </Link>
  );
}
