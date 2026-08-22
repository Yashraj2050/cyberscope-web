import { Download, ArrowRight } from "lucide-react";
import { Container, Eyebrow, RouterLink, StatusChip } from "@/components/primitives/ui";
import { Reveal } from "@/components/primitives/Reveal";

const STATUS_STRIP = [
  "Local-first",
  "Offline analysis",
  "Evidence-driven",
  "Cross-platform",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* background grid */}
      <div className="cs-grid-bg absolute inset-0 opacity-60" aria-hidden />
      {/* fade the grid toward the bottom */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background"
        aria-hidden
      />
      {/* top hairline accent */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cs-accent/40 to-transparent"
        aria-hidden
      />
      {/* subtle radial accent, restrained */}
      <div
        className="pointer-events-none absolute -top-40 right-[-10%] h-[420px] w-[420px] rounded-full opacity-[0.12] blur-3xl"
        style={{ background: "radial-gradient(circle, #3cc9e8 0%, transparent 70%)" }}
        aria-hidden
      />

      <Container className="relative">
        <div className="flex flex-col gap-8 py-24 md:py-32 lg:py-40">
          {/* Brand lockup */}
          <Reveal>
            <div className="flex items-center gap-3">
              <Eyebrow className="text-cs-accent">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 32 32"
                  className="text-cs-accent"
                  aria-hidden
                >
                  <circle
                    cx="16"
                    cy="16"
                    r="9.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    opacity="0.4"
                  />
                  <circle
                    cx="16"
                    cy="16"
                    r="5.2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <circle cx="16" cy="16" r="1.8" fill="currentColor" />
                </svg>
                CyberScope
              </Eyebrow>
            </div>
          </Reveal>

          {/* Headline */}
          <Reveal delay={60}>
            <h1 className="max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.02em] text-foreground sm:text-5xl lg:text-6xl">
              Offline Attack Path
              <br />
              Reconstruction
              <span className="text-fg-muted"> &amp; Evidence Analysis</span>
            </h1>
          </Reveal>

          {/* Supporting statement */}
          <Reveal delay={120}>
            <p className="max-w-2xl text-lg leading-relaxed text-fg-muted md:text-xl">
              Reconstruct missing transitions in security telemetry without
              sending the investigation to a cloud analysis service.
            </p>
          </Reveal>

          {/* CTAs */}
          <Reveal delay={180}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <RouterLink
                route="download"
                className="group inline-flex items-center justify-center gap-2 rounded-md bg-cs-accent px-5 py-3 text-sm font-medium text-[#06141a] transition-colors hover:bg-cs-accent-strong"
              >
                <Download className="size-4" />
                Download CyberScope
              </RouterLink>
              <RouterLink
                route="architecture"
                className="group inline-flex items-center justify-center gap-2 rounded-md border border-cs-border-strong bg-cs-surface-1 px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-cs-surface-3"
              >
                Explore the Architecture
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </RouterLink>
            </div>
          </Reveal>

          {/* Status strip */}
          <Reveal delay={240}>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-6">
              {STATUS_STRIP.map((s, i) => (
                <div key={s} className="flex items-center gap-6">
                  {i > 0 && (
                    <span
                      className="hidden size-1 rounded-full bg-fg-subtle sm:block"
                      aria-hidden
                    />
                  )}
                  <StatusChip>{s}</StatusChip>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
