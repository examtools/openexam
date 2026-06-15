import Link from "next/link";

import type { DepartmentMeta, Manifest } from "@/lib/exam/types";
import { Pill } from "@/components/ui/pill";

const faqItems = [
  {
    question: "Is this Ethiopian entrance exam practice platform free?",
    answer:
      "Yes. Students can browse subjects, open past entrance exams, and practice without creating an account.",
  },
  {
    question: "Which subjects are included?",
    answer:
      "The platform covers Grade 12 entrance exam subjects including English, Mathematics, Biology, Chemistry, Physics, and Scholastic Aptitude.",
  },
  {
    question: "Can I practice by year and exam type?",
    answer:
      "Yes. Each subject page groups available entrance exams by year for easy browsing.",
  },
  {
    question: "Does the site work for revision and mock testing?",
    answer:
      "Yes. Students can use practice mode for immediate feedback or test mode for a more exam-like session.",
  },
];

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

export function getLandingFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}


