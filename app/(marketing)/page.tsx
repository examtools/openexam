import { Metadata } from "next";

import { LandingHero } from "@/components/landing/landing-hero";
import { LandingStats } from "@/components/landing/landing-stats";
import { LandingHowItWorks } from "@/components/landing/landing-how-it-works";
import { LandingFeatures } from "@/components/landing/landing-features";
import { LandingCta } from "@/components/landing/landing-cta";
import { LandingFooter } from "@/components/landing/landing-footer";
import { getLandingFaqSchema } from "@/components/landing/landing-seo-sections";
import { StructuredData } from "@/components/seo/structured-data";
import { readManifest } from "@/lib/data/generated";
import { buildPageMetadata, siteConfig } from "@/lib/seo/site";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Entrance Exam Practice Platform",
    description:
      "Free Ethiopian entrance exam practice platform by Alyah Technologies. Practice with past questions, subject filters, realistic test mode, and instant review.",
    path: "/",
    keywords: [
      "alyah technologies entrance exam",
      "ethiopian entrance exam practice app",
      "free ethiopian entrance exam practice",
      "ethiopian grade 12 entrance exam questions",
    ],
  }),
};

export default async function LandingPage() {
  const manifest = await readManifest();

  const defaultStats = {
    departmentCount: 0,
    examCount: 0,
    playableQuestionCount: 0,
  };

  const stats = manifest
    ? {
        departmentCount: manifest.departments.length,
        examCount: manifest.stats.examCount,
        playableQuestionCount: manifest.stats.playableQuestionCount,
      }
    : defaultStats;

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Entrance Exam Practice Platform",
    url: siteConfig.url,
    description:
      "Free Ethiopian entrance exam practice with subject pages, year-based exam sets, and realistic study tools.",
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <>
      <StructuredData id="landing-page-jsonld" data={websiteSchema} />
      <StructuredData id="landing-faq-jsonld" data={getLandingFaqSchema()} />
      <LandingHero />
      <LandingStats stats={stats} />
      <LandingHowItWorks />
      <LandingFeatures />
      <LandingCta />
      <LandingFooter />
    </>
  );
}
