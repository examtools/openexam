import "@/app/globals.css";

import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SiteJsonLd } from "@/components/seo/site-jsonld";
import { absoluteUrl, siteConfig } from "@/lib/seo/site";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { SiteLogo } from "@/components/branding/site-logo";
import Link from "next/link";
import Script from "next/script";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  alternates: {
    canonical: "/",
  },
  category: "education",
  referrer: "origin-when-cross-origin",
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    images: [
      {
        url: absoluteUrl("/opengraph-image"),
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} social preview`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [absoluteUrl("/twitter-image")],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-ET" className={`${fraunces.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="page-shell relative">
        <header className="fixed inset-x-0 top-0 z-50 bg-brand-bg transition-colors">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-6">
            <SiteLogo linked size="sm" />
            <nav className="hidden items-center gap-1 sm:flex">
              <Link
                href="/subjects"
                className="rounded-lg px-4 py-2 text-sm font-medium text-brand-textSecondary transition-colors hover:bg-brand-surface hover:text-brand-text"
              >
                Subjects
              </Link>
              <Link
                href="/history"
                className="rounded-lg px-4 py-2 text-sm font-medium text-brand-textSecondary transition-colors hover:bg-brand-surface hover:text-brand-text"
              >
                History
              </Link>
              <Link
                href="/subjects"
                className="ml-2 rounded-xl bg-gradient-to-br from-brand-primary to-brand-primaryDark px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-brand-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                Get Started
              </Link>
            </nav>
            <div className="flex items-center gap-2">
              <ThemeToggle />
            </div>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <SiteJsonLd />
        <Analytics />
        <SpeedInsights />
      </body>
      <Script src="https://scripts.simpleanalyticscdn.com/latest.js" />
    </html>
  );
}
