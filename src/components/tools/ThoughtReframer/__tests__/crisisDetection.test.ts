import { describe, it, expect } from 'vitest';
import { scanForCrisisKeywords } from '../crisisDetection';

describe('scanForCrisisKeywords', () => {
    it('should return detected=false for safe text', () => {
        const result = scanForCrisisKeywords('I feel a bit sad today');
        expect(result.detected).toBe(false);
        expect(result.matchedKeywords).toEqual([]);
    });

    it('should detect "suicide"', () => {
        const result = scanForCrisisKeywords('I am thinking about suicide');
        expect(result.detected).toBe(true);
        expect(result.matchedKeywords).toContain('suicide');
    });

    it('should detect "kill myself"', () => {
        const result = scanForCrisisKeywords('I want to kill myself');
        expect(result.detected).toBe(true);
        expect(result.matchedKeywords).toContain('kill myself');
    });

    it('should detect "want to die"', () => {
        const result = scanForCrisisKeywords('I just want to die');
        expect(result.detected).toBe(true);
        expect(result.matchedKeywords).toContain('want to die');
    });

    it('should detect "self-harm"', () => {
        const result = scanForCrisisKeywords('thinking about self-harm');
        expect(result.detected).toBe(true);
        expect(result.matchedKeywords).toContain('self-harm');
    });

    it('should detect "better off dead"', () => {
        const result = scanForCrisisKeywords('everyone would be better off dead without me');
        expect(result.detected).toBe(true);
        expect(result.matchedKeywords).toContain('better off dead');
    });

    it('should be case-insensitive', () => {
        const result = scanForCrisisKeywords('I want to KILL MYSELF');
        expect(result.detected).toBe(true);
    });

    it('should detect Spanish keywords', () => {
        const result = scanForCrisisKeywords('quiero morir');
        expect(result.detected).toBe(true);
        expect(result.matchedKeywords).toContain('quiero morir');
    });

    it('should detect French keywords', () => {
        const result = scanForCrisisKeywords('envie de mourir');
        expect(result.detected).toBe(true);
        expect(result.matchedKeywords).toContain('envie de mourir');
    });

    it('should detect multiple keywords in same text', () => {
        const result = scanForCrisisKeywords('I want to end my life and commit suicide');
        expect(result.detected).toBe(true);
        expect(result.matchedKeywords.length).toBeGreaterThanOrEqual(2);
    });

    it('should return empty text as safe', () => {
        const result = scanForCrisisKeywords('');
        expect(result.detected).toBe(false);
        expect(result.matchedKeywords).toEqual([]);
    });
});
