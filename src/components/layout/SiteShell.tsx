import type { ReactNode } from "react";
import type { RouteId } from "@/lib/types";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function SiteShell({
  current,
  onNavigate,
  children,
}: {
  current: RouteId;
  onNavigate: (r: RouteId) => void;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:border focus:border-cs-border-strong focus:bg-cs-surface-2 focus:px-4 focus:py-2 focus:text-sm focus:text-foreground"
      >
        Skip to content
      </a>
      <Navbar current={current} onNavigate={onNavigate} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
