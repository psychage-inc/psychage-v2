import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, ChevronRight } from 'lucide-react';
import SEO from '@/components/SEO';
import { useArticleService } from '@/services/articleService';
import { categoryService } from '@/services/categoryService';
import { Article, Category } from '@/types/models';
import ArticleCard from '@/components/article/ArticleCard';
import { Display, Text } from '@/components/ui/Typography';

const CategoryPage: React.FC = () => {
    const { categorySlug } = useParams<{ categorySlug: string }>();
    const navigate = useNavigate();
    const [category, setCategory] = React.useState<Category | undefined>(undefined);
    const [articles, setArticles] = React.useState<Article[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const articleService = useArticleService();

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
    }, [categorySlug, articleService]);

    if (isLoading) return <div className="min-h-screen bg-background pt-32 text-center text-text-secondary">Loading...</div>;

    if (!category) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-background">
                <Display className="text-2xl mb-4">Category not found</Display>
                <button
                    onClick={() => navigate('/learn')}
                    className="text-primary font-bold hover:underline"
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
        <div className="min-h-screen bg-background pt-24 pb-20">
            <SEO
                title={`${category.name} Articles | Psychage`}
                description={category.description}
            />

            {/* Breadcrumb */}
            <div className="container mx-auto max-w-6xl px-6 mb-8">
                <nav className="flex items-center text-sm text-text-tertiary">
                    <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                    <ChevronRight size={14} className="mx-2" />
                    <Link to="/learn" className="hover:text-primary transition-colors">Learn</Link>
                    <ChevronRight size={14} className="mx-2" />
                    <span className="text-text-secondary font-medium">{category.name}</span>
                </nav>
            </div>

            {/* Hero Section */}
            <section className={`relative px-6 py-16 mb-16 overflow-hidden rounded-3xl mx-4 md:mx-6 bg-surface border border-border`}>
                <div className={`absolute inset-0 ${category.color} opacity-[0.03]`} />
                <div className="container mx-auto max-w-6xl relative z-10">
                    <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                        <div className={`p-5 rounded-2xl ${category.color} text-white shadow-xl shadow-primary/10`}>
                            {React.cloneElement(category.icon as React.ReactElement, { size: 48 })}
                        </div>
                        <div>
                            <Display as="h1" className="text-4xl md:text-5xl mb-4">
                                {category.name}
                            </Display>
                            <Text className="text-xl max-w-2xl">
                                {category.description}
                            </Text>
                        </div>
                    </div>
                </div>
            </section>

            {/* Articles Grid */}
            <section className="px-6">
                <div className="container mx-auto max-w-6xl">
                    {/* Controls */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-4 border-b border-border gap-4">
                        <div className="flex items-center gap-2 text-text-secondary font-medium">
                            <BookOpen size={18} />
                            <span>{categoryArticles.length} Articles</span>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-sm text-text-secondary">
                                <span className="font-medium">Sort by:</span>
                                <select className="bg-surface border border-border rounded-lg px-2 py-1 outline-none focus:ring-2 focus:ring-primary/50">
                                    <option>Most Recent</option>
                                    <option>Popular</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                        {/* Main Feed */}
                        <div className="lg:col-span-3">
                            {categoryArticles.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                                <div className="text-center py-20 bg-surface rounded-3xl border border-dashed border-border">
                                    <p className="text-text-secondary text-lg">No articles found in this category yet.</p>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <aside className="space-y-8">
                            <div>
                                <h3 className="font-bold text-text-primary mb-4 text-sm uppercase tracking-wider">Related Categories</h3>
                                <ul className="space-y-2">
                                    {['Anxiety', 'Depression', 'Sleep', 'Mindfulness'].map(cat => (
                                        <li key={cat}>
                                            <Link to={`/learn/${cat.toLowerCase()}`} className="block p-3 rounded-lg hover:bg-surface-hover text-text-secondary hover:text-primary transition-colors text-sm font-medium">
                                                {cat}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CategoryPage;
