"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, ArrowRight, Smartphone, Globe } from "lucide-react";

import { Button } from "@/components/ui/button";

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
};

export function LandingHero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-brand-bg">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-48 -right-48 h-[600px] w-[600px] rounded-full bg-brand-primary/10 blur-[80px]"
          animate={{ y: [0, 30, 0], x: [0, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-brand-secondary/10 blur-[80px]"
          animate={{ y: [0, -30, 0], x: [0, 10, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-accent/8 blur-[80px]"
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl px-5 pb-20 pt-28 sm:px-6 sm:pt-32">
        <div className="space-y-6 sm:space-y-7">
            <motion.div
              className="inline-flex items-center gap-2 rounded-full bg-brand-primary/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-primary"
              initial="initial"
              animate="animate"
              variants={fadeUp}
              transition={{ duration: 0.6 }}
            >
              <BookOpen className="h-3.5 w-3.5" />
              Entrance Exam Practice Platform
            </motion.div>

            <motion.h1
              className="text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
              initial="initial"
              animate="animate"
              variants={fadeUp}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <span className="bg-gradient-to-r from-brand-text via-brand-primary to-brand-secondary bg-clip-text text-transparent">
                Master Your Entrance Exam
              </span>
            </motion.h1>

            <motion.p
              className="max-w-xl text-lg text-brand-textSecondary sm:text-xl"
              initial="initial"
              animate="animate"
              variants={fadeUp}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Free practice platform for Ethiopian Grade 12 students. Browse by
              subject, tackle past questions, and build confidence for exam day.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial="initial"
              animate="animate"
              variants={fadeUp}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <Button asChild variant="primary" className="gap-2 px-7 py-3.5 text-base shadow-lg shadow-brand-primary/25">
                <Link href="/subjects">
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="secondary" className="gap-2 px-7 py-3.5 text-base">
                <Link href="/subjects">
                  <BookOpen className="h-4 w-4" />
                  Browse Exams
                </Link>
              </Button>
            </motion.div>

            <motion.div
              className="flex flex-wrap items-center gap-6 text-sm text-brand-textTertiary"
              initial="initial"
              animate="animate"
              variants={fadeUp}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-primary to-brand-secondary text-white">
                  <Smartphone className="h-4 w-4" />
                </div>
                <span>Web Platform</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-primary to-brand-secondary text-white">
                  <Globe className="h-4 w-4" />
                </div>
                <span>Free Access</span>
              </div>
              <span className="text-brand-border">|</span>
              <span>100% Free · No login · Resume anytime</span>
            </motion.div>

        </div>
      </div>
    </section>
  );
}
