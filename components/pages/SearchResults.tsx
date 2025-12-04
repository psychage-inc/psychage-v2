
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, BookOpen, Play, Wrench, PenTool, FileText, Video } from 'lucide-react';
import { articles } from '../../data/richArticles';
import { videos } from '../../data/videos';
import { tools } from '../../data/tools';
import { useSearchParams, useNavigate } from 'react-router-dom';
import SEO from '../SEO';
import ArticleCard from '../article/ArticleCard';
import VideoCard from '../video/VideoCard';
import ToolCard from '../tool/ToolCard';

const SearchResults: React.FC = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [query]);

    const normalizedQuery = query.toLowerCase();

    // Simple Filtering Logic
    const matchedArticles = articles.filter(item =>
        item.title.toLowerCase().includes(normalizedQuery) ||
        item.description.toLowerCase().includes(normalizedQuery) ||
        item.category.toLowerCase().includes(normalizedQuery)
    );

    const matchedVideos = videos.filter(item =>
        item.title.toLowerCase().includes(normalizedQuery) ||
        item.category.toLowerCase().includes(normalizedQuery)
    );

    const matchedTools = tools.filter(item =>
        item.name.toLowerCase().includes(normalizedQuery) ||
        item.description.toLowerCase().includes(normalizedQuery)
    );

    const totalResults = matchedArticles.length + matchedVideos.length + matchedTools.length;

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-20">
            <SEO
                title={`Search Results for "${query}" | Psychage`}
                description={`Search results for ${query} on Psychage.`}
            />
            <div className="container mx-auto max-w-6xl px-6">

                <button onClick={() => navigate('/')} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-8 font-bold text-sm uppercase tracking-wider transition-colors">
                    <ArrowLeft size={16} /> Back to Home
                </button>

                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Search Results</h1>
                    <p className="text-xl text-gray-600">Showing results for <span className="font-bold text-gray-900">"{query}"</span></p>
                </div>

                {totalResults === 0 && (
                    <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-gray-200">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                            <Search size={32} />
                        </div>
                        <h3 className="font-bold text-xl text-gray-900 mb-2">No results found</h3>
                        <p className="text-gray-500">Try adjusting your keywords or browsing by category.</p>
                    </div>
                )}

                {/* Results Sections */}
                <div className="space-y-16">

                    {matchedTools.length > 0 && (
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-amber-100 text-amber-600 rounded-lg"><PenTool size={20} /></div>
                                <h2 className="font-bold text-2xl text-gray-900">Tools</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {matchedTools.map(tool => (
                                    <ToolCard key={tool.id} tool={tool} />
                                ))}
                            </div>
                        </section>
                    )}

                    {matchedArticles.length > 0 && (
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-teal-100 text-teal-600 rounded-lg"><FileText size={20} /></div>
                                <h2 className="font-bold text-2xl text-gray-900">Articles</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {matchedArticles.map(article => (
                                    <motion.div
                                        key={article.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer group border border-gray-100"
                                        onClick={() => navigate(`/learn/article/${article.id}`)}
                                    >
                                        <ArticleCard article={article} />
                                    </motion.div>
                                ))}
                            </div>
                        </section>
                    )}

                    {matchedVideos.length > 0 && (
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg"><Video size={20} /></div>
                                <h2 className="font-bold text-2xl text-gray-900">Videos</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {matchedVideos.map(video => (
                                    <div key={video.id} onClick={() => navigate(`/watch/${video.id}`)}>
                                        <VideoCard video={video} />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                </div>

            </div>
        </div>
    );
};

export default SearchResults;
