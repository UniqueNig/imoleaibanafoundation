import type { Metadata } from "next";
import Link from "next/link";
import { Home, Compass, Mail } from "lucide-react";
import { STOCK_PHOTOS } from "@/lib/placeholderPhoto";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center overflow-hidden py-28">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={STOCK_PHOTOS.youthCelebration}
        alt=""
        className="absolute inset-0 h-full w-full scale-110 object-cover blur-lg"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/94 via-navy-950/90 to-navy-950/95" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-gold-400/20 blur-[100px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-16 bottom-0 h-72 w-72 rounded-full bg-royal-400/20 blur-[100px]"
      />

      <div className="relative mx-auto max-w-2xl px-6 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-royal-300">
          Lost in the Light
        </span>
        <h1 className="text-glow-gold mt-4 text-7xl font-bold tracking-tight text-white sm:text-8xl">
          404
        </h1>
        <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          This page wandered off.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-white/65">
          The page you're looking for doesn't exist, moved, or was never here. Let's get you back
          on track.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="glass-gold flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
          >
            <Home size={18} />
            Back Home
          </Link>
          <Link
            href="/programmes"
            className="glass flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
          >
            <Compass size={18} />
            Our Programmes
          </Link>
          <Link
            href="/contact"
            className="flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white/85 transition-colors hover:border-white/50 hover:text-white"
          >
            <Mail size={18} />
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
