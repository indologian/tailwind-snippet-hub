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

      toast.success("Berhasil disalin", {
        description: "Source code telah disalin ke clipboard.",
        duration: 3000,
      });

      setTimeout(() => {
        setCopied(false);
      }, 3000);
    } catch {
      toast.error("Gagal menyalin source code");
    }
  }

  return (
    <Button
      onClick={handleCopy}
      size="sm"
      variant="outline"
      className="
        h-11
        rounded-lg
        border-white/10
        bg-zinc-800/90
        backdrop-blur
        transition-all
        text-stone-100
        duration-300
        hover:shadow-sm
        hover:shadow-primary/30
        hover:bg-zinc-900
        dark:border-white/10
        hover:text-primary
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
