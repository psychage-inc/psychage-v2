 
import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useRef } from 'react';
import { useFocusTrap } from '../useFocusTrap';

describe('useFocusTrap', () => {
    let container: HTMLDivElement;
    let button1: HTMLButtonElement;
    let button2: HTMLButtonElement;
    let button3: HTMLButtonElement;

    beforeEach(() => {
        container = document.createElement('div');
        button1 = document.createElement('button');
        button1.textContent = 'First';
        button2 = document.createElement('button');
        button2.textContent = 'Second';
        button3 = document.createElement('button');
        button3.textContent = 'Third';
        container.appendChild(button1);
        container.appendChild(button2);
        container.appendChild(button3);
        document.body.appendChild(container);
    });

    it('should focus first focusable element when activated', () => {
        const focusSpy = vi.spyOn(button1, 'focus');

        renderHook(() => {
            const containerRef = useRef(container);
            useFocusTrap(containerRef, true);
        });

        expect(focusSpy).toHaveBeenCalled();
    });

    it('should not focus when inactive', () => {
        const focusSpy = vi.spyOn(button1, 'focus');

        renderHook(() => {
            const containerRef = useRef(container);
            useFocusTrap(containerRef, false);
        });

        expect(focusSpy).not.toHaveBeenCalled();
    });

    it('should call onClose when Escape is pressed', () => {
        const onClose = vi.fn();

        renderHook(() => {
            const containerRef = useRef(container);
            useFocusTrap(containerRef, true, onClose);
        });

        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should not call onClose when escapeToClose is false', () => {
        const onClose = vi.fn();

        renderHook(() => {
            const containerRef = useRef(container);
            useFocusTrap(containerRef, true, onClose, undefined, undefined, false);
        });

        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
        expect(onClose).not.toHaveBeenCalled();
    });

    it('should call onEscape instead of onClose when provided', () => {
        const onClose = vi.fn();
        const onEscape = vi.fn();

        renderHook(() => {
            const containerRef = useRef(container);
            useFocusTrap(containerRef, true, onClose, undefined, undefined, true, onEscape);
        });

        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
        expect(onEscape).toHaveBeenCalledTimes(1);
        expect(onClose).not.toHaveBeenCalled();
    });

    it('should wrap focus from last to first on Tab', () => {
        renderHook(() => {
            const containerRef = useRef(container);
            useFocusTrap(containerRef, true);
        });

        // Focus last element
        button3.focus();

        const event = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true });
        const preventSpy = vi.spyOn(event, 'preventDefault');
        document.dispatchEvent(event);

        expect(preventSpy).toHaveBeenCalled();
    });

    it('should wrap focus from first to last on Shift+Tab', () => {
        renderHook(() => {
            const containerRef = useRef(container);
            useFocusTrap(containerRef, true);
        });

        // Focus first element
        button1.focus();

        const event = new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true });
        const preventSpy = vi.spyOn(event, 'preventDefault');
        document.dispatchEvent(event);

        expect(preventSpy).toHaveBeenCalled();
    });
});
