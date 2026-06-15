import type { CardReview, SrsRating } from "@/lib/study/types";

const INITIAL_EASE_FACTOR = 2.5;
const MINIMUM_EASE_FACTOR = 1.3;

const INTERVAL_STEPS = {
  medium: [1, 6],
  easy: [4, 7],
};

export function createInitialReview(globalKey: string): CardReview {
  return {
    globalKey,
    repetition: 0,
    interval: 0,
    easeFactor: INITIAL_EASE_FACTOR,
    nextReviewAt: 0,
    lastReviewedAt: null,
    totalAttempts: 0,
    correctAttempts: 0,
  };
}

export function calculateNextReview(
  current: CardReview,
  rating: SrsRating,
  isCorrect: boolean,
): CardReview {
  const now = Date.now();
  const updated: CardReview = {
    ...current,
    lastReviewedAt: now,
    totalAttempts: current.totalAttempts + 1,
    correctAttempts: current.correctAttempts + (isCorrect ? 1 : 0),
  };

  switch (rating) {
    case "easy": {
      const ef = Math.max(MINIMUM_EASE_FACTOR, current.easeFactor + 0.15);
      let interval: number;
      if (current.repetition === 0) interval = INTERVAL_STEPS.easy[0];
      else if (current.repetition === 1) interval = INTERVAL_STEPS.easy[1];
      else interval = Math.round(current.interval * ef * 1.3);
      return {
        ...updated,
        repetition: current.repetition + 1,
        interval,
        easeFactor: ef,
        nextReviewAt: now + interval * 86400000,
      };
    }
    case "medium": {
      let interval: number;
      if (current.repetition === 0) interval = INTERVAL_STEPS.medium[0];
      else if (current.repetition === 1) interval = INTERVAL_STEPS.medium[1];
      else interval = Math.round(current.interval * current.easeFactor);
      return {
        ...updated,
        repetition: current.repetition + 1,
        interval,
        nextReviewAt: now + interval * 86400000,
      };
    }
    case "hard": {
      const ef = Math.max(MINIMUM_EASE_FACTOR, current.easeFactor - 0.2);
      return {
        ...updated,
        repetition: 0,
        interval: 1,
        easeFactor: ef,
        nextReviewAt: now + 60000,
      };
    }
    case "forgot": {
      const ef = Math.max(MINIMUM_EASE_FACTOR, current.easeFactor - 0.2);
      return {
        ...updated,
        repetition: 0,
        interval: 1,
        easeFactor: ef,
        nextReviewAt: now + 60000,
      };
    }
  }
}

export function getDueCards(
  reviews: Map<string, CardReview>,
): Set<string> {
  const now = Date.now();
  const due = new Set<string>();
  for (const [key, review] of reviews) {
    if (review.nextReviewAt <= now) {
      due.add(key);
    }
  }
  return due;
}
