import Link from "next/link";

import type { Manifest } from "@/lib/exam/types";
import { Pill } from "@/components/ui/pill";

const faqItems = [
  {
    question: "Is this exam practice tool free?",
    answer:
      "Yes. It is completely free and open source. Anyone can browse subjects, open exams, and practice without creating an account.",
  },
  {
    question: "What subjects are available?",
    answer:
      "The tool supports any subject. The community can contribute questions for any field of study through pull requests.",
  },
  {
    question: "Can I contribute my own questions?",
    answer:
      "Absolutely! This is an open-source project. You can add questions for any subject or exam by following the documentation and submitting a pull request.",
  },
  {
    question: "Does the site work for different exam modes?",
    answer:
      "Yes. Use practice mode for immediate feedback or test mode for a timed, exam-like session. Your progress is saved locally.",
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


