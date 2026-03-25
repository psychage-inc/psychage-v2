/* eslint-disable @typescript-eslint/no-require-imports */
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { StepValence, getValenceLabel } from '../StepValence';

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

// Mock BloomVisualization to avoid Three.js/canvas
vi.mock('../BloomVisualization', () => ({
    BloomVisualization: () => <div data-testid="bloom-viz" />,
}));

describe('getValenceLabel', () => {
    it('should return Very Unpleasant for 1', () => expect(getValenceLabel(1)).toBe('Very Unpleasant'));
    it('should return Unpleasant for 2-3', () => expect(getValenceLabel(2)).toBe('Unpleasant'));
    it('should return Slightly Unpleasant for 4', () => expect(getValenceLabel(4)).toBe('Slightly Unpleasant'));
    it('should return Neutral for 5-6', () => expect(getValenceLabel(5)).toBe('Neutral'));
    it('should return Slightly Pleasant for 7', () => expect(getValenceLabel(7)).toBe('Slightly Pleasant'));
    it('should return Pleasant for 8-9', () => expect(getValenceLabel(8)).toBe('Pleasant'));
    it('should return Very Pleasant for 10', () => expect(getValenceLabel(10)).toBe('Very Pleasant'));
});

describe('StepValence', () => {
    const defaultData = {
        valence: 5,
        emotions: [],
        impactAreas: [],
        note: '',
    };

    it('should render heading', () => {
        render(<StepValence data={defaultData} updateData={vi.fn()} onNext={vi.fn()} />);
        expect(screen.getByText(/how are you feeling/i)).toBeInTheDocument();
    });

    it('should display current valence label', () => {
        render(<StepValence data={defaultData} updateData={vi.fn()} onNext={vi.fn()} />);
        expect(screen.getByText('Neutral')).toBeInTheDocument();
    });

    it('should render valence slider', () => {
        render(<StepValence data={defaultData} updateData={vi.fn()} onNext={vi.fn()} />);
        expect(screen.getByRole('slider', { name: /valence/i })).toBeInTheDocument();
    });

    it('should render Unpleasant and Pleasant labels', () => {
        render(<StepValence data={defaultData} updateData={vi.fn()} onNext={vi.fn()} />);
        expect(screen.getByText('Unpleasant')).toBeInTheDocument();
        expect(screen.getByText('Pleasant')).toBeInTheDocument();
    });

    it('should call updateData on slider change', () => {
        const updateData = vi.fn();
        render(<StepValence data={defaultData} updateData={updateData} onNext={vi.fn()} />);
        fireEvent.change(screen.getByRole('slider'), { target: { value: '8' } });
        expect(updateData).toHaveBeenCalledWith({ valence: 8 });
    });

    it('should render Next button', () => {
        render(<StepValence data={defaultData} updateData={vi.fn()} onNext={vi.fn()} />);
        expect(screen.getByText('Next')).toBeInTheDocument();
    });

    it('should call onNext when Next clicked', () => {
        const onNext = vi.fn();
        render(<StepValence data={defaultData} updateData={vi.fn()} onNext={onNext} />);
        fireEvent.click(screen.getByText('Next'));
        expect(onNext).toHaveBeenCalledTimes(1);
    });

    it('should render bloom visualization', () => {
        render(<StepValence data={defaultData} updateData={vi.fn()} onNext={vi.fn()} />);
        expect(screen.getByTestId('bloom-viz')).toBeInTheDocument();
    });
});
