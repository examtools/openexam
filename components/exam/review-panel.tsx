import type { NormalizedQuestion, PersistedAttempt } from "@/lib/exam/types";
import { RichContent } from "@/components/exam/rich-blocks";

export function ReviewPanel({ attempt, questions }: { attempt: PersistedAttempt; questions: NormalizedQuestion[] }) {
  const lookup = new Map(attempt.review.map((item) => [item.questionKey, item]));

  return (
    <div className="panel p-6">
      <h2 className="text-lg font-semibold text-brand-primaryDark">Review</h2>
      <div className="mt-4 space-y-6">
        {questions.map((question, idx) => {
          const review = lookup.get(question.questionKey);
          if (!review) return null;

          return (
            <div key={question.questionKey} className="rounded-xl border border-black/10 p-4">
              <p className="text-xs text-black/60">Question {idx + 1}</p>
              <div className="mt-2">
                <RichContent blocks={question.question} />
              </div>
              <div className="mt-3 space-y-2">
                {question.options.map((option, optionIndex) => {
                  const isCorrect = review.correct.includes(optionIndex);
                  const isSelected = review.selected.includes(optionIndex);
                  const bg = isCorrect
                    ? "bg-brand-success/10 border-brand-success"
                    : isSelected
                    ? "bg-brand-error/10 border-brand-error"
                    : "border-black/10";

                  return (
                    <div key={option.key} className={`rounded-lg border px-3 py-2 text-sm ${bg}`}>
                      <RichContent blocks={option.blocks} />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
