import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from './shared/useScrollAnimation';

interface HighlightBoxProps {
    children: React.ReactNode;
    variant?: 'stat' | 'quote' | 'emphasis';
    align?: 'center' | 'left';
    className?: string;
}

const VARIANT_STYLES = {
    stat: {
        bg: 'bg-gradient-to-br from-teal-50 to-white dark:from-teal-950/30 dark:to-neutral-900/50',
        border: 'border-teal-100 dark:border-teal-800/30',
        text: 'text-text-primary',
    },
    quote: {
        bg: 'bg-gradient-to-br from-violet-50 to-white dark:from-violet-950/30 dark:to-neutral-900/50',
        border: 'border-violet-100 dark:border-violet-800/30',
        text: 'text-violet-900 dark:text-violet-100',
    },
    emphasis: {
        bg: 'bg-gradient-to-br from-amber-50 to-white dark:from-amber-950/30 dark:to-neutral-900/50',
        border: 'border-amber-100 dark:border-amber-800/30',
        text: 'text-amber-900 dark:text-amber-100',
    },
};

const HighlightBox: React.FC<HighlightBoxProps> = ({
    children,
    variant = 'stat',
    align = 'center',
    className = '',
}) => {
    const { ref, isInView } = useScrollAnimation();
    const styles = VARIANT_STYLES[variant];

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className={`
                not-prose my-8 py-8 px-8 rounded-2xl
                ${styles.bg}
                border ${styles.border}
                ${styles.text}
                ${align === 'center' ? 'text-center' : 'text-left'}
                ${className}
            `}
        >
            <div className="space-y-3 [&>span]:block [&>p]:text-base [&>p]:text-text-secondary">
                {children}
            </div>
        </motion.div>
    );
};

export { HighlightBox };
export type { HighlightBoxProps };
