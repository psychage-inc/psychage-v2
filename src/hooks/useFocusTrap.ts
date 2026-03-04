import { useEffect, useRef } from 'react';

/**
 * Custom hook to trap focus within a specified container.
 *
 * @param containerRef Ref to the container element where focus should be trapped
 * @param isActive Boolean indicating whether the focus trap should be active
 * @param onClose Callback fired when the Escape key is pressed (if escapeToClose is true)
 * @param restoreFocusRef Optional ref to an element that should receive focus when the trap deactivates. If not provided, focus returns to the element active when the trap activated.
 * @param initialFocusRef Optional ref to an element that should receive focus when the trap activates. If not provided, focuses the first focusable element.
 * @param escapeToClose If false, Escape key will not close the dialog (default: true)
 * @param onEscape Optional custom handler for Escape key (e.g., to focus a specific element instead of closing)
 */
export function useFocusTrap(
    containerRef: React.RefObject<HTMLElement | null>,
    isActive: boolean,
    onClose?: () => void,
    restoreFocusRef?: React.RefObject<HTMLElement | null>,
    initialFocusRef?: React.RefObject<HTMLElement | null>,
    escapeToClose: boolean = true,
    onEscape?: () => void
) {
    const previousFocusRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (!isActive || !containerRef.current) {
            // Restore focus when deactivated (WCAG 2.4.3 Focus Order requirement)
            if (!isActive && previousFocusRef.current) {
                const targetToFocus = restoreFocusRef?.current || previousFocusRef.current;
                // Double check it's still in the document before focusing
                if (document.body.contains(targetToFocus)) {
                    targetToFocus.focus();
                }
            }
            return;
        }

        // Store active element when activated for later restoration
        previousFocusRef.current = document.activeElement as HTMLElement;

        const container = containerRef.current;

        // Find all focusable elements inside the container
        const getFocusableElements = () => {
            if (!container) return [];
            return Array.from(
                container.querySelectorAll<HTMLElement>(
                    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
                )
            ).filter(el => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'));
        };

        // Move focus into container on mount (WCAG 2.4.3 Focus Order requirement)
        // Prefer initialFocusRef if provided (e.g., modal heading for context)
        if (initialFocusRef?.current && document.body.contains(initialFocusRef.current)) {
            initialFocusRef.current.focus();
        } else {
            const focusableElements = getFocusableElements();
            if (focusableElements.length > 0) {
                focusableElements[0].focus();
            } else {
                // If no focusable elements, focus the container itself (it needs a tabIndex for this to work)
                container.focus();
            }
        }

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                if (onEscape) {
                    // Custom Escape handler (e.g., focus primary button)
                    onEscape();
                    return;
                }
                if (escapeToClose && onClose) {
                    onClose();
                }
                return;
            }

            if (e.key === 'Tab') {
                const focusable = getFocusableElements();
                if (focusable.length === 0) {
                    e.preventDefault();
                    return;
                }

                const firstElement = focusable[0];
                const lastElement = focusable[focusable.length - 1];

                // If going backwards with Shift+Tab
                if (e.shiftKey) {
                    if (document.activeElement === firstElement || document.activeElement === container) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                }
                // If going forwards with Tab
                else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isActive, containerRef, onClose, restoreFocusRef, initialFocusRef, escapeToClose, onEscape]);
}
