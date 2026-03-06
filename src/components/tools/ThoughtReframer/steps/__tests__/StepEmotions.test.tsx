import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { StepEmotions } from '../StepEmotions';
import { EMOTION_PRESETS } from '../../types';

const makeData = (overrides = {}) => ({
    id: '1',
    createdAt: '2026-03-06T00:00:00Z',
    mode: 'guided' as const,
    situation: 'Test situation',
    emotions: [] as { name: string; intensity: number }[],
    automaticThought: '',
    distortions: [],
    evidenceFor: '',
    evidenceAgainst: '',
    balancedThought: '',
    emotionsAfter: [],
    completed: false,
    ...overrides,
});

describe('StepEmotions', () => {
    it('should render heading', () => {
        render(<StepEmotions data={makeData()} updateData={vi.fn()} onNext={vi.fn()} />);
        expect(screen.getByText('How did you feel?')).toBeInTheDocument();
    });

    it('should render all emotion presets', () => {
        render(<StepEmotions data={makeData()} updateData={vi.fn()} onNext={vi.fn()} />);
        EMOTION_PRESETS.forEach(emotion => {
            expect(screen.getByText(emotion)).toBeInTheDocument();
        });
    });

    it('should toggle emotion selection', () => {
        const updateData = vi.fn();
        render(<StepEmotions data={makeData()} updateData={updateData} onNext={vi.fn()} />);
        fireEvent.click(screen.getByText('Anxious'));
        expect(updateData).toHaveBeenCalledWith({
            emotions: [{ name: 'Anxious', intensity: 50 }],
        });
    });

    it('should deselect already selected emotion', () => {
        const updateData = vi.fn();
        const data = makeData({ emotions: [{ name: 'Anxious', intensity: 50 }] });
        render(<StepEmotions data={data} updateData={updateData} onNext={vi.fn()} />);
        // Click the preset chip (aria-pressed button), not the intensity label
        fireEvent.click(screen.getByRole('button', { name: 'Anxious' }));
        expect(updateData).toHaveBeenCalledWith({ emotions: [] });
    });

    it('should use aria-pressed for selected emotions', () => {
        const data = makeData({ emotions: [{ name: 'Sad', intensity: 50 }] });
        render(<StepEmotions data={data} updateData={vi.fn()} onNext={vi.fn()} />);
        // Use getAllByText and find the button with aria-pressed
        const sadButtons = screen.getAllByText('Sad');
        const sadChip = sadButtons.find(el => el.closest('button[aria-pressed]'));
        expect(sadChip?.closest('button')).toHaveAttribute('aria-pressed', 'true');
        expect(screen.getByRole('button', { name: 'Angry' })).toHaveAttribute('aria-pressed', 'false');
    });

    it('should limit to 5 emotions max', () => {
        const updateData = vi.fn();
        const five = ['A', 'B', 'C', 'D', 'E'].map(n => ({ name: n, intensity: 50 }));
        const data = makeData({ emotions: five });
        render(<StepEmotions data={data} updateData={updateData} onNext={vi.fn()} />);
        fireEvent.click(screen.getByText('Anxious'));
        expect(updateData).not.toHaveBeenCalled();
    });

    it('should add custom emotion', () => {
        const updateData = vi.fn();
        render(<StepEmotions data={makeData()} updateData={updateData} onNext={vi.fn()} />);
        fireEvent.change(screen.getByLabelText('Add custom emotion'), {
            target: { value: 'Nostalgic' },
        });
        fireEvent.click(screen.getByLabelText('Add emotion'));
        expect(updateData).toHaveBeenCalledWith({
            emotions: [{ name: 'Nostalgic', intensity: 50 }],
        });
    });

    it('should add custom emotion on Enter key', () => {
        const updateData = vi.fn();
        render(<StepEmotions data={makeData()} updateData={updateData} onNext={vi.fn()} />);
        const input = screen.getByLabelText('Add custom emotion');
        fireEvent.change(input, { target: { value: 'Nostalgic' } });
        fireEvent.keyDown(input, { key: 'Enter' });
        expect(updateData).toHaveBeenCalled();
    });

    it('should show intensity sliders for selected emotions', () => {
        const data = makeData({ emotions: [{ name: 'Anxious', intensity: 60 }] });
        render(<StepEmotions data={data} updateData={vi.fn()} onNext={vi.fn()} />);
        expect(screen.getByText('Rate each emotion\'s intensity:')).toBeInTheDocument();
        expect(screen.getByLabelText(/anxious intensity: 60 out of 100/i)).toBeInTheDocument();
    });

    it('should update intensity via slider', () => {
        const updateData = vi.fn();
        const data = makeData({ emotions: [{ name: 'Anxious', intensity: 50 }] });
        render(<StepEmotions data={data} updateData={updateData} onNext={vi.fn()} />);
        fireEvent.change(screen.getByLabelText(/anxious intensity/i), {
            target: { value: '75' },
        });
        expect(updateData).toHaveBeenCalledWith({
            emotions: [{ name: 'Anxious', intensity: 75 }],
        });
    });

    it('should disable Next when no emotions selected', () => {
        render(<StepEmotions data={makeData()} updateData={vi.fn()} onNext={vi.fn()} />);
        expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
    });

    it('should enable Next when emotions selected', () => {
        const data = makeData({ emotions: [{ name: 'Sad', intensity: 50 }] });
        render(<StepEmotions data={data} updateData={vi.fn()} onNext={vi.fn()} />);
        expect(screen.getByRole('button', { name: 'Next' })).not.toBeDisabled();
    });

    it('should toggle why this matters', () => {
        render(<StepEmotions data={makeData()} updateData={vi.fn()} onNext={vi.fn()} />);
        expect(screen.queryByText(/affect labeling/i)).not.toBeInTheDocument();
        fireEvent.click(screen.getByText('Why this matters'));
        expect(screen.getByText(/affect labeling/i)).toBeInTheDocument();
    });
});
