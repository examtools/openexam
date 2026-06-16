import type { Metadata } from "next";

export const siteConfig = {
  name: "Entrance Exam Practice",
  shortName: "Entrance Practice",
  url: "https://practice.bilsul.com",
  description:
    "Practice Ethiopian Grade 12 entrance exams with past questions, instant feedback, and realistic test mode.",
  locale: "en_ET",
  keywords: [
    "ethiopian entrance exam",
    "ethiopian grade 12 entrance exam practice",
    "entrance exam practice ethiopia",
    "ethiopian university entrance exam",
    "entrance exam past papers ethiopia",
    "ethiopian entrance exam questions",
    "ethiopian grade 12 entrance exam study app",
    "grade 12 entrance exams ethiopia",
    "ethiopian grade 12 students",
    "entrance exam",
    "euee",
    "ethiopian education",
    "ethiopian students",
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
