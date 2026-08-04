import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { connectDB } from "@/lib/db";
import Programme from "@/lib/models/Programme";
import { getProgrammeIcon } from "@/lib/programmeIcons";
import { fallbackPhoto } from "@/lib/placeholderPhoto";

// Matches the first 6 tiles into the same bento layout the homepage has
// always used (one large tile, two half-width, two quarter-width, two
// half-width). Extra tiles beyond 6, or fewer than 6, just flow normally.
const BENTO_SPANS = [
  "lg:col-span-2 lg:row-span-2",
  "lg:col-span-2",
  "",
  "",
  "lg:col-span-2",
  "lg:col-span-2",
];

export default async function FocusAreas() {
  await connectDB();
  const programmes = await Programme.find({ published: true })
    .sort({ createdAt: -1 })
    .limit(6)
    .lean();

  return (
    <section id="programmes" className="mesh-hero relative overflow-hidden py-24 sm:py-32">
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
            What We Do
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Our Key Focus Areas
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/65 sm:text-lg">
            Programmes and projects designed to create real, sustainable impact across the
            communities we serve.
          </p>
        </div>

        {programmes.length === 0 ? (
          <p className="mt-16 text-center text-sm text-white/55">
            We&apos;re setting up our programme pages. Check back soon.
          </p>
        ) : (
          <>
            <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:auto-rows-[minmax(0,1fr)] lg:grid-cols-4">
              {programmes.map((programme, i) => {
                const Icon = getProgrammeIcon(programme.icon);
                const coverUrl = programme.coverImage?.url || fallbackPhoto();
                return (
                  <Link
                    key={String(programme._id)}
                    href={`/programmes/${programme.slug}`}
                    className={`group relative flex flex-col justify-end overflow-hidden rounded-3xl p-7 ring-1 ring-white/10 transition-transform hover:-translate-y-1 ${BENTO_SPANS[i] ?? ""}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={coverUrl}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/92 via-navy-950/55 to-navy-950/15" />

                    <div className="relative">
                      <div className="glass-gold flex h-11 w-11 items-center justify-center rounded-2xl">
                        <Icon size={20} className="text-white" />
                      </div>
                      <h3 className="mt-5 text-lg font-semibold text-white">{programme.title}</h3>
                      {programme.excerpt && (
                        <p className="mt-2.5 text-sm leading-relaxed text-white/70">
                          {programme.excerpt}
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/programmes"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-400 hover:text-gold-300"
              >
                View all programmes
                <ArrowRight size={15} />
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
