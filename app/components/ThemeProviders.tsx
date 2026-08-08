"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";

// Site is locked to light mode (see ThemeToggle removal from Navbar) —
// forcedTheme keeps next-themes from ever applying a `dark` class, even if
// a visitor's OS is set to dark or an old theme value is sitting in
// localStorage from before this was locked down.
export default function ThemeProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" forcedTheme="light" disableTransitionOnChange>
      {children}
      <Toaster position="top-right" richColors closeButton theme="light" />
    </ThemeProvider>
  );
}
