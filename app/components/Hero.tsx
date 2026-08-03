"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, HeartHandshake, HandCoins, Users } from "lucide-react";
import HeroSlideshow, { HERO_SLIDES } from "./HeroSlideshow";

const SLIDE_INTERVAL_MS = 6000;

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % HERO_SLIDES.length), SLIDE_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-32 pb-20"
    >
      <HeroSlideshow index={index} onSelect={setIndex} />

      <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center">
        <motion.div
          layout
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-light mb-8 inline-flex items-center justify-center rounded-full px-4 py-1.5 text-xs font-medium tracking-wide text-navy-950 dark:text-white/85 sm:text-sm"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={HERO_SLIDES[index].label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              {HERO_SLIDES[index].label}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-glow-gold text-4xl font-semibold leading-[1.1] tracking-tight text-navy-950 dark:text-white sm:text-6xl"
        >
          Illuminating Lives.
          <br />
          <span className="bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 bg-clip-text text-transparent dark:from-gold-300 dark:via-gold-400 dark:to-gold-500">
            Empowering Communities.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-navy-700/80 dark:text-white/70 sm:text-lg"
        >
          Imole Aibana Foundation is dedicated to transforming lives through
          education, empowerment, and community-driven initiatives — bringing
          light to underserved communities and building pathways to lasting
          opportunity. From classroom support and medical outreach to
          mentorship and youth empowerment, we work directly alongside the
          communities we serve. Every donation, partnership, and volunteer
          hour moves that work forward.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#donate"
            className="glass-gold flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-navy-950 transition-transform hover:scale-[1.03] dark:text-white sm:text-base"
          >
            <HandCoins size={18} />
            Donate
          </a>
          <a
            href="#contact"
            className="glass-light flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-navy-950 transition-transform hover:scale-[1.03] dark:text-white sm:text-base"
          >
            <HeartHandshake size={18} />
            Partner With Us
          </a>
          <a
            href="#volunteer"
            className="flex items-center gap-2 rounded-full border border-navy-950/25 px-6 py-3 text-sm font-semibold text-navy-700 transition-colors hover:border-navy-950/50 hover:text-navy-950 dark:border-white/25 dark:text-white/85 dark:hover:border-white/50 dark:hover:text-white sm:text-base"
          >
            <Users size={18} />
            Volunteer
          </a>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to learn more"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-navy-950/40 dark:text-white/50"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowDown size={22} />
      </motion.a>
    </section>
  );
}
