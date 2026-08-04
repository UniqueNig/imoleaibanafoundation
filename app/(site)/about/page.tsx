import type { Metadata } from "next";
import { Eye, Target, HeartHandshake, ShieldCheck, Users, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Imole Aibana Foundation",
  description: "The story, vision, mission, and values behind Imole Aibana Foundation.",
};

const CORE_VALUES = [
  {
    icon: HeartHandshake,
    title: "Compassion",
    description: "We treat every person we work with as someone worth showing up for, not a statistic.",
  },
  {
    icon: ShieldCheck,
    title: "Integrity",
    description: "We're honest about what we can and can't do, and accountable for the resources entrusted to us.",
  },
  {
    icon: Users,
    title: "Community First",
    description: "We design programmes with the communities we serve, not just for them.",
  },
  {
    icon: Sparkles,
    title: "Consistency",
    description: "Real change takes time. We stay committed to a place long after the first visit.",
  },
];

export default function AboutPage() {
  return (
    <>
      <div className="mesh-hero relative overflow-hidden py-28 sm:py-36">
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
            About Us
          </span>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Our Story
          </h1>
          <p className="mt-4 text-base leading-relaxed text-white/65 sm:text-lg">
            Imole Aibana Foundation started with a simple idea: that education, healthcare, and a
            bit of consistent support can change what's possible for a family. Imole means light in
            Yoruba, and that's what we're trying to bring to the communities we work in.
          </p>
        </div>
      </div>

      <section className="bg-background py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="glass-light rounded-3xl p-8 sm:p-10">
              <div className="glass-gold flex h-12 w-12 items-center justify-center rounded-2xl">
                <Eye size={22} className="text-navy-950 dark:text-white" />
              </div>
              <h2 className="mt-6 text-xl font-semibold text-navy-950 dark:text-white">
                Our Vision
              </h2>
              <p className="mt-3 leading-relaxed text-navy-700/80 dark:text-white/70">
                A world where every individual, regardless of background, has access to
                education, opportunity, and dignity.
              </p>
            </div>

            <div className="glass-light rounded-3xl p-8 sm:p-10">
              <div className="glass-gold flex h-12 w-12 items-center justify-center rounded-2xl">
                <Target size={22} className="text-navy-950 dark:text-white" />
              </div>
              <h2 className="mt-6 text-xl font-semibold text-navy-950 dark:text-white">
                Our Mission
              </h2>
              <p className="mt-3 leading-relaxed text-navy-700/80 dark:text-white/70">
                To transform lives through education, empowerment, and sustainable
                community-driven initiatives.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mesh-hero relative overflow-hidden py-24 sm:py-32">
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
              What Guides Us
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Our Core Values
            </h2>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CORE_VALUES.map((value) => (
              <div key={value.title} className="glass rounded-3xl p-7">
                <div className="glass-gold flex h-11 w-11 items-center justify-center rounded-2xl">
                  <value.icon size={20} className="text-white" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">{value.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-white/65">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-6">
          <div className="glass-light rounded-3xl p-8 sm:p-12">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-royal-500">
              A Note From Us
            </span>
            <p className="mt-4 text-lg leading-relaxed text-navy-950 dark:text-white sm:text-xl">
              We started this foundation because we kept seeing the same gap: talented,
              hardworking people held back by things that shouldn't have to hold anyone back,
              like school fees, distance to a clinic, or simply not having anyone in their corner.
              We can't fix everything, but we can show up, keep showing up, and grow the number of
              people we reach along the way. Thank you for being part of that with us.
            </p>
            <p className="mt-6 text-sm font-medium text-navy-700/70 dark:text-white/50">
              Founder, Imole Aibana Foundation
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
