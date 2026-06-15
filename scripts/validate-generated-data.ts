import fs from "node:fs";

import { EXAMS_DIR, MANIFEST_PATH } from "../lib/data/paths";

function main() {
  if (!fs.existsSync(MANIFEST_PATH)) {
    throw new Error("Manifest not found. Run normalize-questions first.");
  }

  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8")) as {
    exams: { examId: string }[];
  };

  for (const exam of manifest.exams) {
    const examPath = `${EXAMS_DIR}/${exam.examId}.json`;
    if (!fs.existsSync(examPath)) {
      throw new Error(`Missing dataset: ${examPath}`);
    }
  }

  console.log(`Validated ${manifest.exams.length} exam datasets.`);
}

main();
