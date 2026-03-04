import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';

// Mock framer-motion
vi.mock('framer-motion', () => {
    const React = require('react');
    return {
        motion: {
            div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
            button: React.forwardRef(({ children, ...props }: any, ref: any) => (
                <button ref={ref} {...props}>{children}</button>
            )),
        },
        AnimatePresence: ({ children }: any) => <>{children}</>,
    };
});

describe('ConfirmDialog - Interaction Tests', () => {
    it('should call onConfirm when confirm button is clicked', async () => {
        const user = userEvent.setup();
        const onConfirm = vi.fn();
        const onClose = vi.fn();

        render(
            <ConfirmDialog
                isOpen={true}
                onClose={onClose}
                onConfirm={onConfirm}
                title="Start Over?"
                message="This will clear your current selections."
                confirmText="Start Over"
                cancelText="Cancel"
                variant="destructive"
            />
        );

        const confirmButton = screen.getByRole('button', { name: /start over/i });
        await user.click(confirmButton);

        expect(onConfirm).toHaveBeenCalledTimes(1);
    });

    it('should call onClose when cancel button is clicked', async () => {
        const user = userEvent.setup();
        const onConfirm = vi.fn();
        const onClose = vi.fn();

        render(
            <ConfirmDialog
                isOpen={true}
                onClose={onClose}
                onConfirm={onConfirm}
                title="Start Over?"
                message="This will clear your current selections."
                confirmText="Start Over"
                cancelText="Cancel"
            />
        );

        const cancelButton = screen.getByRole('button', { name: /cancel/i });
        await user.click(cancelButton);

        expect(onClose).toHaveBeenCalledTimes(1);
        expect(onConfirm).not.toHaveBeenCalled();
    });

    it('should display the correct title and message', () => {
        render(
            <ConfirmDialog
                isOpen={true}
                onClose={vi.fn()}
                onConfirm={vi.fn()}
                title="Test Title"
                message="Test message content"
                confirmText="OK"
                cancelText="Cancel"
            />
        );

        expect(screen.getByText('Test Title')).toBeInTheDocument();
        expect(screen.getByText('Test message content')).toBeInTheDocument();
    });
});
