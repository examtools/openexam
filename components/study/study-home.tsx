"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, BookOpen, Clock, BarChart3 } from "lucide-react";
import type { StudySession } from "@/lib/study/types";
import { listStudySessions, getDueCardCount } from "@/lib/storage/study-store";
import { loadStudyConfig } from "@/lib/study/config";

export function StudyHome() {
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [dueCount, setDueCount] = useState(0);
  const [config, setConfig] = useState(loadStudyConfig);

  useEffect(() => {
    setSessions(listStudySessions());
    setDueCount(getDueCardCount());
  }, []);

  const activeSessions = sessions.filter((s) => s.status === "active");
  const completedSessions = sessions.filter((s) => s.status === "completed");

  return (
    <div className="mx-auto max-w-4xl px-5 py-8 pt-20 sm:px-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-brand-text">Study Center</h1>
          <p className="mt-1 text-sm text-brand-textSecondary">
            Spaced repetition study sessions
          </p>
        </div>
        <Link
          href="/study/new"
          className="flex items-center gap-2 rounded-xl bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-primaryDark"
        >
          <Plus className="h-4 w-4" />
          New Study
        </Link>
      </div>

      {dueCount > 0 && (
        <div className="mt-6 rounded-xl border border-brand-primary/30 bg-brand-primary/5 p-4">
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-brand-primary" />
            <p className="text-sm font-medium text-brand-text">
              <span className="font-bold text-brand-primary">{dueCount}</span>{" "}
              card{dueCount !== 1 ? "s" : ""} due for review
            </p>
          </div>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-brand-textTertiary">
          Quick Start
        </h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <QuickStartCard
            icon={BookOpen}
            label="All Subjects"
            description={`${config.defaultCardCount} cards · ${config.defaultResponseMode === "recall" ? "Recall" : config.defaultResponseMode === "mix" ? "Mix" : "Multiple Choice"}`}
            href="/study/new?pool=all-subjects"
          />
          <QuickStartCard
            icon={BookOpen}
            label="Pick a Subject"
            description="Choose a subject to study"
            href="/study/new?pool=subject"
          />
          <QuickStartCard
            icon={BarChart3}
            label="Dashboard"
            description="View stats and progress"
            href="/study/dashboard"
          />
        </div>
      </div>

      {activeSessions.length > 0 && (
        <div className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-brand-textTertiary">
            Active Sessions
          </h2>
          <div className="mt-3 space-y-2">
            {activeSessions.slice(0, 5).map((s) => (
              <Link
                key={s.sessionId}
                href={`/study/${s.sessionId}`}
                className="flex items-center justify-between rounded-xl border border-brand-border bg-brand-bg px-5 py-4 transition hover:border-brand-primary/40"
              >
                <div>
                  <p className="text-sm font-semibold text-brand-text">
                    {poolLabel(s.pool)}
                  </p>
                  <p className="mt-0.5 text-xs text-brand-textTertiary">
                    {s.answeredCards}/{s.totalCards} cards ·{" "}
                    {s.responseMode === "recall"
                      ? "Recall"
                      : s.responseMode === "mix"
                        ? "Mix"
                        : "MC"}
                  </p>
                </div>
                <span className="text-xs font-medium text-brand-primary">
                  {s.totalCards > 0
                    ? `${Math.round((s.answeredCards / s.totalCards) * 100)}%`
                    : "0%"}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {completedSessions.length > 0 && (
        <div className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-brand-textTertiary">
            Recent Sessions
          </h2>
          <div className="mt-3 space-y-2">
            {completedSessions.slice(0, 5).map((s) => (
              <div
                key={s.sessionId}
                className="flex items-center justify-between rounded-xl border border-brand-border bg-brand-bg px-5 py-4"
              >
                <div>
                  <p className="text-sm font-semibold text-brand-text">
                    {poolLabel(s.pool)}
                  </p>
                  <p className="mt-0.5 text-xs text-brand-textTertiary">
                    {s.correctCount}/{s.answeredCards} correct
                  </p>
                </div>
                <span className="text-xs font-medium text-brand-textTertiary">
                  {new Date(s.updatedAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {sessions.length === 0 && (
        <div className="mt-16 text-center">
          <BookOpen className="mx-auto h-12 w-12 text-brand-textTertiary" />
          <h3 className="mt-4 text-lg font-semibold text-brand-text">
            No study sessions yet
          </h3>
          <p className="mt-2 text-sm text-brand-textSecondary">
            Start your first study session to begin learning with spaced repetition.
          </p>
        </div>
      )}
    </div>
  );
}

function QuickStartCard({
  icon: Icon,
  label,
  description,
  href,
}: {
  icon: typeof BookOpen;
  label: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-start gap-3 rounded-xl border border-brand-border bg-brand-bg p-4 transition hover:border-brand-primary/40 hover:shadow-sm"
    >
      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-primary" />
      <div>
        <p className="text-sm font-semibold text-brand-text">{label}</p>
        <p className="mt-0.5 text-xs text-brand-textTertiary">{description}</p>
      </div>
    </Link>
  );
}

function poolLabel(pool: StudySession["pool"]): string {
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
