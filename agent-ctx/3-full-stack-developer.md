# Task ID 3 — Restrained Design-Token Sweep

## Scope
Migrated 13 component files from legacy `cs-*` token aliases to the new clean
design token vocabulary established in `src/app/globals.css`. className-only
changes; no layout, copy, or logic changes.

## Files edited
1. `src/components/layout/Navbar.tsx`
2. `src/components/layout/Footer.tsx`
3. `src/components/layout/SiteShell.tsx`
4. `src/components/download/PlatformSelector.tsx`
5. `src/components/download/DownloadView.tsx`
6. `src/components/releases/ReleaseEntry.tsx`
7. `src/components/updates/UpdatesView.tsx`
8. `src/components/architecture/ArchitectureView.tsx`
9. `src/components/system/SystemView.tsx`
10. `src/components/about/AboutView.tsx`
11. `src/components/security/SecurityView.tsx`
12. `src/components/docs/DocsView.tsx`
13. `src/components/contact/ContactView.tsx`

## Key transformations
- `bg-cs-surface-1`→`bg-surface`, `bg-cs-surface-2`→`bg-surface-elevated` (incl. /40, /50), `bg-cs-surface-3`→`bg-surface-hover` (incl. /80)
- `border-cs-border-strong`→`border-border-strong`
- `bg-cs-accent`→`bg-accent` (catches `bg-cs-accent-strong`→`bg-accent-strong` and hover variants)
- `text-cs-accent`→`text-accent` (catches `hover:text-cs-accent-strong`→`hover:text-accent-strong`)
- `text-cs-observed`→`text-success`, `bg-cs-observed`→`bg-success`
- `text-cs-unknown`→`text-warning`, `bg-cs-unknown`→`bg-warning`
- `text-foreground`→`text-fg` (incl. `text-foreground/90`→`text-fg/90`)
- Tinted icon-chip fills `border-cs-accent/30 bg-cs-accent/10` and `border-cs-unknown/30 bg-cs-unknown/10` → `border-border bg-surface-elevated` (icon color preserved)
- Tinted callout bgs `bg-cs-unknown/[0.05]`, `bg-cs-unknown/[0.06]`, `bg-cs-accent/[0.05]` → `bg-surface` (border keeps warning/accent tint)
- `rounded-xl`→`rounded-lg` (oversized rounding reduced)
- `shadow-2xl shadow-black/40`→`shadow-lg shadow-black/30` (Navbar dropdown)
- `bg-gradient-to-b from-white/20 to-white/5`→`bg-border-strong` (ArchitectureView DownConnector — solid line)
- Removed `cs-hairline-top` decorative gradient hairline in ContactView

## Lint
`bun run lint` passes clean (0 errors, 0 warnings).

## Notes for downstream agents
- `src/components/home/TrustBoundary.tsx` still has `text-foreground` — left
  untouched per Task 3 instructions ("Do NOT touch home/* (already done)").
  If a follow-up task wants to finish the sweep, that file needs one Edit.
- `src/components/ui/*` (shadcn defaults incl. sidebar.tsx, card.tsx) untouched.
- No new gradients/glows/blur effects introduced anywhere.
