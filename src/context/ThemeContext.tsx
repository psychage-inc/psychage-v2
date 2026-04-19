import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

type Theme = 'light' | 'dark';
type ResolvedTheme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    resolvedTheme: ResolvedTheme;
    isDark: boolean;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
}

const STORAGE_KEY = 'psychage_theme';

function resolveTheme(theme: Theme): ResolvedTheme {
    return theme;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: 'light',
    resolvedTheme: 'light',
    isDark: false,
    setTheme: () => {},
    toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setThemeState] = useState<Theme>(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored === 'dark' ? 'dark' : 'light';
    });

    const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() => resolveTheme(theme));

    const applyTheme = useCallback((resolved: ResolvedTheme) => {
        const root = document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(resolved);
        root.style.colorScheme = resolved;
        setResolvedTheme(resolved);
    }, []);

    // Apply on mount and when theme changes
    useEffect(() => {
        applyTheme(resolveTheme(theme));
    }, [theme, applyTheme]);

    const setTheme = useCallback((newTheme: Theme) => {
        setThemeState(newTheme);
        localStorage.setItem(STORAGE_KEY, newTheme);
    }, []);

    const toggleTheme = useCallback(() => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    }, [theme, setTheme]);

    return (
        <ThemeContext.Provider value={{
            theme,
            resolvedTheme,
            isDark: resolvedTheme === 'dark',
            setTheme,
            toggleTheme,
        }}>
            {children}
        </ThemeContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = (): ThemeContextType => {
    return useContext(ThemeContext);
};

export default ThemeContext;
