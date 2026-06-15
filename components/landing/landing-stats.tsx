"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Building2, FileText, HelpCircle, BarChart3 } from "lucide-react";

const statsData = [
  { key: "departments", icon: Building2, suffix: "+" },
  { key: "exams", icon: FileText, suffix: "+" },
  { key: "questions", icon: HelpCircle, suffix: "+" },
  { key: "activeUsers", icon: BarChart3, suffix: "K+" },
];

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

type StatsBarProps = {
  stats: {
    departmentCount: number;
    examCount: number;
    playableQuestionCount: number;
  };
};

export function LandingStats({ stats }: StatsBarProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counters, setCounters] = useState<number[]>([0, 0, 0, 0]);

  const targets = [
    stats.departmentCount,
    stats.examCount,
    stats.playableQuestionCount,
    Math.round(stats.playableQuestionCount / 100),
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            const duration = 1500;
            const startTime = performance.now();

            const animate = (now: number) => {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const easeOut = 1 - Math.pow(1 - progress, 3);

              setCounters(targets.map((t) => Math.round(easeOut * t)));

              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };

            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated, stats]);

  const items = [
    { ...statsData[0], value: counters[0], target: targets[0] },
    { ...statsData[1], value: counters[1], target: targets[1] },
    { ...statsData[2], value: counters[2], target: targets[2] },
    { ...statsData[3], value: counters[3], target: targets[3] },
  ];

  return (
    <section ref={sectionRef} className="bg-brand-bgSecondary py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-primary/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-primary">
            Platform Stats
          </span>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.key}
                className="group relative overflow-hidden rounded-2xl border border-brand-border bg-brand-bg p-6 text-center transition-all hover:-translate-y-1 hover:border-brand-primary/40 hover:shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-primary to-brand-secondary opacity-0 transition-opacity group-hover:opacity-100" />

                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 text-brand-primary">
                  <Icon className="h-6 w-6" />
                </div>

                <span className="block text-4xl font-extrabold tracking-tight text-brand-primary md:text-5xl">
                  {formatNumber(item.value)}{item.suffix}
                </span>
                <span className="mt-1 block text-sm font-medium text-brand-text">
                  {item.key === "departments" ? "Subjects" :
                   item.key === "exams" ? "Exams" :
                   item.key === "questions" ? "Questions" : "Active Users"}
                </span>
                <span className="mt-1 block text-xs text-brand-textTertiary">
                  {item.key === "departments" ? "Across all subjects" :
                   item.key === "exams" ? "Practice sets" :
                   item.key === "questions" ? "With answers" : "And growing"}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
