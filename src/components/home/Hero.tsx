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
    <section className="border-b border-border overflow-hidden">
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16 py-24 md:py-32 lg:py-40">
          
          {/* Left Content */}
          <div className="flex-1 flex flex-col gap-10">
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
                    <circle cx="16" cy="16" r="9.5" fill="none" stroke="currentColor" strokeWidth="1.4" opacity="0.45" />
                    <circle cx="16" cy="16" r="5.2" fill="none" stroke="currentColor" strokeWidth="1.5" />
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
                Reconstruct missing transitions in security telemetry.
                Evaluate the evidence.
                Know when the evidence is not enough.
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
