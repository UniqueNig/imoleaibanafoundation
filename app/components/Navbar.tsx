"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Logomark from "./Logomark";
import ThemeToggle from "./ThemeToggle";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#programmes", label: "Programmes" },
  { href: "#events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "#blog", label: "Blog" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:px-6">
      <nav
        className={`glass-nav flex w-full max-w-6xl items-center justify-between rounded-2xl px-4 py-3 transition-[padding,box-shadow] duration-300 sm:px-6 ${
          scrolled ? "py-2.5" : "py-3.5"
        }`}
      >
        <Link href="#home" className="flex items-center gap-2.5">
          <Logomark className="h-8 w-8 shrink-0" />
          <span className="text-sm font-semibold tracking-wide text-white sm:text-base">
            Imole Aibana Foundation
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/75 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <a
            href="/volunteer"
            className="rounded-full px-4 py-2 text-sm font-medium text-white/85 transition-colors hover:text-white"
          >
            Volunteer
          </a>
          <a
            href="/donate"
            className="glass-gold rounded-full px-5 py-2 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
          >
            Donate
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-full text-white md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="absolute inset-x-4 top-[calc(100%+0.5rem)] flex flex-col gap-1 rounded-2xl border border-white/10 bg-navy-950/95 p-3 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:inset-x-6 md:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-2.5 text-sm font-medium text-white/85 hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/volunteer"
            onClick={() => setOpen(false)}
            className="rounded-xl px-3 py-2.5 text-sm font-medium text-white/85 hover:bg-white/10 hover:text-white"
          >
            Volunteer
          </a>
          <a
            href="/donate"
            onClick={() => setOpen(false)}
            className="glass-gold mt-1 rounded-xl px-3 py-2.5 text-center text-sm font-semibold text-white"
          >
            Donate
          </a>
          <div className="mt-1 flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium text-white/85">
            Theme
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  );
}
