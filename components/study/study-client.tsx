"use client";

import { useEffect, useMemo, useCallback, useState, useRef } from "react";
import type {
  NormalizedQuestion,
  ExamDataset,
} from "@/lib/exam/types";
import type {
  ResponseMode,
  SrsRating,
  StudyCard as StudyCardType,
  StudySession,
} from "@/lib/study/types";
import { StudyCard } from "@/components/study/study-card";
import { StudyProgress } from "@/components/study/study-progress";
import { StudyResults } from "@/components/study/study-results";
import { ensureExamLoaded } from "@/lib/study/client-loader";
import { saveStudySession, recordReview } from "@/lib/storage/study-store";
import { createSessionId } from "@/lib/exam/id";

type CardState = {
  selected: number[];
  revealed: boolean;
  rated: boolean;
};

export function StudyClient({
  session: initialSession,
}: {
  session: StudySession;
}) {
  const [session, setSession] = useState<StudySession>(initialSession);
  const [cardStates, setCardStates] = useState<Record<string, CardState>>({});
  const [finished, setFinished] = useState(false);
  const [questions, setQuestions] = useState<
    Record<string, NormalizedQuestion>
  >({});
  const loadedRef = useRef(false);

  const currentCard = session.cards[session.cardIndex] ?? null;
  const cs = currentCard
    ? cardStates[currentCard.globalKey] ?? {
        selected: [],
        revealed: false,
        rated: false,
      }
    : null;

  const answered = Object.values(cardStates).filter(
    (s) => s.rated,
  ).length;
  const correct = Object.entries(cardStates).filter(
    ([key, state]) => {
      if (!state.rated) return false;
      const q = questions[key];
      if (!q) return false;
      return (
        state.selected.length > 0 &&
        q.correctAnswers.length > 0 &&
        q.correctAnswers.every((a) => state.selected.includes(a)) &&
        state.selected.length === q.correctAnswers.length
      );
    },
  ).length;

  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;

    const examIds = new Set(
      session.cards.map((c) => c.examId),
    );

    Promise.all(
      Array.from(examIds).map((id) => ensureExamLoaded(id)),
    ).then((datasets) => {
      const qs: Record<string, NormalizedQuestion> = {};
      for (const d of datasets) {
        if (!d) continue;
        for (const q of d.questions) {
          if (!q.isValid) continue;
          const globalKey = `${d.meta.examId}::${q.questionKey}`;
          qs[globalKey] = q;
        }
      }
      setQuestions(qs);
    });
  }, [session.cards]);

  const updateSession = useCallback(
    (patch: Partial<StudySession>) => {
      setSession((prev) => {
        const next = { ...prev, ...patch, updatedAt: Date.now() };
        saveStudySession(next);
        return next;
      });
    },
    [],
  );

  const updateCardState = useCallback(
    (key: string, patch: Partial<CardState>) => {
      setCardStates((prev) => ({
        ...prev,
        [key]: { ...(prev[key] ?? { selected: [], revealed: false, rated: false }), ...patch },
      }));
    },
    [],
  );

  function handleSelect(index: number) {
    if (!currentCard || cs?.revealed) return;
    const key = currentCard.globalKey;
    const prev = cardStates[key]?.selected ?? [];
    const next = prev.includes(index)
      ? prev.filter((i) => i !== index)
      : [...prev, index];
    updateCardState(key, { selected: next });
  }

  function handleReveal() {
    if (!currentCard) return;
    updateCardState(currentCard.globalKey, { revealed: true });
  }

  function handleRate(rating: SrsRating) {
    if (!currentCard || !cs) return;
    const key = currentCard.globalKey;
    const isCorrect =
      cs.selected.length > 0 &&
      (() => {
        const q = questions[key];
        if (!q) return false;
        return (
          q.correctAnswers.every((a) => cs.selected.includes(a)) &&
          cs.selected.length === q.correctAnswers.length
        );
      })();

    if (currentCard) {
      recordReview(key, rating, isCorrect);
    }

    updateCardState(key, { rated: true });

    const newCorrect = isCorrect ? correct + 1 : correct;
    const newAnswered = answered + 1;

    const patch: Partial<StudySession> = {
      answeredCards: newAnswered,
      correctCount: newCorrect,
      ratings: { ...session.ratings, [key]: rating },
    };
    updateSession(patch);
  }

  function handleNext() {
    if (!currentCard) return;
    const nextIndex = session.cardIndex + 1;
    if (nextIndex >= session.cards.length) {
      updateSession({
        status: "completed",
        cardIndex: nextIndex,
        updatedAt: Date.now(),
      });
      setFinished(true);
    } else {
      updateSession({ cardIndex: nextIndex });
    }
  }

  if (finished) {
    return (
      <StudyResults
        session={session}
        cardStates={cardStates}
        questions={questions}
      />
    );
  }

  if (!currentCard) {
    return (
      <div className="mx-auto max-w-2xl py-16 text-center">
        <p className="text-brand-textSecondary">No cards in this session.</p>
      </div>
    );
  }

  const question = questions[currentCard.globalKey] ?? null;

  if (!question) {
    return (
      <div className="mx-auto max-w-2xl py-16 text-center">
        <p className="text-brand-textSecondary">Loading question data...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl py-6 pt-20">
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm">
          <span className="text-brand-textSecondary">
            {currentCard.source.subjectName} · {currentCard.source.label}
          </span>
          <span className="font-medium text-brand-text">
            {session.cardIndex + 1} / {session.cards.length}
          </span>
        </div>
        <StudyProgress
          answered={answered}
          total={session.cards.length}
          correct={correct}
        />
      </div>

      <StudyCard
        card={currentCard}
        question={question}
        responseMode={session.responseMode}
        selected={cs?.selected ?? []}
        revealed={cs?.revealed ?? false}
        onSelect={handleSelect}
        onReveal={handleReveal}
        onRate={handleRate}
        onNext={handleNext}
      />
    </div>
  );
}
