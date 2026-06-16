"use client";

import { motion } from "framer-motion";
import { BookOpen, Layers, BarChart3, Timer, RefreshCw, Award } from "lucide-react";

const features = [
  {
    step: "01",
    title: "Past Questions",
    description:
      "Access a comprehensive collection of past entrance exam questions organized by subject. Practice with real questions from previous years.",
    icon: BookOpen,
  },
  {
    step: "02",
    title: "Subject Filtering",
    description:
      "Easily find exams specific to your subject. Our categorized system helps you focus on what matters most for your studies.",
    icon: Layers,
  },
  {
    step: "03",
    title: "Instant Feedback",
    description:
      "Get immediate feedback on your answers. Learn from your mistakes with correct answers shown right after each question.",
    icon: BarChart3,
  },
  {
    step: "04",
    title: "Timed Test Mode",
    description:
      "Simulate real exam conditions with our timed test mode. Build your time management skills and reduce exam day anxiety.",
    icon: Timer,
  },
  {
    step: "05",
    title: "Progress Tracking",
    description:
      "Track your performance across multiple attempts. Identify strengths and weaknesses to optimize your study plan.",
    icon: RefreshCw,
  },
  {
    step: "06",
    title: "Open Source",
    description:
      "Fully open source. Anyone can contribute questions, improve the tool, and help build a better study tool for everyone.",
    icon: Award,
  },
];

export function LandingFeatures() {
  return (
    <section className="bg-brand-bgSecondary py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-primary/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-primary">
            Features
          </span>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-brand-text md:text-5xl">
            Everything You Need
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-brand-textSecondary">
            Powerful tools designed to help you ace any exam with confidence.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.step}
                className="group relative overflow-hidden rounded-2xl border border-brand-border bg-brand-bg p-8 transition-all hover:-translate-y-1 hover:border-brand-primary/30 hover:shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <span className="absolute right-4 top-4 text-6xl font-black leading-none text-brand-primary/5">
                  {feature.step}
                </span>

                <div className="relative z-10">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-primary to-brand-secondary text-white shadow-lg shadow-brand-primary/20">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="mb-3 text-xl font-bold text-brand-text">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-brand-textSecondary">
                    {feature.description}
                  </p>
                </div>

                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-brand-primary to-brand-secondary opacity-0 transition-opacity group-hover:opacity-100" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
