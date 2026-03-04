
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { articleService, ArticleWithContent } from '../../services/articleService';
import { videoService } from '../../services/videoService';
import { toolService } from '../../services/toolService';
import { Video, Tool } from '../../types/models';
import ArticleCard from '../article/ArticleCard';
import VideoCard from '../video/VideoCard';
import ToolCard from '../tool/ToolCard';
import { useParams, useNavigate } from 'react-router-dom';
import SEO from '../SEO';
import { AlertCircle, RefreshCw } from 'lucide-react';

// Loading skeleton components
const ArticleSkeleton = () => (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse">
        <div className="h-48 bg-gray-200" />
        <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-100 rounded w-full" />
            <div className="h-3 bg-gray-100 rounded w-5/6" />
        </div>
    </div>
);

const VideoSkeleton = () => (
    <div className="animate-pulse">
        <div className="aspect-video bg-gray-200 rounded-xl mb-4" />
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
        <div className="h-3 bg-gray-100 rounded w-1/2" />
    </div>
);

const ToolSkeleton = () => (
    <div className="bg-white rounded-xl p-6 shadow-sm animate-pulse">
        <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gray-200 rounded-xl" />
            <div className="flex-grow">
                <div className="h-5 bg-gray-200 rounded w-1/2 mb-2" />
                <div className="h-3 bg-gray-100 rounded w-1/3" />
            </div>
        </div>
        <div className="space-y-2">
            <div className="h-3 bg-gray-100 rounded w-full" />
            <div className="h-3 bg-gray-100 rounded w-5/6" />
        </div>
    </div>
);

const CategoryPage: React.FC = () => {
    const { category } = useParams<{ category: string }>();
    const navigate = useNavigate();

    // State management
    const [articles, setArticles] = useState<ArticleWithContent[]>([]);
    const [videos, setVideos] = useState<Video[]>([]);
    const [tools, setTools] = useState<Tool[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Capitalize category for display
    const categoryTitle = category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Category';

    // Fetch data from services
    const fetchData = async () => {
        if (!category) return;

        setLoading(true);
        setError(null);

        try {
            const [articlesData, videosData, toolsData] = await Promise.all([
                articleService.getByCategory(category).catch(() => []),
                videoService.getAll({ category: categoryTitle, limit: 6 }).catch(() => []),
                toolService.getAll().catch(() => [])
            ]);

            setArticles(articlesData.slice(0, 8)); // Show up to 8 articles
            setVideos(videosData.slice(0, 6)); // Show up to 6 videos
            setTools(toolsData.slice(0, 4)); // Show up to 4 tools
        } catch (err) {
            console.error('Error fetching category data:', err);
            setError('Unable to load category content. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchData();
    }, [category]);

    if (!category) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Category not found</h1>
                    <button
                        onClick={() => navigate('/learn')}
                        className="text-teal-600 hover:text-teal-700 font-medium"
                    >
                        ← Back to Learn
                    </button>
                </div>
            </div>
        );
    }

    const categoryArticles = articles;
    const categoryVideos = videos;
    const categoryTools = tools;

    return (
        <div className="min-h-screen bg-background">
            <SEO
                title={`${categoryTitle} | Psychage Resources`}
                description={`Explore articles, videos, and tools related to ${categoryTitle} on Psychage.`}
            />
            {/* Hero */}
            <div className="bg-teal-900 pt-32 pb-20 px-6">
                <div className="container mx-auto max-w-[1280px]">
                    <h1 className="font-display font-bold text-4xl md:text-6xl text-white mb-6">
                        {categoryTitle}
                    </h1>

                    <p className="text-xl text-teal-100 max-w-2xl font-light leading-relaxed">
                        Comprehensive resources, expert insights, and clinical tools designed to help you understand and manage {category.toLowerCase()}.
                    </p>

                    <div className="flex gap-8 mt-12 text-sm font-bold uppercase tracking-widest text-teal-400">
                        <div>{categoryArticles.length} Articles</div>
                        <div>{categoryVideos.length} Videos</div>
                        <div>{categoryTools.length} Tools</div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto max-w-[1280px] px-6 space-y-20 py-20">

                {/* Error State */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-6 flex items-start gap-4">
                        <AlertCircle size={24} className="text-red-500 shrink-0 mt-0.5" />
                        <div className="flex-grow">
                            <h3 className="font-bold text-red-700 mb-1">Unable to load content</h3>
                            <p className="text-sm text-red-600 mb-4">{error}</p>
                            <button
                                onClick={fetchData}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-medium transition-colors"
                            >
                                <RefreshCw size={16} />
                                Try Again
                            </button>
                        </div>
                    </div>
                )}

                {/* Articles Section */}
                <section>
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="font-display font-bold text-3xl text-gray-900 dark:text-white">Latest Articles</h2>
                        {!loading && categoryArticles.length > 0 && (
                            <button
                                onClick={() => navigate(`/learn?category=${category}`)}
                                className="text-teal-600 font-bold hover:text-teal-800 transition-colors"
                            >
                                View All
                            </button>
                        )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {loading ? (
                            // Loading skeletons
                            Array.from({ length: 4 }).map((_, i) => <ArticleSkeleton key={i} />)
                        ) : categoryArticles.length > 0 ? (
                            // Articles data
                            categoryArticles.map((article, idx) => (
                                <motion.div
                                    key={article.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer group"
                                    onClick={() => navigate(`/learn/article/${article.slug}`)}
                                >
                                    <ArticleCard article={article} />
                                </motion.div>
                            ))
                        ) : (
                            // Empty state
                            <div className="col-span-full text-center py-12 bg-gray-50 rounded-xl">
                                <p className="text-gray-500">No articles found for this category.</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Tools Section */}
                <section>
                    <h2 className="font-display font-bold text-3xl text-gray-900 dark:text-white mb-8">Interactive Tools</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {loading ? (
                            // Loading skeletons
                            Array.from({ length: 2 }).map((_, i) => <ToolSkeleton key={i} />)
                        ) : categoryTools.length > 0 ? (
                            // Tools data
                            categoryTools.map((tool, idx) => (
                                <motion.div
                                    key={tool.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                >
                                    <ToolCard tool={tool} />
                                </motion.div>
                            ))
                        ) : (
                            // Empty state
                            <div className="col-span-full text-center py-12 bg-gray-50 rounded-xl">
                                <p className="text-gray-500">No tools available for this category.</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Videos Section */}
                <section>
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="font-display font-bold text-3xl text-gray-900 dark:text-white">Video Guides</h2>
                        {!loading && categoryVideos.length > 0 && (
                            <button className="text-teal-600 font-bold hover:text-teal-800 transition-colors">
                                View All
                            </button>
                        )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {loading ? (
                            // Loading skeletons
                            Array.from({ length: 3 }).map((_, i) => <VideoSkeleton key={i} />)
                        ) : categoryVideos.length > 0 ? (
                            // Videos data
                            categoryVideos.map((video, idx) => (
                                <motion.div
                                    key={video.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    onClick={() => navigate(`/watch/${video.id}`)}
                                    className="cursor-pointer"
                                >
                                    <VideoCard video={video} />
                                </motion.div>
                            ))
                        ) : (
                            // Empty state
                            <div className="col-span-full text-center py-12 bg-gray-50 rounded-xl">
                                <p className="text-gray-500">No videos available for this category.</p>
                            </div>
                        )}
                    </div>
                </section>

            </div>
        </div>
    );
};

export default CategoryPage;
