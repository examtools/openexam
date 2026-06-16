"use client";

import type { PersistedAttempt, PersistedSession } from "@/lib/exam/types";
import type { CardReview, StudySession } from "@/lib/study/types";
import type {
  StorageAny,
  StorageV2,
  StorageV3,
} from "@/lib/storage/types";
import { STORAGE_KEY } from "@/lib/storage/types";

const DEFAULT_STORAGE: StorageV3 = {
  version: 3,
  sessions: {},
  history: [],
  studySessions: {},
  cardReviews: {},
  preferences: {
    defaultMode: "practice",
    timerPresets: [15, 30, 60, 90],
    studyConfig: {
      defaultCardCount: 50,
      defaultResponseMode: "multiple-choice",
      defaultStudyMode: "srs",
      autoAdvance: false,
    },
  },
};

function isBrowser() {
  return typeof window !== "undefined";
}

function safeParse(raw: string): StorageAny | null {
  try {
    return JSON.parse(raw) as StorageAny;
  } catch {
    return null;
  }
}

function migrateToV2(value: StorageAny): StorageV2 {
  const sessions =
    value.sessions && typeof value.sessions === "object"
      ? value.sessions
      : {};
  const history = Array.isArray(value.history) ? value.history : [];
  const mode =
    value.preferences?.defaultMode === "test" ? "test" : "practice";
  const timerPresets = Array.isArray(
    value.preferences?.timerPresets,
  )
    ? value.preferences?.timerPresets.filter(
        (x: number): x is number => Number.isFinite(x) && x > 0,
      )
    : DEFAULT_STORAGE.preferences.timerPresets;

  return {
    version: 2,
    sessions: sessions as Record<string, PersistedSession>,
    history: history as PersistedAttempt[],
    preferences: {
      defaultMode: mode,
      timerPresets:
        timerPresets.length > 0
          ? timerPresets
          : DEFAULT_STORAGE.preferences.timerPresets,
    },
  };
}

function migrateToV3(value: StorageAny): StorageV3 {
  if (value.version === 3) {
    return {
      ...DEFAULT_STORAGE,
      ...value,
      preferences: {
        ...DEFAULT_STORAGE.preferences,
        ...(value.preferences ?? {}),
        studyConfig: {
          ...DEFAULT_STORAGE.preferences.studyConfig,
          ...(value.preferences?.studyConfig ?? {}),
        },
      },
    };
  }

  const v2 = migrateToV2(value);

  return {
    version: 3,
    sessions: v2.sessions,
    history: v2.history,
    studySessions: {},
    cardReviews: {},
    preferences: {
      defaultMode: v2.preferences.defaultMode,
      timerPresets: v2.preferences.timerPresets,
      studyConfig: { ...DEFAULT_STORAGE.preferences.studyConfig },
    },
  };
}

export function loadStorage(): StorageV3 {
  if (!isBrowser()) {
    return DEFAULT_STORAGE;
  }

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return DEFAULT_STORAGE;
  }

  const parsed = safeParse(raw);
  if (!parsed) {
    localStorage.setItem(
      `practice-exit-exam:storage:corrupt:${Date.now()}`,
      raw,
    );
    localStorage.removeItem(STORAGE_KEY);
    return DEFAULT_STORAGE;
  }

  try {
    const migrated = migrateToV3(parsed);
    if (migrated.version !== parsed.version) {
      persistStorage(migrated);
    }
    return migrated;
  } catch {
    localStorage.setItem(
      `practice-exit-exam:storage:corrupt:${Date.now()}`,
      raw,
    );
    localStorage.removeItem(STORAGE_KEY);
    return DEFAULT_STORAGE;
  }
}

export function persistStorage(value: StorageV3): void {
  if (!isBrowser()) {
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
}

export function getSessionKey(
  examId: string,
  mode: "practice" | "test",
) {
  return `${examId}::${mode}`;
}

export function saveSession(
  sessionKey: string,
  session: PersistedSession,
): void {
  const storage = loadStorage();
  storage.sessions[sessionKey] = session;
  persistStorage(storage);
}

export function deleteSession(sessionKey: string): void {
  const storage = loadStorage();
  delete storage.sessions[sessionKey];
  persistStorage(storage);
}

export function readSession(
  sessionKey: string,
): PersistedSession | null {
  const storage = loadStorage();
  return storage.sessions[sessionKey] ?? null;
}

export function appendHistory(attempt: PersistedAttempt): void {
  const storage = loadStorage();
  storage.history = [attempt, ...storage.history].slice(0, 200);
  persistStorage(storage);
}

export function readHistory(): PersistedAttempt[] {
  return loadStorage().history;
}

export function readAttemptById(
  attemptId: string,
): PersistedAttempt | null {
  const history = readHistory();
  return history.find((entry) => entry.attemptId === attemptId) ?? null;
}

export function updateDefaultMode(mode: "practice" | "test"): void {
  const storage = loadStorage();
  storage.preferences.defaultMode = mode;
  persistStorage(storage);
}

export function readPreferences() {
  return loadStorage().preferences;
}

export function deleteHistoryEntry(attemptId: string): void {
  const storage = loadStorage();
  storage.history = storage.history.filter(
    (entry) => entry.attemptId !== attemptId,
  );
  persistStorage(storage);
}

export function clearAllData(): void {
  if (!isBrowser()) return;

  const keys = [
    STORAGE_KEY,
    "practice-exit-exam:study-config",
    "theme",
    "donation-banner-dismissed",
  ];

  for (const key of keys) {
    try {
      localStorage.removeItem(key);
    } catch {
      // ignore
    }
  }

  const { clearExamCache } = require("@/lib/study/client-loader") as {
    clearExamCache?: () => void;
  };
  clearExamCache?.();
}
