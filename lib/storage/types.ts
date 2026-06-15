import type { ExamMode, PersistedAttempt, PersistedSession } from "@/lib/exam/types";

export const STORAGE_KEY = "practice-exit-exam:storage";

export type StorageV2 = {
  version: 2;
  sessions: Record<string, PersistedSession>;
  history: PersistedAttempt[];
  preferences: {
    defaultMode: ExamMode;
    timerPresets: number[];
  };
};

export type StorageAny = Partial<StorageV2> & {
  version?: number;
};
