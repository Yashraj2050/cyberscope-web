import { ArrowRight } from "lucide-react";
import {
  Container,
  Section,
  SectionHeader,
  RouterLink,
} from "@/components/primitives/ui";
import { Reveal } from "@/components/primitives/Reveal";
import { SIX_GAP_SIGNALS } from "@/lib/constants";

const LAYERS = [
  "Desktop Application",
  "Tauri",
  "React UI",
  "Local FastAPI",
  "Python Engine",
  "NetworkX Graph",
  "Gap Detection",
  "Candidate Generation",
  "Candidate Scoring",
  "Evidence Verification",
];

export function ArchPreview() {
  return (
    <Section className="border-t border-border bg-cs-surface-1">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <SectionHeader
              eyebrow="Architecture"
              title="A local stack, end to end."
              description="The desktop shell, the local backend, and the Python reconstruction engine run on the same machine. Analysis never leaves it."
            />
          </Reveal>
          <Reveal delay={80}>
            <RouterLink
              route="architecture"
              className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-cs-accent"
            >
              Explore the architecture
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </RouterLink>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={120}>
            <div className="rounded-xl border border-border bg-background p-5 md:p-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">
                  Reconstruction pipeline
                </span>
                <span className="font-mono text-[11px] text-fg-subtle">
                  offline
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {LAYERS.map((layer, i) => (
                  <div key={layer} className="flex items-center gap-2">
                    <span className="rounded-md border border-border bg-cs-surface-2 px-3 py-1.5 text-xs text-foreground/90">
                      {layer}
                    </span>
                    {i < LAYERS.length - 1 && (
                      <span className="text-fg-subtle" aria-hidden>
                        →
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={180}>
            <div className="mt-4 rounded-xl border border-border bg-background p-5 md:p-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">
                  Six gap signals
                </span>
                <span className="font-mono text-[11px] text-fg-subtle">
                  consistency checks
                </span>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {SIX_GAP_SIGNALS.map((sig) => (
                  <div
                    key={sig.key}
                    className="flex items-start gap-3 rounded-md border border-border bg-cs-surface-2 px-3 py-2.5"
                  >
                    <span className="mt-1 size-1.5 shrink-0 rounded-full bg-cs-accent" />
                    <div className="flex flex-col">
                      <span className="text-sm text-foreground">{sig.label}</span>
                      <span className="text-xs leading-snug text-fg-subtle">
                        {sig.description}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
