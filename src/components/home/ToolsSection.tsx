import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, PenTool, Moon, BrainCircuit, Activity, Wind, Users, ShieldAlert, LucideIcon } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useToolService } from '@/services/toolService';
import { Tool } from '@/types/models';
import { SkeletonToolsSection } from '@/components/ui/Skeletons';
import InteractiveCard from '../ui/InteractiveCard';
import { cn } from '@/lib/utils';

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
    PenTool,
    Moon,
    BrainCircuit,
    Wind,
    Users,
    ShieldAlert,
    Activity,
};

// Color scheme mapping for tool cards
const colorSchemes: Record<string, { iconBg: string; iconColor: string; spotlight: string }> = {
    teal: { iconBg: 'bg-teal-50', iconColor: 'text-teal-600', spotlight: 'rgba(20, 184, 166, 0.1)' },
    indigo: { iconBg: 'bg-indigo-50', iconColor: 'text-indigo-600', spotlight: 'rgba(99, 102, 241, 0.1)' },
    amber: { iconBg: 'bg-amber-50', iconColor: 'text-amber-600', spotlight: 'rgba(245, 158, 11, 0.1)' },
    sky: { iconBg: 'bg-sky-50', iconColor: 'text-sky-600', spotlight: 'rgba(14, 165, 233, 0.1)' },
    rose: { iconBg: 'bg-rose-50', iconColor: 'text-rose-600', spotlight: 'rgba(244, 63, 94, 0.1)' },
    red: { iconBg: 'bg-red-50', iconColor: 'text-red-600', spotlight: 'rgba(239, 68, 68, 0.1)' },
};

const getToolLink = (toolId: number) => {
    switch (toolId) {
        case 1: return '/clarity-score';
        case 2: return '/tools/mood-journal';
        case 3: return '/tools/sleep-architect';
        case 5: return '/find-care';
        default: return '#';
    }
};

const ToolsSection: React.FC = () => {
    const navigate = useNavigate();
    const toolService = useToolService();
    const [tools, setTools] = useState<Tool[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        toolService.getAll()
            .then(data => { if (!cancelled) setTools(data.slice(0, 3)); })
            .catch(() => { /* Silent fallback */ })
            .finally(() => { if (!cancelled) setLoading(false); });
        return () => { cancelled = true; };
    }, [toolService]);

    if (loading) return <SkeletonToolsSection />;
    if (tools.length === 0) return null;

    const [featuredTool, ...secondaryTools] = tools;

    return (
        <section className="py-24 px-6 bg-slate-50 border-y border-slate-200 relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto max-w-6xl relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-teal-100 shadow-sm mb-4"
                        >
                            <Activity size={14} className="text-teal-600" />
                            <span className="text-xs font-bold tracking-widest uppercase text-teal-700">
                                Interactive Tools
                            </span>
                        </motion.div>
                        <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 mb-4 tracking-tight">
                            Tools for your <span className="text-teal-600 relative">
                                mind
                                <svg className="absolute w-full h-3 -bottom-1 left-0 text-teal-200 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                                </svg>
                            </span>
                        </h2>
                        <p className="text-xl text-slate-600 max-w-xl leading-relaxed">
                            Clinically-validated exercises and trackers to help you understand and improve your well-being.
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        rightIcon={<ArrowRight size={18} />}
                        onClick={() => navigate('/tools')}
                        className="shrink-0 bg-white border-slate-200 hover:bg-slate-50 text-slate-900 shadow-sm hover:shadow"
                    >
                        View All Tools
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(240px,auto)]">

                    {/* Primary Feature (First Tool - Spans 2 cols, 2 rows on desktop) */}
                    {featuredTool && (() => {
                        const Icon = iconMap[featuredTool.iconName] || Activity;
                        const colors = colorSchemes[featuredTool.color] || colorSchemes.teal;

                        return (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="md:col-span-2 md:row-span-2 h-full"
                            >
                                <InteractiveCard
                                    onClick={() => navigate(getToolLink(featuredTool.id))}
                                    spotlightColor={colors.spotlight}
                                    className="h-full bg-white border-slate-200 shadow-lg hover:shadow-xl cursor-pointer group"
                                >
                                    <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-teal-50/50 to-transparent rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

                                    <div className="relative z-10 h-full flex flex-col p-10 md:p-12">
                                        <div className="flex-grow">
                                            <div className={cn(
                                                "w-20 h-20 rounded-3xl flex items-center justify-center mb-10 transition-transform duration-500 group-hover:scale-110 shadow-sm",
                                                colors.iconBg
                                            )}>
                                                <Icon size={40} className={colors.iconColor} />
                                            </div>
                                            <h3 className="text-4xl font-display font-bold text-slate-900 mb-6 group-hover:text-teal-700 transition-colors">
                                                {featuredTool.name}
                                            </h3>
                                            <p className="text-xl text-slate-600 leading-relaxed max-w-md">
                                                {featuredTool.description}
                                            </p>
                                        </div>

                                        <div className="mt-10 pt-10 border-t border-slate-100 flex items-center justify-between">
                                            <span className="text-teal-700 font-bold group-hover:underline decoration-2 underline-offset-4">
                                                Start Session
                                            </span>
                                            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-900 group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">
                                                <ArrowRight size={20} />
                                            </div>
                                        </div>
                                    </div>
                                </InteractiveCard>
                            </motion.div>
                        );
                    })()}

                    {/* Secondary Tools */}
                    {secondaryTools.map((tool, index) => {
                        const Icon = iconMap[tool.iconName] || Activity;
                        const colors = colorSchemes[tool.color] || colorSchemes.indigo;
                        const isDark = index === 1; // Keeping the dark theme for variety

                        if (isDark) {
                            return (
                                <motion.div
                                    key={tool.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: (index + 1) * 0.1 }}
                                    className="md:col-span-1 md:row-span-1 h-full"
                                >
                                    <InteractiveCard
                                        onClick={() => navigate(getToolLink(tool.id))}
                                        spotlightColor="rgba(255,255,255,0.1)"
                                        className="h-full bg-slate-900 border-slate-800 shadow-lg hover:shadow-xl cursor-pointer group"
                                    >
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10" />

                                        <div className="relative z-10 flex flex-col h-full p-8">
                                            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6 backdrop-blur-sm">
                                                <Icon size={24} className="text-white" />
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-3">
                                                {tool.name}
                                            </h3>
                                            <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                                                {tool.description}
                                            </p>

                                            <div className="flex justify-end">
                                                <ArrowRight size={20} className="text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all" />
                                            </div>
                                        </div>
                                    </InteractiveCard>
                                </motion.div>
                            );
                        }

                        return (
                            <motion.div
                                key={tool.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: (index + 1) * 0.1 }}
                                className="md:col-span-1 md:row-span-1 h-full"
                            >
                                <InteractiveCard
                                    onClick={() => navigate(getToolLink(tool.id))}
                                    spotlightColor={colors.spotlight}
                                    className="h-full bg-white border-slate-200 shadow-sm hover:shadow-lg cursor-pointer group"
                                >
                                    <div className="relative z-10 flex flex-col h-full p-8">
                                        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-sm", colors.iconBg)}>
                                            <Icon size={24} className={colors.iconColor} />
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-3">
                                            {tool.name}
                                        </h3>
                                        <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">
                                            {tool.description}
                                        </p>

                                        <div className="flex justify-end">
                                            <ArrowRight size={20} className="text-slate-300 group-hover:text-teal-600 group-hover:translate-x-1 transition-all" />
                                        </div>
                                    </div>
                                </InteractiveCard>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ToolsSection;
