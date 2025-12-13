import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { categories } from '../../data/categories';
import CategoryCard from '../articles/CategoryCard';
import { Sparkles } from 'lucide-react';

const AllCategoriesSection: React.FC = () => {
    const navigate = useNavigate();
    const [activeGroup, setActiveGroup] = useState<string>('all');



    const groups = [
        { id: 'all', label: 'All Categories' },
        { id: 'condition', label: 'Mental Health Conditions' },
        { id: 'wellness', label: 'Wellness & Lifestyle' },
        { id: 'life', label: 'Life & Relationships' },
        { id: 'family', label: 'Family & Parenting' },
        { id: 'identity', label: 'Identity & Self' },
        { id: 'therapy', label: 'Therapy & Medication' }
    ];

    const displayCategories = activeGroup === 'all'
        ? categories
        : categories.filter(c => c.group === activeGroup);

    return (
        <section className="py-24 px-6 bg-background relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -right-64 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 -left-64 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto max-w-7xl relative z-10">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-border/50 shadow-sm mb-6"
                    >
                        <Sparkles size={16} className="text-primary" />
                        <span className="text-sm font-semibold text-text-secondary uppercase tracking-wider">
                            Comprehensive Care
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="font-display font-bold text-4xl md:text-5xl text-text-primary mb-6"
                    >
                        Explore Mental Health Topics
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-text-secondary leading-relaxed"
                    >
                        Our extensive library covers everything from clinical conditions to daily wellness practices.
                        Find the support and information you need.
                    </motion.p>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {groups.map((group) => (
                        <button
                            key={group.id}
                            onClick={() => setActiveGroup(group.id)}
                            className={`
                                px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                                ${activeGroup === group.id
                                    ? 'bg-primary text-white shadow-lg shadow-primary/25'
                                    : 'bg-surface text-text-secondary hover:bg-surface-hover hover:text-text-primary border border-border'
                                }
                            `}
                        >
                            {group.label}
                        </button>
                    ))}
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {displayCategories.map((category, index) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="h-full"
                        >
                            <CategoryCard
                                category={category}
                                onClick={() => navigate(`/learn/${category.slug}`)}
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Empty State (just in case) */}
                {displayCategories.length === 0 && (
                    <div className="text-center py-20 bg-surface rounded-3xl border border-border mt-8">
                        <p className="text-text-secondary">No categories found for this filter.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default AllCategoriesSection;
