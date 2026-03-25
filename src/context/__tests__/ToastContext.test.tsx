 
import { renderHook } from '@testing-library/react';
import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { toast } from 'sonner';
import { ToastProvider, useToast } from '../ToastContext';

vi.mock('sonner', () => ({
    toast: Object.assign(vi.fn(), {
        success: vi.fn(),
        error: vi.fn(),
        warning: vi.fn(),
        info: vi.fn(),
        dismiss: vi.fn(),
    }),
}));

describe('ToastContext', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
        <ToastProvider>{children}</ToastProvider>
    );

    it('should provide toast methods without provider (uses default context)', () => {
        const { result } = renderHook(() => useToast());

        expect(typeof result.current.addToast).toBe('function');
        expect(typeof result.current.removeToast).toBe('function');
        expect(typeof result.current.success).toBe('function');
        expect(typeof result.current.error).toBe('function');
        expect(typeof result.current.warning).toBe('function');
        expect(typeof result.current.info).toBe('function');
    });

    it('should call sonner toast.success via success shorthand', () => {
        const { result } = renderHook(() => useToast(), { wrapper });

        act(() => {
            result.current.success('Success!');
        });

        expect(toast.success).toHaveBeenCalledWith('Success!', undefined);
    });

    it('should call sonner toast.error via error shorthand', () => {
        const { result } = renderHook(() => useToast(), { wrapper });

        act(() => {
            result.current.error('Error!');
        });

        expect(toast.error).toHaveBeenCalledWith('Error!', undefined);
    });

    it('should call sonner toast with duration', () => {
        const { result } = renderHook(() => useToast(), { wrapper });

        act(() => {
            result.current.success('With duration', 3000);
        });

        expect(toast.success).toHaveBeenCalledWith('With duration', { duration: 3000 });
    });

    it('should call addToast with correct type', () => {
        const { result } = renderHook(() => useToast(), { wrapper });

        act(() => {
            result.current.addToast('warning', 'Warning message');
        });

        expect(toast.warning).toHaveBeenCalledWith('Warning message', undefined);
    });

    it('should call removeToast via dismiss', () => {
        const { result } = renderHook(() => useToast(), { wrapper });

        act(() => {
            result.current.removeToast('toast-1');
        });

        expect(toast.dismiss).toHaveBeenCalledWith('toast-1');
    });

    it('should render children', () => {
        render(
            <ToastProvider>
                <div data-testid="child">Child Content</div>
            </ToastProvider>
        );

        expect(screen.getByTestId('child')).toBeInTheDocument();
    });
});
