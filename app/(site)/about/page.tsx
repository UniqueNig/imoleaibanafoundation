import type { Metadata } from "next";
import { Eye, Target, HandHeart, Sunrise, ShieldCheck, Sprout, Award } from "lucide-react";
import PageHero from "@/app/components/PageHero";
import { STOCK_PHOTOS } from "@/lib/placeholderPhoto";

export const metadata: Metadata = {
  title: "About Us",
  description: "The story, vision, mission, and values behind Imole Aibana Foundation.",
  alternates: { canonical: "/about" },
  openGraph: {
    url: "/about",
    title: "About Us | Imole Aibana Foundation",
    description: "The story, vision, mission, and values behind Imole Aibana Foundation.",
  },
};

// Our core values, spelling out SHINE.
const CORE_VALUES = [
  {
    icon: HandHeart,
    title: "Service",
    description: "We show up for the communities we serve, not just in words but in the work we do.",
  },
  {
    icon: Sunrise,
    title: "Hope",
    description: "We believe things can get better, and we work every day to make that true.",
  },
  {
    icon: ShieldCheck,
    title: "Integrity",
    description: "We're honest about what we can do, and accountable for what's entrusted to us.",
  },
  {
    icon: Sprout,
    title: "Nurture",
    description: "We invest in people for the long run, not just for a single visit.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We hold our work to a high standard, because the people we serve deserve it.",
  },
];

const OBJECTIVES = [
  "Providing educational support and learning opportunities for children and youths.",
  "Empowering individuals through skills acquisition, mentorship, and capacity-building programmes.",
  "Supporting vulnerable members of society through outreach and welfare initiatives.",
  "Promoting community development through sustainable projects and partnerships.",
  "Encouraging leadership, innovation, and social responsibility among young people.",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Our Story"
        description="Imole Aibana Foundation started with a simple idea: that education, healthcare, and a bit of consistent support can change what's possible for a family. Imole means light in Yoruba, and that's what we're trying to bring to the communities we work in."
        photo={STOCK_PHOTOS.youthCelebration}
        maxWidth="max-w-3xl"
      />

      <section className="bg-background py-24 sm:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="glass-light rounded-3xl p-8 sm:p-10">
              <div className="glass-blue flex h-12 w-12 items-center justify-center rounded-2xl">
                <Eye size={22} />
              </div>
              <h2 className="mt-6 text-xl font-semibold text-navy-950 dark:text-white">
                Our Vision
              </h2>
              <p className="mt-3 leading-relaxed text-navy-700/80 dark:text-white/70">
                To empower lives, nurture dreams, and create a future where no one is left
                behind.
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
                To uplift lives through education, empowerment, and community-driven
                initiatives.
              </p>
            </div>
          </div>

          <div className="mx-auto mt-16 max-w-3xl">
            <h2 className="text-center text-xl font-semibold text-navy-950 dark:text-white">
              Our Objectives
            </h2>
            <ul className="mt-8 space-y-4">
              {OBJECTIVES.map((objective, i) => (
                <li key={objective} className="flex gap-4">
                  <span className="glass-gold flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold">
                    {i + 1}
                  </span>
                  <p className="pt-1 leading-relaxed text-navy-700/80 dark:text-white/70">
                    {objective}
                  </p>
                </li>
              ))}
            </ul>
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
              SHINE
            </h2>
            <p className="mt-3 text-base text-white/65">
              Our core values: Service, Hope, Integrity, Nurture, Excellence.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
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
              Hon. Sherif Aibana, Founder, Imole Aibana Foundation
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
