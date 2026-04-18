import React from 'react';
import { Quote, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from './shared/useScrollAnimation';

interface QuoteBlockProps {
    quote: React.ReactNode;
    attribution?: string;
    /** Alias for attribution used by some articles */
    author?: string;
    role?: string;
    /** Alias for role used by some articles */
    context?: string;
    source?: string;
    sourceLink?: string;
    variant?: 'default' | 'large' | 'sidebar';
    className?: string;
}

const QuoteBlock: React.FC<QuoteBlockProps> = ({
    quote,
    attribution,
    author,
    role,
    context,
    source,
    sourceLink,
    variant = 'default',
    className = '',
}) => {
    const { ref, isInView } = useScrollAnimation();
    const resolvedAttribution = attribution ?? author ?? '';
    const resolvedRole = role ?? context;

    const isLarge = variant === 'large';
    const isSidebar = variant === 'sidebar';

    return (
        <motion.figure
            ref={ref}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className={`
                not-prose my-8 relative
                ${isSidebar ? 'float-right ml-8 mb-4 w-72' : ''}
                ${className}
            `}
        >
            <blockquote
                className={`
                    relative p-8 rounded-2xl
                    bg-surface
                    border-l-4 border-teal-500
                    ${isLarge ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'}
                    italic font-medium
                    text-text-primary
                    leading-relaxed
                `}
            >
                <Quote
                    size={isLarge ? 32 : 24}
                    className="absolute top-4 left-4 text-teal-500/20"
                />
                <span className="relative z-10">{quote}</span>
            </blockquote>
            <figcaption className="mt-4 flex items-center justify-end gap-2 text-sm text-text-tertiary">
                <span>
                    — <strong className="text-text-secondary">{resolvedAttribution}</strong>
                    {resolvedRole && <span className="text-text-tertiary">, {resolvedRole}</span>}
                </span>
                {source && (
                    <>
                        <span className="text-border">|</span>
                        {sourceLink ? (
                            <a
                                href={sourceLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-primary hover:underline"
                            >
                                <em>{source}</em>
                                <ExternalLink size={11} />
                            </a>
                        ) : (
                            <em>{source}</em>
                        )}
                    </>
                )}
            </figcaption>
        </motion.figure>
    );
};

export { QuoteBlock };
export type { QuoteBlockProps };
