import { Metadata } from "next";

import { LandingHero } from "@/components/landing/landing-hero";
import { LandingStats } from "@/components/landing/landing-stats";
import { LandingHowItWorks } from "@/components/landing/landing-how-it-works";
import { LandingFeatures } from "@/components/landing/landing-features";
import { LandingCta } from "@/components/landing/landing-cta";
import { getLandingFaqSchema } from "@/components/landing/landing-seo-sections";
import { StructuredData } from "@/components/seo/structured-data";
import { readManifest } from "@/lib/data/generated";
import { buildPageMetadata, siteConfig } from "@/lib/seo/site";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Open Exam Practice Tool",
    description:
      "An open-source, community-driven exam practice tool. Study any subject, contribute questions, practice with instant feedback, and realistic test mode.",
    path: "/",
    keywords: [
      "open source exam practice",
      "free exam practice tool",
      "community driven study questions",
      "exam preparation tool",
    ],
  }),
};

export default async function LandingPage() {
  const manifest = await readManifest();

  const defaultStats = {
    subjectCount: 0,
    examCount: 0,
    playableQuestionCount: 0,
  };

  const stats = manifest
    ? {
        subjectCount: manifest.subjects.length,
        examCount: manifest.stats.examCount,
        playableQuestionCount: manifest.stats.playableQuestionCount,
      }
    : defaultStats;

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Open Exam Practice Tool",
    url: siteConfig.url,
    description:
      "Open-source exam practice with subject pages, year-based exam sets, and realistic study tools.",
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
    </>
  );
}
