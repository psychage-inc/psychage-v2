/**
 * System-A clay-poster prompt assembler.
 * Master template + 8 category palettes copied verbatim from the task spec.
 * CLI:  tsx build-prompt.ts <prodid> [<prodid> ...]   → prints assembled prompt(s)
 */
import { readManifest, type Entry } from './lib.ts';

export interface Palette {
  bg: string; ground: string; figure: string;
  accent1: string; accent2: string; accent3: string; shadowHex: string;
  bgDesc: string; groundDesc: string;
  accentDesc1: string; accentDesc2: string; accentDesc3: string;
  shadowDesc: string; atmos: string;
}

// Keyed by category code. Never mix palettes across codes.
export const CAT: Record<string, Palette> = {
  CAT08: { bg:"#2A1800", ground:"#1A0F00", figure:"#FDF0E0", accent1:"#E0832A", accent2:"#FAC775", accent3:"#F5D090", shadowHex:"#100800",
    bgDesc:"deep warm amber-brown", groundDesc:"dark walnut", accentDesc1:"warm orange-amber", accentDesc2:"golden amber", accentDesc3:"pale gold", shadowDesc:"deep warm shadow",
    atmos:"Energetic but grounded. Change is possible and the science is on your side. The scene communicates the real mechanics of behavior — not motivational, not punishing. Just clear, honest, and doable." },
  CAT15: { bg:"#1E1030", ground:"#140A20", figure:"#EDE8F8", accent1:"#8A65C0", accent2:"#AE8EE5", accent3:"#D0BEF0", shadowHex:"#0C0614",
    bgDesc:"deep purple-indigo", groundDesc:"dark purple", accentDesc1:"warm violet", accentDesc2:"soft lavender-violet", accentDesc3:"pale lilac", shadowDesc:"deep purple shadow",
    atmos:"Honest about the pain of loneliness without being hopeless about it. Connection is possible and the science points the way. The scene holds both the weight of isolation and the genuine warmth of what connection can feel like." },
  CAT16: { bg:"#16242C", ground:"#0D161B", figure:"#EAF0F2", accent1:"#4E7888", accent2:"#86B2C0", accent3:"#C2DCE2", shadowHex:"#070E12",
    bgDesc:"deep cool slate-teal", groundDesc:"dark slate", accentDesc1:"muted steel-teal", accentDesc2:"soft slate-cyan", accentDesc3:"pale aqua-grey", shadowDesc:"deep slate shadow",
    atmos:"Clear, calm, and non-stigmatizing. Psychosis and schizophrenia are real, treatable changes in how the brain processes perception and reality — never danger, never a character flaw, never something to fear. The scene communicates steadiness, dignity, and clarity emerging gently — never menacing, never chaotic, never frightening." },
  CAT17: { bg:"#241C12", ground:"#161007", figure:"#F4ECDC", accent1:"#C9A24E", accent2:"#E0C690", accent3:"#F2E4C4", shadowHex:"#0E0A04",
    bgDesc:"deep warm gold-taupe", groundDesc:"dark warm umber", accentDesc1:"soft muted gold", accentDesc2:"warm sand", accentDesc3:"pale cream", shadowDesc:"deep warm shadow",
    atmos:"Warm, dignified, and contemplative. Late life carries accumulated meaning, memory, and the real challenges of aging — held with respect, never pity. A gentle golden light, the depth of long experience." },
  CAT18: { bg:"#26141E", ground:"#180A12", figure:"#F6ECF0", accent1:"#B05872", accent2:"#D88EA2", accent3:"#F0C4D2", shadowHex:"#100610",
    bgDesc:"deep warm plum-rose", groundDesc:"dark plum", accentDesc1:"muted rose", accentDesc2:"soft mauve-pink", accentDesc3:"pale blush", shadowDesc:"deep plum shadow",
    atmos:"Warm, dignified, and honest. Women's mental health spans reproductive, hormonal, relational, and trauma-related experiences taken seriously and held with care — strength and tenderness together, never fragile, never saccharine, never cliché. Difficult topics held gently, without graphic depiction." },
  CAT29: { bg:"#0C2420", ground:"#06150F", figure:"#E8F2EC", accent1:"#3E9C7E", accent2:"#7AC8A8", accent3:"#BCE4D0", shadowHex:"#04100A",
    bgDesc:"deep ecological teal-green", groundDesc:"dark forest-teal", accentDesc1:"living sea-green", accentDesc2:"soft aqua-green", accentDesc3:"pale mint-aqua", shadowDesc:"deep eco shadow",
    atmos:"Grounded, honest, and quietly steady. The relationship between mind and planet is real. The scene holds ecological awareness without doom or denial." },
  CAT30: { bg:"#221E1A", ground:"#15120F", figure:"#F2EEE8", accent1:"#C77B52", accent2:"#E0A07E", accent3:"#F2D2BC", shadowHex:"#0C0A08",
    bgDesc:"deep warm graphite-taupe", groundDesc:"dark charcoal-brown", accentDesc1:"warm terracotta-coral", accentDesc2:"soft coral", accentDesc3:"pale peach", shadowDesc:"deep warm shadow",
    atmos:"Practical, clear, and empowering. Applied psychology — building a better life through skills, habits, and intentional self-design. Capability and forward momentum: a person actively shaping their own life, grounded and clear-headed. Constructive and warm, never abstract or cold." },
  CAT31: { bg:"#1A0A2A", ground:"#100618", figure:"#F5F0FF", accent1:"#8060C8", accent2:"#B090E8", accent3:"#D8C8F8", shadowHex:"#0A0310",
    bgDesc:"deep warm purple-indigo", groundDesc:"dark deep purple", accentDesc1:"warm violet-purple", accentDesc2:"soft lavender-purple", accentDesc3:"pale soft lilac", shadowDesc:"deep purple shadow",
    atmos:"Expansive, non-dogmatic, and genuinely open. Spirituality, meaning, and purpose are among the most powerful protective factors available, regardless of tradition. The scene holds the depth of these questions with respect, without prescribing any particular answer." },
};

export function assemblePrompt(e: Pick<Entry,
  'code' | 'headline' | 'subtitle' | 'figureLine' | 'sceneLine'>, safe = false): string {
  const p = CAT[e.code];
  if (!p) throw new Error(`No palette for code ${e.code}`);
  // Safe brand anchor: avoids the descriptive clause that occasionally gets baked
  // into the image, and forbids any other words (cuts duplicated-headline glitches).
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
  for (const prodid of argv) {
    const e = m.entries[prodid];
    if (!e) { console.error(`!! no manifest entry for ${prodid}`); continue; }
    if (!e.figureLine || !e.sceneLine) { console.error(`!! ${prodid} not authored yet`); continue; }
    process.stdout.write(`===PROMPT ${prodid}===\n`);
    process.stdout.write(assemblePrompt(e, safe));
    process.stdout.write(`\n===END ${prodid}===\n`);
  }
}
