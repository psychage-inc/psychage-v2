import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ProgressBar } from '../ProgressBar';

vi.mock('framer-motion', () => {
    const { forwardRef } = require('react');
    return {
        motion: {
            div: forwardRef(({ children, initial, animate, transition, ...props }: any, ref: any) => (
                <div ref={ref} {...props}>{children}</div>
            )),
        },
    };
});

describe('ProgressBar', () => {
    it('should render progressbar role', () => {
        render(<ProgressBar currentStep={1} totalSteps={5} />);
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('should set aria-valuenow to current step', () => {
        render(<ProgressBar currentStep={3} totalSteps={5} />);
        const bar = screen.getByRole('progressbar');
        expect(bar).toHaveAttribute('aria-valuenow', '3');
    });

    it('should set aria-valuemax to total steps', () => {
        render(<ProgressBar currentStep={1} totalSteps={10} />);
        const bar = screen.getByRole('progressbar');
        expect(bar).toHaveAttribute('aria-valuemax', '10');
    });

    it('should set aria-valuemin to 1', () => {
        render(<ProgressBar currentStep={1} totalSteps={5} />);
        const bar = screen.getByRole('progressbar');
        expect(bar).toHaveAttribute('aria-valuemin', '1');
    });

    it('should have descriptive aria-label', () => {
        render(<ProgressBar currentStep={2} totalSteps={5} />);
        const bar = screen.getByRole('progressbar');
        expect(bar).toHaveAttribute('aria-label', 'Step 2 of 5');
    });

    it('should update aria-label when step changes', () => {
        const { rerender } = render(<ProgressBar currentStep={1} totalSteps={5} />);
        expect(screen.getByRole('progressbar')).toHaveAttribute('aria-label', 'Step 1 of 5');

        rerender(<ProgressBar currentStep={4} totalSteps={5} />);
        expect(screen.getByRole('progressbar')).toHaveAttribute('aria-label', 'Step 4 of 5');
    });
});
