/* eslint-disable @typescript-eslint/no-require-imports */
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import AIDisclosure from '../AIDisclosure';

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

describe('AIDisclosure', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('should show banner when not previously accepted', () => {
        render(<AIDisclosure />);
        expect(screen.getByText(/welcome to psychage ai/i)).toBeInTheDocument();
    });

    it('should not show banner when previously accepted', () => {
        localStorage.setItem('psychage_ai_disclosure_accepted', 'true');
        render(<AIDisclosure />);
        expect(screen.queryByText(/welcome to psychage ai/i)).not.toBeInTheDocument();
    });

    it('should display AI limitations disclaimer', () => {
        render(<AIDisclosure />);
        expect(screen.getByText(/not a therapist/i)).toBeInTheDocument();
    });

    it('should display crisis support info with 988 link', () => {
        render(<AIDisclosure />);
        const link = screen.getByRole('link', { name: /988/i });
        expect(link).toHaveAttribute('href', 'tel:988');
    });

    it('should render dismiss button', () => {
        render(<AIDisclosure />);
        expect(screen.getByRole('button', { name: /dismiss/i })).toBeInTheDocument();
    });

    it('should hide banner and persist on dismiss', () => {
        render(<AIDisclosure />);
        fireEvent.click(screen.getByRole('button', { name: /dismiss/i }));
        expect(screen.queryByText(/welcome to psychage ai/i)).not.toBeInTheDocument();
        expect(localStorage.getItem('psychage_ai_disclosure_accepted')).toBe('true');
    });
});
