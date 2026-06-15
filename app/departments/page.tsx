import { Metadata } from "next";

import { DepartmentList } from "@/components/catalog/department-list";
import { StructuredData } from "@/components/seo/structured-data";
import { getDepartments, readManifest } from "@/lib/data/generated";
import { buildPageMetadata, absoluteUrl } from "@/lib/seo/site";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Subjects for Entrance Exam Practice",
    description:
      "Browse Ethiopian Grade 12 entrance exams by subject, compare available years, and open free practice sets with instant feedback.",
    path: "/departments",
    keywords: [
      "ethiopian entrance exam subjects",
      "grade 12 entrance exam practice ethiopia",
      "ethiopian entrance exam topics",
    ],
  }),
};

export const revalidate = 86400;

export default async function DepartmentsPage() {
  const departments = await getDepartments();
  const manifest = await readManifest();

  const itemList = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Ethiopian entrance exam subjects",
    url: absoluteUrl("/departments"),
    description:
      "Subject directory for Ethiopian Grade 12 entrance exam practice, including year coverage and question totals.",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: departments.length,
      itemListElement: departments.slice(0, 20).map((department, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: department.name,
        url: absoluteUrl(`/departments/${department.slug}`),
      })),
    },
    about: `${manifest?.stats.examCount ?? 0} Ethiopian entrance exam sets`,
  };

  return (
    <>
      <StructuredData id="departments-jsonld" data={itemList} />
      <DepartmentList departments={departments} />
    </>
  );
}
