"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Download, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, SECONDARY_NAV, ROUTE_META } from "@/lib/constants";
import type { RouteId } from "@/lib/types";
import { routerHref } from "@/lib/router";
import { Container } from "@/components/primitives/ui";

function Wordmark({ onClick }: { onClick?: () => void }) {
  return (
    <a
      href={routerHref("home")}
      onClick={onClick}
      className="group flex items-center gap-2.5"
      aria-label="CyberScope home"
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 32 32"
        className="text-accent"
        aria-hidden
      >
        <rect width="32" height="32" rx="7" fill="#0e131b" />
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
        CyberScope
      </span>
    </a>
  );
}

function isActive(route: RouteId, current: RouteId): boolean {
  return route === current;
}

function NavDropdown({
  label,
  items,
  current,
  onNavigate,
}: {
  label: string;
  items: { label: string; route: RouteId; description?: string }[];
  current: RouteId;
  onNavigate: (r: RouteId) => void;
}) {
  const [open, setOpen] = useState(false);
  const [leaving, setLeaving] = useState<ReturnType<typeof setTimeout> | null>(
    null
  );

  const cancelLeave = () => {
    if (leaving) clearTimeout(leaving);
    setLeaving(null);
  };
  const handleEnter = () => {
    cancelLeave();
    setOpen(true);
  };
  const handleLeave = () => {
    const t = setTimeout(() => setOpen(false), 120);
    setLeaving(t);
  };

  useEffect(() => {
    // cleanup any pending leave timer on unmount
    return () => {
      if (leaving) clearTimeout(leaving);
    };
  }, [leaving]);

  const isChildActive = items.some((i) => isActive(i.route, current));

  return (
    <div
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) handleLeave();
      }}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        // Open on click. Hover (mouseenter) and focus already open it; closing
        // is handled by mouseleave, blur, and Escape. Avoiding a toggle here
        // prevents the hover-then-click conflict that would close the menu.
        onClick={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpen(false);
        }}
        className={cn(
          "inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-sm transition-colors",
          isChildActive
            ? "text-fg"
            : "text-fg-muted hover:text-fg"
        )}
      >
        {label}
        <ChevronDown
          className={cn(
            "size-3.5 text-fg-subtle transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute left-0 top-full z-50 mt-2 w-80 overflow-hidden rounded-lg border border-border bg-surface-elevated p-1.5 shadow-lg shadow-black/30"
        >
          {items.map((item) => (
            <a
              key={item.route}
              href={routerHref(item.route)}
              onClick={() => {
                setOpen(false);
                onNavigate(item.route);
              }}
              role="menuitem"
              className={cn(
                "block rounded-md px-3 py-2.5 transition-colors",
                isActive(item.route, current)
                  ? "bg-surface-hover"
                  : "hover:bg-surface-hover"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-fg">
                  {item.label}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-subtle">
                  {ROUTE_META[item.route].hash.replace("#/", "/")}
                </span>
              </div>
              {item.description && (
                <div className="mt-0.5 text-xs text-fg-subtle">
                  {item.description}
                </div>
              )}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export function Navbar({
  current,
  onNavigate,
}: {
  current: RouteId;
  onNavigate: (r: RouteId) => void;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close the mobile menu and navigate. Closing here (in the handler)
  // avoids a route-change effect that would call setState during render sync.
  const go = (r: RouteId) => {
    setMobileOpen(false);
    onNavigate(r);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <Container>
        <div className="flex h-14 items-center justify-between gap-4">
          <Wordmark />

          {/* Desktop nav */}
          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="Primary"
          >
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <NavDropdown
                  key={item.label}
                  label={item.label}
                  items={item.children}
                  current={current}
                  onNavigate={onNavigate}
                />
              ) : (
                <a
                  key={item.label}
                  href={routerHref(item.route!)}
                  onClick={() => onNavigate(item.route!)}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-sm transition-colors",
                    isActive(item.route!, current)
                      ? "text-fg"
                      : "text-fg-muted hover:text-fg"
                  )}
                >
                  {item.label}
                </a>
              )
            )}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={routerHref("download")}
              onClick={() => onNavigate("download")}
              className={cn(
                "hidden items-center gap-2 rounded-md bg-accent px-3.5 py-2 text-sm font-medium text-[#06141a] transition-colors hover:bg-accent-strong sm:inline-flex"
              )}
            >
              <Download className="size-4" />
              Download
            </a>

            <button
              type="button"
              className="inline-flex size-9 items-center justify-center rounded-md border border-border text-fg-muted transition-colors hover:text-fg lg:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div className="border-t border-border bg-background lg:hidden">
          <Container>
            <div className="flex flex-col py-4">
              {NAV_ITEMS.flatMap((item) =>
                item.children
                  ? item.children.map((c) => (
                      <a
                        key={c.route}
                        href={routerHref(c.route)}
                        onClick={() => go(c.route)}
                        className={cn(
                          "rounded-md px-3 py-2.5 text-sm",
                          isActive(c.route, current)
                            ? "bg-surface-elevated text-fg"
                            : "text-fg-muted"
                        )}
                      >
                        <span className="block font-medium text-fg">
                          {c.label}
                        </span>
                        {c.description && (
                          <span className="mt-0.5 block text-xs text-fg-subtle">
                            {c.description}
                          </span>
                        )}
                      </a>
                    ))
                  : [
                      <a
                        key={item.label}
                        href={routerHref(item.route!)}
                        onClick={() => go(item.route!)}
                        className={cn(
                          "rounded-md px-3 py-2.5 text-sm",
                          isActive(item.route!, current)
                            ? "bg-surface-elevated text-fg"
                            : "text-fg-muted"
                        )}
                      >
                        {item.label}
                      </a>,
                    ]
              )}
              <div className="my-2 h-px bg-border" />
              {SECONDARY_NAV.map((s) => (
                <a
                  key={s.route}
                  href={routerHref(s.route)}
                  onClick={() => go(s.route)}
                  className={cn(
                    "rounded-md px-3 py-2.5 text-sm",
                    isActive(s.route, current)
                      ? "bg-surface-elevated text-fg"
                      : "text-fg-muted"
                  )}
                >
                  {s.label}
                </a>
              ))}
              <a
                href={routerHref("download")}
                onClick={() => go("download")}
                className="mt-3 inline-flex items-center justify-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-[#06141a]"
              >
                <Download className="size-4" />
                Download CyberScope
              </a>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
