import type { Metadata } from "next";
import { Suspense } from "react";
import VolunteerPartnerForms from "./VolunteerPartnerForms";
import PageHero from "@/app/components/PageHero";
import { STOCK_PHOTOS } from "@/lib/placeholderPhoto";

export const metadata: Metadata = {
  title: "Volunteer & Partner With Us | Imole Aibana Foundation",
  description: "Join us as a volunteer or explore a partnership with Imole Aibana Foundation.",
};

export default function VolunteerPage() {
  return (
    <PageHero
      eyebrow="Get Involved"
      title="Volunteer or Partner With Us"
      description="Whether you want to give your time or explore a partnership for your organization, we'd love to hear from you."
      photo={STOCK_PHOTOS.youthEvent}
      maxWidth="max-w-3xl"
    >
      <div className="mt-14">
        <Suspense fallback={null}>
          <VolunteerPartnerForms />
        </Suspense>
      </div>
    </PageHero>
  );
}
