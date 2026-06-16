import { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/site";
import { StudyHome } from "@/components/study/study-home";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Study Center",
    description:
      "Spaced repetition study sessions for entrance exam practice.",
    path: "/study",
  }),
};

export default function StudyPage() {
  return <StudyHome />;
}
