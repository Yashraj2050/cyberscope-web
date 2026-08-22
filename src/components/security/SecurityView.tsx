import {
  Cpu,
  Database,
  Wifi,
  Package,
  ShieldCheck,
  Activity,
  Crosshair,
  AlertTriangle,
} from "lucide-react";
import type { ReactNode } from "react";
import {
  PageHeader,
  Section,
  Container,
  Eyebrow,
} from "@/components/primitives/ui";
import { Reveal } from "@/components/primitives/Reveal";

interface Section {
  id: string;
  icon: typeof Cpu;
  title: string;
  body: ReactNode;
}

const SECTIONS: Section[] = [
  {
    id: "local-processing",
    icon: Cpu,
    title: "Local processing",
    body: (
      <div className="flex flex-col gap-3 text-sm leading-relaxed text-fg-muted">
        <p>
          CyberScope is designed to minimize external dependencies during
          analysis. The desktop architecture allows the analysis engine to
          operate locally, on the same machine that holds the telemetry.
        </p>
        <p>
          The Python reconstruction engine runs as a child process of the
          desktop application. It is packaged with PyInstaller and embedded in
          the build — there is no separate runtime to install and no remote
          service to call.
        </p>
      </div>
    ),
  },
  {
    id: "data-handling",
    icon: Database,
    title: "Data handling",
    body: (
      <div className="flex flex-col gap-3 text-sm leading-relaxed text-fg-muted">
        <p>
          Telemetry you import is processed in memory and written only to the
          local working directory you choose. CyberScope does not upload,
          mirror, or transmit imported events to any external location.
        </p>
        <p>
          Reconstructed graphs and candidate sets are persisted alongside your
          project data on the local filesystem. You control where that is.
        </p>
      </div>
    ),
  },
  {
    id: "offline-operation",
    icon: Wifi,
    title: "Offline operation",
    body: (
      <div className="flex flex-col gap-3 text-sm leading-relaxed text-fg-muted">
        <p>
          During analysis the engine makes no outbound network calls. The only
          network surface is the loopback interface the local FastAPI backend
          binds to, used for IPC between the UI and the engine.
        </p>
        <p>
          Offline operation is an architectural property, not a configuration.
          There is no setting to disable to &ldquo;turn on&rdquo; cloud
          analysis, because the engine has no code path for it.
        </p>
      </div>
    ),
  },
  {
    id: "software-packaging",
    icon: Package,
    title: "Software packaging",
    body: (
      <div className="flex flex-col gap-3 text-sm leading-relaxed text-fg-muted">
        <p>
          Each release ships as a platform-native package containing the
          Tauri shell, the React UI, and the PyInstaller-bundled engine. We
          publish a SHA-256 checksum for every package and recommend verifying
          it before installation.
        </p>
        <p>
          Verification instructions are provided on the Download page for each
          supported platform.
        </p>
      </div>
    ),
  },
  {
    id: "update-integrity",
    icon: ShieldCheck,
    title: "Update integrity",
    body: (
      <div className="flex flex-col gap-3 text-sm leading-relaxed text-fg-muted">
        <p>
          Updates are distributed as packages the user downloads and verifies
          locally. The desktop application compares the package against its
          expected checksum before applying it. Updates are never installed
          silently or automatically.
        </p>
        <p>
          We do not claim the update channel is &ldquo;tamper-proof.&rdquo;
          Integrity rests on checksum verification performed by the user and the
          application, not on an unbreakable transport.
        </p>
      </div>
    ),
  },
  {
    id: "telemetry-handling",
    icon: Activity,
    title: "Telemetry handling",
    body: (
      <div className="flex flex-col gap-3 text-sm leading-relaxed text-fg-muted">
        <p>
          The CyberScope application itself collects no usage telemetry. It
          does not phone home with feature usage, crash reports, or device
          fingerprints.
        </p>
        <p>
          If crash reporting is introduced in a future release, it will be
          opt-in, documented here, and limited to data the user explicitly
          approves.
        </p>
      </div>
    ),
  },
  {
    id: "threat-model",
    icon: Crosshair,
    title: "Threat model",
    body: (
      <div className="flex flex-col gap-3 text-sm leading-relaxed text-fg-muted">
        <p>CyberScope assumes the following adversary positions:</p>
        <ul className="flex flex-col gap-2 pl-1">
          {[
            "An adversary who can observe network traffic leaving the analyst's machine learns nothing about the investigation, because there is none during analysis.",
            "An adversary who can read the local filesystem can read imported telemetry and reconstructed graphs — protect the host and the working directory accordingly.",
            "An adversary who can replace the application binary before install can subvert analysis — this is why checksum verification matters.",
          ].map((t) => (
            <li key={t} className="flex items-start gap-2">
              <span className="mt-1.5 size-1 shrink-0 rounded-full bg-cs-accent" />
              {t}
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    id: "security-limitations",
    icon: AlertTriangle,
    title: "Security limitations",
    body: (
      <div className="flex flex-col gap-3 text-sm leading-relaxed text-fg-muted">
        <p>To be precise about what CyberScope does and does not provide:</p>
        <ul className="flex flex-col gap-2 pl-1">
          {[
            "It is not a sandbox. Code running with the user's privileges can interact with the application.",
            "It does not attest to the integrity of the host operating system.",
            "It does not provide authenticated encryption of project data at rest — use full-disk encryption for sensitive material.",
            "Preview builds have not undergone independent security audit.",
          ].map((t) => (
            <li key={t} className="flex items-start gap-2">
              <span className="mt-1.5 size-1 shrink-0 rounded-full bg-cs-unknown" />
              {t}
            </li>
          ))}
        </ul>
      </div>
    ),
  },
];

export function SecurityView() {
  return (
    <>
      <PageHeader
        eyebrow="Security"
        title="Security design, stated plainly."
        description="How CyberScope is designed to behave, without overstating what it guarantees. If a property is not implemented, it is marked as planned."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Sticky TOC */}
          <aside className="lg:col-span-3">
            <div className="sticky top-20">
              <Eyebrow>On this page</Eyebrow>
              <nav className="mt-4 flex flex-col gap-1">
                {SECTIONS.map((s, i) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="group flex items-center gap-3 rounded-md px-2 py-1.5 text-sm text-fg-muted transition-colors hover:bg-cs-surface-2 hover:text-foreground"
                  >
                    <span className="font-mono text-[11px] text-fg-subtle">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {s.title}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <div className="flex flex-col gap-6 lg:col-span-9">
            {SECTIONS.map((s, i) => {
              const Icon = s.icon;
              const isLimitation = s.id === "security-limitations";
              return (
                <Reveal key={s.id} delay={i * 40}>
                  <section
                    id={s.id}
                    className={`scroll-mt-24 rounded-xl border bg-cs-surface-1 p-6 md:p-8 ${
                      isLimitation
                        ? "border-cs-unknown/30"
                        : "border-border"
                    }`}
                  >
                    <div className="mb-5 flex items-center gap-3">
                      <span
                        className={`inline-flex size-9 items-center justify-center rounded-md border ${
                          isLimitation
                            ? "border-cs-unknown/30 bg-cs-unknown/10"
                            : "border-cs-accent/30 bg-cs-accent/10"
                        }`}
                      >
                        <Icon
                          className={`size-4 ${
                            isLimitation ? "text-cs-unknown" : "text-cs-accent"
                          }`}
                        />
                      </span>
                      <div className="flex items-baseline gap-3">
                        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h2 className="text-xl font-semibold tracking-tight text-foreground">
                          {s.title}
                        </h2>
                      </div>
                    </div>
                    {s.body}
                  </section>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Section>
    </>
  );
}
