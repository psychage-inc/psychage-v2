import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Filter, ArrowRight, BookOpen, Clock, Tag, Sparkles } from 'lucide-react';
import SEO from '../components/SEO';
import { articleService } from '../services/articleService';
import { categoryService } from '../services/categoryService';
import { Article, Category } from '../types/models';
import CategoryCard from '../components/articles/CategoryCard';
import ArticleCard from '../components/article/ArticleCard';

const LearnPage: React.FC = () => {
    const navigate = useNavigate();
    const [articles, setArticles] = React.useState<Article[]>([]);
    const [categories, setCategories] = React.useState<Category[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [activeFilter, setActiveFilter] = React.useState('all');
    const location = useLocation();

    React.useEffect(() => {
        const params = new URLSearchParams(location.search);
        const filterParam = params.get('filter');
        if (filterParam) {
            setActiveFilter(filterParam);
        }
    }, [location.search]);

    const recentArticles = articles.slice(0, 6);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchData = async () => {
            try {
                const [articlesData, categoriesData] = await Promise.all([
                    articleService.getAll(),
                    categoryService.getAll()
                ]);
                setArticles(articlesData);
                setCategories(categoriesData);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    if (isLoading) return <div className="min-h-screen bg-gray-50 dark:bg-black pt-32 text-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black pt-24 pb-20">
            <SEO
                title="Learn Hub | Psychage Mental Health Education"
                description="Explore our comprehensive library of mental health articles, guides, and resources."
            />

            {/* Hero Section */}
            <section className="relative px-6 mb-20">
                <div className="container mx-auto max-w-6xl">
                    <div className="max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 text-xs font-bold uppercase tracking-wider mb-6"
                        >
                            <BookOpen size={14} />
                            <span>Knowledge Base</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="font-display font-bold text-5xl md:text-6xl text-gray-900 dark:text-white mb-6 leading-tight"
                        >
                            Empower yourself with <span className="text-teal-600 dark:text-teal-400">evidence-based</span> insights.
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed max-w-2xl"
                        >
                            Explore expert-reviewed articles, practical guides, and the latest research on mental health and wellness.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="relative max-w-xl"
                        >
                            <input
                                type="text"
                                placeholder="Search for topics (e.g., Anxiety, Sleep, CBT)..."
                                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none shadow-lg shadow-gray-200/50 dark:shadow-none transition-all"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        navigate(`/search?q=${e.currentTarget.value}`);
                                    }
                                }}
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Categories Grid */}
            <section className="px-6 mb-24">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
                        <h2 className="font-display font-bold text-3xl text-gray-900 dark:text-white">Browse by Topic</h2>

                        {/* Filter Bar */}
                        <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 no-scrollbar -mx-6 px-6 md:mx-0 md:px-0">
                            {[
                                { id: 'all', label: 'All Topics' },
                                { id: 'condition', label: 'Conditions' },
                                { id: 'wellness', label: 'Wellness' },
                                { id: 'life', label: 'Life & Relationships' },
                                { id: 'identity', label: 'Identity' },
                                { id: 'therapy', label: 'Therapy' }
                            ].map((filter) => (
                                <button
                                    key={filter.id}
                                    onClick={() => setActiveFilter(filter.id)}
                                    className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-all ${activeFilter === filter.id
                                            ? 'bg-teal-600 text-white shadow-lg shadow-teal-900/20'
                                            : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                                        }`}
                                >
                                    {filter.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {categories
                            .filter(c => activeFilter === 'all' || c.group === activeFilter)
                            .map((category, index) => (
                                <motion.div
                                    key={category.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <CategoryCard
                                        category={category}
                                        onClick={() => navigate(`/learn/${category.slug}`)}
                                    />
                                </motion.div>
                            ))}
                    </div>
                </div>
            </section>

            {/* Featured/Recent Articles */}
            <section className="px-6 pb-20">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex items-center gap-3 mb-10">
                        <Sparkles className="text-amber-500" size={24} />
                        <h2 className="font-display font-bold text-3xl text-gray-900 dark:text-white">Latest Insights</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {recentArticles.map((article, index) => (
                            <motion.div
                                key={article.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <ArticleCard
                                    article={article}
                                    onClick={() => navigate(`/learn/article/${article.id}`)}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LearnPage;
