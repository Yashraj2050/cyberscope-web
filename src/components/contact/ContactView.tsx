import { ShieldAlert, LifeBuoy, Handshake, Mail } from "lucide-react";
import {
  PageHeader,
  Section,
  Container,
  Eyebrow,
} from "@/components/primitives/ui";
import { Reveal } from "@/components/primitives/Reveal";

const CHANNELS = [
  {
    icon: LifeBuoy,
    title: "Support",
    handle: "support@cyberscope.dev",
    description:
      "Installation issues, engine errors, and unexpected analysis behavior. Include the CyberScope version and a sanitized description of the input.",
    response: "Best-effort response during business hours.",
  },
  {
    icon: ShieldAlert,
    title: "Security disclosures",
    handle: "security@cyberscope.dev",
    description:
      "Responsible disclosure of vulnerabilities in the desktop application, the local backend, or the update model. Report before publishing.",
    response: "Acknowledged within 72 hours.",
    tone: "amber" as const,
  },
  {
    icon: Handshake,
    title: "Partnership",
    handle: "partners@cyberscope.dev",
    description:
      "Integration, deployment, and research collaboration. Relevant for teams evaluating CyberScope for structured evaluation.",
    response: "Reviewed weekly.",
  },
];

export function ContactView() {
  return (
    <>
      <PageHeader
        eyebrow="Contact & support"
        title="Reach the CyberScope team."
        description="Three direct channels. This is not a lead-capture form — pick the one that matches your need and email it directly."
      />

      <Section>
        <div className="grid gap-4 md:grid-cols-3">
          {CHANNELS.map((c, i) => {
            const Icon = c.icon;
            return (
              <Reveal key={c.title} delay={i * 70}>
                <div
                  className={`flex h-full flex-col gap-4 rounded-lg border bg-cs-surface-1 p-6 ${
                    c.tone === "amber"
                      ? "border-cs-unknown/30 cs-hairline-top"
                      : "border-border"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex size-10 items-center justify-center rounded-md border ${
                        c.tone === "amber"
                          ? "border-cs-unknown/30 bg-cs-unknown/10"
                          : "border-cs-accent/30 bg-cs-accent/10"
                      }`}
                    >
                      <Icon
                        className={`size-5 ${
                          c.tone === "amber" ? "text-cs-unknown" : "text-cs-accent"
                        }`}
                      />
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-subtle">
                      {c.response}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground">
                      {c.title}
                    </h3>
                    <a
                      href={`mailto:${c.handle}`}
                      className="group mt-1.5 inline-flex items-center gap-1.5 font-mono text-sm text-cs-accent hover:text-cs-accent-strong"
                    >
                      <Mail className="size-3.5" />
                      {c.handle}
                    </a>
                  </div>
                  <p className="flex-1 text-sm leading-relaxed text-fg-muted">
                    {c.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={160}>
          <div className="mt-8 rounded-xl border border-border bg-cs-surface-1 p-6 md:p-8">
            <Eyebrow>When you write</Eyebrow>
            <div className="mt-5 grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  Include in every report
                </h3>
                <ul className="mt-3 flex flex-col gap-2 text-sm text-fg-muted">
                  {[
                    "CyberScope version (shown in the app's About view).",
                    "Operating system and architecture.",
                    "A sanitized description of the input or scenario.",
                    "Steps to reproduce, if applicable.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1.5 size-1 shrink-0 rounded-full bg-cs-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  Do not send
                </h3>
                <ul className="mt-3 flex flex-col gap-2 text-sm text-fg-muted">
                  {[
                    "Live production telemetry or PII.",
                    "Credentials, tokens, or secrets.",
                    "Full event dumps — a minimal reproducer is enough.",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1.5 size-1 shrink-0 rounded-full bg-cs-unknown" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={220}>
          <p className="mt-8 text-center text-xs text-fg-subtle">
            CyberScope is offline software. These channels are the only places
            the application is not.
          </p>
        </Reveal>
      </Section>
    </>
  );
}
