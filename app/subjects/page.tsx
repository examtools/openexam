import { Metadata } from "next";

import { SubjectList } from "@/components/catalog/subject-list";
import { StructuredData } from "@/components/seo/structured-data";
import { getSubjects, readManifest } from "@/lib/data/generated";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo/site";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Subjects for Entrance Exam Practice",
    description:
      "Browse Ethiopian Grade 12 entrance exams by subject, compare available years, and open free practice sets with instant feedback.",
    path: "/subjects",
    keywords: [
      "ethiopian entrance exam subjects",
      "grade 12 entrance exam practice ethiopia",
      "ethiopian entrance exam topics",
    ],
  }),
};

export const revalidate = 86400;

export default async function SubjectsPage() {
  const subjects = await getSubjects();
  const manifest = await readManifest();

  const itemList = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Ethiopian entrance exam subjects",
    url: absoluteUrl("/subjects"),
    description:
      "Subject directory for Ethiopian Grade 12 entrance exam practice, including year coverage and question totals.",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: subjects.length,
      itemListElement: subjects.slice(0, 20).map((subject, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: subject.name,
        url: absoluteUrl(`/subjects/${subject.slug}`),
      })),
    },
    about: `${manifest?.stats.examCount ?? 0} Ethiopian entrance exam sets`,
  };

  return (
    <>
      <StructuredData id="subjects-jsonld" data={itemList} />
      <SubjectList subjects={subjects} />
    </>
  );
}
