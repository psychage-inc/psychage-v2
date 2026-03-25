 
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AdminConfirmModal from '../AdminConfirmModal';

// Mock the Modal component to render children directly
vi.mock('@/components/ui/Modal', () => ({
    default: ({ isOpen, children, title }: any) =>
        isOpen ? (
            <div role="dialog" aria-label={title}>
                <h2>{title}</h2>
                {children}
            </div>
        ) : null,
}));

describe('AdminConfirmModal', () => {
    const defaultProps = {
        isOpen: true,
        onClose: vi.fn(),
        onConfirm: vi.fn(),
        title: 'Confirm Action',
        description: 'Are you sure you want to proceed?',
    };

    it('should render when open', () => {
        render(<AdminConfirmModal {...defaultProps} />);
        expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('should not render when closed', () => {
        render(<AdminConfirmModal {...defaultProps} isOpen={false} />);
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('should display title and description', () => {
        render(<AdminConfirmModal {...defaultProps} />);
        expect(screen.getByText('Confirm Action')).toBeInTheDocument();
        expect(screen.getByText('Are you sure you want to proceed?')).toBeInTheDocument();
    });

    it('should display default Confirm button text', () => {
        render(<AdminConfirmModal {...defaultProps} />);
        expect(screen.getByText('Confirm')).toBeInTheDocument();
    });

    it('should display custom confirm text', () => {
        render(<AdminConfirmModal {...defaultProps} confirmText="Delete" />);
        expect(screen.getByText('Delete')).toBeInTheDocument();
    });

    it('should call onConfirm when confirm clicked', () => {
        const onConfirm = vi.fn();
        render(<AdminConfirmModal {...defaultProps} onConfirm={onConfirm} />);
        fireEvent.click(screen.getByText('Confirm'));
        expect(onConfirm).toHaveBeenCalledWith(undefined);
    });

    it('should call onClose when cancel clicked', () => {
        const onClose = vi.fn();
        render(<AdminConfirmModal {...defaultProps} onClose={onClose} />);
        fireEvent.click(screen.getByText('Cancel'));
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should show reason textarea when showReasonField is true', () => {
        render(<AdminConfirmModal {...defaultProps} showReasonField />);
        expect(screen.getByPlaceholderText('Enter reason...')).toBeInTheDocument();
    });

    it('should pass reason to onConfirm when reason field shown', () => {
        const onConfirm = vi.fn();
        render(<AdminConfirmModal {...defaultProps} onConfirm={onConfirm} showReasonField />);
        fireEvent.change(screen.getByPlaceholderText('Enter reason...'), { target: { value: 'Policy violation' } });
        fireEvent.click(screen.getByText('Confirm'));
        expect(onConfirm).toHaveBeenCalledWith('Policy violation');
    });

    it('should disable confirm when reason required but empty', () => {
        render(<AdminConfirmModal {...defaultProps} showReasonField reasonRequired />);
        const confirmBtn = screen.getByText('Confirm');
        expect(confirmBtn).toBeDisabled();
    });

    it('should enable confirm when required reason filled', () => {
        render(<AdminConfirmModal {...defaultProps} showReasonField reasonRequired />);
        fireEvent.change(screen.getByPlaceholderText('Enter reason...'), { target: { value: 'Done' } });
        expect(screen.getByText('Confirm')).not.toBeDisabled();
    });

    it('should show required asterisk when reason required', () => {
        render(<AdminConfirmModal {...defaultProps} showReasonField reasonRequired />);
        expect(screen.getByText('*')).toBeInTheDocument();
    });
});
