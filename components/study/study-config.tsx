"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type {
  SubjectMeta,
  ExamMeta,
  Manifest,
} from "@/lib/exam/types";
import type {
  ResponseMode,
  StudyPool,
  StudySessionMode,
  StudyCard,
  CardReview,
} from "@/lib/study/types";
import { PoolTypeSelector, SubjectPicker, ExamPicker } from "@/components/study/pool-selector";
import { ResponseModePicker } from "@/components/study/response-mode-picker";
import { loadStudyConfig, updateStudyConfig } from "@/lib/study/config";
import { loadPoolCards, shuffleCards } from "@/lib/study/pool";
import { getAllReviews } from "@/lib/storage/study-store";
import { createSessionId } from "@/lib/exam/id";
import { saveStudySession } from "@/lib/storage/study-store";

type Step = "pool" | "configure" | "review";

export function StudyConfig({
  manifest,
}: {
  manifest: Manifest;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const config = loadStudyConfig();

  const [step, setStep] = useState<Step>("pool");
  const [poolType, setPoolType] = useState<StudyPool["type"]>("all-subjects");
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedSubjectName, setSelectedSubjectName] = useState("");
  const [selectedExamId, setSelectedExamId] = useState<string | null>(null);
  const [selectedExamIds, setSelectedExamIds] = useState<string[]>([]);
  const [cardCount, setCardCount] = useState(config.defaultCardCount);
  const [responseMode, setResponseMode] = useState<ResponseMode>(
    config.defaultResponseMode,
  );
  const [studyMode, setStudyMode] = useState<StudySessionMode>(
    config.defaultStudyMode,
  );
  const [customCount, setCustomCount] = useState("50");

  useEffect(() => {
    const poolParam = searchParams.get("pool");
    if (poolParam === "all-subjects") {
      setPoolType("all-subjects");
      setStep("configure");
    } else if (poolParam === "subject") {
      setPoolType("subject");
    }
  }, [searchParams]);

  const pool: StudyPool | null = useMemo(() => {
    switch (poolType) {
      case "all-subjects":
        return { type: "all-subjects" };
      case "subject":
        if (!selectedSubject) return null;
        return {
          type: "subject",
          subjectSlug: selectedSubject,
          subjectName: selectedSubjectName,
        };
      case "exam":
        if (!selectedExamId) return null;
        return { type: "exam", examId: selectedExamId };
      case "custom":
        if (selectedExamIds.length === 0) return null;
        return { type: "custom", examIds: selectedExamIds };
    }
  }, [poolType, selectedSubject, selectedSubjectName, selectedExamId, selectedExamIds]);

  function getCardCountValue(): number {
    if (cardCount === -1) {
      return Math.max(1, parseInt(customCount, 10) || 50);
    }
    return cardCount;
  }

  async function handleStart() {
    if (!pool) return;
    const count = getCardCountValue();
    const reviewsMap = new Map<string, CardReview>(
      Object.entries(getAllReviews()),
    );
    const cards = loadPoolCards(pool, manifest, count, reviewsMap);
    const shuffled = shuffleCards(cards).slice(0, count);

    const sessionId = createSessionId();
    const session = {
      sessionId,
      pool,
      responseMode,
      studyMode,
      totalCards: shuffled.length,
      answeredCards: 0,
      correctCount: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      status: "active" as const,
      cards: shuffled,
      cardIndex: 0,
      answers: {},
      ratings: {},
    };

    updateStudyConfig({
      defaultCardCount: count,
      defaultResponseMode: responseMode,
      defaultStudyMode: studyMode,
    });

    saveStudySession(session);
    router.push(`/study/${sessionId}`);
  }

  const sortedSubjects = useMemo(
    () =>
      [...manifest.subjects].sort((a, b) =>
        a.name.localeCompare(b.name),
      ),
    [manifest.subjects],
  );

  const sortedExams = useMemo(
    () =>
      [...manifest.exams].sort((a, b) => {
        if (a.subjectName !== b.subjectName)
          return a.subjectName.localeCompare(b.subjectName);
        return b.displayYear - a.displayYear;
      }),
    [manifest.exams],
  );

  return (
    <div className="mx-auto max-w-3xl px-5 py-8 sm:px-6">
      <h1 className="text-2xl font-bold text-brand-text">
        New Study Session
      </h1>

      <div className="mt-8">
        {step === "pool" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-brand-textTertiary">
                Step 1: Choose your question pool
              </h2>
              <div className="mt-3">
                <PoolTypeSelector
                  value={poolType}
                  onChange={setPoolType}
                />
              </div>
            </div>

            {poolType === "subject" && (
              <div>
                <h3 className="text-sm font-medium text-brand-textSecondary">
                  Select subject
                </h3>
                <div className="mt-2">
                  <SubjectPicker
                    subjects={sortedSubjects}
                    selectedSlug={selectedSubject}
                    onSelect={(slug, name) => {
                      setSelectedSubject(slug);
                      setSelectedSubjectName(name);
                    }}
                  />
                </div>
              </div>
            )}

            {poolType === "exam" && (
              <div>
                <h3 className="text-sm font-medium text-brand-textSecondary">
                  Select exam
                </h3>
                <div className="mt-2 max-h-80 overflow-y-auto">
                  <ExamPicker
                    exams={sortedExams}
                    selectedIds={selectedExamId ? [selectedExamId] : []}
                    onToggle={(id) =>
                      setSelectedExamId(
                        selectedExamId === id ? null : id,
                      )
                    }
                  />
                </div>
              </div>
            )}

            {poolType === "custom" && (
              <div>
                <h3 className="text-sm font-medium text-brand-textSecondary">
                  Select exams to include
                </h3>
                <div className="mt-2 max-h-80 overflow-y-auto">
                  <ExamPicker
                    exams={sortedExams}
                    selectedIds={selectedExamIds}
                    onToggle={(id) =>
                      setSelectedExamIds((prev) =>
                        prev.includes(id)
                          ? prev.filter((x) => x !== id)
                          : [...prev, id],
                      )
                    }
                  />
                </div>
              </div>
            )}

            <button
              type="button"
              disabled={
                (poolType === "subject" && !selectedSubject) ||
                (poolType === "exam" && !selectedExamId) ||
                (poolType === "custom" && selectedExamIds.length === 0)
              }
              onClick={() => setStep("configure")}
              className="w-full rounded-xl bg-brand-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-primaryDark disabled:opacity-40"
            >
              Next: Configure
            </button>
          </div>
        )}

        {step === "configure" && (
          <div className="space-y-8">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-brand-textTertiary">
                Step 2: Response mode
              </h2>
              <div className="mt-3">
                <ResponseModePicker
                  value={responseMode}
                  onChange={setResponseMode}
                />
              </div>
            </div>

            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-brand-textTertiary">
                Step 3: Study mode
              </h2>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setStudyMode("srs")}
                  className={`rounded-xl border p-4 text-center transition ${
                    studyMode === "srs"
                      ? "border-brand-primary bg-brand-primary/10"
                      : "border-brand-border hover:border-brand-primary/40"
                  }`}
                >
                  <p
                    className={`text-sm font-semibold ${
                      studyMode === "srs"
                        ? "text-brand-primary"
                        : "text-brand-text"
                    }`}
                  >
                    Spaced Repetition
                  </p>
                  <p className="mt-1 text-xs text-brand-textTertiary">
                    SM-2 algorithm, cards due based on review history
                  </p>
                </button>
                <button
                  type="button"
                  onClick={() => setStudyMode("random")}
                  className={`rounded-xl border p-4 text-center transition ${
                    studyMode === "random"
                      ? "border-brand-primary bg-brand-primary/10"
                      : "border-brand-border hover:border-brand-primary/40"
                  }`}
                >
                  <p
                    className={`text-sm font-semibold ${
                      studyMode === "random"
                        ? "text-brand-primary"
                        : "text-brand-text"
                    }`}
                  >
                    Random Shuffle
                  </p>
                  <p className="mt-1 text-xs text-brand-textTertiary">
                    Shuffle all cards, one-time pass
                  </p>
                </button>
              </div>
            </div>

            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-brand-textTertiary">
                Step 4: Cards per session
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {[20, 50, 100].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setCardCount(n)}
                    className={`rounded-xl border px-6 py-3 text-sm font-semibold transition ${
                      cardCount === n
                        ? "border-brand-primary bg-brand-primary/10 text-brand-primary"
                        : "border-brand-border text-brand-text hover:border-brand-primary/40"
                    }`}
                  >
                    {n}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setCardCount(-1)}
                  className={`rounded-xl border px-6 py-3 text-sm font-semibold transition ${
                    cardCount === -1
                      ? "border-brand-primary bg-brand-primary/10 text-brand-primary"
                      : "border-brand-border text-brand-text hover:border-brand-primary/40"
                  }`}
                >
                  Custom
                </button>
              </div>
              {cardCount === -1 && (
                <div className="mt-3">
                  <input
                    type="number"
                    min={1}
                    max={manifest.stats.playableQuestionCount}
                    value={customCount}
                    onChange={(e) => setCustomCount(e.target.value)}
                    className="w-32 rounded-xl border border-brand-border bg-brand-bg px-4 py-2 text-sm text-brand-text"
                  />
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep("pool")}
                className="rounded-xl border border-brand-border px-6 py-3 text-sm font-semibold text-brand-text transition hover:bg-brand-surface"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleStart}
                className="flex-1 rounded-xl bg-brand-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-primaryDark"
              >
                Start Studying
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
