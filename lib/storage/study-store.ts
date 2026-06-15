"use client";

import type { CardReview, SrsRating, StudySession } from "@/lib/study/types";
import { loadStorage, persistStorage } from "@/lib/storage/store";
import type { StorageV3 } from "@/lib/storage/types";
import {
  calculateNextReview,
  createInitialReview,
} from "@/lib/study/srs";

function getStore(): StorageV3 {
  return loadStorage() as StorageV3;
}

export function saveStudySession(session: StudySession): void {
  const store = getStore();
  store.studySessions[session.sessionId] = session;
  persistStorage(store);
}

export function readStudySession(
  sessionId: string,
): StudySession | null {
  const store = getStore();
  return store.studySessions[sessionId] ?? null;
}

export function deleteStudySession(sessionId: string): void {
  const store = getStore();
  delete store.studySessions[sessionId];
  persistStorage(store);
}

export function listStudySessions(): StudySession[] {
  const store = getStore();
  return Object.values(store.studySessions).sort(
    (a, b) => b.updatedAt - a.updatedAt,
  );
}

export function getCardReview(
  globalKey: string,
): CardReview | null {
  const store = getStore();
  return store.cardReviews[globalKey] ?? null;
}

export function saveCardReview(review: CardReview): void {
  const store = getStore();
  store.cardReviews[review.globalKey] = review;
  persistStorage(store);
}

export function getAllReviews(): Record<string, CardReview> {
  const store = getStore();
  return store.cardReviews;
}

export function getDueCardCount(): number {
  const store = getStore();
  const now = Date.now();
  return Object.values(store.cardReviews).filter(
    (r) => r.nextReviewAt <= now,
  ).length;
}

export function getReviewCounts(): {
  total: number;
  due: number;
  reviewed: number;
} {
  const store = getStore();
  const entries = Object.values(store.cardReviews);
  const now = Date.now();
  return {
    total: entries.length,
    due: entries.filter((r) => r.nextReviewAt <= now).length,
    reviewed: entries.filter((r) => r.lastReviewedAt !== null).length,
  };
}

export function recordReview(
  globalKey: string,
  rating: SrsRating,
  isCorrect: boolean,
): CardReview {
  const existing = getCardReview(globalKey);
  const current = existing ?? createInitialReview(globalKey);
  const updated = calculateNextReview(current, rating, isCorrect);
  saveCardReview(updated);
  return updated;
}
