import { Download, GitCommit } from "lucide-react";
import type { Release } from "@/lib/types";
import {
  RouterLink,
  StatusChip,
  EvidenceBadge,
  LinkArrow,
} from "@/components/primitives/ui";
import { CopyButton } from "@/components/primitives/CopyButton";
import { cn } from "@/lib/utils";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const STATUS_LABEL: Record<string, string> = {
  stable: "Stable",
  beta: "Beta",
  planned: "Planned",
};

function ChangeList({
  title,
  items,
  tone = "neutral",
}: {
  title: string;
  items: string[];
  tone?: "neutral" | "observed" | "amber";
}) {
  if (items.length === 0) return null;
  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <span
          className={cn(
            "size-1.5 rounded-full",
            tone === "observed" && "bg-cs-observed",
            tone === "amber" && "bg-cs-unknown",
            tone === "neutral" && "bg-cs-accent"
          )}
        />
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">
          {title}
        </span>
      </div>
      <ul className="flex flex-col gap-1.5">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-2 text-sm leading-relaxed text-fg-muted"
          >
            <span className="mt-2 size-1 shrink-0 rounded-full bg-border" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ReleaseEntry({
  release,
  isLatest,
}: {
  release: Release;
  isLatest: boolean;
}) {
  const platforms = Array.from(
    new Set(release.artifacts.map((a) => a.platform))
  );

  return (
    <article
      id={`v${release.version}`}
      className="scroll-mt-24 rounded-xl border border-border bg-cs-surface-1"
    >
      {/* Header */}
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border px-6 py-5">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              v{release.version}
            </h2>
            <StatusChip
              tone={
                release.status === "stable"
                  ? "observed"
                  : release.status === "planned"
                    ? "amber"
                    : "accent"
              }
            >
              {STATUS_LABEL[release.status]}
            </StatusChip>
            {isLatest && <StatusChip tone="accent">Latest</StatusChip>}
          </div>
          <p className="text-sm text-fg-muted">{release.tagline}</p>
        </div>
        <div className="flex flex-col items-start gap-1 sm:items-end">
          <span className="font-mono text-xs text-fg-subtle">
            {formatDate(release.releaseDate)}
          </span>
          {platforms.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {platforms.map((p) => (
                <span
                  key={p}
                  className="rounded border border-border bg-cs-surface-2 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-fg-muted"
                >
                  {p}
                </span>
              ))}
            </div>
          ) : (
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-fg-subtle">
              No artifacts yet
            </span>
          )}
        </div>
      </header>

      {/* Body */}
      <div className="px-6 py-6">
        <p className="mb-6 max-w-3xl text-sm leading-relaxed text-fg-muted">
          {release.notes}
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {release.highlights.length > 0 && (
            <ChangeList title="Highlights" items={release.highlights} tone="observed" />
          )}
          <ChangeList title="Changes" items={release.changes} />
          <ChangeList title="Bug fixes" items={release.fixes} tone="amber" />
          <ChangeList title="Security changes" items={release.security} tone="observed" />
        </div>

        {/* Checksums */}
        {release.artifacts.length > 0 && (
          <div className="mt-6 border-t border-border pt-6">
            <div className="mb-3 flex items-center gap-2">
              <GitCommit className="size-3.5 text-fg-subtle" />
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">
                Checksums
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <tbody>
                  {release.artifacts.map((a) => (
                    <tr
                      key={`${a.platform}-${a.architecture}-${a.packageType}`}
                      className="border-b border-border/60 align-middle"
                    >
                      <td className="py-2 pr-4">
                        <span className="font-mono text-xs text-foreground">
                          .{a.packageType}
                        </span>
                      </td>
                      <td className="py-2 pr-4 font-mono text-[11px] uppercase tracking-[0.1em] text-fg-subtle">
                        {a.platform}/{a.architecture}
                      </td>
                      <td className="py-2 pr-3">
                        <code className="break-all font-mono text-[11px] text-fg-muted">
                          {a.checksum}
                        </code>
                      </td>
                      <td className="py-2">
                        <CopyButton text={a.checksum} label="Copy checksum" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-border bg-cs-surface-2/40 px-6 py-4">
        <EvidenceBadge state={release.status === "planned" ? "unknown" : "inferred"} label={release.status === "planned" ? "Upcoming" : "Shipped"} />
        <RouterLink
          route="download"
          className="group inline-flex items-center gap-2 rounded-md border border-border bg-cs-surface-2 px-3 py-2 text-sm text-fg-muted transition-colors hover:border-cs-border-strong hover:text-foreground"
        >
          <Download className="size-4" />
          Download latest
          <LinkArrow />
        </RouterLink>
      </footer>
    </article>
  );
}
