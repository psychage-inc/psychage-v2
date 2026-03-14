import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/ui/Button';
import { useArticleService } from '@/services/articleService';
import { Article } from '@/types/models';
import { getArticleUrl } from '@/lib/articleUrl';

const categories = [
    { slug: 'anxiety', label: 'Anxiety' },
    { slug: 'mood', label: 'Mood' },
    { slug: 'trauma', label: 'Trauma' },
];

const ContentPreview: React.FC = () => {
    const navigate = useNavigate();
    const articleService = useArticleService();
    const [activeCategory, setActiveCategory] = useState(categories[0].slug);
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);

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

    // Reset loading when category changes
    const handleCategoryChange = (slug: string) => {
        setLoading(true);
        setActiveCategory(slug);
    };

    return (
        <section className="py-16 sm:py-20 lg:py-28 px-6 bg-white dark:bg-slate-950">
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
                            Understand Your Conditions
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-lg">
                            Expert-written guides on anxiety, mood disorders, and trauma — helping you recognize patterns and find clarity.
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        rightIcon={<ArrowRight size={16} />}
                        onClick={() => navigate('/learn')}
                        className="shrink-0 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                    >
                        Browse All Topics
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
                                    ? 'bg-teal-600 text-white shadow-sm'
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
                                        <div className="aspect-[4/3] bg-slate-100 dark:bg-slate-800 rounded-2xl mb-4" />
                                        <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-3/4 mb-2" />
                                        <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded w-1/2" />
                                    </div>
                                ))}
                            </div>
                        ) : articles.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {articles.map((article) => (
                                    <div
                                        key={article.id}
                                        onClick={() => navigate(getArticleUrl(article))}
                                        className="group cursor-pointer"
                                    >
                                        <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-slate-100 dark:bg-slate-800">
                                            <img
                                                src={article.image}
                                                alt={article.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <BookOpen className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                                            <span className="text-xs text-slate-400 dark:text-slate-500">
                                                {article.readTime ? `${article.readTime} min read` : 'Article'}
                                            </span>
                                        </div>
                                        <h3 className="font-display font-bold text-slate-900 dark:text-white leading-snug group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors line-clamp-2">
                                            {article.title}
                                        </h3>
                                    </div>
                                ))}
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

export default ContentPreview;
