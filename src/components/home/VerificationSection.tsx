import { CheckCircle2 } from "lucide-react";
import { Section, SectionHeader } from "@/components/primitives/ui";
import { Reveal } from "@/components/primitives/Reveal";
import { SEVEN_VERIFICATION_CHECKS } from "@/lib/constants";

export function VerificationSection() {
  return (
    <Section className="border-t border-border bg-surface">
      <div className="flex flex-col gap-10">
        <Reveal>
          <SectionHeader
            eyebrow="Independent Verification"
            title="Seven-check deterministic verification."
            description="Candidates are independently verified against the state of the graph. A deterministic evidence-support ranking ensures every transition is evaluated objectively based on available evidence."
          />
        </Reveal>

        <Reveal delay={80}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {SEVEN_VERIFICATION_CHECKS.map((check) => (
              <div
                key={check.key}
                className="flex flex-col gap-2 rounded-md border border-border bg-background p-4"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-accent" />
                  <span className="font-semibold text-fg text-sm">{check.label}</span>
                </div>
                <p className="text-xs text-fg-muted leading-relaxed">
                  {check.description}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
