"use client";

import { useEffect, useState } from "react";
import { Clock3 } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { formatDuration } from "@/lib/utils/time";

interface TimerDisplayProps {
  durationSec: number;
  elapsedSec: number;
  isPaused?: boolean;
  onWarning?: (percentage: number) => void;
  showWarnings?: boolean;
}

const WARNING_THRESHOLDS = [75, 50, 25, 10];

export function TimerDisplay({
  durationSec,
  elapsedSec,
  isPaused = false,
  onWarning,
  showWarnings = true,
}: TimerDisplayProps) {
  const [warningsShown, setWarningsShown] = useState<number[]>([]);
  const remaining = Math.max(0, durationSec - elapsedSec);
  const percentage = durationSec > 0 ? (remaining / durationSec) * 100 : 100;

  useEffect(() => {
    if (!showWarnings || isPaused) return;

    WARNING_THRESHOLDS.forEach((threshold) => {
      if (percentage <= threshold && !warningsShown.includes(threshold)) {
        setWarningsShown((prev) => [...prev, threshold]);
        onWarning?.(threshold);
      }
    });
  }, [percentage, showWarnings, isPaused, warningsShown, onWarning]);

  const getTimerColor = () => {
    if (percentage > 50) return "bg-brand-success";
    if (percentage > 25) return "bg-brand-accent";
    if (percentage > 10) return "bg-orange-500";
    return "bg-brand-error";
  };

  const isLowTime = percentage <= 10;
  const isVeryLowTime = percentage <= 5;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-black/60">Time Remaining</span>
        <span
          className={cn(
            "font-mono font-semibold",
            isVeryLowTime && "text-brand-error animate-pulse",
            isLowTime && !isVeryLowTime && "text-orange-500",
            percentage > 50 && "text-brand-success"
          )}
        >
          {formatDuration(remaining)}
        </span>
      </div>

      <div className="relative h-2 w-full overflow-hidden rounded-full bg-black/10">
        <div
          className={cn(
            "absolute left-0 top-0 h-full rounded-full transition-all duration-500",
            getTimerColor(),
            isPaused && "opacity-50"
          )}
          style={{ width: `${percentage}%` }}
        />
        {isLowTime && !isPaused && (
          <div
            className={cn(
              "absolute left-0 top-0 h-full w-full animate-pulse rounded-full bg-brand-error/30"
            )}
          />
        )}
      </div>

      {isPaused && (
        <p className="text-xs text-black/50 text-center">Timer paused</p>
      )}
    </div>
  );
}

interface ElapsedTimerProps {
  elapsedSec: number;
}

export function ElapsedTimer({ elapsedSec }: ElapsedTimerProps) {
  return (
    <div className="flex items-center gap-2 text-sm text-black/60">
      <Clock3 className="h-4 w-4" aria-hidden="true" />
      <span>Elapsed: {formatDuration(elapsedSec)}</span>
    </div>
  );
}
