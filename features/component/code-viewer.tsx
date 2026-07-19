"use client";

import { Button } from "@/app/admin/components/_components/ui/buttonn";
import { Copy } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { toast } from "sonner";

export function CodeViewer({ code }: { code: string }) {
  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    toast.success("Code copied!");
  }

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-xl border border-slate-200">
        <SyntaxHighlighter
          language="html"
          style={oneLight}
          customStyle={{
            margin: 0,
            padding: "1.25rem",
            background: "#f8fafc",
            fontSize: "0.875rem",
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>

      <Button
        onClick={handleCopy}
        className="rounded-xl bg-indigo-600 hover:bg-indigo-700"
      >
        <Copy className="mr-2 h-4 w-4" />
        Copy Code
      </Button>
    </div>
  );
}
