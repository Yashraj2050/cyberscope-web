/**
 * CyberScope shared domain types.
 *
 * These types model the *product website* (distribution + documentation),
 * not the analysis application itself.
 */

export type RouteId =
  | "home"
  | "download"
  | "releases"
  | "updates"
  | "architecture"
  | "docs"
  | "security"
  | "system"
  | "about"
  | "contact";

export type Platform = "windows" | "macos" | "linux";
export type Architecture = "x64" | "arm64";
export type PackageType =
  | "msi"
  | "exe"
  | "dmg"
  | "pkg"
  | "appimage"
  | "deb"
  | "tarball";

export type ReleaseStatus = "stable" | "beta" | "planned";

export interface ReleaseArtifact {
  platform: Platform;
  architecture: Architecture;
  packageType: PackageType;
  /** Placeholder until a real release backend is connected. */
  downloadUrl: string;
  /** SHA-256 of the package. Placeholder value for preview artifacts. */
  checksum: string;
  /** Human-readable file size. */
  size: string;
}

export interface Release {
  version: string;
  releaseDate: string; // ISO date
  status: ReleaseStatus;
  tagline: string;
  artifacts: ReleaseArtifact[];
  highlights: string[];
  changes: string[];
  fixes: string[];
  security: string[];
  notes: string;
}

export interface NavLink {
  label: string;
  route?: RouteId;
  children?: { label: string; route: RouteId; description?: string }[];
}

/* ---- Documentation content model ---- */

export type DocBlock =
  | { type: "p"; text: string }
  | { type: "h"; text: string }
  | { type: "code"; lang?: string; text: string }
  | { type: "list"; items: string[] }
  | { type: "callout"; tone: "info" | "warn"; title?: string; text: string };

export interface DocSection {
  id: string;
  title: string;
  blurb: string;
  blocks: DocBlock[];
}
