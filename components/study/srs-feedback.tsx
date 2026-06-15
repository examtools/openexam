"use client";

import type { SrsRating } from "@/lib/study/types";
import { Sparkles, Brain, AlertTriangle, XCircle } from "lucide-react";

const ratings: {
  value: SrsRating;
  label: string;
  icon: typeof Sparkles;
  color: string;
}[] = [
  {
    value: "easy",
    label: "Easy",
    icon: Sparkles,
    color:
      "border-brand-success bg-brand-success/10 text-brand-success hover:bg-brand-success/20",
  },
  {
    value: "medium",
    label: "Medium",
    icon: Brain,
    color:
      "border-brand-primary bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20",
  },
  {
    value: "hard",
    label: "Hard",
    icon: AlertTriangle,
    color:
      "border-brand-warning bg-brand-warning/10 text-brand-warning hover:bg-brand-warning/20",
  },
  {
    value: "forgot",
    label: "Forgot",
    icon: XCircle,
    color:
      "border-brand-error bg-brand-error/10 text-brand-error hover:bg-brand-error/20",
  },
];

export function SrsFeedback({
  onRate,
  disabled,
}: {
  onRate: (rating: SrsRating) => void;
  disabled?: boolean;
}) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-brand-textSecondary">
        How well did you know this?
      </p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {ratings.map((r) => {
          const Icon = r.icon;
          return (
            <button
              key={r.value}
              type="button"
              disabled={disabled}
              onClick={() => onRate(r.value)}
              className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition disabled:opacity-50 ${r.color}`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {r.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
