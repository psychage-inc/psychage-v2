/**
 * System-A palette derivation for category pictograms.
 * From a single accent hue, derive a cohesive dark-background clay palette:
 *   bg     = very dark, slightly desaturated version of the hue
 *   figure = warm off-white (fixed)
 *   a1/a2/a3 = hue at light / mid / pale steps
 *   shadow = near-black version of the hue
 * Each category keeps its own hue so all 28 stay visibly distinct.
 */

export interface Palette {
  bg: string;
  figure: string;
  a1: string; // light
  a2: string; // mid (close to the source hue)
  a3: string; // pale
  shadow: string;
}

export const FIGURE = '#F2EEE8';

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

export function derivePalette(hue: string): Palette {
  const [h, s] = rgbToHsl(...hexToRgb(hue));
  return {
    bg: hslToHex(h, Math.max(0.18, s * 0.45), 0.12), // dark, slightly desaturated
    figure: FIGURE,
    a1: hslToHex(h, Math.min(0.85, s * 1.05), 0.72), // light
    a2: hslToHex(h, s, 0.55), // mid (near source)
    a3: hslToHex(h, Math.min(0.7, s * 0.85), 0.85), // pale
    shadow: hslToHex(h, Math.max(0.25, s * 0.5), 0.06), // near-black
  };
}
