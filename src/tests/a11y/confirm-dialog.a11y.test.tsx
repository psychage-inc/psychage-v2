import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ConfirmDialog } from '../../components/ui/ConfirmDialog';

expect.extend(toHaveNoViolations);

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

describe('ConfirmDialog - Accessibility', () => {
    it('should have no accessibility violations when open', async () => {
        const { container } = render(
            <ConfirmDialog
                isOpen={true}
                onClose={vi.fn()}
                onConfirm={vi.fn()}
                title="Test Confirmation"
                message="This is a test message."
                confirmText="Confirm"
                cancelText="Cancel"
            />
        );

        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with destructive variant', async () => {
        const { container } = render(
            <ConfirmDialog
                isOpen={true}
                onClose={vi.fn()}
                onConfirm={vi.fn()}
                title="Destructive Action"
                message="This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
                variant="destructive"
            />
        );

        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });
});
