import { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/site";
import { DocsContent } from "@/components/docs/docs-content";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Documentation",
    description:
      "Learn how to set up the project, generate questions with AI, understand the folder structure, run locally, and deploy.",
    path: "/docs",
  }),
};

export default function DocsPage() {
  return <DocsContent />;
}
