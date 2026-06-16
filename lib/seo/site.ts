import type { Metadata } from "next";

export const siteConfig = {
  name: "Open Exam Practice",
  shortName: "OpenExam",
  url: "https://practice.bilsul.com",
  description:
    "An open-source, community-driven exam practice tool. Study any subject, contribute questions, and practice for any exam.",
  locale: "en_US",
  keywords: [
    "open source exam practice",
    "exam practice tool",
    "study for any exam",
    "community driven questions",
    "free exam practice",
    "open study tool",
    "practice questions",
    "test preparation",
    "exam preparation",
    "study tool",
    "open source education",
  ],
} as const;

export const defaultOgImage = "/opengraph-image";

type BuildPageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article";
  noIndex?: boolean;
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

export function getFullTitle(title: string) {
  return title === siteConfig.name ? title : `${title} | ${siteConfig.name}`;
}

export function buildPageMetadata({
  title,
  description,
  path,
  keywords = [],
  type = "website",
  noIndex = false,
}: BuildPageMetadataOptions): Metadata {
  const fullTitle = getFullTitle(title);
  const canonical = path || "/";
  const image = absoluteUrl(defaultOgImage);

  return {
    title,
    description,
    keywords: [...siteConfig.keywords, ...keywords],
    alternates: {
      canonical,
    },
    category: "education",
    openGraph: {
      title: fullTitle,
      description,
      url: absoluteUrl(canonical),
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          nocache: true,
          googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
          },
        }
      : undefined,
  };
}
