import {
  Monitor,
  Cpu,
  Boxes,
  GitBranch,
  Target,
  Scale,
  ShieldCheck,
  Lock,
} from "lucide-react";
import type { ReactNode } from "react";
import {
  PageHeader,
  Section,
  Container,
  Eyebrow,
  SectionHeader,
  InfoRow,
} from "@/components/primitives/ui";
import { Reveal } from "@/components/primitives/Reveal";
import { SIX_GAP_SIGNALS } from "@/lib/constants";

function DownConnector({ label }: { label?: string }) {
  return (
    <div className="flex items-center gap-3 py-2">
      <div className="flex flex-col items-center">
        <div className="h-7 w-px bg-border-strong" />
        <div className="size-1.5 -translate-y-1 rotate-45 border-r border-b border-white/25" />
      </div>
      {label && (
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-subtle">
          {label}
        </span>
      )}
    </div>
  );
}

function Node({
  icon: Icon,
  label,
  sub,
}: {
  icon: typeof Monitor;
  label: string;
  sub?: string;
}) {
  return (
    <div className="flex min-w-0 flex-1 items-center gap-3 rounded-md border border-border bg-surface-elevated px-4 py-3">
      <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-md border border-border bg-surface">
        <Icon className="size-3.5 text-accent" />
      </span>
      <div className="flex min-w-0 flex-col">
        <span className="truncate text-sm font-medium text-fg">
          {label}
        </span>
        {sub && <span className="truncate text-xs text-fg-subtle">{sub}</span>}
      </div>
    </div>
  );
}

function LayerGroup({
  label,
  meta,
  children,
}: {
  label: string;
  meta?: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-lg border border-border bg-surface p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
          {label}
        </span>
        {meta && (
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-fg-subtle">
            {meta}
          </span>
        )}
      </div>
      <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
        {children}
      </div>
    </div>
  );
}

function Arrow() {
  return (
    <span className="hidden px-1 text-fg-subtle sm:inline" aria-hidden>
      →
    </span>
  );
}

const PROPERTIES = [
  {
    icon: Lock,
    title: "Offline by construction",
    text: "The engine makes no outbound network calls during analysis. The loopback backend is the only network surface.",
  },
  {
    icon: ShieldCheck,
    title: "Strict ground-truth isolation",
    text: "Candidate generation and scoring are isolated from ground-truth labels. Inferred candidates never leak into observed evidence.",
  },
  {
    icon: Target,
    title: "Evidence-gated output",
    text: "Evidence verification gates which candidates surface to the UI. Unsupported candidates stay UNKNOWN.",
  },
  {
    icon: Boxes,
    title: "Packaged local engine",
    text: "The Python engine is packaged with PyInstaller and embedded in the desktop build — no Python install required.",
  },
];

export function ArchitectureView() {
  return (
    <>
      <PageHeader
        eyebrow="Architecture"
        title="A local stack, from shell to engine."
        description="The desktop shell, the local backend, the Python reconstruction engine, and the analysis pipeline run on the same machine. This page documents every layer and the flow between them."
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Diagram */}
          <div className="lg:col-span-7">
            <Reveal>
              <LayerGroup label="Desktop shell" meta="user-facing">
                <Node icon={Monitor} label="Desktop Application" sub="Tauri shell" />
                <Arrow />
                <Node icon={Monitor} label="Tauri" sub="native wrapper" />
                <Arrow />
                <Node icon={Monitor} label="React UI" sub="graph view" />
              </LayerGroup>
            </Reveal>

            <div className="pl-6">
              <DownConnector label="local IPC" />
            </div>

            <Reveal delay={60}>
              <LayerGroup label="Local backend" meta="loopback only">
                <Node icon={Cpu} label="Local FastAPI" sub="127.0.0.1" />
              </LayerGroup>
            </Reveal>

            <div className="pl-6">
              <DownConnector label="python" />
            </div>

            <Reveal delay={120}>
              <LayerGroup label="Reconstruction engine" meta="PyInstaller">
                <Node icon={Cpu} label="Python Engine" sub="reconstruction" />
                <Arrow />
                <Node icon={GitBranch} label="NetworkX Graph" sub="attack graph" />
              </LayerGroup>
            </Reveal>

            <div className="pl-6">
              <DownConnector label="pipeline" />
            </div>

            <Reveal delay={180}>
              <LayerGroup label="Analysis pipeline" meta="staged">
                <Node icon={Target} label="Gap Detection" sub="6 signals" />
                <Arrow />
                <Node icon={GitBranch} label="Candidate Gen" sub="scored" />
                <Arrow />
                <Node icon={Scale} label="Scoring" sub="weighted" />
                <Arrow />
                <Node icon={ShieldCheck} label="Verification" sub="sufficiency" />
              </LayerGroup>
            </Reveal>

            <Reveal delay={220}>
              <div className="mt-6 rounded-lg border border-warning/30 bg-surface p-4">
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-warning">
                  Trust boundary
                </span>
                <p className="mt-2 text-sm leading-relaxed text-fg/90">
                  The boundary between the observed graph and the candidate set
                  is enforced here. Verification decides OBSERVED → INFERRED or
                  stays UNKNOWN.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right rail: properties + signals */}
          <aside className="lg:col-span-5">
            <Reveal delay={120}>
              <div className="flex flex-col gap-4">
                <SectionHeader
                  eyebrow="Key properties"
                  title="Designed constraints"
                />
                <div className="grid gap-3">
                  {PROPERTIES.map((p) => (
                    <div
                      key={p.title}
                      className="flex items-start gap-3 rounded-lg border border-border bg-surface p-4"
                    >
                      <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-surface-elevated">
                        <p.icon className="size-4 text-accent" />
                      </span>
                      <div>
                        <h3 className="text-sm font-semibold text-fg">
                          {p.title}
                        </h3>
                        <p className="mt-1 text-xs leading-relaxed text-fg-muted">
                          {p.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={180}>
              <div className="mt-6 rounded-lg border border-border bg-surface p-5">
                <div className="mb-3 flex items-center justify-between">
                  <Eyebrow>Six gap signals</Eyebrow>
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-fg-subtle">
                    consistency
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  {SIX_GAP_SIGNALS.map((sig) => (
                    <div
                      key={sig.key}
                      className="flex items-center justify-between border-b border-border/60 py-2 last:border-0"
                    >
                      <span className="text-sm text-fg">{sig.label}</span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-fg-subtle">
                        {sig.key}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </aside>
        </div>
      </Section>

      {/* Component detail table */}
      <Section className="border-t border-border bg-surface">
        <Container>
          <Reveal>
            <SectionHeader
              eyebrow="Component detail"
              title="What each layer is responsible for."
            />
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-8 overflow-hidden rounded-lg border border-border">
              <table className="w-full text-left text-sm">
                <thead className="bg-surface-elevated">
                  <tr className="border-b border-border">
                    <th className="px-5 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle">
                      Layer
                    </th>
                    <th className="px-5 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle">
                      Responsibility
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Tauri", "Desktop shell, native window, IPC to local backend"],
                    ["React UI", "Graph view, event detail, evidence-state display"],
                    ["Local FastAPI", "HTTP surface over loopback; exposes the engine"],
                    ["Python Engine", "Pipeline orchestration and state"],
                    ["NetworkX", "Attack graph construction and traversal"],
                    ["Gap Detection", "Six consistency signals across the graph"],
                    ["Candidate Generation", "Proposed transitions for each gap"],
                    ["Candidate Scoring", "Structured, weighted evidence scores"],
                    ["Evidence Verification", "Sufficiency check → INFERRED or UNKNOWN"],
                  ].map(([layer, resp]) => (
                    <tr key={layer} className="border-b border-border/60 last:border-0">
                      <td className="px-5 py-3 align-top">
                        <span className="font-mono text-sm text-accent">{layer}</span>
                      </td>
                      <td className="px-5 py-3 text-fg-muted">{resp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
