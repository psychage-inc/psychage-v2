import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, BookOpen, Sparkles, TrendingUp, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import { useArticleService } from '../services/articleService';
import { categoryService } from '../services/categoryService';
import { Article, Category } from '../types/models';
import { getPopularArticles } from '../utils/articleUtils';
import CategoryCard from '../components/articles/CategoryCard';
import ArticleCard from '../components/article/ArticleCard';
import Button from '../components/ui/Button';
import { Display, Text } from '../components/ui/Typography';
import { Card } from '../components/ui/Card';

const LearnPage: React.FC = () => {
    const navigate = useNavigate();
    const [articles, setArticles] = React.useState<Article[]>([]);
    const [categories, setCategories] = React.useState<Category[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [activeFilter, setActiveFilter] = React.useState('all');
    const location = useLocation();
    const articleService = useArticleService();

    React.useEffect(() => {
        const params = new URLSearchParams(location.search);
        const filterParam = params.get('filter');
        if (filterParam) {
            setActiveFilter(filterParam);
        }
    }, [location.search]);

    const recentArticles = articles.slice(0, 4);
    const popularArticles = React.useMemo(() => {
        return getPopularArticles(articles);
    }, [articles]);
    const featuredArticles = articles.slice(0, 3);

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

    if (isLoading) return <div className="min-h-screen bg-background pt-32 text-center text-text-secondary">Loading...</div>;

    return (
        <div className="min-h-screen bg-background pt-24 pb-20">
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
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6"
                        >
                            <BookOpen size={14} />
                            <span>Knowledge Base</span>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <Display className="text-5xl md:text-6xl mb-6">
                                Empower yourself with <span className="text-primary">evidence-based</span> insights.
                            </Display>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <Text className="text-xl mb-10 max-w-2xl">
                                Explore expert-reviewed articles, practical guides, and the latest research on mental health and wellness.
                            </Text>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="relative max-w-xl"
                        >
                            <input
                                type="text"
                                placeholder="Search for topics (e.g., Anxiety, Sleep, CBT)..."
                                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-border bg-surface text-text-primary focus:ring-2 focus:ring-primary focus:border-transparent outline-none shadow-lg shadow-surface-hover/50 transition-all"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        navigate(`/search?q=${e.currentTarget.value}`);
                                    }
                                }}
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary" size={20} />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Featured Articles */}
            <section className="px-6 mb-24">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex items-center gap-2 mb-8">
                        <Sparkles className="text-amber-500" size={24} />
                        <Display as="h2" className="text-3xl">Featured</Display>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {featuredArticles.map((article, index) => (
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

            {/* Categories Grid */}
            <section className="px-6 mb-24 bg-surface-subtle/50 py-20">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
                        <Display as="h2" className="text-3xl">Browse by Topic</Display>

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
                                        ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                        : 'bg-surface text-text-secondary hover:bg-surface-hover'
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
                            .map((category) => (
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

            {/* Recent & Popular Split */}
            <section className="px-6 mb-24">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Recent Articles (2 cols) */}
                        <div className="lg:col-span-2 space-y-8">
                            <div className="flex items-center gap-2 mb-4">
                                <BookOpen className="text-primary" size={24} />
                                <Display as="h2" className="text-3xl">Recent Articles</Display>
                            </div>
                            <div className="grid md:grid-cols-2 gap-8">
                                {recentArticles.map((article) => (
                                    <ArticleCard
                                        key={article.id}
                                        article={article}
                                        onClick={() => navigate(`/learn/article/${article.id}`)}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Popular Sidebar (1 col) */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 mb-4">
                                <TrendingUp className="text-accent-rose" size={24} />
                                <Display as="h2" className="text-3xl">Most Popular</Display>
                            </div>
                            <div className="bg-surface rounded-2xl p-6 border border-border shadow-sm">
                                <ul className="space-y-6">
                                    {popularArticles.map((article, idx) => (
                                        <li key={article.id} className="group cursor-pointer" onClick={() => navigate(`/learn/article/${article.id}`)}>
                                            <div className="flex gap-4 items-start">
                                                <span className="text-2xl font-bold text-text-tertiary/50 group-hover:text-primary transition-colors">0{idx + 1}</span>
                                                <div>
                                                    <h3 className="font-bold text-text-primary group-hover:text-primary transition-colors line-clamp-2 mb-1">
                                                        {article.title}
                                                    </h3>
                                                    <span className="text-xs text-text-secondary">{article.readTime}</span>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="px-6 mb-20">
                <div className="container mx-auto max-w-6xl">
                    <Card className="bg-primary/5 border-primary/20 p-8 md:p-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />

                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="max-w-2xl">
                                <Display as="h2" className="text-3xl mb-4">Unsure where to start?</Display>
                                <Text className="text-lg">
                                    Take our scientifically-backed Clarity Score assessment to get a personalized mental health baseline and tailored recommendations.
                                </Text>
                            </div>
                            <Button
                                size="xl"
                                className="shrink-0 shadow-xl shadow-primary/20"
                                rightIcon={<ArrowRight size={20} />}
                                onClick={() => navigate('/clarity-score')}
                            >
                                Take Clarity Score
                            </Button>
                        </div>
                    </Card>
                </div>
            </section>
        </div>
    );
};

export default LearnPage;
