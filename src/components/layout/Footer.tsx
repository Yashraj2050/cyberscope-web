"use client";

import { Github, ShieldCheck } from "lucide-react";
import type { RouteId } from "@/lib/types";
import { routerHref } from "@/lib/router";
import { Container } from "@/components/primitives/ui";
import { SITE } from "@/lib/constants";

const COLUMNS: { title: string; links: { label: string; route: RouteId }[] }[] =
  [
    {
      title: "Product",
      links: [
        { label: "Download", route: "download" },
        { label: "Releases", route: "releases" },
        { label: "Updates", route: "updates" },
        { label: "System Requirements", route: "system" },
      ],
    },
    {
      title: "Engineering",
      links: [
        { label: "Architecture", route: "architecture" },
        { label: "Documentation", route: "docs" },
        { label: "Security", route: "security" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", route: "about" },
        { label: "Contact & Support", route: "contact" },
      ],
    },
  ];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <Container>
        <div className="grid gap-10 py-14 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5">
              <svg
                width="22"
                height="22"
                viewBox="0 0 32 32"
                className="text-accent"
                aria-hidden
              >
                <rect width="32" height="32" rx="7" fill="#121a24" />
                <circle
                  cx="16"
                  cy="16"
                  r="9.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  opacity="0.35"
                />
                <circle
                  cx="16"
                  cy="16"
                  r="5.2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <circle cx="16" cy="16" r="1.7" fill="currentColor" />
                <path
                  d="M16 3.5v3.6M16 24.9v3.6M3.5 16h3.6M24.9 16h3.6"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  opacity="0.75"
                />
              </svg>
              <span className="text-[15px] font-semibold tracking-tight text-fg">
                {SITE.name}
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-fg-muted">
              {SITE.tagline}. A local-first application for reconstructing
              missing attack-path transitions and evaluating evidence strength.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface-elevated px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-muted">
                <ShieldCheck className="size-3 text-success" />
                Local-first
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface-elevated px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-muted">
                Offline analysis
              </span>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-subtle">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.route}>
                      <a
                        href={routerHref(link.route)}
                        className="text-sm text-fg-muted transition-colors hover:text-fg"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-border py-6 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-fg-subtle">
            <span>
              © {new Date().getFullYear()} {SITE.name}
            </span>
            <span className="hidden sm:inline">·</span>
            <span className="font-mono uppercase tracking-[0.12em]">
              Preview software — not a public release
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs text-fg-subtle">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-fg"
            >
              <Github className="size-3.5" />
              Source
            </a>
            <a
              href={routerHref("security")}
              className="transition-colors hover:text-fg"
            >
              Security
            </a>
            <a
              href={routerHref("contact")}
              className="transition-colors hover:text-fg"
            >
              Contact
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
