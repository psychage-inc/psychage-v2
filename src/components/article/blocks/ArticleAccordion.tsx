import React from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from './shared/useScrollAnimation';

interface AccordionItem {
    id?: string;
    title: string;
    content?: React.ReactNode;
    description?: React.ReactNode;
    icon?: React.ReactNode;
}

interface ArticleAccordionProps {
    items: AccordionItem[];
    type?: 'single' | 'multiple';
    defaultOpen?: string;
    className?: string;
}

/**
 * Native <details>/<summary> accordion.
 *
 * Replaces the previous Radix implementation, which broke the seeded article HTML two ways:
 *   1. Radix unmounts closed <Accordion.Content> during SSR (renderToStaticMarkup), so the
 *      stored HTML kept the trigger titles but EMPTY content panels — the bodies were lost.
 *   2. The static reader injects that HTML with no JS runtime, so Radix triggers were never
 *      tappable anyway.
 * Native <details> renders its content into the markup unconditionally and toggles with zero
 * JS — interactive in the static reader, keyboard-accessible for free, reduced-motion friendly.
 */
const ArticleAccordion: React.FC<ArticleAccordionProps> = ({
    items,
    type = 'single',
    defaultOpen,
    className = '',
}) => {
    const { ref, isInView } = useScrollAnimation();
    // Stable per-instance group name (SSR-safe). Used for native exclusive-open in single mode.
    const groupName = React.useId();

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className={`not-prose my-8 ${className}`}
        >
            <div className="rounded-xl border border-border divide-y divide-border overflow-hidden">
                {items.map((item, idx) => {
                    const itemId = item.id ?? `item-${idx}`;
                    // `name` makes single-mode mutually exclusive in modern browsers; older
                    // browsers ignore it and fall back to independent toggles (acceptable).
                    const detailsProps: React.DetailsHTMLAttributes<HTMLDetailsElement> & {
                        name?: string;
                    } = {};
                    if (type === 'single') detailsProps.name = groupName;
                    if (defaultOpen && itemId === defaultOpen) detailsProps.open = true;

                    return (
                        <details key={itemId} className="group" {...detailsProps}>
                            <summary className="group flex items-center gap-3 w-full px-5 py-4 text-left bg-surface hover:bg-surface-hover transition-colors cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/40">
                                {item.icon && (
                                    <span className="text-primary shrink-0">{item.icon}</span>
                                )}
                                <span className="flex-1 text-sm font-semibold text-text-primary">
                                    {item.title}
                                </span>
                                <ChevronDown
                                    size={16}
                                    className="text-text-tertiary shrink-0 transition-transform duration-200 group-open:rotate-180"
                                />
                            </summary>
                            <div className="px-5 py-4 text-sm text-text-secondary leading-relaxed bg-surface-hover/50 [&>p]:mb-3 [&>p:last-child]:mb-0">
                                {item.content ?? item.description}
                            </div>
                        </details>
                    );
                })}
            </div>
        </motion.div>
    );
};

export { ArticleAccordion };
export type { AccordionItem, ArticleAccordionProps };
