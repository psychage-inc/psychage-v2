/* eslint-disable @typescript-eslint/no-require-imports */
import { render, screen, act, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import SafetyBanner from '../SafetyBanner';

vi.mock('framer-motion', () => {
    const React = require('react');
    return {
        motion: {
            div: React.forwardRef(({ children, ...props }: any, ref: any) => (
                <div ref={ref} {...props}>{children}</div>
            )),
        },
    };
});

describe('SafetyBanner', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('should render supportive heading', () => {
        render(<SafetyBanner onDismiss={vi.fn()} />);
        expect(screen.getByText(/you're not alone/i)).toBeInTheDocument();
    });

    it('should display 988 Suicide & Crisis Lifeline link', () => {
        render(<SafetyBanner onDismiss={vi.fn()} />);
        const link = screen.getByRole('link', { name: /988 suicide/i });
        expect(link).toHaveAttribute('href', 'tel:988');
    });

    it('should display Crisis Text Line link', () => {
        render(<SafetyBanner onDismiss={vi.fn()} />);
        const link = screen.getByRole('link', { name: /crisis text line/i });
        expect(link).toHaveAttribute('href', expect.stringContaining('741741'));
    });

    it('should display international resources link', () => {
        render(<SafetyBanner onDismiss={vi.fn()} />);
        const link = screen.getByRole('link', { name: /international/i });
        expect(link).toHaveAttribute('href', 'https://findahelpline.com');
        expect(link).toHaveAttribute('target', '_blank');
    });

    it('should disable dismiss button initially', () => {
        render(<SafetyBanner onDismiss={vi.fn()} />);
        const btn = screen.getByRole('button');
        expect(btn).toBeDisabled();
    });

    it('should show countdown timer', () => {
        render(<SafetyBanner onDismiss={vi.fn()} />);
        expect(screen.getByText('10s')).toBeInTheDocument();
    });

    it('should enable dismiss button after 10 seconds', () => {
        render(<SafetyBanner onDismiss={vi.fn()} />);

        act(() => {
            vi.advanceTimersByTime(10000);
        });

        const btn = screen.getByRole('button', { name: /dismiss/i });
        expect(btn).not.toBeDisabled();
    });

    it('should call onDismiss when enabled button is clicked', () => {
        const onDismiss = vi.fn();
        render(<SafetyBanner onDismiss={onDismiss} />);

        act(() => {
            vi.advanceTimersByTime(10000);
        });

        fireEvent.click(screen.getByRole('button', { name: /dismiss/i }));
        expect(onDismiss).toHaveBeenCalledTimes(1);
    });
});
