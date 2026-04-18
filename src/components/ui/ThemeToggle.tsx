import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

const ThemeToggle: React.FC<{ className?: string }> = ({ className }) => {
    const { theme, toggleTheme } = useTheme();

    const Icon = theme === 'dark' ? Moon : Sun;
    const label = theme === 'dark' ? 'Dark mode' : 'Light mode';

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className={cn(
                'w-9 h-9 rounded-full flex items-center justify-center',
                'text-text-tertiary hover:text-text-primary hover:bg-surface-hover',
                'transition-colors',
                className
            )}
            aria-label={`Theme: ${label}. Click to change.`}
        >
            <Icon size={18} aria-hidden="true" />
        </button>
    );
};

export default ThemeToggle;
