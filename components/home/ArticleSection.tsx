
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { articles } from '../../data/richArticles';
import { useNavigate } from 'react-router-dom';

const ArticleSection: React.FC = () => {
    const navigate = useNavigate();

    // Defensive check: If no articles, don't crash, just render nothing or a placeholder
    if (!articles || articles.length === 0) {
        return null;
    }

    const featured = articles[0];
    const list = articles.slice(1, 4);

    // If featured article is somehow undefined (e.g. empty array), return null
    if (!featured) return null;

    return (
        <section className="bg-[#fafaf9] dark:bg-[#050505] py-32 px-6 transition-colors duration-300">
            <div className="container mx-auto max-w-[1280px]">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

                    {/* Left: Featured Article */}
                    <div
                        className="lg:col-span-7 flex flex-col group cursor-pointer"
                        onClick={() => navigate(`/learn/article/${featured.id}`)}
                    >
                        <div className="mb-8 overflow-hidden rounded-[2rem]">
                            <img
                                src={featured.image}
                                alt={featured.title}
                                className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-teal-600 dark:text-teal-400 mb-4">
                            <span>{featured.category}</span>
                            <span className="w-1 h-1 bg-gray-300 dark:bg-gray-700 rounded-full" />
                            <span className="text-gray-400 dark:text-gray-500">{featured.readTime} min read</span>
                        </div>
                        <h3 className="font-display font-bold text-4xl md:text-5xl text-gray-900 dark:text-white mb-4 leading-[1.1] group-hover:text-teal-800 dark:group-hover:text-teal-300 transition-colors">
                            {featured.title}
                        </h3>
                        <p className="text-xl text-gray-500 dark:text-gray-400 leading-relaxed max-w-xl">
                            {featured.description}
                        </p>
                    </div>

                    {/* Right: List */}
                    <div className="lg:col-span-5 flex flex-col justify-center">
                        <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400 dark:text-gray-600 mb-8 border-b border-gray-200 dark:border-gray-800 pb-4">
                            Trending Now
                        </h4>

                        <div className="space-y-10">
                            {list.map((article) => (
                                <div
                                    key={article.id}
                                    className="group cursor-pointer"
                                    onClick={() => navigate(`/learn/article/${article.id}`)}
                                >
                                    <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">
                                        <span className="group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">{article.category}</span>
                                    </div>
                                    <h3 className="font-display font-bold text-2xl text-gray-900 dark:text-white mb-3 leading-tight group-hover:underline decoration-teal-500/50 underline-offset-4 decoration-2">
                                        {article.title}
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-400 line-clamp-2 text-sm leading-relaxed">
                                        {article.description}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <a href="#" onClick={(e) => { e.preventDefault(); navigate('/search'); }} className="inline-flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white mt-12 hover:text-teal-600 dark:hover:text-teal-400 transition-colors group">
                            Read Journal <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default ArticleSection;
