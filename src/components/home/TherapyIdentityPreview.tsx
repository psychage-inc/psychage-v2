import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/ui/Button';
import { useArticleService } from '@/services/articleService';
import { Article } from '@/types/models';
import { getArticleUrl } from '@/lib/articleUrl';
import { getCategoryTheme } from '@/config/categoryThemes';

const categories = [
    { slug: 'chronic-illness-pain', label: 'Chronic Illness' },
    { slug: 'technology-digital-life', label: 'Digital Life' },
];

const TherapyIdentityPreview: React.FC = () => {
    const navigate = useNavigate();
    const articleService = useArticleService();
    const [activeCategory, setActiveCategory] = useState(categories[0].slug);
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [brokenImages, setBrokenImages] = useState<Set<string>>(new Set());

    const handleImageError = useCallback((id: string) => {
        setBrokenImages(prev => new Set(prev).add(id));
    }, []);

    useEffect(() => {
        let cancelled = false;

        articleService.getAll({ category: activeCategory })
            .then(data => {
                if (!cancelled) {
                    setArticles(data.slice(0, 12));
                    setLoading(false);
                }
            })
            .catch(() => {
                if (!cancelled) {
                    setArticles([]);
                    setLoading(false);
                }
            });

        return () => { cancelled = true; };
    }, [articleService, activeCategory]);

    const handleCategoryChange = (slug: string) => {
        setLoading(true);
        setActiveCategory(slug);
    };

    return (
        <section className="py-16 sm:py-20 lg:py-28 px-6 bg-slate-50 dark:bg-slate-900/50">
            <div className="container mx-auto max-w-6xl">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12"
                >
                    <div>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
                            Health & Modern Life
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-lg">
                            Navigate the mental health impact of chronic illness and technology with evidence-based strategies for the modern world.
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        rightIcon={<ArrowRight size={16} />}
                        onClick={() => navigate('/learn')}
                        className="shrink-0 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                    >
                        Explore All Guides
                    </Button>
                </motion.div>

                {/* Category Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="flex flex-wrap gap-2 mb-10"
                >
                    {categories.map((cat) => (
                        <button
                            key={cat.slug}
                            onClick={() => handleCategoryChange(cat.slug)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                                activeCategory === cat.slug
                                    ? 'bg-violet-600 text-white shadow-sm'
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                            }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </motion.div>

                {/* Articles Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => (
                                    <div key={i} className="animate-pulse">
                                        <div className="aspect-[4/3] bg-slate-200 dark:bg-slate-800 rounded-2xl mb-4" />
                                        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4 mb-2" />
                                        <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
                                    </div>
                                ))}
                            </div>
                        ) : articles.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {articles.map((article) => {
                                    const theme = getCategoryTheme(article.category?.slug);
                                    const FallbackIcon = theme.icon;
                                    const imgBroken = brokenImages.has(String(article.id));
                                    return (
                                        <div
                                            key={article.id}
                                            onClick={() => navigate(getArticleUrl(article))}
                                            className="group cursor-pointer"
                                        >
                                            <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-slate-200 dark:bg-slate-800">
                                                {article.image && !imgBroken ? (
                                                    <img
                                                        src={article.image}
                                                        alt={article.title}
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                        loading="lazy"
                                                        onError={() => handleImageError(String(article.id))}
                                                    />
                                                ) : (
                                                    <div className={`w-full h-full flex items-center justify-center ${theme.classes.bgLight} ${theme.classes.bgLightDark}`}>
                                                        <FallbackIcon size={40} className={`${theme.classes.text} ${theme.classes.textDark} opacity-30`} />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2 mb-2">
                                                <BookOpen className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                                                <span className="text-xs text-slate-400 dark:text-slate-500">
                                                    {article.readTime ? `${article.readTime} min read` : 'Article'}
                                                </span>
                                            </div>
                                            <h3 className="font-display font-bold text-slate-900 dark:text-white leading-snug group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors line-clamp-2">
                                                {article.title}
                                            </h3>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-center py-12 text-slate-500 dark:text-slate-400">
                                <p>No articles available in this category yet.</p>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
};

export default TherapyIdentityPreview;
