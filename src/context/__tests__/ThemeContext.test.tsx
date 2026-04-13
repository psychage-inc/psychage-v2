import { render, screen } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { ThemeProvider, useTheme } from '../ThemeContext';

describe('ThemeContext', () => {
    beforeEach(() => {
        localStorage.clear();
        document.documentElement.classList.remove('light', 'dark');
    });

    it('should default to system theme', () => {
        const { result } = renderHook(() => useTheme(), {
            wrapper: ThemeProvider,
        });

        expect(result.current.theme).toBe('system');
        // resolvedTheme depends on system preference (jsdom defaults to light)
        expect(['light', 'dark']).toContain(result.current.resolvedTheme);
    });

    it('should apply theme class to document root', () => {
        render(
            <ThemeProvider>
                <div>test</div>
            </ThemeProvider>
        );

        const hasThemeClass = document.documentElement.classList.contains('light')
            || document.documentElement.classList.contains('dark');
        expect(hasThemeClass).toBe(true);
    });

    it('should toggle between light, dark, and system', () => {
        const { result } = renderHook(() => useTheme(), {
            wrapper: ThemeProvider,
        });

        // Default is system — toggle to light
        act(() => result.current.setTheme('light'));
        expect(result.current.theme).toBe('light');
        expect(result.current.isDark).toBe(false);

        // Toggle to dark
        act(() => result.current.toggleTheme());
        expect(result.current.theme).toBe('dark');
        expect(result.current.isDark).toBe(true);

        // Toggle to system
        act(() => result.current.toggleTheme());
        expect(result.current.theme).toBe('system');
    });

    it('should persist theme to localStorage', () => {
        const { result } = renderHook(() => useTheme(), {
            wrapper: ThemeProvider,
        });

        act(() => result.current.setTheme('dark'));
        expect(localStorage.getItem('psychage_theme')).toBe('dark');
    });

    it('should render children', () => {
        render(
            <ThemeProvider>
                <div data-testid="child">Hello</div>
            </ThemeProvider>
        );

        expect(screen.getByTestId('child')).toBeInTheDocument();
    });
});
