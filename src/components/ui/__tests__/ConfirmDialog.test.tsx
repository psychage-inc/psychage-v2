 
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { ConfirmDialog } from '../ConfirmDialog';

vi.mock('framer-motion', () => ({
    motion: {
        div: React.forwardRef(({ children, ...props }: any, ref: any) => (
            <div ref={ref} {...props}>{children}</div>
        )),
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('ConfirmDialog', () => {
    const defaultProps = {
        isOpen: true,
        onClose: vi.fn(),
        onConfirm: vi.fn(),
        title: 'Delete Item?',
        message: 'This action cannot be undone.',
    };

    it('should render when open', () => {
        render(<ConfirmDialog {...defaultProps} />);
        expect(screen.getByText('Delete Item?')).toBeInTheDocument();
        expect(screen.getByText('This action cannot be undone.')).toBeInTheDocument();
    });

    it('should not render when closed', () => {
        render(<ConfirmDialog {...defaultProps} isOpen={false} />);
        expect(screen.queryByText('Delete Item?')).not.toBeInTheDocument();
    });

    it('should render default button text', () => {
        render(<ConfirmDialog {...defaultProps} />);
        expect(screen.getByText('Confirm')).toBeInTheDocument();
        expect(screen.getByText('Cancel')).toBeInTheDocument();
    });

    it('should render custom button text', () => {
        render(<ConfirmDialog {...defaultProps} confirmText="Delete" cancelText="Keep" />);
        expect(screen.getByText('Delete')).toBeInTheDocument();
        expect(screen.getByText('Keep')).toBeInTheDocument();
    });

    it('should call onConfirm and onClose when confirm clicked', () => {
        const onConfirm = vi.fn();
        const onClose = vi.fn();
        render(<ConfirmDialog {...defaultProps} onConfirm={onConfirm} onClose={onClose} />);
        fireEvent.click(screen.getByText('Confirm'));
        expect(onConfirm).toHaveBeenCalledTimes(1);
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should call onClose when cancel clicked', () => {
        const onClose = vi.fn();
        render(<ConfirmDialog {...defaultProps} onClose={onClose} />);
        fireEvent.click(screen.getByText('Cancel'));
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should have proper ARIA attributes', () => {
        render(<ConfirmDialog {...defaultProps} />);
        expect(screen.getByRole('alertdialog')).toBeInTheDocument();
    });

    it('should render custom icon', () => {
        render(
            <ConfirmDialog {...defaultProps} icon={<span data-testid="custom-icon">X</span>} />
        );
        expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });
});
