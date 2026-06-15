import { ImageResponse } from "next/og";

import { readManifest } from "@/lib/data/generated";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function OpenGraphImage() {
  const manifest = await readManifest();

  const departments = manifest?.departments.length ?? 0;
  const exams = manifest?.stats.examCount ?? 0;
  const questions = manifest?.stats.playableQuestionCount ?? 0;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(circle at top left, rgba(29, 97, 231, 0.15), transparent 50%), linear-gradient(135deg, #f0f4ff 0%, #ffffff 48%, #eef2ff 100%)",
          color: "#0f172a",
          fontFamily: "Georgia, serif",
          padding: "56px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "28px",
            border: "1px solid rgba(67, 40, 24, 0.12)",
            borderRadius: "28px",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            padding: "24px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            <div
              style={{
                fontSize: 28,
                letterSpacing: 8,
                textTransform: "uppercase",
                color: "rgba(67, 40, 24, 0.65)",
              }}
            >
               Entrance Exam Practice
            </div>
            <div style={{ fontSize: 78, lineHeight: 1.02, maxWidth: 820, fontWeight: 700 }}>
              Alyah Entrance Exam Platform
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 30,
                lineHeight: 1.4,
                maxWidth: 880,
                color: "rgba(37, 24, 16, 0.84)",
              }}
            >
              Free entrance exam practice with instant feedback, test mode, and subject-based browsing
              for Ethiopian Grade 12 students.
            </div>
          </div>

          <div style={{ display: "flex", gap: "18px" }}>
            {[
              `${departments}+ subjects`,
              `${exams} exam sets`,
              `${questions.toLocaleString("en-US")} questions`,
            ].map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "999px",
                  border: "1px solid rgba(67, 40, 24, 0.12)",
                  background: "rgba(255,255,255,0.72)",
                  padding: "14px 24px",
                  fontSize: 24,
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
