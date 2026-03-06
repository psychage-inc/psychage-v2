import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { StepImpact } from '../StepImpact';

const makeData = (overrides = {}) => ({
    valence: 5,
    emotions: ['Happy'],
    impactAreas: [] as string[],
    note: '',
    ...overrides,
});

describe('StepImpact', () => {
    it('should render heading', () => {
        render(<StepImpact data={makeData()} updateData={vi.fn()} onNext={vi.fn()} />);
        expect(screen.getByText(/biggest impact on you/i)).toBeInTheDocument();
    });

    it('should render all 9 impact area chips', () => {
        render(<StepImpact data={makeData()} updateData={vi.fn()} onNext={vi.fn()} />);
        ['Work', 'Family', 'Relationships', 'Health', 'Sleep', 'Hobbies', 'Weather', 'Finances', 'News'].forEach(area => {
            expect(screen.getByText(area)).toBeInTheDocument();
        });
    });

    it('should toggle impact area selection', () => {
        const updateData = vi.fn();
        render(<StepImpact data={makeData()} updateData={updateData} onNext={vi.fn()} />);
        fireEvent.click(screen.getByText('Work'));
        expect(updateData).toHaveBeenCalledWith({ impactAreas: ['Work'] });
    });

    it('should deselect already selected impact area', () => {
        const updateData = vi.fn();
        render(<StepImpact data={makeData({ impactAreas: ['Work'] })} updateData={updateData} onNext={vi.fn()} />);
        fireEvent.click(screen.getByText('Work'));
        expect(updateData).toHaveBeenCalledWith({ impactAreas: [] });
    });

    it('should render note textarea', () => {
        render(<StepImpact data={makeData()} updateData={vi.fn()} onNext={vi.fn()} />);
        expect(screen.getByLabelText('Additional Context')).toBeInTheDocument();
    });

    it('should call updateData on note change', () => {
        const updateData = vi.fn();
        render(<StepImpact data={makeData()} updateData={updateData} onNext={vi.fn()} />);
        fireEvent.change(screen.getByLabelText('Additional Context'), {
            target: { value: 'Some context' },
        });
        expect(updateData).toHaveBeenCalledWith({ note: 'Some context' });
    });

    it('should disable Next when no impact areas selected', () => {
        render(<StepImpact data={makeData()} updateData={vi.fn()} onNext={vi.fn()} />);
        expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
    });

    it('should enable Next when impact areas selected', () => {
        render(<StepImpact data={makeData({ impactAreas: ['Health'] })} updateData={vi.fn()} onNext={vi.fn()} />);
        expect(screen.getByRole('button', { name: 'Next' })).not.toBeDisabled();
    });
});
