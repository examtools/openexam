import path from "node:path";

export const GENERATED_DIR = path.join(process.cwd(), "generated");
export const EXAMS_DIR = path.join(GENERATED_DIR, "exams");
export const REPORTS_DIR = path.join(GENERATED_DIR, "reports");
export const MANIFEST_PATH = path.join(GENERATED_DIR, "manifest.json");
