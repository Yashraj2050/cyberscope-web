import type { Release } from "@/lib/types";

/**
 * CyberScope release metadata.
 *
 * All verified binary packages are published and hosted directly on GitHub Releases:
 * https://github.com/Yashraj2050/cyberscope/releases/tag/v0.1.0
 */

export const RELEASE_DATA_SOURCE = "github-release" as const;
export const RELEASE_DATA_NOTICE =
  "SIH 2026 Prototype — Verified release binaries hosted via GitHub Releases.";

export const RELEASES: Release[] = [
  {
    version: "0.1.0",
    releaseDate: "2026-09-18",
    status: "stable",
    tagline: "SIH 2026 Prototype — Offline Attack Path Reconstruction & Evidence Analysis.",
    artifacts: [
      {
        platform: "windows",
        architecture: "x64",
        packageType: "exe",
        downloadUrl:
          "https://github.com/Yashraj2050/cyberscope/releases/download/v0.1.0/cyberscope_0.1.0_x64-setup.exe",
        checksum:
          "b0654a13a21bb49d8247e25e5ccfe1166992c782583650ed4d09bf4da2151cad",
        size: "56.7 MB",
      },
      {
        platform: "windows",
        architecture: "x64",
        packageType: "msi",
        downloadUrl:
          "https://github.com/Yashraj2050/cyberscope/releases/download/v0.1.0/cyberscope_0.1.0_x64_en-US.msi",
        checksum:
          "9a2cc19ddb914659733c773b11d79aaa1fc61c57110dee6c234665dfeb60a73b",
        size: "57.7 MB",
      },
      {
        platform: "macos",
        architecture: "arm64",
        packageType: "dmg",
        downloadUrl:
          "https://github.com/Yashraj2050/cyberscope/releases/download/v0.1.0/cyberscope_0.1.0_aarch64.dmg",
        checksum:
          "7df5206d7a6c9325b51cfaf062e281fd17008c094d07438dd5d82fe6d485ba50",
        size: "18.2 MB",
      },
    ],
    highlights: [
      "Offline-first causal attack graph reconstruction powered by NetworkX.",
      "Six-signal consistency checks: technique transitions, behavioral prerequisites, host, user, process hierarchy, and temporal consistency.",
      "Candidate hypothesis generation with structured, weighted evidence scoring.",
      "Evidence verification gating: OBSERVED, INFERRED, or UNKNOWN trust boundary.",
      "Deterministic verification safeguards ensuring air-gapped local execution without external network calls.",
    ],
    changes: [
      "Integrated desktop Tauri shell with packaged local Python backend.",
      "Added Investigation views: Overview, Timeline, Attack Graph, Telemetry, and Reports.",
      "Added top-level Evaluation benchmark dashboard and Settings views.",
      "Enforced strict loopback binding (127.0.0.1) for zero outbound network traffic during analysis.",
    ],
    fixes: [
      "Fixed top-level vertical scrolling for Evaluation and Settings screens.",
      "Resolved cross-process event ordering and timestamp normalization.",
    ],
    security: [
      "Core investigation runs entirely offline; no external network or cloud dependency.",
      "Local engine packaged and embedded directly within the native desktop bundle.",
    ],
    notes:
      "Official SIH 2026 Evaluation Prototype. Packaged for Windows (x64) and macOS (Apple Silicon). The downloaded application runs 100% locally and does not require internet connectivity.",
  },
  {
    version: "0.2.0",
    releaseDate: "2026-10-15",
    status: "planned",
    tagline: "Planned: macOS x64 Intel binary bundle, Linux package distributions, and batch evaluation exports.",
    artifacts: [],
    highlights: [
      "Universal macOS support including Intel x86_64 architecture.",
      "Linux AppImage and Debian package releases.",
      "Batch evaluation dataset exports for automated SOC benchmark pipelines.",
    ],
    changes: [],
    fixes: [],
    security: [],
    notes:
      "Planned release for extended platform distribution.",
  },
];

/** Latest non-planned release — used by the Download page. */
export function getLatestRelease(): Release {
  const shipped = RELEASES.filter((r) => r.status !== "planned").sort((a, b) =>
    a.releaseDate < b.releaseDate ? 1 : -1
  );
  return shipped[0] ?? RELEASES[0];
}
