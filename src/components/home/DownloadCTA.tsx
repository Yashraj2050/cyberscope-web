import { Download, ArrowRight } from "lucide-react";
import {
  Container,
  Section,
  Eyebrow,
  RouterLink,
} from "@/components/primitives/ui";
import { Reveal } from "@/components/primitives/Reveal";
import { RELEASE_DATA_NOTICE } from "@/data/releases";

export function DownloadCTA() {
  return (
    <Section>
      <Reveal>
        <div className="relative overflow-hidden rounded-xl border border-border bg-cs-surface-1 p-8 md:p-12">
          <div
            className="pointer-events-none absolute inset-0 opacity-50 cs-grid-bg"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-[0.1] blur-3xl"
            style={{
              background: "radial-gradient(circle, #3cc9e8 0%, transparent 70%)",
            }}
            aria-hidden
          />
          <div className="relative flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="flex max-w-xl flex-col gap-4">
              <Eyebrow>Get CyberScope</Eyebrow>
              <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                Run attack-path reconstruction locally.
              </h2>
              <p className="text-base leading-relaxed text-fg-muted">
                Download the desktop application for Windows, macOS, or Linux.
                The analysis engine runs entirely on your machine.
              </p>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle">
                {RELEASE_DATA_NOTICE}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
              <RouterLink
                route="download"
                className="group inline-flex items-center justify-center gap-2 rounded-md bg-cs-accent px-5 py-3 text-sm font-medium text-[#06141a] transition-colors hover:bg-cs-accent-strong"
              >
                <Download className="size-4" />
                Download CyberScope
              </RouterLink>
              <RouterLink
                route="releases"
                className="group inline-flex items-center justify-center gap-2 rounded-md border border-cs-border-strong bg-cs-surface-2 px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-cs-surface-3"
              >
                View releases
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </RouterLink>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
