"use client";

import { motion } from "framer-motion";
import { Eye, Target } from "lucide-react";
import { STOCK_PHOTOS } from "@/lib/placeholderPhoto";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function VisionMission() {
  return (
    <section id="about" className="relative overflow-hidden bg-background py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-royal-400/15 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-gold-400/15 blur-[110px]"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={STOCK_PHOTOS.classroom}
                alt=""
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 via-transparent to-transparent" />
            </div>
            <div className="glass-gold absolute -bottom-6 -right-4 hidden max-w-[15rem] rounded-2xl px-5 py-4 sm:block sm:-right-8">
              <p className="text-sm font-semibold text-white">
                &quot;None of this sticks unless the community helps shape it.&quot;
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-royal-500">
              Who We Are
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-navy-950 dark:text-white sm:text-4xl">
              Transforming lives through education and community
            </h2>
            <p className="mt-4 leading-relaxed text-navy-700/80 dark:text-white/70">
              Imole Aibana Foundation works to open up opportunity for
              underserved communities through education, empowerment, and
              hands-on outreach. We work closely with schools, families, local
              volunteers, and partner organizations, because none of this
              sticks unless the community is helping shape it.
            </p>

            <div className="mt-8 space-y-6">
              <div className="flex gap-4">
                <div className="glass-gold flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl">
                  <Eye size={20} className="text-navy-950 dark:text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy-950 dark:text-white">Our Vision</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-navy-700/80 dark:text-white/70">
                    A world where every individual, regardless of background, has
                    access to the light of education, opportunity, and dignity.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="glass-gold flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl">
                  <Target size={20} className="text-navy-950 dark:text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-navy-950 dark:text-white">Our Mission</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-navy-700/80 dark:text-white/70">
                    To transform lives through education, empowerment, and
                    sustainable community-driven initiatives that create
                    lasting, positive change.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
