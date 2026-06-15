interface SeoProps {
  title?: string;
  description?: string;
  openGraph?: {
    title?: string;
    description?: string;
    type?: string;
    locale?: string;
    siteName?: string;
  };
}

export function getSiteSeo(): SeoProps {
  return {
    title: "Ethiopian Entrance Exam Studio",
    description:
      "Prepare for Ethiopia's entrance exams with focused practice and fast review. No login required.",
    openGraph: {
      title: "Ethiopian Entrance Exam Studio",
      description:
        "Past-exam practice with instant feedback, resume, and test mode for Ethiopian Grade 12 students.",
      type: "website",
      locale: "en_US",
      siteName: "Ethiopian Entrance Exam Studio",
    },
  };
}

export function getSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Ethiopian Entrance Exam Studio",
    description:
      "Practice past exams and build confidence for Ethiopian entrance exams.",
  };
}
