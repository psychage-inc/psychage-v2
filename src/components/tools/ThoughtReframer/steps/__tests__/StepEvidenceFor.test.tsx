import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { StepEvidenceFor } from '../StepEvidenceFor';

const makeData = (overrides = {}) => ({
    id: '1',
    createdAt: '2026-03-06T00:00:00Z',
    mode: 'guided' as const,
    situation: 'Test situation',
    emotions: [{ name: 'Anxious', intensity: 70 }],
    automaticThought: 'I am terrible at my job',
    distortions: ['labeling'],
    evidenceFor: '',
    evidenceAgainst: '',
    balancedThought: '',
    emotionsAfter: [],
    completed: false,
    ...overrides,
});

describe('StepEvidenceFor', () => {
    it('should render heading', () => {
        render(<StepEvidenceFor data={makeData()} updateData={vi.fn()} onNext={vi.fn()} />);
        expect(screen.getByText('What supports this thought?')).toBeInTheDocument();
    });

    it('should display the automatic thought as reference', () => {
        render(<StepEvidenceFor data={makeData()} updateData={vi.fn()} onNext={vi.fn()} />);
        expect(screen.getByText(/I am terrible at my job/i)).toBeInTheDocument();
    });

    it('should render textarea with aria-label', () => {
        render(<StepEvidenceFor data={makeData()} updateData={vi.fn()} onNext={vi.fn()} />);
        expect(screen.getByLabelText('Evidence supporting the thought')).toBeInTheDocument();
    });

    it('should call updateData on input', () => {
        const updateData = vi.fn();
        render(<StepEvidenceFor data={makeData()} updateData={updateData} onNext={vi.fn()} />);
        fireEvent.change(screen.getByLabelText('Evidence supporting the thought'), {
            target: { value: 'My boss said something critical' },
        });
        expect(updateData).toHaveBeenCalledWith({ evidenceFor: 'My boss said something critical' });
    });

    it('should not allow input exceeding 500 chars', () => {
        const updateData = vi.fn();
        render(<StepEvidenceFor data={makeData()} updateData={updateData} onNext={vi.fn()} />);
        fireEvent.change(screen.getByLabelText('Evidence supporting the thought'), {
            target: { value: 'a'.repeat(501) },
        });
        expect(updateData).not.toHaveBeenCalled();
    });

    it('should show char count', () => {
        render(<StepEvidenceFor data={makeData({ evidenceFor: 'facts' })} updateData={vi.fn()} onNext={vi.fn()} />);
        expect(screen.getByText('5/500')).toBeInTheDocument();
    });

    it('should disable Next when evidence is empty', () => {
        render(<StepEvidenceFor data={makeData()} updateData={vi.fn()} onNext={vi.fn()} />);
        expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
    });

    it('should enable Next when evidence has content', () => {
        render(<StepEvidenceFor data={makeData({ evidenceFor: 'Some evidence' })} updateData={vi.fn()} onNext={vi.fn()} />);
        expect(screen.getByRole('button', { name: 'Next' })).not.toBeDisabled();
    });

    it('should call onNext when clicked', () => {
        const onNext = vi.fn();
        render(<StepEvidenceFor data={makeData({ evidenceFor: 'Some evidence' })} updateData={vi.fn()} onNext={onNext} />);
        fireEvent.click(screen.getByRole('button', { name: 'Next' }));
        expect(onNext).toHaveBeenCalledOnce();
    });

    it('should toggle why this matters', () => {
        render(<StepEvidenceFor data={makeData()} updateData={vi.fn()} onNext={vi.fn()} />);
        expect(screen.queryByText(/not here to dismiss/i)).not.toBeInTheDocument();
        fireEvent.click(screen.getByText('Why this matters'));
        expect(screen.getByText(/not here to dismiss/i)).toBeInTheDocument();
    });
});
