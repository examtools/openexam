import type { ExamDataset, NormalizedQuestion } from "@/lib/exam/types";
import type { StudyCard } from "@/lib/study/types";
import { readExamDataset } from "@/lib/data/generated";

const cache = new Map<string, ExamDataset>();

export async function ensureExamLoaded(
  examId: string,
): Promise<ExamDataset | null> {
  if (cache.has(examId)) return cache.get(examId) ?? null;
  const dataset = await readExamDataset(examId);
  if (dataset) cache.set(examId, dataset);
  return dataset;
}

export function getCachedQuestion(
  examId: string,
  questionKey: string,
): NormalizedQuestion | null {
  const dataset = cache.get(examId);
  if (!dataset) return null;
  const question = dataset.questions.find(
    (q) => q.questionKey === questionKey && q.isValid,
  );
  return question ?? null;
}

export function parseGlobalKey(
  globalKey: string,
): { examId: string; questionKey: string } | null {
  const sepIndex = globalKey.indexOf("::");
  if (sepIndex === -1) return null;
  return {
    examId: globalKey.slice(0, sepIndex),
    questionKey: globalKey.slice(sepIndex + 2),
  };
}

export async function preloadCards(
  cards: StudyCard[],
): Promise<void> {
  const examIds = new Set(cards.map((c) => c.examId));
  await Promise.all(
    Array.from(examIds).map((id) => ensureExamLoaded(id)),
  );
}
