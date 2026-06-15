"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

export function LandingCta() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-primary to-brand-primaryDark py-24">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-white/10 blur-[100px]"
          animate={{
            translate: [0, 0, 30, -30, 0],
            scale: [1, 1.05, 0.95, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-brand-secondary/20 blur-[100px]"
          animate={{
            translate: [0, -30, 30, 0],
            scale: [1, 0.95, 1.05, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-5 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            Ready to Ace Your Entrance Exam?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            Join thousands of Ethiopian Grade 12 students already using our platform
            to prepare for their exams. Start practicing today — it&apos;s completely free.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/subjects"
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 text-base font-bold text-brand-primary shadow-xl transition-all hover:-translate-y-0.5 hover:shadow-2xl"
            >
              Start Practicing Now
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/subjects"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-white/20"
            >
              <BookOpen className="h-5 w-5" />
              Browse Subjects
            </Link>
          </div>

          <p className="mt-6 text-sm text-white/60">
            100% Free · No registration required · Start instantly
          </p>
        </motion.div>
      </div>
    </section>
  );
}
