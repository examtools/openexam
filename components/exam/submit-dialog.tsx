"use client";

import { useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface SubmitDialogProps {
  isOpen: boolean;
  totalQuestions: number;
  answeredCount: number;
  flaggedCount: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export function SubmitDialog({
  isOpen,
  totalQuestions,
  answeredCount,
  flaggedCount,
  onConfirm,
  onCancel,
}: SubmitDialogProps) {
  const unanswered = totalQuestions - answeredCount;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onCancel();
      if (e.key === "Enter") onConfirm();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onCancel, onConfirm]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onCancel} />
      <div className="relative panel w-full max-w-md p-6 animate-in fade-in zoom-in-95 duration-200">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-accent/20">
            <CheckCircle2 className="h-6 w-6 text-brand-accent" aria-hidden="true" />
          </div>
          <h2 className="text-lg font-semibold text-brand-primaryDark">Submit Exam?</h2>
        </div>

        <div className="mt-4 space-y-3">
          <div className="rounded-lg bg-black/5 p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-brand-success">{answeredCount}</div>
                <div className="text-xs text-black/60">Answered</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-brand-error">{unanswered}</div>
                <div className="text-xs text-black/60">Unanswered</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-brand-accent">{flaggedCount}</div>
                <div className="text-xs text-black/60">Flagged</div>
              </div>
            </div>
          </div>

          {unanswered > 0 && (
            <div className="rounded-lg border border-brand-error/30 bg-brand-error/5 p-3">
              <p className="text-sm text-brand-error">
                <strong>{unanswered} question{unanswered !== 1 ? "s" : ""} unanswered</strong>
              </p>
              <p className="text-xs text-black/60 mt-1">
                Unanswered questions will be marked as incorrect.
              </p>
            </div>
          )}

          <p className="text-sm text-black/60 text-center">
            Are you sure you want to submit? You cannot change your answers after submission.
          </p>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-xl border border-black/10 py-2.5 text-sm font-semibold text-brand-primaryDark transition hover:bg-black/5"
          >
            Go Back
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-brand-primary py-2.5 text-sm font-semibold text-white transition hover:bg-brand-primaryDark"
          >
            Submit Exam
          </button>
        </div>
      </div>
    </div>
  );
}

interface WarningBannerProps {
  message: string;
  type?: "info" | "warning" | "error";
  onDismiss?: () => void;
}

export function WarningBanner({ message, type = "warning", onDismiss }: WarningBannerProps) {
  const styles = {
    info: "bg-brand-accent/10 border-brand-accent text-brand-primaryDark",
    warning: "bg-brand-accent/20 border-brand-accent text-brand-primaryDark",
    error: "bg-brand-error/10 border-brand-error text-brand-error",
  };

  return (
    <div className={cn("rounded-lg border p-3 flex items-center justify-between", styles[type])}>
      <p className="text-sm">{message}</p>
      {onDismiss && (
        <button onClick={onDismiss} className="ml-2 text-xs hover:opacity-70">
          ✕
        </button>
      )}
    </div>
  );
}
