import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/ui/Button';
import { useTopicHubData } from '@/hooks/useTopicHubData';
import { SkeletonTopicHub } from '@/components/ui/Skeletons';
import InteractiveCard from '@/components/ui/InteractiveCard';
import GrainOverlay from '@/components/ui/GrainOverlay';

interface TopicHubSectionProps {
    categoryId: string;
    title?: string;
    description?: string;
    className?: string;
    showVideos?: boolean;
    invert?: boolean;
}

const TopicHubSection: React.FC<TopicHubSectionProps> = ({
    categoryId,
    title,
    description,
    className = '',
    showVideos = true,
    invert = false
}) => {
    const navigate = useNavigate();
    const { category, articles: categoryArticles, videos: categoryVideos, loading } = useTopicHubData(categoryId, showVideos);

    if (loading) return <SkeletonTopicHub invert={invert} />;
    if (!category || categoryArticles.length === 0) return null;

    return (
        <section className={`py-20 px-6 relative overflow-hidden ${className}`}>
            <GrainOverlay opacity={0.03} />
            <motion.div
                className="container mx-auto max-w-[1280px] relative z-10"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                    hidden: { opacity: 0 },
                    show: {
                        opacity: 1,
                        transition: {
                            staggerChildren: 0.1
                        }
                    }
                }}
            >

                {/* Header */}
                <motion.div
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                    }}
                    className={`flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-b border-gray-100 pb-8 ${invert ? "md:flex-row-reverse text-right" : ""}`}
                >
                    <div className={invert ? "items-end flex flex-col" : ""}>
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
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                    {categoryArticles[0] && (
                        <motion.div
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                            }}
                            className={`lg:col-span-6 h-full ${invert ? "lg:order-last" : ""}`}
                        >
                            <InteractiveCard
                                onClick={() => navigate(`/learn/article/${categoryArticles[0].id}`)}
                                className="h-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg cursor-pointer group"
                            >
                                <div className="p-5 h-full flex flex-col">
                                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-6 bg-gray-100 dark:bg-slate-800">
                                        <img
                                            src={categoryArticles[0].image}
                                            alt={categoryArticles[0].title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                                        {categoryArticles[0].title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                                        {categoryArticles[0].description}
                                    </p>
                                </div>
                            </InteractiveCard>
                        </motion.div>
                    )}

                    {/* Right Column: More Articles & Videos */}
                    <div className="lg:col-span-6 flex flex-col gap-10">

                        {/* Secondary Articles List */}
                        <div className="space-y-8">
                            {categoryArticles.slice(1).map(article => (
                                <motion.div
                                    key={article.id}
                                    variants={{
                                        hidden: { opacity: 0, x: 20 },
                                        show: { opacity: 1, x: 0, transition: { duration: 0.5 } }
                                    }}
                                    className={`flex gap-6 group cursor-pointer items-start ${invert ? "flex-row-reverse text-right" : ""}`}
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
                                        <div className={`flex items-center gap-2 mb-2 ${invert ? "justify-end" : ""}`}>
                                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Article</span>
                                            <span className="text-[10px] text-gray-300">•</span>
                                            <span className="text-[10px] text-gray-400">{article.readTime} min read</span>
                                        </div>
                                        <h4 className="font-bold text-lg text-gray-900 leading-tight mb-1 group-hover:underline decoration-gray-200 underline-offset-4 transition-all">
                                            {article.title}
                                        </h4>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Video Section (if available) */}
                        {categoryVideos.length > 0 && (
                            <motion.div
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                                }}
                                className="mt-auto pt-8 border-t border-gray-100"
                            >
                                <h4 className={`text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 ${invert ? "text-right" : ""}`}>Related Videos</h4>
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
                                            <h5 className={`font-bold text-sm text-gray-900 line-clamp-2 group-hover:underline decoration-gray-200 underline-offset-2 transition-all ${invert ? "text-right" : ""}`}>
                                                {video.title}
                                            </h5>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default TopicHubSection;
