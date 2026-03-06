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
import InteractiveCard from '../components/ui/InteractiveCard';
import { getCategoryBadgeClasses } from '../config/categoryThemes';

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
                <div className="container mx-auto max-w-7xl relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface border border-border text-text-primary text-sm font-bold uppercase tracking-wider mb-8 shadow-sm">
                            <BookOpen size={16} className="text-primary" />
                            <span>Knowledge Base</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 text-text-primary leading-tight">
                            Mental Health <br />
                            <span className="text-primary">
                                Education & Guides
                            </span>
                        </h1>

                        <p className="text-xl text-text-secondary mb-12 max-w-2xl mx-auto leading-relaxed">
                            Explore expert-reviewed articles, practical guides, and the latest research on emotional well-being.
                        </p>

                        <div className="max-w-2xl mx-auto relative group">
                            <div className="relative flex items-center bg-surface border border-border rounded-xl shadow-sm focus-within:ring-2 focus-within:ring-primary/50 transition-all overflow-hidden">
                                <Search className="absolute left-4 text-text-tertiary" size={24} />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search for topics (e.g., Anxiety, Sleep, CBT)..."
                                    className="w-full pl-14 pr-4 py-5 bg-transparent text-text-primary placeholder-text-tertiary outline-none text-lg font-medium"
                                />
                            </div>
                        </div>
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
            <section className="px-6 mb-24 relative pt-8 border-t border-border mt-8">
                <div className="container mx-auto max-w-7xl">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
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
                                    className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium transition-colors border ${activeFilter === filter.id
                                        ? 'bg-primary text-white border-primary'
                                        : 'bg-surface text-text-secondary border-border hover:bg-surface-hover hover:text-text-primary'
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
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.2 }}
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
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Recent Articles (2 cols) */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="flex items-center gap-3 mb-6">
                                <BookOpen className="text-secondary" size={24} />
                                <h2 className="text-3xl font-display font-bold text-text-primary">Recent Articles</h2>
                            </div>
                            <div className="grid md:grid-cols-2 gap-6">
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
                                                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold mr-2 ${getCategoryBadgeClasses(article.category.slug)}`}>{article.category.name}</span>
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
                    <div className="rounded-2xl border border-border bg-surface p-8 md:p-12 shadow-sm">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="max-w-2xl text-center md:text-left">
                                <h2 className="text-2xl md:text-3xl font-display font-bold mb-3 text-text-primary">Unsure where to start?</h2>
                                <p className="text-text-secondary leading-relaxed">
                                    Take our scientifically-backed Clarity Score assessment to get a personalized mental health baseline and tailored recommendations.
                                </p>
                            </div>
                            <Button
                                variant="primary"
                                className="shrink-0 h-11 px-6 rounded-lg font-semibold"
                                rightIcon={<ArrowRight size={18} />}
                                onClick={() => navigate('/clarity-score')}
                            >
                                Take Clarity Score
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LearnPage;
