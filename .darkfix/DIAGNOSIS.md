# Dark Mode Diagnosis

## Current Palette
- **Gray scale in use:** Mixed `gray` (209 occurrences) and `slate` (169 occurrences) — both have blue undertones
- **Neutral scale:** 0 occurrences of `bg-neutral-*` anywhere in the codebase
- **Dark mode tokens (tokens.css):** Navy/blue-tinted values:
  - `--color-background: #1A1A2E` (navy blue)
  - `--color-surface: #1E1E35` (navy blue)
  - `--color-surface-hover: #27273F` (navy blue)
  - `--color-surface-active: #32324A` (navy blue)

## CSS Variable Strategy
- **Strategy A is in place:** CSS custom properties defined in `src/styles/tokens.css`
- Light mode: `:root.light, :root:not(.dark)` block
- Dark mode: `html.dark, :root.dark` block
- `tailwind.config.js` references via `var(--color-*)` with semantic names (bg-surface, text-text-primary, etc.)
- `globals.css` maps tokens to shadcn-compatible variables (--background, --foreground, etc.)
- Body uses `@apply bg-background text-text-primary` — token-driven

## Blue Tint Confirmation
- **YES — confirmed.** All dark mode background tokens use navy/blue-purple hex values
- `dark:bg-gray-*`: 159 occurrences (gray has cool/blue undertone)
- `dark:bg-slate-*`: 109 occurrences (slate is even more blue-shifted)
- `dark:bg-neutral-*`: 0 occurrences

## Violation Counts
- **Total .tsx files:** 538 (421 components + 117 pages)
- **Files WITH dark: classes:** 188 (44.7%)
- **Files WITHOUT dark: classes:** 233 (55.3%)
- **bg-white without dark:bg-* counterpart:** ~99 instances
- **bg-gray-* without dark: counterpart:** ~37 instances
- **bg-slate-* without dark: counterpart:** ~30 instances
- **Existing dark:bg-gray-* (blue-tinted):** 159 — need swap to neutral
- **Existing dark:bg-slate-* (blue-tinted):** 109 — need swap to neutral

## UI Primitives
- 25 files in `src/components/ui/`
- Most use semantic tokens (auto-fix via Phase 1)
- Badge.tsx has `dark:bg-gray-800/50` needing neutral swap

## Conclusion
- **Root cause 1:** Dark mode CSS variables are navy/blue, not neutral
- **Root cause 2:** 55% of components have zero dark: overrides
- **Fix strategy:** Strategy A — change token values + sweep components
- **Estimated manual work:** ~182 files (under 200 threshold)
