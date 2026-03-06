import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import SectionCard from '../SectionCard';
import type { SectionMeta } from '../../constants';

const mockSection: SectionMeta = {
    id: 'daily-checkin',
    title: 'Daily Check-In',
    subtitle: 'The weather check for your mind',
    description: 'Rate your mood, note your sleep, and write one sentence.',
    icon: 'Sun',
    frequency: 'Every day',
    time: '2-5 min',
    route: '/tools/clarity-journal/daily-checkin',
};

const renderWithRouter = (ui: React.ReactElement) =>
    render(<MemoryRouter>{ui}</MemoryRouter>);

describe('SectionCard', () => {
    it('should render section title', () => {
        renderWithRouter(<SectionCard section={mockSection} />);
        expect(screen.getByText('Daily Check-In')).toBeInTheDocument();
    });

    it('should render section description', () => {
        renderWithRouter(<SectionCard section={mockSection} />);
        expect(screen.getByText(/rate your mood/i)).toBeInTheDocument();
    });

    it('should render frequency', () => {
        renderWithRouter(<SectionCard section={mockSection} />);
        expect(screen.getByText('Every day')).toBeInTheDocument();
    });

    it('should link to section route', () => {
        renderWithRouter(<SectionCard section={mockSection} />);
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', '/tools/clarity-journal/daily-checkin');
    });

    it('should show lastEntry when provided', () => {
        renderWithRouter(<SectionCard section={mockSection} lastEntry="Mar 5" />);
        expect(screen.getByText('Mar 5')).toBeInTheDocument();
    });

    it('should show Not started when no lastEntry', () => {
        renderWithRouter(<SectionCard section={mockSection} />);
        expect(screen.getByText('Not started')).toBeInTheDocument();
    });
});
