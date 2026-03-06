import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { StepBalancedThought } from '../StepBalancedThought';

const makeData = (overrides = {}) => ({
    id: '1',
    createdAt: '2026-03-06T00:00:00Z',
    mode: 'guided' as const,
    situation: 'Test situation',
    emotions: [{ name: 'Anxious', intensity: 70 }],
    automaticThought: 'I am terrible at my job',
    distortions: ['labeling'],
    evidenceFor: 'Boss criticized me',
    evidenceAgainst: 'Got a raise last month',
    balancedThought: '',
    emotionsAfter: [] as { name: string; intensity: number }[],
    completed: false,
    ...overrides,
});

describe('StepBalancedThought', () => {
    it('should render heading', () => {
        render(<StepBalancedThought data={makeData()} updateData={vi.fn()} onNext={vi.fn()} />);
        expect(screen.getByText(/more balanced way to see this/i)).toBeInTheDocument();
    });

    it('should display the original thought', () => {
        render(<StepBalancedThought data={makeData()} updateData={vi.fn()} onNext={vi.fn()} />);
        expect(screen.getByText(/I am terrible at my job/i)).toBeInTheDocument();
    });

    it('should render balanced thought textarea with aria-label', () => {
        render(<StepBalancedThought data={makeData()} updateData={vi.fn()} onNext={vi.fn()} />);
        expect(screen.getByLabelText('Write your balanced thought')).toBeInTheDocument();
    });

    it('should call updateData on balanced thought input', () => {
        const updateData = vi.fn();
        render(<StepBalancedThought data={makeData()} updateData={updateData} onNext={vi.fn()} />);
        fireEvent.change(screen.getByLabelText('Write your balanced thought'), {
            target: { value: 'I got feedback on one area but I have strengths too' },
        });
        expect(updateData).toHaveBeenCalledWith({
            balancedThought: 'I got feedback on one area but I have strengths too',
        });
    });

    it('should not allow balanced thought exceeding 500 chars', () => {
        const updateData = vi.fn();
        // emotionsAfter pre-populated so useEffect init doesn't call updateData
        const data = makeData({ emotionsAfter: [{ name: 'Anxious', intensity: 70 }] });
        render(<StepBalancedThought data={data} updateData={updateData} onNext={vi.fn()} />);
        fireEvent.change(screen.getByLabelText('Write your balanced thought'), {
            target: { value: 'a'.repeat(501) },
        });
        expect(updateData).not.toHaveBeenCalled();
    });

    it('should initialize emotionsAfter from emotions on mount', () => {
        const updateData = vi.fn();
        render(<StepBalancedThought data={makeData()} updateData={updateData} onNext={vi.fn()} />);
        expect(updateData).toHaveBeenCalledWith({
            emotionsAfter: [{ name: 'Anxious', intensity: 70 }],
        });
    });

    it('should not re-initialize emotionsAfter if already populated', () => {
        const updateData = vi.fn();
        const data = makeData({ emotionsAfter: [{ name: 'Anxious', intensity: 40 }] });
        render(<StepBalancedThought data={data} updateData={updateData} onNext={vi.fn()} />);
        expect(updateData).not.toHaveBeenCalled();
    });

    it('should show emotion re-rating sliders when emotionsAfter populated', () => {
        const data = makeData({
            emotionsAfter: [{ name: 'Anxious', intensity: 40 }],
        });
        render(<StepBalancedThought data={data} updateData={vi.fn()} onNext={vi.fn()} />);
        expect(screen.getByText(/how do you feel now/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/anxious intensity after reframing: 40 out of 100/i)).toBeInTheDocument();
    });

    it('should show before/after intensity values', () => {
        const data = makeData({
            emotions: [{ name: 'Anxious', intensity: 70 }],
            emotionsAfter: [{ name: 'Anxious', intensity: 40 }],
        });
        render(<StepBalancedThought data={data} updateData={vi.fn()} onNext={vi.fn()} />);
        expect(screen.getByText('70% → 40%')).toBeInTheDocument();
    });

    it('should update emotionsAfter intensity via slider', () => {
        const updateData = vi.fn();
        const data = makeData({
            emotionsAfter: [{ name: 'Anxious', intensity: 40 }],
        });
        render(<StepBalancedThought data={data} updateData={updateData} onNext={vi.fn()} />);
        fireEvent.change(screen.getByLabelText(/anxious intensity after reframing/i), {
            target: { value: '25' },
        });
        expect(updateData).toHaveBeenCalledWith({
            emotionsAfter: [{ name: 'Anxious', intensity: 25 }],
        });
    });

    it('should toggle example visibility', () => {
        render(<StepBalancedThought data={makeData()} updateData={vi.fn()} onNext={vi.fn()} />);
        expect(screen.queryByText(/one area I can improve/i)).not.toBeInTheDocument();
        fireEvent.click(screen.getByText('See an example'));
        expect(screen.getByText(/one area I can improve/i)).toBeInTheDocument();
    });

    it('should disable Complete when balanced thought is empty', () => {
        render(<StepBalancedThought data={makeData()} updateData={vi.fn()} onNext={vi.fn()} />);
        expect(screen.getByRole('button', { name: 'Complete' })).toBeDisabled();
    });

    it('should enable Complete when balanced thought has content', () => {
        render(<StepBalancedThought data={makeData({ balancedThought: 'A balanced view' })} updateData={vi.fn()} onNext={vi.fn()} />);
        expect(screen.getByRole('button', { name: 'Complete' })).not.toBeDisabled();
    });

    it('should call onNext when Complete clicked', () => {
        const onNext = vi.fn();
        render(<StepBalancedThought data={makeData({ balancedThought: 'Balanced' })} updateData={vi.fn()} onNext={onNext} />);
        fireEvent.click(screen.getByRole('button', { name: 'Complete' }));
        expect(onNext).toHaveBeenCalledOnce();
    });

    it('should toggle why this matters', () => {
        render(<StepBalancedThought data={makeData()} updateData={vi.fn()} onNext={vi.fn()} />);
        expect(screen.queryByText(/toxic positivity/i)).not.toBeInTheDocument();
        fireEvent.click(screen.getByText('Why this matters'));
        expect(screen.getByText(/toxic positivity/i)).toBeInTheDocument();
    });
});
