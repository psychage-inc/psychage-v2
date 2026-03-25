import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, BookOpen, Sparkles, TrendingUp, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import { useArticleService } from '../services/articleService';
import { categoryService } from '../services/categoryService';
import { Article, Category } from '../types/models';
import { getPopularArticles } from '../utils/articleUtils';
import CategoryCard from '../components/articles/CategoryCard';
import ArticleCard from '../components/article/ArticleCard';
import Button from '../components/ui/Button';
import InteractiveCard from '../components/ui/InteractiveCard';
import { getCategoryBadgeClasses } from '../config/categoryThemes';
import { getArticleUrl } from '../lib/articleUrl';

const LearnPage: React.FC = () => {
    const navigate = useNavigate();
    const [articles, setArticles] = useState<Article[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const articleService = useArticleService();

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

    const featuredArticles = useMemo(() => {
        const featured = filteredArticles.filter(a => a.tags.includes('featured'));
        return featured.length > 0 ? featured.slice(0, 3) : filteredArticles.slice(0, 3);
    }, [filteredArticles]);

    const recentArticles = useMemo(() => {
        const featuredIds = new Set(featuredArticles.map(a => a.id));
        return filteredArticles.filter(a => !featuredIds.has(a.id)).slice(0, 4);
    }, [filteredArticles, featuredArticles]);

    const popularArticles = useMemo(() => {
        const featuredIds = new Set(featuredArticles.map(a => a.id));
        return getPopularArticles(filteredArticles.filter(a => !featuredIds.has(a.id))).slice(0, 3);
    }, [filteredArticles, featuredArticles]);

    const hasNoResults = searchQuery.length > 0 && filteredArticles.length === 0;

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
            <section className="relative pt-32 pb-20 px-6 min-h-[40vh] sm:min-h-[50vh] lg:min-h-[60vh] flex flex-col justify-center overflow-hidden">
                <div className="container mx-auto max-w-7xl relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface border border-border text-text-primary text-sm font-bold uppercase tracking-wider mb-8 shadow-sm">
                            <BookOpen size={16} className="text-primary" />
                            <span>Knowledge Base</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold mb-6 text-text-primary leading-tight">
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

            {/* No Results State */}
            {hasNoResults && (
                <section className="px-6 mb-24">
                    <div className="container mx-auto max-w-7xl">
                        <div className="text-center py-20 bg-surface rounded-3xl border border-dashed border-border">
                            <Search size={48} className="mx-auto text-text-tertiary mb-4" />
                            <h2 className="text-2xl font-display font-bold text-text-primary mb-2">No articles found</h2>
                            <p className="text-text-secondary mb-6">
                                No articles match &ldquo;{searchQuery}&rdquo;. Try different keywords or browse by category below.
                            </p>
                            <Button variant="outline" onClick={() => setSearchQuery('')}>
                                Clear search
                            </Button>
                        </div>
                    </div>
                </section>
            )}

            {/* Featured Articles */}
            {!hasNoResults && featuredArticles.length > 0 && (
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
                        {featuredArticles.map((article) => (
                            <motion.div key={article.id} variants={itemVariants} className="h-full">
                                <ArticleCard
                                    article={article}
                                    onClick={() => navigate(getArticleUrl(article))}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
            )}

            {/* Categories Grid */}
            <section className="px-6 mb-24 relative pt-8 border-t border-border mt-8">
                <div className="container mx-auto max-w-7xl">
                    <div className="flex items-center gap-3 mb-8">
                        <BookOpen className="text-primary" size={24} />
                        <h2 className="text-3xl font-display font-bold text-text-primary">Browse by Topic</h2>
                        <span className="text-sm text-text-tertiary font-medium ml-2">{categories.length} categories</span>
                    </div>

                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4"
                    >
                        <AnimatePresence mode="popLayout">
                            {categories.map((category) => (
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
            {!hasNoResults && (recentArticles.length > 0 || popularArticles.length > 0) && (
            <section className="px-6 mb-24">
                <div className="container mx-auto max-w-7xl">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Recent Articles (2 cols) */}
                        {recentArticles.length > 0 && (
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
                                            onClick={() => navigate(getArticleUrl(article))}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        )}

                        {/* Popular Sidebar (1 col) */}
                        {popularArticles.length > 0 && (
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
                                            onClick={() => navigate(getArticleUrl(article))}
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
                        )}
                    </div>
                </div>
            </section>
            )}

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
