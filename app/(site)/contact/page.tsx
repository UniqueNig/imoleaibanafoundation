import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import ContactForm from "./ContactForm";
import PageHero from "@/app/components/PageHero";

export const metadata: Metadata = {
  title: "Contact Us | Imole Aibana Foundation",
  description: "Get in touch with Imole Aibana Foundation.",
};

export default function ContactPage() {
  return (
    <PageHero
      eyebrow="Get In Touch"
      title="Contact Us"
      description="Questions about our programmes, a partnership idea, or just want to say hello? Send us a message."
      photoSeed="iaf-hero-contact"
      maxWidth="max-w-5xl"
    >
        <div className="mt-14 grid gap-6 lg:grid-cols-5">
          <div className="glass-light rounded-3xl p-8 sm:p-10 lg:col-span-2">
            <h2 className="text-xl font-semibold text-navy-950 dark:text-white">Reach Us Directly</h2>
            <ul className="mt-6 space-y-5 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-gold-600 dark:text-gold-400" />
                <span className="text-navy-700/80 dark:text-white/70">Lagos, Nigeria</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="shrink-0 text-gold-600 dark:text-gold-400" />
                <a
                  href="tel:+2340000000000"
                  className="text-navy-700/80 hover:text-navy-950 dark:text-white/70 dark:hover:text-white"
                >
                  +234 (0) 000 000 0000
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="shrink-0 text-gold-600 dark:text-gold-400" />
                <a
                  href="mailto:info@imoleaibanafoundation.org"
                  className="text-navy-700/80 hover:text-navy-950 dark:text-white/70 dark:hover:text-white"
                >
                  info@imoleaibanafoundation.org
                </a>
              </li>
            </ul>
          </div>

          <div className="glass rounded-3xl p-8 sm:p-10 lg:col-span-3">
            <h2 className="text-xl font-semibold text-white">Send a Message</h2>
            <p className="mt-2 text-sm leading-relaxed text-white/65">
              We usually reply within a few business days.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
    </PageHero>
  );
}
