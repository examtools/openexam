import type { NormalizedQuestion } from "@/lib/exam/types";

export function isSelectionCorrect(selected: number[], correct: number[]) {
  if (selected.length !== correct.length) {
    return false;
  }

  const selectedSet = new Set(selected);
  return correct.every((index) => selectedSet.has(index));
}

export function scoreExam(
  questions: NormalizedQuestion[],
  answers: Record<string, number[]>
): {
  total: number;
  correct: number;
  percent: number;
  review: Array<{ questionKey: string; selected: number[]; correct: number[]; isCorrect: boolean }>;
} {
  let correct = 0;

  const review = questions.map((question) => {
    const selected = answers[question.questionKey] ?? [];
    const isCorrect = isSelectionCorrect(selected, question.correctAnswers);

    if (isCorrect) {
      correct += 1;
    }

    return {
      questionKey: question.questionKey,
      selected,
      correct: question.correctAnswers,
      isCorrect,
    };
  });

  const total = questions.length;
  const percent = total > 0 ? Math.round((correct / total) * 10000) / 100 : 0;

  return { total, correct, percent, review };
}
