import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../lib/api';
import { ArticleWithContent } from '../../services/articleService';
import { getArticleUrl } from '../../lib/articleUrl';
import { AnimatePresence, motion } from 'framer-motion';

interface SearchAutocompleteProps {
    className?: string;
    placeholder?: string;
    onSearch?: (query: string) => void;
}

const SearchAutocomplete: React.FC<SearchAutocompleteProps> = ({
    className = '',
    placeholder = 'Search articles, tools, videos...',
    onSearch
}) => {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [suggestions, setSuggestions] = useState<ArticleWithContent[]>([]);
    const [loading, setLoading] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const debounceTimerRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const fetchSuggestions = useCallback(async (searchQuery: string) => {
        if (searchQuery.length < 2) {
            setSuggestions([]);
            setIsOpen(false);
            return;
        }

        setLoading(true);
        try {
            // Use article search API for suggestions
            const response = await api.search.articles(searchQuery, 5);
            if (response.success && response.data) {
                setSuggestions(response.data as ArticleWithContent[]);
                setIsOpen(response.data.length > 0);
            } else {
                setSuggestions([]);
                setIsOpen(false);
            }
        } catch (error) {
            console.error('Failed to fetch search suggestions:', error);
            setSuggestions([]);
            setIsOpen(false);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value;
        setQuery(newQuery);

        // Debounce API calls
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }

        debounceTimerRef.current = setTimeout(() => {
            fetchSuggestions(newQuery);
        }, 300); // 300ms debounce
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            setIsOpen(false);
            if (onSearch) {
                onSearch(query);
            } else {
                navigate(`/search?q=${encodeURIComponent(query)}`);
            }
        }
    };

    const handleSuggestionClick = (article: ArticleWithContent) => {
        navigate(getArticleUrl(article));
        setIsOpen(false);
        setQuery('');
    };

    return (
        <div ref={wrapperRef} className={`relative ${className}`}>
            <form onSubmit={handleSearch} className="relative">
                <input
                    type="search"
                    value={query}
                    onChange={handleQueryChange}
                    placeholder={placeholder}
                    aria-label="Search articles, conditions, and resources"
                    className="w-full pl-10 pr-4 py-2.5 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all text-sm text-text-primary placeholder-gray-400 dark:placeholder-neutral-500"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-neutral-500" size={18} />
                {query && (
                    <button
                        type="button"
                        onClick={() => setQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-secondary"
                    >
                        <X size={16} />
                    </button>
                )}
            </form>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-surface rounded-xl shadow-xl border border-border overflow-hidden z-50"
                    >
                        <div className="p-2">
                            <div className="text-xs font-bold text-text-tertiary uppercase tracking-wider px-3 py-2">
                                {loading ? 'Searching...' : 'Suggested Articles'}
                            </div>
                            {loading ? (
                                <div className="px-3 py-4 text-center text-sm text-text-tertiary">
                                    <div className="animate-pulse">Loading suggestions...</div>
                                </div>
                            ) : suggestions.length > 0 ? (
                                suggestions.map((article) => (
                                    <button
                                        key={article.id}
                                        onClick={() => handleSuggestionClick(article)}
                                        className="w-full text-left px-3 py-2 hover:bg-surface-hover rounded-lg transition-colors flex items-center gap-3 group"
                                    >
                                        {article.image && (
                                            <div className="w-8 h-8 rounded-md overflow-hidden shrink-0 bg-surface-hover">
                                                <img src={article.image} alt="" loading="lazy" className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                        <div className="flex-grow min-w-0">
                                            <div className="text-sm font-medium text-text-primary group-hover:text-primary line-clamp-1">
                                                {article.title}
                                            </div>
                                            <div className="text-xs text-text-tertiary">
                                                {article.category?.name || 'Article'}
                                            </div>
                                        </div>
                                    </button>
                                ))
                            ) : (
                                <div className="px-3 py-4 text-center text-sm text-text-tertiary">
                                    No suggestions found
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SearchAutocomplete;
