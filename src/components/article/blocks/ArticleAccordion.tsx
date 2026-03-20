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
                className="rounded-xl border border-gray-200 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700 overflow-hidden"
            >
                {items.map((item, idx) => {
                    const itemId = item.id ?? `item-${idx}`;
                    return (
                        <Accordion.Item key={itemId} value={itemId}>
                            <Accordion.Header>
                                <Accordion.Trigger className="group flex items-center gap-3 w-full px-5 py-4 text-left bg-white dark:bg-gray-900/50 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                    {item.icon && (
                                        <span className="text-teal-500 shrink-0">{item.icon}</span>
                                    )}
                                    <span className="flex-1 text-sm font-semibold text-gray-900 dark:text-white">
                                        {item.title}
                                    </span>
                                    <ChevronDown
                                        size={16}
                                        className="text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-180"
                                    />
                                </Accordion.Trigger>
                            </Accordion.Header>
                            <Accordion.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                                <div className="px-5 py-4 text-sm text-gray-700 dark:text-gray-300 leading-relaxed bg-gray-50/50 dark:bg-gray-800/20 [&>p]:mb-3 [&>p:last-child]:mb-0">
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
