"use client";

import { motion } from "framer-motion";
import { Eye, Target } from "lucide-react";

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
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-royal-500">
            Who We Are
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-navy-950 dark:text-white sm:text-4xl">
            Transforming lives through education and community
          </h2>
          <p className="mt-4 text-base leading-relaxed text-navy-700/80 dark:text-white/70 sm:text-lg">
            Imole Aibana Foundation exists to create pathways of opportunity
            for underserved communities — combining education, empowerment,
            and hands-on outreach to build lasting, positive change. We work
            hand-in-hand with schools, families, local volunteers, and
            partner organizations, because the change we're after only holds
            when the community itself is part of building it.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-light rounded-3xl p-8 sm:p-10"
          >
            <div className="glass-gold flex h-12 w-12 items-center justify-center rounded-2xl">
              <Eye size={22} className="text-navy-950 dark:text-white" />
            </div>
            <h3 className="mt-6 text-xl font-semibold text-navy-950 dark:text-white">
              Our Vision
            </h3>
            <p className="mt-3 leading-relaxed text-navy-700/80 dark:text-white/70">
              A world where every individual, regardless of background, has
              access to the light of education, opportunity, and dignity. We
              imagine communities where a child's postcode never limits their
              future, and where healthcare, mentorship, and a good education
              are treated as a starting point, not a privilege.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-light rounded-3xl p-8 sm:p-10"
          >
            <div className="glass-gold flex h-12 w-12 items-center justify-center rounded-2xl">
              <Target size={22} className="text-navy-950 dark:text-white" />
            </div>
            <h3 className="mt-6 text-xl font-semibold text-navy-950 dark:text-white">
              Our Mission
            </h3>
            <p className="mt-3 leading-relaxed text-navy-700/80 dark:text-white/70">
              To transform lives through education, empowerment, and
              sustainable community-driven initiatives that create lasting,
              positive change. We do this through direct programme delivery,
              partnerships with local organizations, and a growing network of
              volunteers and donors who show up for the communities we serve.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
