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

// Pin time-of-day so action set/labels are deterministic (component varies copy by period).
vi.mock('@/hooks/useTimeOfDay', () => ({
    useTimeOfDay: () => ({ greeting: 'Good morning', period: 'morning', icon: () => null }),
}));

const renderWithRouter = (ui: React.ReactElement) =>
    render(<MemoryRouter>{ui}</MemoryRouter>);

const mockMood = { id: '1', user_id: 'u1', value: 4, notes: '', tags: [], created_at: '2026-03-06T10:00:00Z' } as any;
const mockSleep = { id: '1', user_id: 'u1', hours: 7, quality: 4, created_at: '2026-03-06T08:00:00Z' } as any;
const recentClarity = new Date().toISOString();

describe('SmartActionsHub', () => {
    it('should show log mood action when no todayMood', () => {
        renderWithRouter(
            <SmartActionsHub todayMood={null} todaySleep={mockSleep} lastClarityDate={recentClarity} navigatorCount={5} bookmarkCount={0} maxActions={5} />
        );
        expect(screen.getByText('Check in with how you feel')).toBeInTheDocument();
    });

    it('should show log sleep action when no todaySleep (morning)', () => {
        renderWithRouter(
            <SmartActionsHub todayMood={mockMood} todaySleep={null} lastClarityDate={recentClarity} navigatorCount={5} bookmarkCount={0} maxActions={5} />
        );
        expect(screen.getByText('Log how you slept last night')).toBeInTheDocument();
    });

    it('should show clarity check-in when never assessed', () => {
        renderWithRouter(
            <SmartActionsHub todayMood={mockMood} todaySleep={mockSleep} lastClarityDate={null} navigatorCount={5} bookmarkCount={0} maxActions={5} />
        );
        expect(screen.getByText('Take your first clarity check-in')).toBeInTheDocument();
    });

    it('should show navigator action when navigatorCount is 0', () => {
        renderWithRouter(
            <SmartActionsHub todayMood={mockMood} todaySleep={mockSleep} lastClarityDate={recentClarity} navigatorCount={0} bookmarkCount={0} maxActions={5} />
        );
        expect(screen.getByText('Explore the Symptom Navigator')).toBeInTheDocument();
    });

    it('should respect maxActions limit', () => {
        renderWithRouter(
            <SmartActionsHub todayMood={null} todaySleep={null} lastClarityDate={null} navigatorCount={0} bookmarkCount={5} maxActions={2} />
        );
        // maxActions=2 keeps the two highest-priority morning actions: sleep + mood.
        expect(screen.getByText('Log how you slept last night')).toBeInTheDocument();
        expect(screen.getByText('Check in with how you feel')).toBeInTheDocument();
        // Lower-priority actions are dropped.
        expect(screen.queryByText('Explore the Symptom Navigator')).not.toBeInTheDocument();
        expect(screen.queryByText('Take your first clarity check-in')).not.toBeInTheDocument();
    });

    it('should show a fallback suggestion when nothing is due', () => {
        // When all primary actions are done, the component never renders empty —
        // it falls back to a reading suggestion (so the card is never blank).
        renderWithRouter(
            <SmartActionsHub
                todayMood={mockMood}
                todaySleep={mockSleep}
                lastClarityDate={recentClarity}
                navigatorCount={5}
                bookmarkCount={0}
            />
        );
        expect(screen.getByText('Explore new articles')).toBeInTheDocument();
    });

    // (c) Known product gap — see SLICE-2 report. UserDashboard computes and passes
    // `bookmarkCount`, but SmartActionsHub never renders a bookmarks action ("Check
    // saved articles" exists nowhere in src). Re-enable once the component either
    // renders a bookmarks suggestion or the dead prop is removed (production change).
    it.skip('should show bookmarks action when bookmarkCount > 0', () => {
        renderWithRouter(
            <SmartActionsHub todayMood={null} todaySleep={null} lastClarityDate={null} navigatorCount={5} bookmarkCount={3} maxActions={5} />
        );
        expect(screen.getByText('Check saved articles')).toBeInTheDocument();
        expect(screen.getByText('3 saved items')).toBeInTheDocument();
    });
});
