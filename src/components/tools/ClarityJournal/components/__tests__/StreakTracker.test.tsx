 
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import StreakTracker from '../StreakTracker';

describe('StreakTracker', () => {
    it('should return null when streak is 0', () => {
        const { container } = render(<StreakTracker streak={0} />);
        expect(container.innerHTML).toBe('');
    });

    it('should render singular "day" for streak of 1', () => {
        render(<StreakTracker streak={1} />);
        expect(screen.getByText('1 day in a row')).toBeInTheDocument();
    });

    it('should render plural "days" for streak > 1', () => {
        render(<StreakTracker streak={5} />);
        expect(screen.getByText('5 days in a row')).toBeInTheDocument();
    });

    it('should render streak count for large values', () => {
        render(<StreakTracker streak={30} />);
        expect(screen.getByText('30 days in a row')).toBeInTheDocument();
    });
});
