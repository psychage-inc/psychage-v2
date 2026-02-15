import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, PenTool, FileText, Video, ChevronDown } from 'lucide-react';
import { articles } from '../../data/articles';
import { videos } from '../../data/videos';
import { tools } from '../../data/tools';
import { categories } from '../../data/categories';
import { useSearchParams, useNavigate } from 'react-router-dom';
import SEO from '../SEO';
import ArticleCard from '../article/ArticleCard';
import VideoCard from '../video/VideoCard';
import ToolCard from '../tool/ToolCard';
import SearchAutocomplete from '../search/SearchAutocomplete';

type SortOption = 'relevance' | 'date' | 'title';

const CATEGORY_MAPPING: Record<string, string> = {
    // Videos
    'education': 'mood',
    'support': 'relationships',
    'yoga': 'wellness',

    // Tools
    'assessment': 'wellness',
    'self-care': 'wellness',
    'relaxation': 'mindfulness',
    'professional': 'therapy-types',
    'emergency': 'trauma'
};

const getCanonicalCategory = (category: string) => {
    const lower = category.toLowerCase();
    return CATEGORY_MAPPING[lower] || lower;
};

const SearchResults: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const navigate = useNavigate();

    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [sortBy, setSortBy] = useState<SortOption>('relevance');
    const [isSortOpen, setIsSortOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [query]);

    const normalizedQuery = query.toLowerCase();

    // Filter Logic
    const filteredResults = useMemo(() => {
        let matchedArticles = articles.filter(item =>
            item.title.toLowerCase().includes(normalizedQuery) ||
            item.description.toLowerCase().includes(normalizedQuery) ||
            item.category.name.toLowerCase().includes(normalizedQuery)
        );

        let matchedVideos = videos.filter(item =>
            item.title.toLowerCase().includes(normalizedQuery) ||
            item.category.toLowerCase().includes(normalizedQuery)
        );

        let matchedTools = tools.filter(tool =>
            tool.name.toLowerCase().includes(normalizedQuery) ||
            tool.description.toLowerCase().includes(normalizedQuery)
        );

        // Apply Category Filter
        if (selectedCategory !== 'all') {
            matchedArticles = matchedArticles.filter(a => a.category.id === selectedCategory);
            matchedVideos = matchedVideos.filter(v => getCanonicalCategory(v.category) === selectedCategory);
            matchedTools = matchedTools.filter(t => getCanonicalCategory(t.category) === selectedCategory);
        }

        // Apply Sorting
        if (sortBy === 'date') {
            matchedArticles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
            // Videos/Tools might not have date, keep as is
        } else if (sortBy === 'title') {
            matchedArticles.sort((a, b) => a.title.localeCompare(b.title));
            matchedVideos.sort((a, b) => a.title.localeCompare(b.title));
            matchedTools.sort((a, b) => a.name.localeCompare(b.name));
        }

        return { matchedArticles, matchedVideos, matchedTools };
    }, [normalizedQuery, selectedCategory, sortBy]);

    const { matchedArticles, matchedVideos, matchedTools } = filteredResults;
    const totalResults = matchedArticles.length + matchedVideos.length + matchedTools.length;

    const handleSearch = (newQuery: string) => {
        setSearchParams({ q: newQuery });
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#050505] pt-24 pb-20 transition-colors duration-300">
            <SEO
                title={`Search Results for "${query}" | Psychage`}
                description={`Search results for ${query} on Psychage.`}
            />
            <div className="container mx-auto max-w-6xl px-6">

                <button onClick={() => navigate('/')} className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 font-bold text-sm uppercase tracking-wider transition-colors">
                    <ArrowLeft size={16} /> Back to Home
                </button>

                <div className="mb-12">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Search Results</h1>
                            <p className="text-xl text-gray-600 dark:text-gray-400">
                                Found {totalResults} results for <span className="font-bold text-gray-900 dark:text-white">"{query}"</span>
                            </p>
                        </div>
                        <div className="w-full md:w-96">
                            <SearchAutocomplete onSearch={handleSearch} placeholder="Search again..." />
                        </div>
                    </div>

                    {/* Filters & Sort */}
                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between pb-6 border-b border-gray-200 dark:border-gray-800">

                        {/* Category Chips */}
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setSelectedCategory('all')}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${selectedCategory === 'all'
                                    ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                    }`}
                            >
                                All
                            </button>
                            {categories.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${selectedCategory === cat.id
                                        ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                                        : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                        }`}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>

                        {/* Sort Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setIsSortOpen(!isSortOpen)}
                                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                                <span className="text-gray-400">Sort by:</span>
                                <span className="capitalize">{sortBy}</span>
                                <ChevronDown size={14} />
                            </button>

                            {isSortOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 z-10 overflow-hidden">
                                    {(['relevance', 'date', 'title'] as SortOption[]).map(option => (
                                        <button
                                            key={option}
                                            onClick={() => {
                                                setSortBy(option);
                                                setIsSortOpen(false);
                                            }}
                                            className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 capitalize transition-colors"
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {totalResults === 0 && (
                    <div className="py-20 text-center bg-white dark:bg-gray-900 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800">
                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                            <Search size={32} />
                        </div>
                        <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">No results found</h3>
                        <p className="text-gray-500 dark:text-gray-400">Try adjusting your keywords or browsing by category.</p>
                        <button
                            onClick={() => {
                                setSearchParams({ q: '' });
                                setSelectedCategory('all');
                            }}
                            className="mt-6 px-6 py-2 bg-teal-600 text-white rounded-lg font-bold hover:bg-teal-700 transition-colors"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}

                {/* Results Sections */}
                <div className="space-y-16">

                    {matchedTools.length > 0 && (
                        <section>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-lg"><PenTool size={20} /></div>
                                <h2 className="font-bold text-2xl text-gray-900 dark:text-white">Tools</h2>
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
                                <div className="p-2 bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-lg"><FileText size={20} /></div>
                                <h2 className="font-bold text-2xl text-gray-900 dark:text-white">Articles</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {matchedArticles.map(article => (
                                    <motion.div
                                        key={article.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer group border border-gray-100 dark:border-gray-800"
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
                                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg"><Video size={20} /></div>
                                <h2 className="font-bold text-2xl text-gray-900 dark:text-white">Videos</h2>
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
