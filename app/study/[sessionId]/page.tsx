import { Metadata } from "next";
import { notFound } from "next/navigation";
import { StudySessionPageClient } from "@/components/study/study-session-client";
import { buildPageMetadata } from "@/lib/seo/site";
import { readStudySession } from "@/lib/storage/study-store";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}): Promise<Metadata> {
  const { sessionId } = await params;
  return buildPageMetadata({
    title: "Study Session",
    description: "Active study session for entrance exam practice.",
    path: `/study/${sessionId}`,
    noIndex: true,
  });
}

export default async function StudySessionPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = await params;

  return <StudySessionPageClient sessionId={sessionId} />;
}
