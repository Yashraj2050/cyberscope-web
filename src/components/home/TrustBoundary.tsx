import {
  Container,
  Section,
  SectionHeader,
  EvidenceBadge,
} from "@/components/primitives/ui";
import { Reveal } from "@/components/primitives/Reveal";
import { cn } from "@/lib/utils";

const STATES = [
  {
    state: "observed" as const,
    title: "Seen in the telemetry",
    definition:
      "The transition was directly present in the input record. It was recorded as it happened, with no reconstruction required.",
    means: "Treat as fact.",
    emphasis: false,
  },
  {
    state: "inferred" as const,
    title: "Reconstructed and verified",
    definition:
      "A generated candidate that the available evidence supports over its alternatives. Defensible — but not directly observed.",
    means: "Treat as a reasoned conclusion.",
    emphasis: false,
  },
  {
    state: "unknown" as const,
    title: "Evidence is insufficient",
    definition:
      "The evidence cannot distinguish between competing candidates. CyberScope marks the transition UNKNOWN instead of choosing one.",
    means: "Treat as an open question.",
    emphasis: true,
  },
];

export function TrustBoundary() {
  return (
    <Section>
      <div className="flex flex-col gap-12">
        <Reveal>
          <SectionHeader
            eyebrow="The trust boundary"
            title={
              <>
                When the evidence can&rsquo;t decide,
                <br className="hidden sm:block" /> CyberScope abstains.
              </>
            }
            description="Every transition in the reconstructed graph is classified by how well the evidence supports it. Three states — and one of them is explicitly a non-answer."
          />
        </Reveal>

        <div className="grid gap-4 md:grid-cols-3">
          {STATES.map((s, i) => (
            <Reveal key={s.state} delay={i * 70}>
              <div
                className={cn(
                  "flex h-full flex-col gap-4 rounded-lg border bg-cs-surface-1 p-6",
                  s.emphasis
                    ? "border-cs-unknown/40 cs-hairline-top"
                    : "border-border"
                )}
              >
                <div className="flex items-center justify-between">
                  <EvidenceBadge state={s.state} />
                  {s.emphasis && (
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-cs-unknown">
                      Central concept
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  {s.title}
                </h3>
                <p className="flex-1 text-sm leading-relaxed text-fg-muted">
                  {s.definition}
                </p>
                <div className="border-t border-border pt-3">
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle">
                    {s.means}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="rounded-lg border border-cs-unknown/30 bg-cs-unknown/[0.05] p-6">
            <p className="text-base leading-relaxed text-foreground/90 md:text-lg">
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-cs-unknown">
                Principle
              </span>
              <br />
              When the evidence cannot distinguish between competing
              explanations, CyberScope abstains. UNKNOWN is not a failure — it
              is an honest statement about the limit of the available evidence.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
