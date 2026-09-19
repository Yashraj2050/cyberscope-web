import { Users, Code, Trophy, Shield } from "lucide-react";
import { Section, SectionHeader, Container } from "@/components/primitives/ui";
import { Reveal } from "@/components/primitives/Reveal";

export function SIHTeamSection() {
  return (
    <Section className="border-t border-border bg-surface-elevated pb-20">
      <div className="flex flex-col gap-12">
        <Reveal>
          <SectionHeader
            eyebrow="SIH 2026 Project"
            title="Team Meteoric"
            description="CyberScope is a prototype developed for the Smart India Hackathon 2026. Built as a local-first desktop application for specialized SOC assessment."
          />
        </Reveal>

        <Reveal delay={80}>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-5">
              <div className="flex items-center gap-2 text-fg">
                <Trophy className="size-4 text-accent" />
                <span className="font-semibold text-sm">Problem Statement</span>
              </div>
              <p className="text-xs leading-relaxed text-fg-muted font-mono uppercase tracking-wider">
                SIH26157
              </p>
              <p className="text-sm leading-relaxed text-fg/90">
                Supervisory Analytics Tool for SOC Assessment (SAT-SA)
              </p>
            </div>

            <div className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-5">
              <div className="flex items-center gap-2 text-fg">
                <Shield className="size-4 text-accent" />
                <span className="font-semibold text-sm">Theme</span>
              </div>
              <p className="text-sm leading-relaxed text-fg/90">
                Blockchain & Cybersecurity
              </p>
            </div>

            <div className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-5">
              <div className="flex items-center gap-2 text-fg">
                <Code className="size-4 text-accent" />
                <span className="font-semibold text-sm">Category</span>
              </div>
              <p className="text-sm leading-relaxed text-fg/90">
                Software
              </p>
            </div>

            <div className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-5">
              <div className="flex items-center gap-2 text-fg">
                <Users className="size-4 text-accent" />
                <span className="font-semibold text-sm">Team Identity</span>
              </div>
              <p className="text-xs leading-relaxed text-fg-muted font-mono uppercase tracking-wider">
                Team ID: 130922
              </p>
              <p className="text-sm leading-relaxed text-fg/90">
                Meteoric
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
