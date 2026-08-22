import type { Release } from "@/lib/types";

/**
 * CyberScope release metadata.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  MOCK / PREVIEW DATA
 *  These artifacts are NOT a public release. Download URLs and SHA-256
 *  checksums are placeholders so the distribution UI can be built and
 *  validated before a real release backend is connected.
 *
 *  To wire real releases: replace the array returned by `getReleases()`
 *  (or swap this module for a fetched source) — the UI consumes only the
 *  `Release` type and never reads URLs directly.
 * ─────────────────────────────────────────────────────────────────────────
 */

export const RELEASE_DATA_SOURCE = "mock-preview" as const;
export const RELEASE_DATA_NOTICE =
  "Preview build — not a public release. Download links are placeholders.";

const PLACEHOLDER_URL = "#preview-build";

export const RELEASES: Release[] = [
  {
    version: "0.4.0",
    releaseDate: "2025-02-18",
    status: "beta",
    tagline: "Six gap signals, candidate scoring, and the evidence classifier.",
    artifacts: [
      {
        platform: "windows",
        architecture: "x64",
        packageType: "msi",
        downloadUrl: PLACEHOLDER_URL,
        checksum:
          "placeholder:0000000000000000000000000000000000000000000000000000000000000400",
        size: "84.6 MB",
      },
      {
        platform: "windows",
        architecture: "x64",
        packageType: "exe",
        downloadUrl: PLACEHOLDER_URL,
        checksum:
          "placeholder:0000000000000000000000000000000000000000000000000000000000000400",
        size: "82.1 MB",
      },
      {
        platform: "macos",
        architecture: "x64",
        packageType: "dmg",
        downloadUrl: PLACEHOLDER_URL,
        checksum:
          "placeholder:0000000000000000000000000000000000000000000000000000000000000400",
        size: "91.4 MB",
      },
      {
        platform: "macos",
        architecture: "arm64",
        packageType: "dmg",
        downloadUrl: PLACEHOLDER_URL,
        checksum:
          "placeholder:0000000000000000000000000000000000000000000000000000000000000400",
        size: "88.9 MB",
      },
      {
        platform: "linux",
        architecture: "x64",
        packageType: "appimage",
        downloadUrl: PLACEHOLDER_URL,
        checksum:
          "placeholder:0000000000000000000000000000000000000000000000000000000000000400",
        size: "96.2 MB",
      },
      {
        platform: "linux",
        architecture: "x64",
        packageType: "deb",
        downloadUrl: PLACEHOLDER_URL,
        checksum:
          "placeholder:0000000000000000000000000000000000000000000000000000000000000400",
        size: "78.8 MB",
      },
    ],
    highlights: [
      "All six gap signals implemented: technique transition, behavioral prerequisite, host, user, process, and temporal consistency.",
      "Candidate generation produces scored transitions for every detected gap.",
      "OBSERVED / INFERRED / UNKNOWN classifier applied across the reconstructed graph.",
      "Strict ground-truth isolation during evaluation — inferred candidates never leak into observed evidence.",
    ],
    changes: [
      "Added structured candidate scoring with configurable signal weights.",
      "NetworkX attack graph now annotates every edge with an evidence state.",
      "Evidence verification step gates which candidates are surfaced to the UI.",
      "Local FastAPI backend exposes a stable analysis surface to the Tauri shell.",
    ],
    fixes: [
      "Fixed graph re-build losing host context on partial telemetry reloads.",
      "Resolved timestamp normalization for cross-source event ordering.",
    ],
    security: [
      "Engine runs entirely offline; no outbound network calls during analysis.",
      "PyInstaller-packaged engine bundled into the desktop build.",
    ],
    notes:
      "First release with the full reconstruction pipeline (validation → graph → gaps → candidates → scoring → verification).",
  },
  {
    version: "0.3.2",
    releaseDate: "2025-01-22",
    status: "beta",
    tagline: "Graph engine refactor and gap-detection performance.",
    artifacts: [
      {
        platform: "windows",
        architecture: "x64",
        packageType: "msi",
        downloadUrl: PLACEHOLDER_URL,
        checksum:
          "placeholder:0000000000000000000000000000000000000000000000000000000000000320",
        size: "79.3 MB",
      },
      {
        platform: "macos",
        architecture: "arm64",
        packageType: "dmg",
        downloadUrl: PLACEHOLDER_URL,
        checksum:
          "placeholder:0000000000000000000000000000000000000000000000000000000000000320",
        size: "85.7 MB",
      },
      {
        platform: "linux",
        architecture: "x64",
        packageType: "appimage",
        downloadUrl: PLACEHOLDER_URL,
        checksum:
          "placeholder:0000000000000000000000000000000000000000000000000000000000000320",
        size: "92.0 MB",
      },
    ],
    highlights: [
      "Refactored NetworkX graph engine to a typed node/edge model.",
      "Gap detection runs in a single traversal instead of per-signal passes.",
    ],
    changes: [
      "Introduced CyberEvent identity hashing for deduplication.",
      "Reorganized the Python engine into discrete pipeline stages.",
    ],
    fixes: [
      "Corrected adjacency construction when multiple events share a timestamp.",
      "Fixed UI desync between graph selection and event detail panel.",
    ],
    security: [],
    notes:
      "Recommended upgrade for anyone on 0.3.x. Introduces the internal stage boundaries the scoring layer depends on.",
  },
  {
    version: "0.3.0",
    releaseDate: "2024-12-09",
    status: "beta",
    tagline: "Local FastAPI backend and Pydantic event validation.",
    artifacts: [
      {
        platform: "windows",
        architecture: "x64",
        packageType: "msi",
        downloadUrl: PLACEHOLDER_URL,
        checksum:
          "placeholder:0000000000000000000000000000000000000000000000000000000000000300",
        size: "76.9 MB",
      },
      {
        platform: "macos",
        architecture: "arm64",
        packageType: "dmg",
        downloadUrl: PLACEHOLDER_URL,
        checksum:
          "placeholder:0000000000000000000000000000000000000000000000000000000000000300",
        size: "83.1 MB",
      },
    ],
    highlights: [
      "Local FastAPI backend serves the analysis surface to the desktop UI.",
      "Pydantic-validated CyberEvent schema rejects malformed telemetry early.",
    ],
    changes: [
      "Added the first three gap signals: technique transition, host, and temporal consistency.",
      "Attack graph construction now accepts normalized CyberEvent streams.",
    ],
    fixes: [],
    security: ["Backend binds to the loopback interface only."],
    notes:
      "The first release that runs the reconstruction pipeline end-to-end on a local machine.",
  },
  {
    version: "0.2.0",
    releaseDate: "2024-10-30",
    status: "beta",
    tagline: "Initial Tauri + React shell with a packaged local engine.",
    artifacts: [
      {
        platform: "windows",
        architecture: "x64",
        packageType: "msi",
        downloadUrl: PLACEHOLDER_URL,
        checksum:
          "placeholder:0000000000000000000000000000000000000000000000000000000000000200",
        size: "71.4 MB",
      },
      {
        platform: "macos",
        architecture: "arm64",
        packageType: "dmg",
        downloadUrl: PLACEHOLDER_URL,
        checksum:
          "placeholder:0000000000000000000000000000000000000000000000000000000000000200",
        size: "77.6 MB",
      },
    ],
    highlights: [
      "Tauri desktop shell wrapping a React UI.",
      "Python analysis engine packaged with PyInstaller and embedded locally.",
    ],
    changes: [
      "Established the offline execution boundary — no runtime network calls.",
      "Added the empty-state graph view and event import flow.",
    ],
    fixes: [],
    security: [],
    notes:
      "Foundation release. Establishes the desktop architecture and the packaged local engine.",
  },
  {
    version: "0.5.0",
    releaseDate: "2025-04-10",
    status: "planned",
    tagline: "Candidate confidence intervals and exportable evidence reports.",
    artifacts: [],
    highlights: [
      "Candidate scoring will report confidence intervals, not only point scores.",
      "Planned: exportable, self-contained evidence reports.",
      "Planned: update package ingestion for reconstruction knowledge.",
    ],
    changes: [],
    fixes: [],
    security: [],
    notes:
      "Planned release. Dates and contents are indicative and subject to change.",
  },
];

/** Latest non-planned release — used by the Download page. */
export function getLatestRelease(): Release {
  const shipped = RELEASES.filter((r) => r.status !== "planned").sort((a, b) =>
    a.releaseDate < b.releaseDate ? 1 : -1
  );
  return shipped[0] ?? RELEASES[0];
}
