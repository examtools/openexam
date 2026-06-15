import { Metadata } from "next";
import { Suspense } from "react";
import { readManifest } from "@/lib/data/generated";
import { StudyConfig } from "@/components/study/study-config";
import { buildPageMetadata } from "@/lib/seo/site";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "New Study Session",
    description:
      "Configure a new spaced repetition study session for entrance exam practice.",
    path: "/study/new",
  }),
};

export default async function NewStudyPage() {
  const manifest = await readManifest();

  if (!manifest) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-16 text-center">
        <p className="text-brand-textSecondary">
          No exam data available. Run the build first.
        </p>
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-3xl px-5 py-16 text-center">
          <p className="text-brand-textSecondary">Loading...</p>
        </div>
      }
    >
      <StudyConfig manifest={manifest} />
    </Suspense>
  );
}
