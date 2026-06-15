"use client";

import dynamic from "next/dynamic";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";

import type { ExamDataset, ExamMode, PersistedAttempt, PersistedSession } from "@/lib/exam/types";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { RichContent } from "@/components/exam/rich-blocks";
import { QuestionPill } from "@/components/exam/question-pill";
import { cn } from "@/lib/utils/cn";
import { createAttemptId, createSessionId } from "@/lib/exam/id";
import { isSelectionCorrect, scoreExam } from "@/lib/exam/scoring";
import {
  appendHistory,
  deleteSession,
  getSessionKey,
  readAttemptById,
  readPreferences,
  readSession,
  saveSession,
  updateDefaultMode,
} from "@/lib/storage/store";
import { ReviewPanel } from "@/components/exam/review-panel";
import type { AttemptQuestionReview } from "@/lib/exam/types";
import { ModeSelectScreen } from "@/components/exam/mode-select-screen";
import { TimerDisplay, ElapsedTimer } from "@/components/exam/timer-display";
import { SubmitDialog } from "@/components/exam/submit-dialog";
import { ResultsSummary } from "@/components/exam/results-summary";

const QUESTION_PAGE_SIZE = 50;
const PRACTICE_DEFAULT_TIMER = 60 * 60;
const RESUME_MIN_ELAPSED = 30;
const PASS_THRESHOLD = 50;

const Confetti = dynamic(() => import("react-confetti"), { ssr: false });

type ExamState = "selecting" | "exam" | "results" | "review";

export function ExamClient({ dataset }: { dataset: ExamDataset }) {
  const searchParams = useSearchParams();
  const initialMode = (searchParams.get("mode") as ExamMode) || "practice";
  const reviewAttemptId = searchParams.get("review");

  const playableQuestions = useMemo(
    () => dataset.questions.filter((question) => question.isValid),
    [dataset.questions]
  );

  const [examState, setExamState] = useState<ExamState>("selecting");
  const [mode, setMode] = useState<ExamMode>(initialMode);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number[]>>({});
  const [flagged, setFlagged] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [elapsedSec, setElapsedSec] = useState(0);
  const [timerEnabled, setTimerEnabled] = useState(false);
  const [timerDuration, setTimerDuration] = useState(60 * 60);
  const [resumeCandidate, setResumeCandidate] = useState<PersistedSession | null>(null);
  const [resumeVisible, setResumeVisible] = useState(false);
  const [reviewAttempt, setReviewAttempt] = useState<PersistedAttempt | null>(null);
  const [attemptResult, setAttemptResult] = useState<{
    correct: number;
    total: number;
    percent: number;
    review: AttemptQuestionReview[];
  } | null>(null);
  const [confettiShown, setConfettiShown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileMapOpen, setMobileMapOpen] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const [submitDialogOpen, setSubmitDialogOpen] = useState(false);
  const [timerWarning, setTimerWarning] = useState<string | null>(null);
  const isReviewMode = Boolean(reviewAttempt);

  const question = playableQuestions[currentIndex];
  const totalQuestions = playableQuestions.length;
  const progressValue = totalQuestions > 0 ? (currentIndex + 1) / totalQuestions : 0;

  const hasActivity = useMemo(() => {
    return (
      Object.keys(answers).length > 0 ||
      flagged.length > 0 ||
      currentIndex > 0 ||
      elapsedSec > RESUME_MIN_ELAPSED
    );
  }, [answers, flagged, currentIndex, elapsedSec]);

  const filteredIndices = useMemo(() => {
    if (!searchTerm.trim()) return playableQuestions.map((_, idx) => idx);
    const normalized = searchTerm.toLowerCase();

    return playableQuestions.reduce<number[]>((acc, item, idx) => {
      const questionText = item.question
        .map((block) => (block.type === "text" ? block.text : ""))
        .join(" ")
        .toLowerCase();
      const optionText = item.options
        .map((opt) => opt.blocks.map((block) => (block.type === "text" ? block.text : "")).join(" "))
        .join(" ")
        .toLowerCase();

      if (questionText.includes(normalized) || optionText.includes(normalized)) {
        acc.push(idx);
      }

      return acc;
    }, []);
  }, [playableQuestions, searchTerm]);

  useEffect(() => {
    const prefs = readPreferences();
    if (!searchParams.get("mode")) {
      setMode(prefs.defaultMode);
    }
  }, [searchParams]);

  useEffect(() => {
    if (reviewAttemptId) {
      const attempt = readAttemptById(reviewAttemptId);
      if (attempt) {
        setReviewAttempt(attempt);
        setShowResults(true);
        setExamState("review");
        setMode(attempt.mode);
        setElapsedSec(attempt.durationSec);
        setAttemptResult({
          correct: attempt.correctCount,
          total: attempt.totalQuestions,
          percent: attempt.percent,
          review: attempt.review,
        });
        const reviewAnswers = attempt.review.reduce<Record<string, number[]>>((acc, item) => {
          acc[item.questionKey] = item.selected;
          return acc;
        }, {});
        setAnswers(reviewAnswers);
      }
      return;
    }

    const sessionKey = getSessionKey(dataset.meta.examId, mode);
    const session = readSession(sessionKey);
    if (session) {
      const hasProgress =
        Object.keys(session.answers).length > 0 ||
        session.flagged.length > 0 ||
        session.currentIndex > 0 ||
        session.timer.elapsedSec > RESUME_MIN_ELAPSED;

      if (hasProgress) {
        setResumeCandidate(session);
        setResumeVisible(true);
      } else {
        deleteSession(sessionKey);
      }
    }
  }, [dataset.meta.examId, mode, reviewAttemptId]);

  useEffect(() => {
    if (isReviewMode || showResults || examState !== "exam") {
      return;
    }

    const interval = setInterval(() => {
      setElapsedSec((value) => value + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isReviewMode, showResults, examState]);

  useEffect(() => {
    if (!timerEnabled || isReviewMode || mode !== "test" || showResults || examState !== "exam") {
      return;
    }

    if (elapsedSec >= timerDuration) {
      handleSubmit();
    }
  }, [elapsedSec, timerDuration, timerEnabled, mode, isReviewMode, showResults, examState]);

  useEffect(() => {
    if (isReviewMode || examState !== "exam") {
      return;
    }

    const sessionKey = getSessionKey(dataset.meta.examId, mode);
    if (!hasActivity) {
      return;
    }
    const session: PersistedSession = {
      sessionId: resumeCandidate?.sessionId ?? createSessionId(),
      examId: dataset.meta.examId,
      mode,
      startedAt: resumeCandidate?.startedAt ?? new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      currentIndex,
      answers,
      flagged,
      timer: {
        enabled: timerEnabled,
        durationSec: timerEnabled ? timerDuration : 0,
        elapsedSec,
      },
    };

    saveSession(sessionKey, session);
  }, [
    answers,
    currentIndex,
    dataset.meta.examId,
    elapsedSec,
    flagged,
    hasActivity,
    mode,
    resumeCandidate?.sessionId,
    resumeCandidate?.startedAt,
    isReviewMode,
    timerDuration,
    timerEnabled,
    examState,
  ]);

  useEffect(() => {
    setPageIndex(Math.floor(currentIndex / QUESTION_PAGE_SIZE));
  }, [currentIndex]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const updateViewport = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };
    updateViewport();
    window.addEventListener("resize", updateViewport, { passive: true });
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  const handleTimerWarning = useCallback((percentage: number) => {
    const messages: Record<number, string> = {
      75: "75% of time used",
      50: "50% of time used - halfway there!",
      25: "25% of time remaining",
      10: "Only 10% of time remaining!",
    };
    setTimerWarning(messages[percentage] || null);
    setTimeout(() => setTimerWarning(null), 5000);
  }, []);

  useEffect(() => {
    if (examState !== "exam" || isReviewMode) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      switch (e.key) {
        case "ArrowLeft":
          setCurrentIndex((prev) => Math.max(0, prev - 1));
          break;
        case "ArrowRight":
          setCurrentIndex((prev) => Math.min(totalQuestions - 1, prev + 1));
          break;
        case "f":
        case "F":
          toggleFlag();
          break;
        case "Enter":
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            setSubmitDialogOpen(true);
          }
          break;
      }

      if (e.key >= "1" && e.key <= "9") {
        const num = parseInt(e.key) - 1;
        if (num < totalQuestions) {
          setCurrentIndex(num);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [examState, isReviewMode, totalQuestions]);

  function setAnswer(selectedIndex: number) {
    if (!question) return;
    const key = question.questionKey;
    const prev = answers[key] ?? [];

    if (question.selectionMode === "multiple") {
      const has = prev.includes(selectedIndex);
      const next = has ? prev.filter((value) => value !== selectedIndex) : [...prev, selectedIndex];
      setAnswers({ ...answers, [key]: next });
      return;
    }

    setAnswers({ ...answers, [key]: [selectedIndex] });
  }

  function toggleFlag() {
    if (!question) return;
    const key = question.questionKey;
    if (flagged.includes(key)) {
      setFlagged(flagged.filter((item) => item !== key));
      return;
    }
    setFlagged([...flagged, key]);
  }

  function handleSubmit() {
    if (showResults) return;
    const scoring = scoreExam(playableQuestions, answers);
    setAttemptResult(scoring);
    setShowResults(true);
    setExamState("results");
    if (scoring.percent >= PASS_THRESHOLD) {
      setConfettiShown(true);
    }

    const attempt: PersistedAttempt = {
      attemptId: createAttemptId(),
      examId: dataset.meta.examId,
      departmentName: dataset.meta.departmentName,
      displayYear: dataset.meta.displayYear,
      variant: dataset.meta.variant,
      mode,
      startedAt: new Date(Date.now() - elapsedSec * 1000).toISOString(),
      completedAt: new Date().toISOString(),
      durationSec: elapsedSec,
      timed: timerEnabled,
      timerDurationSec: timerEnabled ? timerDuration : null,
      score: scoring.correct,
      correctCount: scoring.correct,
      totalQuestions: scoring.total,
      percent: scoring.percent,
      review: scoring.review,
    };

    appendHistory(attempt);
    deleteSession(getSessionKey(dataset.meta.examId, mode));
  }

  function handleStartExam(selectedMode: ExamMode, timerOn: boolean, timerDur: number) {
    setMode(selectedMode);
    setTimerEnabled(timerOn);
    setTimerDuration(timerDur);
    setExamState("exam");
    updateDefaultMode(selectedMode);
  }

  function startNewSession() {
    setResumeVisible(false);
    setResumeCandidate(null);
    setElapsedSec(0);
    setAnswers({});
    setFlagged([]);
    setShowResults(false);
    setAttemptResult(null);
    setConfettiShown(false);
    setCurrentIndex(0);
    setExamState("selecting");
  }

  function resumeSession() {
    if (!resumeCandidate) {
      setResumeVisible(false);
      return;
    }

    setAnswers(resumeCandidate.answers);
    setFlagged(resumeCandidate.flagged);
    setCurrentIndex(resumeCandidate.currentIndex);
    setElapsedSec(resumeCandidate.timer.elapsedSec ?? 0);
    setMode(resumeCandidate.mode);
    if (resumeCandidate.mode === "test") {
      setTimerEnabled(resumeCandidate.timer.enabled);
      setTimerDuration(resumeCandidate.timer.durationSec ?? PRACTICE_DEFAULT_TIMER);
    } else {
      setTimerEnabled(false);
      setTimerDuration(PRACTICE_DEFAULT_TIMER);
    }
    setResumeVisible(false);
    setExamState("exam");
  }

  function retryExam() {
    setExamState("selecting");
    setShowResults(false);
    setAttemptResult(null);
    setConfettiShown(false);
    setCurrentIndex(0);
    setElapsedSec(0);
    setAnswers({});
    setFlagged([]);
  }

  function reviewAnswers() {
    setShowResults(true);
    setExamState("review");
  }

  if (examState === "selecting" && !isReviewMode) {
    return (
      <div className="py-8">
        <ModeSelectScreen
          questionCount={playableQuestions.length}
          defaultMode={mode}
          onStart={handleStartExam}
        />
      </div>
    );
  }

  const resultsConfetti = examState === "results" && confettiShown && !isReviewMode && viewport.width > 0 && viewport.height > 0;
  const resultsConfettiPieces = viewport.width < 768 ? 120 : 220;

  if (examState === "results" && attemptResult && showResults) {
    return (
      <div className="mx-auto max-w-2xl py-8">
        {resultsConfetti && (
          <Confetti
            width={viewport.width}
            height={viewport.height}
            numberOfPieces={resultsConfettiPieces}
            recycle={false}
          />
        )}
        <ResultsSummary
          attempt={{
            attemptId: "current",
            examId: dataset.meta.examId,
            departmentName: dataset.meta.departmentName,
            displayYear: dataset.meta.displayYear,
            variant: dataset.meta.variant,
            mode,
            startedAt: new Date().toISOString(),
            completedAt: new Date().toISOString(),
            durationSec: elapsedSec,
            timed: timerEnabled,
            timerDurationSec: timerEnabled ? timerDuration : null,
            score: attemptResult.correct,
            correctCount: attemptResult.correct,
            totalQuestions: attemptResult.total,
            percent: attemptResult.percent,
            review: attemptResult.review,
          }}
          passThreshold={PASS_THRESHOLD}
          onRetry={retryExam}
          onReview={reviewAnswers}
        />
      </div>
    );
  }

  if (!question) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-2xl font-semibold text-brand-primaryDark">No playable questions.</h1>
      </div>
    );
  }

  const selection = answers[question.questionKey] ?? [];
  const hasAnswered = selection.length > 0;
  const isCorrect =
    hasAnswered && (mode === "practice" || showResults)
      ? isSelectionCorrect(selection, question.correctAnswers)
      : null;

  const timerRemaining = Math.max(0, timerDuration - elapsedSec);
  const shouldShowConfetti =
    examState === "results" && confettiShown && !isReviewMode && viewport.width > 0 && viewport.height > 0;
  const confettiPieces = viewport.width < 768 ? 120 : 220;

  const questionPageIndices = filteredIndices.slice(
    pageIndex * QUESTION_PAGE_SIZE,
    (pageIndex + 1) * QUESTION_PAGE_SIZE
  );

  const answeredCount = Object.keys(answers).length;
  const flaggedCount = flagged.length;

  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-[240px_1fr_260px]">
      {shouldShowConfetti && (
        <Confetti
          width={viewport.width}
          height={viewport.height}
          numberOfPieces={confettiPieces}
          recycle={false}
        />
      )}

      <SubmitDialog
        isOpen={submitDialogOpen}
        totalQuestions={totalQuestions}
        answeredCount={answeredCount}
        flaggedCount={flaggedCount}
        onConfirm={() => {
          setSubmitDialogOpen(false);
          handleSubmit();
        }}
        onCancel={() => setSubmitDialogOpen(false)}
      />

      <aside className="hidden flex-col gap-4 lg:flex">
        <div className="panel p-4">
          <h2 className="text-sm font-semibold text-brand-primaryDark">Question Map</h2>
          <Input
            placeholder="Search questions"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="mt-3"
          />
          <div className="mt-4 flex flex-wrap gap-2">
            {questionPageIndices.map((idx) => {
              const item = playableQuestions[idx];
              return (
                <QuestionPill
                  key={item.questionKey}
                  label={`${idx + 1}`}
                  active={idx === currentIndex}
                  answered={(answers[item.questionKey] ?? []).length > 0}
                  flagged={flagged.includes(item.questionKey)}
                  showAnsweredIndicator={mode === "test"}
                  onClick={() => setCurrentIndex(idx)}
                />
              );
            })}
          </div>
          {filteredIndices.length > QUESTION_PAGE_SIZE && (
            <div className="mt-4 flex items-center justify-between text-xs text-black/60">
              <button
                type="button"
                className="hover:text-brand-primary"
                onClick={() => setPageIndex(Math.max(0, pageIndex - 1))}
              >
                Prev
              </button>
              <span>
                Page {pageIndex + 1} / {Math.ceil(filteredIndices.length / QUESTION_PAGE_SIZE)}
              </span>
              <button
                type="button"
                className="hover:text-brand-primary"
                onClick={() =>
                  setPageIndex(
                    Math.min(pageIndex + 1, Math.ceil(filteredIndices.length / QUESTION_PAGE_SIZE) - 1)
                  )
                }
              >
                Next
              </button>
            </div>
          )}
        </div>
      </aside>

      <section className="panel flex flex-col gap-6 p-6">
        <div className="flex items-center justify-between lg:hidden">
          <button
            type="button"
            className="rounded-xl border border-black/10 px-3 py-2 text-xs font-semibold"
            onClick={() => setMobileMapOpen((prev) => !prev)}
          >
            {mobileMapOpen ? "Hide map" : "Show map"}
          </button>
          <span className="text-xs text-black/60">Answered {answeredCount}</span>
        </div>

        {timerWarning && (
          <div className="rounded-lg bg-brand-accent/20 border border-brand-accent p-3 text-sm text-brand-primaryDark animate-pulse">
            {timerWarning}
          </div>
        )}

        {reviewAttempt && (
          <div className="rounded-xl border border-brand-accent/40 bg-brand-accent/20 p-4 text-sm">
            <p className="font-semibold text-brand-primaryDark">Review mode</p>
            <p className="mt-1 text-black/70">
              Attempt {reviewAttempt.attemptId} · {reviewAttempt.correctCount}/{reviewAttempt.totalQuestions} ({reviewAttempt.percent}%)
            </p>
          </div>
        )}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wide text-black/50">
              Question {currentIndex + 1} of {totalQuestions}
            </span>
            <span className="text-xs text-black/60">{Math.round(progressValue * 100)}% complete</span>
          </div>
          <Progress value={progressValue * 100} />
        </div>

        <div className="space-y-4">
          <RichContent blocks={question.question} />

          <div className="space-y-3">
            {question.options.map((option, idx) => {
              const selected = selection.includes(idx);
              const showFeedback = (mode === "practice" && hasAnswered) || showResults;
              const isCorrectOption = question.correctAnswers.includes(idx);
              const feedbackClass = showFeedback
                ? isCorrectOption
                  ? "border-brand-success bg-brand-success/10"
                  : selected
                  ? "border-brand-error bg-brand-error/10"
                  : "border-black/10"
                : "border-black/10";

              return (
                <button
                  key={option.key}
                  type="button"
                  className={cn(
                    "flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition",
                    feedbackClass
                  )}
                  onClick={() => {
                    if (!isReviewMode) {
                      setAnswer(idx);
                    }
                  }}
                >
                  <span className={cn("mt-1 flex h-4 w-4 items-center justify-center rounded-full border text-[10px]", selected ? "border-brand-primary bg-brand-primary text-white" : "border-black/20")}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <RichContent blocks={option.blocks} />
                </button>
              );
            })}
          </div>

          {mode === "practice" && hasAnswered && (
            <div className={cn("rounded-xl border p-4 text-sm", isCorrect ? "border-brand-success bg-brand-success/10" : "border-brand-error bg-brand-error/10")}>
              <p className="font-semibold">
                {isCorrect ? "Correct" : "Incorrect"}
              </p>
              {question.explanation && (
                <p className="mt-2 text-black/70">{question.explanation}</p>
              )}
            </div>
          )}

          {showResults && mode === "test" && question.explanation && (
            <div className="rounded-xl border border-black/10 bg-white/80 p-4 text-sm">
              <p className="font-semibold text-brand-primaryDark">Explanation</p>
              <p className="mt-2 text-black/70">{question.explanation}</p>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="ghost"
            onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
            disabled={currentIndex === 0}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            Previous
          </Button>
          <Button
            variant="ghost"
            onClick={() => setCurrentIndex(Math.min(totalQuestions - 1, currentIndex + 1))}
            disabled={currentIndex === totalQuestions - 1}
            className="gap-2"
          >
            Next
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Button>
          {!isReviewMode && (
            <>
              <Button variant={flagged.includes(question.questionKey) ? "danger" : "secondary"} onClick={toggleFlag}>
                {flagged.includes(question.questionKey) ? "Unflag" : "Flag"}
              </Button>
              <Button variant="primary" onClick={() => setSubmitDialogOpen(true)} disabled={showResults}>
                Submit
              </Button>
            </>
          )}
        </div>
      </section>

      <aside className="flex flex-col gap-4">
        {examState === "exam" && mode === "test" && timerEnabled && (
          <div className="panel p-4">
            <TimerDisplay
              durationSec={timerDuration}
              elapsedSec={elapsedSec}
              onWarning={handleTimerWarning}
            />
          </div>
        )}

        <div className="panel p-4 text-sm">
          <h2 className="text-sm font-semibold text-brand-primaryDark">Progress</h2>
          <div className="mt-2 space-y-2">
            <div className="flex justify-between text-black/60">
              <span>Answered</span>
              <span className="font-medium">{answeredCount} / {totalQuestions}</span>
            </div>
            <div className="flex justify-between text-black/60">
              <span>Flagged</span>
              <span className="font-medium">{flaggedCount}</span>
            </div>
            <div className="flex justify-between text-black/60">
              <span>Unanswered</span>
              <span className="font-medium">{totalQuestions - answeredCount}</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-black/10">
            <ElapsedTimer elapsedSec={elapsedSec} />
          </div>
        </div>

        {showResults && (
          <div className="panel p-4 text-sm">
            <h2 className="text-sm font-semibold text-brand-primaryDark">Results</h2>
            <p className="mt-2 text-black/60">
              Score: {attemptResult ? `${attemptResult.correct} / ${attemptResult.total}` : `0 / ${totalQuestions}`}
            </p>
            {attemptResult && (
              <p className="mt-1 text-xs text-black/60">Percent: {attemptResult.percent}%</p>
            )}
          </div>
        )}
      </aside>

      {resumeVisible && resumeCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="panel w-full max-w-md p-6">
            <h2 className="text-lg font-semibold text-brand-primaryDark">Resume your session?</h2>
            <p className="mt-2 text-sm text-black/70">
              We found an in-progress session for this exam. Would you like to resume or start over?
            </p>
            <div className="mt-4 flex gap-3">
              <Button variant="primary" onClick={resumeSession}>
                Resume
              </Button>
              <Button variant="ghost" onClick={startNewSession}>
                Start over
              </Button>
            </div>
          </div>
        </div>
      )}

      {mobileMapOpen && (
        <div className="fixed inset-0 z-40 flex items-end bg-black/40 lg:hidden">
          <div className="w-full rounded-t-3xl bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-brand-primaryDark">Question Map</h2>
              <button
                type="button"
                className="text-xs text-brand-primary"
                onClick={() => setMobileMapOpen(false)}
              >
                Close
              </button>
            </div>
            <Input
              placeholder="Search questions"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="mt-3"
            />
            <div className="mt-4 flex flex-wrap gap-2">
              {questionPageIndices.map((idx) => {
                const item = playableQuestions[idx];
                return (
                  <QuestionPill
                    key={item.questionKey}
                    label={`${idx + 1}`}
                    active={idx === currentIndex}
                    answered={(answers[item.questionKey] ?? []).length > 0}
                    flagged={flagged.includes(item.questionKey)}
                    showAnsweredIndicator={mode === "test"}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setMobileMapOpen(false);
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}

      {isReviewMode && reviewAttempt && (
        <div className="lg:col-span-3">
          <ReviewPanel attempt={reviewAttempt} questions={playableQuestions} />
        </div>
      )}
    </div>
  );
}
