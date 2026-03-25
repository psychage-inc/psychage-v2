 
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ResultCard } from '../ResultCard';
import type { NavigatorResultItem } from '../../../lib/navigator/types';

const mockResult: NavigatorResultItem = {
    condition_id: 'TEST_001',
    name: 'Test Condition',
    full_name: 'Test Condition Full Name',
    description_for_user: 'This is a test condition description.',
    relevance_score: 0.85,
    relevance_level: 'high',
    relevance_label: 'High Relevance',
    relevance_color: 'text-rose-600',
    matched_symptoms: [
        { name: 'Symptom One', role: 'core' },
        { name: 'Symptom Two', role: 'core' },
        { name: 'Symptom Three', role: 'common' },
        { name: 'Symptom Four', role: 'common' },
        { name: 'Symptom Five', role: 'associated' },
    ],
    guide_path: '/learn/test-condition',
    coping_path: '/coping/test-condition',
    provider_questions: [],
    always_recommend_professional: false,
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
        const { container } = render(<ResultCard result={mockResult} />);

        // Target the native <button> element (not the Card div[role=button])
        const expandButton = container.querySelector('button[aria-expanded]') as HTMLElement;
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
        const { container } = render(<ResultCard result={mockResult} />);

        // Expand
        const expandButton = container.querySelector('button[aria-expanded]') as HTMLElement;
        await user.click(expandButton);

        // Collapse
        const collapseButton = container.querySelector('button[aria-expanded]') as HTMLElement;
        await user.click(collapseButton);

        // Should be back to showing only 3
        expect(screen.getByText('Symptom One')).toBeInTheDocument();
        expect(screen.queryByText('Symptom Four')).not.toBeInTheDocument();
        expect(screen.getByText('+2 more')).toBeInTheDocument();
    });

    it('has correct aria-expanded state', async () => {
        const user = userEvent.setup();
        const { container } = render(<ResultCard result={mockResult} />);

        const toggleButton = container.querySelector('button[aria-expanded]') as HTMLElement;
        expect(toggleButton).toHaveAttribute('aria-expanded', 'false');

        await user.click(toggleButton);
        expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
    });

    it('does not show expand button when 3 or fewer symptoms', () => {
        const smallResult: NavigatorResultItem = {
            ...mockResult,
            matched_symptoms: [
                { name: 'Symptom One', role: 'PRIMARY' },
                { name: 'Symptom Two', role: 'PRIMARY' },
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

        // Card is the first button in the DOM
        const buttons = screen.getAllByRole('button');
        await user.click(buttons[0]);

        expect(handleClick).toHaveBeenCalled();
    });

    it('supports keyboard navigation', async () => {
        const user = userEvent.setup();
        const handleClick = vi.fn();

        render(<ResultCard result={mockResult} onClick={handleClick} />);

        // Card is the first button in the DOM
        const buttons = screen.getAllByRole('button');
        buttons[0].focus();

        await user.keyboard('{Enter}');
        expect(handleClick).toHaveBeenCalled();

        await user.keyboard(' ');
        expect(handleClick).toHaveBeenCalledTimes(2);
    });
});
