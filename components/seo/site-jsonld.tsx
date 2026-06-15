import { readManifest } from "@/lib/data/generated";
import { absoluteUrl, siteConfig } from "@/lib/seo/site";
import { StructuredData } from "@/components/seo/structured-data";

export async function SiteJsonLd() {
  const manifest = await readManifest();

  const data = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: absoluteUrl("/exitLogo.png"),
      image: absoluteUrl("/exitLogo.png"),
      description: siteConfig.description,
      sameAs: [
        "https://t.me/alyahsoftware",
        "https://linkedin.com/company/alyahsoftware",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
      description: siteConfig.description,
      inLanguage: "en-ET",
      about: "Ethiopian Grade 12 entrance exam practice",
      publisher: {
        "@type": "Organization",
        name: siteConfig.name,
      },
      mainEntity: {
        "@type": "ItemList",
        name: "Ethiopian entrance exam subjects",
        numberOfItems: manifest?.subjects.length ?? 0,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Entrance Exam Catalog",
      url: absoluteUrl("/subjects"),
      description:
        "Browse Ethiopian entrance exams by subject, year, and available question volume.",
      isPartOf: {
        "@type": "WebSite",
        name: siteConfig.name,
        url: siteConfig.url,
      },
    },
  ];

  return <StructuredData id="site-jsonld" data={data} />;
}
