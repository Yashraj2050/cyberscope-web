import {
  Monitor,
  Database,
  Package,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import {
  PageHeader,
  Section,
  Container,
  SectionHeader,
  StatusChip,
} from "@/components/primitives/ui";
import { Reveal } from "@/components/primitives/Reveal";

const STAGES = [
  {
    icon: Monitor,
    label: "CyberScope Desktop",
    sub: "current install",
  },
  {
    icon: Database,
    label: "Local Knowledge / Version",
    sub: "what you have",
  },
  {
    icon: Package,
    label: "Update Package",
    sub: "software + knowledge",
  },
  {
    icon: ShieldCheck,
    label: "Verification",
    sub: "checksum match",
  },
  {
    icon: CheckCircle2,
    label: "Updated Installation",
    sub: "applied locally",
  },
];

export function UpdatesView() {
  return (
    <>
      <PageHeader
        eyebrow="Updates"
        title="The offline update model."
        description="CyberScope distributes updates as packages that you download and verify locally. The application never updates itself silently and never reaches out to a cloud service to apply an update."
      />

      <Section>
        <Reveal>
          <SectionHeader
            eyebrow="The flow"
            title="From current install to updated install."
            description="An update package can contain updated software components and updated reconstruction knowledge. The desktop application verifies the package before applying it."
          />
        </Reveal>

        {/* Flow */}
        <Reveal delay={80}>
          <div className="mt-10 rounded-lg border border-border bg-surface p-5 md:p-8">
            <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center">
              {STAGES.map((stage, i) => {
                const Icon = stage.icon;
                return (
                  <div
                    key={stage.label}
                    className="flex flex-col items-stretch gap-3 md:flex-1 md:flex-row md:items-center md:gap-2"
                  >
                    <div className="flex flex-1 flex-col items-center gap-3 rounded-lg border border-border bg-background px-4 py-5 text-center">
                      <span className="inline-flex size-10 items-center justify-center rounded-md border border-border bg-surface-elevated">
                        <Icon className="size-5 text-accent" />
                      </span>
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-fg">
                          {stage.label}
                        </span>
                        <span className="font-mono text-[11px] text-fg-subtle">
                          {stage.sub}
                        </span>
                      </div>
                    </div>
                    {i < STAGES.length - 1 && (
                      <>
                        <span
                          className="hidden text-fg-subtle md:inline"
                          aria-hidden
                        >
                          →
                        </span>
                        <span className="text-center text-fg-subtle md:hidden">
                          ↓
                        </span>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </Section>

      <Section className="border-t border-border bg-surface">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <SectionHeader
                eyebrow="What an update contains"
                title="Two kinds of payload."
                description="An update package may carry software, knowledge, or both."
              />
              <div className="mt-6 flex flex-col gap-4">
                <div className="rounded-lg border border-border bg-background p-5">
                  <StatusChip tone="accent">Software</StatusChip>
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                    Compiled engine and UI binaries — the desktop application
                    itself. Applied after verification.
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-background p-5">
                  <StatusChip tone="observed">Knowledge</StatusChip>
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                    Updated reconstruction knowledge — the data the engine uses
                    to detect gaps and generate candidates. Can ship without a
                    full software update.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <SectionHeader
                eyebrow="What updates are not"
                title="Deliberate boundaries."
              />
              <div className="mt-6 flex flex-col gap-3">
                {[
                  ["Not automatic", "You initiate every download. The application does not install updates in the background."],
                  ["Not silent", "Verification happens in the open — you see the expected and computed checksums."],
                  ["Not cloud-driven", "No remote service pushes changes to your machine. The update is a file you chose to trust."],
                  ["Not telemetry", "Checking for updates does not send your analysis data anywhere."],
                ].map(([title, text]) => (
                  <div
                    key={title}
                    className="flex items-start gap-3 rounded-lg border border-warning/25 bg-surface p-4"
                  >
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-warning" />
                    <div>
                      <span className="text-sm font-medium text-fg">
                        {title}
                      </span>
                      <p className="mt-1 text-xs leading-relaxed text-fg-muted">
                        {text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal>
            <div className="rounded-lg border border-border bg-surface p-6">
              <SectionHeader
                eyebrow="Status"
                title="Update ingestion is planned."
                description="The offline update mechanism is part of the planned 0.5.0 release. Current builds do not yet apply update packages."
              />
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
