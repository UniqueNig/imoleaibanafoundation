"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid a hydration mismatch: the real theme is only known client-side
  // (next-themes reads localStorage/matchMedia after mount).
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition-colors hover:text-white ${className}`}
    >
      {mounted && (isDark ? <Sun size={17} /> : <Moon size={17} />)}
    </button>
  );
}
