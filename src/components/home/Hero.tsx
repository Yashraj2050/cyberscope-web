import { Download, ArrowRight } from "lucide-react";
import { Container, Eyebrow, RouterLink, MonoLabel } from "@/components/primitives/ui";
import { Reveal } from "@/components/primitives/Reveal";

const STATUS_STRIP = [
  "Local-first",
  "Offline analysis",
  "Evidence-driven",
  "Cross-platform",
];

export function Hero() {
  return (
    <section className="border-b border-border">
      <Container>
        <div className="flex flex-col gap-10 py-24 md:py-32 lg:py-40">
          {/* Brand lockup */}
          <Reveal>
            <div className="flex items-center gap-3">
              <Eyebrow className="text-accent">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 32 32"
                  className="text-accent"
                  aria-hidden
                >
                  <circle
                    cx="16"
                    cy="16"
                    r="9.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    opacity="0.45"
                  />
                  <circle
                    cx="16"
                    cy="16"
                    r="5.2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <circle cx="16" cy="16" r="1.8" fill="currentColor" />
                </svg>
                CyberScope
              </Eyebrow>
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
                className="group inline-flex items-center justify-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-medium text-[#06141a] transition-colors hover:bg-accent-strong"
              >
                <Download className="size-4" />
                Download CyberScope
              </RouterLink>
              <RouterLink
                route="architecture"
                className="group inline-flex items-center justify-center gap-2 rounded-md border border-border-strong bg-surface px-5 py-3 text-sm font-medium text-fg transition-colors hover:bg-surface-hover"
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
                      className="hidden h-3 w-px bg-border sm:block"
                      aria-hidden
                    />
                  )}
                  <MonoLabel>{s}</MonoLabel>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
