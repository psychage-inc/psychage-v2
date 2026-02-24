/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                background: 'var(--color-background)',
                surface: {
                    DEFAULT: 'var(--color-surface)',
                    hover: 'var(--color-surface-hover)',
                    active: 'var(--color-surface-active)',
                },
                primary: {
                    DEFAULT: 'var(--color-primary)',
                    hover: 'var(--color-primary-hover)',
                    light: 'var(--color-primary-light)',
                },
                text: {
                    primary: 'var(--color-text-primary)',
                    secondary: 'var(--color-text-secondary)',
                    tertiary: 'var(--color-text-tertiary)',
                },
                border: {
                    DEFAULT: 'var(--color-border)',
                    hover: 'var(--color-border-hover)',
                },
                error: 'var(--color-error)',
                success: 'var(--color-success)',
                warning: 'var(--color-warning)',
                // Psychage Brand System
                teal: {
                    50: '#F0FDFA',
                    400: '#2DD4BF',
                    500: '#14B8A6',
                    600: '#0D9488',
                },
                charcoal: {
                    100: '#F5F5F4',
                    300: '#D6D3D1',
                    500: '#78716C',
                    700: '#44403C',
                    900: '#1C1917',
                },
                crisis: {
                    red: '#DC2626',
                },
                urgent: {
                    amber: '#D97706',
                },
                watch: {
                    blue: '#2563EB',
                },
                safe: {
                    green: '#059669',
                },
                relevance: {
                    high: '#0D9488',
                    moderate: '#6366F1',
                    explore: '#8B5CF6',
                }
            },
            fontFamily: {
                sans: ['var(--font-sans)'],
                display: ['var(--font-display)'],
            },
            spacing: {
                '1': 'var(--space-1)',
                '2': 'var(--space-2)',
                '3': 'var(--space-3)',
                '4': 'var(--space-4)',
                '6': 'var(--space-6)',
                '8': 'var(--space-8)',
                '12': 'var(--space-12)',
                '16': 'var(--space-16)',
            },
            borderRadius: {
                sm: 'var(--radius-sm)',
                md: 'var(--radius-md)',
                lg: 'var(--radius-lg)',
                xl: 'var(--radius-xl)',
                full: 'var(--radius-full)',
            },
            boxShadow: {
                sm: 'var(--shadow-sm)',
                md: 'var(--shadow-md)',
                lg: 'var(--shadow-lg)',
                glow: 'var(--shadow-glow)',
            },
            transitionDuration: {
                fast: 'var(--transition-fast)',
                normal: 'var(--transition-normal)',
                slow: 'var(--transition-slow)',
            },
        },
    },
    plugins: [],
}
