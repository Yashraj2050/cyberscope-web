import { Container, Section, SectionHeader, EvidenceBadge } from "@/components/primitives/ui";
import { Reveal } from "@/components/primitives/Reveal";

function Connector() {
  return (
    <div className="flex flex-col items-center py-2" aria-hidden>
      <div className="h-7 w-px bg-border-strong" />
    </div>
  );
}

function ObservedNode({
  technique,
  label,
  time,
}: {
  technique: string;
  label: string;
  time: string;
}) {
  return (
    <div className="rounded-md border border-border bg-surface-elevated p-4">
      <div className="flex items-center justify-between">
        <EvidenceBadge state="observed" />
        <span className="font-mono text-[11px] text-fg-subtle">{time}</span>
      </div>
      <div className="mt-3 flex flex-col gap-1">
        <span className="font-mono text-xs text-accent">{technique}</span>
        <span className="text-sm text-fg">{label}</span>
      </div>
    </div>
  );
}

function GapNode() {
  const signals = [
    "technique",
    "behavioral",
    "host",
    "user",
    "process",
    "temporal",
  ];
  return (
    <div className="rounded-md border border-dashed border-warning/45 bg-surface p-4">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 border-b border-warning/40 pb-0.5 font-mono text-[11px] uppercase tracking-[0.16em] text-warning">
          <span className="size-1.5 rounded-full bg-warning" aria-hidden />
          Gap
        </span>
        <span className="font-mono text-[11px] text-fg-subtle">
          reconstruction required
        </span>
      </div>
      <div className="mt-3 text-sm text-fg/90">
        No plausible transition exists in the observed record between these two
        events.
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {signals.map((s) => (
          <span
            key={s}
            className="rounded border border-border bg-surface-elevated px-1.5 py-0.5 font-mono text-[10px] lowercase text-fg-subtle"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ProblemSection() {
  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-6">
          <Reveal>
            <SectionHeader
              eyebrow="The problem"
              title="Security telemetry is rarely complete."
              description="An investigation rarely sees the full chain of activity. Between two observed events there is often a gap — a transition the evidence never recorded. Closing that gap by hand is guesswork. Closing it by shipping the data to a cloud service trades one risk for another."
            />
          </Reveal>
          <Reveal delay={80}>
            <p className="max-w-xl text-sm leading-relaxed text-fg-muted">
              CyberScope reconstructs these missing transitions locally. It
              detects where the evidence is incomplete, generates candidate
              transitions to fill the gaps, and then — critically — evaluates
              whether the available evidence is strong enough to call any of
              them real.
            </p>
          </Reveal>
        </div>

        {/* Gap illustration */}
        <Reveal delay={120}>
          <div className="rounded-lg border border-border bg-surface p-5 md:p-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">
                Reconstructed view
              </span>
              <span className="font-mono text-[11px] text-fg-subtle">
                3 events · 1 gap
              </span>
            </div>
            <ObservedNode
              technique="T1059.004"
              label="PowerShell execution — host A"
              time="14:02:11"
            />
            <Connector />
            <GapNode />
            <Connector />
            <ObservedNode
              technique="T1021.002"
              label="Lateral move — host B"
              time="14:09:48"
            />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
