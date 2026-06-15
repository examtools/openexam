"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import type { DepartmentMeta } from "@/lib/exam/types";
import { Input } from "@/components/ui/input";
import { Pill } from "@/components/ui/pill";
import { PageHeader } from "@/components/ui/page-header";
import { LandingFooter } from "@/components/landing/landing-footer";

export function DepartmentList({ departments }: { departments: DepartmentMeta[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return departments;
    return departments.filter((dept) => dept.name.toLowerCase().includes(normalized));
  }, [departments, query]);

  return (
    <div className="page-bg min-h-screen flex flex-col">
      <main className="flex-1">
        <PageHeader
          title="Subjects"
          eyebrow="Alyah Technologies"
          subtitle="Choose your subject and explore past exam sets. Clean, fast, and 100% free."
          backHref="/"
          backLabel="Home"
        />
        <section className="page-section mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="max-w-md text-sm text-brand-textSecondary">
              {filtered.length} subjects · {departments.length} total
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
            {filtered.map((dept) => (
              <Link
                key={dept.slug}
                href={`/departments/${dept.slug}`}
                className="group rounded-2xl border border-brand-border bg-brand-bg p-6 transition hover:-translate-y-1 hover:border-brand-primary/40 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-brand-text">{dept.name}</h2>
                  <span className="text-xs font-semibold text-brand-primary/70">{dept.examCount} exams</span>
                </div>
                <p className="mt-2 text-sm text-brand-textSecondary">
                  {dept.totalPlayableQuestions} playable questions
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {dept.years.slice(0, 4).map((year) => (
                    <Pill key={year} className="border-brand-primary/30 bg-brand-primary/8 text-brand-primary">
                      {year}
                    </Pill>
                  ))}
                  {dept.years.length > 4 && (
                    <Pill className="border-brand-border bg-brand-surface text-brand-textTertiary">
                      +{dept.years.length - 4} more
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
      <LandingFooter />
    </div>
  );
}
