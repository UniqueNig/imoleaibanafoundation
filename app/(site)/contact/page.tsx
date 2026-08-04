import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | Imole Aibana Foundation",
  description: "Get in touch with Imole Aibana Foundation.",
};

export default function ContactPage() {
  return (
    <div className="mesh-hero relative overflow-hidden py-28 sm:py-36">
      <div className="relative mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
            Get In Touch
          </span>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Contact Us
          </h1>
          <p className="mt-4 text-base leading-relaxed text-white/65 sm:text-lg">
            Questions about our programmes, a partnership idea, or just want to say hello? Send us
            a message.
          </p>
        </div>

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
      </div>
    </div>
  );
}
