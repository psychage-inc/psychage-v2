 
import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { CrisisStickyBanner } from '../../components/navigator/CrisisStickyBanner';

expect.extend(toHaveNoViolations);

// Mock framer-motion
vi.mock('framer-motion', () => ({
    motion: {
        div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('CrisisStickyBanner - Accessibility', () => {
    it('should have no accessibility violations', async () => {
        const { container } = render(<CrisisStickyBanner />);

        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    it('should have proper ARIA attributes', () => {
        const { getByRole } = render(<CrisisStickyBanner />);

        // Should have region role with label
        const region = getByRole('region', { name: /crisis support/i });
        expect(region).toBeInTheDocument();
    });

    it('should have accessible dismiss button', () => {
        const { getAllByRole } = render(<CrisisStickyBanner />);

        // Should have dismiss buttons (one for mobile, one for desktop)
        const dismissButtons = getAllByRole('button', { name: /dismiss crisis banner/i });
        expect(dismissButtons.length).toBeGreaterThan(0);
        expect(dismissButtons[0]).toBeInTheDocument();
    });
});
