/* eslint-disable @typescript-eslint/no-require-imports */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ErrorFallback from '../ErrorFallback';

vi.mock('framer-motion', () => {
    const { forwardRef } = require('react');
    return {
        motion: {
            button: forwardRef(({ children, ...props }: any, ref: any) => (
                <button ref={ref} {...props}>{children}</button>
            )),
        },
    };
});

describe('ErrorFallback', () => {
    it('should render error heading', () => {
        render(<ErrorFallback />);
        expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });

    it('should show error message when error provided', () => {
        render(<ErrorFallback error={new Error('Database connection failed')} />);
        expect(screen.getByText('Database connection failed')).toBeInTheDocument();
    });

    it('should not show error message when no error', () => {
        render(<ErrorFallback />);
        expect(screen.queryByText(/Database/)).not.toBeInTheDocument();
    });

    it('should show Try Again button when resetErrorBoundary provided', () => {
        render(<ErrorFallback resetErrorBoundary={vi.fn()} />);
        expect(screen.getByText('Try Again')).toBeInTheDocument();
    });

    it('should call resetErrorBoundary on Try Again click', () => {
        const reset = vi.fn();
        render(<ErrorFallback resetErrorBoundary={reset} />);
        fireEvent.click(screen.getByText('Try Again'));
        expect(reset).toHaveBeenCalledTimes(1);
    });

    it('should not show Try Again when no resetErrorBoundary', () => {
        render(<ErrorFallback />);
        expect(screen.queryByText('Try Again')).not.toBeInTheDocument();
    });

    it('should show Return Home button', () => {
        render(<ErrorFallback />);
        expect(screen.getByText('Return Home')).toBeInTheDocument();
    });
});
