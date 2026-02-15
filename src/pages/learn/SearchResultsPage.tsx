import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, Filter, Calendar, Users, FileText, Wrench, X } from 'lucide-react';
import { searchService, SearchResult, SearchFilters } from '@/services/searchService';
import { Article } from '@/types/models';
import ArticleCard from '@/components/article/ArticleCard';
import { Display, Text } from '@/components/ui/Typography';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import SEO from '@/components/SEO';
import { motion, AnimatePresence } from 'framer-motion';

type SearchType = 'all' | 'articles' | 'providers' | 'tools';

const SearchResultsPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const typeParam = searchParams.get('type') as SearchType || 'all';
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState(query);
    const [results, setResults] = useState<SearchResult | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState<SearchType>(typeParam);
    const [showFilters, setShowFilters] = useState(false);

    const performSearch = useCallback(async (q: string, filters?: SearchFilters) => {
        if (!q) {
            setResults(null);
            return;
        }
        setIsLoading(true);
        try {
            const searchResults = await searchService.search(q, filters);
            setResults(searchResults);

            // Save to local search history
            searchService.saveLocalSearch(q);
        } catch (error) {
            console.error("Search failed:", error);
            setResults({ articles: [], providers: [], tools: [], total: 0 });
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        setSearchTerm(query);
        if (query) {
            performSearch(query, { type: activeTab === 'all' ? undefined : activeTab });
        }
    }, [query, activeTab, performSearch]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            setSearchParams({ q: searchTerm, type: activeTab });
        }
    };

    const handleTabChange = (tab: SearchType) => {
        setActiveTab(tab);
        if (query) {
            setSearchParams({ q: query, type: tab });
        }
    };

    const handleClear = () => {
        setSearchTerm('');
        setSearchParams({});
        setResults(null);
    };

    const totalResults = results?.total || 0;
    const articleCount = results?.articles.length || 0;
    const providerCount = results?.providers.length || 0;
    const toolCount = results?.tools.length || 0;

    const tabs = [
        { id: 'all' as const, label: 'All', count: totalResults, icon: Search },
        { id: 'articles' as const, label: 'Articles', count: articleCount, icon: FileText },
        { id: 'providers' as const, label: 'Providers', count: providerCount, icon: Users },
        { id: 'tools' as const, label: 'Tools', count: toolCount, icon: Wrench },
    ];

    return (
        <div className="min-h-screen bg-background pt-24 pb-20 px-6">
            <SEO title={query ? `Search Results for "${query}" | Psychage` : 'Search | Psychage'} />

            <div className="container mx-auto max-w-6xl">
                {/* Search Header */}
                <div className="max-w-3xl mx-auto mb-8">
                    <form onSubmit={handleSearch} className="relative mb-6">
                        <Input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search articles, providers, and tools..."
                            className="h-14 pl-12 pr-24 text-lg rounded-2xl shadow-sm"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary" size={24} />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
                            {searchTerm && (
                                <button
                                    type="button"
                                    onClick={handleClear}
                                    className="p-2 text-text-tertiary hover:text-text-primary rounded-lg hover:bg-surface-hover transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            )}
                            <Button type="submit" size="sm">
                                Search
                            </Button>
                        </div>
                    </form>

                    {/* Result Tabs */}
                    {query && (
                        <div className="flex items-center gap-2 overflow-x-auto pb-2">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => handleTabChange(tab.id)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                                        activeTab === tab.id
                                            ? 'bg-primary text-white'
                                            : 'bg-surface-hover text-text-secondary hover:bg-surface hover:text-text-primary'
                                    }`}
                                >
                                    <tab.icon size={16} />
                                    {tab.label}
                                    {!isLoading && (
                                        <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                                            activeTab === tab.id ? 'bg-white/20' : 'bg-surface-subtle'
                                        }`}>
                                            {tab.count}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Result Info */}
                    {query && (
                        <div className="flex items-center justify-between text-sm text-text-secondary mt-4">
                            <span>
                                {isLoading
                                    ? 'Searching...'
                                    : `${totalResults} result${totalResults !== 1 ? 's' : ''} for "${query}"`}
                            </span>
                            <Button
                                variant="ghost"
                                size="sm"
                                leftIcon={<Filter size={14} />}
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                Filters
                            </Button>
                        </div>
                    )}
                </div>

                {/* Filter Panel */}
                <AnimatePresence>
                    {showFilters && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="max-w-3xl mx-auto mb-8 overflow-hidden"
                        >
                            <div className="bg-surface rounded-2xl p-6 border border-border">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-text-secondary mb-2 block">
                                            Date Range
                                        </label>
                                        <select className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm">
                                            <option value="all">All time</option>
                                            <option value="week">Past week</option>
                                            <option value="month">Past month</option>
                                            <option value="year">Past year</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-text-secondary mb-2 block">
                                            Sort By
                                        </label>
                                        <select className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm">
                                            <option value="relevance">Relevance</option>
                                            <option value="date">Date</option>
                                            <option value="popularity">Popularity</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Results */}
                <AnimatePresence mode="wait">
                    {isLoading ? (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="bg-surface rounded-2xl p-6 animate-pulse">
                                    <div className="h-40 bg-surface-hover rounded-xl mb-4" />
                                    <div className="h-4 bg-surface-hover rounded w-3/4 mb-2" />
                                    <div className="h-3 bg-surface-hover rounded w-1/2" />
                                </div>
                            ))}
                        </motion.div>
                    ) : results && totalResults > 0 ? (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            {/* Articles Section */}
                            {(activeTab === 'all' || activeTab === 'articles') && results.articles.length > 0 && (
                                <section className="mb-12">
                                    {activeTab === 'all' && (
                                        <div className="flex items-center justify-between mb-6">
                                            <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                                                <FileText size={20} className="text-primary" />
                                                Articles ({articleCount})
                                            </h2>
                                            {articleCount > 6 && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleTabChange('articles')}
                                                >
                                                    View all
                                                </Button>
                                            )}
                                        </div>
                                    )}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {(activeTab === 'all' ? results.articles.slice(0, 6) : results.articles).map((article) => (
                                            <ArticleCard
                                                key={article.id}
                                                article={article as Article}
                                                onClick={() => navigate(`/learn/article/${article.slug || article.id}`)}
                                            />
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Providers Section */}
                            {(activeTab === 'all' || activeTab === 'providers') && results.providers.length > 0 && (
                                <section className="mb-12">
                                    {activeTab === 'all' && (
                                        <div className="flex items-center justify-between mb-6">
                                            <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                                                <Users size={20} className="text-primary" />
                                                Providers ({providerCount})
                                            </h2>
                                            {providerCount > 4 && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleTabChange('providers')}
                                                >
                                                    View all
                                                </Button>
                                            )}
                                        </div>
                                    )}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {(activeTab === 'all' ? results.providers.slice(0, 4) : results.providers).map((provider) => (
                                            <div
                                                key={provider.id}
                                                onClick={() => navigate(`/connect/provider/${provider.id}`)}
                                                className="bg-surface rounded-2xl p-6 border border-border hover:border-primary/50 cursor-pointer transition-all group"
                                            >
                                                <div className="flex items-start gap-4">
                                                    {provider.image ? (
                                                        <img
                                                            src={provider.image}
                                                            alt={provider.name}
                                                            className="w-16 h-16 rounded-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                                                            <Users size={24} className="text-primary" />
                                                        </div>
                                                    )}
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="font-bold text-text-primary group-hover:text-primary transition-colors">
                                                            {provider.name}
                                                        </h3>
                                                        {provider.role && (
                                                            <p className="text-sm text-text-secondary">{provider.role}</p>
                                                        )}
                                                        {provider.specialties && provider.specialties.length > 0 && (
                                                            <div className="flex flex-wrap gap-1 mt-2">
                                                                {provider.specialties.slice(0, 3).map((spec, i) => (
                                                                    <span
                                                                        key={i}
                                                                        className="px-2 py-0.5 bg-surface-hover rounded-full text-xs text-text-secondary"
                                                                    >
                                                                        {spec}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Tools Section */}
                            {(activeTab === 'all' || activeTab === 'tools') && results.tools.length > 0 && (
                                <section className="mb-12">
                                    {activeTab === 'all' && (
                                        <div className="flex items-center justify-between mb-6">
                                            <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                                                <Wrench size={20} className="text-primary" />
                                                Tools ({toolCount})
                                            </h2>
                                        </div>
                                    )}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {results.tools.map((tool) => (
                                            <div
                                                key={tool.id}
                                                onClick={() => navigate(tool.href || `/tools/${tool.id}`)}
                                                className="bg-surface rounded-2xl p-6 border border-border hover:border-primary/50 cursor-pointer transition-all group"
                                            >
                                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                                                    <Wrench size={24} className="text-primary" />
                                                </div>
                                                <h3 className="font-bold text-text-primary group-hover:text-primary transition-colors mb-2">
                                                    {tool.name}
                                                </h3>
                                                <p className="text-sm text-text-secondary line-clamp-2">
                                                    {tool.description}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </motion.div>
                    ) : query ? (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center py-20 bg-surface rounded-3xl border border-dashed border-border max-w-3xl mx-auto"
                        >
                            <div className="w-16 h-16 bg-surface-subtle rounded-full flex items-center justify-center mx-auto mb-4 text-text-tertiary">
                                <Search size={32} />
                            </div>
                            <Display className="text-2xl mb-2">No results found</Display>
                            <Text className="mb-6">
                                We couldn't find anything matching "{query}". Try different keywords or browse by category.
                            </Text>
                            <div className="flex justify-center gap-4">
                                <Button onClick={() => navigate('/learn')} variant="outline">
                                    Browse Topics
                                </Button>
                                <Button onClick={() => navigate('/connect')} variant="outline">
                                    Find Providers
                                </Button>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="initial"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center py-20"
                        >
                            <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center mx-auto mb-6 text-text-tertiary">
                                <Search size={40} />
                            </div>
                            <Display className="text-2xl mb-2">Start your search</Display>
                            <Text className="max-w-md mx-auto">
                                Search for articles, mental health providers, and wellness tools to support your journey.
                            </Text>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default SearchResultsPage;
