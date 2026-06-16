import Link from "next/link";
import { Github, Heart } from "lucide-react";
import { SiteLogo } from "@/components/branding/site-logo";

export function OpenSourceFooter() {
  return (
    <footer className="border-t border-brand-border bg-brand-bgSecondary">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          <div className="sm:col-span-2">
            <SiteLogo linked size="sm" />
            <p className="mt-4 max-w-md text-sm leading-relaxed text-brand-textSecondary">
              An open-source, community-driven exam practice tool.
              Anyone can contribute questions, improve features, and help
              build a better study tool for everyone.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-brand-text">
              Links
            </h4>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  href="/docs"
                  className="text-sm text-brand-textSecondary transition-colors hover:text-brand-primary"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/examtools/openexam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-brand-textSecondary transition-colors hover:text-brand-primary"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://patreon.com/mafianextdoor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-brand-textSecondary transition-colors hover:text-brand-primary"
                >
                  <Heart className="h-4 w-4" />
                  Support on Patreon
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-brand-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-brand-textTertiary">
            Open source · MIT License
          </p>
          <p className="text-xs text-brand-textTertiary/60">
            Built with ❤️ for the community
          </p>
        </div>
      </div>
    </footer>
  );
}
