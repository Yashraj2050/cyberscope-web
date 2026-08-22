import { Download, Cpu, MemoryStick, HardDrive, Wifi, MonitorSmartphone } from "lucide-react";
import {
  PageHeader,
  Section,
  Container,
  SectionHeader,
} from "@/components/primitives/ui";
import { Reveal } from "@/components/primitives/Reveal";

type Req = {
  icon: typeof Cpu;
  label: string;
  value: string;
  note?: string;
};

const INSTALL_REQS: Req[] = [
  {
    icon: MonitorSmartphone,
    label: "Operating system",
    value: "Windows 10/11 · macOS 12+ · Linux (Ubuntu 22.04+ or equivalent)",
  },
  {
    icon: Cpu,
    label: "CPU architecture",
    value: "x64 · arm64 (macOS Apple Silicon)",
  },
  {
    icon: MemoryStick,
    label: "RAM",
    value: "To be finalized",
    note: "Will be stated before the first stable release.",
  },
  {
    icon: HardDrive,
    label: "Disk space",
    value: "To be finalized",
    note: "Includes the packaged engine and working graph storage.",
  },
  {
    icon: Wifi,
    label: "Network",
    value: "Required for download & verification only",
    note: "No network needed after the package is verified.",
  },
];

const ANALYSIS_REQS: Req[] = [
  {
    icon: MonitorSmartphone,
    label: "Operating system",
    value: "Same as installation",
  },
  {
    icon: Cpu,
    label: "CPU architecture",
    value: "Same as installation",
  },
  {
    icon: MemoryStick,
    label: "RAM",
    value: "To be finalized",
    note: "Scales with telemetry size and graph depth.",
  },
  {
    icon: HardDrive,
    label: "Disk space",
    value: "To be finalized",
    note: "Holds the imported event stream and reconstructed graph.",
  },
  {
    icon: Wifi,
    label: "Network",
    value: "None — fully offline",
    note: "The engine makes no outbound calls during analysis.",
  },
];

function ReqTable({ title, subtitle, reqs }: { title: string; subtitle: string; reqs: Req[] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-cs-surface-1">
      <div className="border-b border-border bg-cs-surface-2 px-6 py-4">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <p className="mt-0.5 text-xs text-fg-subtle">{subtitle}</p>
      </div>
      <dl className="divide-y divide-border/60">
        {reqs.map((r) => {
          const Icon = r.icon;
          return (
            <div key={r.label} className="flex items-start gap-4 px-6 py-4">
              <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-cs-surface-2">
                <Icon className="size-4 text-cs-accent" />
              </span>
              <div className="flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle">
                    {r.label}
                  </span>
                </div>
                <div className="mt-1 text-sm text-foreground">{r.value}</div>
                {r.note && (
                  <div className="mt-1 text-xs text-fg-subtle">{r.note}</div>
                )}
              </div>
            </div>
          );
        })}
      </dl>
    </div>
  );
}

export function SystemView() {
  return (
    <>
      <PageHeader
        eyebrow="System requirements"
        title="What you need to run CyberScope."
        description="Requirements are split into two distinct concerns: what you need to install and update the software, and what you need during analysis. Exact resource figures will be finalized before the first stable release."
      />

      <Section>
        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal>
            <ReqTable
              title="Install / update"
              subtitle="Required to download, verify, and install the application"
              reqs={INSTALL_REQS}
            />
          </Reveal>
          <Reveal delay={80}>
            <ReqTable
              title="During analysis"
              subtitle="Required while the reconstruction engine is running"
              reqs={ANALYSIS_REQS}
            />
          </Reveal>
        </div>

        <Reveal delay={140}>
          <div className="mt-8 rounded-lg border border-border bg-cs-surface-1 p-6">
            <SectionHeader
              eyebrow="Notes"
              title="On unconfirmed figures."
            />
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-fg-muted">
              Where a value reads &ldquo;To be finalized&rdquo;, the team has
              not yet measured a stable, defensible number across the supported
              platforms. Rather than invent one, CyberScope states the
              requirement is pending. Confirmed figures will appear here before
              the first stable release.
            </p>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
