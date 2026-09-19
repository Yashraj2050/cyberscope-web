import type { NavLink, RouteId } from "./types";

export const SITE = {
  name: "CyberScope",
  url: "https://cyberscope.dev",
  tagline: "Offline Attack Path Reconstruction & Evidence Analysis",
  description:
    "CyberScope is a local-first cybersecurity application for reconstructing missing attack-path transitions and evaluating evidence strength.",
} as const;

export const REPO_URL = "https://github.com/Yashraj2050/cyberscope";
export const DEMO_VIDEO_URL = ""; // Empty string indicates video placeholder state until actual URL is provided

/**
 * Primary navigation. Mirrors the brief:
 *   CyberScope · Product · Architecture · Documentation · Security   [Download]
 * "Product" expands into Download / Releases / Updates.
 */
export const NAV_ITEMS: NavLink[] = [
  {
    label: "Product",
    children: [
      {
        label: "Download",
        route: "download",
        description: "Get the desktop application for your platform",
      },
      {
        label: "Releases",
        route: "releases",
        description: "Release archive and changelog history",
      },
      {
        label: "Updates",
        route: "updates",
        description: "How the offline update model works",
      },
    ],
  },
  { label: "Architecture", route: "architecture" },
  { label: "Documentation", route: "docs" },
  { label: "Security", route: "security" },
];

/** Secondary destinations surfaced in the footer / mobile menu. */
export const SECONDARY_NAV: { label: string; route: RouteId }[] = [
  { label: "System Requirements", route: "system" },
  { label: "About", route: "about" },
  { label: "Contact & Support", route: "contact" },
];

export const ROUTE_META: Record<
  RouteId,
  { label: string; hash: string; title: string; description: string }
> = {
  home: {
    label: "Home",
    hash: "#/",
    title: "CyberScope — Offline Attack Path Reconstruction",
    description:
      "Reconstruct missing transitions in security telemetry without sending the investigation to a cloud analysis service.",
  },
  download: {
    label: "Download",
    hash: "#/download",
    title: "Download CyberScope",
    description:
      "Run attack-path reconstruction locally. Choose your operating system and architecture.",
  },
  releases: {
    label: "Releases",
    hash: "#/releases",
    title: "Releases",
    description:
      "CyberScope release archive — versions, supported platforms, changes, and checksums.",
  },
  updates: {
    label: "Updates",
    hash: "#/updates",
    title: "Updates",
    description:
      "The CyberScope offline update model — local knowledge, signed update packages, and verification.",
  },
  architecture: {
    label: "Architecture",
    hash: "#/architecture",
    title: "Architecture",
    description:
      "The CyberScope technical stack — Tauri, React, local FastAPI, Python reconstruction engine, and NetworkX graph engine.",
  },
  docs: {
    label: "Documentation",
    hash: "#/docs",
    title: "Documentation",
    description:
      "CyberScope documentation — installation, the attack graph, reconstruction gaps, candidate generation, and evidence verification.",
  },
  security: {
    label: "Security",
    hash: "#/security",
    title: "Security",
    description:
      "CyberScope security design — local processing, data handling, offline operation, packaging, update integrity, and threat model.",
  },
  system: {
    label: "System Requirements",
    hash: "#/system",
    title: "System Requirements",
    description:
      "Operating system, CPU architecture, memory, disk, and network requirements for CyberScope.",
  },
  about: {
    label: "About",
    hash: "#/about",
    title: "About CyberScope",
    description:
      "Why CyberScope exists — the problem being addressed and the engineering philosophy behind it.",
  },
  contact: {
    label: "Contact & Support",
    hash: "#/contact",
    title: "Contact & Support",
    description:
      "How to reach the CyberScope team for support, security disclosures, and partnership.",
  },
};

export const SIX_GAP_SIGNALS = [
  {
    key: "technique-transition",
    label: "Technique Transition",
    description:
      "A jump between two observed techniques with no plausible intermediate step in the attack graph.",
  },
  {
    key: "behavioral-prerequisite",
    label: "Behavioral Prerequisite",
    description:
      "A required precursor behavior is absent from the observed telemetry.",
  },
  {
    key: "host-consistency",
    label: "Host Consistency",
    description:
      "Activity implies a host that is never observed as a source or destination.",
  },
  {
    key: "user-consistency",
    label: "User Consistency",
    description:
      "A user context is implied by the transition but missing from the event record.",
  },
  {
    key: "process-consistency",
    label: "Process Consistency",
    description:
      "A parent/child or spawning process relationship is required but not present.",
  },
  {
    key: "temporal-consistency",
    label: "Temporal Consistency",
    description:
      "The temporal ordering between events is impossible or implies a missing intermediate event.",
  },
] as const;
