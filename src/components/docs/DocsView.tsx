"use client";

import { useState } from "react";
import { Info, AlertTriangle } from "lucide-react";
import {
  PageHeader,
  Section,
  Container,
  CodeBlock,
} from "@/components/primitives/ui";
import { Reveal } from "@/components/primitives/Reveal";
import { DOC_SECTIONS } from "@/data/docs";
import type { DocBlock } from "@/lib/types";
import { cn } from "@/lib/utils";

function Block({ block }: { block: DocBlock }) {
  switch (block.type) {
    case "p":
      return (
        <p className="text-[15px] leading-relaxed text-fg-muted">
          {block.text}
        </p>
      );
    case "h":
      return (
        <h3 className="mt-8 scroll-mt-24 text-lg font-semibold tracking-tight text-foreground">
          {block.text}
        </h3>
      );
    case "code":
      return <CodeBlock code={block.text} lang={block.lang ?? "text"} />;
    case "list":
      return (
        <ul className="flex flex-col gap-2">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 text-[15px] leading-relaxed text-fg-muted"
            >
              <span className="mt-2 size-1 shrink-0 rounded-full bg-cs-accent" />
              {item}
            </li>
          ))}
        </ul>
      );
    case "callout": {
      const isWarn = block.tone === "warn";
      return (
        <div
          className={cn(
            "flex items-start gap-3 rounded-lg border p-4",
            isWarn
              ? "border-cs-unknown/30 bg-cs-unknown/[0.05]"
              : "border-cs-accent/25 bg-cs-accent/[0.05]"
          )}
        >
          {isWarn ? (
            <AlertTriangle className="mt-0.5 size-4 shrink-0 text-cs-unknown" />
          ) : (
            <Info className="mt-0.5 size-4 shrink-0 text-cs-accent" />
          )}
          <div>
            {block.title && (
              <div
                className={cn(
                  "font-mono text-[11px] uppercase tracking-[0.16em]",
                  isWarn ? "text-cs-unknown" : "text-cs-accent"
                )}
              >
                {block.title}
              </div>
            )}
            <p className="mt-1 text-sm leading-relaxed text-foreground/90">
              {block.text}
            </p>
          </div>
        </div>
      );
    }
    default:
      return null;
  }
}

export function DocsView() {
  const [activeId, setActiveId] = useState(DOC_SECTIONS[0].id);
  const active =
    DOC_SECTIONS.find((s) => s.id === activeId) ?? DOC_SECTIONS[0];
  const activeIndex = DOC_SECTIONS.findIndex((s) => s.id === activeId);

  return (
    <>
      <PageHeader
        eyebrow="Documentation"
        title="CyberScope documentation."
        description="How to install, run, and reason about CyberScope — from the attack graph through reconstruction gaps to evidence verification."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <div className="sticky top-20">
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">
                Contents
              </span>
              <nav
                className="mt-4 flex flex-col gap-0.5"
                aria-label="Documentation sections"
              >
                {DOC_SECTIONS.map((s, i) => {
                  const isActive = s.id === activeId;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setActiveId(s.id)}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "group flex items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors",
                        isActive
                          ? "bg-cs-surface-2 text-foreground"
                          : "text-fg-muted hover:bg-cs-surface-2/50 hover:text-foreground"
                      )}
                    >
                      <span
                        className={cn(
                          "font-mono text-[11px]",
                          isActive ? "text-cs-accent" : "text-fg-subtle"
                        )}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {s.title}
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <div className="lg:col-span-9">
            <article className="rounded-xl border border-border bg-cs-surface-1 p-6 md:p-10">
              <Reveal key={active.id}>
                <div className="mb-2 flex items-center gap-3">
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-cs-accent">
                    {String(activeIndex + 1).padStart(2, "0")} /{" "}
                    {String(DOC_SECTIONS.length).padStart(2, "0")}
                  </span>
                  <span className="h-px flex-1 bg-border" />
                </div>
                <h2 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                  {active.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                  {active.blurb}
                </p>
                <div className="mt-8 flex flex-col gap-4">
                  {active.blocks.map((block, i) => (
                    <Block key={i} block={block} />
                  ))}
                </div>
              </Reveal>
            </article>

            {/* Prev / Next */}
            <div className="mt-6 flex items-center justify-between gap-4">
              {activeIndex > 0 ? (
                <button
                  type="button"
                  onClick={() => setActiveId(DOC_SECTIONS[activeIndex - 1].id)}
                  className="group inline-flex items-center gap-2 rounded-md border border-border bg-cs-surface-1 px-4 py-2.5 text-sm text-fg-muted transition-colors hover:text-foreground"
                >
                  <span aria-hidden>←</span>
                  <span className="flex flex-col items-start">
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-subtle">
                      Previous
                    </span>
                    {DOC_SECTIONS[activeIndex - 1].title}
                  </span>
                </button>
              ) : (
                <span />
              )}
              {activeIndex < DOC_SECTIONS.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setActiveId(DOC_SECTIONS[activeIndex + 1].id)}
                  className="group inline-flex items-center gap-2 rounded-md border border-border bg-cs-surface-1 px-4 py-2.5 text-sm text-fg-muted transition-colors hover:text-foreground"
                >
                  <span className="flex flex-col items-end text-right">
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-subtle">
                      Next
                    </span>
                    {DOC_SECTIONS[activeIndex + 1].title}
                  </span>
                  <span aria-hidden>→</span>
                </button>
              ) : (
                <span />
              )}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
