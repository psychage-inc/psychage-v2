import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { StepAutomaticThought } from '../StepAutomaticThought';

vi.mock('../../crisisDetection', () => ({
    scanForCrisisKeywords: vi.fn(() => ({ detected: false, matchedKeywords: [] })),
}));

import { scanForCrisisKeywords } from '../../crisisDetection';

const makeData = (overrides = {}) => ({
    id: '1',
    createdAt: '2026-03-06T00:00:00Z',
    mode: 'guided' as const,
    situation: 'Test situation',
    emotions: [{ name: 'Anxious', intensity: 70 }],
    automaticThought: '',
    distortions: [],
    evidenceFor: '',
    evidenceAgainst: '',
    balancedThought: '',
    emotionsAfter: [],
    completed: false,
    ...overrides,
});

describe('StepAutomaticThought', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('should render heading', () => {
        render(
            <StepAutomaticThought data={makeData()} updateData={vi.fn()} onNext={vi.fn()} onCrisisDetected={vi.fn()} />
        );
        expect(screen.getByText('What went through your mind?')).toBeInTheDocument();
    });

    it('should render textarea with aria-label', () => {
        render(
            <StepAutomaticThought data={makeData()} updateData={vi.fn()} onNext={vi.fn()} onCrisisDetected={vi.fn()} />
        );
        expect(screen.getByLabelText('Write your automatic thought')).toBeInTheDocument();
    });

    it('should call updateData on input', () => {
        const updateData = vi.fn();
        render(
            <StepAutomaticThought data={makeData()} updateData={updateData} onNext={vi.fn()} onCrisisDetected={vi.fn()} />
        );
        fireEvent.change(screen.getByLabelText('Write your automatic thought'), {
            target: { value: 'I am terrible' },
        });
        expect(updateData).toHaveBeenCalledWith({ automaticThought: 'I am terrible' });
    });

    it('should not allow input exceeding 300 chars', () => {
        const updateData = vi.fn();
        render(
            <StepAutomaticThought data={makeData()} updateData={updateData} onNext={vi.fn()} onCrisisDetected={vi.fn()} />
        );
        fireEvent.change(screen.getByLabelText('Write your automatic thought'), {
            target: { value: 'a'.repeat(301) },
        });
        expect(updateData).not.toHaveBeenCalled();
    });

    it('should show char count', () => {
        render(
            <StepAutomaticThought data={makeData({ automaticThought: 'Hello' })} updateData={vi.fn()} onNext={vi.fn()} onCrisisDetected={vi.fn()} />
        );
        expect(screen.getByText('5/300')).toBeInTheDocument();
    });

    it('should trigger crisis detection after debounce', () => {
        const onCrisisDetected = vi.fn();
        (scanForCrisisKeywords as ReturnType<typeof vi.fn>).mockReturnValue({ detected: true, matchedKeywords: ['suicide'] });

        render(
            <StepAutomaticThought data={makeData()} updateData={vi.fn()} onNext={vi.fn()} onCrisisDetected={onCrisisDetected} />
        );
        fireEvent.change(screen.getByLabelText('Write your automatic thought'), {
            target: { value: 'I want to commit suicide' },
        });

        // Not called yet (debounced 500ms)
        expect(onCrisisDetected).not.toHaveBeenCalled();

        act(() => {
            vi.advanceTimersByTime(500);
        });

        expect(scanForCrisisKeywords).toHaveBeenCalledWith('I want to commit suicide');
        expect(onCrisisDetected).toHaveBeenCalledOnce();
    });

    it('should not trigger crisis when no keywords detected', () => {
        const onCrisisDetected = vi.fn();
        (scanForCrisisKeywords as ReturnType<typeof vi.fn>).mockReturnValue({ detected: false, matchedKeywords: [] });

        render(
            <StepAutomaticThought data={makeData()} updateData={vi.fn()} onNext={vi.fn()} onCrisisDetected={onCrisisDetected} />
        );
        fireEvent.change(screen.getByLabelText('Write your automatic thought'), {
            target: { value: 'I feel sad today' },
        });

        act(() => {
            vi.advanceTimersByTime(500);
        });

        expect(onCrisisDetected).not.toHaveBeenCalled();
    });

    it('should disable Next when thought is empty', () => {
        render(
            <StepAutomaticThought data={makeData()} updateData={vi.fn()} onNext={vi.fn()} onCrisisDetected={vi.fn()} />
        );
        expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
    });

    it('should enable Next when thought has content', () => {
        render(
            <StepAutomaticThought data={makeData({ automaticThought: 'A thought' })} updateData={vi.fn()} onNext={vi.fn()} onCrisisDetected={vi.fn()} />
        );
        expect(screen.getByRole('button', { name: 'Next' })).not.toBeDisabled();
    });

    it('should toggle example visibility', () => {
        render(
            <StepAutomaticThought data={makeData()} updateData={vi.fn()} onNext={vi.fn()} onCrisisDetected={vi.fn()} />
        );
        expect(screen.queryByText(/I'm terrible at my job/i)).not.toBeInTheDocument();
        fireEvent.click(screen.getByText('See an example'));
        expect(screen.getByText(/I'm terrible at my job/i)).toBeInTheDocument();
    });

    it('should toggle why this matters', () => {
        render(
            <StepAutomaticThought data={makeData()} updateData={vi.fn()} onNext={vi.fn()} onCrisisDetected={vi.fn()} />
        );
        expect(screen.queryByText(/automatic thoughts/i)).not.toBeInTheDocument();
        fireEvent.click(screen.getByText('Why this matters'));
        expect(screen.getByText(/automatic thoughts.*happen so fast/i)).toBeInTheDocument();
    });
});
