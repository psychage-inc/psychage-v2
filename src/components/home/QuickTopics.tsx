import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Brain, Heart, Users, Sparkles, Stethoscope, Activity, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCategoryService } from '@/services/categoryService';
import { Category } from '@/types/models';
import { SkeletonQuickTopics } from '@/components/ui/Skeletons';

interface TopicItem {
    id: string;
    label: string;
    desc: string;
    icon: LucideIcon;
    className?: string;
}

// Icon and style mapping by group - icons can't come from API
const topicConfig: Record<string, { icon: LucideIcon; className: string; label: string; desc: string }> = {
    'condition': {
        icon: Brain,
        className: "md:col-span-2 bg-gradient-to-br from-teal-50 to-emerald-50 border-teal-100",
        label: 'Mental Health Conditions',
        desc: 'Clinically verified guides for symptom management and understanding diagnoses.',
    },
    'wellness': {
        icon: Heart,
        className: "md:col-span-1 bg-white",
        label: 'Holistic Wellness',
        desc: 'Sleep, Nutrition & Movement',
    },
    'life': {
        icon: Users,
        className: "md:col-span-1 bg-white",
        label: 'Relationships & Life',
        desc: 'Navigating social dynamics',
    },
    'identity': {
        icon: Sparkles,
        className: "md:col-span-1 bg-white",
        label: 'Self & Identity',
        desc: 'Personal Growth',
    },
    'therapy': {
        icon: Stethoscope,
        className: "md:col-span-2 md:row-span-1 bg-gray-50",
        label: 'Therapy & Care',
        desc: 'Find the right professional support for your needs.',
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
            .catch(() => { /* Silent fallback - service returns mock data */ })
            .finally(() => { if (!cancelled) setLoading(false); });

        return () => { cancelled = true; };
    }, [categoryService]);

    // Group categories by their group field and create topic items
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
            };
        });

    if (loading) return <SkeletonQuickTopics />;
    if (topics.length === 0) return null;

    return (
        <section className="py-24 px-6 bg-white relative overflow-hidden">
            <div className="container mx-auto max-w-6xl relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <div>
                        <h2 className="font-display font-bold text-3xl text-gray-900 mb-2">
                            Explore by Category
                        </h2>
                        <p className="text-gray-500 max-w-lg text-lg">
                            Dive into our organized knowledge base suitable for any stage of your journey.
                        </p>
                    </div>

                    <button
                        onClick={() => navigate('/learn')}
                        className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-100 text-gray-900 font-medium hover:bg-gray-200 transition-all"
                    >
                        View All Topics
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[200px]">
                    {topics.map((topic, index) => (
                        <motion.button
                            key={topic.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                            onClick={() => navigate(`/learn?filter=${topic.id}`)}
                            className={cn(
                                "relative flex flex-col justify-between p-6 sm:p-8 rounded-3xl border border-gray-100 text-left transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/50 hover:scale-[1.01] hover:border-gray-200 overflow-hidden group",
                                topic.className
                            )}
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                                <topic.icon size={120} />
                            </div>

                            <div className="relative z-10">
                                <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white shadow-sm text-gray-900 mb-6 group-hover:bg-gray-900 group-hover:text-white transition-colors">
                                    <topic.icon size={24} />
                                </span>
                            </div>

                            <div className="relative z-10 mt-auto">
                                <h3 className="font-display font-bold text-xl text-gray-900 mb-2 group-hover:translate-x-1 transition-transform">{topic.label}</h3>
                                <p className="text-gray-500 text-sm font-medium leading-relaxed max-w-[90%]">{topic.desc}</p>
                            </div>
                        </motion.button>
                    ))}

                    {/* "More" Card - CTA for the grid */}
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: 0.5 }}
                        onClick={() => navigate('/learn')}
                        className="flex flex-col items-center justify-center p-6 rounded-3xl border border-dashed border-gray-300 hover:border-teal-500 hover:bg-teal-50/50 transition-colors group md:col-span-1"
                    >
                        <span className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-white group-hover:text-teal-600 mb-4 shadow-sm transition-all">
                            <Activity size={24} />
                        </span>
                        <span className="font-medium text-gray-500 group-hover:text-teal-700">Browse All 50+ Topics</span>
                    </motion.button>
                </div>
            </div>
        </section>
    );
};

export default QuickTopics;
