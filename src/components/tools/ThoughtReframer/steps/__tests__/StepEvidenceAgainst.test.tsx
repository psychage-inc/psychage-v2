import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { StepEvidenceAgainst } from '../StepEvidenceAgainst';
import { SOCRATIC_PROMPTS } from '../../types';

const makeData = (overrides = {}) => ({
    id: '1',
    createdAt: '2026-03-06T00:00:00Z',
    mode: 'guided' as const,
    situation: 'Test situation',
    emotions: [{ name: 'Anxious', intensity: 70 }],
    automaticThought: 'I am terrible at my job',
    distortions: ['labeling'],
    evidenceFor: 'Boss criticized me',
    evidenceAgainst: '',
    balancedThought: '',
    emotionsAfter: [],
    completed: false,
    ...overrides,
});

describe('StepEvidenceAgainst', () => {
    it('should render heading', () => {
        render(<StepEvidenceAgainst data={makeData()} updateData={vi.fn()} onNext={vi.fn()} />);
        expect(screen.getByText('What contradicts this thought?')).toBeInTheDocument();
    });

    it('should display the automatic thought as reference', () => {
        render(<StepEvidenceAgainst data={makeData()} updateData={vi.fn()} onNext={vi.fn()} />);
        expect(screen.getByText(/I am terrible at my job/i)).toBeInTheDocument();
    });

    it('should render first 3 Socratic prompts', () => {
        render(<StepEvidenceAgainst data={makeData()} updateData={vi.fn()} onNext={vi.fn()} />);
        SOCRATIC_PROMPTS.slice(0, 3).forEach(prompt => {
            expect(screen.getByText(prompt)).toBeInTheDocument();
        });
    });

    it('should rotate prompts when More clicked', () => {
        render(<StepEvidenceAgainst data={makeData()} updateData={vi.fn()} onNext={vi.fn()} />);
        // Initially shows first 3
        expect(screen.getByText(SOCRATIC_PROMPTS[0])).toBeInTheDocument();

        fireEvent.click(screen.getByText('More'));

        // After rotation, shows next 3
        expect(screen.getByText(SOCRATIC_PROMPTS[3])).toBeInTheDocument();
    });

    it('should insert Socratic prompt into textarea', () => {
        const updateData = vi.fn();
        render(<StepEvidenceAgainst data={makeData()} updateData={updateData} onNext={vi.fn()} />);
        fireEvent.click(screen.getByText(SOCRATIC_PROMPTS[0]));
        expect(updateData).toHaveBeenCalledWith({
            evidenceAgainst: SOCRATIC_PROMPTS[0] + '\n',
        });
    });

    it('should render textarea with aria-label', () => {
        render(<StepEvidenceAgainst data={makeData()} updateData={vi.fn()} onNext={vi.fn()} />);
        expect(screen.getByLabelText('Evidence contradicting the thought')).toBeInTheDocument();
    });

    it('should call updateData on input', () => {
        const updateData = vi.fn();
        render(<StepEvidenceAgainst data={makeData()} updateData={updateData} onNext={vi.fn()} />);
        fireEvent.change(screen.getByLabelText('Evidence contradicting the thought'), {
            target: { value: 'I got a raise last month' },
        });
        expect(updateData).toHaveBeenCalledWith({ evidenceAgainst: 'I got a raise last month' });
    });

    it('should not allow input exceeding 500 chars', () => {
        const updateData = vi.fn();
        render(<StepEvidenceAgainst data={makeData()} updateData={updateData} onNext={vi.fn()} />);
        fireEvent.change(screen.getByLabelText('Evidence contradicting the thought'), {
            target: { value: 'a'.repeat(501) },
        });
        expect(updateData).not.toHaveBeenCalled();
    });

    it('should disable Next when evidence is empty', () => {
        render(<StepEvidenceAgainst data={makeData()} updateData={vi.fn()} onNext={vi.fn()} />);
        expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
    });

    it('should enable Next when evidence has content', () => {
        render(<StepEvidenceAgainst data={makeData({ evidenceAgainst: 'Some counter-evidence' })} updateData={vi.fn()} onNext={vi.fn()} />);
        expect(screen.getByRole('button', { name: 'Next' })).not.toBeDisabled();
    });

    it('should toggle why this matters', () => {
        render(<StepEvidenceAgainst data={makeData()} updateData={vi.fn()} onNext={vi.fn()} />);
        expect(screen.queryByText(/friend test/i)).not.toBeInTheDocument();
        fireEvent.click(screen.getByText('Why this matters'));
        expect(screen.getByText(/friend test/i)).toBeInTheDocument();
    });
});
