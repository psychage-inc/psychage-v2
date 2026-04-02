import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Brain, Compass, BookHeart, Sparkles, Moon,
    ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { staggerContainer, staggerItem } from '@/lib/animations';

interface ToolCard {
    title: string;
    description: string;
    icon: React.ElementType;
    href: string;
    bg: string;
    stat?: string;
}

const tools: ToolCard[] = [
    {
        title: 'Clarity Score',
        description: 'Comprehensive mental well-being assessment. Understand your cognitive and emotional state in 10 minutes.',
        icon: Brain,
        href: '/clarity-score',
        bg: 'bg-teal-600',
        stat: 'Free assessment',
    },
    {
        title: 'Symptom Navigator',
        description: 'Map your symptoms to 45+ conditions — processed entirely on your device.',
        icon: Compass,
        href: '/tools/symptom-navigator',
        bg: 'bg-teal-700',
        stat: '106 symptoms',
    },
    {
        title: 'Mood Journal',
        description: 'Track emotional patterns and identify triggers over time with visual insights.',
        icon: BookHeart,
        href: '/tools/mood-journal',
        bg: 'bg-teal-500',
    },
    {
        title: 'MindMate AI',
        description: '24/7 AI companion for mental health questions, guidance, and support.',
        icon: Sparkles,
        href: '/tools/mindmate',
        bg: 'bg-teal-800',
    },
    {
        title: 'Sleep Architect',
        description: 'Science-backed sleep schedules and habit tracking for better rest.',
        icon: Moon,
        href: '/tools/sleep-architect',
        bg: 'bg-teal-900',
    },
];

const ProductShowcase: React.FC = () => {
    const navigate = useNavigate();

    return (
        <section aria-label="Mental health tools" className="py-16 sm:py-20 lg:py-28 px-6 bg-slate-50/50 dark:bg-slate-950 border-y border-slate-100 dark:border-slate-800">
            <div className="container mx-auto max-w-6xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center max-w-2xl mx-auto mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
                        Everything you need, in one place.
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                        Assessments, tracking, AI support, and professional connections — all free, all private.
                    </p>
                </motion.div>

                {/* Cards Grid */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex overflow-x-auto pb-8 -mx-6 px-6 snap-x snap-mandatory gap-4 md:grid md:grid-cols-2 lg:grid-cols-6 md:overflow-visible md:pb-0 md:mx-0 md:px-0 scrollbar-hide"
                >
                    {tools.map((tool, index) => {
                        const Icon = tool.icon;
                        const isPrimary = index === 0;
                        const colSpan = isPrimary ? 'lg:col-span-6' : 'lg:col-span-3';

                        return (
                            <motion.div
                                key={tool.title}
                                variants={staggerItem}
                                className={cn('w-[min(80vw,20rem)] shrink-0 snap-center md:w-auto md:col-span-1', colSpan)}
                            >
                                <div
                                    role="button"
                                    tabIndex={0}
                                    onClick={() => navigate(tool.href)}
                                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigate(tool.href); }}
                                    aria-label={`Open ${tool.title} tool`}
                                    className={cn(
                                        'relative w-full h-full rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 text-left',
                                        'shadow-sm hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1',
                                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2',
                                        tool.bg,
                                        isPrimary ? 'min-h-[220px]' : 'min-h-[200px]'
                                    )}
                                >
                                    {/* Icon — large, bottom-right, decorative */}
                                    <div className="absolute bottom-0 right-0 pointer-events-none">
                                        <Icon
                                            className={cn(
                                                'text-white/[0.12] group-hover:text-white/[0.18] transition-all duration-500',
                                                isPrimary ? 'w-40 h-40 -mr-4 -mb-4' : 'w-28 h-28 -mr-3 -mb-3'
                                            )}
                                            strokeWidth={0.8}
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className={cn(
                                        'relative z-10 flex flex-col h-full',
                                        isPrimary ? 'p-8 md:p-10' : 'p-6 md:p-8'
                                    )}>
                                        {/* Title + Arrow (top) */}
                                        <div className="flex items-center justify-between gap-3 mb-2">
                                            <h3 className={cn(
                                                'font-display font-bold text-white',
                                                isPrimary ? 'text-2xl lg:text-3xl' : 'text-xl'
                                            )}>
                                                {tool.title}
                                            </h3>
                                            <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-white/80 group-hover:translate-x-1 transition-all shrink-0" />
                                        </div>

                                        <p className={cn(
                                            'text-white/70 leading-relaxed',
                                            isPrimary ? 'text-lg max-w-2xl' : 'text-sm'
                                        )}>
                                            {tool.description}
                                        </p>

                                        {tool.stat && (
                                            <div className="mt-4">
                                                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white/15 text-white/90">
                                                    {tool.stat}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* View All Tools */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="mt-10 flex justify-center"
                >
                    <button
                        onClick={() => navigate('/tools')}
                        aria-label="View all Psychage tools and assessments"
                        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors group"
                    >
                        View all tools
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default ProductShowcase;
