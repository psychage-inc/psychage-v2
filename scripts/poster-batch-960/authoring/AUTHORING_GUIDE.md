# Poster concept authoring guide (Psychage System-A clay posters)

You author art-direction concepts that drive AI-generated poster images: a faceless
matte-clay figure in a dark, calm editorial scene with a baked-in headline. Psychage is a
world-class mental-health editorial publication. Calm, human, honest, never clinical.

## Inputs
1. Your assigned input file `{ category, items: [{prodid, title}, ...] }`.
2. `scripts/poster-batch-960/category_palettes.json` — find YOUR category entry and read its
   `accentDesc1/accentDesc2/accentDesc3` (e.g. "teal accent", "soft light teal", "pale teal").
   Reference this accent color family in EVERY sceneLine so the whole category stays on-brand.

## For EACH item author 5 fields
1. **headline** — title before the first colon; if no colon, the full title. MUST be ≤ 5
   words. If longer, compress to the core noun phrase (human and specific, not generic).
   Title Case. Avoid duplicate headlines within your chunk — differentiate when titles collide.
2. **subtitle** — title after the first colon; if no colon, write a plain 5–8 word descriptor
   of the article's subject. Sentence case, no period.
3. **figureLine** — ONE sentence: how many faceless clay figures and their posture, conveying
   the article's emotional core through body language alone. The figure carries the meaning.
4. **sceneLine** — ONE sentence: a single symbolic scene element rendered in the category's
   accent colors (the "conceptual matter" around the figure). Symbolic, never literal/medical.
5. **sensitive** — boolean (see constraint below).

## Hard rules (non-negotiable)
- Symbolic, NEVER literal or medical. NEVER depict text, letters, numbers, charts, graphs,
  brains, pills, syringes, hospital/clinical equipment, or diagnostic imagery anywhere.
- Figure is faceless, genderless, raceless clay — no faces, hair, clothing, skin color.
  Posture and form alone convey emotion.
- Every sceneLine names the category accent color family from the palette file.
- Vary posture and scene element across items — never reuse a figureLine/sceneLine; each fits
  its specific title.

## SENSITIVE TOPICS — gentle constraint
For any article touching: psychosis, postpartum/perinatal, sexual trauma, childhood abuse,
trafficking, pregnancy loss/miscarriage/stillbirth, abortion, suicide, self-harm, outliving a
child, death/mortality, chronic/terminal illness — set `sensitive: true` and make the scene
ABSTRACT, calm, and protective. No depiction of harm, violence, blood, restraint, a distressed
infant, or a body in crisis. Convey care and steadiness, never the event. No diagnostic or
clinical framing anywhere.

## Gold examples (match this voice and specificity)
- "Cognitive Remediation Therapy: Retraining the Mind" →
  headline "Cognitive Remediation Therapy", subtitle "Retraining the Mind",
  figureLine "A single seated clay figure rests with one hand gently arranging small shapes
  before it, posture focused and patient, conveying steady practice rebuilding clarity.",
  sceneLine "Several soft slate-cyan strands gradually weave together into one clear,
  continuous pale aqua-grey lattice beside the figure, suggesting the mind's pathways being
  patiently retrained." (use YOUR category's accent words, not slate-cyan)
- "How Long It Actually Takes to Build a Habit" →
  headline "Building a Habit", subtitle "How long it actually takes",
  figureLine "A single standing clay figure takes one calm, deliberate step forward, posture
  steady and unhurried, conveying patient repetition over time.",
  sceneLine "A row of soft amber rounded forms recedes gently into the distance beside the
  figure, each slightly more defined than the last, suggesting a path built one repeated step
  at a time."

## Output
Write a single JSON object keyed by `prodid` to your assigned output path. Each value:
`{ "headline": "...", "subtitle": "...", "figureLine": "...", "sceneLine": "...", "sensitive": true|false }`.
Include EVERY input item — no omissions. Valid JSON only (double quotes, no trailing commas).
Return only: count authored, how many sensitive, any tricky titles. Do not paste the full JSON.
