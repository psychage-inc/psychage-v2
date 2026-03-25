 
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LightweightInsights } from '../LightweightInsights';

const mockEntries = [
    { id: '1', date: '2026-03-06', mood: 7, emotions: ['Happy', 'Calm'] },
    { id: '2', date: '2026-03-05', mood: 5, emotions: ['Anxious', 'Tired'] },
    { id: '3', date: '2026-03-04', mood: 8, emotions: ['Happy', 'Grateful'] },
    { id: '4', date: '2026-03-03', mood: 4, emotions: ['Sad'] },
];

describe('LightweightInsights', () => {
    it('should render Mood Trend heading', () => {
        render(<LightweightInsights entries={mockEntries} />);
        expect(screen.getByText('Mood Trend')).toBeInTheDocument();
    });

    it('should display total entry count', () => {
        render(<LightweightInsights entries={mockEntries} />);
        expect(screen.getByText('Total Entries')).toBeInTheDocument();
        // "4" appears multiple times (entry count + streak), so use getAllByText
        expect(screen.getAllByText('4').length).toBeGreaterThanOrEqual(1);
    });

    it('should display average mood', () => {
        render(<LightweightInsights entries={mockEntries} />);
        // (7+5+8+4)/4 = 6.0
        expect(screen.getByText('6.0')).toBeInTheDocument();
    });

    it('should display top emotions', () => {
        render(<LightweightInsights entries={mockEntries} />);
        expect(screen.getByText('Happy')).toBeInTheDocument();
        expect(screen.getByText('Calm')).toBeInTheDocument();
        expect(screen.getByText('Anxious')).toBeInTheDocument();
        expect(screen.getByText('Tired')).toBeInTheDocument();
    });

    it('should cap at 5 unique emotions', () => {
        render(<LightweightInsights entries={mockEntries} />);
        // Component uses .slice(0, 5) so up to 5 unique emotions shown
        // With our data: Happy, Calm, Anxious, Tired, Grateful = 5 unique
        expect(screen.getByText('Grateful')).toBeInTheDocument();
        // Sad would be the 6th unique, so it should not appear
        expect(screen.queryByText('Sad')).not.toBeInTheDocument();
    });

    it('should show dash for avg mood with empty entries', () => {
        render(<LightweightInsights entries={[]} />);
        expect(screen.getByText('-')).toBeInTheDocument();
    });

    it('should show No data yet when no emotions', () => {
        render(<LightweightInsights entries={[]} />);
        expect(screen.getByText('No data yet')).toBeInTheDocument();
    });

    it('should show prompt when less than 2 entries', () => {
        render(<LightweightInsights entries={[{ id: '1', date: '2026-03-06', mood: 7, emotions: [] }]} />);
        expect(screen.getByText('Log more entries to see your trend')).toBeInTheDocument();
    });

    it('should render SVG trendline when 2+ entries', () => {
        const { container } = render(<LightweightInsights entries={mockEntries} />);
        expect(container.querySelector('svg')).not.toBeNull();
        expect(container.querySelector('polyline')).not.toBeNull();
    });
});
