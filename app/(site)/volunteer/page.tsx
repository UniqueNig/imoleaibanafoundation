import type { Metadata } from "next";
import { Suspense } from "react";
import VolunteerPartnerForms from "./VolunteerPartnerForms";

export const metadata: Metadata = {
  title: "Volunteer & Partner With Us — Imole Aibana Foundation",
  description: "Join us as a volunteer or explore a partnership with Imole Aibana Foundation.",
};

export default function VolunteerPage() {
  return (
    <div className="mesh-hero relative overflow-hidden py-28 sm:py-36">
      <div className="relative mx-auto max-w-3xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
            Get Involved
          </span>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Volunteer or Partner With Us
          </h1>
          <p className="mt-4 text-base leading-relaxed text-white/65 sm:text-lg">
            Whether you want to give your time or explore a partnership for your organization,
            we&apos;d love to hear from you.
          </p>
        </div>

        <div className="mt-14">
          <Suspense fallback={null}>
            <VolunteerPartnerForms />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
