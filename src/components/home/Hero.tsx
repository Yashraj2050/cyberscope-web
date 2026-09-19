"use client";

import { Download, ArrowRight, Monitor, Apple, Github, Play, ExternalLink } from "lucide-react";
import { Container, Eyebrow, RouterLink, MonoLabel } from "@/components/primitives/ui";
import { Reveal } from "@/components/primitives/Reveal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { REPO_URL, DEMO_VIDEO_URL } from "@/lib/constants";

const STATUS_STRIP = [
  "Local-first",
  "Offline analysis",
  "Evidence-driven",
  "Cross-platform",
];

function DemoButton() {
  if (DEMO_VIDEO_URL) {
    return (
      <a
        href={DEMO_VIDEO_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center justify-center gap-2 rounded-md border border-border bg-surface px-4 py-2.5 text-xs font-medium text-fg-muted transition-colors hover:bg-surface-hover hover:text-fg"
      >
        <Play className="size-3.5 text-accent fill-accent/20" />
        Watch Prototype Demo
      </a>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="group inline-flex items-center justify-center gap-2 rounded-md border border-border bg-surface px-4 py-2.5 text-xs font-medium text-fg-muted transition-colors hover:bg-surface-hover hover:text-fg cursor-pointer"
        >
          <Play className="size-3.5 text-accent fill-accent/20" />
          Watch Prototype Demo
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md border-border bg-surface">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold text-fg">
            Prototype Demo Walkthrough
          </DialogTitle>
          <DialogDescription className="text-sm text-fg-muted">
            SIH 2026 Evaluation Demonstration
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 py-3 text-xs leading-relaxed text-fg-muted">
          <p>
            The video walkthrough demonstrates telemetry ingestion, gap detection across the six consistency signals, and deterministic evidence verification.
          </p>
          <div className="rounded-md border border-border bg-background p-3 font-mono text-[11px] text-fg-subtle">
            Video link configured via <code className="text-accent">DEMO_VIDEO_URL</code> in <code className="text-fg">src/lib/constants.ts</code>.
          </div>
          <p className="text-fg-subtle">
            You can also test the application directly: the native desktop prototype runs completely offline with zero cloud dependencies.
          </p>
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <RouterLink
            route="download"
            className="inline-flex items-center gap-1.5 rounded-md bg-accent px-3 py-1.5 text-xs font-medium text-[#06141a] hover:bg-accent-strong"
          >
            <Download className="size-3.5" />
            Download Prototype
          </RouterLink>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function Hero() {
  return (
    <section className="border-b border-border overflow-hidden">
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16 py-24 md:py-32 lg:py-40">
          
          {/* Left Content */}
          <div className="flex-1 flex flex-col gap-8">
            {/* Brand lockup & SIH Prototype badge */}
            <Reveal>
              <div className="flex flex-wrap items-center gap-3">
                <Eyebrow className="text-accent">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 32 32"
                    className="text-accent"
                    aria-hidden
                  >
                    <circle cx="16" cy="16" r="9.5" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.45" />
                    <circle cx="16" cy="16" r="5.2" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="16" cy="16" r="1.8" fill="currentColor" />
                  </svg>
                  CyberScope
                </Eyebrow>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-elevated px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-accent">
                  SIH 2026 Prototype · Offline-first Desktop Application
                </span>
              </div>
            </Reveal>

            {/* Headline */}
            <Reveal delay={60}>
              <h1 className="max-w-4xl text-4xl font-semibold leading-[1.06] tracking-[-0.02em] text-fg sm:text-5xl lg:text-6xl">
                Offline Attack Path
                <br />
                Reconstruction
                <span className="text-fg-muted"> &amp; Evidence Analysis</span>
              </h1>
            </Reveal>

            {/* Supporting statement & offline distinction */}
            <Reveal delay={120}>
              <div className="space-y-4 max-w-2xl">
                <p className="text-lg leading-relaxed text-fg-muted md:text-xl">
                  Reconstruct missing transitions in security telemetry.
                  Evaluate the evidence.
                  Know when the evidence is not enough.
                </p>
                <p className="border-l-2 border-accent/40 pl-3 font-mono text-xs leading-relaxed text-fg-subtle">
                  The website provides access to the prototype. CyberScope itself runs locally and does not require internet connectivity for the core investigation workflow.
                </p>
              </div>
            </Reveal>

            {/* Evaluator Actions */}
            <Reveal delay={180}>
              <div className="flex flex-col gap-3">
                {/* Primary download buttons */}
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                  <RouterLink
                    route="download"
                    className="group inline-flex items-center justify-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-medium text-[#06141a] transition-colors hover:bg-accent-strong"
                  >
                    <Download className="size-4" />
                    Download Prototype
                  </RouterLink>

                  <a
                    href="https://github.com/Yashraj2050/cyberscope/releases/download/v0.1.0/cyberscope_0.1.0_x64-setup.exe"
                    className="group inline-flex items-center justify-center gap-2 rounded-md border border-border-strong bg-surface px-4 py-3 text-sm font-medium text-fg transition-colors hover:bg-surface-hover"
                  >
                    <Monitor className="size-4 text-fg-muted" />
                    Download Windows (x64)
                  </a>

                  <a
                    href="https://github.com/Yashraj2050/cyberscope/releases/download/v0.1.0/cyberscope_0.1.0_aarch64.dmg"
                    className="group inline-flex items-center justify-center gap-2 rounded-md border border-border-strong bg-surface px-4 py-3 text-sm font-medium text-fg transition-colors hover:bg-surface-hover"
                  >
                    <Apple className="size-4 text-fg-muted" />
                    Download macOS (arm64)
                  </a>
                </div>

                {/* Secondary evaluator row: Demo & Source Code */}
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <DemoButton />

                  <a
                    href={REPO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center gap-2 rounded-md border border-border bg-surface px-4 py-2.5 text-xs font-medium text-fg-muted transition-colors hover:bg-surface-hover hover:text-fg"
                  >
                    <Github className="size-3.5" />
                    View Source Code
                    <ExternalLink className="size-3 text-fg-subtle" />
                  </a>

                  <RouterLink
                    route="architecture"
                    className="group inline-flex items-center justify-center gap-2 rounded-md px-3 py-2 text-xs font-medium text-fg-subtle transition-colors hover:text-fg"
                  >
                    Explore Architecture
                    <ArrowRight className="size-3 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </RouterLink>
                </div>
              </div>
            </Reveal>

            {/* Status strip */}
            <Reveal delay={240}>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-6 mt-2">
                {STATUS_STRIP.map((s, i) => (
                  <div key={s} className="flex items-center gap-6">
                    {i > 0 && <span className="hidden h-3 w-px bg-border sm:block" aria-hidden />}
                    <MonoLabel>{s}</MonoLabel>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right Content: Technical Visualization */}
          <Reveal delay={300} className="hidden lg:flex flex-1 justify-end">
            <div className="relative w-full max-w-[500px] border border-border bg-cs-surface-elevated rounded-lg p-6 md:p-8 font-mono text-xs md:text-sm text-fg-muted shadow-2xl overflow-hidden">
              {/* Fake UI header */}
              <div className="flex items-center gap-2 mb-8 pb-4 border-b border-border">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-border" />
                  <div className="w-2.5 h-2.5 rounded-full bg-border" />
                  <div className="w-2.5 h-2.5 rounded-full bg-border" />
                </div>
                <span className="ml-2 text-cs-fg-subtle uppercase tracking-widest text-[10px]">Reconstruction Engine</span>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="bg-cs-surface border border-border px-4 py-2 rounded text-fg">
                  Observed Event
                </div>
                <div className="h-6 w-px bg-border" />
                <div className="h-6 w-px border-l border-dashed border-cs-warning" />
                <div className="bg-cs-warning/10 text-cs-warning border border-cs-warning/20 px-4 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-semibold">
                  GAP DETECTED
                </div>
                <div className="h-6 w-px border-l border-dashed border-cs-warning" />
                
                {/* Arrow down */}
                <div className="h-4 w-px bg-border relative">
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-2 h-2 border-b border-r border-border rotate-45" />
                </div>
                
                <div className="mt-4 w-full grid grid-cols-3 gap-2 text-center">
                  <div className="bg-cs-surface border border-border px-2 py-2 rounded text-fg-subtle">
                    Candidate A
                  </div>
                  <div className="bg-cs-surface border border-border px-2 py-2 rounded text-fg-subtle">
                    Candidate B
                  </div>
                  <div className="bg-cs-surface border border-border px-2 py-2 rounded text-fg-subtle">
                    Candidate C
                  </div>
                </div>
                
                <div className="mt-2 h-8 w-px bg-border relative">
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-2 h-2 border-b border-r border-border rotate-45" />
                </div>
                
                <div className="mt-4 bg-cs-surface border border-border px-6 py-2 rounded text-fg">
                  Evidence Verification
                </div>
                
                <div className="h-6 w-px bg-border" />
                <div className="w-[80%] h-px bg-border relative">
                  {/* Connectors to outcomes */}
                  <div className="absolute left-0 top-0 w-px h-4 bg-border" />
                  <div className="absolute left-1/2 top-0 w-px h-4 bg-border" />
                  <div className="absolute right-0 top-0 w-px h-4 bg-border" />
                </div>
                
                <div className="mt-4 w-[90%] grid grid-cols-3 gap-3 text-center text-[10px] font-semibold uppercase tracking-wider">
                  <div className="text-cs-success flex flex-col items-center gap-2">
                    OBSERVED
                  </div>
                  <div className="text-cs-accent flex flex-col items-center gap-2">
                    INFERRED
                  </div>
                  <div className="text-cs-warning flex flex-col items-center gap-2">
                    UNKNOWN
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
