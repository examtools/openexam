"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import type { SubjectMeta } from "@/lib/exam/types";
import { Input } from "@/components/ui/input";
import { Pill } from "@/components/ui/pill";
import { PageHeader } from "@/components/ui/page-header";


export function SubjectList({ subjects }: { subjects: SubjectMeta[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return subjects;
    return subjects.filter((subj) => subj.name.toLowerCase().includes(normalized));
  }, [subjects, query]);

  return (
    <div className="page-bg min-h-screen flex flex-col">
      <main className="flex-1">
        <PageHeader
          title="Subjects"
          eyebrow="Open Exam Practice"
          subtitle="Choose your subject and explore past exam sets. Clean, fast, and 100% free."
          backHref="/"
          backLabel="Home"
        />
        <section className="page-section mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="max-w-md text-sm text-brand-textSecondary">
              {filtered.length} subjects · {subjects.length} total
            </div>
            <div className="w-full md:max-w-sm">
              <Input
                placeholder="Search subject"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                aria-label="Search subjects"
              />
            </div>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((subj) => (
              <Link
                key={subj.slug}
                href={`/subjects/${subj.slug}`}
                className="group rounded-2xl border border-brand-border bg-brand-bg p-6 transition hover:-translate-y-1 hover:border-brand-primary/40 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-brand-text">{subj.name}</h2>
                  <span className="text-xs font-semibold text-brand-primary/70">{subj.examCount} exams</span>
                </div>
                <p className="mt-2 text-sm text-brand-textSecondary">
                  {subj.totalPlayableQuestions} playable questions
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {subj.years.slice(0, 4).map((year) => (
                    <Pill key={year} className="border-brand-primary/30 bg-brand-primary/8 text-brand-primary">
                      {year}
                    </Pill>
                  ))}
                  {subj.years.length > 4 && (
                    <Pill className="border-brand-border bg-brand-surface text-brand-textTertiary">
                      +{subj.years.length - 4} more
                    </Pill>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="mt-8 text-sm text-brand-textSecondary">No subjects match that search.</p>
          )}
        </section>
      </main>
    </div>
  );
}
