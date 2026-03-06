import { useEffect, useRef } from 'react';

/**
 * Custom hook to debounce a callback function.
 * Prevents rapid-fire announcements that spam screen readers (WCAG 4.1.3).
 *
 * @param callback Function to debounce
 * @param delay Delay in milliseconds (default: 300ms)
 * @returns Debounced version of the callback
 */
export function useDebounce<T extends (...args: any[]) => void>(
    callback: T,
    delay: number = 300
): T {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const callbackRef = useRef(callback);

    // Update callback ref when it changes
    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const debouncedCallback = ((...args: Parameters<T>) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            callbackRef.current(...args);
        }, delay);
    }) as T;

    return debouncedCallback;
}
