import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen } from 'lucide-react';
import SEO from '../components/SEO';
import { articleService } from '../services/articleService';
import { categoryService } from '../services/categoryService';
import { Article, Category } from '../types/models';
import ArticleCard from '../components/article/ArticleCard';
import { getArticleUrl } from '../lib/articleUrl';
const ArticleCategoryPage: React.FC = () => {
    const { categorySlug } = useParams<{ categorySlug: string }>();
    const navigate = useNavigate();
    const [category, setCategory] = React.useState<Category | undefined>(undefined);
    const [articles, setArticles] = React.useState<Article[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchData = async () => {
            if (!categorySlug) return;
            try {
                const [cat, allArticles] = await Promise.all([
                    categoryService.getBySlug(categorySlug),
                    articleService.getAll()
                ]);
                setCategory(cat);
                setArticles(allArticles);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [categorySlug]);

    if (isLoading) return (
        <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
    );

    if (!category) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-background">
                                <h1 className="text-2xl font-bold text-text-primary mb-4 z-10">Category not found</h1>
                <button
                    onClick={() => navigate('/learn')}
                    className="text-primary font-bold hover:underline z-10"
                >
                    Back to Learn Hub
                </button>
            </div>
        );
    }

    const categoryArticles = articles.filter(
        article => article.category.id === category.id
    );

    return (
        <div className="min-h-screen bg-background pb-20 overflow-x-hidden">
            <SEO
                title={`${category.name} Articles | Psychage`}
                description={category.description}
            />

            {/* Hero Section */}
            <section className={`relative pt-32 pb-20 px-6 min-h-[30vh] sm:min-h-[40vh] lg:min-h-[50vh] flex flex-col justify-center overflow-hidden`}>
                                {/* Category specific ambient glow */}
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-full ${category.color} opacity-10 blur-[100px] pointer-events-none`} />

                <div className="container mx-auto max-w-7xl relative z-10">
                    <button
                        onClick={() => navigate('/learn')}
                        className="flex items-center gap-2 text-text-secondary hover:text-text-primary mb-8 font-bold text-sm uppercase tracking-wider transition-colors"
                    >
                        <ArrowLeft size={16} /> Back to Learn Hub
                    </button>

                    <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                        {category.icon && React.isValidElement(category.icon) && (
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className={`p-6 rounded-3xl ${category.color} text-white shadow-2xl shadow-primary/20 bg-gradient-to-br from-white/20 to-transparent backdrop-blur-md border border-white/20`}
                            >
                                {React.cloneElement(category.icon, { size: 48 })}
                            </motion.div>
                        )}
                        <div>
                            <motion.h1
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1 }}
                                className="font-display font-bold text-4xl sm:text-5xl lg:text-7xl text-text-primary mb-4"
                            >
                                {category.name}
                            </motion.h1>
                            <motion.p
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-xl md:text-2xl text-text-secondary max-w-2xl leading-relaxed"
                            >
                                {category.description}
                            </motion.p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Articles Grid */}
            <section className="px-6 mb-24">
                <div className="container mx-auto max-w-7xl">
                    <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                        <div className="flex items-center gap-2 text-text-secondary font-medium">
                            <BookOpen size={18} />
                            <span>{categoryArticles.length} Articles</span>
                        </div>
                    </div>

                    {categoryArticles.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {categoryArticles.map((article, index) => (
                                <motion.div
                                    key={article.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="h-full"
                                >
                                    <ArticleCard
                                        article={article}
                                        onClick={() => navigate(getArticleUrl(article))}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-surface rounded-3xl border border-dashed border-border">
                            {category.icon && React.isValidElement(category.icon) && (
                                <div className={`inline-flex p-5 rounded-2xl ${category.color} text-white/50 mb-6`}>
                                    {React.cloneElement(category.icon as React.ReactElement, { size: 48 })}
                                </div>
                            )}
                            <h2 className="font-display font-bold text-2xl text-text-primary mb-3">
                                Articles Coming Soon
                            </h2>
                            <p className="text-text-secondary text-lg max-w-md mx-auto mb-8">
                                We&apos;re preparing expert-reviewed articles about {category.name.toLowerCase()}.
                                Check back soon or explore our wellness tools in the meantime.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={() => navigate('/learn')}
                                    className="px-6 py-3 text-sm font-bold text-text-secondary bg-surface border border-border rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                >
                                    Browse Other Topics
                                </button>
                                <button
                                    onClick={() => navigate('/tools')}
                                    className="px-6 py-3 text-sm font-bold text-white bg-teal-600 rounded-xl hover:bg-teal-700 transition-colors"
                                >
                                    Explore Wellness Tools
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default ArticleCategoryPage;
