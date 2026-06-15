"use client";

import type { ResponseMode } from "@/lib/study/types";
import { ListChecks, Lightbulb, Shuffle } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const modes: {
  value: ResponseMode;
  label: string;
  description: string;
  icon: typeof ListChecks;
}[] = [
  {
    value: "multiple-choice",
    label: "Multiple Choice",
    description: "See options and pick the answer",
    icon: ListChecks,
  },
  {
    value: "recall",
    label: "Recall",
    description: "Think first, then reveal the answer",
    icon: Lightbulb,
  },
  {
    value: "mix",
    label: "Mix",
    description: "Alternate between both modes",
    icon: Shuffle,
  },
];

export function ResponseModePicker({
  value,
  onChange,
}: {
  value: ResponseMode;
  onChange: (mode: ResponseMode) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {modes.map((m) => {
        const Icon = m.icon;
        const selected = value === m.value;
        return (
          <button
            key={m.value}
            type="button"
            onClick={() => onChange(m.value)}
            className={cn(
              "flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition",
              selected
                ? "border-brand-primary bg-brand-primary/10"
                : "border-brand-border hover:border-brand-primary/40 hover:bg-brand-surface",
            )}
          >
            <Icon
              className={cn(
                "h-5 w-5",
                selected ? "text-brand-primary" : "text-brand-textTertiary",
              )}
            />
            <div>
              <p
                className={cn(
                  "text-sm font-semibold",
                  selected ? "text-brand-primary" : "text-brand-text",
                )}
              >
                {m.label}
              </p>
              <p className="mt-0.5 text-xs text-brand-textTertiary">
                {m.description}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
