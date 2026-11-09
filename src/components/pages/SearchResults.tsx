import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import {
    ArrowLeft, Search, FileText, Loader2, AlertCircle, Compass, Users, Wrench,
    HeartPulse, Phone, LayoutGrid,
} from 'lucide-react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { searchService, type GroupedSearchResults, type SearchEntityType } from '../../services/searchService';
import { categoryService } from '../../services/categoryService';
import type { Category } from '../../types/models';
import SEO from '../SEO';
import ArticleCard from '../article/ArticleCard';
import ToolCard from '../tool/ToolCard';
import { ProviderCard } from '../providers/cards/ProviderCard';
import SearchAutocomplete from '../search/SearchAutocomplete';
import { getArticleUrl } from '../../lib/articleUrl';
import { getConditionUrl, getToolUrl, getCrisisUrl } from '../../lib/urls';
import { COUNTRY_DATABASE } from '@/lib/crisis';

type Tab = 'all' | SearchEntityType;

const TAB_DEFS: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: 'all', label: 'All', icon: LayoutGrid },
    { id: 'articles', label: 'Articles', icon: FileText },
    { id: 'providers', label: 'Providers', icon: Users },
    { id: 'tools', label: 'Tools', icon: Wrench },
    { id: 'conditions', label: 'Conditions', icon: HeartPulse },
    { id: 'crisis', label: 'Crisis', icon: Phone },
];

const SearchResults: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const query = searchParams.get('q') ?? '';
    const tab = (searchParams.get('type') ?? 'all') as Tab;
    const articleCategory = searchParams.get('category') ?? '';
    const crisisCountry = searchParams.get('country') ?? '';

    const [results, setResults] = useState<GroupedSearchResults | null>(null);
    const [articleCategories, setArticleCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        categoryService.getAll().then(setArticleCategories).catch(() => setArticleCategories([]));
    }, []);

    const updateParam = useCallback(
        (key: string, value: string | undefined) => {
            const next = new URLSearchParams(searchParams);
            if (value) next.set(key, value);
            else next.delete(key);
            setSearchParams(next, { replace: true });
        },
        [searchParams, setSearchParams],
    );

    // Latest-request guard: a slow response for an earlier query/filter must not
    // overwrite the results for a newer one.
    const requestIdRef = useRef(0);
    const performSearch = useCallback(async () => {
        if (!query.trim()) {
            setResults(null);
            setLoading(false);
            return;
        }
        const requestId = ++requestIdRef.current;
        setLoading(true);
        setError(null);
        try {
            const r = await searchService.search(query.trim(), {
                filters: {
                    articles: articleCategory ? { categorySlug: articleCategory } : undefined,
                    crisis: crisisCountry ? { country: crisisCountry } : undefined,
                },
                perTypeLimit: 30,
            });
            if (requestId !== requestIdRef.current) return;
            setResults(r);
            searchService.saveLocalSearch(query.trim());
            searchService.saveSearchHistory(query.trim());
        } catch (err) {
            if (requestId !== requestIdRef.current) return;
            console.error('Search failed:', err);
            setError('Unable to complete search. Please try again.');
            setResults(null);
        } finally {
            if (requestId === requestIdRef.current) setLoading(false);
        }
    }, [query, articleCategory, crisisCountry]);

    useEffect(() => {
        window.scrollTo(0, 0);
        performSearch();
    }, [performSearch]);

    const counts = useMemo<Record<Tab, number>>(() => {
        if (!results) {
            return { all: 0, articles: 0, providers: 0, tools: 0, conditions: 0, crisis: 0, categories: 0 };
        }
        const articles = results.articles.totalAvailable;
        const providers = results.providers.totalAvailable;
        const tools = results.tools.totalAvailable;
        const conditions = results.conditions.totalAvailable;
        const crisis = results.crisis.totalAvailable;
        return {
            all: articles + providers + tools + conditions + crisis,
            articles,
            providers,
            tools,
            conditions,
            crisis,
            categories: results.categories.totalAvailable,
        };
    }, [results]);

    const handleSubmitNewQuery = (q: string) => {
        const next = new URLSearchParams(searchParams);
        next.set('q', q);
        setSearchParams(next, { replace: true });
    };

    const showSection = (id: SearchEntityType) => tab === 'all' || tab === id;

    return (
        <div className="min-h-screen bg-background pt-24 pb-20 transition-colors duration-300">
            <SEO
                title={`Search Results for "${query}" | Psychage`}
                description={`Search results for ${query} on Psychage.`}
            />
            <div className="container mx-auto max-w-6xl px-6">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-text-secondary hover:text-text-primary mb-8 font-bold text-sm uppercase tracking-wider transition-colors"
                >
                    <ArrowLeft size={16} /> Back to Home
                </button>

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-text-primary mb-2">Search Results</h1>
                        <p className="text-xl text-text-secondary">
                            {query ? (
                                <>
                                    Found {counts.all} results for{' '}
                                    <span className="font-bold text-text-primary">"{query}"</span>
                                </>
                            ) : (
                                'Enter a query to begin.'
                            )}
                        </p>
                    </div>
                    <div className="w-full md:w-96">
                        <SearchAutocomplete onSearch={handleSubmitNewQuery} placeholder="Search again..." />
                    </div>
                </div>

                {/* Tabs */}
                <div className="border-b border-border mb-8 overflow-x-auto">
                    <nav className="flex gap-2 min-w-max" aria-label="Search result tabs">
                        {TAB_DEFS.map(({ id, label, icon: Icon }) => {
                            const active = tab === id;
                            const count = counts[id];
                            return (
                                <button
                                    key={id}
                                    onClick={() => updateParam('type', id === 'all' ? undefined : id)}
                                    className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 -mb-px transition-colors ${
                                        active
                                            ? 'border-primary text-primary'
                                            : 'border-transparent text-text-secondary hover:text-text-primary'
                                    }`}
                                >
                                    <Icon size={16} />
                                    <span>{label}</span>
                                    {count > 0 && (
                                        <span
                                            className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                                                active ? 'bg-primary/10 text-primary' : 'bg-surface-hover text-text-tertiary'
                                            }`}
                                        >
                                            {count}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </nav>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar — tab-aware filters */}
                    {(tab === 'articles' || tab === 'crisis') && (
                        <aside className="lg:w-64 flex-shrink-0">
                            {tab === 'articles' && (
                                <FilterPanel title="Category">
                                    <FilterChip
                                        active={!articleCategory}
                                        onClick={() => updateParam('category', undefined)}
                                        label="All categories"
                                    />
                                    {articleCategories.map((c) => (
                                        <FilterChip
                                            key={c.id}
                                            active={articleCategory === c.slug}
                                            onClick={() => updateParam('category', c.slug)}
                                            label={c.name}
                                        />
                                    ))}
                                </FilterPanel>
                            )}
                            {tab === 'crisis' && (
                                <FilterPanel title="Country">
                                    <FilterChip
                                        active={!crisisCountry}
                                        onClick={() => updateParam('country', undefined)}
                                        label="Auto-detect"
                                    />
                                    {Object.values(COUNTRY_DATABASE)
                                        .filter((c) => c.resources.length > 0)
                                        .sort((a, b) => a.country_name.localeCompare(b.country_name))
                                        .slice(0, 25)
                                        .map((c) => (
                                            <FilterChip
                                                key={c.iso2}
                                                active={crisisCountry === c.iso2}
                                                onClick={() => updateParam('country', c.iso2)}
                                                label={`${c.country_name} (${c.iso2})`}
                                            />
                                        ))}
                                </FilterPanel>
                            )}
                        </aside>
                    )}

                    <div className="flex-1 min-w-0">
                        {/* Loading / Error / Empty */}
                        {loading && (
                            <div className="py-20 text-center">
                                <Loader2 className="w-12 h-12 text-primary mx-auto mb-4 animate-spin" />
                                <p className="text-text-secondary">Searching...</p>
                            </div>
                        )}

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

                        {!loading && !error && counts.all === 0 && query && (
                            <div className="py-20 text-center bg-surface rounded-3xl border border-dashed border-border">
                                <div className="w-16 h-16 bg-surface-hover rounded-full flex items-center justify-center mx-auto mb-6 text-text-tertiary">
                                    <Search size={32} />
                                </div>
                                <h3 className="font-bold text-xl text-text-primary mb-2">No results found</h3>
                                <p className="text-text-secondary">
                                    Try a broader query or browse the topic list below.
                                </p>
                            </div>
                        )}

                        {!loading && !error && results && counts.all > 0 && (
                            <div className="space-y-16">
                                {showSection('articles') && results.articles.items.length > 0 && (
                                    <ResultSection icon={FileText} title="Articles" count={results.articles.totalAvailable}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {results.articles.items.map((article, idx) => (
                                                <motion.div
                                                    key={article.id}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: idx * 0.04 }}
                                                    className="bg-surface p-6 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer group border border-border"
                                                    onClick={() => navigate(getArticleUrl(article))}
                                                >
                                                    <ArticleCard article={article} />
                                                </motion.div>
                                            ))}
                                        </div>
                                    </ResultSection>
                                )}

                                {showSection('providers') && results.providers.items.length > 0 && (
                                    <ResultSection icon={Users} title="Providers" count={results.providers.totalAvailable}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {results.providers.items.map((provider, idx) => (
                                                <motion.div
                                                    key={provider.id}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: idx * 0.04 }}
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
                                    </ResultSection>
                                )}

                                {showSection('tools') && results.tools.items.length > 0 && (
                                    <ResultSection icon={Wrench} title="Tools" count={results.tools.totalAvailable}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {results.tools.items.map((tool, idx) => (
                                                <motion.div
                                                    key={tool.id}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: idx * 0.04 }}
                                                >
                                                    <Link to={getToolUrl(tool)}>
                                                        <ToolCard tool={tool} />
                                                    </Link>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </ResultSection>
                                )}

                                {showSection('conditions') && results.conditions.items.length > 0 && (
                                    <ResultSection icon={HeartPulse} title="Conditions" count={results.conditions.totalAvailable}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {results.conditions.items.map((c) => (
                                                <Link
                                                    key={c.id}
                                                    to={getConditionUrl(c)}
                                                    className="block bg-surface p-5 rounded-xl border border-border hover:border-primary/40 transition-colors group"
                                                >
                                                    <div className="text-xs uppercase tracking-wider text-text-tertiary font-bold mb-1">
                                                        {c.category}
                                                    </div>
                                                    <h3 className="font-bold text-text-primary group-hover:text-primary transition-colors mb-1">
                                                        {c.name}
                                                        <span className="text-text-tertiary font-normal ml-2 text-sm">
                                                            {c.full_name !== c.name ? `· ${c.full_name}` : ''}
                                                        </span>
                                                    </h3>
                                                    <p className="text-sm text-text-secondary line-clamp-2">
                                                        {c.description_for_user}
                                                    </p>
                                                </Link>
                                            ))}
                                        </div>
                                    </ResultSection>
                                )}

                                {showSection('crisis') && results.crisis.items.length > 0 && (
                                    <ResultSection icon={Phone} title="Crisis Resources" count={results.crisis.totalAvailable}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {results.crisis.items.map((hit, idx) => (
                                                <Link
                                                    key={`${hit.country.iso2}-${hit.resource.name}-${idx}`}
                                                    to={getCrisisUrl(hit.country)}
                                                    className="block bg-surface p-5 rounded-xl border border-border hover:border-red-400/60 transition-colors group"
                                                >
                                                    <div className="text-xs uppercase tracking-wider text-red-500 font-bold mb-1">
                                                        {hit.country.country_name} ({hit.country.iso2})
                                                    </div>
                                                    <h3 className="font-bold text-text-primary group-hover:text-red-500 transition-colors mb-1">
                                                        {hit.resource.name}
                                                    </h3>
                                                    <p className="text-sm text-text-secondary">
                                                        {hit.resource.phone || hit.resource.text_instruction || hit.resource.web_url}
                                                        {' · '}
                                                        {hit.resource.hours}
                                                    </p>
                                                </Link>
                                            ))}
                                        </div>
                                    </ResultSection>
                                )}

                                {tab === 'all' && results.categories.items.length > 0 && (
                                    <ResultSection icon={Compass} title="Topics" count={results.categories.totalAvailable}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {results.categories.items.map((cat) => (
                                                <Link
                                                    key={cat.id}
                                                    to={`/learn/${cat.slug}`}
                                                    className="block bg-surface p-5 rounded-xl border border-border hover:border-primary/40 transition-colors group"
                                                >
                                                    <h3 className="font-bold text-text-primary group-hover:text-primary transition-colors mb-1">
                                                        {cat.name}
                                                    </h3>
                                                    <p className="text-sm text-text-secondary line-clamp-2">{cat.description}</p>
                                                </Link>
                                            ))}
                                        </div>
                                    </ResultSection>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const ResultSection: React.FC<{
    icon: React.ElementType;
    title: string;
    count: number;
    children: React.ReactNode;
}> = ({ icon: Icon, title, count, children }) => (
    <section>
        <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-surface-hover text-primary rounded-lg">
                <Icon size={20} />
            </div>
            <h2 className="font-bold text-2xl text-text-primary">
                {title} ({count})
            </h2>
        </div>
        {children}
    </section>
);

const FilterPanel: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-surface border border-border rounded-xl p-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-text-tertiary mb-3">{title}</h3>
        <div className="flex flex-col gap-1.5">{children}</div>
    </div>
);

const FilterChip: React.FC<{ active: boolean; onClick: () => void; label: string }> = ({
    active, onClick, label,
}) => (
    <button
        onClick={onClick}
        className={`text-left px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            active
                ? 'bg-primary/10 text-primary'
                : 'text-text-secondary hover:bg-surface-hover'
        }`}
    >
        {label}
    </button>
);

export default SearchResults;
