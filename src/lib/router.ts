"use client";

import { useCallback, useEffect, useState } from "react";
import type { RouteId } from "./types";
import { ROUTE_META } from "./constants";

/** All valid route ids in display order. */
export const ROUTE_IDS = Object.keys(ROUTE_META) as RouteId[];

/** Parse a location hash like "#/download" into a route id. */
export function parseHash(hash: string): RouteId {
  const clean = hash.replace(/^#\/?/, "").replace(/\/$/, "").trim();
  if (!clean) return "home";
  if ((ROUTE_IDS as string[]).includes(clean)) {
    return clean as RouteId;
  }
  return "home";
}

/** Build a hash href for a route, e.g. routerHref("download") -> "#/download". */
export function routerHref(route: RouteId): string {
  if (route === "home") return "#/";
  return `#/${route}`;
}

/**
 * Subscribe to hash-based routing. Returns the current route id and a
 * navigate() helper. Initial route is read lazily from the URL on first
 * render (SSR-safe: returns "home" on the server).
 */
export function useHashRoute() {
  const [route, setRoute] = useState<RouteId>(() => {
    if (typeof window === "undefined") return "home";
    return parseHash(window.location.hash);
  });

  useEffect(() => {
    const sync = () => setRoute(parseHash(window.location.hash));
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const navigate = useCallback((next: RouteId) => {
    const href = routerHref(next);
    if (window.location.hash !== href) {
      window.location.hash = href;
    } else {
      // already on the route — just scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  return { route, navigate };
}
