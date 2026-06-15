import { cn } from "@/lib/utils/cn";

type ProgressProps = {
  value: number;
  className?: string;
};

export function Progress({ value, className }: ProgressProps) {
  const safe = Math.max(0, Math.min(100, value));

  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-full bg-black/10", className)} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={safe}>
      <div className="h-full rounded-full bg-brand-primary transition-all duration-300" style={{ width: `${safe}%` }} />
    </div>
  );
}
