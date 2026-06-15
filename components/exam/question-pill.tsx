import { cn } from "@/lib/utils/cn";

export function QuestionPill({
  label,
  active,
  answered,
  flagged,
  showAnsweredIndicator = false,
  onClick,
}: {
  label: string;
  active: boolean;
  answered: boolean;
  flagged: boolean;
  showAnsweredIndicator?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center rounded-full border text-xs font-semibold transition",
        active ? "border-brand-accent bg-brand-accent/70 text-brand-primaryDark" : "border-black/10",
        answered && !active ? "bg-brand-success/10 text-brand-success" : "bg-white",
        flagged ? "ring-2 ring-brand-error/40" : ""
      )}
    >
      {label}
      {showAnsweredIndicator && answered && (
        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-brand-success" />
      )}
    </button>
  );
}
