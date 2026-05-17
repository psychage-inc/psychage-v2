import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, PenTool, FileText, Video, ChevronDown, Loader2, AlertCircle, Compass, Users } from 'lucide-react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { searchService, SearchResult } from '../../services/searchService';
import { Category } from '../../types/models';
import { categoryService } from '../../services/categoryService';
import SEO from '../SEO';
import ArticleCard from '../article/ArticleCard';
import VideoCard from '../video/VideoCard';
import ToolCard from '../tool/ToolCard';
import { ProviderCard } from '../providers/cards/ProviderCard';
import SearchAutocomplete from '../search/SearchAutocomplete';
import { getArticleUrl } from '../../lib/articleUrl';

type SortOption = 'relevance' | 'date' | 'title';

const SearchResults: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const navigate = useNavigate();

    const [results, setResults] = useState<SearchResult | null>(null);
    const [chipCategories, setChipCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [sortBy, setSortBy] = useState<SortOption>('relevance');
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Category chips (used to filter articles only)
    useEffect(() => {
        categoryService.getAll().then(setChipCategories).catch(() => setChipCategories([]));
    }, []);

    const performSearch = useCallback(async () => {
        if (!query.trim()) {
            setResults(null);
            setLoading(false);
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const r = await searchService.search(query.trim(), { type: 'all' });
            setResults(r);
            searchService.saveLocalSearch(query.trim());
            searchService.saveSearchHistory(query.trim());
        } catch (err) {
            console.error('Search failed:', err);
            setError('Unable to complete search. Please try again.');
            setResults(null);
        } finally {
            setLoading(false);
        }
    }, [query]);

    useEffect(() => {
        window.scrollTo(0, 0);
        performSearch();
    }, [performSearch]);

    // Filter articles by selected category chip (slug-based to avoid id/slug mismatch
    // between Supabase rows, mock data, and the chip source).
    const filteredArticles = React.useMemo(() => {
        const articles = results?.articles ?? [];
        let filtered = articles;
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(a =>
                a.category?.slug === selectedCategory || a.category?.id === selectedCategory
            );
        }
        if (sortBy === 'date') {
            filtered = [...filtered].sort((a, b) =>
                new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime()
            );
        } else if (sortBy === 'title') {
            filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
        }
        // 'relevance' preserves searchService order.
        return filtered;
    }, [results, selectedCategory, sortBy]);

    // Tools/videos/providers/categories are not filtered by the category chip —
    // their `category` field is a freeform string with a different taxonomy.
    const sortedTools = React.useMemo(() => {
        const tools = results?.tools ?? [];
        if (sortBy === 'title') return [...tools].sort((a, b) => a.name.localeCompare(b.name));
        return tools;
    }, [results, sortBy]);

    const sortedVideos = React.useMemo(() => {
        const videos = results?.videos ?? [];
        if (sortBy === 'title') return [...videos].sort((a, b) => a.title.localeCompare(b.title));
        return videos;
    }, [results, sortBy]);

    const totalResults =
        filteredArticles.length +
        sortedTools.length +
        sortedVideos.length +
        (results?.categories.length ?? 0) +
        (results?.providers.length ?? 0);

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

                        {/* Category Chips (filter Articles section only) */}
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setSelectedCategory('all')}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${selectedCategory === 'all'
                                    ? 'bg-text-primary text-background'
                                    : 'bg-surface text-text-secondary border border-border hover:border-border'
                                    }`}
                            >
                                All
                            </button>
                            {chipCategories.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.slug || cat.id)}
                                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${selectedCategory === (cat.slug || cat.id)
                                        ? 'bg-text-primary text-background'
                                        : 'bg-surface text-text-secondary border border-border hover:border-border'
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
                        <Loader2 className="w-12 h-12 text-primary mx-auto mb-4 animate-spin" />
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
                            className="mt-6 px-6 py-2 bg-primary text-white rounded-lg font-bold hover:bg-primary-hover transition-colors"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}

                {/* Results Sections */}
                {!loading && !error && results && (
                    <div className="space-y-16">

                        {/* Categories (topic landing pages) */}
                        {results.categories.length > 0 && (
                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-lg"><Compass size={20} /></div>
                                    <h2 className="font-bold text-2xl text-text-primary">Topics ({results.categories.length})</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {results.categories.map((cat, idx) => (
                                        <motion.div
                                            key={cat.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.04 }}
                                        >
                                            <Link
                                                to={`/category/${cat.slug}`}
                                                className="block bg-surface p-5 rounded-xl border border-border hover:border-primary/40 transition-colors group"
                                            >
                                                <h3 className="font-bold text-text-primary group-hover:text-primary transition-colors mb-1">
                                                    {cat.name}
                                                </h3>
                                                <p className="text-sm text-text-secondary line-clamp-2">{cat.description}</p>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {sortedTools.length > 0 && (
                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-lg"><PenTool size={20} /></div>
                                    <h2 className="font-bold text-2xl text-text-primary">Tools ({sortedTools.length})</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {sortedTools.map((tool, idx) => (
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

                        {results.providers.length > 0 && (
                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg"><Users size={20} /></div>
                                    <h2 className="font-bold text-2xl text-text-primary">Providers ({results.providers.length})</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {results.providers.map((provider, idx) => (
                                        <motion.div
                                            key={provider.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                        >
                                            <ProviderCard provider={provider} />
                                        </motion.div>
                                    ))}
                                </div>
                                <div className="mt-6 text-center">
                                    <Link
                                        to={`/providers/search?q=${encodeURIComponent(query)}`}
                                        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-hover"
                                    >
                                        See all providers matching "{query}" →
                                    </Link>
                                </div>
                            </section>
                        )}

                        {sortedVideos.length > 0 && (
                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg"><Video size={20} /></div>
                                    <h2 className="font-bold text-2xl text-text-primary">Videos ({sortedVideos.length})</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {sortedVideos.map((video, idx) => (
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
