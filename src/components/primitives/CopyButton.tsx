"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  text: string;
  label?: string;
  className?: string;
}

export function CopyButton({ text, label, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error("Could not copy");
    }
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={label ?? "Copy to clipboard"}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border border-border px-2 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-muted transition-colors hover:border-cs-border-strong hover:text-foreground",
        className
      )}
    >
      {copied ? (
        <Check className="size-3 text-cs-observed" />
      ) : (
        <Copy className="size-3" />
      )}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
