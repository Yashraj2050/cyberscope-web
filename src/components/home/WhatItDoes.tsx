import {
  Container,
  Section,
  SectionHeader,
  Pipeline,
  EvidenceBadge,
} from "@/components/primitives/ui";
import { Reveal } from "@/components/primitives/Reveal";

const STAGES = [
  { label: "Identify meaningful gaps", sub: "Observed evidence" },
  { label: "Generate candidates", sub: "Missing transitions" },
  { label: "Rank by evidence", sub: "Candidate scoring" },
  { label: "Independently verify", sub: "Seven-check verification" },
  { label: "Explicitly decide", sub: "OBSERVED/INFERRED/UNKNOWN" },
];

export function WhatItDoes() {
  return (
    <Section className="border-y border-border bg-surface">
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
