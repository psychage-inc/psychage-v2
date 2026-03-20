import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useScrollAnimation } from './shared/useScrollAnimation';

interface BeforeAfterPanel {
    title: string;
    content?: React.ReactNode;
    /** Some articles pass bullet points instead of content */
    points?: string[];
    /** Alias for points */
    items?: string[];
}

interface BeforeAfterProps {
    before: BeforeAfterPanel;
    after: BeforeAfterPanel;
    className?: string;
}

const PanelContent: React.FC<{ panel: BeforeAfterPanel }> = ({ panel }) => {
    if (panel.content) return <>{panel.content}</>;
    const bullets = panel.points ?? panel.items;
    if (bullets?.length) {
        return (
            <ul className="space-y-2 list-disc pl-4">
                {bullets.map((point, i) => (
                    <li key={i}>{point}</li>
                ))}
            </ul>
        );
    }
    return null;
};

const BeforeAfter: React.FC<BeforeAfterProps> = ({
    before,
    after,
    className = '',
}) => {
    const { ref, isInView } = useScrollAnimation();

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className={`not-prose my-8 ${className}`}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
                {/* Before panel */}
                <div className="bg-red-50/50 dark:bg-red-950/10 p-6 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                            {before.title}
                        </span>
                    </div>
                    <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed [&>p]:mb-3 [&>p:last-child]:mb-0 [&>ul]:space-y-2 [&>ul]:list-disc [&>ul]:pl-4">
                        <PanelContent panel={before} />
                    </div>
                </div>

                {/* Arrow divider (mobile) */}
                <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    {/* This is handled by the border between panels */}
                </div>

                {/* After panel */}
                <div className="bg-emerald-50/50 dark:bg-emerald-950/10 p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                            {after.title}
                        </span>
                    </div>
                    <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed [&>p]:mb-3 [&>p:last-child]:mb-0 [&>ul]:space-y-2 [&>ul]:list-disc [&>ul]:pl-4">
                        <PanelContent panel={after} />
                    </div>
                </div>
            </div>

            {/* Mobile arrow between panels */}
            <div className="flex md:hidden justify-center -mt-1 -mb-1">
                <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center shadow-sm -translate-y-5">
                    <ArrowRight size={14} className="text-gray-400 rotate-90" />
                </div>
            </div>
        </motion.div>
    );
};

export { BeforeAfter };
export type { BeforeAfterPanel, BeforeAfterProps };
