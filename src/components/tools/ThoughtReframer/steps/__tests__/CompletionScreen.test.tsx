import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { CompletionScreen } from '../CompletionScreen';
import type { ThoughtRecord } from '../../types';

const renderWithRouter = (ui: React.ReactElement) =>
    render(<MemoryRouter>{ui}</MemoryRouter>);

const mockData: ThoughtRecord = {
    id: '1',
    createdAt: new Date().toISOString(),
    mode: 'guided',
    situation: 'Failed a job interview',
    emotions: [{ name: 'Anxious', intensity: 80 }, { name: 'Sad', intensity: 60 }],
    automaticThought: 'I will never get a job',
    distortions: ['all-or-nothing', 'overgeneralization'],
    evidenceFor: 'I did not get this job',
    evidenceAgainst: 'I have gotten jobs before',
    balancedThought: 'This interview did not go well but I can improve',
    emotionsAfter: [{ name: 'Anxious', intensity: 40 }, { name: 'Sad', intensity: 30 }],
    completed: true,
};

describe('CompletionScreen', () => {
    const defaultProps = {
        data: mockData,
        onSave: vi.fn(),
        onStartAnother: vi.fn(),
        saved: false,
    };

    it('should render success heading', () => {
        renderWithRouter(<CompletionScreen {...defaultProps} />);
        expect(screen.getByText('Nice work')).toBeInTheDocument();
    });

    it('should display situation', () => {
        renderWithRouter(<CompletionScreen {...defaultProps} />);
        expect(screen.getByText('Failed a job interview')).toBeInTheDocument();
    });

    it('should display original thought', () => {
        renderWithRouter(<CompletionScreen {...defaultProps} />);
        expect(screen.getByText(/I will never get a job/)).toBeInTheDocument();
    });

    it('should display balanced thought', () => {
        renderWithRouter(<CompletionScreen {...defaultProps} />);
        expect(screen.getByText(/can improve/)).toBeInTheDocument();
    });

    it('should display distortion names', () => {
        renderWithRouter(<CompletionScreen {...defaultProps} />);
        expect(screen.getByText('All-or-Nothing Thinking')).toBeInTheDocument();
        expect(screen.getByText('Overgeneralization')).toBeInTheDocument();
    });

    it('should show Save to My History when not saved', () => {
        renderWithRouter(<CompletionScreen {...defaultProps} />);
        expect(screen.getByText('Save to My History')).toBeInTheDocument();
    });

    it('should call onSave when save button clicked', () => {
        const onSave = vi.fn();
        renderWithRouter(<CompletionScreen {...defaultProps} onSave={onSave} />);
        fireEvent.click(screen.getByText('Save to My History'));
        expect(onSave).toHaveBeenCalledTimes(1);
    });

    it('should show Saved state when saved is true', () => {
        renderWithRouter(<CompletionScreen {...defaultProps} saved={true} />);
        expect(screen.getByText('Saved')).toBeInTheDocument();
        expect(screen.queryByText('Save to My History')).not.toBeInTheDocument();
    });

    it('should render Start Another button', () => {
        renderWithRouter(<CompletionScreen {...defaultProps} />);
        expect(screen.getByText('Start Another')).toBeInTheDocument();
    });

    it('should call onStartAnother when clicked', () => {
        const onStartAnother = vi.fn();
        renderWithRouter(<CompletionScreen {...defaultProps} onStartAnother={onStartAnother} />);
        fireEvent.click(screen.getByText('Start Another'));
        expect(onStartAnother).toHaveBeenCalledTimes(1);
    });

    it('should display emotional shift data', () => {
        renderWithRouter(<CompletionScreen {...defaultProps} />);
        expect(screen.getByText('Anxious')).toBeInTheDocument();
        expect(screen.getByText('Sad')).toBeInTheDocument();
    });

    it('should link to Explore Other Tools', () => {
        renderWithRouter(<CompletionScreen {...defaultProps} />);
        const link = screen.getByRole('link', { name: /explore other tools/i });
        expect(link).toHaveAttribute('href', '/tools');
    });

    it('should show educational disclaimer with crisis link', () => {
        renderWithRouter(<CompletionScreen {...defaultProps} />);
        expect(screen.getAllByRole('link', { name: /crisis support/i }).length).toBeGreaterThan(0);
    });
});
