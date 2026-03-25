 
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { StepEmotions } from '../StepEmotions';

const makeData = (overrides = {}) => ({
    valence: 5,
    emotions: [] as string[],
    impactAreas: [],
    note: '',
    ...overrides,
});

describe('StepEmotions', () => {
    it('should render heading', () => {
        render(<StepEmotions data={makeData()} updateData={vi.fn()} onNext={vi.fn()} />);
        expect(screen.getByText(/what best describes this feeling/i)).toBeInTheDocument();
    });

    it('should render all 12 emotion chips', () => {
        render(<StepEmotions data={makeData()} updateData={vi.fn()} onNext={vi.fn()} />);
        ['Happy', 'Calm', 'Grateful', 'Excited', 'Proud', 'Relaxed',
         'Anxious', 'Stressed', 'Tired', 'Sad', 'Angry', 'Lonely'].forEach(e => {
            expect(screen.getByText(e)).toBeInTheDocument();
        });
    });

    it('should toggle emotion selection on click', () => {
        const updateData = vi.fn();
        render(<StepEmotions data={makeData()} updateData={updateData} onNext={vi.fn()} />);
        fireEvent.click(screen.getByText('Happy'));
        expect(updateData).toHaveBeenCalledWith({ emotions: ['Happy'] });
    });

    it('should deselect already selected emotion', () => {
        const updateData = vi.fn();
        render(<StepEmotions data={makeData({ emotions: ['Happy'] })} updateData={updateData} onNext={vi.fn()} />);
        fireEvent.click(screen.getByText('Happy'));
        expect(updateData).toHaveBeenCalledWith({ emotions: [] });
    });

    it('should disable Next when no emotions selected', () => {
        render(<StepEmotions data={makeData()} updateData={vi.fn()} onNext={vi.fn()} />);
        expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
    });

    it('should enable Next when emotions selected', () => {
        render(<StepEmotions data={makeData({ emotions: ['Calm'] })} updateData={vi.fn()} onNext={vi.fn()} />);
        expect(screen.getByRole('button', { name: 'Next' })).not.toBeDisabled();
    });

    it('should call onNext when Next clicked', () => {
        const onNext = vi.fn();
        render(<StepEmotions data={makeData({ emotions: ['Calm'] })} updateData={vi.fn()} onNext={onNext} />);
        fireEvent.click(screen.getByRole('button', { name: 'Next' }));
        expect(onNext).toHaveBeenCalledOnce();
    });
});
