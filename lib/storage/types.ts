import type {
  ExamMode,
  PersistedAttempt,
  PersistedSession,
} from "@/lib/exam/types";
import type {
  CardReview,
  ResponseMode,
  StudySession,
  StudySessionMode,
} from "@/lib/study/types";

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

export type StorageV3 = {
  version: 3;
  sessions: Record<string, PersistedSession>;
  history: PersistedAttempt[];
  studySessions: Record<string, StudySession>;
  cardReviews: Record<string, CardReview>;
  preferences: {
    defaultMode: ExamMode;
    timerPresets: number[];
    studyConfig: {
      defaultCardCount: number;
      defaultResponseMode: ResponseMode;
      defaultStudyMode: StudySessionMode;
      autoAdvance: boolean;
    };
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type StorageAny = Record<string, any>;
