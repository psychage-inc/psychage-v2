import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('tokens.css', () => {
    const tokensContent = readFileSync(join(__dirname, '../tokens.css'), 'utf-8');

    it('contains dark mode CSS block', () => {
        expect(tokensContent).toContain('html.dark');
        expect(tokensContent).toContain(':root.dark');
    });

    it('defines dark mode color variables', () => {
        const darkModeSection = tokensContent.split('html.dark')[1];

        expect(darkModeSection).toContain('--color-background');
        expect(darkModeSection).toContain('--color-surface');
        expect(darkModeSection).toContain('--color-primary');
        expect(darkModeSection).toContain('--color-text-primary');
        expect(darkModeSection).toContain('--color-border');
    });

    it('defines dark mode shadow variables', () => {
        const darkModeSection = tokensContent.split('html.dark')[1];

        expect(darkModeSection).toContain('--shadow-sm');
        expect(darkModeSection).toContain('--shadow-md');
        expect(darkModeSection).toContain('--shadow-lg');
        expect(darkModeSection).toContain('--shadow-glow');
    });

    it('defines navigator-specific dark tokens', () => {
        const darkModeSection = tokensContent.split('html.dark')[1];

        expect(darkModeSection).toContain('--navigator-bg-overlay');
        expect(darkModeSection).toContain('--navigator-border');
        expect(darkModeSection).toContain('--navigator-card-bg');
        expect(darkModeSection).toContain('--navigator-card-hover');
    });

    it('has light mode tokens defined', () => {
        expect(tokensContent).toContain('html.light');
        expect(tokensContent).toContain(':root.light');
        expect(tokensContent).toContain(':root:not(.dark)');
    });

    it('includes reduced motion media query', () => {
        expect(tokensContent).toContain('@media (prefers-reduced-motion: reduce)');
        expect(tokensContent).toContain('animation-duration: 0.01ms !important');
    });

    it('defines spacing variables', () => {
        expect(tokensContent).toContain('--space-1');
        expect(tokensContent).toContain('--space-2');
        expect(tokensContent).toContain('--space-4');
        expect(tokensContent).toContain('--space-8');
    });

    it('defines transition timing variables', () => {
        expect(tokensContent).toContain('--transition-fast');
        expect(tokensContent).toContain('--transition-normal');
        expect(tokensContent).toContain('--transition-slow');
    });
});
