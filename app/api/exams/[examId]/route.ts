import { NextRequest } from "next/server";

import { readExamDataset } from "@/lib/data/generated";

type RouteContext = { params: Promise<{ examId: string }> };

export async function GET(_: NextRequest, { params }: RouteContext) {
  const { examId } = await params;
  const dataset = await readExamDataset(examId);

  if (!dataset) {
    return new Response(JSON.stringify({ error: "Exam not found" }), { status: 404 });
  }

  return Response.json(dataset, {
    headers: {
      "Cache-Control": "public, max-age=300, stale-while-revalidate=600",
    },
  });
}
