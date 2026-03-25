 
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ProgressDots } from '../ProgressDots';

describe('ProgressDots', () => {
    it('should render progressbar role', () => {
        render(<ProgressDots total={4} current={0} />);
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('should set aria-valuenow to current + 1', () => {
        render(<ProgressDots total={4} current={2} />);
        expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '3');
    });

    it('should set aria-valuemax to total', () => {
        render(<ProgressDots total={5} current={0} />);
        expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuemax', '5');
    });

    it('should render correct number of dots', () => {
        const { container } = render(<ProgressDots total={4} current={1} />);
        const dots = container.querySelectorAll('.rounded-full');
        expect(dots).toHaveLength(4);
    });

    it('should highlight current dot wider', () => {
        const { container } = render(<ProgressDots total={4} current={2} />);
        const dots = container.querySelectorAll('.rounded-full');
        expect(dots[2]).toHaveClass('w-6');
        expect(dots[0]).toHaveClass('w-2');
    });

    it('should highlight current dot with darker color', () => {
        const { container } = render(<ProgressDots total={3} current={1} />);
        const dots = container.querySelectorAll('.rounded-full');
        expect(dots[1]).toHaveClass('bg-gray-900');
        expect(dots[0]).toHaveClass('bg-gray-300');
    });
});
