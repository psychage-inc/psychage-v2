/**
 * The mood wizard works on a 1–10 valence scale, but mood_entries.value is the
 * canonical 1–5 scale shared with QuickMoodCheckIn and the dashboard. These
 * helpers convert between the two so pleasant moods (valence > 5) are stored
 * instead of rejected, and stored values still render on the 1–10 display.
 */

/** Map a 1–10 valence to the 1–5 store scale (clamped, integer). */
export const valenceToScore = (valence: number): number =>
    Math.min(5, Math.max(1, Math.round(((valence - 1) / 9) * 4) + 1));

/** Map a 1–5 stored score back to the 1–10 valence scale (clamped, integer). */
export const scoreToValence = (score: number): number =>
    Math.min(10, Math.max(1, Math.round(((score - 1) / 4) * 9) + 1));
