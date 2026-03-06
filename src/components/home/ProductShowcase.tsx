import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Scan, Compass, Palette, Cpu, CloudMoon,
    ArrowRight
} from 'lucide-react';
import InteractiveCard from '@/components/ui/InteractiveCard';
import { cn } from '@/lib/utils';
import { staggerContainer, staggerItem } from '@/lib/animations';

interface ToolCard {
    title: string;
    description: string;
    icon: React.ElementType;
    href: string;
    color: { bg: string; text: string; spotlight: string; accent: string; gradient: string };
    stat?: string;
}

const tools: ToolCard[] = [
    {
        title: 'Clarity Score',
        description: 'Comprehensive mental well-being assessment. Understand your cognitive and emotional state in 10 minutes.',
        icon: Scan,
        href: '/clarity-score',
        color: { bg: 'bg-teal-50 dark:bg-teal-900/20', text: 'text-teal-600 dark:text-teal-400', spotlight: 'rgba(20, 184, 166, 0.08)', accent: 'border-teal-200/60 dark:border-teal-800/60', gradient: 'from-teal-500/10 to-emerald-500/5' },
        stat: 'Free assessment',
    },
    {
        title: 'Symptom Navigator',
        description: 'Map your symptoms to 45+ conditions — processed entirely on your device.',
        icon: Compass,
        href: '/tools/symptom-navigator',
        color: { bg: 'bg-indigo-50 dark:bg-indigo-900/20', text: 'text-indigo-600 dark:text-indigo-400', spotlight: 'rgba(99, 102, 241, 0.08)', accent: 'border-indigo-200/60 dark:border-indigo-800/60', gradient: 'from-indigo-500/10 to-violet-500/5' },
        stat: '106 symptoms',
    },
    {
        title: 'Mood Journal',
        description: 'Track emotional patterns and identify triggers over time with visual insights.',
        icon: Palette,
        href: '/tools/mood-journal',
        color: { bg: 'bg-amber-50 dark:bg-amber-900/20', text: 'text-amber-600 dark:text-amber-400', spotlight: 'rgba(245, 158, 11, 0.08)', accent: 'border-amber-200/60 dark:border-amber-800/60', gradient: 'from-amber-500/10 to-orange-500/5' },
    },
    {
        title: 'MindMate AI',
        description: '24/7 AI companion for mental health questions, guidance, and support.',
        icon: Cpu,
        href: '/tools/mindmate',
        color: { bg: 'bg-purple-50 dark:bg-purple-900/20', text: 'text-purple-600 dark:text-purple-400', spotlight: 'rgba(168, 85, 247, 0.08)', accent: 'border-purple-200/60 dark:border-purple-800/60', gradient: 'from-purple-500/10 to-fuchsia-500/5' },
    },
    {
        title: 'Sleep Architect',
        description: 'Science-backed sleep schedules and habit tracking for better rest.',
        icon: CloudMoon,
        href: '/tools/sleep-architect',
        color: { bg: 'bg-sky-50 dark:bg-sky-900/20', text: 'text-sky-600 dark:text-sky-400', spotlight: 'rgba(14, 165, 233, 0.08)', accent: 'border-sky-200/60 dark:border-sky-800/60', gradient: 'from-sky-500/10 to-cyan-500/5' },
    },
];

const ProductShowcase: React.FC = () => {
    const navigate = useNavigate();

    return (
        <section className="py-28 px-6 bg-slate-50/50 dark:bg-slate-950 border-y border-slate-100 dark:border-slate-800">
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
                        Assessments, tracking tools, AI support, and professional connections — all free, all private.
                    </p>
                </motion.div>

                {/* Bento Grid */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4"
                >
                    {tools.map((tool, index) => {
                        const Icon = tool.icon;
                        const isFeatured = index < 2;
                        // Bento layout: first 2 span 3 cols each, last 3 span 2 cols each
                        const colSpan = isFeatured ? 'lg:col-span-3' : 'lg:col-span-2';

                        return (
                            <motion.div
                                key={tool.title}
                                variants={staggerItem}
                                className={cn('md:col-span-1', colSpan)}
                            >
                                <InteractiveCard
                                    onClick={() => navigate(tool.href)}
                                    spotlightColor={tool.color.spotlight}
                                    className={cn(
                                        'h-full bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl cursor-pointer group transition-all duration-300',
                                        tool.color.accent
                                    )}
                                >
                                    <div className={cn(
                                        'relative z-10 flex flex-col h-full overflow-hidden',
                                        isFeatured ? 'p-8 md:p-10' : 'p-6'
                                    )}>
                                        {/* Gradient Background Accent */}
                                        <div className={cn(
                                            'absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500',
                                            tool.color.gradient
                                        )} />

                                        {/* Icon */}
                                        <div className={cn(
                                            'relative rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg',
                                            tool.color.bg,
                                            isFeatured ? 'w-14 h-14 mb-6' : 'w-12 h-12 mb-4'
                                        )}>
                                            <Icon className={cn(
                                                tool.color.text,
                                                isFeatured ? 'w-7 h-7' : 'w-6 h-6'
                                            )} strokeWidth={1.5} />
                                        </div>

                                        {/* Content */}
                                        <div className="relative flex-grow min-w-0">
                                            <h3 className={cn(
                                                'font-display font-bold text-slate-900 dark:text-white mb-2 group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors',
                                                isFeatured ? 'text-xl' : 'text-lg'
                                            )}>
                                                {tool.title}
                                            </h3>
                                            <p className={cn(
                                                'text-slate-500 dark:text-slate-400 leading-relaxed',
                                                isFeatured ? 'text-base' : 'text-sm'
                                            )}>
                                                {tool.description}
                                            </p>

                                            {tool.stat && (
                                                <div className="mt-4">
                                                    <span className={cn(
                                                        'text-xs font-semibold px-3 py-1 rounded-full',
                                                        tool.color.text, tool.color.bg
                                                    )}>
                                                        {tool.stat}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Arrow */}
                                        <div className="relative mt-auto pt-4 flex justify-end">
                                            <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-teal-600 dark:group-hover:text-teal-400 group-hover:translate-x-1 transition-all" />
                                        </div>
                                    </div>
                                </InteractiveCard>
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
