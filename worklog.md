# CyberScope — Official Website Build Worklog

This file is the single shared worklog for all agents working on the CyberScope
product website. Append-only. New sections start with `---`.

---
Task ID: 0
Agent: Lead Architect
Task: Produce information architecture, page hierarchy, component architecture, data model, routing structure, download/release architecture, design system, and responsive strategy for the CyberScope official website.

Work Log:
- Reviewed existing Next.js 16 + Tailwind 4 + shadcn/ui scaffold. Geist Sans + Geist Mono fonts already wired (`--font-geist-sans`, `--font-geist-mono`). `cn()` util present. shadcn Button/Badge/Card/etc. available.
- Confirmed hard constraint: only the `/` route in `src/app/page.tsx` is user-visible. Decided on a **hash-based client-side router** so all 10 product "pages" live on `/` as `#/download`, `#/architecture`, etc. This gives real navigation, back/forward, shareable links, and scroll-to-top behavior without extra Next routes.

Stage Summary — ARCHITECTURE DECISIONS:

## 1. Information Architecture
Top-level sections (mapped to hash routes):
- `#/`              Home
- `#/download`      Download (OS + arch selector, release cards)
- `#/releases`      Releases (release archive history)
- `#/updates`       Updates (offline update model)
- `#/architecture`  Architecture (technical stack + diagram)
- `#/docs`          Documentation (sidebar + content)
- `#/security`      Security (design principles, threat model, limitations)
- `#/system`        System Requirements
- `#/about`         About
- `#/contact`       Contact / Support

Navigation bar (compact):
  CyberScope · Product (dropdown: Download, Releases, Updates) · Architecture · Documentation · Security
  Right: Download button
  Mobile: hamburger → full menu.

## 2. Page Hierarchy (each page = a self-contained view component)
Home → Hero, StatusStrip, ProblemSection (Observed→GAP→Observed),
        WhatItDoes (pipeline), TrustBoundary (OBSERVED/INFERRED/UNKNOWN),
        ArchitecturePreview, DownloadCTA.
Download → PageHeader, PlatformSelector (OS + arch), ReleaseCards, ReleaseNotesDialog, ChecksumsDialog.
Releases → PageHeader, ReleaseList (ReleaseCard per version with changes/fixes/security/links).
Updates → PageHeader, UpdateModelDiagram, Explanation.
Architecture → PageHeader, LayeredDiagram, LayerDetail list, Six gap signals list.
Documentation → Sidebar nav (11 sections) + content area rendering selected doc.
Security → PageHeader, principle sections, threat model, security limitations.
System → PageHeader, two-column tables: install/update reqs vs analysis reqs (use "To be finalized" where unknown).
About → PageHeader, narrative sections (why, problem, philosophy).
Contact → PageHeader, minimal channels (no lead-gen form).

## 3. Component Architecture
src/
  app/
    layout.tsx          (SEO metadata, fonts, dark root)
    page.tsx            (ClientRouter host — the only Next route)
    globals.css         (design tokens, base)
    sitemap.ts / robots.ts
  components/
    layout/
      Navbar.tsx
      Footer.tsx
      SiteShell.tsx     (min-h-screen flex flex-col + sticky footer wrapper)
    router/
      ClientRouter.tsx  (hash router + scroll-to-top)
      RouterLink.tsx
    primitives/
      Section.tsx       (consistent vertical rhythm wrapper)
      SectionHeader.tsx (eyebrow mono label + title + supporting line)
      Eyebrow.tsx       (mono uppercase label w/ leading bar)
      MonoLabel.tsx
      EvidenceBadge.tsx (OBSERVED/INFERRED/UNKNOWN semantic coloring)
      Arrow.tsx         (down/right connector for pipelines/diagrams)
      Pipeline.tsx      (horizontal stage flow)
      GapIllustration.tsx (Observed→GAP→Observed)
      PageHeader.tsx    (inner-page hero header)
      Stat.tsx
      Kbd.tsx
      CodeBlock.tsx
    home/
      Hero.tsx
      StatusStrip.tsx
      ProblemSection.tsx
      WhatItDoes.tsx
      TrustBoundary.tsx
      ArchPreview.tsx
      DownloadCTA.tsx
    download/
      DownloadView.tsx
      PlatformSelector.tsx
      ReleaseCard.tsx
    releases/
      ReleasesView.tsx
      ReleaseEntry.tsx
    updates/
      UpdatesView.tsx
    architecture/
      ArchitectureView.tsx
      ArchitectureDiagram.tsx
    docs/
      DocsView.tsx
      DocsSidebar.tsx
      docContent.ts
    security/
      SecurityView.tsx
    system/
      SystemView.tsx
    about/
      AboutView.tsx
    contact/
      ContactView.tsx
  lib/
    types.ts            (Release, Platform, Arch, DocSection, etc.)
    router.ts           (useHashRoute hook, route list, helpers)
    constants.ts        (nav items, site meta)
  data/
    releases.ts         (Release[] mock metadata — clearly marked)
    docs.ts             (documentation tree + content)

## 4. Data Model
```ts
type Platform = 'windows' | 'macos' | 'linux';
type Architecture = 'x64' | 'arm64';
type PackageType = 'msi' | 'exe' | 'dmg' | 'pkg' | 'appimage' | 'deb' | 'tarball';

interface ReleaseArtifact {
  platform: Platform;
  architecture: Architecture;
  packageType: PackageType;
  downloadUrl: string;     // placeholder until real release backend
  checksum: string;        // SHA-256
  size: string;            // human readable
}

interface Release {
  version: string;         // semver e.g. "0.4.0"
  releaseDate: string;     // ISO
  status: 'stable' | 'beta' | 'planned';
  artifacts: ReleaseArtifact[];
  highlights: string[];
  changes: string[];
  fixes: string[];
  security: string[];
  notes: string;
}
```
Mock releases clearly flagged: a top-of-file `MOCK` banner + `status: 'beta'`/`'planned'` where appropriate. No fake "production" claims.

## 5. Routing Structure
Single Next route `/`. Client hash router in `ClientRouter.tsx`:
- reads `window.location.hash`
- maps to a view id
- renders the matching view
- on route change → `window.scrollTo(0,0)`
- RouterLink sets hash via `routerLink('/download')` helper → `#/download`
- listens to `hashchange`
Home is the default for empty hash.

## 6. Download / Release Architecture
- `data/releases.ts` is the single source of release metadata. No download URLs scattered in components.
- DownloadCard consumes `Release` + selected platform/arch → shows matching artifact.
- `downloadUrl` is a placeholder (`#` / `data:...`) until a real release backend is connected. The UI shows a "Preview build — not a public release" notice so we never imply the mock is real.
- A future `data/releaseSource.ts` (or API route) can swap mock → fetched metadata without touching UI. Documented in code comment.

## 7. Design System
Dark, premium, restrained. Dark-only (product is explicitly dark; no theme toggle).
Color tokens (set on :root directly so it's dark by default):
  --background      near-black navy   #0A0D12
  --surface-1       #0E131B  (subtle layer)
  --surface-2       #121A24  (card)
  --surface-3       #18212E  (elevated/hover)
  --border          rgba(255,255,255,0.08)
  --border-strong   rgba(255,255,255,0.14)
  --foreground      #E7EDF5
  --foreground-muted #9AA4B2
  --foreground-subtle #6B7585
  --accent          #3CC9E8  (restrained cyan) — used sparingly for CTAs/links/active
  --accent-strong   #5BD6F0
  --amber           #E8A33C  (gaps / warnings / UNKNOWN)
  --observed        #3FBA7A  (green — confirmed)
  --inferred        #3CC9E8  (cyan — deduced)
  --unknown         #E8A33C  (amber — uncertain) [shared with amber]
Radius: mostly `rounded-md` (0.375rem) and a few `rounded-lg`. Avoid heavy rounding. No pills everywhere.
Typography: Geist Sans for UI/headings; Geist Mono for technical labels, version strings, checksums, code, eyebrows. Strong hierarchy: page H1 ~ text-4xl/5xl tracking-tight, section H2 ~ text-2xl/3xl, body text-base/15px leading-relaxed, mono labels ~ text-[11px] uppercase tracking-[0.18em].
Motion: subtle only — fade/slide on section reveal (CSS, not heavy lib), button hover bg transitions, nav transitions. NO particles, NO parallax, NO continuous animation.
Spacing: generous. Section vertical padding `py-20 md:py-28`. Content max-width `max-w-6xl` with `px-6`. Tighter text columns `max-w-2xl/3xl`.

## 8. Responsive Strategy
Mobile-first. Container `max-w-6xl mx-auto px-6 lg:px-8`.
- Navbar: full on lg+, hamburger sheet on < lg.
- Home hero: stacked on mobile, large on desktop.
- Pipeline/diagrams: horizontal on md+, vertical stack on mobile.
- Download: platform selector wraps; release cards stack on mobile, 2-col on lg.
- Docs: sidebar collapses to a top select / accordion on mobile, sticky on lg.
- Tables (system reqs, releases): horizontal scroll on mobile, real table on lg.
- Footer: stacked on mobile, columns on desktop. Sticky to bottom via SiteShell flex column.

All interactive elements ≥44px touch target. Visible focus rings (accent). Semantic HTML, ARIA labels on icon buttons.

Next steps: Lead builds foundation (tokens, router, layout, primitives, data) + Home + Download as the visual reference, then dispatches parallel subagents for the remaining pages using the established primitives.

---
Task ID: 1
Agent: Lead Architect (implementation)
Task: Implement the full CyberScope website — design system, hash router, all 10 page views, SEO, and release data model.

Work Log:
- globals.css: dark-first design tokens (--background #0a0d12 navy/graphite, cs-surface layers, restrained cyan accent #3cc9e8, amber #e8a33c for gaps/UNKNOWN, observed green #3fba7a). Mono eyebrow, grid-bg, hairline-top, cs-reveal scroll-reveal utilities, refined scrollbar + focus rings. Reduced-motion safe.
- layout.tsx: Geist Sans + Geist Mono fonts, `dark` class on html, full SEO metadata (title/description/OG/twitter/robots), themeColor. opengraph-image.tsx renders a designed 1200x630 PNG via next/og. robots.ts + sitemap.ts (declares all hash routes).
- lib: types.ts (Release/ReleaseArtifact/Platform/Architecture/DocBlock/DocSection), constants.ts (NAV_ITEMS, ROUTE_META, SIX_GAP_SIGNALS, SITE), router.ts (useHashRoute with SSR-safe lazy initializer + hashchange subscription; parseHash/routerHref helpers).
- data: releases.ts (typed Release[] mock-preview data, clearly flagged, RELEASE_DATA_NOTICE; getLatestRelease()), docs.ts (11-section DocSection content, real technical copy).
- primitives: Reveal (IntersectionObserver, reduced-motion safe), CopyButton (clipboard + sonner toast), ui.tsx (Container, Section, Eyebrow, SectionHeader, MonoLabel, EvidenceBadge [OBSERVED/INFERRED/UNKNOWN], Arrow, Pipeline, PageHeader, CodeBlock, InfoRow, Stat, Kbd, RouterLink, StatusChip, LinkArrow).
- layout: SiteShell (min-h-screen flex-col + mt-auto sticky footer + skip link), Navbar (compact; Product dropdown w/ hover+focus reveal; mobile menu closed via go() handler not effect), Footer (brand + 3 link columns + status + preview notice).
- Views built (10): HomeView (Hero, ProblemSection w/ Observed→GAP→Observed illustration, WhatItDoes pipeline, TrustBoundary [UNKNOWN emphasized], ArchPreview, DownloadCTA), DownloadView (PlatformSelector OS+arch, derived effectiveArch, release panel, checksums Dialog, verify sidebar), ReleasesView (ReleaseEntry w/ highlights/changes/fixes/security/checksums), UpdatesView (offline update flow), ArchitectureView (layered diagram + properties + component table), DocsView (sidebar + block renderer + prev/next), SecurityView (8 sections + sticky TOC, no unsupported claims), SystemView (install vs analysis reqs, "To be finalized" where unknown), AboutView, ContactView (3 channels, no lead-gen form).
- page.tsx: 'use client' ClientRouter — useHashRoute, maps route→view, scroll-to-top + document.title effect.
- Lint: `bun run lint` passes clean (0 errors, 0 warnings) after fixing 3 set-state-in-effect lint errors idiomatically (lazy initializer in router, go() handler in Navbar, derived effectiveArch in DownloadView).
- Dev server: HTTP 200, compiles cleanly.

Stage Summary:
- Foundation + all 10 pages implemented on a single `/` route via hash router.
- Design language is restrained/premium: dark navy, cyan accent, amber for gaps, mono technical labels, generous whitespace, subtle scroll reveals only.
- Release metadata is a typed data layer (not scattered URLs); mock-preview artifacts clearly flagged.
- Next: Agent Browser end-to-end verification (rendering, navigation, platform selector, docs sidebar, checksums dialog, sticky footer, responsiveness).

---
Task ID: 2
Agent: Lead Architect (verification)
Task: End-to-end verification with Agent Browser + VLM, fix issues found.

Work Log:
- Agent Browser: opened /, confirmed correct title + zero console errors. All 10 hash routes render correct H1 content (home/download/releases/updates/architecture/docs/security/system/about/contact).
- Tested navigation: hero CTA → #/download; Product dropdown (click-open, hover+focus reveal, Escape close); mobile hamburger menu expands with all links; docs sidebar section switching (confirmed content swaps via eval).
- Download center: PlatformSelector Windows→macOS reveals X64/ARM64 arch toggle; ARM64 selected shows arm64 DMG; "View checksums" Dialog opens showing all 6 artifacts (msi/exe/dmg×2/appimage/deb) with sizes + copy buttons.
- Sticky footer: confirmed wrapper has `flex min-h-screen flex-col` + footer `mt-auto` (structurally correct; long pages push footer down naturally).
- SEO assets: favicon.svg 200 (image/svg+xml), opengraph-image 200 (97KB PNG), robots.txt 200, sitemap.xml 200.
- Fixed bugs found during verification:
  1. opengraph-image 500 → Satori "display:flex required on multi-child div". Rewrote OG image so every div has explicit display:flex. Now renders 200.
  2. robots.txt 500 → conflicting public/robots.txt vs app/robots.ts. Removed the stale public/robots.txt. Now 200.
  3. Product dropdown click-toggle conflict (mouseenter opens, click toggles closed). Changed onClick to setOpen(true) only; closing via mouseleave/blur/Escape.
  4. Lint: 3x react-hooks/set-state-in-effect → fixed idiomatically (router lazy initializer, Navbar go() handler closes mobile menu, DownloadView derived effectiveArch).
  5. Scroll-reveal "void": full-page static capture showed empty sections (below-fold Reveal at opacity:0, observers never fired). Rewrote Reveal so below-fold content shows immediately (no hiding) while above-fold keeps the subtle entrance. All setState now in observer callback (lint-clean). Verified: 21/21 reveals visible, no void.
- Lint: `bun run lint` passes clean (0 errors, 0 warnings).
- VLM (glm-5v) design review: "highly credible and professional... sophisticated dark-mode engineering aesthetic... similar to Grafana, Kibana, or specialized SecOps tools... precise terminology... looks like real software interfaces rather than generic stock illustrations... built for serious security engineers." Mobile: "usable and professional, readable, no horizontal overflow, touch-friendly."

Stage Summary:
- Site fully verified end-to-end. Compiles, lints clean, all routes render, all interactions work, SEO assets serve, responsive across desktop/tablet/mobile, and the visual language reads as professional security-engineering tooling — not an AI-generated landing page.
- Build complete.
