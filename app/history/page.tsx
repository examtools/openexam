import type { Metadata } from "next";
import { HistoryPageClient } from "@/components/history/history-page-client";
import { buildPageMetadata } from "@/lib/seo/site";

export const metadata: Metadata = buildPageMetadata({
  title: "Practice History",
  description: "Review your local practice history for Ethiopian entrance exams.",
  path: "/history",
  noIndex: true,
});

export default function HistoryPage() {
  return <HistoryPageClient />;
}
