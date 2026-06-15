export function createAttemptId() {
  const random = Math.random().toString(36).slice(2, 8);
  return `attempt_${Date.now()}_${random}`;
}

export function createSessionId() {
  const random = Math.random().toString(36).slice(2, 8);
  return `session_${Date.now()}_${random}`;
}
