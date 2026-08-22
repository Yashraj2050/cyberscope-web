import {
  Container,
  Section,
  SectionHeader,
  Pipeline,
  EvidenceBadge,
} from "@/components/primitives/ui";
import { Reveal } from "@/components/primitives/Reveal";

const STAGES = [
  { label: "Telemetry", sub: "Observed events" },
  { label: "Event Validation", sub: "Pydantic CyberEvent" },
  { label: "Attack Graph", sub: "NetworkX" },
  { label: "Gap Detection", sub: "6 signals" },
  { label: "Candidate Generation", sub: "Scored transitions" },
  { label: "Evidence Verification", sub: "Sufficiency check" },
];

export function WhatItDoes() {
  return (
    <Section className="border-y border-border bg-cs-surface-1">
      <div className="flex flex-col gap-10">
        <Reveal>
          <SectionHeader
            eyebrow="What CyberScope does"
            title="From telemetry to a defensible reconstruction."
            description="A linear pipeline turns raw observed events into a reconstructed attack graph where every transition is classified by how well the evidence supports it."
          />
        </Reveal>

        <Reveal delay={80}>
          <Pipeline stages={STAGES} />
        </Reveal>

        <Reveal delay={140}>
          <div className="flex flex-wrap items-center gap-3 border-t border-border pt-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">
              Each edge is tagged
            </span>
            <EvidenceBadge state="observed" />
            <EvidenceBadge state="inferred" />
            <EvidenceBadge state="unknown" />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
