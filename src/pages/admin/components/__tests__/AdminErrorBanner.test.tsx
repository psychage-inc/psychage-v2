import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AdminErrorBanner from '../AdminErrorBanner';

describe('AdminErrorBanner', () => {
    it('should render error message', () => {
        render(<AdminErrorBanner message="Something went wrong" />);
        expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });

    it('should not render retry button when onRetry not provided', () => {
        render(<AdminErrorBanner message="Error" />);
        expect(screen.queryByText('Retry')).not.toBeInTheDocument();
    });

    it('should render retry button when onRetry provided', () => {
        render(<AdminErrorBanner message="Error" onRetry={vi.fn()} />);
        expect(screen.getByText('Retry')).toBeInTheDocument();
    });

    it('should call onRetry when retry button clicked', () => {
        const onRetry = vi.fn();
        render(<AdminErrorBanner message="Error" onRetry={onRetry} />);
        fireEvent.click(screen.getByText('Retry'));
        expect(onRetry).toHaveBeenCalledTimes(1);
    });

    it('should have red styling', () => {
        const { container } = render(<AdminErrorBanner message="Error" />);
        const banner = container.firstElementChild as HTMLElement;
        expect(banner).toHaveClass('bg-red-50');
    });
});
