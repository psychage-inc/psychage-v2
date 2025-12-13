import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

type Theme = 'light';

interface ThemeContextType {
    theme: Theme;
    isDark: boolean;
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: 'light',
    isDark: false,
    setTheme: () => { },
    toggleTheme: () => { },
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [theme, setThemeState] = useState<Theme>('light');

    // Apply theme to DOM
    const applyTheme = useCallback(() => {
        const root = document.documentElement;
        root.classList.remove('dark');
        root.classList.add('light');
        root.style.colorScheme = 'light';
        localStorage.setItem('theme', 'light');
    }, []);

    // Apply theme on mount
    useEffect(() => {
        applyTheme();
    }, [applyTheme]);

    // Force light mode on system preference changes too, just in case
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => {
            applyTheme();
        };
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [applyTheme]);

    const setTheme = useCallback(() => {
        // No-op, always light
    }, []);

    const toggleTheme = useCallback(() => {
        // No-op
    }, []);

    const value: ThemeContextType = {
        theme: 'light',
        isDark: false,
        setTheme,
        toggleTheme,
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = (): ThemeContextType => {
    return useContext(ThemeContext);
};

export default ThemeContext;
