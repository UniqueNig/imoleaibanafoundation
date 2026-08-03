"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, HeartHandshake, Sparkles, type LucideIcon } from "lucide-react";

type HeroSlide = {
  key: string;
  className: string;
  icon: LucideIcon;
  label: string;
  heading: [string, string];
  subtext: string;
};

// Placeholder backdrops standing in for real programme photography — swap
// for actual photos (via the same Cloudinary pipeline the CMS already uses)
// once the foundation has some to use. Blurred + scrimmed so hero text stays
// legible regardless of which slide is showing, in either theme.
export const HERO_SLIDES: HeroSlide[] = [
  {
    key: "education",
    className: "hero-slide-1",
    icon: BookOpen,
    label: "Education",
    heading: ["Illuminating Lives.", "Empowering Communities."],
    subtext:
      "Imole Aibana Foundation is dedicated to transforming lives through education, empowerment, and community-driven initiatives — bringing light to underserved communities and building pathways to lasting opportunity. From classroom support and medical outreach to mentorship and youth empowerment, we work directly alongside the communities we serve. Every donation, partnership, and volunteer hour moves that work forward.",
  },
  {
    key: "outreach",
    className: "hero-slide-2",
    icon: HeartHandshake,
    label: "Community Outreach",
    heading: ["Meeting Communities", "Where They Are."],
    subtext:
      "Our outreach teams go directly into underserved communities with food support, health screenings, and honest conversation about what's needed most. We don't parachute in for a single visit — we return, build trust, and design programmes around what the community actually asks for. That consistency is what turns outreach into lasting change.",
  },
  {
    key: "youth",
    className: "hero-slide-3",
    icon: Sparkles,
    label: "Youth Empowerment",
    heading: ["Shaping The Next", "Generation of Leaders."],
    subtext:
      "Young people are at the heart of everything we do. Through mentorship, skills training, and confidence-building programmes, we help students and young adults discover what they're capable of — and give them the tools, guidance, and opportunities to get there. Every mentee today is a mentor for someone else tomorrow.",
  },
];

export default function HeroSlideshow({
  index,
  onSelect,
}: {
  index: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-background">
      <AnimatePresence>
        {HERO_SLIDES.map(
          (slide, i) =>
            i === index && (
              <motion.div
                key={slide.key}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <div className={`absolute -inset-10 scale-110 blur-3xl ${slide.className}`} />
                <slide.icon
                  aria-hidden="true"
                  className="absolute right-[6%] top-1/2 -translate-y-1/2 text-navy-950/[0.04] dark:text-white/[0.05]"
                  size={520}
                  strokeWidth={1}
                />
              </motion.div>
            )
        )}
      </AnimatePresence>

      {/* Scrim on top of the blurred slide so hero text stays readable */}
      <div className="absolute inset-0 bg-white/35 dark:bg-navy-950/55" />

      <div className="absolute bottom-16 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {HERO_SLIDES.map((slide, i) => (
          <button
            key={slide.key}
            type="button"
            onClick={() => onSelect(i)}
            aria-label={`Show ${slide.label} slide`}
            className={`h-1.5 rounded-full transition-all ${
              i === index
                ? "w-6 bg-navy-950 dark:bg-white"
                : "w-1.5 bg-navy-950/25 hover:bg-navy-950/45 dark:bg-white/40 dark:hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
