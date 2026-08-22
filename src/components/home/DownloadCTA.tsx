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
        <div className="rounded-lg border border-border bg-surface p-8 md:p-12">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="flex max-w-xl flex-col gap-4">
              <Eyebrow>Get CyberScope</Eyebrow>
              <h2 className="text-3xl font-semibold tracking-tight text-fg md:text-4xl">
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
                className="group inline-flex items-center justify-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-medium text-[#06141a] transition-colors hover:bg-accent-strong"
              >
                <Download className="size-4" />
                Download CyberScope
              </RouterLink>
              <RouterLink
                route="releases"
                className="group inline-flex items-center justify-center gap-2 rounded-md border border-border-strong bg-surface-elevated px-5 py-3 text-sm font-medium text-fg transition-colors hover:bg-surface-hover"
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
