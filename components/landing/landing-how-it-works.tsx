"use client";

import { motion } from "framer-motion";
import { Search, NotebookPen, Trophy, ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Choose Your Subject",
    description:
      "Browse subjects and find the exam set that matches your studies. All questions are organized for easy navigation.",
    icon: Search,
  },
  {
    number: "02",
    title: "Practice or Test Mode",
    description:
      "Study with instant feedback in practice mode, or simulate the real exam with timed test mode. Your progress saves automatically.",
    icon: NotebookPen,
  },
  {
    number: "03",
    title: "Review & Improve",
    description:
      "Get detailed results after each attempt. Review your answers, track your progress, and focus on areas that need improvement.",
    icon: Trophy,
  },
];

export function LandingHowItWorks() {
  const items = steps.flatMap((step, index) => {
    const elements: ("card" | "arrow")[] = ["card"];
    if (index < steps.length - 1) elements.push("arrow");
    return elements.map((type) => ({ type, stepIndex: index, step }));
  });

  return (
    <section className="bg-brand-bg py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-primary/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-primary">
            Simple Process
          </span>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-brand-text md:text-5xl">
            How It Works
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-brand-textSecondary">
            Getting started with your exam preparation is easy. Follow these three simple steps.
          </p>
        </motion.div>

        <div className="flex flex-col items-center md:flex-row md:items-start md:justify-center">
          {items.map((item, idx) => {
            const { type, stepIndex, step } = item;
            const Icon = step.icon;

            if (type === "arrow") {
              return (
                <div
                  key={`arrow-${stepIndex}`}
                  className="flex items-center justify-center py-3 text-brand-primary/30 md:self-center md:py-0 md:px-1"
                >
                  <ArrowRight className="h-6 w-6 rotate-90 md:rotate-0" />
                </div>
              );
            }

            return (
              <div
                key={step.number}
                className="w-full max-w-sm md:w-0 md:flex-1"
              >
                <motion.div
                  className="group rounded-2xl border border-brand-border bg-brand-bgSecondary p-8 text-center transition-all hover:-translate-y-2 hover:border-brand-primary/40 hover:shadow-xl"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: stepIndex * 0.15 }}
                >
                  <span className="block pb-4 text-5xl font-black leading-none text-brand-primary/5">
                    {step.number}
                  </span>

                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-primary to-brand-secondary text-white shadow-lg shadow-brand-primary/25">
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="mb-3 text-xl font-bold text-brand-text">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-brand-textSecondary">
                    {step.description}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
