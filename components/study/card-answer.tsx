"use client";

import type { NormalizedQuestion } from "@/lib/exam/types";
import { RichContent } from "@/components/exam/rich-blocks";
import { CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export function CardAnswer({
  question,
  selected,
  isCorrect,
}: {
  question: NormalizedQuestion;
  selected: number[];
  isCorrect: boolean;
}) {
  return (
    <div className="space-y-4">
      <div
        className={cn(
          "flex items-center gap-3 rounded-xl border p-4",
          isCorrect
            ? "border-brand-success bg-brand-success/10"
            : "border-brand-error bg-brand-error/10",
        )}
      >
        {isCorrect ? (
          <CheckCircle className="h-6 w-6 shrink-0 text-brand-success" />
        ) : (
          <XCircle className="h-6 w-6 shrink-0 text-brand-error" />
        )}
        <div>
          <p className="font-semibold text-brand-text">
            {isCorrect ? "Correct" : "Incorrect"}
          </p>
          <p className="text-sm text-brand-textSecondary">
            {isCorrect
              ? "Great job! Rate how well you knew it."
              : "Review the correct answer below."}
          </p>
        </div>
      </div>

      {!isCorrect && question.correctAnswers.length > 0 && (
        <div className="rounded-xl border border-brand-border bg-brand-bg p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-textTertiary">
            Correct answer{question.correctAnswers.length > 1 ? "s" : ""}
          </p>
          <div className="mt-2 space-y-1">
            {question.correctAnswers.map((idx) => (
              <p key={idx} className="text-sm font-medium text-brand-success">
                {String.fromCharCode(65 + idx)}.{" "}
                {question.options[idx]?.blocks
                  .map((b) => (b.type === "text" ? b.text : ""))
                  .join("")}
              </p>
            ))}
          </div>
        </div>
      )}

      {question.explanation && (
        <div className="rounded-xl border border-brand-border bg-brand-bg p-4 text-sm leading-relaxed text-brand-textSecondary">
          <div className="prose prose-sm max-w-none">
            <RichContent
              blocks={[{ type: "text", text: question.explanation }]}
            />
          </div>
        </div>
      )}
    </div>
  );
}
