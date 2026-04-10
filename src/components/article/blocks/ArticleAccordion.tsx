import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
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

const ArticleAccordion: React.FC<ArticleAccordionProps> = ({
    items,
    type = 'single',
    defaultOpen,
    className = '',
}) => {
    const { ref, isInView } = useScrollAnimation();

    const rootProps =
        type === 'single'
            ? { type: 'single' as const, collapsible: true, defaultValue: defaultOpen }
            : { type: 'multiple' as const, defaultValue: defaultOpen ? [defaultOpen] : [] };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className={`not-prose my-8 ${className}`}
        >
            <Accordion.Root
                {...rootProps}
                className="rounded-xl border border-border divide-y divide-border overflow-hidden"
            >
                {items.map((item, idx) => {
                    const itemId = item.id ?? `item-${idx}`;
                    return (
                        <Accordion.Item key={itemId} value={itemId}>
                            <Accordion.Header>
                                <Accordion.Trigger className="group flex items-center gap-3 w-full px-5 py-4 text-left bg-surface hover:bg-surface-hover transition-colors">
                                    {item.icon && (
                                        <span className="text-primary shrink-0">{item.icon}</span>
                                    )}
                                    <span className="flex-1 text-sm font-semibold text-text-primary">
                                        {item.title}
                                    </span>
                                    <ChevronDown
                                        size={16}
                                        className="text-text-tertiary transition-transform duration-200 group-data-[state=open]:rotate-180"
                                    />
                                </Accordion.Trigger>
                            </Accordion.Header>
                            <Accordion.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                                <div className="px-5 py-4 text-sm text-text-secondary leading-relaxed bg-surface-hover/50 [&>p]:mb-3 [&>p:last-child]:mb-0">
                                    {item.content ?? item.description}
                                </div>
                            </Accordion.Content>
                        </Accordion.Item>
                    );
                })}
            </Accordion.Root>
        </motion.div>
    );
};

export { ArticleAccordion };
export type { AccordionItem, ArticleAccordionProps };
