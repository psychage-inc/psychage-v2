 
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Breadcrumb } from '../Breadcrumb';

describe('Breadcrumb', () => {
    it('renders all steps with correct labels', () => {
        render(<Breadcrumb currentStep="symptoms" />);

        expect(screen.getByText('Welcome')).toBeInTheDocument();
        expect(screen.getByText('Domains')).toBeInTheDocument();
        expect(screen.getByText('Symptoms')).toBeInTheDocument();
        expect(screen.getByText('Details')).toBeInTheDocument();
        expect(screen.getByText('Processing')).toBeInTheDocument();
        expect(screen.getByText('Results')).toBeInTheDocument();
    });

    it('marks current step with aria-current', () => {
        render(<Breadcrumb currentStep="symptoms" />);

        const currentStep = screen.getByText('Symptoms');
        expect(currentStep).toHaveAttribute('aria-current', 'step');
    });

    it('makes previous steps clickable', async () => {
        const user = userEvent.setup();
        const handleClick = vi.fn();

        render(<Breadcrumb currentStep="symptoms" onStepClick={handleClick} />);

        // Welcome and Domains should be clickable (before current step)
        const welcomeStep = screen.getByRole('button', { name: /go back to welcome/i });
        const domainsStep = screen.getByRole('button', { name: /go back to domains/i });

        await user.click(welcomeStep);
        expect(handleClick).toHaveBeenCalledWith('welcome');

        await user.click(domainsStep);
        expect(handleClick).toHaveBeenCalledWith('domains');
    });

    it('does not make future steps clickable', () => {
        render(<Breadcrumb currentStep="symptoms" />);

        // Details, Processing, Results should NOT be buttons
        const detailsStep = screen.getByText('Details');
        const processingStep = screen.getByText('Processing');
        const resultsStep = screen.getByText('Results');

        expect(detailsStep.tagName).toBe('SPAN');
        expect(processingStep.tagName).toBe('SPAN');
        expect(resultsStep.tagName).toBe('SPAN');
    });

    it('renders chevrons between steps', () => {
        const { container } = render(<Breadcrumb currentStep="symptoms" />);

        // Should have 5 chevrons (between 6 steps)
        const chevrons = container.querySelectorAll('svg');
        expect(chevrons.length).toBeGreaterThan(4);
    });

    it('has accessible navigation landmark', () => {
        const { container } = render(<Breadcrumb currentStep="symptoms" />);

        const nav = container.querySelector('nav');
        expect(nav).toHaveAttribute('aria-label', 'Progress');
    });
});
