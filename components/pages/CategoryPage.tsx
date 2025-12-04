
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { articles } from '../../data/richArticles';
import { videos } from '../../data/videos';
import { tools } from '../../data/tools';
import ArticleCard from '../article/ArticleCard';
import VideoCard from '../video/VideoCard';
import ToolCard from '../tool/ToolCard';
import { useParams, useNavigate } from 'react-router-dom';

const CategoryPage: React.FC = () => {
    const { category } = useParams<{ category: string }>();
    const navigate = useNavigate();

    // Capitalize category for display
    const categoryTitle = category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Category';

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [category]);

    if (!category) {
        return <div>Category not found</div>;
    }

    // Mock filter logic - in real app would filter by actual category prop
    const categoryArticles = articles.slice(0, 4);
    const categoryVideos = videos.slice(0, 3);
    const categoryTools = tools.slice(0, 2);

    return (
        <div className="min-h-screen bg-[#fafaf9]">
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

                {/* Articles Section */}
                <section>
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="font-display font-bold text-3xl text-gray-900">Latest Articles</h2>
                        <button className="text-teal-600 font-bold hover:text-teal-800 transition-colors">View All</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {categoryArticles.map((article) => (
                            <motion.div
                                key={article.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer group"
                                onClick={() => navigate(`/learn/article/${article.id}`)}
                            >
                                <ArticleCard article={article} />
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Tools Section */}
                <section>
                    <h2 className="font-display font-bold text-3xl text-gray-900 mb-8">Interactive Tools</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {categoryTools.map(tool => (
                            <ToolCard key={tool.id} tool={tool} />
                        ))}
                    </div>
                </section>

                {/* Videos Section */}
                <section>
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="font-display font-bold text-3xl text-gray-900">Video Guides</h2>
                        <button className="text-teal-600 font-bold hover:text-teal-800 transition-colors">View All</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {categoryVideos.map(video => (
                            <div key={video.id} onClick={() => navigate(`/watch/${video.id}`)}>
                                <VideoCard video={video} />
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
};

export default CategoryPage;
