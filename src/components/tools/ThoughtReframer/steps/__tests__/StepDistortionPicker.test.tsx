import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { StepDistortionPicker } from '../StepDistortionPicker';
import { COGNITIVE_DISTORTIONS } from '../../types';

const makeData = (overrides = {}) => ({
    id: '1',
    createdAt: '2026-03-06T00:00:00Z',
    mode: 'guided' as const,
    situation: 'Test situation',
    emotions: [{ name: 'Anxious', intensity: 70 }],
    automaticThought: 'I am terrible at my job',
    distortions: [] as string[],
    evidenceFor: '',
    evidenceAgainst: '',
    balancedThought: '',
    emotionsAfter: [],
    completed: false,
    ...overrides,
});

describe('StepDistortionPicker', () => {
    it('should render heading', () => {
        render(<StepDistortionPicker data={makeData()} updateData={vi.fn()} onNext={vi.fn()} onOpenLibrary={vi.fn()} />);
        expect(screen.getByText('What thinking pattern might this be?')).toBeInTheDocument();
    });

    it('should render all cognitive distortions', () => {
        render(<StepDistortionPicker data={makeData()} updateData={vi.fn()} onNext={vi.fn()} onOpenLibrary={vi.fn()} />);
        COGNITIVE_DISTORTIONS.forEach(d => {
            expect(screen.getByText(d.name)).toBeInTheDocument();
        });
    });

    it('should display the automatic thought as reference', () => {
        render(<StepDistortionPicker data={makeData()} updateData={vi.fn()} onNext={vi.fn()} onOpenLibrary={vi.fn()} />);
        expect(screen.getByText(/I am terrible at my job/i)).toBeInTheDocument();
    });

    it('should toggle distortion selection', () => {
        const updateData = vi.fn();
        render(<StepDistortionPicker data={makeData()} updateData={updateData} onNext={vi.fn()} onOpenLibrary={vi.fn()} />);
        fireEvent.click(screen.getByText('All-or-Nothing Thinking'));
        expect(updateData).toHaveBeenCalledWith({ distortions: ['all-or-nothing'] });
    });

    it('should deselect already selected distortion', () => {
        const updateData = vi.fn();
        const data = makeData({ distortions: ['labeling'] });
        render(<StepDistortionPicker data={data} updateData={updateData} onNext={vi.fn()} onOpenLibrary={vi.fn()} />);
        fireEvent.click(screen.getByText('Labeling'));
        expect(updateData).toHaveBeenCalledWith({ distortions: [] });
    });

    it('should limit to 4 distortions', () => {
        const updateData = vi.fn();
        const data = makeData({ distortions: ['a', 'b', 'c', 'd'] });
        render(<StepDistortionPicker data={data} updateData={updateData} onNext={vi.fn()} onOpenLibrary={vi.fn()} />);
        fireEvent.click(screen.getByText('Labeling'));
        expect(updateData).not.toHaveBeenCalled();
    });

    it('should use aria-pressed for selected distortions', () => {
        const data = makeData({ distortions: ['labeling'] });
        render(<StepDistortionPicker data={data} updateData={vi.fn()} onNext={vi.fn()} onOpenLibrary={vi.fn()} />);
        expect(screen.getByText('Labeling').closest('button')).toHaveAttribute('aria-pressed', 'true');
        expect(screen.getByText('Blame').closest('button')).toHaveAttribute('aria-pressed', 'false');
    });

    it('should show selection count', () => {
        const data = makeData({ distortions: ['labeling', 'blame'] });
        render(<StepDistortionPicker data={data} updateData={vi.fn()} onNext={vi.fn()} onOpenLibrary={vi.fn()} />);
        expect(screen.getByText('Selected: 2/4')).toBeInTheDocument();
    });

    it('should call onOpenLibrary when library link clicked', () => {
        const onOpenLibrary = vi.fn();
        render(<StepDistortionPicker data={makeData()} updateData={vi.fn()} onNext={vi.fn()} onOpenLibrary={onOpenLibrary} />);
        fireEvent.click(screen.getByText('View all distortions in detail'));
        expect(onOpenLibrary).toHaveBeenCalledOnce();
    });

    it('should disable Next when no distortions selected', () => {
        render(<StepDistortionPicker data={makeData()} updateData={vi.fn()} onNext={vi.fn()} onOpenLibrary={vi.fn()} />);
        expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
    });

    it('should enable Next when distortions selected', () => {
        const data = makeData({ distortions: ['labeling'] });
        render(<StepDistortionPicker data={data} updateData={vi.fn()} onNext={vi.fn()} onOpenLibrary={vi.fn()} />);
        expect(screen.getByRole('button', { name: 'Next' })).not.toBeDisabled();
    });

    it('should toggle why this matters', () => {
        render(<StepDistortionPicker data={makeData()} updateData={vi.fn()} onNext={vi.fn()} onOpenLibrary={vi.fn()} />);
        expect(screen.queryByText(/cognitive distortions/i)).not.toBeInTheDocument();
        fireEvent.click(screen.getByText('Why this matters'));
        expect(screen.getByText(/cognitive distortions.*optical illusions/i)).toBeInTheDocument();
    });
});
