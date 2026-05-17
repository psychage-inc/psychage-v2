# Slice 7 — Completed (Follow-up resolved)

**Date**: 2026-05-17
**Slice**: Image asset optimization
**Status**: DONE — initial pass + follow-up encoding both landed

## Phase A — Initial pass (committed in 8e8c52a)

Audited every `<img>` tag rendered by the homepage tree (`src/components/home/v2/*.tsx`, `src/pages/providers/ForProvidersLandingPage.tsx`). All 27 image consumers carry `loading="lazy"` (or `loading="eager"` for confirmed above-fold). One previously-missing case patched:

- `src/components/home/v2/ToolsEcosystem.tsx` hover-tooltip thumbnail — added `loading="lazy"` + `decoding="async"`.

Binary re-encoding deferred because `brew install webp libavif` was sandbox-denied.

## Phase B — Follow-up (this commit)

User ran `brew install webp libavif` manually. Resumed deferred work:

1. **Encoded AVIF + WebP siblings for all 27 JPEGs** using cwebp 1.6.0 + avifenc 1.4.1:
   ```bash
   for f in $(find src/assets/images/homepage -type f -name "*.jpeg"); do
     cwebp -q 75 -m 6 -mt -quiet "$f" -o "${f%.jpeg}.webp"
     avifenc -q 60 -s 6 -j 4 "$f" "${f%.jpeg}.avif"
   done
   ```

   Result: 27 × `.avif` + 27 × `.webp` sibling files alongside originals.

2. **Refactored `src/components/home/v2/homeImages.ts`** — each FIGURES/OBJECTS/SCENES entry now an `ImageBundle = { avif, webp, jpeg }` triple. Exported `ImageBundle` type.

3. **Created `src/components/ui/Picture.tsx`** — wraps `<picture>` with `<source type="image/avif">` + `<source type="image/webp">` + `<img src={jpeg}>` fallback. Forwards standard img props (className, loading, decoding, alt, style, aria-hidden). Defaults to `loading="lazy"` + `decoding="async"`.

4. **Swapped all 11 `<img>` consumers** to `<Picture>`:
   - `src/components/home/v2/HeroSection.tsx` — 4 figures + 3 ambient objects (motion-wrapped)
   - `src/components/home/v2/ClosingSection.tsx` — 1 figure
   - `src/components/home/v2/NavigatorShowcase.tsx` — 1 scene + 2 motion-wrapped objects (converted motion.img → motion.div + Picture)
   - `src/components/home/v2/ProviderHighlight.tsx` — 1 scene
   - `src/components/home/v2/ToolsEcosystem.tsx` — 1 featured scene + 5 hover thumbnails (via tools.map)
   - `src/pages/providers/ForProvidersLandingPage.tsx` — 3 sites (hero scene, deep-dive images via DEEP_DIVES.map, closing figure) + 1 ambient object

5. **Updated `ToolsEcosystem.tsx` interfaces** — `FeaturedTool.image` and `CompactTool.image` retyped from `string` → `ImageBundle`.

## Size impact

| Format | Total | Per-image avg |
|--------|-------|---------------|
| JPEG (existing) | 14 MB | ~520 KB |
| WebP (new) | 480 KB | ~18 KB |
| AVIF (new) | 596 KB | ~22 KB |

Browsers negotiate the smallest supported format. AVIF-capable browsers (Chrome 85+, Firefox 93+, Safari 16+) get ~96% size reduction; WebP-capable older browsers get ~96% reduction too; JPEG remains as universal fallback.

## Verification

- `npx tsc --noEmit` → exit 0
- `pnpm run build` → 17.04s, clean. Vite emitted 27 × `.avif` + 27 × `.webp` + 27 × `.jpeg` chunks into `dist/assets/`.

## Still deferred (not in this slice)

- **`public/images/homepage/{figures,objects,scenes}/*.jpeg`** (34 files, ~14 MB duplicate copy with different naming). Zero references. Pre-existing dead — flagged for separate cleanup pass.
- **TOOL_VIGNETTES export** in homeImages.ts now carries triples but has no consumers. Left exported (matches pre-existing state).

## Files changed this follow-up

```
src/components/home/v2/homeImages.ts                    (rewritten — triple imports)
src/components/home/v2/HeroSection.tsx                  (img → Picture)
src/components/home/v2/ClosingSection.tsx               (img → Picture)
src/components/home/v2/NavigatorShowcase.tsx            (img → Picture + motion.img → motion.div+Picture)
src/components/home/v2/ProviderHighlight.tsx            (img → Picture)
src/components/home/v2/ToolsEcosystem.tsx               (img → Picture, image: string → ImageBundle)
src/pages/providers/ForProvidersLandingPage.tsx         (4 img → Picture)
src/components/ui/Picture.tsx                           (NEW — helper)
src/assets/images/homepage/figures/*.{avif,webp}        (16 NEW)
src/assets/images/homepage/objects/*.{avif,webp}        (24 NEW)
src/assets/images/homepage/scenes/*.{avif,webp}         (14 NEW)
```
