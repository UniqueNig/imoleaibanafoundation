import Link from "next/link";
import { getProgrammeIcon } from "@/lib/programmeIcons";

export type ProgrammeCardData = {
  slug: string;
  title: string;
  excerpt?: string;
  icon?: string;
};

export default function ProgrammeCard({ programme }: { programme: ProgrammeCardData }) {
  const Icon = getProgrammeIcon(programme.icon);

  return (
    <Link
      href={`/programmes/${programme.slug}`}
      className="glass group flex flex-col rounded-3xl p-7 transition-transform hover:-translate-y-1"
    >
      <div className="glass-gold flex h-11 w-11 items-center justify-center rounded-2xl">
        <Icon size={20} className="text-white" />
      </div>
      <h3 className="mt-5 text-lg font-semibold text-white">{programme.title}</h3>
      {programme.excerpt && (
        <p className="mt-2.5 text-sm leading-relaxed text-white/65">{programme.excerpt}</p>
      )}
    </Link>
  );
}
