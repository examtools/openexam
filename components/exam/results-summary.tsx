"use client";

import { CheckCircle2, Clock3, XCircle } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { formatDuration } from "@/lib/utils/time";
import type { PersistedAttempt } from "@/lib/exam/types";

interface ResultsSummaryProps {
  attempt: PersistedAttempt;
  passThreshold: number;
  onRetry: () => void;
  onReview: () => void;
}

export function ResultsSummary({ attempt, passThreshold, onRetry, onReview }: ResultsSummaryProps) {
  const isPass = attempt.percent >= passThreshold;

  return (
    <div className="space-y-6">
      <div className="panel p-6 text-center">
        <div
          className={cn(
            "mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full",
            isPass ? "bg-brand-success/20" : "bg-brand-error/20"
          )}
        >
          {isPass ? (
            <CheckCircle2 className="h-10 w-10 text-brand-success" aria-hidden="true" />
          ) : (
            <XCircle className="h-10 w-10 text-brand-error" aria-hidden="true" />
          )}
        </div>

        <h2 className="text-2xl font-bold text-brand-primaryDark">
          {isPass ? "Congratulations!" : "Keep Practicing!"}
        </h2>
        <p className="mt-2 text-black/60">
          {isPass
            ? "You passed the exam!"
            : `You need ${passThreshold}% to pass. Keep practicing!`}
        </p>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-black/5 p-4">
            <div className="text-3xl font-bold text-brand-primaryDark">
              {attempt.percent}%
            </div>
            <div className="text-xs text-black/60">Score</div>
          </div>
          <div className="rounded-xl bg-black/5 p-4">
            <div className="text-3xl font-bold text-brand-primaryDark">
              {attempt.correctCount}/{attempt.totalQuestions}
            </div>
            <div className="text-xs text-black/60">Correct</div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center gap-6 text-sm text-black/60">
          <div className="flex items-center gap-2">
            <Clock3 className="h-4 w-4" aria-hidden="true" />
            {formatDuration(attempt.durationSec)}
          </div>
          <div className="flex items-center gap-2">
            <span className={cn(
              "px-2 py-0.5 rounded text-xs font-semibold",
              attempt.mode === "test" ? "bg-brand-accent/20 text-brand-accent" : "bg-brand-primary/20 text-brand-primary"
            )}>
              {attempt.mode.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onReview}
          className="flex-1 rounded-xl border border-black/10 py-3 text-sm font-semibold text-brand-primaryDark transition hover:bg-black/5"
        >
          Review Answers
        </button>
        <button
          onClick={onRetry}
          className="flex-1 rounded-xl bg-brand-primary py-3 text-sm font-semibold text-white transition hover:bg-brand-primaryDark"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
