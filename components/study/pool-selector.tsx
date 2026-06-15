"use client";

import type { SubjectMeta, ExamMeta } from "@/lib/exam/types";
import type { StudyPool } from "@/lib/study/types";
import { Layers, BookOpen, FileText, CheckSquare } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const poolTypes: {
  value: StudyPool["type"];
  label: string;
  icon: typeof Layers;
}[] = [
  { value: "all-subjects", label: "All Subjects", icon: Layers },
  { value: "subject", label: "A Subject", icon: BookOpen },
  { value: "exam", label: "An Exam", icon: FileText },
  { value: "custom", label: "Custom", icon: CheckSquare },
];

export function PoolTypeSelector({
  value,
  onChange,
}: {
  value: StudyPool["type"];
  onChange: (type: StudyPool["type"]) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-4">
      {poolTypes.map((pt) => {
        const Icon = pt.icon;
        const selected = value === pt.value;
        return (
          <button
            key={pt.value}
            type="button"
            onClick={() => onChange(pt.value)}
            className={cn(
              "flex flex-col items-center gap-2 rounded-xl border p-4 text-center transition",
              selected
                ? "border-brand-primary bg-brand-primary/10"
                : "border-brand-border hover:border-brand-primary/40 hover:bg-brand-surface",
            )}
          >
            <Icon
              className={cn(
                "h-6 w-6",
                selected ? "text-brand-primary" : "text-brand-textTertiary",
              )}
            />
            <span
              className={cn(
                "text-sm font-semibold",
                selected ? "text-brand-primary" : "text-brand-text",
              )}
            >
              {pt.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function SubjectPicker({
  subjects,
  selectedSlug,
  onSelect,
}: {
  subjects: SubjectMeta[];
  selectedSlug: string | null;
  onSelect: (slug: string, name: string) => void;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {subjects.map((s) => (
        <button
          key={s.slug}
          type="button"
          onClick={() => onSelect(s.slug, s.name)}
          className={cn(
            "rounded-xl border px-4 py-3 text-left transition",
            selectedSlug === s.slug
              ? "border-brand-primary bg-brand-primary/10"
              : "border-brand-border hover:border-brand-primary/40 hover:bg-brand-surface",
          )}
        >
          <p className="text-sm font-semibold text-brand-text">{s.name}</p>
          <p className="mt-0.5 text-xs text-brand-textTertiary">
            {s.examCount} exams · {s.totalPlayableQuestions} questions
          </p>
        </button>
      ))}
    </div>
  );
}

export function ExamPicker({
  exams,
  selectedIds,
  onToggle,
}: {
  exams: ExamMeta[];
  selectedIds: string[];
  onToggle: (examId: string) => void;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {exams.map((e) => {
        const checked = selectedIds.includes(e.examId);
        return (
          <button
            key={e.examId}
            type="button"
            onClick={() => onToggle(e.examId)}
            className={cn(
              "flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition",
              checked
                ? "border-brand-primary bg-brand-primary/10"
                : "border-brand-border hover:border-brand-primary/40",
            )}
          >
            <div
              className={cn(
                "flex h-5 w-5 shrink-0 items-center justify-center rounded border",
                checked
                  ? "border-brand-primary bg-brand-primary text-white"
                  : "border-brand-border",
              )}
            >
              {checked && (
                <svg
                  className="h-3 w-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
            <div>
              <p className="text-sm font-semibold text-brand-text">
                {e.subjectName} · {e.displayYear}
                {e.variant === "model" ? " Model" : ""}
              </p>
              <p className="mt-0.5 text-xs text-brand-textTertiary">
                {e.playableQuestionCount} questions
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
