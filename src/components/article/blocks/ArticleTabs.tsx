import React from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { motion } from 'framer-motion';
import { useScrollAnimation } from './shared/useScrollAnimation';

interface TabItem {
    id?: string;
    label: string;
    description?: React.ReactNode;
    icon?: React.ReactNode;
    content?: React.ReactNode;
}

interface ArticleTabsProps {
    tabs: TabItem[];
    defaultTab?: string;
    className?: string;
}

const ArticleTabs: React.FC<ArticleTabsProps> = ({
    tabs,
    defaultTab,
    className = '',
}) => {
    const { ref, isInView } = useScrollAnimation();

    if (tabs.length === 0) return null;

    // Auto-generate IDs for tabs that don't have them
    const resolvedTabs = tabs.map((tab, i) => ({
        ...tab,
        id: tab.id ?? `tab-${i}`,
    }));

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className={`my-10 ${className}`}
        >
            <Tabs.Root defaultValue={defaultTab || resolvedTabs[0].id}>
                <Tabs.List className="flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
                    {resolvedTabs.map((tab) => (
                        <Tabs.Trigger
                            key={tab.id}
                            value={tab.id}
                            className="
                                flex items-center gap-2 px-4 py-3
                                text-sm font-medium text-gray-500 dark:text-gray-400
                                whitespace-nowrap
                                border-b-2 border-transparent
                                hover:text-gray-700 dark:hover:text-gray-300
                                data-[state=active]:text-teal-600 data-[state=active]:dark:text-teal-400
                                data-[state=active]:border-teal-500
                                transition-colors
                            "
                        >
                            {tab.icon && (
                                <span className="shrink-0">{tab.icon}</span>
                            )}
                            {tab.label}
                        </Tabs.Trigger>
                    ))}
                </Tabs.List>
                {resolvedTabs.map((tab) => (
                    <Tabs.Content
                        key={tab.id}
                        value={tab.id}
                        className="pt-6 text-sm text-gray-700 dark:text-gray-300 leading-relaxed focus:outline-none [&>p]:mb-3 [&>p:last-child]:mb-0"
                    >
                        {tab.content ?? tab.description}
                    </Tabs.Content>
                ))}
            </Tabs.Root>
        </motion.div>
    );
};

export { ArticleTabs };
export type { TabItem, ArticleTabsProps };
