import { describe, it, expect } from 'vitest';
import { render, act } from '@testing-library/react';
import { useAuthErrorFocus } from '../useAuthErrorFocus';
import { useState } from 'react';

/**
 * Coverage for AUTH-017 — error focus management.
 */

function Harness({ initial }: { initial: string | null }) {
    const [error, setError] = useState<string | null>(initial);
    const alertRef = useAuthErrorFocus<HTMLDivElement>(error);
    return (
        <div>
            {error && (
                <div ref={alertRef} role="alert" tabIndex={-1} data-testid="alert">
                    {error}
                </div>
            )}
            <button data-testid="set-a" onClick={() => setError('Error A')}>set A</button>
            <button data-testid="set-b" onClick={() => setError('Error B')}>set B</button>
            <button data-testid="clear" onClick={() => setError(null)}>clear</button>
        </div>
    );
}

describe('useAuthErrorFocus — AUTH-017', () => {
    it('does NOT move focus when error is null', () => {
        const { queryByTestId } = render(<Harness initial={null} />);
        expect(queryByTestId('alert')).toBeNull();
    });

    it('moves focus to the alert when error becomes non-null', async () => {
        const { getByTestId } = render(<Harness initial={null} />);
        await act(async () => {
            getByTestId('set-a').click();
        });
        const alert = getByTestId('alert');
        expect(document.activeElement).toBe(alert);
    });

    it('re-focuses when the error changes from one value to another', async () => {
        const { getByTestId } = render(<Harness initial={null} />);
        await act(async () => {
            getByTestId('set-a').click();
        });
        const alertA = getByTestId('alert');
        expect(document.activeElement).toBe(alertA);

        // Move focus away
        await act(async () => {
            (getByTestId('set-b') as HTMLButtonElement).focus();
        });
        expect(document.activeElement).toBe(getByTestId('set-b'));

        // Trigger a different error
        await act(async () => {
            getByTestId('set-b').click();
        });
        // Focus should snap back to the alert (same element, new content)
        expect(document.activeElement).toBe(getByTestId('alert'));
    });

    it('does not throw when error clears to null', async () => {
        const { getByTestId, queryByTestId } = render(<Harness initial="x" />);
        expect(getByTestId('alert')).toBeTruthy();
        await act(async () => {
            getByTestId('clear').click();
        });
        expect(queryByTestId('alert')).toBeNull();
    });
});
