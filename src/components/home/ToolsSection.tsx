import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, PenTool, Moon, BrainCircuit, Activity, Wind, Users, ShieldAlert, LucideIcon } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useToolService } from '@/services/toolService';
import { Tool } from '@/types/models';
import { SkeletonToolsSection } from '@/components/ui/Skeletons';

// Icon mapping - icons can't come from API
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
const colorSchemes: Record<string, { bg: string; iconBg: string; iconColor: string; hover: string }> = {
    teal: { bg: 'bg-white', iconBg: 'bg-teal-50', iconColor: 'text-teal-600', hover: 'hover:border-teal-100' },
    indigo: { bg: 'bg-white', iconBg: 'bg-indigo-50', iconColor: 'text-indigo-600', hover: 'hover:border-indigo-100' },
    amber: { bg: 'bg-white', iconBg: 'bg-amber-50', iconColor: 'text-amber-600', hover: 'hover:border-amber-100' },
    sky: { bg: 'bg-white', iconBg: 'bg-sky-50', iconColor: 'text-sky-600', hover: 'hover:border-sky-100' },
    rose: { bg: 'bg-white', iconBg: 'bg-rose-50', iconColor: 'text-rose-600', hover: 'hover:border-rose-100' },
    red: { bg: 'bg-white', iconBg: 'bg-red-50', iconColor: 'text-red-600', hover: 'hover:border-red-100' },
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
            .catch(() => { /* Silent fallback - service returns mock data */ })
            .finally(() => { if (!cancelled) setLoading(false); });

        return () => { cancelled = true; };
    }, [toolService]);

    if (loading) return <SkeletonToolsSection />;
    if (tools.length === 0) return null;

    const [featuredTool, ...secondaryTools] = tools;

    return (
        <section className="py-24 px-6 bg-gray-50/50 border-y border-gray-100">
            <div className="container mx-auto max-w-6xl">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-100 mb-4"
                        >
                            <Activity size={14} className="text-teal-600" />
                            <span className="text-xs font-bold tracking-widest uppercase text-teal-700">
                                Interactive Tools
                            </span>
                        </motion.div>
                        <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 mb-4 tracking-tight">
                            Tools for your <span className="text-teal-600">mind</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-xl leading-relaxed">
                            Clinically-validated exercises and trackers to help you understand and improve your mental well-being.
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        rightIcon={<ArrowRight size={18} />}
                        onClick={() => navigate('/tools')}
                        className="shrink-0 bg-white border-gray-200 hover:bg-gray-50 text-gray-900"
                    >
                        View All Tools
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(200px,auto)]">

                    {/* Primary Feature (First Tool - Spans 2 cols, 2 rows on desktop) */}
                    {featuredTool && (() => {
                        const Icon = iconMap[featuredTool.iconName] || Activity;
                        const colors = colorSchemes[featuredTool.color] || colorSchemes.teal;
                        return (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                onClick={() => navigate(getToolLink(featuredTool.id))}
                                className="group cursor-pointer md:col-span-2 md:row-span-2 relative overflow-hidden bg-white rounded-3xl border border-gray-200 p-8 md:p-12 shadow-sm hover:shadow-xl transition-all duration-500"
                            >
                                <div className={`absolute top-0 right-0 w-64 h-64 ${colors.iconBg} rounded-full blur-3xl -mr-16 -mt-16 opacity-0 group-hover:opacity-50 transition-opacity duration-700`} />

                                <div className="relative z-10 h-full flex flex-col justify-between">
                                    <div>
                                        <div className={`w-16 h-16 rounded-2xl ${colors.iconBg} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                                            <Icon size={32} className={colors.iconColor} />
                                        </div>
                                        <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-teal-700 transition-colors">
                                            {featuredTool.name}
                                        </h3>
                                        <p className="text-lg text-gray-600 leading-relaxed max-w-sm">
                                            {featuredTool.description}
                                        </p>
                                    </div>

                                    <div className="mt-8 flex items-center text-teal-600 font-bold group-hover:gap-3 transition-all">
                                        Get Started <ArrowRight size={20} className="ml-2" />
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })()}

                    {/* Secondary Tools */}
                    {secondaryTools.map((tool, index) => {
                        const Icon = iconMap[tool.iconName] || Activity;
                        const colors = colorSchemes[tool.color] || colorSchemes.indigo;
                        const isDark = index === 1; // Make the last tool dark themed

                        if (isDark) {
                            return (
                                <motion.div
                                    key={tool.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: (index + 1) * 0.1 }}
                                    onClick={() => navigate(getToolLink(tool.id))}
                                    className="group cursor-pointer md:col-span-1 md:row-span-1 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 shadow-md hover:shadow-xl transition-all duration-300 text-white relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
                                    <div className="relative z-10">
                                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                                            <Icon size={24} className="text-white" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2">
                                            {tool.name}
                                        </h3>
                                        <p className="text-gray-300 text-sm">
                                            {tool.description}
                                        </p>
                                    </div>
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
                                onClick={() => navigate(getToolLink(tool.id))}
                                className={`group cursor-pointer md:col-span-1 md:row-span-1 ${colors.bg} rounded-3xl border border-gray-200 p-8 shadow-sm hover:shadow-lg transition-all duration-300 ${colors.hover}`}
                            >
                                <div className={`w-12 h-12 rounded-xl ${colors.iconBg} flex items-center justify-center mb-6`}>
                                    <Icon size={24} className={colors.iconColor} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    {tool.name}
                                </h3>
                                <p className="text-gray-500 text-sm mb-4">
                                    {tool.description}
                                </p>
                            </motion.div>
                        );
                    })}

                </div>
            </div>
        </section>
    );
};

export default ToolsSection;
