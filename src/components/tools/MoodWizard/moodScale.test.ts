import { describe, it, expect } from 'vitest';
import { valenceToScore, scoreToValence } from './moodScale';

describe('moodScale (C-2 regression)', () => {
    describe('valenceToScore: 1–10 valence → 1–5 store scale', () => {
        it('keeps every valence within the 1–5 range that moodService accepts', () => {
            for (let v = 1; v <= 10; v++) {
                const score = valenceToScore(v);
                expect(score).toBeGreaterThanOrEqual(1);
                expect(score).toBeLessThanOrEqual(5);
            }
        });

        it('never drops pleasant moods (the original bug: valence > 5 → null)', () => {
            // valence 6..10 previously failed moodService.createEntry (value > 5)
            for (let v = 6; v <= 10; v++) {
                expect(valenceToScore(v)).toBeLessThanOrEqual(5);
            }
        });

        it('maps the endpoints and midpoint sensibly', () => {
            expect(valenceToScore(1)).toBe(1);
            expect(valenceToScore(10)).toBe(5);
            expect(valenceToScore(5.5)).toBe(3);
        });

        it('preserves ordering (monotonic non-decreasing)', () => {
            let prev = 0;
            for (let v = 1; v <= 10; v++) {
                const score = valenceToScore(v);
                expect(score).toBeGreaterThanOrEqual(prev);
                prev = score;
            }
        });
    });

    describe('scoreToValence: 1–5 store scale → 1–10 display', () => {
        it('maps every stored score into the 1–10 display range', () => {
            for (let s = 1; s <= 5; s++) {
                const valence = scoreToValence(s);
                expect(valence).toBeGreaterThanOrEqual(1);
                expect(valence).toBeLessThanOrEqual(10);
                expect(Number.isInteger(valence)).toBe(true);
            }
        });

        it('maps the endpoints', () => {
            expect(scoreToValence(1)).toBe(1);
            expect(scoreToValence(5)).toBe(10);
        });
    });
});
