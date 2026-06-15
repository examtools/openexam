import type { ResponseMode, StudyConfig, StudySessionMode } from "@/lib/study/types";

const STORAGE_KEY = "practice-exit-exam:study-config";

const DEFAULTS: StudyConfig = {
  defaultCardCount: 50,
  defaultResponseMode: "multiple-choice",
  defaultStudyMode: "srs",
  autoAdvance: false,
};

export function loadStudyConfig(): StudyConfig {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    const parsed = JSON.parse(raw) as Partial<StudyConfig>;
    return { ...DEFAULTS, ...parsed };
  } catch {
    return DEFAULTS;
  }
}

export function saveStudyConfig(config: StudyConfig): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

export function updateStudyConfig(partial: Partial<StudyConfig>): StudyConfig {
  const current = loadStudyConfig();
  const next = { ...current, ...partial };
  saveStudyConfig(next);
  return next;
}
