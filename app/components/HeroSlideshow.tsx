"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, HeartHandshake, Sparkles, type LucideIcon } from "lucide-react";
import { STOCK_PHOTOS } from "@/lib/placeholderPhoto";

type HeroSlide = {
  key: string;
  photo: string;
  icon: LucideIcon;
  label: string;
  heading: [string, string];
  subtext: string;
};

// Placeholder photography standing in for real programme photos. Swap for
// actual photos (via the same Cloudinary pipeline the CMS already uses) once
// the foundation has some to use.
export const HERO_SLIDES: HeroSlide[] = [
  {
    key: "education",
    photo: STOCK_PHOTOS.classroom,
    icon: BookOpen,
    label: "Education",
    heading: ["Illuminating Lives.", "Empowering Communities."],
    subtext:
      "Imole Aibana Foundation supports children and families through education, healthcare, and hands-on community work. We fund school fees and learning materials, run medical outreach days, and mentor young people who need a bit of extra support. Every donation, partnership, and volunteer hour goes straight into that work.",
  },
  {
    key: "outreach",
    photo: STOCK_PHOTOS.medicalOutreach,
    icon: HeartHandshake,
    label: "Community Outreach",
    heading: ["Meeting Communities", "Where They Are."],
    subtext:
      "Our outreach team visits underserved communities with food, health screenings, and time to actually listen. We keep going back to the same places so the relationships and the trust can build over time, and so our programmes stay shaped by what people there tell us they need.",
  },
  {
    key: "youth",
    photo: STOCK_PHOTOS.youthCelebration,
    icon: Sparkles,
    label: "Youth Empowerment",
    heading: ["Shaping The Next", "Generation of Leaders."],
    subtext:
      "Young people are at the centre of our work. Through mentorship, practical skills training, and confidence-building sessions, we help students and young adults figure out what they want to do next, and give them a real path to get there.",
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
    <div className="absolute inset-0 overflow-hidden bg-navy-950">
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
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={slide.photo}
                  alt=""
                  className="h-full w-full scale-110 object-cover blur-sm"
                />
              </motion.div>
            )
        )}
      </AnimatePresence>

      {/* Scrim on top of the photo so hero text stays readable, always —
          this hero always renders light text over a dark photo regardless
          of the site theme toggle, same reasoning as .glass-nav. */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/97 via-navy-950/80 to-navy-950/55" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/60 via-transparent to-transparent" />

      <div className="absolute bottom-16 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {HERO_SLIDES.map((slide, i) => (
          <button
            key={slide.key}
            type="button"
            onClick={() => onSelect(i)}
            aria-label={`Show ${slide.label} slide`}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-6 bg-royal-400" : "w-1.5 bg-white/35 hover:bg-white/55"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
