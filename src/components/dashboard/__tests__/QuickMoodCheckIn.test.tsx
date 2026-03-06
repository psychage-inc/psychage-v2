import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import QuickMoodCheckIn from '../QuickMoodCheckIn';

vi.mock('framer-motion', () => {
    const React = require('react');
    return {
        motion: {
            div: React.forwardRef(({ children, ...props }: any, ref: any) => (
                <div ref={ref} {...props}>{children}</div>
            )),
            button: React.forwardRef(({ children, whileTap, ...props }: any, ref: any) => (
                <button ref={ref} {...props}>{children}</button>
            )),
        },
        AnimatePresence: ({ children }: any) => <>{children}</>,
    };
});

vi.mock('@/context/ToastContext', () => ({
    useToast: () => ({
        success: vi.fn(),
        error: vi.fn(),
    }),
}));

vi.mock('@/services/moodService', () => ({
    moodService: {
        createEntry: vi.fn(),
    },
}));

const renderWithRouter = (ui: React.ReactElement) =>
    render(<MemoryRouter>{ui}</MemoryRouter>);

describe('QuickMoodCheckIn', () => {
    it('should render heading', () => {
        renderWithRouter(
            <QuickMoodCheckIn userId="u1" todayEntry={null} onMoodLogged={vi.fn()} />
        );
        expect(screen.getByText('How are you feeling?')).toBeInTheDocument();
    });

    it('should render all 5 mood options when no entry today', () => {
        renderWithRouter(
            <QuickMoodCheckIn userId="u1" todayEntry={null} onMoodLogged={vi.fn()} />
        );
        expect(screen.getByText('Awful')).toBeInTheDocument();
        expect(screen.getByText('Bad')).toBeInTheDocument();
        expect(screen.getByText('Okay')).toBeInTheDocument();
        expect(screen.getByText('Good')).toBeInTheDocument();
        expect(screen.getByText('Great')).toBeInTheDocument();
    });

    it('should show notes input after selecting mood', () => {
        renderWithRouter(
            <QuickMoodCheckIn userId="u1" todayEntry={null} onMoodLogged={vi.fn()} />
        );
        fireEvent.click(screen.getByText('Good'));
        expect(screen.getByPlaceholderText('Add a note (optional)')).toBeInTheDocument();
        expect(screen.getByText('Log Mood')).toBeInTheDocument();
        expect(screen.getByText('Cancel')).toBeInTheDocument();
    });

    it('should hide notes on Cancel', () => {
        renderWithRouter(
            <QuickMoodCheckIn userId="u1" todayEntry={null} onMoodLogged={vi.fn()} />
        );
        fireEvent.click(screen.getByText('Good'));
        expect(screen.getByPlaceholderText('Add a note (optional)')).toBeInTheDocument();
        fireEvent.click(screen.getByText('Cancel'));
        expect(screen.queryByPlaceholderText('Add a note (optional)')).not.toBeInTheDocument();
    });

    it('should show "Logged today" badge when entry exists', () => {
        const entry = {
            id: '1',
            date: '2026-03-06',
            mood: 4,
            value: 4,
            emotions: [],
            note: '',
            user_id: 'u1',
            created_at: '2026-03-06T10:00:00Z',
        };
        renderWithRouter(
            <QuickMoodCheckIn userId="u1" todayEntry={entry} onMoodLogged={vi.fn()} />
        );
        expect(screen.getByText('Logged today')).toBeInTheDocument();
    });

    it('should show mood label and journal link when entry exists', () => {
        const entry = {
            id: '1',
            date: '2026-03-06',
            mood: 4,
            value: 4,
            emotions: [],
            note: '',
            user_id: 'u1',
            created_at: '2026-03-06T10:00:00Z',
        };
        renderWithRouter(
            <QuickMoodCheckIn userId="u1" todayEntry={entry} onMoodLogged={vi.fn()} />
        );
        expect(screen.getByText('Good')).toBeInTheDocument();
        expect(screen.getByText('View Journal')).toBeInTheDocument();
    });
});
