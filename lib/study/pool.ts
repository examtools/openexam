import type { Manifest, ExamMeta } from "@/lib/exam/types";
import type { CardReview, StudyCard, StudyPool } from "@/lib/study/types";

function resolvePoolExamIds(
  pool: StudyPool,
  manifest: Manifest,
): ExamMeta[] {
  switch (pool.type) {
    case "all-subjects":
      return manifest.exams;
    case "subject":
      return manifest.exams.filter(
        (e) => e.subjectSlug === pool.subjectSlug,
      );
    case "exam": {
      const meta = manifest.exams.find((e) => e.examId === pool.examId);
      return meta ? [meta] : [];
    }
    case "custom":
      return manifest.exams.filter((e) =>
        pool.examIds.includes(e.examId),
      );
  }
}

export function resolvePoolCards(
  pool: StudyPool,
  manifest: Manifest,
): StudyCard[] {
  const metas = resolvePoolExamIds(pool, manifest);

  const cards: StudyCard[] = [];

  for (const meta of metas) {
    for (let i = 0; i < meta.playableQuestionCount; i++) {
      const questionKey = `q_${i}`;
      cards.push({
        globalKey: `${meta.examId}::${questionKey}`,
        examId: meta.examId,
        questionKey,
        source: {
          subjectName: meta.subjectName,
          displayYear: meta.displayYear,
          label: meta.label,
        },
      });
    }
  }

  return cards;
}

export function shuffleCards<T>(cards: T[]): T[] {
  const copy = [...cards];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function composeSessionCards(
  allCards: StudyCard[],
  cardCount: number,
  reviews: Map<string, CardReview>,
): StudyCard[] {
  const now = Date.now();

  const dueCards = allCards.filter((c) => {
    const review = reviews.get(c.globalKey);
    return review && review.nextReviewAt <= now;
  });

  const reviewSet = new Set(reviews.keys());
  const newCards = allCards.filter((c) => !reviewSet.has(c.globalKey));

  let selected: StudyCard[];

  if (dueCards.length >= cardCount) {
    selected = shuffleCards(dueCards).slice(0, cardCount);
  } else {
    const fromNew = Math.min(newCards.length, cardCount - dueCards.length);
    selected = [
      ...shuffleCards(dueCards),
      ...shuffleCards(newCards).slice(0, fromNew),
    ];
  }

  return shuffleCards(selected);
}

export function loadPoolCards(
  pool: StudyPool,
  manifest: Manifest,
  cardCount: number,
  reviews: Map<string, CardReview>,
): StudyCard[] {
  const allCards = resolvePoolCards(pool, manifest);
  return composeSessionCards(allCards, cardCount, reviews);
}
