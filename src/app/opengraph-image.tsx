import { ImageResponse } from "next/og";

export const alt =
  "CyberScope — Offline Attack Path Reconstruction & Evidence Analysis";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0a0d12",
          backgroundImage:
            "radial-gradient(circle at 82% 18%, rgba(60,201,232,0.10), transparent 45%)",
          padding: "72px 80px",
          fontFamily: "sans-serif",
          color: "#e7edf5",
        }}
      >
        {/* Brand lockup */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "18px",
          }}
        >
          <svg width="46" height="46" viewBox="0 0 32 32">
            <rect width="32" height="32" rx="7" fill="#0e131b" />
            <circle
              cx="16"
              cy="16"
              r="9.5"
              fill="none"
              stroke="#3CC9E8"
              strokeWidth="1.3"
              opacity="0.4"
            />
            <circle
              cx="16"
              cy="16"
              r="5.2"
              fill="none"
              stroke="#3CC9E8"
              strokeWidth="1.5"
            />
            <circle cx="16" cy="16" r="1.7" fill="#3CC9E8" />
          </svg>
          <div
            style={{
              display: "flex",
              fontSize: "26px",
              letterSpacing: "0.04em",
              color: "#9aa4b2",
              fontFamily: "monospace",
            }}
          >
            CYBERSCOPE
          </div>
        </div>

        {/* Middle: headline + supporting */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              gap: "14px",
              fontFamily: "monospace",
              fontSize: "18px",
              color: "#3cc9e8",
              letterSpacing: "0.16em",
            }}
          >
            <div style={{ display: "flex" }}>LOCAL-FIRST</div>
            <div style={{ display: "flex", color: "#6b7585" }}>·</div>
            <div style={{ display: "flex" }}>OFFLINE ANALYSIS</div>
            <div style={{ display: "flex", color: "#6b7585" }}>·</div>
            <div style={{ display: "flex" }}>EVIDENCE-DRIVEN</div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "66px",
              fontWeight: 600,
              lineHeight: 1.06,
              letterSpacing: "-0.02em",
              color: "#e7edf5",
            }}
          >
            <div style={{ display: "flex" }}>Offline Attack Path</div>
            <div style={{ display: "flex" }}>Reconstruction</div>
            <div style={{ display: "flex", color: "#9aa4b2" }}>
              &amp; Evidence Analysis
            </div>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: "26px",
              color: "#9aa4b2",
              maxWidth: "880px",
              lineHeight: 1.35,
            }}
          >
            Reconstruct missing transitions in security telemetry — without
            sending the investigation to a cloud analysis service.
          </div>
        </div>

        {/* Bottom strip */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: "26px",
            fontFamily: "monospace",
            fontSize: "15px",
            color: "#6b7585",
            letterSpacing: "0.1em",
          }}
        >
          <div style={{ display: "flex" }}>
            OBSERVED · INFERRED · UNKNOWN
          </div>
          <div style={{ display: "flex" }}>cyberscope.dev</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
