import { Metadata } from "next";
import { StudyDashboard } from "@/components/study/study-dashboard";
import { buildPageMetadata } from "@/lib/seo/site";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Study Dashboard",
    description:
      "View your study statistics, retention rates, and spaced repetition progress.",
    path: "/study/dashboard",
  }),
};

export default function DashboardPage() {
  return <StudyDashboard />;
}
