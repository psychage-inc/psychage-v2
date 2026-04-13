import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUrlFilterState } from '@/hooks/useUrlFilterState';
import { Search, BookOpen, ArrowRight, Clock, Bookmark, Mail, Loader2, CheckCircle, X } from 'lucide-react';
import SEO from '../components/SEO';
import { useArticleService } from '../services/articleService';
import { categoryService } from '../services/categoryService';
import { searchService } from '../services/searchService';
import { Article, Category } from '../types/models';
import Button from '../components/ui/Button';
import { getCategoryTheme } from '../config/categoryThemes';
import { getArticleUrl, getCategoryUrl } from '../lib/articleUrl';
import { useBookmarks } from '../context/BookmarkContext';
import { useAuth } from '../context/AuthContext';
import AuthModal from '../components/auth/AuthModal';
import { LiveRegion } from '../components/a11y/LiveRegion';
import { useNewsletterService } from '../services/newsletterService';
import { consentService } from '../services/consentService';
import FlatArticleCard from '../components/articles/FlatArticleCard';
import FeaturedHeroCard from '../components/articles/FeaturedHeroCard';
import TrendingListItem from '../components/articles/TrendingListItem';
import { saveRecentlyRead, getRecentlyReadIds } from '../components/articles/recentlyRead';

// ─── Priority ordering ──────────────────────────────────────────────
const PRIORITY_CATEGORY_SLUGS = [
    'emotional-regulation',
    'anxiety-stress',
    'relationships-social',
    'self-esteem-identity',
    'workplace-academic',
    'mens-mental-health',
    'chronic-illness-pain',
];

// ─── Skeleton Loading State ─────────────────────────────────────────
const SkeletonPulse: React.FC<{ className?: string }> = ({ className = '' }) => (
    <div className={`animate-pulse bg-border/50 rounded-md ${className}`} />
);

const LearnPageSkeleton: React.FC = () => (
    <div className="min-h-screen bg-background pb-20" role="status" aria-label="Loading articles">
        <div className="pt-20 pb-16 px-6">
            <div className="container mx-auto max-w-content">
                <SkeletonPulse className="h-3 w-24 mb-6" />
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
                    <div className="lg:col-span-3">
                        <SkeletonPulse className="aspect-[16/10] w-full rounded-xl" />
                        <SkeletonPulse className="h-10 w-3/4 mt-5" />
                        <SkeletonPulse className="h-6 w-full mt-3" />
                        <SkeletonPulse className="h-6 w-2/3 mt-2" />
                        <div className="flex gap-4 mt-4">
                            <SkeletonPulse className="h-4 w-20" />
                            <SkeletonPulse className="h-4 w-24" />
                        </div>
                    </div>
                    <div className="lg:col-span-2 flex flex-col">
                        <SkeletonPulse className="h-3 w-16 mb-4" />
                        {[0, 1, 2, 3].map(i => (
                            <div key={i} className="flex items-start gap-5 py-5 border-b border-border last:border-b-0">
                                <SkeletonPulse className="h-8 w-8 shrink-0" />
                                <div className="flex-1">
                                    <SkeletonPulse className="h-5 w-full" />
                                    <SkeletonPulse className="h-5 w-2/3 mt-1" />
                                    <SkeletonPulse className="h-3 w-1/3 mt-2" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        <div className="border-t border-border px-6 py-8">
            <div className="container mx-auto max-w-content">
                <SkeletonPulse className="h-10 w-64 mb-6" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[0, 1, 2, 3, 4, 5].map(i => (
                        <div key={i}>
                            <SkeletonPulse className="aspect-[16/9] w-full rounded-lg" />
                            <SkeletonPulse className="h-3 w-20 mt-4" />
                            <SkeletonPulse className="h-6 w-full mt-2" />
                            <SkeletonPulse className="h-6 w-2/3 mt-1" />
                            <SkeletonPulse className="h-4 w-full mt-2" />
                            <SkeletonPulse className="h-3 w-1/3 mt-3" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <span className="sr-only">Loading articles, please wait...</span>
    </div>
);

// ─── Reading Plan Card (horizontal scroll) ──────────────────────────
const ReadingPlanCard: React.FC<{
    article: Article;
    onClick: () => void;
}> = ({ article, onClick }) => {
    const theme = getCategoryTheme(article.category.slug);
    const FallbackIcon = theme.icon;
    const [imgError, setImgError] = React.useState(false);

    return (
        <button onClick={onClick} className="group flex-shrink-0 w-64 text-left">
            <div className="aspect-[16/9] w-full overflow-hidden rounded-lg border border-border/50">
                {article.image && !imgError ? (
                    <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-surface">
                        <FallbackIcon size={28} className="text-text-tertiary opacity-25" />
                    </div>
                )}
            </div>
            <div className="pt-3">
                <span className="text-xs text-text-tertiary font-semibold uppercase tracking-wider">
                    {article.category.name}
                </span>
                <h4 className="font-display font-bold text-sm text-text-primary leading-snug line-clamp-2 mt-1 group-hover:text-primary transition-colors">
                    {article.title}
                </h4>
                <span className="text-xs text-text-tertiary mt-1.5 flex items-center gap-1.5">
                    <Clock size={11} />
                    {article.readTime ?? 5} min
                </span>
            </div>
        </button>
    );
};

// ─── Tab Menu (sticky horizontal category tabs) ─────────────────────
const TabMenu: React.FC<{
    tabs: { slug: string; label: string }[];
    activeTab: string;
    onTabChange: (slug: string) => void;
}> = ({ tabs, activeTab, onTabChange }) => {
    return (
        <div className="sticky top-20 z-30 mt-20 bg-background/95 backdrop-blur-sm border-b border-border">
            <div className="container mx-auto max-w-content px-6">
                <nav
                    className="flex gap-1 overflow-x-auto -mb-px"
                    role="tablist"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}
                >
                    {tabs.map((tab) => {
                        const isActive = tab.slug === activeTab;
                        return (
                            <button
                                key={tab.slug}
                                role="tab"
                                aria-selected={isActive}
                                onClick={() => onTabChange(tab.slug)}
                                className={`whitespace-nowrap text-sm pb-3 pt-3 px-4 transition-colors ${
                                    isActive
                                        ? 'border-b-2 border-primary text-text-primary font-bold'
                                        : 'border-b-2 border-transparent text-text-tertiary hover:text-text-secondary font-medium'
                                }`}
                            >
                                {tab.label}
                            </button>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
};

// ─── Inline Newsletter CTA (minimalist, no gradients) ───────────────
const InlineNewsletterCTA: React.FC = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const newsletterService = useNewsletterService();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || status === 'loading') return;
        setStatus('loading');
        try {
            await newsletterService.subscribe(email);
            consentService.logConsent('newsletter', true, 'v1.0', { email, source: 'learn-page' }).catch(console.error);
            setStatus('success');
            setEmail('');
        } catch {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        }
    };

    return (
        <section className="border-t border-border pt-12 pb-4">
            <div className="container mx-auto max-w-content px-6">
                <div className="max-w-xl mx-auto text-center">
                    <div className="flex items-center justify-center mb-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Mail className="w-5 h-5 text-primary" />
                        </div>
                    </div>
                    <h3 className="text-2xl font-display font-bold text-text-primary tracking-tight mb-2">
                        Stay in the loop
                    </h3>
                    <p className="text-sm text-text-secondary mb-6">
                        Free weekly insights on mental health — no spam, unsubscribe anytime.
                    </p>

                    {status === 'success' ? (
                        <div className="flex items-center justify-center gap-2.5 py-3 rounded-xl bg-primary/5 border border-primary/20">
                            <CheckCircle size={18} className="text-primary" />
                            <span className="text-sm font-medium text-primary">You're subscribed — check your inbox!</span>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                                aria-label="Email address for newsletter"
                                className="h-12 px-4 flex-1 rounded-xl bg-surface border border-border text-text-primary text-sm placeholder-text-tertiary focus:outline-none focus:border-primary transition-colors"
                            />
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="h-12 px-6 bg-primary hover:bg-primary-hover text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-60 flex items-center justify-center gap-2 shrink-0"
                            >
                                {status === 'loading' ? (
                                    <Loader2 size={16} className="animate-spin" />
                                ) : status === 'error' ? (
                                    'Try again'
                                ) : (
                                    <>Subscribe <ArrowRight size={15} /></>
                                )}
                            </button>
                        </form>
                    )}
                    <p className="text-[11px] text-text-tertiary mt-3">
                        By subscribing you consent to receiving emails from Psychage.
                    </p>
                </div>
            </div>
        </section>
    );
};

// ─── Main Learn Page ─────────────────────────────────────────────────
const LearnPage: React.FC = () => {
    const navigate = useNavigate();
    const [articles, setArticles] = useState<Article[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [urlFilters, setUrlFilters] = useUrlFilterState({ q: undefined, category: undefined, sort: undefined });
    const searchQuery = urlFilters.q || '';
    const setSearchQuery = useCallback((q: string) => setUrlFilters({ q: q || undefined }), [setUrlFilters]);
    const activeTab = urlFilters.category || '';
    const setActiveTab = useCallback((cat: string) => setUrlFilters({ category: cat || undefined }), [setUrlFilters]);
    const sortOrder = (urlFilters.sort || 'recent') as 'recent' | 'shortest' | 'longest';
    const setSortOrder = useCallback((s: 'recent' | 'shortest' | 'longest') => setUrlFilters({ sort: s === 'recent' ? undefined : s }), [setUrlFilters]);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const articleService = useArticleService();
    const { isAuthenticated } = useAuth();
    const { bookmarks, toggleBookmark, isBookmarked } = useBookmarks();

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchData = async () => {
            try {
                const [articlesData, categoriesData] = await Promise.all([
                    articleService.getAll(),
                    categoryService.getAll()
                ]);
                setArticles(articlesData);
                setCategories(categoriesData);
            } catch (error) {
                console.error("Failed to fetch data:", error);
                setFetchError("Unable to load articles. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [articleService]);

    // Load recent searches on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem('psychage_recent_searches');
            if (stored) setRecentSearches(JSON.parse(stored).slice(0, 5));
        } catch {
            // ignore
        }
    }, []);

    // Filter articles by search query
    const filteredArticles = useMemo(() => {
        if (!searchQuery) return articles;
        const query = searchQuery.toLowerCase();
        return articles.filter(a =>
            a.title.toLowerCase().includes(query) ||
            (a.description ?? '').toLowerCase().includes(query)
        );
    }, [articles, searchQuery]);

    // Group articles by category slug
    const articlesByCategory = useMemo(() => {
        const grouped: Record<string, Article[]> = {};
        for (const article of filteredArticles) {
            const slug = article.category.slug;
            if (!grouped[slug]) grouped[slug] = [];
            grouped[slug].push(article);
        }
        return grouped;
    }, [filteredArticles]);

    // Derive category objects from articles
    const categoriesFromArticles = useMemo(() => {
        const seen = new Map<string, Category>();
        for (const article of articles) {
            const slug = article.category.slug;
            if (!seen.has(slug)) {
                seen.set(slug, article.category);
            }
        }
        return seen;
    }, [articles]);

    // All categories ordered: priority slugs first, then the rest
    const orderedCategories = useMemo(() => {
        const allSlugs = new Set([
            ...categories.map(c => c.slug),
            ...Array.from(categoriesFromArticles.keys()),
        ]);

        const catMap = new Map<string, Category>();
        for (const slug of allSlugs) {
            const cat = categoriesFromArticles.get(slug) || categories.find(c => c.slug === slug);
            if (cat && (articlesByCategory[slug]?.length ?? 0) > 0) {
                catMap.set(slug, cat);
            }
        }

        const result: Category[] = [];
        for (const slug of PRIORITY_CATEGORY_SLUGS) {
            const cat = catMap.get(slug);
            if (cat) {
                result.push(cat);
                catMap.delete(slug);
            }
        }
        for (const cat of catMap.values()) {
            result.push(cat);
        }
        return result;
    }, [categories, categoriesFromArticles, articlesByCategory]);

    // Featured articles: 7 picks (1 hero + 6 trending) from priority categories
    const featuredArticles = useMemo(() => {
        const picks: Article[] = [];
        const usedCategories = new Set<string>();
        const priorityArticles = articles.filter(
            a => PRIORITY_CATEGORY_SLUGS.includes(a.category.slug)
        );
        for (const a of priorityArticles) {
            if (picks.length >= 7) break;
            if (a.tags.includes('featured') && !usedCategories.has(a.category.slug)) {
                picks.push(a);
                usedCategories.add(a.category.slug);
            }
        }
        for (const a of priorityArticles) {
            if (picks.length >= 7) break;
            if (!usedCategories.has(a.category.slug)) {
                picks.push(a);
                usedCategories.add(a.category.slug);
            }
        }
        for (const a of priorityArticles) {
            if (picks.length >= 7) break;
            if (!picks.includes(a)) {
                picks.push(a);
            }
        }
        return picks;
    }, [articles]);

    // Tab list: all categories with articles
    const tabs = useMemo(() => {
        return orderedCategories.map(c => ({ slug: c.slug, label: c.name }));
    }, [orderedCategories]);

    // Articles for the active tab with sorting
    const tabArticles = useMemo(() => {
        const raw = (articlesByCategory[activeTab] || []).slice(0, 6);
        if (sortOrder === 'shortest') {
            return [...raw].sort((a, b) => (a.readTime ?? 5) - (b.readTime ?? 5));
        }
        if (sortOrder === 'longest') {
            return [...raw].sort((a, b) => (b.readTime ?? 5) - (a.readTime ?? 5));
        }
        return raw; // 'recent' — default order from service
    }, [activeTab, articlesByCategory, sortOrder]);

    // Active category object
    const activeCategoryObj = useMemo(() => {
        return orderedCategories.find(c => c.slug === activeTab) || null;
    }, [activeTab, orderedCategories]);

    // Bookmarked articles
    const readingPlanArticles = useMemo(() => {
        if (bookmarks.length === 0) return [];
        const bookmarkSet = new Set(bookmarks.map(String));
        return articles.filter(a => bookmarkSet.has(String(a.id)));
    }, [articles, bookmarks]);

    // Recently read articles
    const recentlyReadArticles = useMemo(() => {
        const entries = getRecentlyReadIds();
        if (entries.length === 0 || articles.length === 0) return [];
        const idSet = new Set(entries.map(e => String(e.id)));
        const resolved = articles.filter(a => idSet.has(String(a.id)));
        // Maintain recency order
        const orderMap = new Map(entries.map((e, i) => [String(e.id), i]));
        return resolved.sort((a, b) => (orderMap.get(String(a.id)) ?? 99) - (orderMap.get(String(b.id)) ?? 99));
    }, [articles]);

    // Recommended articles: 6 from diverse categories with images
    const recommendedArticles = useMemo(() => {
        const withImages = articles.filter(a => a.image);
        const usedSlugs = new Set<string>();
        const picks: Article[] = [];
        for (const a of withImages) {
            if (picks.length >= 6) break;
            if (!usedSlugs.has(a.category.slug)) {
                picks.push(a);
                usedSlugs.add(a.category.slug);
            }
        }
        for (const a of withImages) {
            if (picks.length >= 6) break;
            if (!picks.includes(a)) picks.push(a);
        }
        for (const a of articles) {
            if (picks.length >= 6) break;
            if (!picks.includes(a)) picks.push(a);
        }
        return picks;
    }, [articles]);

    // Reading stats
    const readingStats = useMemo(() => {
        if (articles.length === 0) return null;
        const totalArticles = articles.length;
        const totalCategories = new Set(articles.map(a => a.category.slug)).size;
        const readTimes = articles.map(a => a.readTime ?? 5);
        const avgReadTime = Math.round(readTimes.reduce((sum, t) => sum + t, 0) / readTimes.length);
        return { totalArticles, totalCategories, avgReadTime };
    }, [articles]);

    // Set initial active tab
    useEffect(() => {
        if (orderedCategories.length > 0 && !activeTab) {
            setActiveTab(orderedCategories[0].slug);
        }
    }, [orderedCategories, activeTab]);

    const hasNoResults = searchQuery.length > 0 && filteredArticles.length === 0;
    const isSearching = searchQuery.length > 0;

    // aria-live announcement for search results
    const searchAnnouncement = useMemo(() => {
        if (!isSearching) return '';
        if (hasNoResults) return `No articles found for ${searchQuery}`;
        return `${filteredArticles.length} article${filteredArticles.length === 1 ? '' : 's'} found for ${searchQuery}`;
    }, [isSearching, hasNoResults, filteredArticles.length, searchQuery]);

    const handleToggleBookmark = (articleId: string | number) => (e: React.MouseEvent) => {
        e.stopPropagation();
        const toggled = toggleBookmark(articleId);
        if (!toggled) {
            setShowAuthModal(true);
        }
    };

    const handleArticleClick = useCallback((article: Article) => {
        saveRecentlyRead(article.id);
        navigate(getArticleUrl(article));
    }, [navigate]);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            searchService.saveLocalSearch(searchQuery.trim());
            // Refresh recent searches
            try {
                const stored = localStorage.getItem('psychage_recent_searches');
                if (stored) setRecentSearches(JSON.parse(stored).slice(0, 5));
            } catch {
                // ignore
            }
        }
    };

    const handleClearRecentSearches = () => {
        searchService.clearSearchHistory();
        setRecentSearches([]);
    };

    if (isLoading) return <LearnPageSkeleton />;

    if (fetchError) return (
        <div className="min-h-screen bg-background pt-32 flex items-center justify-center">
            <div className="text-center max-w-md mx-auto px-6">
                <div className="w-14 h-14 bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 rounded-full flex items-center justify-center mx-auto mb-5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                </div>
                <h2 className="font-display font-bold text-xl text-text-primary mb-2">Something went wrong</h2>
                <p className="text-text-secondary mb-6">{fetchError}</p>
                <button
                    onClick={() => { setFetchError(null); setIsLoading(true); window.location.reload(); }}
                    className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-colors"
                >
                    Try Again
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-background pb-20">
            <SEO
                title="Learn Hub | Psychage Mental Health Education"
                description="Explore our comprehensive library of mental health articles, guides, and resources."
            />

            {/* aria-live region for search announcements */}
            <LiveRegion politeMessage={searchAnnouncement} assertiveMessage="" />

            {/* ── 1. Hero: Editor's Picks ──────────────────────────── */}
            <h1 className="sr-only">Learn — Mental Health Education</h1>
            {featuredArticles.length > 0 && (
                <section className="pt-20 pb-16 px-6">
                    <div className="container mx-auto max-w-content">
                        <p className="text-xs text-text-tertiary font-semibold uppercase tracking-wider mb-2">
                            Editor's Picks
                        </p>


                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
                            <div className="lg:col-span-3">
                                <FeaturedHeroCard
                                    article={featuredArticles[0]}
                                    onClick={() => handleArticleClick(featuredArticles[0])}
                                />
                            </div>

                            {featuredArticles.length > 1 && (
                                <div className="lg:col-span-2 flex flex-col">
                                    <h3 className="text-xs text-text-tertiary font-semibold uppercase tracking-wider mb-4">
                                        Trending
                                    </h3>
                                    {featuredArticles.slice(1, 7).map((article, i) => (
                                        <TrendingListItem
                                            key={article.id}
                                            article={article}
                                            index={i}
                                            onClick={() => handleArticleClick(article)}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* ── 2. Search Bar + Filter Pills ─────────────────────── */}
            <section className="border-t border-border">
                <div className="container mx-auto max-w-content px-6 py-8">
                    <div className="max-w-xl" role="search">
                        <form onSubmit={handleSearchSubmit}>
                            <div className="relative flex items-center">
                                <Search className="absolute left-0 text-text-tertiary" size={20} />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onFocus={() => setIsSearchFocused(true)}
                                    onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                                    placeholder="Search articles..."
                                    aria-label="Search articles"
                                    className="w-full pl-8 pr-4 py-3 bg-transparent border-b-2 border-border focus:border-primary text-text-primary placeholder-text-tertiary outline-none text-base font-medium transition-colors"
                                />
                            </div>
                        </form>

                        {/* Recent searches */}
                        {isSearchFocused && !searchQuery && recentSearches.length > 0 && (
                            <div className="mt-3 flex items-center gap-2 flex-wrap">
                                <span className="text-xs text-text-tertiary font-medium">Recent:</span>
                                {recentSearches.map((term) => (
                                    <button
                                        key={term}
                                        onMouseDown={(e) => { e.preventDefault(); setSearchQuery(term); }}
                                        className="rounded-full bg-surface border border-border px-3 py-1 text-sm text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-colors"
                                    >
                                        {term}
                                    </button>
                                ))}
                                <button
                                    onMouseDown={(e) => { e.preventDefault(); handleClearRecentSearches(); }}
                                    className="p-1 rounded-full hover:bg-surface-hover transition-colors"
                                    aria-label="Clear recent searches"
                                >
                                    <X size={14} className="text-text-tertiary" />
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-2.5 mt-6">
                        {orderedCategories.map(cat => (
                            <button
                                key={cat.slug}
                                onClick={() => {
                                    setSearchQuery('');
                                    setActiveTab(cat.slug);
                                    // Scroll to the category content section
                                    setTimeout(() => {
                                        const tabMenu = document.querySelector('[role="tablist"]');
                                        tabMenu?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                    }, 50);
                                }}
                                aria-pressed={activeTab === cat.slug}
                                className={`rounded-full px-4 py-1.5 border text-sm transition-colors ${
                                    activeTab === cat.slug
                                        ? 'border-primary bg-primary/5 text-primary font-semibold'
                                        : 'border-border text-text-secondary hover:bg-surface-hover hover:text-text-primary'
                                }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── 3. My Reading Plan (authenticated only) ──────────── */}
            {isAuthenticated && (
                <section className="border-t border-border pt-12">
                    <div className="container mx-auto max-w-content px-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-display font-bold text-text-primary tracking-tight">
                                    My Reading Plan
                                </h2>
                                <p className="text-sm text-text-secondary mt-1">
                                    {readingPlanArticles.length > 0
                                        ? `${readingPlanArticles.length} article${readingPlanArticles.length === 1 ? '' : 's'} saved`
                                        : 'Bookmark articles to build your reading plan'}
                                </p>
                            </div>
                        </div>

                        {readingPlanArticles.length > 0 ? (
                            <div
                                className="flex gap-5 overflow-x-auto pb-4 -mx-6 px-6"
                                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}
                            >
                                {readingPlanArticles.map(article => (
                                    <ReadingPlanCard
                                        key={article.id}
                                        article={article}
                                        onClick={() => handleArticleClick(article)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="py-12 text-center border border-dashed border-border rounded-xl">
                                <Bookmark size={32} className="mx-auto text-text-tertiary mb-3" />
                                <p className="text-text-secondary text-sm">
                                    Tap the bookmark icon on any article to save it here.
                                </p>
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* ── 3b. Continue Reading (recently read, no auth required) ── */}
            {recentlyReadArticles.length > 0 && (
                <section className="border-t border-border pt-12">
                    <div className="container mx-auto max-w-content px-6">
                        <h2 className="text-2xl md:text-3xl font-display font-bold text-text-primary tracking-tight mb-2">
                            Continue Reading
                        </h2>
                        <p className="text-sm text-text-secondary mb-6">
                            Pick up where you left off.
                        </p>
                        <div
                            className="flex gap-5 overflow-x-auto pb-4 -mx-6 px-6"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' } as React.CSSProperties}
                        >
                            {recentlyReadArticles.map(article => (
                                <ReadingPlanCard
                                    key={article.id}
                                    article={article}
                                    onClick={() => handleArticleClick(article)}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── 4. Recommended for You ───────────────────────────── */}
            {!isSearching && recommendedArticles.length > 0 && (
                <section className="border-t border-border pt-12">
                    <div className="container mx-auto max-w-content px-6">
                        <div className="mb-8">
                            <h2 className="text-2xl md:text-3xl font-display font-bold text-text-primary tracking-tight">
                                Recommended for You
                            </h2>
                            <p className="text-base text-text-secondary mt-2 max-w-2xl leading-relaxed">
                                Curated articles to help you understand yourself and navigate mental health.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {recommendedArticles.map(article => (
                                <FlatArticleCard
                                    key={article.id}
                                    article={article}
                                    onNavigate={() => handleArticleClick(article)}
                                    isBookmarked={isBookmarked(article.id)}
                                    onToggleBookmark={handleToggleBookmark(article.id)}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── 5. No Results State ──────────────────────────────── */}
            {hasNoResults && (
                <section className="px-6 py-16">
                    <div className="container mx-auto max-w-content">
                        <div className="text-center py-20 border border-dashed border-border rounded-xl">
                            <Search size={40} className="mx-auto text-text-tertiary mb-4" />
                            <h2 className="text-2xl font-display font-bold text-text-primary mb-2">No articles found</h2>
                            <p className="text-text-secondary mb-6">
                                No articles match &ldquo;{searchQuery}&rdquo;. Try different keywords.
                            </p>
                            <Button variant="outline" onClick={() => setSearchQuery('')}>
                                Clear search
                            </Button>
                        </div>
                    </div>
                </section>
            )}

            {/* ── 5b. Search Results ───────────────────────────────── */}
            {isSearching && !hasNoResults && (
                <section className="px-6 py-12">
                    <div className="container mx-auto max-w-content">
                        <div className="flex items-baseline gap-3 mb-8">
                            <h2 className="text-2xl md:text-3xl font-display font-bold text-text-primary tracking-tight">
                                Results for &ldquo;{searchQuery}&rdquo;
                            </h2>
                            <span className="text-sm text-text-tertiary font-medium">
                                {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredArticles.slice(0, 12).map(article => (
                                <FlatArticleCard
                                    key={article.id}
                                    article={article}
                                    onNavigate={() => handleArticleClick(article)}
                                    isBookmarked={isBookmarked(article.id)}
                                    onToggleBookmark={handleToggleBookmark(article.id)}
                                />
                            ))}
                        </div>

                        {filteredArticles.length > 12 && (
                            <p className="text-center mt-8 text-text-tertiary text-sm">
                                Showing 12 of {filteredArticles.length} results. Refine your search for more specific articles.
                            </p>
                        )}
                    </div>
                </section>
            )}

            {/* ── 6. Category Tabs (when NOT searching) ────────────── */}
            {!isSearching && tabs.length > 0 && (
                <>
                    <TabMenu
                        tabs={tabs}
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                    />

                    <section className="px-6 py-12">
                        <div className="container mx-auto max-w-content">
                            <div className="flex items-start justify-between mb-8">
                                <div>
                                    <h2 className="text-2xl md:text-3xl font-display font-bold text-text-primary tracking-tight">
                                        {activeCategoryObj?.name ?? 'Articles'}
                                    </h2>
                                    {activeCategoryObj?.description && (
                                        <p className="text-base text-text-secondary mt-2 max-w-2xl leading-relaxed">
                                            {activeCategoryObj.description}
                                        </p>
                                    )}
                                </div>

                                {/* Sort controls */}
                                <div className="flex items-center gap-1 shrink-0">
                                    {([
                                        { key: 'recent' as const, label: 'Recent' },
                                        { key: 'shortest' as const, label: 'Quick' },
                                        { key: 'longest' as const, label: 'Deep' },
                                    ]).map(({ key, label }) => (
                                        <button
                                            key={key}
                                            onClick={() => setSortOrder(key)}
                                            className={`px-3 py-1 text-sm rounded-full transition-colors ${
                                                sortOrder === key
                                                    ? 'text-text-primary font-semibold bg-surface-hover'
                                                    : 'text-text-tertiary hover:text-text-secondary'
                                            }`}
                                        >
                                            {label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {tabArticles.length > 0 ? (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {tabArticles.map(article => (
                                            <FlatArticleCard
                                                key={article.id}
                                                article={article}
                                                onNavigate={() => handleArticleClick(article)}
                                                isBookmarked={isBookmarked(article.id)}
                                                onToggleBookmark={handleToggleBookmark(article.id)}
                                            />
                                        ))}
                                    </div>

                                    {activeCategoryObj && (articlesByCategory[activeTab]?.length ?? 0) > 6 && (
                                        <div className="mt-10 text-center">
                                            <button
                                                onClick={() => navigate(getCategoryUrl(activeTab))}
                                                className="inline-flex items-center gap-2 text-sm font-semibold text-text-secondary hover:text-primary transition-colors"
                                            >
                                                See all {articlesByCategory[activeTab]?.length} articles in {activeCategoryObj.name}
                                                <ArrowRight size={16} />
                                            </button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="text-center py-16">
                                    <BookOpen size={40} className="mx-auto text-text-tertiary mb-4" />
                                    <p className="text-text-secondary">No articles in this category yet.</p>
                                </div>
                            )}
                        </div>
                    </section>
                </>
            )}

            {/* ── 7. Full Category Sections (when NOT searching) ────── */}
            {!isSearching && orderedCategories.length > 0 && (
                <div className="space-y-24 px-6 pb-12">
                    <div className="container mx-auto max-w-content">
                        {orderedCategories.map((category) => {
                            const categoryArticles = (articlesByCategory[category.slug] || []).slice(0, 12);

                            if (categoryArticles.length === 0) return null;

                            return (
                                <section key={category.slug} className="space-y-8">
                                    <div className="flex items-start justify-between gap-4 mt-12 mb-8">
                                        <div className="flex-1">
                                            <h2 className="text-2xl md:text-3xl font-display font-bold text-text-primary tracking-tight">
                                                {category.name}
                                            </h2>
                                            {category.description && (
                                                <p className="text-sm text-text-secondary mt-2 max-w-3xl leading-relaxed">
                                                    {category.description}
                                                </p>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => navigate(getCategoryUrl(category.slug))}
                                            className="shrink-0 inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-primary transition-colors"
                                        >
                                            See all
                                            <ArrowRight size={16} />
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {categoryArticles.map(article => (
                                            <FlatArticleCard
                                                key={article.id}
                                                article={article}
                                                onNavigate={() => handleArticleClick(article)}
                                                isBookmarked={isBookmarked(article.id)}
                                                onToggleBookmark={handleToggleBookmark(article.id)}
                                            />
                                        ))}
                                    </div>
                                </section>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* ── 8. Newsletter CTA ────────────────────────────────── */}
            <InlineNewsletterCTA />

            {/* ── 9. CTA Banner ────────────────────────────────────── */}
            <section className="px-6 mb-20 mt-8">
                <div className="container mx-auto max-w-content">
                    <div className="rounded-xl border border-border bg-surface p-8 md:p-12">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="max-w-2xl text-center md:text-left">
                                <h2 className="text-2xl md:text-3xl font-display font-bold mb-3 text-text-primary tracking-tight">
                                    Unsure where to start?
                                </h2>
                                <p className="text-text-secondary leading-relaxed">
                                    Take our scientifically-backed Clarity Score assessment to get a personalized mental health baseline and tailored recommendations.
                                </p>
                            </div>
                            <Button
                                variant="primary"
                                className="shrink-0 h-11 px-6 rounded-lg font-semibold"
                                rightIcon={<ArrowRight size={18} />}
                                onClick={() => navigate('/clarity-score')}
                            >
                                Take Clarity Score
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── 10. Auth Modal ────────────────────────────────────── */}
            <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
        </div>
    );
};

export default LearnPage;
