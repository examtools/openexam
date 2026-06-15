import Link from "next/link";
import { ChevronRight } from "lucide-react";

import type { ExamMeta } from "@/lib/exam/types";
import { Pill } from "@/components/ui/pill";

export function ExamCard({ exam }: { exam: ExamMeta }) {
  return (
    <Link
      href={`/exam/${exam.examId}`}
      className="group block rounded-3xl border border-brand-border bg-brand-bg/70 p-6 transition hover:border-brand-primary/30 hover:bg-brand-surface"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-brand-primary/60">Entrance Exam</p>
          <h3 className="mt-2 text-2xl font-semibold text-brand-primaryDark group-hover:text-brand-primary">
            {exam.label}
          </h3>
          <p className="mt-2 text-sm text-brand-textSecondary">
            {exam.playableQuestionCount} questions · {exam.invalidQuestionCount} skipped
          </p>
        </div>
        {exam.variant === "model" && (
          <Pill className="border-brand-accent/60 bg-brand-accent/30 text-brand-primaryDark">Model</Pill>
        )}
      </div>
      <div className="mt-6 flex items-center justify-between">
        <span className="text-sm font-medium text-brand-primaryDark group-hover:text-brand-primary">
          Start Exam
        </span>
        <ChevronRight
          className="h-5 w-5 text-brand-primary/60 transition-transform group-hover:translate-x-1"
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}
