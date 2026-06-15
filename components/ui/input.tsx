import * as React from "react";

import { cn } from "@/lib/utils/cn";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, ...props },
  ref
) {
  return (
    <input
      ref={ref}
      className={cn(
        "h-11 w-full rounded-xl border border-black/15 bg-white/90 px-4 text-sm shadow-sm focus:border-brand-primary focus:ring-1 focus:ring-brand-primary",
        className
      )}
      {...props}
    />
  );
});
