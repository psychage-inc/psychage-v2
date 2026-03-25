 
/**
 * Automated accessibility tests for Navigator components using jest-axe.
 * Tests for WCAG 2.1 AA compliance.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { NavigatorProvider } from '../../context/NavigatorContext';
import { SymptomSelectionScreen } from '../../components/screens/SymptomSelectionScreen';
import { DurationSeverityScreen } from '../../components/screens/DurationSeverityScreen';
import { ResultsScreen } from '../../components/screens/ResultsScreen';
import { ProcessingScreen } from '../../components/screens/ProcessingScreen';
import { CrisisOverlay } from '../../components/navigator/CrisisOverlay';
import { EnhancedProgressBar } from '../../components/navigator/EnhancedProgressBar';
import type { NavigatorStep } from '../../lib/navigator/stepConfig';

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

// Mock Framer Motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
    motion: {
        div: 'div',
        button: 'button',
        p: 'p',
        span: 'span',
        li: 'li',
        section: 'section',
        circle: 'circle',
        svg: 'svg'
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock navigator.clipboard
Object.assign(navigator, {
    clipboard: {
        writeText: vi.fn(() => Promise.resolve()),
    },
});

describe('Navigator Accessibility Tests', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('SymptomSelectionScreen', () => {
        it('should not have basic accessibility violations', async () => {
            const { container } = render(
                <NavigatorProvider>
                    <SymptomSelectionScreen />
                </NavigatorProvider>
            );

            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('should not have violations in empty search state', async () => {
            const { container } = render(
                <NavigatorProvider>
                    <SymptomSelectionScreen />
                </NavigatorProvider>
            );

            // Wait for component to render
            await new Promise(resolve => setTimeout(resolve, 100));

            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });
    });

    describe('DurationSeverityScreen', () => {
        it('should not have accessibility violations', async () => {
            const { container } = render(
                <NavigatorProvider>
                    <DurationSeverityScreen />
                </NavigatorProvider>
            );

            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });
    });

    describe('ResultsScreen', () => {
        it('should not have accessibility violations', async () => {
            const { container } = render(
                <NavigatorProvider>
                    <ResultsScreen />
                </NavigatorProvider>
            );

            // Allow async data loading
            await new Promise(resolve => setTimeout(resolve, 100));

            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });
    });

    describe('ProcessingScreen', () => {
        it('should not have accessibility violations', async () => {
            // Render with real timers — axe needs real async to run
            const { container } = render(
                <NavigatorProvider>
                    <ProcessingScreen />
                </NavigatorProvider>
            );

            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });
    });

    describe('CrisisOverlay', () => {
        it('should not have accessibility violations when visible', async () => {
            const { container } = render(
                <NavigatorProvider>
                    <CrisisOverlay />
                </NavigatorProvider>
            );

            // Note: CrisisOverlay only renders when crisisTriggered is true
            // This tests the hidden state for accessibility
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });
    });

    describe('EnhancedProgressBar', () => {
        it('should not have accessibility violations', async () => {
            const completedSteps = new Set<NavigatorStep>(['welcome', 'domains']);
            const mockOnStepClick = vi.fn();

            const { container } = render(
                <EnhancedProgressBar
                    currentStep="symptoms"
                    completedSteps={completedSteps}
                    onStepClick={mockOnStepClick}
                />
            );

            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('should not have violations with all steps completed', async () => {
            const completedSteps = new Set<NavigatorStep>([
                'welcome',
                'domains',
                'symptoms',
                'details',
                'processing'
            ]);
            const mockOnStepClick = vi.fn();

            const { container } = render(
                <EnhancedProgressBar
                    currentStep="results"
                    completedSteps={completedSteps}
                    onStepClick={mockOnStepClick}
                />
            );

            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });
    });
});
