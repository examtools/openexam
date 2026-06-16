"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { BarChart3, BookOpen, TrendingUp, Calendar, Trash2 } from "lucide-react";
import {
  getReviewCounts,
  listStudySessions,
  deleteStudySession,
} from "@/lib/storage/study-store";
import type { StudySession } from "@/lib/study/types";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

export function StudyDashboard() {
  const [counts, setCounts] = useState({ total: 0, due: 0, reviewed: 0 });
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [deleteTarget, setDeleteTarget] = useState<StudySession | null>(null);

  useEffect(() => {
    setCounts(getReviewCounts());
    setSessions(listStudySessions());
  }, []);

  const handleDeleteSession = useCallback(() => {
    if (!deleteTarget) return;
    deleteStudySession(deleteTarget.sessionId);
    setSessions((prev) =>
      prev.filter((s) => s.sessionId !== deleteTarget.sessionId),
    );
    setDeleteTarget(null);
  }, [deleteTarget]);

  const retention =
    sessions.length > 0
      ? Math.round(
          (sessions.reduce((sum, s) => sum + s.correctCount, 0) /
            Math.max(
              1,
              sessions.reduce((sum, s) => sum + s.answeredCards, 0),
            )) *
            100,
        )
      : 0;

  return (
    <div className="mx-auto max-w-4xl px-5 py-8 pt-20 sm:px-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-brand-text">Dashboard</h1>
          <p className="mt-1 text-sm text-brand-textSecondary">
            Your study statistics and progress
          </p>
        </div>
        <Link
          href="/study"
          className="rounded-xl border border-brand-border px-5 py-2.5 text-sm font-semibold text-brand-text transition hover:bg-brand-surface"
        >
          Back to Study
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={BookOpen}
          label="Cards Reviewed"
          value={counts.reviewed}
        />
        <StatCard
          icon={Calendar}
          label="Due for Review"
          value={counts.due}
          highlight={counts.due > 0}
        />
        <StatCard
          icon={BarChart3}
          label="Total Cards"
          value={counts.total}
        />
        <StatCard
          icon={TrendingUp}
          label="Retention"
          value={`${retention}%`}
        />
      </div>

      {sessions.filter((s) => s.status === "active").length > 0 && (
        <div className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-brand-textTertiary">
            Active Sessions
          </h2>
          <div className="mt-3 space-y-2">
            {sessions
              .filter((s) => s.status === "active")
              .slice(0, 5)
              .map((s) => (
                <div
                  key={s.sessionId}
                  className="flex items-center gap-2 rounded-xl border border-brand-border bg-brand-bg px-5 py-4 transition hover:border-brand-primary/40 group"
                >
                  <Link
                    href={`/study/${s.sessionId}`}
                    className="flex flex-1 items-center justify-between"
                  >
                    <div>
                      <p className="text-sm font-semibold text-brand-text">
                        {poolLabel(s.pool)}
                      </p>
                      <p className="mt-0.5 text-xs text-brand-textTertiary">
                        {s.answeredCards}/{s.totalCards} cards
                      </p>
                    </div>
                    <span className="text-xs font-medium text-brand-primary">
                      {s.totalCards > 0
                        ? `${Math.round(
                            (s.answeredCards / s.totalCards) * 100,
                          )}%`
                        : "0%"}
                    </span>
                  </Link>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteTarget(s);
                    }}
                    className="shrink-0 rounded-lg p-2 text-brand-textTertiary opacity-0 transition hover:bg-red-50 hover:text-red-600 group-hover:opacity-100"
                    title="Delete session"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}

      <ConfirmDialog
        open={deleteTarget !== null}
        title="Delete study session?"
        message={
          deleteTarget
            ? `This will permanently delete the "${poolLabel(deleteTarget.pool)}" study session and all its progress.`
            : ""
        }
        confirmLabel="Delete"
        onConfirm={handleDeleteSession}
        onCancel={() => setDeleteTarget(null)}
      />

      {counts.total === 0 && (
        <div className="mt-16 text-center">
          <BarChart3 className="mx-auto h-12 w-12 text-brand-textTertiary" />
          <h3 className="mt-4 text-lg font-semibold text-brand-text">
            No data yet
          </h3>
          <p className="mt-2 text-sm text-brand-textSecondary">
            Complete some study sessions to see your stats.
          </p>
          <Link
            href="/study/new"
            className="mt-4 inline-flex rounded-xl bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white"
          >
            Start Studying
          </Link>
        </div>
      )}
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  highlight,
}: {
  icon: typeof BarChart3;
  label: string;
  value: string | number;
  highlight?: boolean;
}) {
  return (
    <div className="rounded-xl border border-brand-border bg-brand-bg p-5">
      <div className="flex items-center gap-3">
        <Icon
          className={`h-5 w-5 ${highlight ? "text-brand-primary" : "text-brand-textTertiary"}`}
        />
        <span className="text-xs font-medium text-brand-textTertiary">
          {label}
        </span>
      </div>
      <p
        className={`mt-2 text-3xl font-bold ${
          highlight ? "text-brand-primary" : "text-brand-text"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function poolLabel(
  pool: StudySession["pool"],
): string {
  switch (pool.type) {
    case "all-subjects":
      return "All Subjects";
    case "subject":
      return pool.subjectName;
    case "exam":
      return pool.examId;
    case "custom":
      return `${pool.examIds.length} exams`;
  }
}
