import { BookOpen, Github, Terminal, Rocket, FolderTree, Brain, ExternalLink } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";

const sections = [
  { id: "setup", label: "Project Setup", icon: BookOpen },
  { id: "ai-questions", label: "AI Question Generation", icon: Brain },
  { id: "folder-structure", label: "Folder Structure", icon: FolderTree },
  { id: "run-locally", label: "Running Locally", icon: Terminal },
  { id: "deploy", label: "Deployment", icon: Rocket },
];

export function DocsContent() {
  return (
    <div className="page-bg min-h-screen flex flex-col">
      <main className="flex-1">
        <PageHeader
          title="Docs"
          eyebrow="Open Exam Practice"
          subtitle="Everything you need to set up, contribute to, and deploy the Open Exam Practice tool."
          backHref="/"
          backLabel="Home"
        />
        <section className="page-section mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
          <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-12">
            {/* Sidebar */}
            <nav className="mb-8 lg:mb-0" aria-label="Documentation sections">
              <div className="lg:sticky lg:top-28">
                <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-brand-textTertiary">
                  Sections
                </h2>
                <ul className="flex gap-2 overflow-x-auto pb-2 sm:gap-1 sm:overflow-x-visible sm:pb-0 sm:flex-col">
                  {sections.map((s) => {
                    const Icon = s.icon;
                    return (
                      <li key={s.id} className="shrink-0 sm:shrink">
                        <a
                          href={`#${s.id}`}
                          className="flex items-center gap-2 rounded-lg border border-brand-border bg-brand-bg px-3 py-1.5 text-sm font-medium text-brand-textSecondary whitespace-nowrap transition-colors hover:bg-brand-surface hover:text-brand-text sm:border-0 sm:bg-transparent sm:px-4 sm:py-2 sm:whitespace-normal"
                        >
                          <Icon className="h-4 w-4 shrink-0" />
                          <span>{s.label}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </nav>

            {/* Content */}
            <div className="min-w-0 space-y-16">

          {/* Project Setup */}
          <section id="setup" className="scroll-mt-28">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-primary to-brand-secondary text-white shadow-lg shadow-brand-primary/20">
                <BookOpen className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-brand-text">Project Setup</h2>
            </div>
            <div className="space-y-4 text-sm leading-relaxed text-brand-textSecondary">
              <h3 className="text-base font-semibold text-brand-text">Prerequisites</h3>
              <ul className="list-disc space-y-1 pl-5">
                <li>Node.js 20+</li>
                <li>npm, yarn, or pnpm</li>
                <li>Git</li>
                <li>A code editor (VS Code recommended)</li>
              </ul>

              <h3 className="pt-4 text-base font-semibold text-brand-text">Clone the Repository</h3>
              <div className="overflow-x-auto rounded-xl border border-brand-border bg-brand-surface p-4 font-mono text-sm">
                <pre className="text-brand-text">git clone https://github.com/examtools/openexams.git</pre>
                <pre className="mt-1 text-brand-text">cd openexam</pre>
              </div>

              <h3 className="pt-4 text-base font-semibold text-brand-text">Install Dependencies</h3>
              <div className="overflow-x-auto rounded-xl border border-brand-border bg-brand-surface p-4 font-mono text-sm">
                <pre className="text-brand-text">npm install</pre>
              </div>
            </div>
          </section>

          {/* AI Question Generation */}
          <section id="ai-questions" className="scroll-mt-28">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-primary to-brand-secondary text-white shadow-lg shadow-brand-primary/20">
                <Brain className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-brand-text">AI Question Generation</h2>
            </div>
            <div className="space-y-4 text-sm leading-relaxed text-brand-textSecondary">
              <p>
                You can use AI to generate questions for any subject. The project
                includes a comprehensive format specification in{" "}
                <code className="rounded bg-brand-surface px-1.5 py-0.5 font-mono text-brand-text">
                  QUESTIONS-FORMAT.md
                </code>{" "}
                that is designed to be fed to an AI agent as context.
              </p>

              <h3 className="pt-4 text-base font-semibold text-brand-text">Step 1: Prepare Source Material</h3>
              <p>
                Gather your source materials: past exams, textbooks, notes, or
                any study material. The AI will use these to generate questions
                in the correct format.
              </p>

              <h3 className="pt-4 text-base font-semibold text-brand-text">Step 2: Feed Context to AI</h3>
              <p>
                Provide the AI agent with:
              </p>
              <ul className="list-disc space-y-1 pl-5">
                <li>
                  The full contents of{" "}
                  <code className="rounded bg-brand-surface px-1.5 py-0.5 font-mono text-brand-text">
                    QUESTIONS-FORMAT.md
                  </code>
                </li>
                <li>Your source material (past exams, notes, etc.)</li>
              </ul>

              <h3 className="pt-4 text-base font-semibold text-brand-text">Step 3: Review Generated Questions</h3>
              <p>
                The AI will produce question files in the correct format. Review
                them for accuracy, then place them in the appropriate subject
                folder under{" "}
                <code className="rounded bg-brand-surface px-1.5 py-0.5 font-mono text-brand-text">
                  Questions/&lt;Subject&gt;/
                </code>
              </p>

              <div className="mt-4 rounded-xl border border-brand-border bg-brand-bg p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-textTertiary">
                  Example prompt
                </p>
                <div className="mt-2 overflow-x-auto rounded-lg bg-brand-surface p-3 font-mono text-xs text-brand-text">
                  <p>{`"Generate questions in the format specified in QUESTIONS-FORMAT.md using the following source material: [paste content]"`}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Folder Structure */}
          <section id="folder-structure" className="scroll-mt-28">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-primary to-brand-secondary text-white shadow-lg shadow-brand-primary/20">
                <FolderTree className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-brand-text">Folder Structure</h2>
            </div>
            <div className="space-y-4 text-sm leading-relaxed text-brand-textSecondary">
              <div className="overflow-x-auto rounded-xl border border-brand-border bg-brand-surface p-4 sm:p-6">
                <pre className="font-mono text-xs leading-relaxed text-brand-text sm:text-sm">{`├── app/                    # Next.js App Router pages
│   ├── (marketing)/        # Landing page
│   ├── subjects/           # Subject listing + detail
│   ├── exam/[examId]/      # Exam engine
│   ├── study/              # Study session pages
│   ├── history/            # Attempt history
│   ├── docs/               # Documentation
│   └── layout.tsx          # Root layout
├── components/
│   ├── branding/           # SiteLogo
│   ├── catalog/            # Subject list, exam cards
│   ├── docs/               # Documentation components
│   ├── exam/               # Exam engine
│   ├── history/            # History page
│   ├── landing/            # Landing page sections
│   ├── layout/             # Header, footer
│   ├── seo/                # JSON-LD structured data
│   ├── study/              # Study session components
│   └── ui/                 # Reusable UI (button, input, etc.)
├── lib/
│   ├── data/               # Path constants, generated data readers
│   ├── exam/               # Types, scoring, ID generation
│   ├── seo/                # Site config, metadata builder
│   ├── storage/            # localStorage persistence
│   ├── study/              # SRS algorithm, pool logic
│   └── utils/              # Helpers (cn, time, slug)
├── Questions/              # Add any subject here
│   ├── Subject A/           # e.g., Biology, Mathematics, Physics
│   │   ├── 2020.js          # { year, questions: [...] }
│   │   ├── 2021.js
│   │   └── ...
│   ├── Subject B/           # Any subject — no limit
│   │   ├── 2020.js
│   │   ├── 2021.js
│   │   └── ...
│   └── ...                   # Drop in a folder + .js files, done
├── generated/              # AUTO-GENERATED datasets
├── images/                 # Source images for questions
├── public/                 # Static assets
├── scripts/                # Build/transform scripts
├── tests/                  # Unit + E2E tests
├── QUESTIONS-FORMAT.md     # Question format spec for AI
└── package.json`}</pre>
              </div>
            </div>
          </section>

          {/* Running Locally */}
          <section id="run-locally" className="scroll-mt-28">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-primary to-brand-secondary text-white shadow-lg shadow-brand-primary/20">
                <Terminal className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-brand-text">Running Locally</h2>
            </div>
            <div className="space-y-4 text-sm leading-relaxed text-brand-textSecondary">
              <h3 className="text-base font-semibold text-brand-text">Development Server</h3>
              <div className="overflow-x-auto rounded-xl border border-brand-border bg-brand-surface p-4 font-mono text-sm">
                <pre className="text-brand-text">npm run dev</pre>
              </div>
              <p>
                This runs the data pipeline (normalization and validation) and
                starts the Next.js dev server. Open{" "}
                <code className="rounded bg-brand-surface px-1.5 py-0.5 font-mono text-brand-text">
                  http://localhost:3000
                </code>{" "}
                in your browser.
              </p>

              <h3 className="pt-4 text-base font-semibold text-brand-text">Available Scripts</h3>
              <div className="overflow-x-auto rounded-xl border border-brand-border bg-brand-surface p-4">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-brand-border text-xs font-semibold uppercase tracking-wider text-brand-textTertiary">
                      <th className="pb-2 pr-4">Command</th>
                      <th className="pb-2">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border text-brand-textSecondary">
                    <tr>
                      <td className="py-2 pr-4 font-mono text-xs text-brand-text sm:text-sm">npm run dev</td>
                      <td className="py-2 text-xs sm:text-sm">Start local dev server</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-mono text-xs text-brand-text sm:text-sm">npm run build</td>
                      <td className="py-2 text-xs sm:text-sm">Build for production</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-mono text-xs text-brand-text sm:text-sm">npm run start</td>
                      <td className="py-2 text-xs sm:text-sm">Run production server</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-mono text-xs text-brand-text sm:text-sm">npm run lint</td>
                      <td className="py-2 text-xs sm:text-sm">Run Next.js lint</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-mono text-xs text-brand-text sm:text-sm">npm run test</td>
                      <td className="py-2 text-xs sm:text-sm">Run unit tests</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-mono text-xs text-brand-text sm:text-sm">npm run test:e2e</td>
                      <td className="py-2 text-xs sm:text-sm">Run Playwright E2E tests</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3 className="pt-4 text-base font-semibold text-brand-text">Adding New Questions</h3>
              <ol className="list-decimal space-y-2 pl-5">
                <li>Create or edit a file in <code className="rounded bg-brand-surface px-1.5 py-0.5 font-mono text-brand-text">Questions/&lt;Subject&gt;/&lt;year&gt;.js</code></li>
                <li>Follow the format in <code className="rounded bg-brand-surface px-1.5 py-0.5 font-mono text-brand-text">QUESTIONS-FORMAT.md</code></li>
                <li>Run <code className="rounded bg-brand-surface px-1.5 py-0.5 font-mono text-brand-text">npm run dev</code> — the pipeline processes new files automatically</li>
                <li>Verify at <code className="rounded bg-brand-surface px-1.5 py-0.5 font-mono text-brand-text">http://localhost:3000/subjects/&lt;slug&gt;</code></li>
              </ol>
            </div>
          </section>

          {/* Deployment */}
          <section id="deploy" className="scroll-mt-28">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-primary to-brand-secondary text-white shadow-lg shadow-brand-primary/20">
                <Rocket className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-brand-text">Deployment</h2>
            </div>
            <div className="space-y-4 text-sm leading-relaxed text-brand-textSecondary">
              <h3 className="text-base font-semibold text-brand-text">Vercel (Recommended)</h3>
              <p>
                The live site is deployed at{" "}
                <a
                  href="https://openexams.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-brand-primary underline underline-offset-2 transition hover:text-brand-primaryDark"
                >
                  openexams.vercel.app                </a>
                .
              </p>
              <ol className="list-decimal space-y-2 pl-5">
                <li>Push your repository to GitHub</li>
                <li>Import the project into Vercel</li>
                <li>No environment variables are required</li>
                <li>Deploy — the build step automatically runs normalization and validation</li>
              </ol>

              <div className="overflow-x-auto rounded-xl border border-brand-border bg-brand-surface p-4 font-mono text-sm">
                <pre className="text-brand-text">vercel --prod</pre>
              </div>

              <h3 className="pt-4 text-base font-semibold text-brand-text">Other Platforms</h3>
              <p>
                The project produces a standard Next.js static export. You can
                deploy to any platform that supports Node.js:
              </p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Netlify</li>
                <li>Railway</li>
                <li>DigitalOcean App Platform</li>
                <li>Any VPS with Node.js</li>
              </ul>

              <div className="mt-6 rounded-xl border border-brand-border bg-brand-bg p-4">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-textTertiary">
                  <Github className="h-3.5 w-3.5" />
                  Contribute
                </p>
                <p className="mt-2 text-sm text-brand-textSecondary">
                  Found a bug or want to add a feature? Open an issue or submit
                  a pull request on{" "}
                  <a
                    href="https://github.com/examtools/openexams"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-medium text-brand-primary underline underline-offset-2 hover:text-brand-primaryDark"
                  >
                    GitHub
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  .
                </p>
              </div>
            </div>
          </section>
          </div>
        </div>
      </section>
      </main>
    </div>
  );
}
