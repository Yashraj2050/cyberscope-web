"use client";

import { Monitor, Apple, Terminal } from "lucide-react";
import type { Platform, Architecture } from "@/lib/types";
import { cn } from "@/lib/utils";

export const PLATFORM_OPTIONS: {
  id: Platform;
  label: string;
  icon: typeof Monitor;
  arches: Architecture[];
}[] = [
  { id: "windows", label: "Windows", icon: Monitor, arches: ["x64"] },
  { id: "macos", label: "macOS", icon: Apple, arches: ["x64", "arm64"] },
  { id: "linux", label: "Linux", icon: Terminal, arches: ["x64"] },
];

export function PlatformSelector({
  platform,
  architecture,
  onPlatform,
  onArchitecture,
}: {
  platform: Platform;
  architecture: Architecture;
  onPlatform: (p: Platform) => void;
  onArchitecture: (a: Architecture) => void;
}) {
  const current = PLATFORM_OPTIONS.find((p) => p.id === platform)!;

  return (
    <div className="flex flex-col gap-4">
      <div>
        <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">
          Operating system
        </span>
        <div
          role="tablist"
          aria-label="Operating system"
          className="inline-flex rounded-lg border border-border bg-surface p-1"
        >
          {PLATFORM_OPTIONS.map((p) => {
            const active = p.id === platform;
            const Icon = p.icon;
            return (
              <button
                key={p.id}
                role="tab"
                aria-selected={active}
                onClick={() => onPlatform(p.id)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm transition-colors",
                  active
                    ? "bg-surface-hover text-fg"
                    : "text-fg-muted hover:text-fg"
                )}
              >
                <Icon className="size-4" />
                {p.label}
              </button>
            );
          })}
        </div>
      </div>

      {current.arches.length > 1 && (
        <div>
          <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">
            Architecture
          </span>
          <div
            role="tablist"
            aria-label="CPU architecture"
            className="inline-flex rounded-lg border border-border bg-surface p-1"
          >
            {current.arches.map((a) => {
              const active = a === architecture;
              return (
                <button
                  key={a}
                  role="tab"
                  aria-selected={active}
                  onClick={() => onArchitecture(a)}
                  className={cn(
                    "rounded-md px-4 py-2 font-mono text-xs uppercase tracking-[0.12em] transition-colors",
                    active
                      ? "bg-surface-hover text-fg"
                      : "text-fg-muted hover:text-fg"
                  )}
                >
                  {a}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
