import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

import type {
  DepartmentMeta,
  ExamDataset,
  ExamMeta,
  ExamVariant,
  Manifest,
  NormalizedOption,
  NormalizedQuestion,
  RichBlock,
} from "../lib/exam/types";
import { EXAMS_DIR, MANIFEST_PATH, REPORTS_DIR } from "../lib/data/paths";
import { slugify } from "../lib/utils/slug";

const QUESTIONS_ROOT = path.join(process.cwd(), "Questions");
const IMAGES_ROOT = path.join(process.cwd(), "images", "questions");

const e = {
  jsx: (type: unknown, props: Record<string, unknown>) => ({ __kind: "jsx", type, props }),
  jsxs: (type: unknown, props: Record<string, unknown>) => ({ __kind: "jsxs", type, props }),
  Fragment: "Fragment",
};

const sandbox = { e, C: "Component" } as const;

const schemaVersion = 1;

function readQuestionFiles(): string[] {
  if (!fs.existsSync(QUESTIONS_ROOT)) {
    throw new Error("Questions folder not found.");
  }

  const files: string[] = [];

  for (const department of fs.readdirSync(QUESTIONS_ROOT, { withFileTypes: true })) {
    if (!department.isDirectory()) continue;
    const deptPath = path.join(QUESTIONS_ROOT, department.name);
    for (const entry of fs.readdirSync(deptPath)) {
      if (entry.endsWith(".js")) {
        files.push(path.join(deptPath, entry));
      }
    }
  }

  return files;
}

function safeEval(filePath: string): unknown {
  const raw = fs.readFileSync(filePath, "utf8").trim().replace(/;\s*$/, "");
  return vm.runInNewContext(`(${raw})`, sandbox, { timeout: 1000 });
}

function resolveImage(src: string): { src: string; exists: boolean } {
  if (src.startsWith("images/questions/")) {
    const rel = src.replace(/^images\//, "");
    const resolved = `/images/${rel}`;
    const exists = fs.existsSync(path.join(process.cwd(), "public", "images", rel));
    return { src: resolved, exists };
  }

  if (src.startsWith("questions/")) {
    const rel = src.replace(/^questions\//, "");
    const resolved = `/images/questions/${rel}`;
    const exists = fs.existsSync(path.join(process.cwd(), "public", "images", "questions", rel));
    return { src: resolved, exists };
  }

  if (src.startsWith("/images/")) {
    const rel = src.replace(/^\//, "");
    const exists = fs.existsSync(path.join(process.cwd(), "public", rel));
    return { src, exists };
  }

  if (src.startsWith("/questions/")) {
    const rel = src.replace(/^\/questions\//, "");
    const resolved = `/images/questions/${rel}`;
    const exists = fs.existsSync(path.join(process.cwd(), "public", "images", "questions", rel));
    return { src: resolved, exists };
  }

  return { src, exists: false };
}

function normalizeText(value: unknown): string {
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  return "";
}

type NormalizeTextOptions = {
  preserveTags?: boolean;
};

function normalizeStringBlocks(value: string, options: NormalizeTextOptions = {}): RichBlock[] {
  const preserveTags = options.preserveTags ?? false;
  const normalizedValue = value.replace(/<br\s*\/?>/gi, "\n");
  if (!normalizedValue.includes("<")) {
    return normalizedValue
      .split(/\n/)
      .flatMap((line, idx, arr) => {
        const blocks: RichBlock[] = [{ type: "text", text: line }];
        if (idx < arr.length - 1) blocks.push({ type: "line-break" });
        return blocks;
      });
  }

  const blocks: RichBlock[] = [];
  const imgRegex = /<img[^>]*src=['"]([^'"]+)['"][^>]*>/gi;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = imgRegex.exec(normalizedValue))) {
    const before = normalizedValue.slice(lastIndex, match.index);
    if (before.trim()) {
      const text = preserveTags ? before : before.replace(/<[^>]+>/g, "");
      blocks.push({ type: "text", text: text.trim() });
    }

    const rawSrc = match[1];
    const { src: normalizedSrc } = resolveImage(rawSrc);
    blocks.push({ type: "image", src: normalizedSrc, alt: "Question image" });
    lastIndex = imgRegex.lastIndex;
  }

  const remaining = normalizedValue.slice(lastIndex);
  if (remaining.trim()) {
    const text = preserveTags ? remaining : remaining.replace(/<[^>]+>/g, "");
    blocks.push({ type: "text", text: text.trim() });
  }

  return blocks.length > 0
    ? blocks
    : [
        {
          type: "text",
          text: preserveTags ? normalizedValue.trim() : normalizedValue.replace(/<[^>]+>/g, "").trim(),
        },
      ];
}

function normalizeBlocks(value: unknown, options: NormalizeTextOptions = {}): RichBlock[] {
  if (value === null || value === undefined) {
    return [{ type: "text", text: "" }];
  }

  if (typeof value === "string") {
    return normalizeStringBlocks(value, options);
  }

  if (typeof value === "object") {
    const node = value as { __kind?: string; type?: unknown; props?: Record<string, unknown> };
    if (node.__kind === "jsx" || node.__kind === "jsxs") {
      return normalizeReactNode(node, options);
    }
  }

  return [{ type: "text", text: normalizeText(value) }];
}

function normalizeChildren(children: unknown, options: NormalizeTextOptions = {}): RichBlock[] {
  if (Array.isArray(children)) {
    return children.flatMap((child) => normalizeBlocks(child, options));
  }

  return normalizeBlocks(children, options);
}

function normalizeReactNode(
  node: { type?: unknown; props?: Record<string, unknown> },
  options: NormalizeTextOptions = {}
): RichBlock[] {
  const tag = typeof node.type === "string" ? node.type : "div";
  const props = node.props ?? {};

  if (tag === "img") {
    const src = normalizeText(props.src);
    const { src: normalizedSrc } = resolveImage(src);
    return [
      {
        type: "image",
        src: normalizedSrc,
        alt: normalizeText(props.alt) || "Question image",
      },
    ];
  }

  if (tag === "br") {
    return [{ type: "line-break" }];
  }

  const childrenBlocks = normalizeChildren(props.children, options);
  return [
    {
      type: "container",
      tag,
      className: typeof props.className === "string" ? props.className : undefined,
      style: typeof props.style === "object" ? (props.style as Record<string, string | number>) : undefined,
      children: childrenBlocks,
    },
  ];
}

function normalizeOptions(options: unknown[]): NormalizedOption[] {
  return options.map((option, index) => ({
    key: `option_${index}`,
    blocks: normalizeBlocks(option, { preserveTags: true }),
  }));
}

function flattenBlocks(blocks: RichBlock[]): RichBlock[] {
  const all: RichBlock[] = [];
  for (const block of blocks) {
    all.push(block);
    if (block.type === "container") {
      all.push(...flattenBlocks(block.children));
    }
  }
  return all;
}

function normalizeQuestion(item: Record<string, unknown>, index: number): NormalizedQuestion {
  const options = Array.isArray(item.options) ? normalizeOptions(item.options) : [];
  const correctAnswer = typeof item.correctAnswer === "number" ? item.correctAnswer : null;
  const correctAnswers = correctAnswer !== null ? [correctAnswer] : [];

  const invalidReasons: string[] = [];
  if (!item.question) invalidReasons.push("missing_question");
  if (options.length < 2) invalidReasons.push("insufficient_options");
  if (correctAnswer === null) invalidReasons.push("missing_correct_answer");

  return {
    questionKey: `q_${index}`,
    sourceId: typeof item.id === "string" || typeof item.id === "number" ? item.id : null,
    question: normalizeBlocks(item.question),
    options,
    correctAnswers,
    explanation: typeof item.explanation === "string" ? item.explanation : null,
    selectionMode: "single",
    isValid: invalidReasons.length === 0,
    invalidReasons,
  };
}

function parseExamMeta(filePath: string): {
  departmentName: string;
  sourceYear: number;
  displayYear: number;
  variant: ExamVariant;
  examId: string;
  label: string;
} {
  const departmentName = path.basename(path.dirname(filePath));
  const filename = path.basename(filePath, ".js");
  const match = filename.match(/^(\d{4})(-model)?$/);

  if (!match) {
    throw new Error(`Invalid filename: ${filePath}`);
  }

  const sourceYear = Number(match[1]);
  const variant: ExamVariant = match[2] ? "model" : "regular";
  const displayYear = sourceYear === 2116 ? 2016 : sourceYear;
  const departmentSlug = slugify(departmentName);
  const examId = `${departmentSlug}__${displayYear}__${variant}`;
  const label = variant === "model" ? `${displayYear} Model` : `${displayYear}`;

  return { departmentName, sourceYear, displayYear, variant, examId, label };
}

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function copyImages() {
  if (!fs.existsSync(IMAGES_ROOT)) return;

  ensureDir(path.join(process.cwd(), "public", "images", "questions"));

  const files = fs.readdirSync(IMAGES_ROOT);
  for (const file of files) {
    const src = path.join(IMAGES_ROOT, file);
    const dest = path.join(process.cwd(), "public", "images", "questions", file);
    fs.copyFileSync(src, dest);
  }
}

function main() {
  ensureDir(EXAMS_DIR);
  ensureDir(REPORTS_DIR);

  copyImages();

  const files = readQuestionFiles();
  const exams: ExamMeta[] = [];
  const examIdSet = new Set<string>();
  const departmentsMap = new Map<string, DepartmentMeta>();

  let unresolvedImages = 0;
  let totalQuestions = 0;
  let totalPlayableQuestions = 0;
  let invalidQuestionCount = 0;

  for (const filePath of files) {
    const rawValue = safeEval(filePath);
    if (!Array.isArray(rawValue)) {
      throw new Error(`Expected array in ${filePath}`);
    }
    const raw = rawValue as Record<string, unknown>[];
    const { departmentName, sourceYear, displayYear, variant, examId, label } = parseExamMeta(filePath);
    const departmentSlug = slugify(departmentName);

    const questions = raw.map((item, index) => normalizeQuestion(item, index));

    const hasImages = questions.some((question) => {
      const questionBlocks = flattenBlocks(question.question);
      const optionBlocks = question.options.flatMap((option) => flattenBlocks(option.blocks));
      return [...questionBlocks, ...optionBlocks].some((block) => block.type === "image");
    });

    totalQuestions += questions.length;
    const playableQuestions = questions.filter((question) => question.isValid);
    totalPlayableQuestions += playableQuestions.length;
    invalidQuestionCount += questions.length - playableQuestions.length;

    if (examIdSet.has(examId)) {
      throw new Error(`Duplicate examId detected: ${examId}. Check year mapping and filenames.`);
    }

    examIdSet.add(examId);

    const examMeta: ExamMeta = {
      examId,
      departmentName,
      departmentSlug,
      sourceYear,
      displayYear,
      variant,
      label,
      sourcePath: filePath.replace(process.cwd(), ""),
      questionCount: questions.length,
      playableQuestionCount: playableQuestions.length,
      invalidQuestionCount: questions.length - playableQuestions.length,
      hasImages,
    };

    const dataset: ExamDataset = {
      schemaVersion,
      generatedAt: new Date().toISOString(),
      meta: examMeta,
      questions,
    };

    fs.writeFileSync(path.join(EXAMS_DIR, `${examId}.json`), JSON.stringify(dataset, null, 2));
    exams.push(examMeta);

    const department = departmentsMap.get(departmentSlug) ?? {
      name: departmentName,
      slug: departmentSlug,
      examCount: 0,
      totalQuestions: 0,
      totalPlayableQuestions: 0,
      years: [],
    };

    department.examCount += 1;
    department.totalQuestions += questions.length;
    department.totalPlayableQuestions += playableQuestions.length;
    if (!department.years.includes(displayYear)) department.years.push(displayYear);
    departmentsMap.set(departmentSlug, department);

    for (const question of questions) {
      const blocks = [
        ...flattenBlocks(question.question),
        ...question.options.flatMap((option) => flattenBlocks(option.blocks)),
      ];
      for (const block of blocks) {
        if (block.type === "image") {
          const exists = fs.existsSync(path.join(process.cwd(), "public", block.src));
          if (!exists) unresolvedImages += 1;
        }
      }
    }
  }

  const departments = Array.from(departmentsMap.values()).map((department) => ({
    ...department,
    years: department.years.sort((a, b) => b - a),
  }));

  const manifest: Manifest = {
    schemaVersion,
    generatedAt: new Date().toISOString(),
    departments: departments.sort((a, b) => a.name.localeCompare(b.name)),
    exams: exams.sort((a, b) => a.departmentName.localeCompare(b.departmentName)),
    stats: {
      examCount: exams.length,
      questionCount: totalQuestions,
      playableQuestionCount: totalPlayableQuestions,
      invalidQuestionCount,
      unresolvedImageCount: unresolvedImages,
    },
  };

  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));

  const reportPath = path.join(REPORTS_DIR, "data-quality.json");
  fs.writeFileSync(
    reportPath,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        invalidQuestionCount,
        unresolvedImages,
      },
      null,
      2
    )
  );
}

main();
