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
    it('should render Insights heading', () => {
        render(<LightweightInsights entries={mockEntries} />);
        expect(screen.getByText('Insights')).toBeInTheDocument();
    });

    it('should display entry count', () => {
        render(<LightweightInsights entries={mockEntries} />);
        expect(screen.getByText('4')).toBeInTheDocument();
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

    it('should cap at 4 unique emotions', () => {
        render(<LightweightInsights entries={mockEntries} />);
        // Should not show Grateful or Sad since unique limit is 4
        expect(screen.queryByText('Grateful')).not.toBeInTheDocument();
    });

    it('should show dash for avg mood with empty entries', () => {
        render(<LightweightInsights entries={[]} />);
        expect(screen.getByText('-')).toBeInTheDocument();
    });

    it('should show No data when no emotions', () => {
        render(<LightweightInsights entries={[]} />);
        expect(screen.getByText('No data')).toBeInTheDocument();
    });

    it('should show prompt when less than 2 entries', () => {
        render(<LightweightInsights entries={[{ id: '1', date: '2026-03-06', mood: 7, emotions: [] }]} />);
        expect(screen.getByText('Log more to see trend')).toBeInTheDocument();
    });

    it('should render SVG trendline when 2+ entries', () => {
        const { container } = render(<LightweightInsights entries={mockEntries} />);
        expect(container.querySelector('svg')).not.toBeNull();
        expect(container.querySelector('polyline')).not.toBeNull();
    });
});
