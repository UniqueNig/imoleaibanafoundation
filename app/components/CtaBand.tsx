"use client";

import { motion } from "framer-motion";
import { HandCoins, HeartHandshake, Users } from "lucide-react";
import { placeholderPhoto } from "@/lib/placeholderPhoto";

export default function CtaBand() {
  return (
    <section id="donate" className="relative overflow-hidden bg-background py-24 sm:py-28">
      <div className="relative mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[2.5rem] px-8 py-14 text-center sm:px-16 sm:py-16"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={placeholderPhoto("iaf-cta", 1600, 900)}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-navy-950/92 via-navy-950/85 to-navy-950/75" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold-400/25 blur-[90px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-royal-400/25 blur-[90px]"
          />

          <div className="relative">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Ready to Be Part of the Light?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
              A donation, a partnership, or your time all help us reach more
              lives.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <a
                href="/donate"
                className="glass-gold flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03] sm:text-base"
              >
                <HandCoins size={18} />
                Donate Now
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
                Become a Volunteer
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
