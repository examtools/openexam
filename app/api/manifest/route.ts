import { readManifest } from "@/lib/data/generated";

export async function GET() {
  const manifest = await readManifest();

  if (!manifest) {
    return new Response(JSON.stringify({ error: "Manifest not available" }), { status: 404 });
  }

  return Response.json(manifest, {
    headers: {
      "Cache-Control": "public, max-age=300, stale-while-revalidate=600",
    },
  });
}
