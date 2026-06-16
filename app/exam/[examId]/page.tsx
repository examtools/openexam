import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { StructuredData } from "@/components/seo/structured-data";
import { ExamClient } from "@/components/exam/exam-client";
import { PageHeader } from "@/components/ui/page-header";
import { getExamMetaById, readExamDataset, readManifest } from "@/lib/data/generated";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo/site";

export const revalidate = 86400;

export async function generateStaticParams() {
  const manifest = await readManifest();
  return (manifest?.exams ?? []).map((exam) => ({ examId: exam.examId }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ examId: string }>;
}): Promise<Metadata> {
  const { examId } = await params;
  const exam = await getExamMetaById(examId);

  if (!exam) {
    return buildPageMetadata({
      title: "Exam not found",
      description: "The requested Ethiopian entrance exam page could not be found.",
      path: `/exam/${examId}`,
      noIndex: true,
    });
  }

  return buildPageMetadata({
      title: `${exam.subjectName} ${exam.displayYear}${exam.variant === "model" ? " Model" : ""} Entrance Exam`,
    description: `Practice the ${exam.subjectName} ${exam.displayYear}${exam.variant === "model" ? " model" : ""} Ethiopian Grade 12 entrance exam with ${exam.playableQuestionCount} playable questions.`,
    path: `/exam/${exam.examId}`,
    keywords: [
        `${exam.subjectName} ${exam.displayYear} entrance exam`,
        `${exam.subjectName} entrance exam questions`,
        `${exam.subjectName} Ethiopian entrance exam practice`,
    ],
  });
}

export default async function ExamPage({ params }: { params: Promise<{ examId: string }> }) {
  const { examId } = await params;
  const dataset = await readExamDataset(examId);

  if (!dataset) {
    return (
      <div className="page-bg min-h-screen flex flex-col">
        <main className="flex-1">
          <div className="mx-auto max-w-4xl px-6 py-16">
            <h1 className="text-2xl font-semibold text-brand-primaryDark">Exam not found</h1>
            <Link href="/subjects" className="mt-4 inline-flex text-sm text-brand-primary">
              Back to subjects
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const label = `${dataset.meta.subjectName} / ${dataset.meta.displayYear}${
    dataset.meta.variant === "model" ? " Model" : ""
  } Entrance Exam`;
  const pageUrl = absoluteUrl(`/exam/${dataset.meta.examId}`);
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
        name: dataset.meta.subjectName,
        item: absoluteUrl(`/subjects/${dataset.meta.subjectSlug}`),
      },
      {
        "@type": "ListItem",
        position: 4,
        name: label,
        item: pageUrl,
      },
    ],
  };
  const learningResourceSchema = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: label,
    url: pageUrl,
    description: `Interactive Ethiopian entrance exam practice page for ${dataset.meta.subjectName}, ${dataset.meta.displayYear}.`,
    learningResourceType: "Practice Exam",
    educationalLevel: "Grade 12",
    isAccessibleForFree: true,
    inLanguage: "en",
    numberOfQuestions: dataset.meta.playableQuestionCount,
    about: dataset.meta.subjectName,
  };

  return (
    <div className="page-bg min-h-screen flex flex-col">
      <main className="flex-1">
        <StructuredData id={`exam-breadcrumb-${dataset.meta.examId}`} data={breadcrumbSchema} />
        <StructuredData id={`exam-resource-${dataset.meta.examId}`} data={learningResourceSchema} />
        <PageHeader
          title={label}
          eyebrow="Exam Session"
          subtitle={`${dataset.meta.playableQuestionCount} questions`}
          backHref={`/subjects/${dataset.meta.subjectSlug}`}
          backLabel={dataset.meta.subjectName}
        />
        <section className="page-section">
          <Suspense
              fallback={
                <div className="mx-auto max-w-5xl rounded-2xl border border-brand-border bg-brand-bg p-6 text-sm text-brand-textSecondary">
                  Loading the exam interface...
                </div>
              }
          >
            <ExamClient dataset={dataset} />
          </Suspense>
        </section>
      </main>
    </div>
  );
}
