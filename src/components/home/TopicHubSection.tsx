import React from 'react';
import { ArrowRight, Play, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { articles } from '../../data/articles';
import { videos } from '../../data/videos';
import { getCategoryById } from '../../data/categories';
import Button from '@/components/ui/Button';

interface TopicHubSectionProps {
    categoryId: string;
    title?: string;
    description?: string;
    className?: string;
    showVideos?: boolean;
}

const TopicHubSection: React.FC<TopicHubSectionProps> = ({
    categoryId,
    title,
    description,
    className = '',
    showVideos = true
}) => {
    const navigate = useNavigate();
    const category = getCategoryById(categoryId);

    if (!category) return null;

    // Filter content
    const categoryArticles = articles.filter(a => a.category.id === categoryId).slice(0, 3);
    const categoryVideos = showVideos ? videos.filter(v => v.category.toLowerCase() === category.name.toLowerCase()).slice(0, 2) : [];

    if (categoryArticles.length === 0 && categoryVideos.length === 0) return null;

    return (
        <section className={`py-20 px-6 ${className}`}>
            <div className="container mx-auto max-w-[1280px]">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-b border-gray-100 pb-8">
                    <div>
                        <span className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-2 block">
                            {category.name}
                        </span>
                        <h2 className="text-3xl font-display font-bold text-gray-900 mb-3">
                            {title || `Mastering ${category.name}`}
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl">
                            {description || category.description}
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        rightIcon={<ArrowRight size={18} />}
                        onClick={() => navigate(`/category/${category.slug}`)}
                        className="shrink-0 border-gray-200"
                    >
                        View All Resources
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                    {/* Main Feature (First Article) */}
                    {categoryArticles[0] && (
                        <div className="lg:col-span-6 group cursor-pointer" onClick={() => navigate(`/learn/article/${categoryArticles[0].id}`)}>
                            <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-6 bg-gray-100">
                                <img
                                    src={categoryArticles[0].image}
                                    alt={categoryArticles[0].title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:underline decoration-gray-300 underline-offset-4 transition-all">
                                {categoryArticles[0].title}
                            </h3>
                            <p className="text-gray-600 line-clamp-2 leading-relaxed">
                                {categoryArticles[0].description}
                            </p>
                        </div>
                    )}

                    {/* Right Column: More Articles & Videos */}
                    <div className="lg:col-span-6 flex flex-col gap-10">

                        {/* Secondary Articles List */}
                        <div className="space-y-8">
                            {categoryArticles.slice(1).map(article => (
                                <div
                                    key={article.id}
                                    className="flex gap-6 group cursor-pointer items-start"
                                    onClick={() => navigate(`/learn/article/${article.id}`)}
                                >
                                    <div className="w-28 h-20 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Article</span>
                                            <span className="text-[10px] text-gray-300">•</span>
                                            <span className="text-[10px] text-gray-400">{article.readTime} min read</span>
                                        </div>
                                        <h4 className="font-bold text-lg text-gray-900 leading-tight mb-1 group-hover:underline decoration-gray-200 underline-offset-4 transition-all">
                                            {article.title}
                                        </h4>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Video Section (if available) */}
                        {categoryVideos.length > 0 && (
                            <div className="mt-auto pt-8 border-t border-gray-100">
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Related Videos</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {categoryVideos.map(video => (
                                        <div
                                            key={video.id}
                                            className="group cursor-pointer"
                                            onClick={() => navigate(`/watch/${video.id}`)}
                                        >
                                            <div className="relative aspect-video rounded-lg overflow-hidden mb-3 bg-gray-100">
                                                <img
                                                    src={video.thumbnail}
                                                    alt={video.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                                                    <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-sm">
                                                        <Play size={16} className="text-black fill-black ml-1" />
                                                    </div>
                                                </div>
                                                <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/70 text-white text-[10px] font-medium">
                                                    {Math.floor(video.duration / 60)}:{String(video.duration % 60).padStart(2, '0')}
                                                </span>
                                            </div>
                                            <h5 className="font-bold text-sm text-gray-900 line-clamp-2 group-hover:underline decoration-gray-200 underline-offset-2 transition-all">
                                                {video.title}
                                            </h5>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </section>
    );
};

export default TopicHubSection;
