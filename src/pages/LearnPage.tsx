import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, BookOpen, Sparkles, ArrowRight, Clock } from 'lucide-react';
import SEO from '../components/SEO';
import { useArticleService } from '../services/articleService';
import { categoryService } from '../services/categoryService';
import { Article, Category } from '../types/models';
import ArticleCard from '../components/article/ArticleCard';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { getCategoryTheme, getCategoryBadgeClasses } from '../config/categoryThemes';
import { getArticleUrl, getCategoryUrl } from '../lib/articleUrl';

// ─── Priority ordering: categories with cover images first ──────────
const PRIORITY_CATEGORY_SLUGS = [
    // Categories 1-5
    'emotional-regulation',
    'anxiety-stress',
    'relationships-communication',
    'self-worth-identity',
    'work-productivity',
    // Category 19
    'mens-mental-health',
];

// ─── Compact Horizontal Article Card ─────────────────────────────────
const CompactArticleCard: React.FC<{ article: Article; onClick: () => void }> = ({ article, onClick }) => {
    const theme = getCategoryTheme(article.category.slug);
    const FallbackIcon = theme.icon;
    const [imgError, setImgError] = React.useState(false);
    return (
    <button
        onClick={onClick}
        className="group flex items-center gap-4 w-full p-3 rounded-2xl bg-surface/50 border border-border/50 hover:border-primary/30 hover:bg-surface transition-all duration-300 text-left"
    >
        <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 shrink-0">
            {article.image && !imgError ? (
                <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" onError={() => setImgError(true)} />
            ) : (
                <div className={`w-full h-full flex items-center justify-center ${theme.classes.bgLight} ${theme.classes.bgLightDark}`}>
                    <FallbackIcon size={24} className={`${theme.classes.text} ${theme.classes.textDark} opacity-40`} />
                </div>
            )}
        </div>
        <div className="flex-1 min-w-0">
            <h4 className="font-display font-bold text-sm text-text-primary leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                {article.title}
            </h4>
            <div className="flex items-center gap-2 mt-1.5 text-xs text-text-tertiary">
                <Clock size={12} />
                <span>{article.readTime ?? 5} min read</span>
            </div>
        </div>
        <ArrowRight size={16} className="text-text-tertiary group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
    </button>
    );
};

// ─── Bento Card for Hero Grid ────────────────────────────────────────
const BentoCard: React.FC<{
    article: Article;
    className?: string;
    size: 'large' | 'small';
    onClick: () => void;
}> = ({ article, className = '', size, onClick }) => {
    const theme = getCategoryTheme(article.category.slug);
    const Icon = theme.icon;
    const [imgError, setImgError] = React.useState(false);

    return (
        <button
            onClick={onClick}
            className={`relative overflow-hidden rounded-2xl group text-left transition-all duration-300 hover:scale-[1.01] ${className}`}
        >
            {article.image && !imgError ? (
                <img
                    src={article.image}
                    alt={article.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    onError={() => setImgError(true)}
                />
            ) : (
                <div className={`absolute inset-0 ${theme.classes.bg}`}>
                    <Icon size={size === 'large' ? 80 : 48} className="absolute bottom-4 right-4 text-white/10" />
                </div>
            )}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
            <div className="relative z-10 h-full flex flex-col justify-end p-5">
                <Badge variant="neutral" className={`mb-2 w-fit backdrop-blur-sm border-0 ${getCategoryBadgeClasses(article.category.slug)}`}>
                    {article.category.name}
                </Badge>
                <h3 className={`font-display font-bold text-white leading-tight ${size === 'large' ? 'text-xl line-clamp-2' : 'text-sm line-clamp-2'}`}>
                    {article.title}
                </h3>
                {size === 'large' && article.description && (
                    <p className="text-white/70 text-sm mt-1 line-clamp-1">{article.description}</p>
                )}
            </div>
        </button>
    );
};

// ─── Themed Section Header ───────────────────────────────────────────
const CategorySectionHeader: React.FC<{
    category: Category;
    articleCount: number;
    onViewAll: () => void;
}> = ({ category, articleCount, onViewAll }) => {
    const theme = getCategoryTheme(category.slug);
    const Icon = theme.icon;

    return (
        <div className="mb-8">
            <div className={`h-1 w-20 rounded-full bg-gradient-to-r ${theme.classes.gradient} mb-5`} />

            <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${theme.classes.bg} shadow-lg shadow-${theme.colorFamily}-500/20`}>
                        <Icon size={22} className="text-white" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-display font-bold text-text-primary leading-tight">
                            {category.name}
                        </h3>
                        <p className="text-sm text-text-tertiary mt-0.5">
                            {articleCount} {articleCount === 1 ? 'article' : 'articles'}
                        </p>
                    </div>
                </div>
                <button
                    onClick={onViewAll}
                    className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-all hover:gap-2.5 ${theme.classes.text} ${theme.classes.textDark}`}
                >
                    View all
                    <ArrowRight size={16} />
                </button>
            </div>
        </div>
    );
};

// ─── Layout A: Hero Feature (hero left + 2 compact right) ───────────
const LayoutHeroFeature: React.FC<{
    articles: Article[];
    navigate: (path: string) => void;
}> = ({ articles, navigate }) => {
    const [hero, ...rest] = articles;
    const compactArticles = rest.slice(0, 2);

    if (!hero) return null;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3">
                <ArticleCard
                    article={hero}
                    onClick={() => navigate(getArticleUrl(hero))}
                />
            </div>
            <div className="lg:col-span-2 flex flex-col gap-4 justify-center">
                {compactArticles.map((article) => (
                    <CompactArticleCard
                        key={article.id}
                        article={article}
                        onClick={() => navigate(getArticleUrl(article))}
                    />
                ))}
                {articles.length > 3 && (
                    <div className="text-center text-xs text-text-tertiary pt-1">
                        +{articles.length - 3} more articles in this topic
                    </div>
                )}
            </div>
        </div>
    );
};

// ─── Layout B: Grid Showcase (3-col) ────────────────────────────────
const LayoutGridShowcase: React.FC<{
    articles: Article[];
    navigate: (path: string) => void;
    accentGradient: string;
}> = ({ articles, navigate, accentGradient }) => {
    const topArticles = articles.slice(0, 3);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topArticles.map((article, i) => (
                <div
                    key={article.id}
                    className={`h-full ${i === 2 ? 'md:col-span-2 lg:col-span-1' : ''}`}
                >
                    <div className={`h-full ${i === 2 ? `rounded-3xl ring-1 ring-inset bg-gradient-to-br ${accentGradient} p-[1px]` : ''}`}>
                        <div className={i === 2 ? 'h-full rounded-[calc(1.5rem-1px)] overflow-hidden' : 'h-full'}>
                            <ArticleCard
                                article={article}
                                onClick={() => navigate(getArticleUrl(article))}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

// ─── Main Learn Page ─────────────────────────────────────────────────
const LearnPage: React.FC = () => {
    const navigate = useNavigate();
    const [articles, setArticles] = useState<Article[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const articleService = useArticleService();

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
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [articleService]);

    // Only articles that have a cover image
    const articlesWithImages = useMemo(() => {
        return articles.filter(a => !!a.image);
    }, [articles]);

    const filteredArticles = useMemo(() => {
        let result = articlesWithImages;
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(a =>
                a.title.toLowerCase().includes(query) ||
                (a.description ?? '').toLowerCase().includes(query)
            );
        }
        return result;
    }, [articlesWithImages, searchQuery]);

    // Group ALL articles (with images) by their category slug
    const articlesByCategory = useMemo(() => {
        const grouped: Record<string, Article[]> = {};
        for (const article of filteredArticles) {
            const slug = article.category.slug;
            if (!grouped[slug]) grouped[slug] = [];
            grouped[slug].push(article);
        }
        return grouped;
    }, [filteredArticles]);

    // Derive category objects from articles themselves (avoids Supabase slug mismatch)
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

        // Build a lookup: slug → Category (prefer article-derived for correct theme)
        const catMap = new Map<string, Category>();
        for (const slug of allSlugs) {
            const cat = categoriesFromArticles.get(slug) || categories.find(c => c.slug === slug);
            if (cat && (articlesByCategory[slug]?.length ?? 0) > 0) {
                catMap.set(slug, cat);
            }
        }

        // Priority categories first (in order), then remaining
        const result: Category[] = [];
        for (const slug of PRIORITY_CATEGORY_SLUGS) {
            const cat = catMap.get(slug);
            if (cat) {
                result.push(cat);
                catMap.delete(slug);
            }
        }
        // Append remaining categories
        for (const cat of catMap.values()) {
            result.push(cat);
        }
        return result;
    }, [categories, categoriesFromArticles, articlesByCategory]);

    // Bento grid: pick best articles with images from priority categories
    const bentoArticles = useMemo(() => {
        const picks: Article[] = [];
        const usedCategories = new Set<string>();
        const priorityWithImages = articlesWithImages.filter(
            a => PRIORITY_CATEGORY_SLUGS.includes(a.category.slug)
        );
        // Featured-tagged articles first
        for (const a of priorityWithImages) {
            if (picks.length >= 3) break;
            if (a.tags.includes('featured') && !usedCategories.has(a.category.slug)) {
                picks.push(a);
                usedCategories.add(a.category.slug);
            }
        }
        // Fill from distinct priority categories
        for (const a of priorityWithImages) {
            if (picks.length >= 3) break;
            if (!usedCategories.has(a.category.slug)) {
                picks.push(a);
                usedCategories.add(a.category.slug);
            }
        }
        return picks;
    }, [articlesWithImages]);

    const hasNoResults = searchQuery.length > 0 && filteredArticles.length === 0;
    const isSearching = searchQuery.length > 0;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    if (isLoading) return (
        <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-background pb-20 overflow-x-hidden">
            <SEO
                title="Learn Hub | Psychage Mental Health Education"
                description="Explore our comprehensive library of mental health articles, guides, and resources."
            />

            {/* ── Hero Section ─────────────────────────────────────── */}
            <section className="relative pt-28 pb-16 px-6 overflow-hidden">
                <div className="container mx-auto max-w-7xl relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface border border-border text-text-primary text-sm font-bold uppercase tracking-wider mb-8 shadow-sm">
                                <BookOpen size={16} className="text-primary" />
                                <span>Knowledge Base</span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6 text-text-primary leading-tight">
                                Mental Health <br />
                                <span className="text-primary">
                                    Education & Guides
                                </span>
                            </h1>

                            <p className="text-xl text-text-secondary mb-10 max-w-lg leading-relaxed">
                                Explore expert-reviewed articles, practical guides, and the latest research on emotional well-being.
                            </p>

                            <div className="max-w-lg relative group">
                                <div className="relative flex items-center bg-surface border border-border rounded-xl shadow-sm focus-within:ring-2 focus-within:ring-primary/50 transition-all overflow-hidden">
                                    <Search className="absolute left-4 text-text-tertiary" size={24} />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search topics (e.g., Anxiety, Sleep, CBT)..."
                                        className="w-full pl-14 pr-4 py-4 bg-transparent text-text-primary placeholder-text-tertiary outline-none text-lg font-medium"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Bento Grid with cover images */}
                        {bentoArticles.length >= 3 && (
                        <div className="hidden lg:grid grid-cols-2 grid-rows-3 gap-3 h-[420px]">
                            <BentoCard
                                article={bentoArticles[0]}
                                className="col-span-2 row-span-2"
                                size="large"
                                onClick={() => navigate(getArticleUrl(bentoArticles[0]))}
                            />
                            <BentoCard
                                article={bentoArticles[1]}
                                size="small"
                                onClick={() => navigate(getArticleUrl(bentoArticles[1]))}
                            />
                            <BentoCard
                                article={bentoArticles[2]}
                                size="small"
                                onClick={() => navigate(getArticleUrl(bentoArticles[2]))}
                            />
                        </div>
                        )}
                    </div>
                </div>
            </section>

            {/* ── No Results State ────────────────────────────────── */}
            {hasNoResults && (
                <section className="px-6 mb-24">
                    <div className="container mx-auto max-w-7xl">
                        <div className="text-center py-20 bg-surface rounded-3xl border border-dashed border-border">
                            <Search size={48} className="mx-auto text-text-tertiary mb-4" />
                            <h2 className="text-2xl font-display font-bold text-text-primary mb-2">No articles found</h2>
                            <p className="text-text-secondary mb-6">
                                No articles match &ldquo;{searchQuery}&rdquo;. Try different keywords or browse by category below.
                            </p>
                            <Button variant="outline" onClick={() => setSearchQuery('')}>
                                Clear search
                            </Button>
                        </div>
                    </div>
                </section>
            )}

            {/* ── All Categories — priority order ─────────────────── */}
            {!hasNoResults && orderedCategories.map((category, index) => {
                const catArticles = articlesByCategory[category.slug] || [];
                const theme = getCategoryTheme(category.slug);
                const isLayoutA = index % 2 === 0;

                return (
                    <motion.section
                        key={category.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className={`px-6 ${index === 0 ? 'pt-4' : 'border-t border-border/50 pt-12'} mb-12`}
                    >
                        <div className="container mx-auto max-w-7xl">
                            <CategorySectionHeader
                                category={category}
                                articleCount={catArticles.length}
                                onViewAll={() => navigate(getCategoryUrl(category.slug))}
                            />

                            {isLayoutA ? (
                                <LayoutHeroFeature
                                    articles={catArticles}
                                    navigate={navigate}
                                />
                            ) : (
                                <LayoutGridShowcase
                                    articles={catArticles}
                                    navigate={navigate}
                                    accentGradient={theme.classes.gradient}
                                />
                            )}
                        </div>
                    </motion.section>
                );
            })}

            {/* ── Search Results (when searching, show all matching) ── */}
            {isSearching && !hasNoResults && (
                <section className="px-6 mb-16">
                    <div className="container mx-auto max-w-7xl">
                        <div className="flex items-center gap-3 mb-8">
                            <Sparkles className="text-amber-500" size={24} />
                            <h2 className="text-3xl font-display font-bold text-text-primary">
                                Results for &ldquo;{searchQuery}&rdquo;
                            </h2>
                            <span className="text-sm text-text-tertiary font-medium ml-2">
                                {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'}
                            </span>
                        </div>

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {filteredArticles.slice(0, 12).map((article) => (
                                <motion.div key={article.id} variants={itemVariants} className="h-full">
                                    <ArticleCard
                                        article={article}
                                        onClick={() => navigate(getArticleUrl(article))}
                                    />
                                </motion.div>
                            ))}
                        </motion.div>

                        {filteredArticles.length > 12 && (
                            <div className="text-center mt-8 text-text-tertiary text-sm">
                                Showing 12 of {filteredArticles.length} results. Refine your search to find more specific articles.
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* ── CTA Banner ──────────────────────────────────────── */}
            <section className="px-6 mb-20 mt-8">
                <div className="container mx-auto max-w-7xl">
                    <div className="rounded-2xl border border-border bg-surface p-8 md:p-12 shadow-sm">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="max-w-2xl text-center md:text-left">
                                <h2 className="text-2xl md:text-3xl font-display font-bold mb-3 text-text-primary">Unsure where to start?</h2>
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
        </div>
    );
};

export default LearnPage;
