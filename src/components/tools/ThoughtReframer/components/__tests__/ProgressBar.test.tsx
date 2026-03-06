import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ProgressBar } from '../ProgressBar';

describe('ThoughtReframer ProgressBar', () => {
    it('should render progressbar role', () => {
        render(<ProgressBar current={0} />);
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('should set aria-valuenow to current + 1', () => {
        render(<ProgressBar current={3} />);
        expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '4');
    });

    it('should set aria-valuemax to total', () => {
        render(<ProgressBar current={0} />);
        expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuemax', '7');
    });

    it('should include step label in aria-label', () => {
        render(<ProgressBar current={0} />);
        expect(screen.getByRole('progressbar')).toHaveAttribute('aria-label', 'Step 1 of 7: Situation');
    });

    it('should update label for different steps', () => {
        render(<ProgressBar current={2} />);
        expect(screen.getByRole('progressbar')).toHaveAttribute('aria-label', 'Step 3 of 7: Thought');
    });

    it('should render 7 step labels', () => {
        render(<ProgressBar current={0} />);
        expect(screen.getByText('Situation')).toBeInTheDocument();
        expect(screen.getByText('Emotions')).toBeInTheDocument();
        expect(screen.getByText('Reframe')).toBeInTheDocument();
    });

    it('should accept custom total', () => {
        render(<ProgressBar current={0} total={5} />);
        expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuemax', '5');
    });
});
