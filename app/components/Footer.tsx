import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import Logomark from "./Logomark";

const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "#",
    path: "M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z",
  },
  {
    label: "Instagram",
    href: "#",
    path: "M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.21.6 1.76 1.15.5.5.9 1.1 1.15 1.76.25.64.42 1.37.47 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 0 1-1.15 1.76 4.9 4.9 0 0 1-1.76 1.15c-.64.25-1.37.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 0 1-1.76-1.15 4.9 4.9 0 0 1-1.15-1.76c-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.21 1.15-1.76a4.9 4.9 0 0 1 1.76-1.15c.64-.25 1.37-.42 2.43-.47C8.94 2.01 9.28 2 12 2Zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4Zm5.2-8.4a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0Z",
  },
  {
    label: "X",
    href: "#",
    path: "M18.24 3H21l-6.44 7.36L22 21h-6.62l-4.62-6.03L5.4 21H2.62l6.9-7.88L2 3h6.78l4.18 5.5L18.24 3Zm-1.16 16.2h1.5L7.02 4.7H5.4L17.08 19.2Z",
  },
  {
    label: "YouTube",
    href: "#",
    path: "M22 12s0-3.14-.4-4.66a2.51 2.51 0 0 0-1.77-1.77C18.31 5.17 12 5.17 12 5.17s-6.31 0-7.83.4A2.51 2.51 0 0 0 2.4 7.34C2 8.86 2 12 2 12s0 3.14.4 4.66a2.51 2.51 0 0 0 1.77 1.77c1.52.4 7.83.4 7.83.4s6.31 0 7.83-.4a2.51 2.51 0 0 0 1.77-1.77c.4-1.52.4-4.66.4-4.66ZM10 15.2V8.8L15.5 12 10 15.2Z",
  },
];

const QUICK_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About Us" },
  { href: "#programmes", label: "Programmes & Projects" },
  { href: "/donate", label: "Donate" },
  { href: "/volunteer", label: "Volunteer / Partner" },
  { href: "/gallery", label: "Gallery" },
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-background">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href="#home" className="flex items-center gap-2.5">
              <Logomark className="h-8 w-8" />
              <span className="text-base font-semibold text-navy-950 dark:text-white">
                Imole Aibana Foundation
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-navy-700/70 dark:text-white/60">
              We work through education, empowerment, and community-driven
              programmes to bring light to the lives we touch. We partner
              with schools, volunteers, and donors to make that real.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="glass-light flex h-9 w-9 items-center justify-center rounded-full text-navy-700 transition-colors hover:text-navy-950 dark:text-white/80 dark:hover:text-white"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-navy-950 dark:text-white">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-navy-700/70 transition-colors hover:text-navy-950 dark:text-white/60 dark:hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-navy-950 dark:text-white">
              Get in Touch
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-navy-700/70 dark:text-white/60">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="mt-0.5 shrink-0 text-gold-600 dark:text-gold-400" />
                <span>Lagos, Nigeria</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={16} className="shrink-0 text-gold-600 dark:text-gold-400" />
                <a href="tel:+2340000000000" className="hover:text-navy-950 dark:hover:text-white">
                  +234 (0) 000 000 0000
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={16} className="shrink-0 text-gold-600 dark:text-gold-400" />
                <a
                  href="mailto:info@imoleaibanafoundation.org"
                  className="hover:text-navy-950 dark:hover:text-white"
                >
                  info@imoleaibanafoundation.org
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-navy-950/10 pt-8 text-xs text-navy-700/60 dark:border-white/10 dark:text-white/45">
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <p>&copy; {new Date().getFullYear()} Imole Aibana Foundation. All rights reserved.</p>
            <p>Registered Non-Profit Organization</p>
          </div>
          <p className="mt-3 text-center">
            Developed by{" "}
            <a
              href="https://emmanuelfaniyi.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-navy-700/70 underline decoration-navy-950/20 underline-offset-2 hover:text-navy-950 dark:text-white/60 dark:decoration-white/20 dark:hover:text-white"
            >
              Tech_with_Dami
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
