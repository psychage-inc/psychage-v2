/* eslint-disable @typescript-eslint/no-require-imports */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import SmartActionsHub from '../SmartActionsHub';

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

describe('SmartActionsHub', () => {
    it('should show log mood action when no todayMood', () => {
        renderWithRouter(
            <SmartActionsHub todayMood={null} todaySleep={null} lastClarityDate={null} navigatorCount={5} bookmarkCount={0} />
        );
        expect(screen.getByText(/log today's mood/i)).toBeInTheDocument();
    });

    it('should show log sleep action when no todaySleep', () => {
        renderWithRouter(
            <SmartActionsHub todayMood={null} todaySleep={null} lastClarityDate={null} navigatorCount={5} bookmarkCount={0} />
        );
        expect(screen.getByText(/how did you sleep/i)).toBeInTheDocument();
    });

    it('should show clarity check-in when never assessed', () => {
        renderWithRouter(
            <SmartActionsHub todayMood={null} todaySleep={null} lastClarityDate={null} navigatorCount={5} bookmarkCount={0} />
        );
        expect(screen.getByText(/take your first check-in/i)).toBeInTheDocument();
    });

    it('should show navigator action when navigatorCount is 0', () => {
        renderWithRouter(
            <SmartActionsHub todayMood={null} todaySleep={null} lastClarityDate={null} navigatorCount={0} bookmarkCount={0} maxActions={5} />
        );
        expect(screen.getByText('Explore Symptom Navigator')).toBeInTheDocument();
    });

    it('should show bookmarks action when bookmarkCount > 0', () => {
        renderWithRouter(
            <SmartActionsHub todayMood={null} todaySleep={null} lastClarityDate={null} navigatorCount={5} bookmarkCount={3} maxActions={5} />
        );
        expect(screen.getByText('Check saved articles')).toBeInTheDocument();
        expect(screen.getByText('3 saved items')).toBeInTheDocument();
    });

    it('should respect maxActions limit', () => {
        renderWithRouter(
            <SmartActionsHub todayMood={null} todaySleep={null} lastClarityDate={null} navigatorCount={0} bookmarkCount={5} maxActions={2} />
        );
        // maxActions=2 means only 2 action cards: mood + sleep (highest priority)
        expect(screen.getByText(/log today's mood/i)).toBeInTheDocument();
        expect(screen.getByText(/how did you sleep/i)).toBeInTheDocument();
        // Navigator and bookmarks should NOT be shown (exceeds limit)
        expect(screen.queryByText('Explore Symptom Navigator')).not.toBeInTheDocument();
        expect(screen.queryByText('Check saved articles')).not.toBeInTheDocument();
    });

    it('should return null when all actions done', () => {
        const mockMood = { id: '1', date: '2026-03-06', mood: 7, emotions: [], note: '', user_id: 'u1', created_at: '' };
        const mockSleep = { id: '1', date: '2026-03-06', hours: 7, quality: 4, user_id: 'u1', created_at: '' };
        const { container } = renderWithRouter(
            <SmartActionsHub
                todayMood={mockMood}
                todaySleep={mockSleep}
                lastClarityDate={new Date().toISOString()}
                navigatorCount={5}
                bookmarkCount={0}
            />
        );
        expect(container.innerHTML).toBe('');
    });
});
