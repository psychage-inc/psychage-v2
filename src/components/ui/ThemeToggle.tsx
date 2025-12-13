import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface ThemeToggleProps {
    variant?: 'icon-only' | 'labeled';
    className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = () => {
    return null;
};

export default ThemeToggle;
