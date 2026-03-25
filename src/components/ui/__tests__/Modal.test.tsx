 
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import Modal from '../Modal';

vi.mock('framer-motion', () => ({
    motion: {
        div: React.forwardRef(({ children, ...props }: any, ref: any) => (
            <div ref={ref} {...props}>{children}</div>
        )),
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('Modal', () => {
    const defaultProps = {
        isOpen: true,
        onClose: vi.fn(),
        title: 'Test Modal',
        children: <p>Modal content</p>,
    };

    it('should render when open', () => {
        render(<Modal {...defaultProps} />);
        expect(screen.getByText('Test Modal')).toBeInTheDocument();
        expect(screen.getByText('Modal content')).toBeInTheDocument();
    });

    it('should not render when closed', () => {
        render(<Modal {...defaultProps} isOpen={false} />);
        expect(screen.queryByText('Test Modal')).not.toBeInTheDocument();
    });

    it('should render close button with accessible label', () => {
        render(<Modal {...defaultProps} />);
        expect(screen.getByLabelText('Close modal')).toBeInTheDocument();
    });

    it('should call onClose when close button clicked', () => {
        const onClose = vi.fn();
        render(<Modal {...defaultProps} onClose={onClose} />);
        fireEvent.click(screen.getByLabelText('Close modal'));
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should render without title', () => {
        render(<Modal isOpen onClose={vi.fn()}><p>Content only</p></Modal>);
        expect(screen.getByText('Content only')).toBeInTheDocument();
    });

    it('should have accessible dialog role', () => {
        render(<Modal {...defaultProps} />);
        expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
});
