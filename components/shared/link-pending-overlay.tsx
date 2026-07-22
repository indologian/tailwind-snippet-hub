// components/link-pending-overlay.tsx
"use client";
import { Loader2 } from "lucide-react";
import { useLinkStatus } from "next/link";

export function LinkPendingOverlay() {
  const { pending } = useLinkStatus();
  if (!pending) return null;

  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-white/60 backdrop-blur-sm dark:bg-black/60">
      <Loader2 className="h-6 w-6 animate-spin text-indigo-600 dark:text-indigo-400" />
    </div>
  );
}
