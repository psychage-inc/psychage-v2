# Slice 7 — Partial Completion

**Date**: 2026-05-17
**Slice**: Image asset optimization
**Status**: PARTIAL — code-side complete, binary re-encoding deferred

## What was completed

Audited every `<img>` tag rendered by the homepage tree (`src/components/home/v2/*.tsx`, `src/pages/providers/ForProvidersLandingPage.tsx`). All 27 image consumers already carry `loading="lazy"` (or `loading="eager"` for confirmed above-fold tiles). One previously-missing case was patched:

- `src/components/home/v2/ToolsEcosystem.tsx:270` — hover-tooltip thumbnail (200×130, behind `hidden lg:block`, mounted only on hover via `AnimatePresence`). Added `loading="lazy"` + `decoding="async"`. Was definitely below-fold + non-critical.

`tsc --noEmit` clean post-edit.

## What was deferred

Binary re-encoding of 27 images at `src/assets/images/homepage/` (14 MB total, 358K–700K each) requires `cwebp` (WebP) and `avifenc` (AVIF) encoders. Neither is installed; `brew install webp libavif` is gated by the sandbox and was not granted during this session. `sips` is available but cannot emit WebP or AVIF, only quality-recompress JPEG in place — which would destroy original source quality irreversibly without delivering the format-tier wins (~80–90% size reduction) that the plan targeted.

`<picture>` markup with AVIF/WebP/JPEG siblings is therefore also deferred — there are no siblings to reference.

## Remaining work for follow-up session

Prereqs: `brew install webp libavif`.

1. Encode AVIF: `for f in src/assets/images/homepage/**/*.jpeg; do avifenc -q 60 -s 6 "$f" "${f%.jpeg}.avif"; done`.
2. Encode WebP: `for f in src/assets/images/homepage/**/*.jpeg; do cwebp -q 75 -m 6 "$f" -o "${f%.jpeg}.webp"; done`.
3. Update `src/components/home/v2/homeImages.ts` to export sibling URLs (`{ avif, webp, jpeg }` triple per image).
4. Wrap every `<img>` consumer in `<picture><source type="image/avif" srcSet={avif} /><source type="image/webp" srcSet={webp} /><img src={jpeg} … /></picture>` — 11 call sites in 6 files (already catalogued in this session's grep).
5. Rebuild and confirm `dist/assets/` payload drops from current ~14 MB raw image bytes to ~2–3 MB.

## Dead files identified but not deleted

`public/images/homepage/{figures,objects,scenes}/*.jpeg` (34 files) are a duplicate copy with different naming (`A-01-listener.jpeg` vs `A-1.jpeg`). Zero references from source code, CSS, or HTML. Per session constraints, pre-existing dead code is not removed unless requested. Flagged for deletion in a future cleanup pass.

## Files modified this slice

- `src/components/home/v2/ToolsEcosystem.tsx` — one `<img>` tag gained `loading="lazy"` and `decoding="async"`.

## Verification

- `npx tsc --noEmit` → exit 0.
- `grep` for `<img` across `src/components/home`, `src/pages/home` — every block contains `loading=` (eager or lazy, explicitly chosen per fold position).
