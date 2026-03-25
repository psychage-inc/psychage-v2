/* eslint-disable @typescript-eslint/no-require-imports */
import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { WelcomeScreen } from '../../components/screens/WelcomeScreen';
import { ResultsScreen } from '../../components/screens/ResultsScreen';
import { DurationSeverityScreen } from '../../components/screens/DurationSeverityScreen';
import { NavigatorProvider } from '../../context/NavigatorContext';

// Extend expect with jest-axe matchers
expect.extend(toHaveNoViolations);

// Mock window.matchMedia for useReducedMotion
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => {
    const React = require('react');
    return {
        motion: {
            div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
            button: React.forwardRef(({ children, ...props }: any, ref: any) => (
                <button ref={ref} {...props}>{children}</button>
            )),
            section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
            span: 'span',
            p: 'p',
            li: 'li',
        },
        AnimatePresence: ({ children }: any) => <>{children}</>,
    };
});

describe('Navigator Screens - Accessibility', () => {
    it('WelcomeScreen should have no accessibility violations', async () => {
        const { container } = render(
            <NavigatorProvider>
                <WelcomeScreen />
            </NavigatorProvider>
        );

        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    it('DurationSeverityScreen should have no accessibility violations when loaded', async () => {
        const { container } = render(
            <NavigatorProvider>
                <DurationSeverityScreen />
            </NavigatorProvider>
        );

        // Wait for component to render (loading state is acceptable)
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    it('ResultsScreen should have no accessibility violations when loaded', async () => {
        const { container } = render(
            <NavigatorProvider>
                <ResultsScreen />
            </NavigatorProvider>
        );

        // Wait for component to render (loading/error states are acceptable)
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });
});
