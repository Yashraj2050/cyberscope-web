"use client";

import { useEffect } from "react";
import { useHashRoute } from "@/lib/router";
import { ROUTE_META } from "@/lib/constants";
import type { RouteId } from "@/lib/types";
import { SiteShell } from "@/components/layout/SiteShell";
import { HomeView } from "@/components/home/HomeView";
import { DownloadView } from "@/components/download/DownloadView";
import { ReleasesView } from "@/components/releases/ReleasesView";
import { UpdatesView } from "@/components/updates/UpdatesView";
import { ArchitectureView } from "@/components/architecture/ArchitectureView";
import { DocsView } from "@/components/docs/DocsView";
import { SecurityView } from "@/components/security/SecurityView";
import { SystemView } from "@/components/system/SystemView";
import { AboutView } from "@/components/about/AboutView";
import { ContactView } from "@/components/contact/ContactView";

const VIEWS: Record<RouteId, () => React.ReactNode> = {
  home: HomeView,
  download: DownloadView,
  releases: ReleasesView,
  updates: UpdatesView,
  architecture: ArchitectureView,
  docs: DocsView,
  security: SecurityView,
  system: SystemView,
  about: AboutView,
  contact: ContactView,
};

export default function Page() {
  const { route, navigate } = useHashRoute();
  const View = VIEWS[route] ?? HomeView;

  // Scroll to top on route change (hash anchors don't scroll by themselves).
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [route]);

  // Reflect the route in the document title.
  useEffect(() => {
    const meta = ROUTE_META[route];
    if (meta) {
      document.title = meta.title;
    }
  }, [route]);

  return (
    <SiteShell current={route} onNavigate={navigate}>
      <View />
    </SiteShell>
  );
}
