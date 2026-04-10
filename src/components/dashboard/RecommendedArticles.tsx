import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { articleService } from '@/services/articleService';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface RecommendedArticlesProps {
    wellnessFocus: string[] | null;
}

interface ArticlePreview {
    id: string;
    slug: string;
    title: string;
    image?: string;
    category?: string;
    readTime?: number;
}

const RecommendedArticles: React.FC<RecommendedArticlesProps> = ({ wellnessFocus }) => {
    const reduced = useReducedMotion();
    const [articles, setArticles] = useState<ArticlePreview[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                // Try to get articles by wellness focus category, fall back to featured
                let fetched: ArticlePreview[] = [];

                if (wellnessFocus && wellnessFocus.length > 0) {
                    // Map focus areas to potential category slugs
                    const categoryMap: Record<string, string> = {
                        mood: 'emotional-regulation',
                        sleep: 'sleep-and-rest',
                        stress: 'stress-and-anxiety',
                        relationships: 'relationships',
                        'self-understanding': 'self-awareness',
                        support: 'finding-support',
                    };
                    const slug = categoryMap[wellnessFocus[0]];
                    if (slug) {
                        const catArticles = await articleService.getByCategory(slug);
                        fetched = catArticles.slice(0, 4).map(a => ({
                            id: String(a.id),
                            slug: a.slug,
                            title: a.title,
                            image: a.image,
                            category: typeof a.category === 'string' ? a.category : a.category?.name,
                            readTime: a.readTime,
                        }));
                    }
                }

                if (fetched.length === 0) {
                    const featured = await articleService.getFeatured();
                    fetched = featured.slice(0, 4).map(a => ({
                        id: String(a.id),
                        slug: a.slug,
                        title: a.title,
                        image: a.image,
                        category: typeof a.category === 'string' ? a.category : a.category?.name,
                        readTime: a.readTime,
                    }));
                }

                setArticles(fetched);
            } catch {
                setArticles([]);
            } finally {
                setLoading(false);
            }
        })();
    }, [wellnessFocus]);

    return (
        <div className="h-full rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 shadow-sm p-5 flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                        <BookOpen size={16} className="text-indigo-500" />
                    </div>
                    <h3 className="font-semibold text-sm text-gray-900 dark:text-white">Recommended for You</h3>
                </div>
                <Link
                    to="/learn"
                    className="text-xs text-gray-400 dark:text-gray-500 hover:text-teal-600 dark:hover:text-teal-400 transition-colors flex items-center gap-1"
                >
                    See All <ArrowRight size={12} />
                </Link>
            </div>

            {loading ? (
                <div className="flex gap-3 overflow-hidden">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="w-36 shrink-0">
                            <div className="w-full h-20 bg-gray-100 dark:bg-gray-800/50 rounded-lg animate-pulse mb-2" />
                            <div className="h-3 w-24 bg-gray-100 dark:bg-gray-800/50 rounded animate-pulse mb-1" />
                            <div className="h-2 w-16 bg-gray-100 dark:bg-gray-800/50 rounded animate-pulse" />
                        </div>
                    ))}
                </div>
            ) : articles.length === 0 ? (
                <div className="flex-grow flex flex-col items-center justify-center text-center py-4">
                    <BookOpen size={28} className="text-gray-300 dark:text-gray-600 mb-2" />
                    <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">Articles will appear here as your library grows.</p>
                    <Link to="/learn" className="text-xs text-teal-600 dark:text-teal-400 font-medium hover:underline">
                        Browse the Learn library
                    </Link>
                </div>
            ) : (
                <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 -mx-1 px-1 scrollbar-hide">
                    {articles.map((article, idx) => (
                        <motion.div
                            key={article.id}
                            initial={reduced ? {} : { opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.06 }}
                            className="w-36 shrink-0 snap-start"
                        >
                            <Link to={`/learn/${article.slug}`} className="group block">
                                <div className="w-full h-20 bg-gray-100 dark:bg-gray-800/50 rounded-lg mb-2 overflow-hidden">
                                    {article.image && (
                                        <img
                                            src={article.image}
                                            alt=""
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            loading="lazy"
                                        />
                                    )}
                                </div>
                                <p className="text-xs font-medium text-gray-900 dark:text-white line-clamp-2 leading-snug group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                                    {article.title}
                                </p>
                                {article.readTime && (
                                    <p className="flex items-center gap-1 text-[10px] text-gray-400 dark:text-gray-500 mt-1">
                                        <Clock size={10} />
                                        {article.readTime} min
                                    </p>
                                )}
                            </Link>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RecommendedArticles;
