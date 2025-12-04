import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen } from 'lucide-react';
import SEO from '../components/SEO';
import { articleService } from '../services/articleService';
import { categoryService } from '../services/categoryService';
import { Article, Category } from '../types/models';
import ArticleCard from '../components/article/ArticleCard';
import { NoiseTexture } from '../components/home/hero/HeroAssets';

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

    if (isLoading) return <div className="min-h-screen bg-gray-50 dark:bg-black pt-32 text-center">Loading...</div>;

    if (!category) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-black">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Category not found</h1>
                <button
                    onClick={() => navigate('/learn')}
                    className="text-teal-600 font-bold hover:underline"
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
        <div className="min-h-screen bg-gray-50 dark:bg-black pt-24 pb-20">
            <SEO
                title={`${category.name} Articles | Psychage`}
                description={category.description}
            />

            {/* Hero Section */}
            <section className={`relative px-6 py-20 mb-16 overflow-hidden`}>
                <div className={`absolute inset-0 ${category.color} opacity-10 dark:opacity-20`} />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50 dark:to-black" />
                <NoiseTexture opacity={0.05} />

                <div className="container mx-auto max-w-6xl relative z-10">
                    <button
                        onClick={() => navigate('/learn')}
                        className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 font-bold text-sm uppercase tracking-wider transition-colors"
                    >
                        <ArrowLeft size={16} /> Back to Learn Hub
                    </button>

                    <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                        <div className={`p-4 rounded-2xl ${category.color} text-white shadow-lg shadow-teal-900/10`}>
                            {React.cloneElement(category.icon as React.ReactElement, { size: 40 })}
                        </div>
                        <div>
                            <h1 className="font-display font-bold text-4xl md:text-5xl text-gray-900 dark:text-white mb-4">
                                {category.name}
                            </h1>
                            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
                                {category.description}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Articles Grid */}
            <section className="px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex items-center justify-between mb-8 border-b border-gray-200 dark:border-gray-800 pb-4">
                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 font-medium">
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
                                >
                                    <ArticleCard
                                        article={article}
                                        onClick={() => navigate(`/learn/article/${article.id}`)}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800">
                            <p className="text-gray-500 dark:text-gray-400 text-lg">No articles found in this category yet.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default ArticleCategoryPage;
