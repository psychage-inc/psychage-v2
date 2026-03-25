import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn', () => {
    it('should merge class names', () => {
        expect(cn('foo', 'bar')).toBe('foo bar');
    });

    it('should handle conditional classes', () => {
        // eslint-disable-next-line no-constant-binary-expression
        expect(cn('base', false && 'hidden', 'visible')).toBe('base visible');
    });

    it('should resolve Tailwind conflicts (last wins)', () => {
        expect(cn('px-4', 'px-6')).toBe('px-6');
    });

    it('should handle empty inputs', () => {
        expect(cn()).toBe('');
    });

    it('should handle undefined and null inputs', () => {
        expect(cn('foo', undefined, null, 'bar')).toBe('foo bar');
    });

    it('should handle arrays of class names', () => {
        expect(cn(['foo', 'bar'], 'baz')).toBe('foo bar baz');
    });

    it('should handle object syntax', () => {
        expect(cn({ foo: true, bar: false, baz: true })).toBe('foo baz');
    });

    it('should merge complex Tailwind conflicts', () => {
        expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
        expect(cn('bg-white dark:bg-gray-800', 'bg-black')).toBe('dark:bg-gray-800 bg-black');
    });
});
