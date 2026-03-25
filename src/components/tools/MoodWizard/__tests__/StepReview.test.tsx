 
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { StepReview } from '../StepReview';

describe('StepReview', () => {
    const defaultData = {
        valence: 3,
        emotions: ['Anxious', 'Sad'],
        impactAreas: ['Work', 'Sleep'],
        note: 'Felt overwhelmed today',
    };

    it('should render review heading', () => {
        render(<StepReview data={defaultData} onSave={vi.fn()} />);
        expect(screen.getByText(/review your entry/i)).toBeInTheDocument();
    });

    it('should display valence label', () => {
        render(<StepReview data={defaultData} onSave={vi.fn()} />);
        expect(screen.getByText('Unpleasant')).toBeInTheDocument();
    });

    it('should display selected emotions', () => {
        render(<StepReview data={defaultData} onSave={vi.fn()} />);
        expect(screen.getByText('Anxious')).toBeInTheDocument();
        expect(screen.getByText('Sad')).toBeInTheDocument();
    });

    it('should display impact areas', () => {
        render(<StepReview data={defaultData} onSave={vi.fn()} />);
        expect(screen.getByText('Work')).toBeInTheDocument();
        expect(screen.getByText('Sleep')).toBeInTheDocument();
    });

    it('should display note when provided', () => {
        render(<StepReview data={defaultData} onSave={vi.fn()} />);
        expect(screen.getByText(/felt overwhelmed today/i)).toBeInTheDocument();
    });

    it('should not display note section when empty', () => {
        render(<StepReview data={{ ...defaultData, note: '' }} onSave={vi.fn()} />);
        expect(screen.queryByText('Context')).not.toBeInTheDocument();
    });

    it('should not display emotions section when empty', () => {
        render(<StepReview data={{ ...defaultData, emotions: [] }} onSave={vi.fn()} />);
        expect(screen.queryByText('Emotions')).not.toBeInTheDocument();
    });

    it('should render Save Entry button', () => {
        render(<StepReview data={defaultData} onSave={vi.fn()} />);
        expect(screen.getByText('Save Entry')).toBeInTheDocument();
    });

    it('should call onSave when Save Entry clicked', () => {
        const onSave = vi.fn();
        render(<StepReview data={defaultData} onSave={onSave} />);
        fireEvent.click(screen.getByText('Save Entry'));
        expect(onSave).toHaveBeenCalledTimes(1);
    });
});
