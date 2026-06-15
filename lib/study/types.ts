export type StudyPool =
  | { type: "all-subjects" }
  | { type: "subject"; subjectSlug: string; subjectName: string }
  | { type: "exam"; examId: string }
  | { type: "custom"; examIds: string[] };

export type ResponseMode = "multiple-choice" | "recall" | "mix";

export type StudySessionMode = "srs" | "random";

export type StudyCard = {
  globalKey: string;
  examId: string;
  questionKey: string;
  source: { subjectName: string; displayYear: number; label: string };
};

export type SrsRating = "easy" | "medium" | "hard" | "forgot";

export type CardReview = {
  globalKey: string;
  repetition: number;
  interval: number;
  easeFactor: number;
  nextReviewAt: number;
  lastReviewedAt: number | null;
  totalAttempts: number;
  correctAttempts: number;
};

export type StudySessionMeta = {
  sessionId: string;
  pool: StudyPool;
  responseMode: ResponseMode;
  studyMode: StudySessionMode;
  totalCards: number;
  answeredCards: number;
  correctCount: number;
  createdAt: number;
  updatedAt: number;
  status: "active" | "completed";
};

export type StudySession = StudySessionMeta & {
  cards: StudyCard[];
  cardIndex: number;
  answers: Record<string, number[]>;
  ratings: Record<string, SrsRating>;
};

export type StudyConfig = {
  defaultCardCount: number;
  defaultResponseMode: ResponseMode;
  defaultStudyMode: StudySessionMode;
  autoAdvance: boolean;
};
