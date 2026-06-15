import { promises as fs } from "node:fs";

import type { ExamDataset, Manifest } from "@/lib/exam/types";
import { EXAMS_DIR, MANIFEST_PATH } from "@/lib/data/paths";

export async function readManifest(): Promise<Manifest | null> {
  try {
    const raw = await fs.readFile(MANIFEST_PATH, "utf8");
    return JSON.parse(raw) as Manifest;
  } catch {
    return null;
  }
}

export async function readExamDataset(examId: string): Promise<ExamDataset | null> {
  try {
    const raw = await fs.readFile(`${EXAMS_DIR}/${examId}.json`, "utf8");
    return JSON.parse(raw) as ExamDataset;
  } catch {
    return null;
  }
}

export async function getDepartments() {
  const manifest = await readManifest();
  return manifest?.departments ?? [];
}

export async function getDepartmentBySlug(slug: string) {
  const manifest = await readManifest();
  if (!manifest) return null;

  const department = manifest.departments.find((item) => item.slug === slug);
  if (!department) return null;

  const exams = manifest.exams
    .filter((exam) => exam.departmentSlug === slug)
    .sort((a, b) => {
      if (a.displayYear !== b.displayYear) return b.displayYear - a.displayYear;
      if (a.variant === b.variant) return 0;
      return a.variant === "regular" ? -1 : 1;
    });

  return {
    department,
    exams,
  };
}

export async function getExamMetaById(examId: string) {
  const manifest = await readManifest();
  return manifest?.exams.find((exam) => exam.examId === examId) ?? null;
}
