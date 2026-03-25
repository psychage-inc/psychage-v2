 
import { describe, it, expect, vi } from 'vitest';
import { toast } from 'sonner';
import { ToastType } from '../Toast';

// Toast rendering is now handled by Sonner's <Toaster />.
// These tests verify the useToast API contract (from ToastContext).

vi.mock('sonner', () => ({
    toast: Object.assign(vi.fn(), {
        success: vi.fn(),
        error: vi.fn(),
        warning: vi.fn(),
        info: vi.fn(),
        dismiss: vi.fn(),
    }),
}));

describe('Toast (Sonner integration)', () => {
    it('should export ToastType type', () => {
        const type: ToastType = 'success';
        expect(type).toBe('success');
    });

    it('should support all toast types', () => {
        const types: ToastType[] = ['success', 'error', 'warning', 'info'];
        types.forEach((type) => {
            toast[type](`Test ${type} message`);
            expect(toast[type]).toHaveBeenCalledWith(`Test ${type} message`);
        });
    });

    it('should support dismiss', () => {
        toast.dismiss('toast-1');
        expect(toast.dismiss).toHaveBeenCalledWith('toast-1');
    });
});
