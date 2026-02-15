import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Brain, Heart, Users, Sparkles, Stethoscope, Activity, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCategoryService } from '@/services/categoryService';
import { Category } from '@/types/models';
import { SkeletonQuickTopics } from '@/components/ui/Skeletons';
import InteractiveCard from '../ui/InteractiveCard';

interface TopicItem {
    id: string;
    label: string;
    desc: string;
    icon: LucideIcon;
    className?: string;
    spotlight?: string;
}

// Icon and style mapping by group
const topicConfig: Record<string, { icon: LucideIcon; className: string; label: string; desc: string; spotlight: string }> = {
    'condition': {
        icon: Brain,
        className: "md:col-span-2 bg-gradient-to-br from-teal-50/50 to-emerald-50/50 border-teal-100/50",
        label: 'Mental Health Conditions',
        desc: 'Clinically verified guides for symptom management.',
        spotlight: 'rgba(20, 184, 166, 0.15)'
    },
    'wellness': {
        icon: Heart,
        className: "md:col-span-1 bg-white/50",
        label: 'Holistic Wellness',
        desc: 'Sleep, Nutrition & Movement',
        spotlight: 'rgba(244, 63, 94, 0.1)'
    },
    'life': {
        icon: Users,
        className: "md:col-span-1 bg-white/50",
        label: 'Relationships & Life',
        desc: 'Navigating social dynamics',
        spotlight: 'rgba(59, 130, 246, 0.1)'
    },
    'identity': {
        icon: Sparkles,
        className: "md:col-span-1 bg-white/50",
        label: 'Self & Identity',
        desc: 'Personal Growth',
        spotlight: 'rgba(168, 85, 247, 0.1)'
    },
    'therapy': {
        icon: Stethoscope,
        className: "md:col-span-2 md:row-span-1 bg-gradient-to-br from-indigo-50/50 to-blue-50/50 border-indigo-100/50",
        label: 'Therapy & Care',
        desc: 'Find the right professional support for your needs.',
        spotlight: 'rgba(99, 102, 241, 0.15)'
    },
};

const topicOrder = ['condition', 'wellness', 'life', 'identity', 'therapy'];

const QuickTopics: React.FC = () => {
    const navigate = useNavigate();
    const categoryService = useCategoryService();
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        categoryService.getAll()
            .then(data => { if (!cancelled) setCategories(data); })
            .catch(() => { /* Silent fallback */ })
            .finally(() => { if (!cancelled) setLoading(false); });
        return () => { cancelled = true; };
    }, [categoryService]);

    const topics: TopicItem[] = topicOrder
        .filter(group => topicConfig[group])
        .map(group => {
            const config = topicConfig[group];
            const groupCategories = categories.filter(c => c.group === group);
            const categoryCount = groupCategories.length;

            return {
                id: group,
                label: config.label,
                desc: categoryCount > 0 ? `${categoryCount} topics` : config.desc,
                icon: config.icon,
                className: config.className,
                spotlight: config.spotlight
            };
        });

    if (loading) return <SkeletonQuickTopics />;
    if (topics.length === 0) return null;

    return (
        <section className="py-24 px-6 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-slate-50/50" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50/40 via-transparent to-transparent pointer-events-none" />

            <div className="container mx-auto max-w-6xl relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="font-display font-bold text-3xl text-slate-900 mb-3">
                            Explore by Category
                        </h2>
                        <p className="text-slate-600 max-w-lg text-lg">
                            Dive into our organized knowledge base suitable for any stage of your journey.
                        </p>
                    </motion.div>

                    <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        onClick={() => navigate('/learn')}
                        className="group flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm hover:shadow-md"
                    >
                        View All Topics
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8 auto-rows-[220px]">
                    {topics.map((topic, index) => (
                        <motion.div
                            key={topic.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                            className={cn("h-full", topic.className)}
                        >
                            <InteractiveCard
                                onClick={() => navigate(`/learn?filter=${topic.id}`)}
                                spotlightColor={topic.spotlight}
                                className="h-full cursor-pointer border-slate-200/60 shadow-sm hover:shadow-lg group"
                            >
                                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                                    <topic.icon size={140} />
                                </div>

                                <div className="relative z-10 flex flex-col h-full p-8">
                                    <div className="mb-auto">
                                        <span className={cn(
                                            "inline-flex items-center justify-center w-14 h-14 rounded-2xl shadow-sm text-slate-700 mb-6 transition-all duration-300 group-hover:scale-110",
                                            "bg-white"
                                        )}>
                                            <topic.icon size={28} className="text-slate-900" />
                                        </span>
                                    </div>

                                    <div>
                                        <h3 className="font-display font-bold text-xl text-slate-900 mb-2 group-hover:translate-x-1 transition-transform">{topic.label}</h3>
                                        <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-[90%]">{topic.desc}</p>
                                    </div>
                                </div>
                            </InteractiveCard>
                        </motion.div>
                    ))}

                    {/* "More" Card - CTA for the grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: 0.5 }}
                        className="md:col-span-1 h-full"
                    >
                        <button
                            onClick={() => navigate('/learn')}
                            className="w-full h-full flex flex-col items-center justify-center p-6 rounded-3xl border-2 border-dashed border-slate-200 hover:border-slate-400 hover:bg-slate-50/80 transition-all duration-300 group"
                        >
                            <span className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-slate-900 mb-4 shadow-sm group-hover:shadow-md transition-all">
                                <Activity size={28} />
                            </span>
                            <span className="font-bold text-slate-600 group-hover:text-slate-900 transition-colors">Browse All 50+ Topics</span>
                        </button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default QuickTopics;
