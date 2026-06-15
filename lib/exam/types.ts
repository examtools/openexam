export type ExamVariant = "regular" | "model";
export type ExamMode = "practice" | "test";

export type RichBlock =
  | {
      type: "text";
      text: string;
    }
  | {
      type: "line-break";
    }
  | {
      type: "image";
      src: string;
      alt: string;
      width?: number;
      height?: number;
    }
  | {
      type: "container";
      tag: string;
      className?: string;
      style?: Record<string, string | number>;
      children: RichBlock[];
    };

export type NormalizedOption = {
  key: string;
  blocks: RichBlock[];
};

export type NormalizedQuestion = {
  questionKey: string;
  sourceId: string | number | null;
  question: RichBlock[];
  options: NormalizedOption[];
  correctAnswers: number[];
  explanation: string | null;
  selectionMode: "single" | "multiple";
  isValid: boolean;
  invalidReasons: string[];
};

export type ExamMeta = {
  examId: string;
  departmentName: string;
  departmentSlug: string;
  sourceYear: number;
  displayYear: number;
  variant: ExamVariant;
  label: string;
  sourcePath: string;
  questionCount: number;
  playableQuestionCount: number;
  invalidQuestionCount: number;
  hasImages: boolean;
};

export type ExamDataset = {
  schemaVersion: number;
  generatedAt: string;
  meta: ExamMeta;
  questions: NormalizedQuestion[];
};

export type DepartmentMeta = {
  name: string;
  slug: string;
  examCount: number;
  totalQuestions: number;
  totalPlayableQuestions: number;
  years: number[];
};

export type Manifest = {
  schemaVersion: number;
  generatedAt: string;
  departments: DepartmentMeta[];
  exams: ExamMeta[];
  stats: {
    examCount: number;
    questionCount: number;
    playableQuestionCount: number;
    invalidQuestionCount: number;
    unresolvedImageCount: number;
  };
};

export type AttemptQuestionReview = {
  questionKey: string;
  selected: number[];
  correct: number[];
  isCorrect: boolean;
};

export type PersistedAttempt = {
  attemptId: string;
  examId: string;
  departmentName: string;
  displayYear: number;
  variant: ExamVariant;
  mode: ExamMode;
  startedAt: string;
  completedAt: string;
  durationSec: number;
  timed: boolean;
  timerDurationSec: number | null;
  score: number;
  correctCount: number;
  totalQuestions: number;
  percent: number;
  review: AttemptQuestionReview[];
};

export type PersistedSession = {
  sessionId: string;
  examId: string;
  mode: ExamMode;
  startedAt: string;
  updatedAt: string;
  currentIndex: number;
  answers: Record<string, number[]>;
  flagged: string[];
  timer: {
    enabled: boolean;
    durationSec: number;
    elapsedSec: number;
  };
};
