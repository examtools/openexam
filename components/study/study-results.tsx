"use client";

import type { NormalizedQuestion } from "@/lib/exam/types";
import type { StudySession } from "@/lib/study/types";
import { CheckCircle, XCircle, Sparkles, Brain, AlertTriangle } from "lucide-react";
import Link from "next/link";

const ratingMeta: Record<
  string,
  { label: string; icon: typeof Sparkles; color: string }
> = {
  easy: {
    label: "Easy",
    icon: Sparkles,
    color: "text-brand-success",
  },
  medium: {
    label: "Medium",
    icon: Brain,
    color: "text-brand-primary",
  },
  hard: {
    label: "Hard",
    icon: AlertTriangle,
    color: "text-brand-warning",
  },
  forgot: {
    label: "Forgot",
    icon: XCircle,
    color: "text-brand-error",
  },
};

export function StudyResults({
  session,
  cardStates,
  questions,
}: {
  session: StudySession;
  cardStates: Record<string, { selected: number[]; revealed: boolean; rated: boolean }>;
  questions: Record<string, NormalizedQuestion>;
}) {
  const correct = Object.entries(cardStates).filter(([key, state]) => {
    if (!state.rated) return false;
    const q = questions[key];
    if (!q) return false;
    return (
      state.selected.length > 0 &&
      q.correctAnswers.every((a) => state.selected.includes(a)) &&
      state.selected.length === q.correctAnswers.length
    );
  }).length;

  const total = Object.values(cardStates).filter((s) => s.rated).length;
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;

  const ratingCounts: Record<string, number> = {};
  for (const r of Object.values(session.ratings)) {
    ratingCounts[r] = (ratingCounts[r] ?? 0) + 1;
  }

  return (
    <div className="mx-auto max-w-2xl py-8">
      <div className="rounded-2xl border border-brand-border bg-brand-bg p-6 text-center">
        <h2 className="text-2xl font-bold text-brand-text">
          Session Complete!
        </h2>

        <div className="mt-8">
          <div className="text-6xl font-extrabold text-brand-primary">
            {pct}%
          </div>
          <p className="mt-2 text-sm text-brand-textSecondary">
            {correct} / {total} correct
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {Object.entries(ratingMeta).map(([key, meta]) => {
            const Icon = meta.icon;
            const count = ratingCounts[key] ?? 0;
            return (
              <div key={key} className="rounded-xl border border-brand-border bg-brand-surface p-3">
                <Icon className={`mx-auto h-5 w-5 ${meta.color}`} />
                <p className={`mt-1 text-lg font-bold ${meta.color}`}>
                  {count}
                </p>
                <p className="text-xs text-brand-textTertiary">{meta.label}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/study/new"
            className="rounded-xl bg-brand-primary px-6 py-3 text-sm font-semibold text-white text-center transition hover:bg-brand-primaryDark"
          >
            New Study Session
          </Link>
          <Link
            href="/study"
            className="rounded-xl border border-brand-border px-6 py-3 text-sm font-semibold text-brand-text text-center transition hover:bg-brand-surface"
          >
            Back to Study Home
          </Link>
        </div>
      </div>
    </div>
  );
}
