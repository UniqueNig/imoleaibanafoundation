import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ThemeProviders from "./components/ThemeProviders";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Imole Aibana Foundation",
  description:
    "Transforming lives through education, empowerment, and community-driven initiatives.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProviders>{children}</ThemeProviders>
      </body>
    </html>
  );
}
