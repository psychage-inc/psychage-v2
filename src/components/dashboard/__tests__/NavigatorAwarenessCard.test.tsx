/* eslint-disable @typescript-eslint/no-require-imports */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import NavigatorAwarenessCard from '../NavigatorAwarenessCard';

vi.mock('framer-motion', () => {
    const React = require('react');
    return {
        motion: {
            div: React.forwardRef(({ children, ...props }: any, ref: any) => (
                <div ref={ref} {...props}>{children}</div>
            )),
            button: React.forwardRef(({ children, ...props }: any, ref: any) => (
                <button ref={ref} {...props}>{children}</button>
            )),
        },
    };
});

const renderWithRouter = (ui: React.ReactElement) =>
    render(<MemoryRouter>{ui}</MemoryRouter>);

describe('NavigatorAwarenessCard', () => {
    it('should render Navigator label', () => {
        renderWithRouter(<NavigatorAwarenessCard totalExplorations={0} lastExplorationDate={null} />);
        expect(screen.getByText('Navigator')).toBeInTheDocument();
    });

    it('should show empty state when no explorations', () => {
        renderWithRouter(<NavigatorAwarenessCard totalExplorations={0} lastExplorationDate={null} />);
        expect(screen.getByText('No explorations yet')).toBeInTheDocument();
        expect(screen.getByText('Get Started')).toBeInTheDocument();
    });

    it('should link to symptom navigator from empty state', () => {
        renderWithRouter(<NavigatorAwarenessCard totalExplorations={0} lastExplorationDate={null} />);
        const links = screen.getAllByRole('link');
        expect(links.some(l => l.getAttribute('href') === '/tools/symptom-navigator')).toBe(true);
    });

    it('should display exploration count when data exists', () => {
        renderWithRouter(<NavigatorAwarenessCard totalExplorations={5} lastExplorationDate="2026-03-05" />);
        expect(screen.getByText('5')).toBeInTheDocument();
        expect(screen.getByText(/explorations completed/i)).toBeInTheDocument();
    });

    it('should use singular for 1 exploration', () => {
        renderWithRouter(<NavigatorAwarenessCard totalExplorations={1} lastExplorationDate="2026-03-05" />);
        expect(screen.getByText(/exploration completed/i)).toBeInTheDocument();
    });

    it('should show educational disclaimer', () => {
        renderWithRouter(<NavigatorAwarenessCard totalExplorations={3} lastExplorationDate="2026-03-05" />);
        expect(screen.getByText(/not a medical diagnosis/i)).toBeInTheDocument();
    });

    it('should show Explore Again link when data exists', () => {
        renderWithRouter(<NavigatorAwarenessCard totalExplorations={2} lastExplorationDate="2026-03-05" />);
        expect(screen.getByText('Explore Again')).toBeInTheDocument();
    });
});
