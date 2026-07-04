import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, X, BookOpen, UserRound, Wrench, HeartPulse, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { searchService, type GroupedSuggestions } from '../../services/searchService';
import { getArticleUrl } from '../../lib/articleUrl';
import { getProviderUrl, getToolUrl, getConditionUrl, getCrisisUrl } from '../../lib/urls';
import { AnimatePresence, motion } from 'framer-motion';

interface SearchAutocompleteProps {
    className?: string;
    placeholder?: string;
    onSearch?: (query: string) => void;
}

const SearchAutocomplete: React.FC<SearchAutocompleteProps> = ({
    className = '',
    placeholder = 'Search articles, providers, tools, conditions, crisis...',
    onSearch,
}) => {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [groups, setGroups] = useState<GroupedSuggestions | null>(null);
    const [loading, setLoading] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    // Latest-request guard: discard a suggestion response that isn't the newest.
    const requestIdRef = useRef(0);

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
            setGroups(null);
            setIsOpen(false);
            return;
        }
        const requestId = ++requestIdRef.current;
        setLoading(true);
        try {
            const result = await searchService.getGroupedSuggestions(searchQuery, 3);
            if (requestId !== requestIdRef.current) return;
            setGroups(result);
            setIsOpen(result.total > 0);
        } catch (error) {
            if (requestId !== requestIdRef.current) return;
            console.error('Failed to fetch search suggestions:', error);
            setGroups(null);
            setIsOpen(false);
        } finally {
            if (requestId === requestIdRef.current) setLoading(false);
        }
    }, []);

    const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value;
        setQuery(newQuery);
        if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
        debounceTimerRef.current = setTimeout(() => {
            fetchSuggestions(newQuery);
        }, 300);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            setIsOpen(false);
            if (onSearch) onSearch(query);
            else navigate(`/search?q=${encodeURIComponent(query)}`);
        }
    };

    const handleNavigate = (url: string) => {
        navigate(url);
        setIsOpen(false);
        setQuery('');
    };

    const hasAnyResults = !!groups && groups.total > 0;

    return (
        <div ref={wrapperRef} className={`relative ${className}`}>
            <form onSubmit={handleSubmit} className="relative">
                <input
                    type="search"
                    value={query}
                    onChange={handleQueryChange}
                    placeholder={placeholder}
                    aria-label="Search articles, providers, tools, conditions, crisis resources"
                    className="w-full pl-10 pr-4 py-2.5 bg-surface border border-border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all text-base text-text-primary placeholder-gray-400 dark:placeholder-neutral-500"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-neutral-500" size={18} />
                {query && (
                    <button
                        type="button"
                        onClick={() => { setQuery(''); setGroups(null); setIsOpen(false); }}
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
                        className="absolute top-full left-0 right-0 mt-2 bg-surface rounded-xl shadow-xl border border-border overflow-hidden z-50 max-h-[70vh] overflow-y-auto"
                    >
                        {loading ? (
                            <div className="px-3 py-6 text-center text-sm text-text-tertiary">
                                <div className="animate-pulse">Loading suggestions...</div>
                            </div>
                        ) : hasAnyResults && groups ? (
                            <div className="py-2">
                                {groups.articles.length > 0 && (
                                    <SuggestionGroup label="Articles" icon={BookOpen}>
                                        {groups.articles.map((a) => (
                                            <SuggestionRow
                                                key={`a-${a.id}`}
                                                title={a.title}
                                                subtitle={a.category?.name || 'Article'}
                                                image={a.image}
                                                onClick={() => handleNavigate(getArticleUrl(a))}
                                            />
                                        ))}
                                    </SuggestionGroup>
                                )}
                                {groups.providers.length > 0 && (
                                    <SuggestionGroup label="Providers" icon={UserRound}>
                                        {groups.providers.map((p) => (
                                            <SuggestionRow
                                                key={`p-${p.id}`}
                                                title={p.display_name}
                                                subtitle={[p.provider_type_label, p.primary_city, p.primary_state]
                                                    .filter(Boolean)
                                                    .join(' · ')}
                                                image={p.photo_url ?? undefined}
                                                onClick={() => handleNavigate(getProviderUrl(p))}
                                            />
                                        ))}
                                    </SuggestionGroup>
                                )}
                                {groups.tools.length > 0 && (
                                    <SuggestionGroup label="Tools" icon={Wrench}>
                                        {groups.tools.map((t) => (
                                            <SuggestionRow
                                                key={`t-${t.id}`}
                                                title={t.name}
                                                subtitle={t.category}
                                                onClick={() => handleNavigate(getToolUrl(t))}
                                            />
                                        ))}
                                    </SuggestionGroup>
                                )}
                                {groups.conditions.length > 0 && (
                                    <SuggestionGroup label="Conditions" icon={HeartPulse}>
                                        {groups.conditions.map((c) => (
                                            <SuggestionRow
                                                key={`c-${c.id}`}
                                                title={c.name}
                                                subtitle={c.full_name !== c.name ? c.full_name : c.category}
                                                onClick={() => handleNavigate(getConditionUrl(c))}
                                            />
                                        ))}
                                    </SuggestionGroup>
                                )}
                                {groups.crisis.length > 0 && (
                                    <SuggestionGroup label="Crisis Resources" icon={Phone}>
                                        {groups.crisis.map((hit, idx) => (
                                            <SuggestionRow
                                                key={`x-${hit.country.iso2}-${idx}`}
                                                title={hit.resource.name}
                                                subtitle={`${hit.country.country_name} · ${hit.resource.phone || hit.resource.web_url || hit.resource.hours}`}
                                                onClick={() => handleNavigate(getCrisisUrl(hit.country))}
                                            />
                                        ))}
                                    </SuggestionGroup>
                                )}
                            </div>
                        ) : (
                            <div className="px-3 py-4 text-center text-sm text-text-tertiary">
                                No suggestions found
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const SuggestionGroup: React.FC<{
    label: string;
    icon: React.ElementType;
    children: React.ReactNode;
}> = ({ label, icon: Icon, children }) => (
    <div className="px-2 py-1">
        <div className="flex items-center gap-2 text-xs font-bold text-text-tertiary uppercase tracking-wider px-3 py-2">
            <Icon size={12} />
            <span>{label}</span>
        </div>
        {children}
    </div>
);

const SuggestionRow: React.FC<{
    title: string;
    subtitle?: string;
    image?: string;
    onClick: () => void;
}> = ({ title, subtitle, image, onClick }) => (
    <button
        onClick={onClick}
        className="w-full text-left px-3 py-2 hover:bg-surface-hover rounded-lg transition-colors flex items-center gap-3 group"
    >
        {image ? (
            <div className="w-8 h-8 rounded-md overflow-hidden shrink-0 bg-surface-hover">
                <img src={image} alt="" loading="lazy" className="w-full h-full object-cover" />
            </div>
        ) : (
            <div className="w-8 h-8 rounded-md shrink-0 bg-surface-hover" />
        )}
        <div className="flex-grow min-w-0">
            <div className="text-sm font-medium text-text-primary group-hover:text-primary line-clamp-1">
                {title}
            </div>
            {subtitle && (
                <div className="text-xs text-text-tertiary line-clamp-1">{subtitle}</div>
            )}
        </div>
    </button>
);

export default SearchAutocomplete;
