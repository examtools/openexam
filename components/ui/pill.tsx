import * as React from "react";

import { cn } from "@/lib/utils/cn";

type PillProps = {
  children: React.ReactNode;
  className?: string;
};

export function Pill({ children, className }: PillProps) {
  return <span className={cn("badge border-black/15 bg-white", className)}>{children}</span>;
}
