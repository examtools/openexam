"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  variant = "danger",
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "default";
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onCancel]);

  useEffect(() => {
    if (open) {
      dialogRef.current?.focus();
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
      />
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="relative z-10 mx-4 w-full max-w-md rounded-2xl border border-brand-border bg-brand-bg p-6 shadow-xl"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-brand-text">{title}</h3>
          <button
            onClick={onCancel}
            className="rounded-lg p-1 text-brand-textTertiary transition hover:text-brand-text"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <p className="mt-3 text-sm text-brand-textSecondary">{message}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="rounded-xl border border-brand-border px-4 py-2 text-sm font-semibold text-brand-text transition hover:bg-brand-surface"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`rounded-xl px-4 py-2 text-sm font-semibold text-white transition ${
              variant === "danger"
                ? "bg-red-600 hover:bg-red-700"
                : "bg-brand-primary hover:bg-brand-primaryDark"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
