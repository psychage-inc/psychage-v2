import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, PenTool, FileText, Video, ChevronDown, Loader2, AlertCircle } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { api } from '../../lib/api';
import { ArticleWithContent } from '../../services/articleService';
import { videoService } from '../../services/videoService';
import { toolService } from '../../services/toolService';
import { categoryService } from '../../services/categoryService';
import { Category, Video as VideoType, Tool as ToolType } from '../../types/models';
import SEO from '../SEO';
import ArticleCard from '../article/ArticleCard';
import VideoCard from '../video/VideoCard';
import ToolCard from '../tool/ToolCard';
import SearchAutocomplete from '../search/SearchAutocomplete';
import { getArticleUrl } from '../../lib/articleUrl';

type SortOption = 'relevance' | 'date' | 'title';

const SearchResults: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const navigate = useNavigate();

    // State
    const [matchedArticles, setMatchedArticles] = useState<ArticleWithContent[]>([]);
    const [matchedVideos, setMatchedVideos] = useState<VideoType[]>([]);
    const [matchedTools, setMatchedTools] = useState<ToolType[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [sortBy, setSortBy] = useState<SortOption>('relevance');
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Load categories on mount
    useEffect(() => {
        const loadCategories = async () => {
            try {
                const cats = await categoryService.getAll();
                setCategories(cats);
            } catch (err) {
                console.error('Failed to load categories:', err);
            }
        };
        loadCategories();
    }, []);

    // Search function
    const performSearch = async () => {
        if (!query.trim()) {
            setMatchedArticles([]);
            setMatchedVideos([]);
            setMatchedTools([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Try unified search API first
            const response = await api.search.all({
                query: query.trim(),
                limit: 50
            });

            if (response.success && response.data) {
                const data = response.data as { articles?: unknown[]; videos?: unknown[]; tools?: unknown[]; providers?: unknown[]; total?: number };
                setMatchedArticles((data.articles || []) as ArticleWithContent[]);
                setMatchedVideos((data.videos || []) as VideoType[]);
                setMatchedTools((data.tools || []) as ToolType[]);
            } else {
                throw new Error('Search API returned no data');
            }
        } catch (err) {
            console.warn('Unified search failed, falling back to individual searches:', err);

            // Fallback: search each service individually
            try {
                const [articles, videos, tools] = await Promise.all([
                    api.search.articles(query.trim(), 20).then(r => r.success ? r.data : []).catch(() => []),
                    videoService.getAll().then(all => all.filter(v =>
                        v.title.toLowerCase().includes(query.toLowerCase())
                    )).catch(() => []),
                    toolService.getAll().then(all => all.filter(t =>
                        t.name.toLowerCase().includes(query.toLowerCase()) ||
                        t.description.toLowerCase().includes(query.toLowerCase())
                    )).catch(() => [])
                ]);

                setMatchedArticles((articles || []) as ArticleWithContent[]);
                setMatchedVideos(videos || []);
                setMatchedTools(tools || []);
            } catch (fallbackErr) {
                console.error('All search methods failed:', fallbackErr);
                setError('Unable to complete search. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        performSearch();
    }, [query]);

    // Apply client-side filtering and sorting
    const filteredArticles = React.useMemo(() => {
        let filtered = [...matchedArticles];

        // Category filter
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(a => a.category.id === selectedCategory || a.category.slug === selectedCategory);
        }

        // Sort
        if (sortBy === 'date') {
            filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
        } else if (sortBy === 'title') {
            filtered.sort((a, b) => a.title.localeCompare(b.title));
        }

        return filtered;
    }, [matchedArticles, selectedCategory, sortBy]);

    const filteredVideos = React.useMemo(() => {
        let filtered = [...matchedVideos];

        // Category filter - videos category is a string
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(v => v.category.toLowerCase() === selectedCategory.toLowerCase());
        }

        // Sort
        if (sortBy === 'title') {
            filtered.sort((a, b) => a.title.localeCompare(b.title));
        }

        return filtered;
    }, [matchedVideos, selectedCategory, sortBy]);

    const filteredTools = React.useMemo(() => {
        let filtered = [...matchedTools];

        // Category filter - tools category is a string
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(t => t.category.toLowerCase() === selectedCategory.toLowerCase());
        }

        // Sort
        if (sortBy === 'title') {
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        }

        return filtered;
    }, [matchedTools, selectedCategory, sortBy]);

    const totalResults = filteredArticles.length + filteredVideos.length + filteredTools.length;

    const handleSearch = (newQuery: string) => {
        setSearchParams({ q: newQuery });
    };

    return (
        <div className="min-h-screen bg-background pt-24 pb-20 transition-colors duration-300">
            <SEO
                title={`Search Results for "${query}" | Psychage`}
                description={`Search results for ${query} on Psychage.`}
            />
            <div className="container mx-auto max-w-6xl px-6">

                <button onClick={() => navigate('/')} className="flex items-center gap-2 text-text-secondary hover:text-text-primary mb-8 font-bold text-sm uppercase tracking-wider transition-colors">
                    <ArrowLeft size={16} /> Back to Home
                </button>

                <div className="mb-12">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                        <div>
                            <h1 className="text-4xl font-bold text-text-primary mb-2">Search Results</h1>
                            <p className="text-xl text-text-secondary">
                                Found {totalResults} results for <span className="font-bold text-text-primary">"{query}"</span>
                            </p>
                        </div>
                        <div className="w-full md:w-96">
                            <SearchAutocomplete onSearch={handleSearch} placeholder="Search again..." />
                        </div>
                    </div>

                    {/* Filters & Sort */}
                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between pb-6 border-b border-border">

                        {/* Category Chips */}
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setSelectedCategory('all')}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${selectedCategory === 'all'
                                    ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                                    : 'bg-surface text-text-secondary border border-border hover:border-gray-300 dark:hover:border-gray-600'
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
                                        : 'bg-surface text-text-secondary border border-border hover:border-gray-300 dark:hover:border-gray-600'
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
                                className="flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-lg text-sm font-medium text-text-secondary hover:bg-surface-hover transition-colors"
                            >
                                <span className="text-text-tertiary">Sort by:</span>
                                <span className="capitalize">{sortBy}</span>
                                <ChevronDown size={14} />
                            </button>

                            {isSortOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-surface rounded-xl shadow-xl border border-border z-10 overflow-hidden">
                                    {(['relevance', 'date', 'title'] as SortOption[]).map(option => (
                                        <button
                                            key={option}
                                            onClick={() => {
                                                setSortBy(option);
                                                setIsSortOpen(false);
                                            }}
                                            className="w-full text-left px-4 py-2.5 text-sm hover:bg-surface-hover text-text-secondary capitalize transition-colors"
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="py-20 text-center">
                        <Loader2 className="w-12 h-12 text-teal-600 mx-auto mb-4 animate-spin" />
                        <p className="text-text-secondary">Searching...</p>
                    </div>
                )}

                {/* Error State */}
                {!loading && error && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6 flex items-start gap-4">
                        <AlertCircle size={24} className="text-red-500 shrink-0 mt-0.5" />
                        <div className="flex-grow">
                            <h3 className="font-bold text-red-700 dark:text-red-400 mb-1">Search failed</h3>
                            <p className="text-sm text-red-600 dark:text-red-300 mb-4">{error}</p>
                            <button
                                onClick={performSearch}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-700 dark:text-red-400 rounded-lg font-medium transition-colors"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && totalResults === 0 && query && (
                    <div className="py-20 text-center bg-surface rounded-3xl border border-dashed border-border">
                        <div className="w-16 h-16 bg-surface-hover rounded-full flex items-center justify-center mx-auto mb-6 text-text-tertiary">
                            <Search size={32} />
                        </div>
                        <h3 className="font-bold text-xl text-text-primary mb-2">No results found</h3>
                        <p className="text-text-secondary">Try adjusting your keywords or browsing by category.</p>
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
                {!loading && !error && (
                    <div className="space-y-16">

                        {filteredTools.length > 0 && (
                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-lg"><PenTool size={20} /></div>
                                    <h2 className="font-bold text-2xl text-text-primary">Tools ({filteredTools.length})</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredTools.map((tool, idx) => (
                                        <motion.div
                                            key={tool.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                        >
                                            <ToolCard tool={tool} />
                                        </motion.div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {filteredArticles.length > 0 && (
                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-lg"><FileText size={20} /></div>
                                    <h2 className="font-bold text-2xl text-text-primary">Articles ({filteredArticles.length})</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredArticles.map((article, idx) => (
                                        <motion.div
                                            key={article.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                            className="bg-surface p-6 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer group border border-border"
                                            onClick={() => navigate(getArticleUrl(article))}
                                        >
                                            <ArticleCard article={article} />
                                        </motion.div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {filteredVideos.length > 0 && (
                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg"><Video size={20} /></div>
                                    <h2 className="font-bold text-2xl text-text-primary">Videos ({filteredVideos.length})</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {filteredVideos.map((video, idx) => (
                                        <motion.div
                                            key={video.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                            onClick={() => navigate(`/watch/${video.id}`)}
                                            className="cursor-pointer"
                                        >
                                            <VideoCard video={video} />
                                        </motion.div>
                                    ))}
                                </div>
                            </section>
                        )}

                    </div>
                )}

            </div>
        </div>
    );
};

export default SearchResults;
