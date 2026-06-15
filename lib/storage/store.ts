"use client";

import type { PersistedAttempt, PersistedSession } from "@/lib/exam/types";
import type { StorageAny, StorageV2 } from "@/lib/storage/types";
import { STORAGE_KEY } from "@/lib/storage/types";

const DEFAULT_STORAGE: StorageV2 = {
  version: 2,
  sessions: {},
  history: [],
  preferences: {
    defaultMode: "practice",
    timerPresets: [15, 30, 60, 90],
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
  const sessions = value.sessions && typeof value.sessions === "object" ? value.sessions : {};
  const history = Array.isArray(value.history) ? value.history : [];
  const mode = value.preferences?.defaultMode === "test" ? "test" : "practice";
  const timerPresets = Array.isArray(value.preferences?.timerPresets)
    ? value.preferences?.timerPresets.filter((x): x is number => Number.isFinite(x) && x > 0)
    : DEFAULT_STORAGE.preferences.timerPresets;

  return {
    version: 2,
    sessions: sessions as Record<string, PersistedSession>,
    history: history as PersistedAttempt[],
    preferences: {
      defaultMode: mode,
      timerPresets: timerPresets.length > 0 ? timerPresets : DEFAULT_STORAGE.preferences.timerPresets,
    },
  };
}

export function loadStorage(): StorageV2 {
  if (!isBrowser()) {
    return DEFAULT_STORAGE;
  }

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return DEFAULT_STORAGE;
  }

  const parsed = safeParse(raw);
  if (!parsed) {
    localStorage.setItem(`practice-exit-exam:storage:corrupt:${Date.now()}`, raw);
    localStorage.removeItem(STORAGE_KEY);
    return DEFAULT_STORAGE;
  }

  try {
    if (parsed.version === 2) {
      return migrateToV2(parsed);
    }

    const migrated = migrateToV2(parsed);
    persistStorage(migrated);
    return migrated;
  } catch {
    localStorage.setItem(`practice-exit-exam:storage:corrupt:${Date.now()}`, raw);
    localStorage.removeItem(STORAGE_KEY);
    return DEFAULT_STORAGE;
  }
}

export function persistStorage(value: StorageV2): void {
  if (!isBrowser()) {
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
}

export function getSessionKey(examId: string, mode: "practice" | "test") {
  return `${examId}::${mode}`;
}

export function saveSession(sessionKey: string, session: PersistedSession): void {
  const storage = loadStorage();
  storage.sessions[sessionKey] = session;
  persistStorage(storage);
}

export function deleteSession(sessionKey: string): void {
  const storage = loadStorage();
  delete storage.sessions[sessionKey];
  persistStorage(storage);
}

export function readSession(sessionKey: string): PersistedSession | null {
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

export function readAttemptById(attemptId: string): PersistedAttempt | null {
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
