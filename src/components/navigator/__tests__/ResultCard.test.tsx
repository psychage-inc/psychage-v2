import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ResultCard } from '../ResultCard';
import type { NavigatorResultItem } from '../../../lib/navigator/types';

const mockResult: NavigatorResultItem = {
    condition_id: 'TEST_001',
    name: 'Test Condition',
    description_for_user: 'This is a test condition description.',
    relevance_level: 'HIGH',
    matched_symptoms: [
        { name: 'Symptom One', weight: 1.0 },
        { name: 'Symptom Two', weight: 0.8 },
        { name: 'Symptom Three', weight: 0.6 },
        { name: 'Symptom Four', weight: 0.5 },
        { name: 'Symptom Five', weight: 0.4 },
    ],
    family: 'TEST',
    raw_score: 0.85,
    normalized_score: 0.75,
    confidence: 0.65,
};

describe('ResultCard', () => {
    it('renders condition name and description', () => {
        render(<ResultCard result={mockResult} />);

        expect(screen.getByText('Test Condition')).toBeInTheDocument();
        expect(screen.getByText('This is a test condition description.')).toBeInTheDocument();
    });

    it('shows first 3 symptoms when collapsed', () => {
        render(<ResultCard result={mockResult} />);

        expect(screen.getByText('Symptom One')).toBeInTheDocument();
        expect(screen.getByText('Symptom Two')).toBeInTheDocument();
        expect(screen.getByText('Symptom Three')).toBeInTheDocument();

        // Should show "+2 more" indicator
        expect(screen.getByText('+2 more')).toBeInTheDocument();

        // Fourth and fifth symptoms should not be visible initially
        expect(screen.queryByText('Symptom Four')).not.toBeInTheDocument();
        expect(screen.queryByText('Symptom Five')).not.toBeInTheDocument();
    });

    it('expands to show all symptoms when toggle button clicked', async () => {
        const user = userEvent.setup();
        render(<ResultCard result={mockResult} />);

        // Click the expand button
        const expandButton = screen.getByRole('button', { name: /show all 5/i });
        await user.click(expandButton);

        // All symptoms should now be visible
        expect(screen.getByText('Symptom One')).toBeInTheDocument();
        expect(screen.getByText('Symptom Two')).toBeInTheDocument();
        expect(screen.getByText('Symptom Three')).toBeInTheDocument();
        expect(screen.getByText('Symptom Four')).toBeInTheDocument();
        expect(screen.getByText('Symptom Five')).toBeInTheDocument();

        // "+X more" should no longer be visible
        expect(screen.queryByText('+2 more')).not.toBeInTheDocument();
    });

    it('collapses back when toggle button clicked again', async () => {
        const user = userEvent.setup();
        render(<ResultCard result={mockResult} />);

        // Expand
        const expandButton = screen.getByRole('button', { name: /show all 5/i });
        await user.click(expandButton);

        // Collapse
        const collapseButton = screen.getByRole('button', { name: /show less/i });
        await user.click(collapseButton);

        // Should be back to showing only 3
        expect(screen.getByText('Symptom One')).toBeInTheDocument();
        expect(screen.queryByText('Symptom Four')).not.toBeInTheDocument();
        expect(screen.getByText('+2 more')).toBeInTheDocument();
    });

    it('has correct aria-expanded state', async () => {
        const user = userEvent.setup();
        render(<ResultCard result={mockResult} />);

        const toggleButton = screen.getByRole('button', { name: /show all 5/i });
        expect(toggleButton).toHaveAttribute('aria-expanded', 'false');

        await user.click(toggleButton);
        const collapseButton = screen.getByRole('button', { name: /show less/i });
        expect(collapseButton).toHaveAttribute('aria-expanded', 'true');
    });

    it('does not show expand button when 3 or fewer symptoms', () => {
        const smallResult: NavigatorResultItem = {
            ...mockResult,
            matched_symptoms: [
                { name: 'Symptom One', weight: 1.0 },
                { name: 'Symptom Two', weight: 0.8 },
            ],
        };

        render(<ResultCard result={smallResult} />);

        // No expand button should be present
        expect(screen.queryByRole('button', { name: /show all/i })).not.toBeInTheDocument();
        expect(screen.queryByText(/more/i)).not.toBeInTheDocument();
    });

    it('calls onClick when card is clicked', async () => {
        const user = userEvent.setup();
        const handleClick = vi.fn();

        render(<ResultCard result={mockResult} onClick={handleClick} />);

        const card = screen.getByRole('button');
        await user.click(card);

        expect(handleClick).toHaveBeenCalled();
    });

    it('supports keyboard navigation', async () => {
        const user = userEvent.setup();
        const handleClick = vi.fn();

        render(<ResultCard result={mockResult} onClick={handleClick} />);

        const card = screen.getByRole('button');
        card.focus();

        await user.keyboard('{Enter}');
        expect(handleClick).toHaveBeenCalled();

        await user.keyboard(' ');
        expect(handleClick).toHaveBeenCalledTimes(2);
    });
});
