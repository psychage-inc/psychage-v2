import { describe, it, expect } from 'vitest';
import { escapeRegex, getHighlightSegments } from './highlightText';

describe('escapeRegex', () => {
    it('should escape special regex characters', () => {
        expect(escapeRegex('hello.world')).toBe('hello\\.world');
        expect(escapeRegex('a+b*c?')).toBe('a\\+b\\*c\\?');
        expect(escapeRegex('(test)')).toBe('\\(test\\)');
        expect(escapeRegex('[brackets]')).toBe('\\[brackets\\]');
        expect(escapeRegex('a{1,2}')).toBe('a\\{1,2\\}');
        expect(escapeRegex('$100')).toBe('\\$100');
        expect(escapeRegex('^start')).toBe('\\^start');
        expect(escapeRegex('a|b')).toBe('a\\|b');
        expect(escapeRegex('back\\slash')).toBe('back\\\\slash');
    });

    it('should return plain strings unchanged', () => {
        expect(escapeRegex('hello world')).toBe('hello world');
        expect(escapeRegex('simple')).toBe('simple');
    });

    it('should handle empty string', () => {
        expect(escapeRegex('')).toBe('');
    });
});

describe('getHighlightSegments', () => {
    it('should return full text when query is empty', () => {
        const result = getHighlightSegments('Hello World', '');
        expect(result).toEqual([{ text: 'Hello World', isMatch: false }]);
    });

    it('should return full text when query is too short (< 2 chars)', () => {
        const result = getHighlightSegments('Hello World', 'H');
        expect(result).toEqual([{ text: 'Hello World', isMatch: false }]);
    });

    it('should highlight matching text (case-insensitive)', () => {
        const result = getHighlightSegments('Hello World', 'hello');
        expect(result.length).toBeGreaterThanOrEqual(1);
        const matchSegment = result.find(s => s.isMatch);
        expect(matchSegment).toBeDefined();
        expect(matchSegment!.text.toLowerCase()).toBe('hello');
    });

    it('should preserve original casing in segments', () => {
        const result = getHighlightSegments('Hello World', 'hello');
        const matchSegment = result.find(s => s.isMatch);
        expect(matchSegment!.text).toBe('Hello');
    });

    it('should handle no match', () => {
        const result = getHighlightSegments('Hello World', 'xyz');
        expect(result).toEqual([{ text: 'Hello World', isMatch: false }]);
    });

    it('should handle query with regex special characters safely', () => {
        const result = getHighlightSegments('price is $100.00', '$100');
        // Should not throw - regex chars are escaped
        expect(result.length).toBeGreaterThanOrEqual(1);
    });

    it('should handle whitespace-only query', () => {
        const result = getHighlightSegments('Hello', '   ');
        expect(result).toEqual([{ text: 'Hello', isMatch: false }]);
    });

    it('should trim query before matching', () => {
        const result = getHighlightSegments('Hello World', '  World  ');
        const matchSegment = result.find(s => s.isMatch);
        expect(matchSegment).toBeDefined();
        expect(matchSegment!.text).toBe('World');
    });
});
