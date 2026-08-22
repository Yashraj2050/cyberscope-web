import type { ReactNode } from "react";
import { ChevronDown, ChevronRight, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { RouteId } from "@/lib/types";
import { routerHref } from "@/lib/router";
import { CopyButton } from "./CopyButton";

/* ------------------------------------------------------------------ */
/*  Layout                                                             */
/* ------------------------------------------------------------------ */

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}

export function Section({
  children,
  className,
  id,
  container = true,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  container?: boolean;
}) {
  return (
    <section id={id} className={cn("py-20 md:py-28", className)}>
      {container ? <Container>{children}</Container> : children}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Typography helpers                                                 */
/* ------------------------------------------------------------------ */

/** Mono uppercase label with a short leading bar. */
export function Eyebrow({
  children,
  className,
  bar = true,
}: {
  children: ReactNode;
  className?: string;
  bar?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-fg-muted",
        className
      )}
    >
      {bar && (
        <span className="h-px w-7 bg-gradient-to-r from-cs-accent/70 to-cs-accent/0" />
      )}
      {children}
    </span>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        centered && "items-center text-center",
        className
      )}
    >
      {eyebrow && <Eyebrow bar={!centered}>{eyebrow}</Eyebrow>}
      <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-base leading-relaxed text-fg-muted md:text-[17px]",
            centered ? "max-w-2xl" : "max-w-2xl"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

/** Bare mono label, no bar. */
export function MonoLabel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle",
        className
      )}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Evidence semantics                                                 */
/* ------------------------------------------------------------------ */

const EVIDENCE_STYLES = {
  observed: {
    dot: "bg-cs-observed",
    text: "text-cs-observed",
    border: "border-cs-observed/30",
    bg: "bg-cs-observed/10",
  },
  inferred: {
    dot: "bg-cs-inferred",
    text: "text-cs-inferred",
    border: "border-cs-inferred/30",
    bg: "bg-cs-inferred/10",
  },
  unknown: {
    dot: "bg-cs-unknown",
    text: "text-cs-unknown",
    border: "border-cs-unknown/30",
    bg: "bg-cs-unknown/10",
  },
} as const;

export type EvidenceState = keyof typeof EVIDENCE_STYLES;

export function EvidenceBadge({
  state,
  label,
  className,
}: {
  state: EvidenceState;
  label?: string;
  className?: string;
}) {
  const s = EVIDENCE_STYLES[state];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-md border px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.16em]",
        s.border,
        s.bg,
        s.text,
        className
      )}
    >
      <span className={cn("size-1.5 rounded-full", s.dot)} />
      {label ?? state}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Connectors + pipeline                                              */
/* ------------------------------------------------------------------ */

export function Arrow({
  direction = "down",
  className,
}: {
  direction?: "down" | "right";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "flex items-center justify-center text-fg-subtle",
        direction === "down" ? "py-1" : "px-1",
        className
      )}
      aria-hidden
    >
      {direction === "down" ? (
        <ChevronDown className="size-4" />
      ) : (
        <ChevronRight className="size-4" />
      )}
    </span>
  );
}

export function Pipeline({
  stages,
  className,
}: {
  stages: { label: string; sub?: string }[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-stretch gap-3 md:flex-row md:items-center md:gap-2",
        className
      )}
    >
      {stages.map((stage, i) => (
        <div
          key={stage.label}
          className="flex flex-col items-stretch gap-3 md:flex-row md:items-center md:gap-2"
        >
          <div className="flex min-w-0 flex-1 items-center gap-3 rounded-md border border-border bg-cs-surface-1 px-4 py-3">
            <span className="font-mono text-[11px] tabular-nums text-fg-subtle">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="flex flex-col">
              <span className="text-sm font-medium text-foreground">
                {stage.label}
              </span>
              {stage.sub && (
                <span className="text-xs text-fg-subtle">{stage.sub}</span>
              )}
            </span>
          </div>
          {i < stages.length - 1 && (
            <Arrow
              direction="right"
              className="hidden rotate-0 md:flex"
            />
          )}
          {i < stages.length - 1 && (
            <Arrow direction="down" className="md:hidden" />
          )}
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Inner page header                                                  */
/* ------------------------------------------------------------------ */

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden border-b border-border">
      <div className="cs-grid-bg absolute inset-0 opacity-50" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cs-accent/40 to-transparent"
        aria-hidden
      />
      <Container className="relative py-16 md:py-24">
        <div className="flex flex-col gap-5">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="max-w-2xl text-lg leading-relaxed text-fg-muted">
              {description}
            </p>
          )}
          {children}
        </div>
      </Container>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  Code + data display                                                */
/* ------------------------------------------------------------------ */

export function CodeBlock({
  code,
  lang = "text",
}: {
  code: string;
  lang?: string;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-cs-surface-1">
      <div className="flex items-center justify-between border-b border-border px-4 py-2">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">
          {lang}
        </span>
        <CopyButton text={code} />
      </div>
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed">
        <code className="font-mono text-foreground/90">{code}</code>
      </pre>
    </div>
  );
}

export function InfoRow({
  label,
  children,
  mono = true,
}: {
  label: ReactNode;
  children: ReactNode;
  mono?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-border/60 py-2.5 last:border-0">
      <dt className="shrink-0 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-subtle">
        {label}
      </dt>
      <dd
        className={cn(
          "text-right text-sm text-foreground/90",
          mono && "font-mono",
          "break-words"
        )}
      >
        {children}
      </dd>
    </div>
  );
}

export function Stat({
  label,
  value,
  hint,
}: {
  label: ReactNode;
  value: ReactNode;
  hint?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">
        {label}
      </span>
      <span className="text-2xl font-semibold tracking-tight text-foreground">
        {value}
      </span>
      {hint && <span className="text-xs text-fg-subtle">{hint}</span>}
    </div>
  );
}

export function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="rounded border border-cs-border-strong bg-cs-surface-2 px-1.5 py-0.5 font-mono text-[11px] text-fg-muted">
      {children}
    </kbd>
  );
}

/* ------------------------------------------------------------------ */
/*  Routing link (plain anchor — hash change drives the router)       */
/* ------------------------------------------------------------------ */

export function RouterLink({
  route,
  children,
  className,
  onClick,
  ...props
}: {
  route: RouteId;
  children: ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href={routerHref(route)}
      onClick={onClick}
      className={className}
      {...props}
    >
      {children}
    </a>
  );
}

/* ------------------------------------------------------------------ */
/*  Misc                                                                */
/* ------------------------------------------------------------------ */

export function StatusChip({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: "neutral" | "accent" | "amber" | "observed";
  className?: string;
}) {
  const tones = {
    neutral: "border-border bg-cs-surface-1 text-fg-muted",
    accent: "border-cs-accent/30 bg-cs-accent/10 text-cs-accent",
    amber: "border-cs-unknown/30 bg-cs-unknown/10 text-cs-unknown",
    observed: "border-cs-observed/30 bg-cs-observed/10 text-cs-observed",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-md border px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.16em]",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

export function LinkArrow({ className }: { className?: string }) {
  return (
    <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
  );
}
