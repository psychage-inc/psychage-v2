import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProfileSettings from '../ProfileSettings';
import type { UserProfile } from '../../model';

vi.mock('framer-motion', () => {
    const React = require('react');
    return {
        motion: {
            div: React.forwardRef(({ children, ...props }: any, ref: any) => (
                <div ref={ref} {...props}>{children}</div>
            )),
        },
        AnimatePresence: ({ children }: any) => <>{children}</>,
    };
});

const defaultProfile: UserProfile = {
    ageGroup: 'adult',
    chronotype: 'neutral',
    targetSleepHours: 8,
    caffeineCutoffTime: '14:00',
    exerciseTime: '',
};

describe('ProfileSettings', () => {
    it('should render toggle button', () => {
        render(<ProfileSettings profile={defaultProfile} onChange={vi.fn()} />);
        expect(screen.getByText('Profile Settings')).toBeInTheDocument();
    });

    it('should start collapsed', () => {
        render(<ProfileSettings profile={defaultProfile} onChange={vi.fn()} />);
        expect(screen.getByRole('button', { name: /profile settings/i })).toHaveAttribute('aria-expanded', 'false');
    });

    it('should expand on click and show form fields', () => {
        render(<ProfileSettings profile={defaultProfile} onChange={vi.fn()} />);
        fireEvent.click(screen.getByText('Profile Settings'));
        expect(screen.getByLabelText('Age Group')).toBeInTheDocument();
        expect(screen.getByLabelText('Chronotype')).toBeInTheDocument();
        expect(screen.getByLabelText(/target sleep duration/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/caffeine cutoff/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/exercise time/i)).toBeInTheDocument();
    });

    it('should call onChange when age group changed', () => {
        const onChange = vi.fn();
        render(<ProfileSettings profile={defaultProfile} onChange={onChange} />);
        fireEvent.click(screen.getByText('Profile Settings'));
        fireEvent.change(screen.getByLabelText('Age Group'), { target: { value: 'teen' } });
        expect(onChange).toHaveBeenCalledWith({ ...defaultProfile, ageGroup: 'teen' });
    });

    it('should call onChange when chronotype changed', () => {
        const onChange = vi.fn();
        render(<ProfileSettings profile={defaultProfile} onChange={onChange} />);
        fireEvent.click(screen.getByText('Profile Settings'));
        fireEvent.change(screen.getByLabelText('Chronotype'), { target: { value: 'night_owl' } });
        expect(onChange).toHaveBeenCalledWith({ ...defaultProfile, chronotype: 'night_owl' });
    });

    it('should render age group options', () => {
        render(<ProfileSettings profile={defaultProfile} onChange={vi.fn()} />);
        fireEvent.click(screen.getByText('Profile Settings'));
        expect(screen.getByText('Teen (13–17)')).toBeInTheDocument();
        expect(screen.getByText('Adult (18–64)')).toBeInTheDocument();
        expect(screen.getByText('Older Adult (65+)')).toBeInTheDocument();
    });

    it('should render chronotype options', () => {
        render(<ProfileSettings profile={defaultProfile} onChange={vi.fn()} />);
        fireEvent.click(screen.getByText('Profile Settings'));
        expect(screen.getByText('Early Bird')).toBeInTheDocument();
        expect(screen.getByText('Neutral')).toBeInTheDocument();
        expect(screen.getByText('Night Owl')).toBeInTheDocument();
    });
});
