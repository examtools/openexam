"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import type { PersistedAttempt } from "@/lib/exam/types";
import { PageHeader } from "@/components/ui/page-header";
import { readHistory } from "@/lib/storage/store";
import { formatDateTime, formatDuration } from "@/lib/utils/time";

export function HistoryPageClient() {
  const [history, setHistory] = useState<PersistedAttempt[]>([]);

  useEffect(() => {
    setHistory(readHistory());
  }, []);

  return (
    <div className="page-bg min-h-screen flex flex-col">
      <main className="flex-1">
        <PageHeader
          title="History"
          eyebrow="Open Exam Practice"
          subtitle="Review your previous attempts and keep improving."
          backHref="/subjects"
          backLabel="Subjects"
        />

        <section className="page-section mx-auto max-w-6xl">
          <div className="grid gap-6">
            {history.map((attempt) => (
              <div
                key={attempt.attemptId}
                className="rounded-2xl border border-brand-border bg-brand-bg p-6 md:flex md:items-center md:justify-between"
              >
                <div>
                  <h2 className="text-lg font-semibold text-brand-text">
                    {attempt.subjectName} · {attempt.displayYear}{" "}
                    {attempt.variant === "model" ? "Model" : ""}
                  </h2>
                  <p className="mt-1 text-sm text-brand-textSecondary">
                    {attempt.mode.toUpperCase()} · {formatDateTime(attempt.completedAt)} ·{" "}
                    {formatDuration(attempt.durationSec)}
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-4 text-sm md:mt-0">
                  <span className="font-semibold text-brand-text">
                    {attempt.score}/{attempt.totalQuestions} ({attempt.percent}%)
                  </span>
                  <Link
                    href={`/exam/${attempt.examId}?review=${attempt.attemptId}`}
                    className="rounded-full border border-brand-primary bg-brand-primary/8 px-4 py-2 text-xs font-semibold text-brand-primary"
                  >
                    Review
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {history.length === 0 && (
            <p className="mt-8 text-sm text-brand-textSecondary">No attempts yet. Start practicing!</p>
          )}
        </section>
      </main>
    </div>
  );
}
