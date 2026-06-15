"use client";

export function StudyProgress({
  answered,
  total,
  correct,
}: {
  answered: number;
  total: number;
  correct: number;
}) {
  const pct = total > 0 ? Math.round((answered / total) * 100) : 0;
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-brand-textSecondary">
          {answered} / {total} answered
        </span>
        <span className="font-medium text-brand-text">{pct}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-brand-surface">
        <div
          className="h-full rounded-full bg-brand-primary transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      {answered > 0 && (
        <p className="text-xs text-brand-textTertiary">
          {correct} correct · {answered - correct} incorrect
        </p>
      )}
    </div>
  );
}
