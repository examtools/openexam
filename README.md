# Ethiopian Exit Exam Studio

A public, local-first practice platform for Ethiopian university exit exams. No authentication required. Built with Next.js App Router, TypeScript, and Tailwind.

You can access the deployed version [here](https://exitexamstudio.app)

## Setup

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` – start local dev server
- `npm run build` – build for production (includes normalization step)
- `npm run start` – run production server

## Data Pipeline

Raw question files live in `Questions/<Department>/<Year>.js`.

Before build/dev the normalization scripts run:

1. `scripts/normalize-questions.ts` reads every question file and outputs structured JSON in `generated/`.
2. `scripts/validate-generated-data.ts` ensures datasets exist for every manifest entry.

Generated files:
- `generated/manifest.json`
- `generated/exams/<examId>.json`
- `generated/reports/data-quality.json`

### Normalization Rules
- Images are resolved from `images/questions` into `public/images/questions`.
- Invalid questions (missing answer, insufficient options) are skipped from exam sessions.
- Model files (`*-model.js`) are exposed as separate "Model" variants.

## Local Storage

All progress is stored locally under the key `practice-exit-exam:storage` with versioned migration.

## Routes

- `/` — Landing
- `/departments` — Department list
- `/departments/[departmentSlug]` — Year + variant list
- `/exam/[examId]` — Exam engine
- `/history` — Attempt history

## Deployment

No environment variables required.
