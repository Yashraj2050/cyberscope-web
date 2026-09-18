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
  label,
  time,
}: {
  label: string;
  time: string;
}) {
  return (
    <div className="rounded-md border border-border bg-cs-surface-elevated p-4">
      <div className="flex items-center justify-between">
        <EvidenceBadge state="observed" />
        <span className="font-mono text-[11px] text-cs-fg-subtle">{time}</span>
      </div>
      <div className="mt-3 flex flex-col gap-1">
        <span className="text-sm text-cs-fg font-medium">{label}</span>
      </div>
    </div>
  );
}

function GapNode() {
  return (
    <div className="rounded-md border border-dashed border-cs-warning/45 bg-cs-surface p-4">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 border-b border-cs-warning/40 pb-0.5 font-mono text-[11px] uppercase tracking-[0.16em] text-cs-warning">
          <span className="size-1.5 rounded-full bg-cs-warning" aria-hidden />
          Reconstruction Gap
        </span>
        <span className="font-mono text-[11px] text-cs-fg-subtle">
          reconstruction required
        </span>
      </div>
      <div className="mt-3 text-sm text-cs-fg/90">
        Missing telemetry does not automatically mean an attack occurred. Evidence evaluation is required.
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
              title="The Telemetry Gap"
              description="An investigation rarely sees the full chain of activity. Between observed events there is often a gap — a transition the evidence never recorded. Missing telemetry does not automatically mean an attack occurred."
            />
          </Reveal>
          <Reveal delay={80}>
            <p className="max-w-xl text-sm leading-relaxed text-cs-fg-muted">
              CyberScope reconstructs these missing transitions locally. It detects where the evidence is incomplete, generates candidate transitions to fill the gaps, and then evaluates whether the available evidence is strong enough to call any of them real.
            </p>
          </Reveal>
        </div>

        {/* Gap illustration */}
        <Reveal delay={120}>
          <div className="rounded-lg border border-border bg-cs-surface p-5 md:p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-cs-fg-subtle">
                Event Timeline
              </span>
              <span className="font-mono text-[11px] text-cs-fg-subtle">
                3 events · 1 gap
              </span>
            </div>
            
            <ObservedNode
              label="User authentication"
              time="10:01"
            />
            <Connector />
            <ObservedNode
              label="Process activity"
              time="10:03"
            />
            <Connector />
            <GapNode />
            <Connector />
            <ObservedNode
              label="Remote activity"
              time="10:08"
            />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
