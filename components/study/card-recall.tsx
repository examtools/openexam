"use client";

import type { NormalizedQuestion } from "@/lib/exam/types";
import { RichContent } from "@/components/exam/rich-blocks";
import { Eye } from "lucide-react";

export function CardRecall({
  question,
  revealed,
  onReveal,
}: {
  question: NormalizedQuestion;
  revealed: boolean;
  onReveal: () => void;
}) {
  if (!revealed) {
    return (
      <div className="space-y-6">
        <div className="prose prose-sm max-w-none">
          <RichContent blocks={question.question} />
        </div>

        <button
          type="button"
          onClick={onReveal}
          className="flex w-full items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-brand-primary/40 bg-brand-primary/5 px-4 py-6 text-brand-primary transition hover:border-brand-primary/60 hover:bg-brand-primary/10 sm:px-6 sm:py-8"
        >
          <Eye className="h-6 w-6" />
          <span className="text-lg font-semibold">Tap to Reveal Answer</span>
        </button>
      </div>
    );
  }

  const correctAnswer = question.correctAnswers[0];
  const answerText = question.options[correctAnswer]
    ? question.options[correctAnswer].blocks
        .map((b) => (b.type === "text" ? b.text : ""))
        .join("")
    : "Answer not available";

  return (
    <div className="space-y-6">
      <div className="prose prose-sm max-w-none">
        <RichContent blocks={question.question} />
      </div>

      <div className="rounded-2xl border-2 border-brand-success bg-brand-success/5 p-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-success">
          Correct Answer
        </p>
        <p className="mt-2 text-lg font-semibold text-brand-text">
          {String.fromCharCode(65 + correctAnswer)}. {answerText}
        </p>
      </div>

      {question.explanation && (
        <div className="rounded-xl border border-brand-border bg-brand-bg p-4 text-sm text-brand-textSecondary">
          <RichContent blocks={[{ type: "text", text: question.explanation }]} />
        </div>
      )}
    </div>
  );
}
