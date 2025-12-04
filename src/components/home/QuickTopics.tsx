import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Brain, Heart, Users, Sparkles, Stethoscope } from 'lucide-react';

const QuickTopics: React.FC = () => {
    const navigate = useNavigate();

    const topics = [
        {
            id: 'condition',
            label: 'Conditions',
            desc: 'Symptoms & Support',
            icon: Brain,
        },
        {
            id: 'wellness',
            label: 'Wellness',
            desc: 'Mind & Body',
            icon: Heart,
        },
        {
            id: 'life',
            label: 'Life',
            desc: 'Relationships & Work',
            icon: Users,
        },
        {
            id: 'identity',
            label: 'Identity',
            desc: 'Self Discovery',
            icon: Sparkles,
        },
        {
            id: 'therapy',
            label: 'Therapy',
            desc: 'Treatment Types',
            icon: Stethoscope,
        }
    ];

    return (
        <section className="py-16 px-6 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-[#0a0a0a]">
            <div className="container mx-auto max-w-6xl">
                <div className="flex items-center justify-between mb-10">
                    <h2 className="font-display font-bold text-2xl text-gray-900 dark:text-white">
                        Explore by Category
                    </h2>
                    <button
                        onClick={() => navigate('/learn')}
                        className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center gap-2 transition-colors"
                    >
                        View All <ArrowRight size={16} />
                    </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {topics.map((topic, index) => (
                        <motion.button
                            key={topic.id}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => navigate(`/learn?filter=${topic.id}`)}
                            className="flex flex-col items-start text-left p-6 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600 bg-gray-50 dark:bg-gray-900/50 hover:bg-white dark:hover:bg-gray-900 transition-all duration-200 group"
                        >
                            <topic.icon size={24} className="text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white mb-4 transition-colors" />
                            <h3 className="font-bold text-gray-900 dark:text-white mb-1">{topic.label}</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{topic.desc}</p>
                        </motion.button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default QuickTopics;
