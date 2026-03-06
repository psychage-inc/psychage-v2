import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import HygieneChecklist from '../HygieneChecklist';

describe('HygieneChecklist', () => {
    it('should render Sleep Hygiene heading', () => {
        render(<HygieneChecklist checked={[]} onToggle={vi.fn()} />);
        expect(screen.getByText('Sleep Hygiene')).toBeInTheDocument();
    });

    it('should render all 5 habits', () => {
        render(<HygieneChecklist checked={[]} onToggle={vi.fn()} />);
        expect(screen.getByText('No screens 1 hour before bed')).toBeInTheDocument();
        expect(screen.getByText('No caffeine after 2 PM')).toBeInTheDocument();
        expect(screen.getByText(/room temperature 65/i)).toBeInTheDocument();
        expect(screen.getByText('Room is completely dark')).toBeInTheDocument();
        expect(screen.getByText('Morning sunlight exposure')).toBeInTheDocument();
    });

    it('should show 0% when nothing checked', () => {
        render(<HygieneChecklist checked={[]} onToggle={vi.fn()} />);
        expect(screen.getByText('0%')).toBeInTheDocument();
    });

    it('should show correct percentage for checked items', () => {
        render(<HygieneChecklist checked={['screens', 'caffeine']} onToggle={vi.fn()} />);
        expect(screen.getByText('40%')).toBeInTheDocument();
    });

    it('should show 100% when all checked', () => {
        render(<HygieneChecklist checked={['screens', 'caffeine', 'temp', 'dark', 'sun']} onToggle={vi.fn()} />);
        expect(screen.getByText('100%')).toBeInTheDocument();
    });

    it('should use checkbox role with aria-checked', () => {
        render(<HygieneChecklist checked={['screens']} onToggle={vi.fn()} />);
        const checkboxes = screen.getAllByRole('checkbox');
        expect(checkboxes).toHaveLength(5);
        expect(checkboxes[0]).toHaveAttribute('aria-checked', 'true');
        expect(checkboxes[1]).toHaveAttribute('aria-checked', 'false');
    });

    it('should call onToggle when habit clicked', () => {
        const onToggle = vi.fn();
        render(<HygieneChecklist checked={[]} onToggle={onToggle} />);
        fireEvent.click(screen.getByText('No screens 1 hour before bed'));
        expect(onToggle).toHaveBeenCalledWith('screens');
    });
});
