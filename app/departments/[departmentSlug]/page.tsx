import { Metadata } from "next";
import Link from "next/link";
import { ExamCard } from "@/components/catalog/exam-card";
import { LandingFooter } from "@/components/landing/landing-footer";
import { StructuredData } from "@/components/seo/structured-data";
import { PageHeader } from "@/components/ui/page-header";
import { getDepartmentBySlug, getDepartments } from "@/lib/data/generated";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo/site";

export const revalidate = 86400;

export async function generateStaticParams() {
  const departments = await getDepartments();
  return departments.map((dept) => ({ departmentSlug: dept.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ departmentSlug: string }>;
}): Promise<Metadata> {
  const { departmentSlug } = await params;
  const data = await getDepartmentBySlug(departmentSlug);

  if (!data) {
    return buildPageMetadata({
      title: "Department not found",
      description: "The requested Ethiopian entrance exam subject page could not be found.",
      path: `/departments/${departmentSlug}`,
      noIndex: true,
    });
  }

  const { department } = data;

  return {
    ...buildPageMetadata({
      title: `${department.name} Entrance Exam Practice`,
      description: `Practice ${department.name} Ethiopian Grade 12 entrance exams with ${department.examCount} exam sets and ${department.totalPlayableQuestions} playable questions across ${department.years.join(", ")}.`,
      path: `/departments/${department.slug}`,
      keywords: [
        `${department.name} entrance exam`,
        `${department.name} entrance exam practice`,
        `${department.name} Ethiopian entrance exam questions`,
      ],
    }),
  };
}

export default async function DepartmentPage({
  params,
}: {
  params: Promise<{ departmentSlug: string }>;
}) {
  const { departmentSlug } = await params;
  const data = await getDepartmentBySlug(departmentSlug);

  if (!data) {
    return (
      <div className="page-bg min-h-screen flex flex-col">
        <main className="flex-1">
          <div className="mx-auto max-w-4xl px-6 py-16">
            <h1 className="text-2xl font-semibold text-brand-primaryDark">Subject not found</h1>
            <Link href="/departments" className="mt-4 inline-flex text-sm text-brand-primary">
              Back to subjects
            </Link>
          </div>
        </main>
        <LandingFooter />
      </div>
    );
  }

  const { department, exams } = data;
  const pageUrl = absoluteUrl(`/departments/${department.slug}`);
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Subjects",
        item: absoluteUrl("/departments"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: department.name,
        item: pageUrl,
      },
    ],
  };
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${department.name} Ethiopian entrance exams`,
    url: pageUrl,
    description: `Browse ${department.name} entrance exam practice sets by year.`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: exams.length,
      itemListElement: exams.map((exam, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: exam.label,
        url: absoluteUrl(`/exam/${exam.examId}`),
      })),
    },
  };

  return (
    <div className="page-bg min-h-screen flex flex-col">
      <main className="flex-1">
        <StructuredData id={`dept-breadcrumb-${department.slug}`} data={breadcrumbSchema} />
        <StructuredData id={`dept-collection-${department.slug}`} data={collectionSchema} />
        <PageHeader
          title={department.name}
          eyebrow="Subjects"
          subtitle={`${department.examCount} exams · ${department.totalPlayableQuestions} playable questions`}
          backHref="/departments"
          backLabel="All subjects"
        />

        <section className="page-section mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-2">
            {exams.map((exam) => (
              <ExamCard key={exam.examId} exam={exam} />
            ))}
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
