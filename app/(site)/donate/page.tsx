import type { Metadata } from "next";
import { Landmark } from "lucide-react";
import DonationForm from "./DonationForm";
import PageHero from "@/app/components/PageHero";
import { STOCK_PHOTOS } from "@/lib/placeholderPhoto";

export const metadata: Metadata = {
  title: "Donate | Imole Aibana Foundation",
  description: "Support our work through a bank transfer or a secure online donation.",
};

export default function DonatePage() {
  return (
    <PageHero
      eyebrow="Support Our Work"
      title="Donate"
      description="Every contribution, big or small, helps us reach more communities."
      photo={STOCK_PHOTOS.cleanWater}
      maxWidth="max-w-5xl"
    >
        <div className="mt-14 grid gap-6 lg:grid-cols-5">
          <div className="glass-light rounded-3xl p-8 sm:p-10 lg:col-span-2">
            <div className="glass-gold flex h-12 w-12 items-center justify-center rounded-2xl">
              <Landmark size={22} className="text-white" />
            </div>
            <h2 className="mt-6 text-xl font-semibold text-navy-950 dark:text-white">Bank Transfer</h2>
            <p className="mt-2 text-sm leading-relaxed text-navy-700/70 dark:text-white/60">
              Prefer a direct transfer? Use the account details below and send us your receipt by
              email so we can send a confirmation.
            </p>

            <dl className="mt-6 space-y-4 text-sm">
              <div>
                <dt className="text-navy-700/50 dark:text-white/45">Bank Name</dt>
                <dd className="font-medium text-navy-950 dark:text-white">Zenith Bank</dd>
              </div>
              <div>
                <dt className="text-navy-700/50 dark:text-white/45">Account Name</dt>
                <dd className="font-medium text-navy-950 dark:text-white">Imole Aibana Foundation</dd>
              </div>
              <div>
                <dt className="text-navy-700/50 dark:text-white/45">Account Number</dt>
                <dd className="font-medium text-navy-950 dark:text-white">1312341892</dd>
              </div>
            </dl>
          </div>

          <div className="glass rounded-3xl p-8 sm:p-10 lg:col-span-3">
            <h2 className="text-xl font-semibold text-white">Donate Online</h2>
            <p className="mt-2 text-sm leading-relaxed text-white/65">
              Pay securely by card or bank transfer via Paystack.
            </p>

            <div className="mt-6">
              <DonationForm />
            </div>
          </div>
        </div>
    </PageHero>
  );
}
