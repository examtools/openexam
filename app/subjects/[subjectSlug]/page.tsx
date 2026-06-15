import { Metadata } from "next";
import Link from "next/link";
import { ExamCard } from "@/components/catalog/exam-card";
import { LandingFooter } from "@/components/landing/landing-footer";
import { StructuredData } from "@/components/seo/structured-data";
import { PageHeader } from "@/components/ui/page-header";
import { getSubjectBySlug, getSubjects } from "@/lib/data/generated";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo/site";

export const revalidate = 86400;

export async function generateStaticParams() {
  const subjects = await getSubjects();
  return subjects.map((subj) => ({ subjectSlug: subj.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subjectSlug: string }>;
}): Promise<Metadata> {
  const { subjectSlug } = await params;
  const data = await getSubjectBySlug(subjectSlug);

  if (!data) {
    return buildPageMetadata({
      title: "Subject not found",
      description: "The requested Ethiopian entrance exam subject page could not be found.",
      path: `/subjects/${subjectSlug}`,
      noIndex: true,
    });
  }

  const { subject } = data;

  return {
    ...buildPageMetadata({
      title: `${subject.name} Entrance Exam Practice`,
      description: `Practice ${subject.name} Ethiopian Grade 12 entrance exams with ${subject.examCount} exam sets and ${subject.totalPlayableQuestions} playable questions across ${subject.years.join(", ")}.`,
      path: `/subjects/${subject.slug}`,
      keywords: [
        `${subject.name} entrance exam`,
        `${subject.name} entrance exam practice`,
        `${subject.name} Ethiopian entrance exam questions`,
      ],
    }),
  };
}

export default async function SubjectPage({
  params,
}: {
  params: Promise<{ subjectSlug: string }>;
}) {
  const { subjectSlug } = await params;
  const data = await getSubjectBySlug(subjectSlug);

  if (!data) {
    return (
      <div className="page-bg min-h-screen flex flex-col">
        <main className="flex-1">
          <div className="mx-auto max-w-4xl px-6 py-16">
            <h1 className="text-2xl font-semibold text-brand-primaryDark">Subject not found</h1>
            <Link href="/subjects" className="mt-4 inline-flex text-sm text-brand-primary">
              Back to subjects
            </Link>
          </div>
        </main>
        <LandingFooter />
      </div>
    );
  }

  const { subject, exams } = data;
  const pageUrl = absoluteUrl(`/subjects/${subject.slug}`);
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
        item: absoluteUrl("/subjects"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: subject.name,
        item: pageUrl,
      },
    ],
  };
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${subject.name} Ethiopian entrance exams`,
    url: pageUrl,
    description: `Browse ${subject.name} entrance exam practice sets by year.`,
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
        <StructuredData id={`subj-breadcrumb-${subject.slug}`} data={breadcrumbSchema} />
        <StructuredData id={`subj-collection-${subject.slug}`} data={collectionSchema} />
        <PageHeader
          title={subject.name}
          eyebrow="Subjects"
          subtitle={`${subject.examCount} exams · ${subject.totalPlayableQuestions} playable questions`}
          backHref="/subjects"
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
