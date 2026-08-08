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
          className="mb-8 inline-flex items-center justify-center gap-2 rounded-full border border-royal-400/40 bg-royal-500/15 px-4 py-1.5 text-xs font-semibold tracking-wide text-white sm:text-sm"
        >
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-royal-300" />
          <AnimatePresence mode="wait">
            <motion.span
              key={HERO_SLIDES[index].label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              {HERO_SLIDES[index].label} &middot; Lagos, Nigeria
            </motion.span>
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={HERO_SLIDES[index].key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-glow-gold text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-6xl">
                {HERO_SLIDES[index].heading[0]}
                <br />
                <span className="bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500 bg-clip-text text-transparent">
                  {HERO_SLIDES[index].heading[1]}
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
                {HERO_SLIDES[index].subtext}
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="/donate"
            className="glass-gold flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03] sm:text-base"
          >
            <HandCoins size={18} />
            Donate
          </a>
          <a
            href="/volunteer?tab=partner"
            className="glass flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03] sm:text-base"
          >
            <HeartHandshake size={18} />
            Partner With Us
          </a>
          <a
            href="/volunteer"
            className="flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white/85 transition-colors hover:border-white/50 hover:text-white sm:text-base"
          >
            <Users size={18} />
            Volunteer
          </a>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to learn more"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowDown size={22} />
      </motion.a>
    </section>
  );
}
