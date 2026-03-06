import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    BrainCircuit, Activity, PenTool, Moon, MessageCircle,
    Users, Lightbulb, ShieldAlert, ArrowRight
} from 'lucide-react';
import InteractiveCard from '@/components/ui/InteractiveCard';
import { cn } from '@/lib/utils';
import { staggerContainer, staggerItem } from '@/lib/animations';

interface ToolCard {
    title: string;
    description: string;
    icon: React.ElementType;
    href: string;
    color: { bg: string; text: string; spotlight: string };
    size: 'large' | 'medium' | 'small';
    stat?: string;
}

const tools: ToolCard[] = [
    {
        title: 'Clarity Score',
        description: 'Comprehensive mental well-being assessment. Understand your cognitive and emotional state in 10 minutes.',
        icon: BrainCircuit,
        href: '/clarity-score',
        color: { bg: 'bg-teal-50 dark:bg-teal-900/20', text: 'text-teal-600 dark:text-teal-400', spotlight: 'rgba(20, 184, 166, 0.08)' },
        size: 'large',
        stat: 'Free assessment',
    },
    {
        title: 'Symptom Navigator',
        description: 'Map your symptoms to 45+ conditions — processed entirely on your device.',
        icon: Activity,
        href: '/tools/symptom-navigator',
        color: { bg: 'bg-indigo-50 dark:bg-indigo-900/20', text: 'text-indigo-600 dark:text-indigo-400', spotlight: 'rgba(99, 102, 241, 0.08)' },
        size: 'large',
        stat: '106 symptoms',
    },
    {
        title: 'Mood Journal',
        description: 'Track emotional patterns and identify triggers over time.',
        icon: PenTool,
        href: '/tools/mood-journal',
        color: { bg: 'bg-amber-50 dark:bg-amber-900/20', text: 'text-amber-600 dark:text-amber-400', spotlight: 'rgba(245, 158, 11, 0.08)' },
        size: 'medium',
    },
    {
        title: 'Sleep Architect',
        description: 'Science-backed sleep schedules and habit tracking.',
        icon: Moon,
        href: '/tools/sleep-architect',
        color: { bg: 'bg-sky-50 dark:bg-sky-900/20', text: 'text-sky-600 dark:text-sky-400', spotlight: 'rgba(14, 165, 233, 0.08)' },
        size: 'medium',
    },
    {
        title: 'MindMate AI',
        description: '24/7 AI companion for mental health questions and support.',
        icon: MessageCircle,
        href: '/tools/mindmate',
        color: { bg: 'bg-purple-50 dark:bg-purple-900/20', text: 'text-purple-600 dark:text-purple-400', spotlight: 'rgba(168, 85, 247, 0.08)' },
        size: 'medium',
    },
    {
        title: 'Thought Reframer',
        description: 'CBT-based exercises to challenge negative thought patterns.',
        icon: Lightbulb,
        href: '/tools/thought-reframer',
        color: { bg: 'bg-emerald-50 dark:bg-emerald-900/20', text: 'text-emerald-600 dark:text-emerald-400', spotlight: 'rgba(16, 185, 129, 0.08)' },
        size: 'small',
    },
    {
        title: 'Find a Provider',
        description: '5,000+ verified mental health professionals with NPI-checked credentials.',
        icon: Users,
        href: '/providers',
        color: { bg: 'bg-rose-50 dark:bg-rose-900/20', text: 'text-rose-600 dark:text-rose-400', spotlight: 'rgba(244, 63, 94, 0.08)' },
        size: 'small',
    },
    {
        title: 'Crisis Support',
        description: 'Immediate access to crisis resources in 60+ countries.',
        icon: ShieldAlert,
        href: '/crisis',
        color: { bg: 'bg-red-50 dark:bg-red-900/20', text: 'text-red-600 dark:text-red-400', spotlight: 'rgba(239, 68, 68, 0.08)' },
        size: 'small',
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
                    className="grid grid-cols-1 md:grid-cols-6 gap-4 auto-rows-[minmax(180px,auto)]"
                >
                    {tools.map((tool) => {
                        const Icon = tool.icon;

                        // Grid span based on size
                        const gridClass = cn({
                            'md:col-span-3 md:row-span-2': tool.size === 'large',
                            'md:col-span-2': tool.size === 'medium' || tool.size === 'small',
                        });

                        return (
                            <motion.div key={tool.title} variants={staggerItem} className={gridClass}>
                                <InteractiveCard
                                    onClick={() => navigate(tool.href)}
                                    spotlightColor={tool.color.spotlight}
                                    className="h-full bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-lg cursor-pointer group transition-shadow duration-300"
                                >
                                    <div className={cn(
                                        'relative z-10 flex flex-col h-full',
                                        tool.size === 'large' ? 'p-8 md:p-10' : 'p-6'
                                    )}>
                                        {/* Icon */}
                                        <div className={cn(
                                            'rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110',
                                            tool.color.bg,
                                            tool.size === 'large' ? 'w-14 h-14' : 'w-11 h-11'
                                        )}>
                                            <Icon className={cn(
                                                tool.color.text,
                                                tool.size === 'large' ? 'w-7 h-7' : 'w-5 h-5'
                                            )} />
                                        </div>

                                        {/* Content */}
                                        <h3 className={cn(
                                            'font-display font-bold text-slate-900 dark:text-white mb-2 group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors',
                                            tool.size === 'large' ? 'text-2xl' : 'text-base'
                                        )}>
                                            {tool.title}
                                        </h3>
                                        <p className={cn(
                                            'text-slate-500 dark:text-slate-400 leading-relaxed flex-grow',
                                            tool.size === 'large' ? 'text-base' : 'text-sm'
                                        )}>
                                            {tool.description}
                                        </p>

                                        {/* Stat badge for large cards */}
                                        {tool.stat && (
                                            <div className="mt-4">
                                                <span className="text-xs font-semibold text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-900/30 px-3 py-1 rounded-full">
                                                    {tool.stat}
                                                </span>
                                            </div>
                                        )}

                                        {/* Arrow */}
                                        <div className="mt-auto pt-4 flex justify-end">
                                            <ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-teal-600 dark:group-hover:text-teal-400 group-hover:translate-x-1 transition-all" />
                                        </div>
                                    </div>
                                </InteractiveCard>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default ProductShowcase;
