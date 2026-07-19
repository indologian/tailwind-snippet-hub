"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

type Props = {
  code: string;
};

export function CopyCodeButton({ code }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);

      setCopied(true);

      toast.success("Source code berhasil disalin 🎉");

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      toast.error("Gagal menyalin source code");
    }
  }

  return (
    <Button
      onClick={handleCopy}
      variant="outline"
      className="
        h-11
        rounded-xl
        border-border/70
        bg-background/70
        backdrop-blur
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:border-primary/40
        hover:bg-primary/10
        hover:shadow-lg
        hover:shadow-primary/10
        dark:border-white/10
      "
    >
      {copied ? (
        <>
          <Check className="mr-2 h-4 w-4 text-green-500" />
          Tersalin
        </>
      ) : (
        <>
          <Copy className="mr-2 h-4 w-4" />
          Copy Code
        </>
      )}
    </Button>
  );
}
