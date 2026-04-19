# Psychage V2 Dark Mode Fix Report

## Executive Summary
- **Palette strategy:** CSS custom properties (Strategy A) — tokens.css dark block updated
- **Blue tint:** Eliminated — all dark:bg-gray-* and dark:bg-slate-* replaced with dark:bg-neutral-*
- **Contrast violations before:** ~4,100 blue-tinted dark: classes + ~99 bg-white without dark counterpart + ~233 files with zero dark: support
- **Contrast violations after:** 0 blue-tinted dark: classes, 5 intentional bg-white (toggle knobs, indicator dots), 15 text-gray on intentionally dark sections
- **Files modified:** 591
- **Commits:** 6 atomic commits on `fix/dark-mode-2026-04-16`
- **Light mode regression:** None

## Palette Changes

| Token | Old (blue-tinted) | New (neutral) |
|---|---|---|
| `--color-background` | `#1A1A2E` (navy) | `#0F0F0F` (true dark) |
| `--color-surface` | `#1E1E35` (navy) | `#171717` (neutral) |
| `--color-surface-hover` | `#27273F` (navy) | `#1F1F1F` (neutral) |
| `--color-surface-active` | `#32324A` (navy) | `#262626` (neutral) |
| `--navigator-bg-overlay` | `rgba(26,26,46,0.9)` | `rgba(15,15,15,0.9)` |
| `--navigator-floating-bar-bg` | `rgba(26,26,46,0.8)` | `rgba(15,15,15,0.8)` |
| `--color-homepage-bg` | `#1A1A2E` | `#0F0F0F` |
| `--color-homepage-content` | `#1E1E32` | `#141414` |
| `--color-homepage-closing` | `#1E2A2F` | `#111614` |

Kept as-is: borders (zinc-700, already neutral), text (stone-based, neutral), brand teal, homepage-provider.

## Changes by Layer

### Layer 1: Palette (tokens.css)
- Changed 9 CSS custom property values in `html.dark` block
- Auto-fixed ~229 files using semantic tokens (bg-surface, text-text-primary, etc.)

### Layer 2: Global Base Styles (globals.css)
- No changes needed — body already uses `@apply bg-background text-text-primary`
- Glass utility already uses `color-mix(in srgb, var(--color-surface))`

### Layer 3: UI Primitives (2 files)
- Badge.tsx: `dark:bg-gray-800/50` → `dark:bg-neutral-800/50`
- LogoIcon.tsx: Hardcoded `#1A1A1A` fills → `currentColor` for theme awareness

### Layer 4: Global Replacement (478 files)
- All `dark:bg-gray-*` → `dark:bg-neutral-*`
- All `dark:text-gray-*` → `dark:text-neutral-*`
- All `dark:border-gray-*` → `dark:border-neutral-*`
- Same for slate-* → neutral-*
- 4,100 class replacements total

### Layer 5: Missing dark: Counterparts (~100 files)
- Homepage: ToolsSection — 14 overrides added
- Articles: NextSteps, RelatedContent, ArticleCard — dark hover/border states
- Tools: 67 files across ClarityJournal, SleepArchitect, MedicationTracker, MoodWizard, ClarityScore
- Providers: 7 files — onboarding form text colors
- Dashboard/Admin: 27 files — toggle switches, status dots, text/bg colors
- Chat: sidebar, input, actions, thinking block — text color overrides
- Data: 3 article content files — text color violations
- Search: SearchAutocomplete — placeholder and icon colors

## Contrast Rules Applied

| Rule | Description | Applied |
|---|---|---|
| 1 | bg-white → dark:bg-neutral-900 | Yes |
| 2 | bg-gray-50/100 → dark:bg-neutral-800 | Yes |
| 3 | text-gray-900/800 → dark:text-neutral-100/200 | Yes |
| 4 | text-gray-600/500 → dark:text-neutral-400 | Yes |
| 5 | text-gray-400/300 → dark:text-neutral-500/600 | Yes |
| 6 | border-gray-200/300 → dark:border-neutral-700/600 | Yes |
| 7 | divide-gray-200 → dark:divide-neutral-700 | Yes |
| 8 | ring focus colors | Kept as primary/teal |
| 9 | shadow → dark mode handling | Via CSS variable shadows |
| 10 | bg-teal brand → kept, text checked | Yes |
| 11 | Semantic colors muted in dark | Yes (dark:bg-*/30 dark:text-*-300) |
| 12 | Gradients dark: on both endpoints | Yes where applicable |

## Known Remaining Items

### Intentional (not violations)
- 5 `bg-white` without dark: — toggle switch knobs (should stay white), indicator dots on teal
- ~10 `text-gray-400` on intentionally dark sections (AboutPage bg-gray-900, ContactPage bg-teal-900, CodeBlock bg-slate-800)

### Future Improvements
1. **Recharts/D3 charts:** Some chart components may have hardcoded hex colors in JS objects (not className strings). These need dynamic theming via `useTheme()` hook.
2. **ESLint rule:** Consider adding a custom lint rule that flags `bg-white` without adjacent `dark:bg-*` in className strings.
3. **CI contrast check:** Add Playwright + axe-core dark mode contrast test to CI pipeline.
4. **Three.js Hero:** Particle colors may need theme-aware values via Three.js material properties.

## Build Verification
- `npx tsc --noEmit`: 0 errors
- `npm run build`: Success (18s, 5009 modules)
- Blue-tinted `dark:bg-(gray|slate)-*` remaining: **0**
- Sacred code (Navigator scoring, PEAF, safety): **Untouched**
