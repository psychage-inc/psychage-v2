/**
 * System-A clay-poster prompt assembler for the 960 re-titled batch.
 * Master template verbatim from the task spec; palette looked up by new_category
 * (paletteKey) from category_palettes.json — never by the stale prodid prefix.
 * CLI:  tsx build-prompt.ts <prodid> [<prodid> ...]   → prints assembled prompt(s)
 */
import { readManifest, readPalettes, type Entry, type Palette } from './lib.ts';

export function assemblePrompt(
  e: Pick<Entry, 'paletteKey' | 'headline' | 'subtitle' | 'figureLine' | 'sceneLine'>,
  palettes: Record<string, Palette>,
  safe = false
): string {
  const p = palettes[e.paletteKey];
  if (!p) throw new Error(`No palette for category "${e.paletteKey}"`);
  const brand = safe
    ? `BRAND ANCHOR:
In the very bottom-left corner, below the two lines of text, render only the single small word "Psychage" as a wordmark in muted white at low opacity. Do not render any other words, labels, sentences, captions, or instructions anywhere in the image. Render the headline exactly once and the subtitle exactly once — never duplicate or repeat any line of text.`
    : `BRAND ANCHOR:
In the very bottom-left corner, below the two lines of text, a small wordmark in muted white at low opacity: "Psychage" — subtle, not competing with the headline.`;
  return `A soft 3D clay illustration, matte finish, no glossy surfaces, no reflections, no transparency. Wide banner, 16:9 ratio, 1200 by 675 pixels.

COMPOSITION:
The scene is viewed from a slight elevated angle, looking gently downward. The figure or figures occupy the right-center to center of the frame, leaving the lower-left third clear for text. The key symbolic scene element occupies the upper or surrounding portion of the frame. Text occupies the lower-left third. This creates a balanced, editorial layout with clear breathing room throughout.

FIGURE:
${e.figureLine} The figure has absolutely no facial features, no hair, no clothing details, no skin color. It is genderless and raceless. Its form and posture alone communicate the emotion and meaning.

SCENE:
${e.sceneLine} The ground is flat, dark, and bare. A soft elliptical shadow sits beneath each figure, grounding the scene with subtle depth.

LIGHTING:
A single soft light source from the upper left, casting a gentle barely visible shadow to the lower right of the figure. The light is calm and intentional — reinforcing the mood without dramatizing it.

COLOR PALETTE:
- Background: ${p.bgDesc}, hex ${p.bg}
- Ground: ${p.groundDesc}, hex ${p.ground}
- Figure: pure smooth white clay, hex ${p.figure}
- Accent one: ${p.accentDesc1}, hex ${p.accent1}
- Accent two: ${p.accentDesc2}, hex ${p.accent2}
- Accent three: ${p.accentDesc3}, hex ${p.accent3}
- Shadow: ${p.shadowDesc}, hex ${p.shadowHex}

ATMOSPHERE:
${p.atmos}

TEXT:
In the lower-left area of the image, clean modern sans-serif typography, white, left-aligned, two lines:
Line 1: "${e.headline}" — large, bold weight, approximately 52pt, high contrast against the dark background.
Line 2: "${e.subtitle}" — smaller, light weight, approximately 22pt, slightly reduced opacity so it feels secondary to the headline.
Leave a clear margin of at least 48px from the left and bottom edges. The text must never overlap the figure or any key scene element.

${brand}

ABSOLUTE RULES:
No faces. No facial expressions. No skin color. No hair. No clothing. No photography. No gradients. No lens flare. No decorative borders. No icons. No symbols other than what is described above. No background elements other than what is described. The final image must feel like it belongs in a world-class mental health editorial publication — calm, human, honest, and universally understood by anyone on earth regardless of language, age, or culture.`;
}

// CLI: print assembled prompt(s) for the given prodid(s), wrapped with delimiters.
const argv = process.argv.slice(2);
if (argv.length > 0) {
  const safe = process.env.POSTER_SAFE === '1';
  const m = readManifest();
  const palettes = readPalettes();
  for (const prodid of argv) {
    const e = m.entries[prodid];
    if (!e) {
      console.error(`!! no manifest entry for ${prodid}`);
      continue;
    }
    if (!e.figureLine || !e.sceneLine) {
      console.error(`!! ${prodid} not authored yet`);
      continue;
    }
    process.stdout.write(`===PROMPT ${prodid}===\n`);
    process.stdout.write(assemblePrompt(e, palettes, safe));
    process.stdout.write(`\n===END ${prodid}===\n`);
  }
}
