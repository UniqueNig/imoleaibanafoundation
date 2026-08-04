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

const SITE_URL = "https://www.imoleaibanafoundation.com";
const SITE_DESCRIPTION =
  "Imole Aibana Foundation is a Nigerian non-profit working through education, healthcare outreach, mentorship, and community-driven programmes to bring light and opportunity to underserved communities.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Imole Aibana Foundation | Rebuilding Lives, Restoring Hope",
    template: "%s | Imole Aibana Foundation",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Imole Aibana Foundation",
    "Nigerian non-profit",
    "charity Nigeria",
    "education support Nigeria",
    "medical outreach Nigeria",
    "youth empowerment",
    "mentorship programme",
    "donate Nigeria charity",
    "community outreach Lagos",
  ],
  authors: [{ name: "Imole Aibana Foundation" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: SITE_URL,
    siteName: "Imole Aibana Foundation",
    title: "Imole Aibana Foundation | Rebuilding Lives, Restoring Hope",
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Imole Aibana Foundation | Rebuilding Lives, Restoring Hope",
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: "Imole Aibana Foundation",
  alternateName: "IAF",
  url: SITE_URL,
  logo: `${SITE_URL}/logo-icon.png`,
  description: SITE_DESCRIPTION,
  slogan: "Rebuilding lives, Restoring hope",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lagos",
    addressCountry: "NG",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+234-911-915-8748",
    email: "imoleaibanafoundation@gmail.com",
    contactType: "customer service",
  },
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
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <ThemeProviders>{children}</ThemeProviders>
      </body>
    </html>
  );
}
