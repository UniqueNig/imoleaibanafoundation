"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { LayoutDashboard, LogOut, CalendarDays, Newspaper, Images, Menu, X } from "lucide-react";
import Logomark from "@/app/components/Logomark";
import { logout } from "@/app/admin/actions";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/events", label: "Events", icon: CalendarDays },
  { href: "/admin/posts", label: "Blog Posts", icon: Newspaper },
  { href: "/admin/gallery", label: "Gallery", icon: Images },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  // Close the mobile drawer on navigation (covers Link clicks and back/forward).
  useEffect(() => setOpen(false), [pathname]);

  function handleLogout() {
    startTransition(async () => {
      await logout();
      toast.success("Logged out");
      router.push("/admin/login");
      router.refresh();
    });
  }

  const navLinks = (
    <nav className="flex-1 space-y-1 px-3">
      {NAV_ITEMS.map((item) => {
        const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
              active ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5 hover:text-white"
            }`}
          >
            <item.icon size={17} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  const logoutButton = (
    <div className="px-3 pb-5">
      <button
        type="button"
        onClick={handleLogout}
        disabled={pending}
        className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white disabled:opacity-60"
      >
        <LogOut size={17} />
        {pending ? "Logging out…" : "Log Out"}
      </button>
    </div>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="flex items-center justify-between bg-navy-950 px-4 py-3.5 text-white sm:hidden">
        <div className="flex items-center gap-2.5">
          <Logomark className="h-7 w-7" />
          <span className="text-sm font-semibold">IAF Admin</span>
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 hover:text-white"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Mobile drawer overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 sm:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-navy-950 text-white transition-transform duration-300 sm:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-5">
          <div className="flex items-center gap-2.5">
            <Logomark className="h-8 w-8" />
            <span className="text-sm font-semibold">IAF Admin</span>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>
        {navLinks}
        {logoutButton}
      </aside>

      {/* Desktop static sidebar */}
      <aside className="hidden shrink-0 flex-col border-white/10 bg-navy-950 text-white sm:flex sm:h-screen sm:w-60 sm:border-r">
        <div className="flex items-center gap-2.5 px-5 py-5">
          <Logomark className="h-8 w-8" />
          <span className="text-sm font-semibold">IAF Admin</span>
        </div>
        {navLinks}
        {logoutButton}
      </aside>
    </>
  );
}
