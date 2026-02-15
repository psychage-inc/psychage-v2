import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, BookOpen, Sparkles, TrendingUp, ArrowRight, Filter } from 'lucide-react';
import SEO from '../components/SEO';
import { useArticleService } from '../services/articleService';
import { categoryService } from '../services/categoryService';
import { Article, Category } from '../types/models';
import { getPopularArticles } from '../utils/articleUtils';
import CategoryCard from '../components/articles/CategoryCard';
import ArticleCard from '../components/article/ArticleCard';
import Button from '../components/ui/Button';
import { Display, Text } from '../components/ui/Typography';
import MeshGradient from '../components/ui/MeshGradient';
import InteractiveCard from '../components/ui/InteractiveCard';

const LearnPage: React.FC = () => {
    const navigate = useNavigate();
    const [articles, setArticles] = useState<Article[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();
    const articleService = useArticleService();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const filterParam = params.get('filter');
        if (filterParam) {
            setActiveFilter(filterParam);
        }
    }, [location.search]);

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
    }, [articleService]);

    const filteredArticles = useMemo(() => {
        let result = articles;
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(a =>
                a.title.toLowerCase().includes(query) ||
                a.description.toLowerCase().includes(query)
            );
        }
        return result;
    }, [articles, searchQuery]);

    const recentArticles = useMemo(() => filteredArticles.slice(0, 4), [filteredArticles]);
    const popularArticles = useMemo(() => getPopularArticles(articles).slice(0, 3), [articles]);
    const featuredArticles = useMemo(() => articles.filter(a => a.tags.includes('featured')).slice(0, 3), [articles]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    if (isLoading) return (
        <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-background pb-20 overflow-x-hidden">
            <SEO
                title="Learn Hub | Psychage Mental Health Education"
                description="Explore our comprehensive library of mental health articles, guides, and resources."
            />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 min-h-[60vh] flex flex-col justify-center overflow-hidden">
                <MeshGradient className="opacity-40 pointer-events-none" />

                <div className="container mx-auto max-w-7xl relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-text-primary text-sm font-bold uppercase tracking-wider mb-8 shadow-sm"
                        >
                            <BookOpen size={16} className="text-primary" />
                            <span>Knowledge Base</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-7xl font-display font-bold mb-6 text-text-primary leading-tight"
                        >
                            Understanding the <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-teal-500 animate-gradient bg-[length:200%_auto]">
                                Mind & Soul
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-text-secondary mb-12 max-w-2xl mx-auto leading-relaxed"
                        >
                            Explore expert-reviewed articles, practical guides, and the latest research on mental health and wellness.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="max-w-2xl mx-auto relative group"
                        >
                            <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-purple-600 rounded-2xl opacity-20 group-hover:opacity-30 blur transition duration-500"></div>
                            <div className="relative flex items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden focus-within:ring-2 focus-within:ring-primary/50 transition-all">
                                <Search className="absolute left-4 text-text-tertiary" size={24} />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search for topics (e.g., Anxiety, Sleep, CBT)..."
                                    className="w-full pl-14 pr-4 py-5 bg-transparent text-text-primary placeholder-text-tertiary outline-none text-lg font-medium"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Featured Articles */}
            <section className="px-6 mb-24">
                <div className="container mx-auto max-w-7xl">
                    <div className="flex items-center gap-3 mb-8">
                        <Sparkles className="text-amber-500" size={24} />
                        <h2 className="text-3xl font-display font-bold text-text-primary">Featured Insights</h2>
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {(featuredArticles.length > 0 ? featuredArticles : articles.slice(0, 3)).map((article) => (
                            <motion.div key={article.id} variants={itemVariants} className="h-full">
                                <ArticleCard
                                    article={article}
                                    onClick={() => navigate(`/learn/article/${article.id}`)}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Categories Grid */}
            <section className="px-6 mb-24 relative">
                <div className="absolute inset-0 bg-surface-subtle/30 -skew-y-3 transform origin-top-left -z-10 h-full w-full" />

                <div className="container mx-auto max-w-7xl py-12">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
                        <div className="flex items-center gap-3">
                            <Filter className="text-primary" size={24} />
                            <h2 className="text-3xl font-display font-bold text-text-primary">Browse by Topic</h2>
                        </div>

                        {/* Filter Bar */}
                        <div className="flex overflow-x-auto pb-2 md:pb-0 gap-3 no-scrollbar -mx-6 px-6 md:mx-0 md:px-0">
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
                                    className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-all border ${activeFilter === filter.id
                                        ? 'bg-primary text-white border-primary shadow-lg shadow-primary/25 scale-105'
                                        : 'bg-white/5 text-text-secondary border-white/10 hover:bg-white/10 hover:border-white/20'
                                        }`}
                                >
                                    {filter.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        <AnimatePresence mode="popLayout">
                            {categories
                                .filter(c => activeFilter === 'all' || c.group === activeFilter)
                                .map((category) => (
                                    <motion.div
                                        key={category.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3 }}
                                        className="h-full"
                                    >
                                        <CategoryCard
                                            category={category}
                                            onClick={() => navigate(`/learn/${category.slug}`)}
                                        />
                                    </motion.div>
                                ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

            {/* Recent & Popular Split */}
            <section className="px-6 mb-24">
                <div className="container mx-auto max-w-7xl">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Recent Articles (2 cols) */}
                        <div className="lg:col-span-2 space-y-8">
                            <div className="flex items-center gap-3 mb-6">
                                <BookOpen className="text-secondary" size={24} />
                                <h2 className="text-3xl font-display font-bold text-text-primary">Recent Articles</h2>
                            </div>
                            <div className="grid md:grid-cols-2 gap-8">
                                {recentArticles.map((article) => (
                                    <div key={article.id} className="h-full">
                                        <ArticleCard
                                            article={article}
                                            onClick={() => navigate(`/learn/article/${article.id}`)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Popular Sidebar (1 col) */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 mb-6">
                                <TrendingUp className="text-accent-rose" size={24} />
                                <h2 className="text-3xl font-display font-bold text-text-primary">Most Popular</h2>
                            </div>
                            <InteractiveCard className="bg-white/5 border-white/10 p-0 overflow-hidden">
                                <ul className="divide-y divide-white/5">
                                    {popularArticles.map((article, idx) => (
                                        <li
                                            key={article.id}
                                            className="group cursor-pointer hover:bg-white/5 transition-colors p-6"
                                            onClick={() => navigate(`/learn/article/${article.id}`)}
                                        >
                                            <div className="flex gap-4 items-start">
                                                <span className="text-3xl font-display font-bold text-text-tertiary/30 group-hover:text-primary transition-colors">0{idx + 1}</span>
                                                <div>
                                                    <h3 className="font-bold text-text-primary group-hover:text-primary transition-colors line-clamp-2 mb-2">
                                                        {article.title}
                                                    </h3>
                                                    <div className="flex items-center text-xs text-text-secondary">
                                                        <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] uppercase font-bold mr-2">{article.category.name}</span>
                                                        <span>{article.readTime} min read</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </InteractiveCard>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="px-6 mb-20">
                <div className="container mx-auto max-w-7xl">
                    <InteractiveCard className="relative overflow-hidden p-8 md:p-16 border-primary/20 bg-gradient-to-br from-primary/10 via-surface to-surface">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />

                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                            <div className="max-w-2xl text-center md:text-left">
                                <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-text-primary">Unsure where to start?</h2>
                                <p className="text-lg text-text-secondary mb-0 leading-relaxed">
                                    Take our scientifically-backed Clarity Score assessment to get a personalized mental health baseline and tailored recommendations.
                                </p>
                            </div>
                            <Button
                                size="xl"
                                className="shrink-0 shadow-xl shadow-primary/20 bg-primary hover:bg-primary-hover text-white rounded-full px-8 py-4 h-auto text-lg"
                                rightIcon={<ArrowRight size={20} />}
                                onClick={() => navigate('/clarity-score')}
                            >
                                Take Clarity Score
                            </Button>
                        </div>
                    </InteractiveCard>
                </div>
            </section>
        </div>
    );
};

export default LearnPage;
