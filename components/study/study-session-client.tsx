"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import type { StudySession } from "@/lib/study/types";
import { readStudySession, deleteStudySession } from "@/lib/storage/study-store";
import { StudyClient } from "@/components/study/study-client";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

export function StudySessionPageClient({
  sessionId,
}: {
  sessionId: string;
}) {
  const router = useRouter();
  const [session, setSession] = useState<StudySession | null>(null);
  const [loading, setLoading] = useState(true);
  const [discardOpen, setDiscardOpen] = useState(false);

  useEffect(() => {
    const found = readStudySession(sessionId);
    if (!found) {
      router.replace("/study");
      return;
    }
    if (found.status === "completed") {
      router.replace("/study");
      return;
    }
    setSession(found);
    setLoading(false);
  }, [sessionId, router]);

  const handleDiscard = useCallback(() => {
    if (!session) return;
    deleteStudySession(session.sessionId);
    router.replace("/study");
  }, [session, router]);

  if (loading) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 pt-20 text-center sm:px-6">
        <p className="text-brand-textSecondary">Loading session...</p>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="relative">
      <button
        onClick={() => setDiscardOpen(true)}
        className="fixed right-4 top-20 z-40 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 shadow-sm transition hover:bg-red-100"
        title="Discard this study session"
      >
        <Trash2 className="h-4 w-4" />
        Discard
      </button>
      <StudyClient session={session} />
      <ConfirmDialog
        open={discardOpen}
        title="Discard study session?"
        message="This will permanently delete this study session and all progress within it."
        confirmLabel="Discard"
        onConfirm={handleDiscard}
        onCancel={() => setDiscardOpen(false)}
      />
    </div>
  );
}
