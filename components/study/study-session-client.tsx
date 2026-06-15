"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { StudySession } from "@/lib/study/types";
import { readStudySession } from "@/lib/storage/study-store";
import { StudyClient } from "@/components/study/study-client";

export function StudySessionPageClient({
  sessionId,
}: {
  sessionId: string;
}) {
  const router = useRouter();
  const [session, setSession] = useState<StudySession | null>(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="mx-auto max-w-2xl py-16 pt-20 text-center">
        <p className="text-brand-textSecondary">Loading session...</p>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return <StudyClient session={session} />;
}
