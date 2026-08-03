"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  HeartHandshake,
  Stethoscope,
  Sparkles,
  Handshake,
  Rocket,
  type LucideIcon,
} from "lucide-react";

type FocusArea = {
  icon: LucideIcon;
  title: string;
  description: string;
  span: string;
};

const FOCUS_AREAS: FocusArea[] = [
  {
    icon: BookOpen,
    title: "Education Support",
    description:
      "Scholarships, learning materials, and school infrastructure support that keep children in the classroom and on a path to opportunity. We work with local schools to identify students most at risk of dropping out and support them for the long term, not just a single term.",
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    icon: HeartHandshake,
    title: "Community Outreach",
    description:
      "On-the-ground engagement that meets communities where they are and responds to their most pressing needs. From food and relief support to community dialogues, our outreach teams build relationships that outlast any single visit.",
    span: "lg:col-span-2",
  },
  {
    icon: Stethoscope,
    title: "Medical Outreach",
    description:
      "Free health screenings, basic care, and health education for underserved communities, run in partnership with volunteer medical professionals.",
    span: "",
  },
  {
    icon: Sparkles,
    title: "Youth Empowerment",
    description:
      "Skills training and confidence-building programmes that help young people thrive, from digital literacy to entrepreneurship basics.",
    span: "",
  },
  {
    icon: Handshake,
    title: "Mentorship Programmes",
    description:
      "Pairing beneficiaries with mentors who guide them through education, career, and personal growth — real relationships that continue well beyond any single programme cycle.",
    span: "lg:col-span-2",
  },
  {
    icon: Rocket,
    title: "Future Projects",
    description:
      "Expanding initiatives in vocational training, clean water access, and economic empowerment as we grow our reach into more communities.",
    span: "lg:col-span-2",
  },
];

export default function FocusAreas() {
  return (
    <section id="programmes" className="mesh-hero relative overflow-hidden py-24 sm:py-32">
      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
            What We Do
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Our Key Focus Areas
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/65 sm:text-lg">
            Programmes and projects designed to create real, sustainable
            impact across the communities we serve.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:auto-rows-[minmax(0,1fr)] lg:grid-cols-4">
          {FOCUS_AREAS.map((area, i) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
              className={`glass group flex flex-col justify-between rounded-3xl p-7 transition-transform hover:-translate-y-1 ${area.span}`}
            >
              <div>
                <div className="glass-gold flex h-11 w-11 items-center justify-center rounded-2xl">
                  <area.icon size={20} className="text-white" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">
                  {area.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-white/65">
                  {area.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
