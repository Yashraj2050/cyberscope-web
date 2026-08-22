import type { DocSection } from "@/lib/types";

/**
 * CyberScope documentation content.
 *
 * Structured so the Documentation view is fully data-driven.
 * Content is written for technical users (security engineers, SOC analysts,
 * hackathon judges) and stays accurate to the implemented prototype.
 */

export const DOC_SECTIONS: DocSection[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    blurb: "What CyberScope is, who it is for, and how it fits an investigation.",
    blocks: [
      {
        type: "p",
        text: "CyberScope is a local-first desktop application for reconstructing missing transitions in security telemetry. It takes a stream of observed events, builds an attack graph, finds the gaps between observed events, generates candidate transitions to fill those gaps, scores the candidates against available evidence, and verifies whether the evidence is sufficient to call any candidate real.",
      },
      {
        type: "p",
        text: "The output is a reconstructed attack graph where every edge carries one of three evidence states: OBSERVED, INFERRED, or UNKNOWN. The central design principle is explicit uncertainty — when the evidence cannot distinguish between competing explanations, CyberScope abstains rather than guessing.",
      },
      { type: "h", text: "Who it is for" },
      {
        type: "list",
        items: [
          "SOC analysts reconstructing an attack timeline from partial telemetry.",
          "Detection engineers validating whether a detection chain has observable coverage.",
          "Forensic reviewers who need a defensible, evidence-grounded narrative.",
        ],
      },
      { type: "h", text: "What CyberScope is not" },
      {
        type: "list",
        items: [
          "It is not a SIEM replacement and does not collect telemetry.",
          "It is not a cloud analysis service — all analysis runs on your machine.",
          "It does not assert ground truth. It classifies how well the evidence supports each transition.",
        ],
      },
    ],
  },
  {
    id: "installation",
    title: "Installation",
    blurb: "Installing the desktop application per platform.",
    blocks: [
      {
        type: "p",
        text: "CyberScope is distributed as a platform-native package. Download the package matching your operating system and CPU architecture from the Download page, then verify the SHA-256 checksum before installing.",
      },
      { type: "h", text: "Verify the checksum" },
      {
        type: "code",
        lang: "bash",
        text: "# macOS / Linux\nshasum -a 256 cyberscope-0.4.0-macos-arm64.dmg\n\n# Windows (PowerShell)\nGet-FileHash .\\cyberscope-0.4.0-windows-x64.msi -Algorithm SHA256",
      },
      {
        type: "callout",
        tone: "warn",
        title: "Preview builds",
        text: "Current artifacts are preview builds. Download links are placeholders until a real release backend is connected. Never disable operating-system verification prompts to install a preview build.",
      },
      { type: "h", text: "Platform notes" },
      {
        type: "list",
        items: [
          "Windows: use the MSI installer for per-machine install, or the EXE for per-user install.",
          "macOS: the DMG targets Apple Silicon (arm64) and Intel (x64) separately.",
          "Linux: an AppImage and a .deb are provided for x64.",
        ],
      },
    ],
  },
  {
    id: "running-cyberscope",
    title: "Running CyberScope",
    blurb: "Starting the desktop app and the local analysis engine.",
    blocks: [
      {
        type: "p",
        text: "Launching the desktop application starts two things: the Tauri/React UI, and a local FastAPI process that hosts the Python reconstruction engine. The UI communicates with the engine over the loopback interface only.",
      },
      { type: "h", text: "First launch" },
      {
        type: "list",
        items: [
          "Open CyberScope from your applications menu.",
          "Import a normalized CyberEvent stream (JSON).",
          "The engine validates the stream, builds the graph, and runs gap detection.",
          "Results render in the graph view with edge evidence states.",
        ],
      },
      {
        type: "callout",
        tone: "info",
        title: "No network required",
        text: "Analysis runs entirely offline. The local FastAPI backend binds to the loopback interface and makes no outbound calls during analysis.",
      },
    ],
  },
  {
    id: "attack-graph",
    title: "Understanding the Attack Graph",
    blurb: "How observed events become a directed graph of technique transitions.",
    blocks: [
      {
        type: "p",
        text: "CyberScope builds an attack graph from validated CyberEvents using NetworkX. Each node represents an observed event (anchored to a technique, host, user, process, and timestamp), and each directed edge represents a possible transition from one event to the next.",
      },
      {
        type: "p",
        text: "The graph is the substrate for every later stage. Gap detection walks the graph to find places where two observed events are adjacent but no plausible intermediate step exists between them.",
      },
      { type: "h", text: "Node identity" },
      {
        type: "p",
        text: "A node's identity is derived from a stable hash of its event fields. Two events with identical fields collapse to the same node, which lets CyberScope deduplicate across telemetry sources without losing provenance.",
      },
      { type: "h", text: "Edge evidence state" },
      {
        type: "p",
        text: "Every edge is annotated with an evidence state. Edges that correspond to directly observed consecutive events are OBSERVED. Edges introduced by candidate generation to fill a gap are INFERRED, and only after evidence verification. Edges for which verification fails remain UNKNOWN.",
      },
    ],
  },
  {
    id: "reconstruction-gaps",
    title: "Reconstruction Gaps",
    blurb: "The six gap signals that drive candidate generation.",
    blocks: [
      {
        type: "p",
        text: "A reconstruction gap is a place in the attack graph where two observed events are adjacent but the transition between them is implausible or incomplete. CyberScope detects gaps using six independent signals.",
      },
      {
        type: "list",
        items: [
          "Technique transition — a jump between two techniques with no plausible intermediate step.",
          "Behavioral prerequisite — a required precursor behavior is absent.",
          "Host consistency — activity implies a host that is never observed.",
          "User consistency — a user context is implied but missing from the record.",
          "Process consistency — a parent/child process relationship is required but absent.",
          "Temporal consistency — the temporal ordering is impossible or implies a missing intermediate event.",
        ],
      },
      {
        type: "p",
        text: "Each gap records which signals fired, the events on either side, and the constraints a candidate transition would have to satisfy to close the gap.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Gaps are not accusations",
        text: "A gap is a statement about the evidence, not about an attacker. It says: 'something is missing here'. What fills it is a separate, scored decision.",
      },
    ],
  },
  {
    id: "candidate-generation",
    title: "Candidate Generation",
    blurb: "Generating plausible transitions to fill detected gaps.",
    blocks: [
      {
        type: "p",
        text: "For every detected gap, CyberScope generates one or more candidate transitions that could plausibly connect the two observed events. A candidate is a proposed edge with a proposed intermediate event, plus the evidence it would require to be considered real.",
      },
      {
        type: "p",
        text: "Candidates are never added to the observed graph. They live in a separate candidate set and are scored independently, so the observed record stays pristine.",
      },
      { type: "h", text: "Scoring" },
      {
        type: "p",
        text: "Each candidate receives a structured score computed from the gap signals that produced it. Signal weights are configurable. The score expresses how well the available evidence supports this specific candidate — not how likely the attack was in general.",
      },
      {
        type: "callout",
        tone: "warn",
        title: "Strict ground-truth isolation",
        text: "Candidate generation and scoring are isolated from ground-truth labels during evaluation. Inferred candidates can never influence observed evidence or leak into the ground-truth set.",
      },
    ],
  },
  {
    id: "evidence-verification",
    title: "Evidence Verification",
    blurb: "Verifying whether available evidence is sufficient to accept a candidate.",
    blocks: [
      {
        type: "p",
        text: "After scoring, CyberScope verifies each candidate against the available evidence. Verification asks a strict question: does the evidence distinguish this candidate from its alternatives?",
      },
      {
        type: "p",
        text: "A candidate that is supported and whose alternatives are not becomes INFERRED. A candidate whose evidence cannot distinguish it from competing explanations stays UNKNOWN. This is the boundary between a defensible reconstruction and speculation.",
      },
      { type: "h", text: "What verification checks" },
      {
        type: "list",
        items: [
          "That the candidate's required evidence fields are present in the observed record.",
          "That the candidate is consistent with host, user, process, and temporal constraints.",
          "That no higher-scoring alternative is equally well supported (otherwise the result is UNKNOWN).",
        ],
      },
    ],
  },
  {
    id: "observed-inferred-unknown",
    title: "OBSERVED / INFERRED / UNKNOWN",
    blurb: "The trust boundary that governs the reconstructed graph.",
    blocks: [
      {
        type: "p",
        text: "Every edge in the reconstructed graph carries one of three evidence states. This is the central conceptual feature of CyberScope — the trust boundary between what was seen, what was deduced, and what remains uncertain.",
      },
      {
        type: "list",
        items: [
          "OBSERVED — the transition was directly present in the input telemetry.",
          "INFERRED — the transition was generated as a candidate and the evidence verifies it against alternatives.",
          "UNKNOWN — the evidence cannot distinguish between competing candidates, so CyberScope abstains.",
        ],
      },
      {
        type: "callout",
        tone: "info",
        title: "Abstention is a feature",
        text: "When the evidence cannot distinguish between competing explanations, CyberScope abstains. UNKNOWN is not a failure — it is an honest statement about the limit of the available evidence.",
      },
    ],
  },
  {
    id: "offline-operation",
    title: "Offline Operation",
    blurb: "Why analysis never leaves your machine.",
    blocks: [
      {
        type: "p",
        text: "CyberScope is designed to operate offline. The analysis engine is a Python process packaged with PyInstaller and embedded in the desktop build. A local FastAPI backend exposes the engine to the React/Tauri UI over the loopback interface.",
      },
      {
        type: "p",
        text: "During analysis there are no outbound network calls. Telemetry you import is processed on your machine and stays there. This is a deliberate trust boundary, not a configuration — the architecture is local-first by construction.",
      },
      {
        type: "callout",
        tone: "info",
        title: "Updates are separate",
        text: "The only network activity is for software and reconstruction-knowledge updates, which is a deliberate, user-initiated action. See Updates.",
      },
    ],
  },
  {
    id: "updates",
    title: "Updates",
    blurb: "The offline update model for software and knowledge.",
    blocks: [
      {
        type: "p",
        text: "CyberScope uses an offline update model. An update package can contain updated software components and updated reconstruction knowledge. The desktop application verifies the package against its expected checksum before applying it.",
      },
      {
        type: "p",
        text: "Updates are not automatic. The user initiates the download and the application verifies the package locally before installation. This keeps the offline trust boundary intact.",
      },
      {
        type: "callout",
        tone: "warn",
        title: "Planned",
        text: "Update package ingestion is part of the planned 0.5.0 release. Current builds do not yet apply update packages.",
      },
    ],
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    blurb: "Common issues and how to resolve them.",
    blocks: [
      { type: "h", text: "The local engine does not start" },
      {
        type: "list",
        items: [
          "Confirm no other process is using the loopback port the backend binds to.",
          "Restart the application — the engine is launched as a child process.",
          "Check that the packaged engine binary is present and not quarantined by your OS.",
        ],
      },
      { type: "h", text: "Imported events are rejected" },
      {
        type: "p",
        text: "CyberEvent validation is strict. Rejected events are reported with the field that failed validation. Normalize the source stream to the CyberEvent schema and re-import.",
      },
      { type: "h", text: "The graph shows only OBSERVED edges" },
      {
        type: "p",
        text: "If no gaps are detected, no candidates are generated. This is expected when the telemetry is complete for the techniques in scope. Confirm that the techniques in your data are within the engine's known technique space.",
      },
      { type: "h", text: "Reporting an issue" },
      {
        type: "p",
        text: "See Contact & Support for how to reach the team. Include the CyberScope version (shown in the app's About view) and a sanitized description of the input.",
      },
    ],
  },
];
