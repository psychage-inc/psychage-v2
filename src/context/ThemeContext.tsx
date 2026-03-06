import React, { createContext, useContext, useEffect, useCallback } from 'react';

interface ThemeContextType {
    theme: 'light';
    isDark: false;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: 'light',
    isDark: false,
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const applyTheme = useCallback(() => {
        const root = document.documentElement;
        root.classList.remove('dark');
        root.classList.add('light');
        root.style.colorScheme = 'light';
    }, []);

    useEffect(() => {
        applyTheme();
    }, [applyTheme]);

    return (
        <ThemeContext.Provider value={{ theme: 'light', isDark: false }}>
            {children}
        </ThemeContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = (): ThemeContextType => {
    return useContext(ThemeContext);
};

export default ThemeContext;
