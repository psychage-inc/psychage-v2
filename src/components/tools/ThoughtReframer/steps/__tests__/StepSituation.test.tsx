import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { StepSituation } from '../StepSituation';

const makeData = (overrides = {}) => ({
    id: '1',
    createdAt: '2026-03-06T00:00:00Z',
    mode: 'guided' as const,
    situation: '',
    emotions: [],
    automaticThought: '',
    distortions: [],
    evidenceFor: '',
    evidenceAgainst: '',
    balancedThought: '',
    emotionsAfter: [],
    completed: false,
    ...overrides,
});

describe('StepSituation', () => {
    it('should render heading and instructions', () => {
        render(<StepSituation data={makeData()} updateData={vi.fn()} onNext={vi.fn()} />);
        expect(screen.getByText('What happened?')).toBeInTheDocument();
        expect(screen.getByText(/briefly describe the situation/i)).toBeInTheDocument();
    });

    it('should render textarea with aria-label', () => {
        render(<StepSituation data={makeData()} updateData={vi.fn()} onNext={vi.fn()} />);
        expect(screen.getByLabelText('Describe the triggering situation')).toBeInTheDocument();
    });

    it('should call updateData on textarea change', () => {
        const updateData = vi.fn();
        render(<StepSituation data={makeData()} updateData={updateData} onNext={vi.fn()} />);
        fireEvent.change(screen.getByLabelText('Describe the triggering situation'), {
            target: { value: 'Something happened' },
        });
        expect(updateData).toHaveBeenCalledWith({ situation: 'Something happened' });
    });

    it('should not allow input exceeding 500 chars', () => {
        const updateData = vi.fn();
        render(<StepSituation data={makeData()} updateData={updateData} onNext={vi.fn()} />);
        const longText = 'a'.repeat(501);
        fireEvent.change(screen.getByLabelText('Describe the triggering situation'), {
            target: { value: longText },
        });
        expect(updateData).not.toHaveBeenCalled();
    });

    it('should show char count', () => {
        render(<StepSituation data={makeData({ situation: 'Hello' })} updateData={vi.fn()} onNext={vi.fn()} />);
        expect(screen.getByText('5/500')).toBeInTheDocument();
    });

    it('should disable Next when situation is empty', () => {
        render(<StepSituation data={makeData()} updateData={vi.fn()} onNext={vi.fn()} />);
        expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
    });

    it('should enable Next when situation has content', () => {
        render(<StepSituation data={makeData({ situation: 'Some event' })} updateData={vi.fn()} onNext={vi.fn()} />);
        expect(screen.getByRole('button', { name: 'Next' })).not.toBeDisabled();
    });

    it('should call onNext when Next clicked', () => {
        const onNext = vi.fn();
        render(<StepSituation data={makeData({ situation: 'Some event' })} updateData={vi.fn()} onNext={onNext} />);
        fireEvent.click(screen.getByRole('button', { name: 'Next' }));
        expect(onNext).toHaveBeenCalledOnce();
    });

    it('should toggle example visibility', () => {
        render(<StepSituation data={makeData()} updateData={vi.fn()} onNext={vi.fn()} />);
        expect(screen.queryByText(/my manager gave critical feedback/i)).not.toBeInTheDocument();
        fireEvent.click(screen.getByText('See an example'));
        expect(screen.getByText(/my manager gave critical feedback/i)).toBeInTheDocument();
    });

    it('should toggle why this matters', () => {
        render(<StepSituation data={makeData()} updateData={vi.fn()} onNext={vi.fn()} />);
        expect(screen.queryByText(/pinpointing the exact moment/i)).not.toBeInTheDocument();
        fireEvent.click(screen.getByText('Why this matters'));
        expect(screen.getByText(/pinpointing the exact moment/i)).toBeInTheDocument();
    });
});
