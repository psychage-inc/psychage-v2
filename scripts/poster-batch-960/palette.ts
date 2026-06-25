/**
 * PALETTE DERIVATION — keyed by new_category, computed once per category.
 * Takes the category's DB `color` (hex C) and emits the 14 template fields.
 * HSL math mirrors scripts/category-posters/palette.ts; lightness/saturation
 * bands and the hue-word table come from the task spec verbatim.
 */
import type { Palette } from './lib.ts';

export const FIGURE = '#F2EEE8'; // fixed warm bone clay

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

function rgbToHex(r: number, g: number, b: number): string {
  const c = (n: number) =>
    Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0');
  return `#${c(r)}${c(g)}${c(b)}`.toUpperCase();
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  const d = max - min;
  if (d !== 0) {
    s = d / (1 - Math.abs(2 * l - 1));
    switch (max) {
      case r:
        h = ((g - b) / d) % 6;
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      default:
        h = (r - g) / d + 4;
    }
    h *= 60;
    if (h < 0) h += 360;
  }
  return [h, s, l];
}

function hslToHex(h: number, s: number, l: number): string {
  s = Math.max(0, Math.min(1, s));
  l = Math.max(0, Math.min(1, l));
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0;
  let g = 0;
  let b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  return rgbToHex((r + m) * 255, (g + m) * 255, (b + m) * 255);
}

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

// Hue-word table (spec): degrees → human color word.
function hueWord(h: number): string {
  if (h < 15) return 'red';
  if (h < 40) return 'amber';
  if (h < 65) return 'gold';
  if (h < 160) return 'green';
  if (h < 195) return 'teal';
  if (h < 250) return 'blue-indigo';
  if (h < 290) return 'violet';
  if (h < 340) return 'plum';
  return 'rose';
}

// One calm, non-diagnostic, hopeful-honest atmosphere sentence per category,
// keyed by the exact worklist new_category string.
export const ATMOS: Record<string, string> = {
  'Relationships & Social Health':
    'Warm and honest about connection — the bonds between people held as something that can be repaired, deepened, and trusted, never idealized.',
  'Anxiety, Stress & Overwhelm':
    'Calm and steadying — the felt weight of pressure acknowledged plainly while the scene breathes room back in, never alarming, never minimizing.',
  'Therapy & Treatment':
    'Clear, practical, and hopeful — change shown as a learnable, supported process grounded in real help rather than quick fixes.',
  'Workplace & Academic':
    'Focused and grounded — the demands of work and study held with balance and capability, ambition and rest kept in honest proportion.',
  'Life Transitions & Crises':
    'Steady and compassionate — moments of upheaval met with quiet resilience, the scene holding both loss and the genuine possibility of rebuilding.',
  'Trauma & PTSD':
    'Gentle, protective, and safe — recovery shown as steadiness slowly returning, never the event itself, never anything frightening or graphic.',
  'Depression & Mood':
    'Honest about heaviness without despair — a low, quiet mood held with warmth and the genuine sense that light returns gradually.',
  'Self-Esteem & Identity':
    'Affirming and grounded — a person coming into a clearer, kinder sense of self, dignity and worth shown as steady and earned.',
  'Global & Cultural Mental Health':
    'Open, respectful, and plural — wellbeing understood across many cultures and contexts, no single tradition centered above another.',
  'Children & Adolescents':
    'Tender and reassuring — young people shown as growing, supported, and safe, the scene protective and gently hopeful, never distressing.',
  'Eating & Body':
    'Compassionate and non-judgmental — the relationship with body and food held with care and steadiness, never shame, never anything graphic.',
  Neurodevelopmental:
    'Respectful and affirming — different minds shown as valid and capable, difference framed as natural variation rather than deficit.',
  'Sleep & Circadian Health':
    'Quiet, restful, and restorative — the return of calm rest shown softly, the scene unhurried and deeply settled.',
  'OCD & Related':
    'Calm and understanding — the pull of intrusive patterns acknowledged plainly while the scene stays steady, spacious, and reassuring.',
  'Substance Use & Addiction':
    'Compassionate and non-stigmatizing — recovery shown as steady forward movement and dignity regained, never shame, never the substance itself.',
};

/**
 * Derive the full 14-field template palette for a category from its DB color.
 * @param name  the new_category string (used to look up the atmos line)
 * @param color the category's DB hex color C
 */
export function deriveTemplatePalette(name: string, color: string): Palette {
  const [h, s] = rgbToHsl(...hexToRgb(color));
  const H = hueWord(h);
  const atmos =
    ATMOS[name] ||
    'Calm, honest, and quietly hopeful — the theme held with dignity and care, never alarming, never clinical.';
  return {
    bg: hslToHex(h, clamp(s, 0.35, 0.55), 0.145),
    ground: hslToHex(h, clamp(s, 0.35, 0.55), 0.08),
    figure: FIGURE,
    accent1: hslToHex(h, clamp(s, 0.55, 0.7), 0.485),
    accent2: hslToHex(h, clamp(s, 0.45, 0.6), 0.685),
    accent3: hslToHex(h, clamp(s, 0.35, 0.5), 0.85),
    shadowHex: hslToHex(h, s, 0.055),
    bgDesc: `deep ${H}`,
    groundDesc: `dark ${H}`,
    accentDesc1: `${H} accent`,
    accentDesc2: `soft light ${H}`,
    accentDesc3: `pale ${H}`,
    shadowDesc: `deep ${H} shadow`,
    atmos,
  };
}
