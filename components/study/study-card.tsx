"use client";

import type { NormalizedQuestion } from "@/lib/exam/types";
import type { ResponseMode, SrsRating, StudyCard as StudyCardType } from "@/lib/study/types";
import { CardMultipleChoice } from "@/components/study/card-multiple-choice";
import { CardRecall } from "@/components/study/card-recall";
import { CardAnswer } from "@/components/study/card-answer";
import { SrsFeedback } from "@/components/study/srs-feedback";

export function StudyCard({
  card,
  question,
  responseMode,
  selected,
  revealed,
  onSelect,
  onReveal,
  onRate,
  onNext,
}: {
  card: StudyCardType;
  question: NormalizedQuestion;
  responseMode: ResponseMode;
  selected: number[];
  revealed: boolean;
  onSelect: (index: number) => void;
  onReveal: () => void;
  onRate: (rating: SrsRating) => void;
  onNext: () => void;
}) {
  const isCorrect =
    selected.length > 0 &&
    question.correctAnswers.length > 0 &&
    question.correctAnswers.every((a) => selected.includes(a)) &&
    selected.length === question.correctAnswers.length;

  const actualMode =
    responseMode === "mix"
      ? Math.random() > 0.5
        ? "multiple-choice"
        : "recall"
      : responseMode;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-brand-border bg-brand-bg p-6">
        {actualMode === "multiple-choice" ? (
          <CardMultipleChoice
            question={question}
            selected={selected}
            revealed={revealed}
            onSelect={onSelect}
          />
        ) : (
          <CardRecall
            question={question}
            revealed={revealed}
            onReveal={onReveal}
          />
        )}
      </div>

      {revealed ? (
        <div className="space-y-4">
          <CardAnswer
            question={question}
            selected={selected}
            isCorrect={isCorrect}
          />

          <SrsFeedback onRate={onRate} />

          <button
            type="button"
            onClick={onNext}
            className="w-full rounded-xl bg-brand-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-primaryDark"
          >
            Next Card
          </button>
        </div>
      ) : actualMode === "multiple-choice" && selected.length > 0 ? (
        <button
          type="button"
          onClick={onReveal}
          className="w-full rounded-xl bg-brand-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-primaryDark"
        >
          Check Answer
        </button>
      ) : null}
    </div>
  );
}
