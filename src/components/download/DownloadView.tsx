"use client";

import { useState } from "react";
import { Download, FileText, ShieldCheck, AlertTriangle } from "lucide-react";
import {
  PageHeader,
  Container,
  Section,
  RouterLink,
  StatusChip,
  InfoRow,
  LinkArrow,
} from "@/components/primitives/ui";
import { Reveal } from "@/components/primitives/Reveal";
import { PlatformSelector, PLATFORM_OPTIONS } from "./PlatformSelector";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { CopyButton } from "@/components/primitives/CopyButton";
import { getLatestRelease, RELEASE_DATA_NOTICE } from "@/data/releases";
import type { Platform, Architecture } from "@/lib/types";
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

export function DownloadView() {
  const release = getLatestRelease();
  const [platform, setPlatform] = useState<Platform>("windows");
  const [architecture, setArchitecture] = useState<Architecture>("x64");

  const option = PLATFORM_OPTIONS.find((p) => p.id === platform)!;
  // Derive the effective architecture: if the stored value isn't valid for the
  // selected platform, fall back to the platform's first architecture. This
  // replaces a setState-in-effect reset.
  const effectiveArch = option.arches.includes(architecture)
    ? architecture
    : option.arches[0];

  const artifacts = release.artifacts.filter(
    (a) => a.platform === platform && a.architecture === effectiveArch
  );

  return (
    <>
      <PageHeader
        eyebrow="Download"
        title="Download CyberScope"
        description="Run attack-path reconstruction locally. Choose your operating system and architecture, verify the checksum, and install."
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left: selector + artifacts */}
          <div className="lg:col-span-8">
            {/* Preview notice */}
            <Reveal>
              <div className="mb-8 flex items-start gap-3 rounded-lg border border-cs-unknown/30 bg-cs-unknown/[0.06] p-4">
                <AlertTriangle className="mt-0.5 size-4 shrink-0 text-cs-unknown" />
                <div>
                  <p className="text-sm text-foreground/90">
                    {RELEASE_DATA_NOTICE}
                  </p>
                  <p className="mt-1 text-xs text-fg-subtle">
                    Release metadata is structured for a real release backend —
                    only the file URLs are placeholders.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={60}>
              <PlatformSelector
                platform={platform}
                architecture={effectiveArch}
                onPlatform={setPlatform}
                onArchitecture={setArchitecture}
              />
            </Reveal>

            {/* Release panel */}
            <Reveal delay={120}>
              <div className="mt-8 overflow-hidden rounded-xl border border-border bg-cs-surface-1">
                {/* Panel header */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border px-6 py-5">
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-semibold tracking-tight text-foreground">
                      CyberScope {release.version}
                    </h2>
                    <StatusChip tone={release.status === "stable" ? "observed" : "amber"}>
                      {STATUS_LABEL[release.status]}
                    </StatusChip>
                  </div>
                  <span className="font-mono text-xs text-fg-subtle">
                    {formatDate(release.releaseDate)}
                  </span>
                </div>

                {/* Metadata grid */}
                <div className="grid gap-x-8 gap-y-1 border-b border-border px-6 py-4 sm:grid-cols-2">
                  <InfoRow label="Version">{release.version}</InfoRow>
                  <InfoRow label="Released">{formatDate(release.releaseDate)}</InfoRow>
                  <InfoRow label="Operating system">
                    {option.label}
                  </InfoRow>
                  <InfoRow label="Architecture">{effectiveArch}</InfoRow>
                  <InfoRow label="Channel">{STATUS_LABEL[release.status]}</InfoRow>
                  <InfoRow label="Packages">
                    {artifacts.length > 0
                      ? artifacts.map((a) => a.packageType).join(", ")
                      : "—"}
                  </InfoRow>
                </div>

                {/* Artifacts */}
                <div className="px-6 py-2">
                  {artifacts.length === 0 ? (
                    <div className="py-8 text-center">
                      <p className="text-sm text-fg-muted">
                        No package available for {option.label}{" "}
                        {architecture.toUpperCase()} in this release.
                      </p>
                    </div>
                  ) : (
                    artifacts.map((artifact) => (
                      <div
                        key={`${artifact.platform}-${artifact.architecture}-${artifact.packageType}`}
                        className="flex flex-col gap-4 border-b border-border py-4 last:border-0 md:flex-row md:items-center md:justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <span className="inline-flex size-9 items-center justify-center rounded-md border border-border bg-cs-surface-2">
                            <FileText className="size-4 text-fg-muted" />
                          </span>
                          <div className="flex flex-col">
                            <span className="font-mono text-sm uppercase tracking-[0.08em] text-foreground">
                              .{artifact.packageType}
                            </span>
                            <span className="text-xs text-fg-subtle">
                              {artifact.size}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <code className="max-w-[240px] truncate rounded border border-border bg-cs-surface-2 px-2 py-1 font-mono text-[11px] text-fg-subtle">
                            {artifact.checksum}
                          </code>
                          <CopyButton
                            text={artifact.checksum}
                            label="Copy checksum"
                          />
                          <a
                            href={artifact.downloadUrl}
                            className="group inline-flex items-center gap-2 rounded-md bg-cs-accent px-4 py-2 text-sm font-medium text-[#06141a] transition-colors hover:bg-cs-accent-strong"
                          >
                            <Download className="size-4" />
                            Download
                          </a>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Panel footer */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border bg-cs-surface-2/50 px-6 py-4">
                  <ChecksumsDialog release={release} />
                  <RouterLink
                    route="releases"
                    className="group inline-flex items-center gap-1.5 text-sm text-cs-accent hover:text-cs-accent-strong"
                  >
                    Release notes
                    <LinkArrow />
                  </RouterLink>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: verification + requirements sidebar */}
          <aside className="lg:col-span-4">
            <Reveal delay={160}>
              <div className="flex flex-col gap-4 rounded-xl border border-border bg-cs-surface-1 p-6">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="size-4 text-cs-observed" />
                  <h3 className="text-sm font-semibold text-foreground">
                    Verify before installing
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-fg-muted">
                  Always compare the downloaded file&rsquo;s SHA-256 against the
                  checksum listed here before installing.
                </p>
                <div className="rounded-md border border-border bg-background p-3">
                  <code className="block whitespace-pre-wrap font-mono text-[11px] leading-relaxed text-fg-muted">{`# macOS / Linux
shasum -a 256 <file>

# Windows (PowerShell)
Get-FileHash <file> -Algorithm SHA256`}</code>
                </div>
              </div>
            </Reveal>

            <Reveal delay={220}>
              <div className="mt-4 flex flex-col gap-4 rounded-xl border border-border bg-cs-surface-1 p-6">
                <h3 className="text-sm font-semibold text-foreground">
                  Before you download
                </h3>
                <ul className="flex flex-col gap-3 text-sm text-fg-muted">
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1 shrink-0 rounded-full bg-cs-accent" />
                    Check the system requirements for your platform.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1 shrink-0 rounded-full bg-cs-accent" />
                    Review the security model and offline operation notes.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1.5 size-1 shrink-0 rounded-full bg-cs-accent" />
                    Read the release notes for breaking changes.
                  </li>
                </ul>
                <div className="flex flex-col gap-2 border-t border-border pt-4">
                  <RouterLink
                    route="system"
                    className="group inline-flex items-center justify-between rounded-md border border-border bg-cs-surface-2 px-3 py-2 text-sm text-fg-muted hover:text-foreground"
                  >
                    System requirements <LinkArrow />
                  </RouterLink>
                  <RouterLink
                    route="security"
                    className="group inline-flex items-center justify-between rounded-md border border-border bg-cs-surface-2 px-3 py-2 text-sm text-fg-muted hover:text-foreground"
                  >
                    Security model <LinkArrow />
                  </RouterLink>
                </div>
              </div>
            </Reveal>
          </aside>
        </div>
      </Section>
    </>
  );
}

function ChecksumsDialog({
  release,
}: {
  release: ReturnType<typeof getLatestRelease>;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-md border border-border bg-cs-surface-2 px-3 py-2 text-sm text-fg-muted transition-colors hover:border-cs-border-strong hover:text-foreground"
        >
          <ShieldCheck className="size-4" />
          View checksums
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl border-border bg-cs-surface-2">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold tracking-tight text-foreground">
            CyberScope {release.version} — SHA-256 checksums
          </DialogTitle>
          <DialogDescription className="text-fg-muted">
            Verify each package against its checksum before installing. All
            artifacts for this release are listed below.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto">
          <table className="w-full text-left text-sm">
            <thead className="sticky top-0 bg-cs-surface-2">
              <tr className="border-b border-border">
                <th className="py-2 pr-4 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle">
                  Package
                </th>
                <th className="py-2 pr-4 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle">
                  Platform
                </th>
                <th className="py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle">
                  SHA-256
                </th>
              </tr>
            </thead>
            <tbody>
              {release.artifacts.map((a) => (
                <tr
                  key={`${a.platform}-${a.architecture}-${a.packageType}`}
                  className="border-b border-border/60 align-top"
                >
                  <td className="py-3 pr-4">
                    <span className="font-mono text-xs text-foreground">
                      .{a.packageType}
                    </span>
                    <div className="font-mono text-[11px] text-fg-subtle">
                      {a.architecture} · {a.size}
                    </div>
                  </td>
                  <td className="py-3 pr-4 font-mono text-xs text-fg-muted">
                    {a.platform}
                  </td>
                  <td className="py-3">
                    <div className="flex items-start gap-2">
                      <code className="break-all font-mono text-[11px] text-fg-muted">
                        {a.checksum}
                      </code>
                    </div>
                    <div className="mt-1">
                      <CopyButton text={a.checksum} label="Copy checksum" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-end">
          <DialogClose asChild>
            <button
              type="button"
              className={cn(
                "inline-flex items-center justify-center rounded-md bg-cs-surface-3 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-cs-surface-3/80"
              )}
            >
              Close
            </button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
