import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React from 'react';
import { vi } from 'vitest';
import { Card } from '../Card';

vi.mock('framer-motion', () => ({
    motion: {
        div: React.forwardRef(({ children, variants, initial, whileHover, ...props }: any, ref: any) => (
            <div ref={ref} {...props}>{children}</div>
        )),
    },
}));

describe('Card', () => {
    it('should render children', () => {
        render(<Card>Card content</Card>);
        expect(screen.getByText('Card content')).toBeInTheDocument();
    });

    it('should apply default variant', () => {
        render(<Card>Test</Card>);
        const card = screen.getByText('Test');
        expect(card.className).toContain('bg-surface');
    });

    it('should apply glass variant', () => {
        render(<Card variant="glass">Glass</Card>);
        expect(screen.getByText('Glass').className).toContain('glass');
    });

    it('should apply outline variant', () => {
        render(<Card variant="outline">Outline</Card>);
        expect(screen.getByText('Outline').className).toContain('bg-transparent');
    });

    it('should apply ghost variant', () => {
        render(<Card variant="ghost">Ghost</Card>);
        expect(screen.getByText('Ghost').className).toContain('border-none');
    });

    it('should apply custom className', () => {
        render(<Card className="my-card">Test</Card>);
        expect(screen.getByText('Test').className).toContain('my-card');
    });

    it('should render with hover effect wrapper', () => {
        render(<Card hoverEffect>Hover me</Card>);
        expect(screen.getByText('Hover me')).toBeInTheDocument();
    });

    it('should forward ref', () => {
        const ref = { current: null as HTMLDivElement | null };
        render(<Card ref={ref}>Test</Card>);
        expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
});
