import { describe, it, expect } from 'vitest';
import {
    scorePHQ2,
    scoreGAD2,
    scorePSS4,
    scoreWHO5,
    classifyPHQ2,
    classifyGAD2,
    classifyPSS4,
    classifyWHO5,
    getScoreColor,
    getScoreLabel,
} from './scoring';

describe('scorePHQ2', () => {
    it('should sum two items', () => expect(scorePHQ2(2, 3)).toBe(5));
    it('should clamp at 0', () => expect(scorePHQ2(-1, 0)).toBe(0));
    it('should clamp at 6', () => expect(scorePHQ2(4, 4)).toBe(6));
});

describe('scoreGAD2', () => {
    it('should sum two items', () => expect(scoreGAD2(1, 2)).toBe(3));
    it('should clamp at 6', () => expect(scoreGAD2(5, 5)).toBe(6));
});

describe('scorePSS4', () => {
    it('should reverse score q2', () => {
        // q1=3, q2=1 → reversed=3 → 3+3=6
        expect(scorePSS4(3, 1)).toBe(6);
    });
    it('should handle max values', () => {
        // q1=4, q2=0 → reversed=4 → 4+4=8
        expect(scorePSS4(4, 0)).toBe(8);
    });
    it('should clamp at 0', () => expect(scorePSS4(0, 4)).toBe(0));
});

describe('scoreWHO5', () => {
    it('should sum two items', () => expect(scoreWHO5(4, 3)).toBe(7));
    it('should clamp at 10', () => expect(scoreWHO5(6, 6)).toBe(10));
    it('should handle zeros', () => expect(scoreWHO5(0, 0)).toBe(0));
});

describe('classifyPHQ2', () => {
    it('should classify 0-2 as low', () => {
        expect(classifyPHQ2(0)).toBe('low');
        expect(classifyPHQ2(2)).toBe('low');
    });
    it('should classify 3-4 as moderate', () => {
        expect(classifyPHQ2(3)).toBe('moderate');
        expect(classifyPHQ2(4)).toBe('moderate');
    });
    it('should classify 5-6 as elevated', () => {
        expect(classifyPHQ2(5)).toBe('elevated');
        expect(classifyPHQ2(6)).toBe('elevated');
    });
});

describe('classifyGAD2', () => {
    it('should classify 0-2 as low', () => expect(classifyGAD2(1)).toBe('low'));
    it('should classify 3-4 as moderate', () => expect(classifyGAD2(3)).toBe('moderate'));
    it('should classify 5+ as elevated', () => expect(classifyGAD2(6)).toBe('elevated'));
});

describe('classifyPSS4', () => {
    it('should classify 0-3 as low', () => expect(classifyPSS4(2)).toBe('low'));
    it('should classify 4-5 as moderate', () => expect(classifyPSS4(4)).toBe('moderate'));
    it('should classify 6+ as elevated', () => expect(classifyPSS4(7)).toBe('elevated'));
});

describe('classifyWHO5', () => {
    it('should classify 7+ as low (good well-being)', () => expect(classifyWHO5(8)).toBe('low'));
    it('should classify 4-6 as moderate', () => expect(classifyWHO5(5)).toBe('moderate'));
    it('should classify 0-3 as elevated (low well-being)', () => expect(classifyWHO5(2)).toBe('elevated'));
});

describe('getScoreColor', () => {
    it('should return green for low', () => expect(getScoreColor('low')).toContain('green'));
    it('should return amber for moderate', () => expect(getScoreColor('moderate')).toContain('amber'));
    it('should return red for elevated', () => expect(getScoreColor('elevated')).toContain('red'));
});

describe('getScoreLabel', () => {
    it('should return Low concern for low', () => expect(getScoreLabel('low')).toBe('Low concern'));
    it('should return Moderate for moderate', () => expect(getScoreLabel('moderate')).toBe('Moderate'));
    it('should return Elevated for elevated', () => expect(getScoreLabel('elevated')).toBe('Elevated'));
});
