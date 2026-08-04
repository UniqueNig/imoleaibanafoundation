import { placeholderPhoto } from "@/lib/placeholderPhoto";

export default function PageHero({
  eyebrow,
  title,
  description,
  photoSeed,
  maxWidth = "max-w-6xl",
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  photoSeed: string;
  maxWidth?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden py-28 sm:py-36">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={placeholderPhoto(photoSeed, 1920, 1080)}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/88 via-navy-950/72 to-navy-950/90" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-gold-400/20 blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-16 bottom-0 h-72 w-72 rounded-full bg-royal-400/20 blur-[100px]"
      />

      <div className={`relative mx-auto ${maxWidth} px-6`}>
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
            {eyebrow}
          </span>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {title}
          </h1>
          {description && (
            <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">{description}</p>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}
