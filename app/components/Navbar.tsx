"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Logomark from "./Logomark";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/programmes", label: "Programmes" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b bg-background transition-shadow duration-300 ${
        scrolled
          ? "border-navy-950/10 shadow-sm dark:border-white/10"
          : "border-transparent"
      }`}
    >
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Imole Aibana Foundation">
          <Logomark className="h-8 w-8 shrink-0" />
          <span className="text-sm font-semibold tracking-wide text-navy-950 dark:text-white sm:text-base">
            IAF
          </span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 text-sm font-medium transition-colors ${
                  active
                    ? "text-royal-500 dark:text-royal-300"
                    : "text-navy-700/80 hover:text-royal-500 dark:text-white/75 dark:hover:text-royal-300"
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-royal-500 dark:bg-royal-300" />
                )}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/volunteer"
            className="rounded-full px-4 py-2 text-sm font-medium text-navy-700/80 transition-colors hover:text-royal-500 dark:text-white/85 dark:hover:text-royal-300"
          >
            Volunteer
          </Link>
          <Link
            href="/donate"
            className="glass-gold rounded-full px-5 py-2 text-sm font-semibold transition-transform hover:scale-[1.03]"
          >
            Donate
          </Link>
        </div>

        {/* Mobile: Donate stays visible next to the hamburger instead of being buried in the menu */}
        <div className="flex items-center gap-2 md:hidden">
          <Link href="/donate" className="glass-gold rounded-full px-3.5 py-1.5 text-xs font-semibold">
            Donate
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-navy-950 dark:text-white"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="absolute inset-x-4 top-full flex flex-col gap-1 rounded-2xl border border-navy-950/10 bg-background p-3 shadow-2xl shadow-navy-950/10 sm:inset-x-6 md:hidden dark:border-white/10 dark:shadow-black/40">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-2.5 text-sm font-medium text-navy-700/85 hover:bg-navy-950/5 hover:text-royal-500 dark:text-white/85 dark:hover:bg-white/10 dark:hover:text-royal-300"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/volunteer"
            onClick={() => setOpen(false)}
            className="rounded-xl px-3 py-2.5 text-sm font-medium text-navy-700/85 hover:bg-navy-950/5 hover:text-royal-500 dark:text-white/85 dark:hover:bg-white/10 dark:hover:text-royal-300"
          >
            Volunteer
          </Link>
        </div>
      )}
    </header>
  );
}
