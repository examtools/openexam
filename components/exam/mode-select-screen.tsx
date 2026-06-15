"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { formatDuration } from "@/lib/utils/time";
import type { ExamMode } from "@/lib/exam/types";

interface ModeSelectScreenProps {
  questionCount: number;
  defaultMode: ExamMode;
  onStart: (mode: ExamMode, timerEnabled: boolean, timerDuration: number) => void;
}

const TIMER_OPTIONS = [
  { value: 900, label: "15 min", description: "Quick practice" },
  { value: 1800, label: "30 min", description: "Short session" },
  { value: 3600, label: "60 min", description: "Full hour" },
  { value: 5400, label: "90 min", description: "Extended time" },
];

const PRACTICE_TIMER_OPTIONS = [
  { value: 0, label: "No timer", description: "Unlimited time" },
  { value: 1800, label: "30 min", description: "Timed practice" },
  { value: 3600, label: "60 min", description: "Full hour" },
  { value: 0, label: "Unlimited", description: "No time limit" },
];

export function ModeSelectScreen({
  questionCount,
  defaultMode,
  onStart,
}: ModeSelectScreenProps) {
  const [mode, setMode] = useState<ExamMode>(defaultMode);
  const [timerEnabled, setTimerEnabled] = useState(mode === "test");
  const [timerDuration, setTimerDuration] = useState(3600);

  const handleStart = () => {
    onStart(mode, mode === "test" ? timerEnabled : timerDuration > 0, timerDuration);
  };

  const timerOptions = mode === "test" ? TIMER_OPTIONS : PRACTICE_TIMER_OPTIONS;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="panel p-6 space-y-6">
        <div>
          <h2 className="text-sm font-semibold text-brand-primaryDark mb-3">Select Mode</h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                setMode("practice");
                setTimerEnabled(false);
              }}
              className={cn(
                "rounded-xl border-2 p-4 text-left transition",
                mode === "practice"
                  ? "border-brand-primary bg-brand-primary/5"
                  : "border-black/10 hover:border-black/20"
              )}
            >
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "w-4 h-4 rounded-full border-2 flex items-center justify-center",
                    mode === "practice" ? "border-brand-primary" : "border-black/20"
                  )}
                >
                  {mode === "practice" && <div className="w-2 h-2 rounded-full bg-brand-primary" />}
                </div>
                <span className="font-semibold text-brand-primaryDark">Practice</span>
              </div>
              <p className="mt-2 text-xs text-black/60">
                Instant feedback after each question. Learn as you go.
              </p>
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("test");
                setTimerEnabled(true);
              }}
              className={cn(
                "rounded-xl border-2 p-4 text-left transition",
                mode === "test"
                  ? "border-brand-primary bg-brand-primary/5"
                  : "border-black/10 hover:border-black/20"
              )}
            >
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "w-4 h-4 rounded-full border-2 flex items-center justify-center",
                    mode === "test" ? "border-brand-primary" : "border-black/20"
                  )}
                >
                  {mode === "test" && <div className="w-2 h-2 rounded-full bg-brand-primary" />}
                </div>
                <span className="font-semibold text-brand-primaryDark">Test</span>
              </div>
              <p className="mt-2 text-xs text-black/60">
                Take under exam conditions. Results at the end.
              </p>
            </button>
          </div>
        </div>

        {mode === "test" && (
          <div>
            <h2 className="text-sm font-semibold text-brand-primaryDark mb-3">Timer Settings</h2>
            <label className="flex items-center gap-3 mb-4">
              <input
                type="checkbox"
                checked={timerEnabled}
                onChange={(e) => setTimerEnabled(e.target.checked)}
                className="w-4 h-4 rounded border-black/20 text-brand-primary focus:ring-brand-primary"
              />
              <span className="text-sm text-brand-primaryDark">Enable timer</span>
            </label>
            {timerEnabled && (
              <div className="grid grid-cols-4 gap-2">
                {timerOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setTimerDuration(option.value)}
                    disabled={option.value === 0}
                    className={cn(
                      "rounded-lg border p-3 text-center transition",
                      timerDuration === option.value
                        ? "border-brand-primary bg-brand-primary text-white"
                        : "border-black/10 hover:border-black/20",
                      option.value === 0 && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <div className="font-semibold text-sm">{option.label}</div>
                    <div className="text-xs opacity-70">{option.description}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {mode === "practice" && (
          <div>
            <h2 className="text-sm font-semibold text-brand-primaryDark mb-3">Practice Options</h2>
            <div className="space-y-2 text-xs text-black/60">
              <p>• Get instant feedback after each answer</p>
              <p>• View explanations for correct answers</p>
              <p>• Take as long as you need</p>
              <p>• Review and retry questions</p>
            </div>
          </div>
        )}

        {mode === "test" && timerEnabled && (
          <div className="rounded-lg bg-brand-accent/20 p-4">
            <h3 className="font-semibold text-sm text-brand-primaryDark">Test Mode Rules</h3>
            <ul className="mt-2 space-y-1 text-xs text-black/70">
              <li>• {questionCount} questions to answer</li>
              <li>• Time limit: {formatDuration(timerDuration)}</li>
              <li>• Results shown after submission</li>
              <li>• Cannot change answers after submission</li>
            </ul>
          </div>
        )}

        <button
          type="button"
          onClick={handleStart}
          className="w-full rounded-xl bg-brand-primary py-3 text-sm font-semibold text-white transition hover:bg-brand-primaryDark"
        >
          {mode === "test" && timerEnabled
            ? `Start Test (${formatDuration(timerDuration)})`
            : mode === "test"
            ? "Start Test (No Timer)"
            : "Start Practice"}
        </button>
      </div>
    </div>
  );
}
