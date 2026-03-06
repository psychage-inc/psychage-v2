import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { CrisisOverlay } from '../CrisisOverlay';

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

const renderWithRouter = (ui: React.ReactElement) =>
    render(<MemoryRouter>{ui}</MemoryRouter>);

describe('CrisisOverlay', () => {
    it('should render when open', () => {
        renderWithRouter(<CrisisOverlay isOpen={true} onClose={vi.fn()} />);
        expect(screen.getByText(/you're not alone/i)).toBeInTheDocument();
    });

    it('should not render when closed', () => {
        renderWithRouter(<CrisisOverlay isOpen={false} onClose={vi.fn()} />);
        expect(screen.queryByText(/you're not alone/i)).not.toBeInTheDocument();
    });

    it('should show 988 link', () => {
        renderWithRouter(<CrisisOverlay isOpen={true} onClose={vi.fn()} />);
        const link = screen.getByRole('link', { name: /988 suicide/i });
        expect(link).toHaveAttribute('href', 'tel:988');
    });

    it('should show Crisis Text Line', () => {
        renderWithRouter(<CrisisOverlay isOpen={true} onClose={vi.fn()} />);
        const link = screen.getByRole('link', { name: /crisis text line/i });
        expect(link).toHaveAttribute('href', expect.stringContaining('741741'));
    });

    it('should show More Crisis Resources link to /crisis', () => {
        renderWithRouter(<CrisisOverlay isOpen={true} onClose={vi.fn()} />);
        const link = screen.getByRole('link', { name: /more crisis resources/i });
        expect(link).toHaveAttribute('href', '/crisis');
    });

    it('should call onClose when dismiss button clicked', () => {
        const onClose = vi.fn();
        renderWithRouter(<CrisisOverlay isOpen={true} onClose={onClose} />);
        fireEvent.click(screen.getByText(/continue the exercise/i));
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should close on Escape key', () => {
        const onClose = vi.fn();
        renderWithRouter(<CrisisOverlay isOpen={true} onClose={onClose} />);
        fireEvent.keyDown(window, { key: 'Escape' });
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should lock body scroll when open', () => {
        renderWithRouter(<CrisisOverlay isOpen={true} onClose={vi.fn()} />);
        expect(document.body.style.overflow).toBe('hidden');
    });
});
