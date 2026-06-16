import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils/cn";

type SiteLogoProps = {
  className?: string;
  imageClassName?: string;
  labelClassName?: string;
  showWordmark?: boolean;
  linked?: boolean;
  priority?: boolean;
  size?: "sm" | "md" | "lg";
};

const sizes = {
  sm: {
    wrapper: "h-10 w-10",
    label: "text-sm",
  },
  md: {
    wrapper: "h-12 w-12",
    label: "text-base",
  },
  lg: {
    wrapper: "h-14 w-14",
    label: "text-lg",
  },
} as const;

function SiteLogoInner({
  className,
  imageClassName,
  labelClassName,
  showWordmark = true,
  priority = false,
  size = "md",
}: Omit<SiteLogoProps, "linked">) {
  const config = sizes[size];

  return (
    <div className={cn("inline-flex items-center gap-3", className)}>
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border border-brand-primary/15 bg-brand-bg/80 shadow-[0_12px_32px_-18px_rgba(78,47,32,0.55)]",
          config.wrapper,
          imageClassName,
        )}
      >
        <Image
          src="/icon.png"
          alt="Entrance Exam Practice logo"
          fill
          priority={priority}
          sizes="56px"
          className="object-cover"
        />
      </div>
      {showWordmark && (
        <div className={cn("leading-none", labelClassName)}>
          <p className="text-[10px] uppercase tracking-[0.32em] text-brand-primary/60">Entrance</p>
          <p className={cn("mt-1 font-display text-brand-primaryDark", config.label)}>
            Exam Practice
          </p>
        </div>
      )}
    </div>
  );
}

export function SiteLogo({ linked = false, ...props }: SiteLogoProps) {
  if (!linked) {
    return <SiteLogoInner {...props} />;
  }

  return (
    <Link
      href="/"
      aria-label="Go to Entrance Exam Practice home"
      className="inline-flex rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40 focus-visible:ring-offset-2"
    >
      <SiteLogoInner {...props} />
    </Link>
  );
}
