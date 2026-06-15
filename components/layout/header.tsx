"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { SiteLogo } from "@/components/branding/site-logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const navLinks = [
  { href: "/subjects", label: "Subjects" },
  { href: "/study", label: "Study" },
  { href: "/history", label: "History" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const close = () => setMobileOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-brand-bg transition-colors">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-6">
        <SiteLogo linked size="sm" />

        <nav className="hidden items-center gap-1 sm:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-4 py-2 text-sm font-medium text-brand-textSecondary transition-colors hover:bg-brand-surface hover:text-brand-text"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/subjects"
            className="ml-2 rounded-xl bg-gradient-to-br from-brand-primary to-brand-primaryDark px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-brand-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-xl"
          >
            Get Started
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-brand-border text-brand-textSecondary transition-all hover:border-brand-borderHover hover:text-brand-text sm:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden bg-brand-bg sm:hidden"
          >
            <div className="mx-auto max-w-6xl space-y-1 px-5 pb-6 pt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  className="block rounded-lg px-4 py-3 text-sm font-medium text-brand-textSecondary transition-colors hover:bg-brand-surface hover:text-brand-text"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/subjects"
                onClick={close}
                className="mt-3 block rounded-xl bg-gradient-to-br from-brand-primary to-brand-primaryDark px-4 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-brand-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
