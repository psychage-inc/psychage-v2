/**
 * Component-level accessibility tests for Navigator UI elements.
 */

import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { SymptomToggle } from '../../components/navigator/SymptomToggle';
import { ProviderQuestions } from '../../components/navigator/ProviderQuestions';
import { RelevanceDots } from '../../components/navigator/RelevanceDots';
import { NavigatorButton } from '../../components/navigator/NavigatorButton';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';
import type { Symptom } from '../../lib/navigator/types';

expect.extend(toHaveNoViolations);

// Mock Framer Motion
vi.mock('framer-motion', () => ({
    motion: {
        div: 'div',
        button: 'button',
        p: 'p',
        span: 'span',
        li: 'li',
        section: 'section'
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('Navigator Component Accessibility', () => {
    describe('SymptomToggle', () => {
        const mockSymptom: Symptom = {
            id: 'test-1',
            domain: 'emotional',
            category: 'mood',
            name: 'Feeling sad',
            description: 'Persistent feelings of sadness',
            synonyms: ['depressed', 'down'],
            ask_duration: true,
            ask_severity: true,
            ask_frequency: true,
            is_red_flag: false,
            red_flag_level: null,
            severity_red_flag_threshold: null,
            severity_red_flag_level: null,
            display_order: 1,
            is_active: true,
            version: '1.0'
        };

        it('should not have violations when unselected', async () => {
            const { container } = render(
                <SymptomToggle
                    symptom={mockSymptom}
                    isSelected={false}
                    onToggle={vi.fn()}
                />
            );

            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('should not have violations when selected', async () => {
            const { container } = render(
                <SymptomToggle
                    symptom={mockSymptom}
                    isSelected={true}
                    onToggle={vi.fn()}
                />
            );

            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('should not have violations with search highlighting', async () => {
            const { container } = render(
                <SymptomToggle
                    symptom={mockSymptom}
                    isSelected={false}
                    onToggle={vi.fn()}
                    searchQuery="sad"
                />
            );

            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });
    });

    describe('ProviderQuestions', () => {
        it('should not have violations with questions', async () => {
            const questions = [
                "How long have you been experiencing these symptoms?",
                "What treatments have you tried before?",
                "How are these symptoms affecting your daily life?"
            ];

            const { container } = render(
                <ProviderQuestions questions={questions} />
            );

            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('should not have violations when empty', async () => {
            const { container } = render(
                <ProviderQuestions questions={[]} />
            );

            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });
    });

    describe('RelevanceDots', () => {
        it('should not have violations for high relevance', async () => {
            const { container } = render(
                <RelevanceDots level="high" />
            );

            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('should not have violations for moderate relevance', async () => {
            const { container } = render(
                <RelevanceDots level="moderate" />
            );

            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('should not have violations for low relevance', async () => {
            const { container } = render(
                <RelevanceDots level="low" />
            );

            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });
    });

    describe('NavigatorButton', () => {
        it('should not have violations in default state', async () => {
            const { container } = render(
                <NavigatorButton onClick={vi.fn()}>
                    Click me
                </NavigatorButton>
            );

            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('should not have violations when disabled', async () => {
            const { container } = render(
                <NavigatorButton onClick={vi.fn()} isDisabled={true}>
                    Disabled button
                </NavigatorButton>
            );

            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });
    });

    describe('ConfirmDialog', () => {
        it('should not have violations when open', async () => {
            const { container } = render(
                <ConfirmDialog
                    isOpen={true}
                    onClose={vi.fn()}
                    onConfirm={vi.fn()}
                    title="Confirm Action"
                    message="Are you sure you want to proceed?"
                    confirmText="Yes"
                    cancelText="No"
                />
            );

            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('should not have violations in destructive variant', async () => {
            const { container } = render(
                <ConfirmDialog
                    isOpen={true}
                    onClose={vi.fn()}
                    onConfirm={vi.fn()}
                    title="Delete Item"
                    message="This action cannot be undone."
                    confirmText="Delete"
                    cancelText="Cancel"
                    variant="destructive"
                />
            );

            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });
    });
});
