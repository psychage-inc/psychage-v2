 
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import NextSteps from '../NextSteps';

const mockSteps = [
    { label: 'Take the Clarity Score', href: '/clarity-score', description: 'Assess your mental wellness' },
    { label: 'Find a Provider', href: '/providers' },
];

describe('NextSteps', () => {
    it('should render nothing when steps is empty', () => {
        const { container } = render(
            <MemoryRouter>
                <NextSteps steps={[]} />
            </MemoryRouter>
        );
        expect(container.firstChild).toBeNull();
    });

    it('should render nothing when steps is null-ish', () => {
        const { container } = render(
            <MemoryRouter>
                <NextSteps steps={null as any} />
            </MemoryRouter>
        );
        expect(container.firstChild).toBeNull();
    });

    it('should render default title', () => {
        render(
            <MemoryRouter>
                <NextSteps steps={mockSteps} />
            </MemoryRouter>
        );
        expect(screen.getByText('Recommended Next Steps')).toBeInTheDocument();
    });

    it('should render custom title', () => {
        render(
            <MemoryRouter>
                <NextSteps steps={mockSteps} title="What To Do Next" />
            </MemoryRouter>
        );
        expect(screen.getByText('What To Do Next')).toBeInTheDocument();
    });

    it('should render step labels', () => {
        render(
            <MemoryRouter>
                <NextSteps steps={mockSteps} />
            </MemoryRouter>
        );
        expect(screen.getByText('Take the Clarity Score')).toBeInTheDocument();
        expect(screen.getByText('Find a Provider')).toBeInTheDocument();
    });

    it('should render step descriptions when provided', () => {
        render(
            <MemoryRouter>
                <NextSteps steps={mockSteps} />
            </MemoryRouter>
        );
        expect(screen.getByText('Assess your mental wellness')).toBeInTheDocument();
    });

    it('should render links with correct hrefs', () => {
        render(
            <MemoryRouter>
                <NextSteps steps={mockSteps} />
            </MemoryRouter>
        );
        const links = screen.getAllByRole('link');
        expect(links[0]).toHaveAttribute('href', '/clarity-score');
        expect(links[1]).toHaveAttribute('href', '/providers');
    });
});
