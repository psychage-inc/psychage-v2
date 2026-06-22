#!/usr/bin/env tsx
/**
 * Assemble the Nano Banana Pro prompt for a category pictogram.
 *   tsx build-prompt.ts <slug> [<slug> ...]   # prints prompt(s), delimited
 *   tsx build-prompt.ts --all                 # prints all 28
 * Generation itself is interactive (Higgsfield MCP generate_image,
 * model nano_banana_pro, aspect_ratio 16:9, resolution 2k, count 1).
 */
import { CONCEPTS, conceptBySlug, type Concept } from './concepts.ts';
import { derivePalette } from './palette.ts';

export function buildPrompt(c: Concept): string {
  const p = derivePalette(c.hue);
  const sensitiveNote = c.sensitive
    ? '\nThis is a sensitive topic: keep the scene calm, dignified, non-graphic and non-stigmatizing — gentle and protective, never distressing.'
    : '';
  return `A soft 3D clay illustration, matte finish, no gloss, no reflections, no transparency. 16:9.

COMPOSITION: Straight-on, clean and bold. The figure is the large central hero in the upper portion, clearly enacting one idea understandable at a glance without words. One defining symbol supports it. Simple and instantly readable — a universal pictogram in clay.

FIGURE: ${c.figureLine} No facial features, no hair, no clothing, no skin color. Genderless and raceless. Posture alone communicates the meaning.

SCENE: ${c.sceneLine} Ground flat, dark, bare. Soft elliptical shadow beneath each figure.

LIGHTING: Single soft light from upper left, calm and intentional.

COLOR PALETTE: background ${p.bg}; figure off-white ${p.figure}; accents ${p.a1} (light) / ${p.a2} (mid) / ${p.a3} (pale); shadow ${p.shadow}.

ATMOSPHERE: ${c.atmosphere}${sensitiveNote}

TEXT: In the lower third, clean modern sans-serif, white, bold, centered, high-contrast: "${c.bakedName}". Maximum two lines, large and clearly legible. Below it, a small muted low-opacity "Psychage" wordmark.

ABSOLUTE RULES: No faces, no skin color, no hair, no clothing, no photography, no gradients, no decorative borders, no symbols other than the one described and the text. Must read instantly, without reading the words, to anyone on earth.`;
}

function main() {
  const argv = process.argv.slice(2);
  const targets =
    argv.length === 0 || argv[0] === '--all'
      ? CONCEPTS
      : argv.map((s) => {
          const c = conceptBySlug(s);
          if (!c) {
            console.error(`unknown slug: ${s}`);
            process.exit(1);
          }
          return c;
        });
  for (const c of targets) {
    console.log(`===== ${c.slug} =====`);
    console.log(buildPrompt(c));
    console.log();
  }
}

// Run only when invoked directly (not when imported).
if (import.meta.url === `file://${process.argv[1]}`) main();
