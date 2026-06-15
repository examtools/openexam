import { Metadata } from "next";
import { StudyHome } from "@/components/study/study-home";
import { buildPageMetadata } from "@/lib/seo/site";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Study Center",
    description:
      "Spaced repetition study sessions for Ethiopian Grade 12 entrance exam practice.",
    path: "/study",
  }),
};

export default function StudyPage() {
  return <StudyHome />;
}
