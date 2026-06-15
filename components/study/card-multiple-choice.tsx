"use client";

import type { NormalizedQuestion } from "@/lib/exam/types";
import { RichContent } from "@/components/exam/rich-blocks";
import { cn } from "@/lib/utils/cn";

export function CardMultipleChoice({
  question,
  selected,
  revealed,
  onSelect,
}: {
  question: NormalizedQuestion;
  selected: number[];
  revealed: boolean;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="prose prose-sm max-w-none">
        <RichContent blocks={question.question} />
      </div>

      <div className="space-y-3">
        {question.options.map((option, idx) => {
          const isSelected = selected.includes(idx);
          const showFeedback = revealed;
          const isCorrectOption =
            showFeedback && question.correctAnswers.includes(idx);
          const isWrongSelection =
            showFeedback && isSelected && !question.correctAnswers.includes(idx);

          return (
            <button
              key={option.key}
              type="button"
              disabled={revealed}
              onClick={() => onSelect(idx)}
              className={cn(
                "flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition",
                revealed
                  ? isCorrectOption
                    ? "border-brand-success bg-brand-success/10"
                    : isWrongSelection
                      ? "border-brand-error bg-brand-error/10"
                      : "border-brand-border opacity-60"
                  : isSelected
                    ? "border-brand-primary bg-brand-primary/10"
                    : "border-brand-border hover:border-brand-primary/40 hover:bg-brand-surface",
              )}
            >
              <span
                className={cn(
                  "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold",
                  revealed && isCorrectOption
                    ? "border-brand-success bg-brand-success text-white"
                    : revealed && isWrongSelection
                      ? "border-brand-error bg-brand-error text-white"
                      : isSelected
                        ? "border-brand-primary bg-brand-primary text-white"
                        : "border-brand-border text-brand-textTertiary",
                )}
              >
                {String.fromCharCode(65 + idx)}
              </span>
              <RichContent blocks={option.blocks} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
