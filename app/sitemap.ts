import type { MetadataRoute } from "next";

import { readManifest } from "@/lib/data/generated";
import { siteConfig } from "@/lib/seo/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const manifest = await readManifest();
  const baseUrl = siteConfig.url;
  const lastModified = manifest ? new Date(manifest.generatedAt) : new Date();

  const examEntries = (manifest?.exams ?? []).map((exam) => ({
    url: `${baseUrl}/exam/${exam.examId}`,
    lastModified,
  }));

  const subjectEntries = (manifest?.subjects ?? []).map((subj) => ({
    url: `${baseUrl}/subjects/${subj.slug}`,
    lastModified,
  }));

  return [
    { url: baseUrl, lastModified },
    { url: `${baseUrl}/subjects`, lastModified },
    ...subjectEntries,
    ...examEntries,
  ];
}
