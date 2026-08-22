import { Target, HardDrive, GitBranch, AlertCircle } from "lucide-react";
import {
  PageHeader,
  Section,
  Container,
  SectionHeader,
  Eyebrow,
} from "@/components/primitives/ui";
import { Reveal } from "@/components/primitives/Reveal";

const PHILOSOPHY = [
  {
    icon: Target,
    title: "Evidence over speculation",
    text: "A reconstruction is only as strong as the evidence behind it. Candidates are scored against the available evidence, and verification decides whether that evidence is sufficient to call a candidate real.",
  },
  {
    icon: HardDrive,
    title: "Local-first analysis",
    text: "Analysis runs on the investigator's machine. The local FastAPI backend, the Python engine, and the NetworkX graph never reach out to a cloud service during a reconstruction.",
  },
  {
    icon: AlertCircle,
    title: "Explicit uncertainty",
    text: "When the evidence cannot distinguish between competing explanations, CyberScope abstains. UNKNOWN is a first-class result — an honest statement about the limit of what the evidence shows.",
  },
];

export function AboutView() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Why CyberScope exists."
        description="CyberScope was built to address a specific, recurring problem in security investigations — and to do it without asking anyone to hand their telemetry to a cloud service."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>The problem</Eyebrow>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                Telemetry is almost never complete.
              </h2>
              <div className="mt-5 flex flex-col gap-4 text-base leading-relaxed text-fg-muted">
                <p>
                  An investigation typically works with a partial view — events
                  were not logged, a sensor was down, a source was lost during
                  retention rotation. Between two observed events there is
                  often a gap, and analysts are left to fill it from memory,
                  intuition, or a generic playbook.
                </p>
                <p>
                  The usual fix is to ship the data to a cloud analysis
                  service. That trades an evidence problem for a trust problem:
                  the telemetry now lives somewhere else, processed by software
                  the investigator cannot inspect.
                </p>
                <p>
                  CyberScope takes a different position. It reconstructs the
                  missing transitions locally — on the same machine that holds
                  the evidence — and it tells you, explicitly, how confident it
                  is in each one.
                </p>
              </div>
            </Reveal>
          </div>

          <aside className="lg:col-span-5">
            <Reveal delay={100}>
              <div className="rounded-xl border border-border bg-cs-surface-1 p-6">
                <Eyebrow>At a glance</Eyebrow>
                <dl className="mt-5 divide-y divide-border/60">
                  {[
                    ["What it is", "Offline attack-path reconstruction"],
                    ["Who it is for", "SOC analysts, detection & forensic reviewers"],
                    ["Where it runs", "Your machine — fully offline"],
                    ["What it outputs", "A graph tagged OBSERVED / INFERRED / UNKNOWN"],
                    ["What it is not", "A SIEM, a collector, or a cloud service"],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
                    >
                      <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle">
                        {k}
                      </dt>
                      <dd className="text-sm text-foreground/90 sm:text-right">
                        {v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </aside>
        </div>
      </Section>

      <Section className="border-t border-border bg-cs-surface-1">
        <Container>
          <Reveal>
            <SectionHeader
              eyebrow="Engineering philosophy"
              title="Three commitments."
              description="The choices that make CyberScope defensible rather than merely plausible."
            />
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {PHILOSOPHY.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.title} delay={i * 70}>
                  <div className="flex h-full flex-col gap-4 rounded-lg border border-border bg-background p-6">
                    <span className="inline-flex size-10 items-center justify-center rounded-md border border-cs-accent/30 bg-cs-accent/10">
                      <Icon className="size-5 text-cs-accent" />
                    </span>
                    <h3 className="text-base font-semibold text-foreground">
                      {p.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-fg-muted">
                      {p.text}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>
    </>
  );
}
