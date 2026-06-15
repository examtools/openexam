# Question File Format Reference

This document defines the exact format for raw question files used in the Ethiopian
Exit Exam Studio project. Use this as the single source of truth when generating or
modifying question data.

> **How to use this file:** Feed this document as context to an AI agent along with
> any subject material, and instruct the agent to produce question files that conform
> to the format described below.

---

## 1. Directory Structure

```
Questions/
  <Subject Name>/
    <year>.js
    <year>-model.js          (optional — model/variant exams)
```

**Rules:**
- `<Subject Name>` is the human-readable name (e.g. `Biology`, `Scholastic Aptitude`).
- `<year>` is a 4-digit number (e.g. `2015`, `2016`).
- Appending `-model` before `.js` marks the file as a model exam variant.
- Files **must** have a `.js` extension.

### Current Subjects

| Subject                | Years    |
|------------------------|----------|
| Biology                | 2015–2017 |
| Chemistry              | 2015–2017 |
| English                | 2015–2017 |
| Mathematics            | 2015–2017 |
| Physics                | 2015–2017 |
| Scholastic Aptitude    | 2015–2017 |

---

## 2. File Format

Each question file is a **plain JavaScript file** that exports an array of question
objects. No `export` keyword is needed — the file is evaluated as a bare expression.

```js
[
  // question objects here
]
```

The normalizer uses `vm.runInNewContext()` to evaluate the file. The `e` helper
object (described below) is available in scope for constructing JSX-like structures.

---

## 3. Question Object Schema

### 3.1. Simple Text Questions (most common)

```js
{
  id: "2015_math_1",                       // string — unique within the file
  question: "If f(x) = 2x² - 3x + 1, find f(2).",
  options: ["3", "5", "7", "9"],           // array of strings (min 2)
  correctAnswer: 0,                        // number — 0-based index into options
  explanation: "f(2) = 2(4) - 6 + 1 = 8 - 6 + 1 = 3."
}
```

### 3.2. Questions with Images

Use `<img>` tags inside the string to embed images:

```js
{
  id: "2015_bio_10",
  question: "Identify the structure labeled X:<br/><img src='/questions/cell-diagram.png'/>",
  options: ["Nucleus", "Mitochondria", "Ribosome", "Golgi"],
  correctAnswer: 0,
  explanation: "Structure X points to the nucleus."
}
```

**Image path rules:**
- Place image files in `images/questions/<filename>`
- Reference them in question/option strings as `/questions/<filename>` or `images/questions/<filename>`
- Supported image paths are resolved automatically during normalization

### 3.3. Questions with JSX-Rendered Content

For advanced formatting (subscripts, styled text, math expressions), use the `e()`
helper that is available in scope:

```js
{
  id: "2015_chem_5",
  question: e.jsx("div", { children: [
    "Balance the equation: ",
    e.jsx("sub", { children: "2" }),
  ]}),
  options: [
    e.jsx("div", { children: [
      "2H",
      e.jsx("sub", { children: "2" }),
      " + O",
      e.jsx("sub", { children: "2" }),
      " → 2H",
      e.jsx("sub", { children: "2" }),
      "O"
    ]}),
    "H₂ + O₂ → H₂O",
    "2H + O → H₂O",
    "H₂O → H₂ + O"
  ],
  correctAnswer: 0,
  explanation: "The balanced equation is 2H₂ + O₂ → 2H₂O."
}
```

The `e` helper exposes two functions and a fragment constant:

| Function / Constant   | Purpose                                  |
|-----------------------|------------------------------------------|
| `e.jsx(type, props)`  | Creates a single-child JSX element       |
| `e.jsxs(type, props)` | Creates a multi-child JSX element        |
| `e.Fragment`          | Fragment reference (not needed in practice) |

### 3.4. Multi-line Questions

Use `<br>` tags or literal newlines within strings:

```js
{
  id: "2015_eng_12",
  question: "Read the passage below and answer the question.<br><br>\"It was the best of times, it was the worst of times...\"<br><br>Which novel opens with this line?",
  options: ["Great Expectations", "A Tale of Two Cities", "Oliver Twist", "David Copperfield"],
  correctAnswer: 1,
  explanation: "A Tale of Two Cities by Charles Dickens."
}
```

---

## 4. Field Reference

| Field           | Type            | Required | Description                                              |
|-----------------|-----------------|----------|----------------------------------------------------------|
| `id`            | `string`        | Yes      | Unique identifier within the file (e.g. `"2015_math_1"`) |
| `question`      | `string` / JSX  | Yes      | The question text (can include `<img>`, `<br>`, JSX)     |
| `options`       | `string[]` / JSX[] | Yes   | Array of answer choices (minimum **2**)                  |
| `correctAnswer` | `number`        | Yes      | 0-based index of the correct option in the `options` array |
| `explanation`   | `string` / null | No       | Explanation shown after answering (can be omitted or `null`) |

---

## 5. Validation Rules

The normalization script (`scripts/normalize-questions.ts`) runs automatically
before every `dev` and `build`. It applies these validation checks:

| Condition                          | Invalid Reason            | Behaviour                                     |
|------------------------------------|---------------------------|-----------------------------------------------|
| `question` is missing or empty     | `missing_question`        | Question excluded from playable count          |
| Fewer than 2 options               | `insufficient_options`    | Question excluded from playable count          |
| `correctAnswer` is not a number    | `missing_correct_answer`  | Question excluded from playable count          |
| All checks pass                    | —                         | `isValid: true`, playable                      |

Invalid questions remain in the generated dataset (with `isValid: false`) so they
can be inspected, but they are filtered out during exam sessions.

---

## 6. Generated Output Format (for reference)

After normalization, each file produces a JSON dataset at:
`generated/exams/<subjectSlug>__<displayYear>__<variant>.json`

When feeding context to an AI, you can show the raw format (Section 3) as the
input target and the generated format below as supplementary context.

**Dataset structure:**

```json
{
  "schemaVersion": 1,
  "generatedAt": "2026-06-15T15:35:02.556Z",
  "meta": {
    "examId": "mathematics__2015__regular",
    "subjectName": "Mathematics",
    "subjectSlug": "mathematics",
    "sourceYear": 2015,
    "displayYear": 2015,
    "variant": "regular",
    "label": "2015",
    "sourcePath": "/Questions/Mathematics/2015.js",
    "questionCount": 60,
    "playableQuestionCount": 60,
    "invalidQuestionCount": 0,
    "hasImages": false
  },
  "questions": [
    {
      "questionKey": "q_0",
      "sourceId": "2015_math_1",
      "question": [
        { "type": "text", "text": "If f(x) = 2x² - 3x + 1, find f(2)." }
      ],
      "options": [
        { "key": "option_0", "blocks": [{ "type": "text", "text": "3" }] },
        { "key": "option_1", "blocks": [{ "type": "text", "text": "5" }] },
        { "key": "option_2", "blocks": [{ "type": "text", "text": "7" }] },
        { "key": "option_3", "blocks": [{ "type": "text", "text": "9" }] }
      ],
      "correctAnswers": [0],
      "explanation": "f(2) = 2(4) - 6 + 1 = 8 - 6 + 1 = 3.",
      "selectionMode": "single",
      "isValid": true,
      "invalidReasons": []
    }
  ]
}
```

---

## 7. Adding a New Subject / Scaling

### Adding questions to an existing subject

1. Create or edit `Questions/<Subject>/<year>.js`
2. Run `npm run dev` or `npm run build` — normalization runs automatically
3. Verify the generated dataset appears under `generated/exams/`

### Adding a brand-new subject

1. Create a new folder: `Questions/<New Subject Name>/`
2. Add one or more year files (e.g. `2015.js`)
3. Run `npm run dev` — the subject appears automatically in the manifest
4. The new subject appears on the `/subjects` page

### Adding a model exam variant

Name the file `<year>-model.js` (e.g. `2020-model.js`). It appears as a separate
"Model" variant in the UI alongside regular exams.

### Question count guidelines per exam

| Subject              | Recommended question count |
|----------------------|---------------------------|
| Biology              | 100                       |
| Chemistry            | 80                        |
| English              | 100                       |
| Mathematics          | 60                        |
| Physics              | 60                        |
| Scholastic Aptitude  | 60                        |

---

## 8. Quick Reference — Minimal Viable File

```js
[
  {
    id: "2015_sample_1",
    question: "What is the capital of France?",
    options: ["London", "Paris", "Berlin", "Madrid"],
    correctAnswer: 1,
    explanation: "Paris is the capital of France."
  },
  {
    id: "2015_sample_2",
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correctAnswer: 1,
    explanation: "2 + 2 = 4."
  }
]
```

Save this file as `Questions/Sample Subject/2015.js` and run `npm run dev`.
