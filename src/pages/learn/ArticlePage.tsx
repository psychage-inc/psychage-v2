import React, { useEffect, useState, useCallback } from 'react';
import { Share2, Bookmark, ChevronRight, Clock, Calendar, Search, Check } from 'lucide-react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useArticleService } from '@/services/articleService';
import { Article } from '@/types/models';
import ReadingProgress from '@/components/article/ReadingProgress';
import TableOfContents from '@/components/article/TableOfContents';
import ArticleCard from '@/components/article/ArticleCard';
import ReferenceList from '@/components/article/ReferenceList';

import SEO from '@/components/SEO';
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import MeshGradient from '@/components/ui/MeshGradient';
import InteractiveCard from '@/components/ui/InteractiveCard';
import { motion, useScroll, useTransform } from 'framer-motion';
import Badge from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import { useBookmarks } from '@/context/BookmarkContext';

const ArticlePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [article, setArticle] = useState<Article | undefined>();
    const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [shareStatus, setShareStatus] = useState<'idle' | 'copied'>('idle');
    const articleService = useArticleService();
    const { isBookmarked, toggleBookmark } = useBookmarks();

    // Share functionality
    const handleShare = useCallback(async () => {
        if (!article) return;

        const shareData = {
            title: article.title,
            text: article.description,
            url: window.location.href,
        };

        try {
            // Try native share first (mobile devices)
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                // Fallback to clipboard
                await navigator.clipboard.writeText(window.location.href);
                setShareStatus('copied');
                setTimeout(() => setShareStatus('idle'), 2000);
            }
        } catch (error) {
            // If share was cancelled or failed, try clipboard
            if ((error as Error).name !== 'AbortError') {
                try {
                    await navigator.clipboard.writeText(window.location.href);
                    setShareStatus('copied');
                    setTimeout(() => setShareStatus('idle'), 2000);
                } catch {
                    console.error('Failed to copy to clipboard');
                }
            }
        }
    }, [article]);

    // Scroll effects for Hero
    const { scrollY } = useScroll();
    const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
    const heroY = useTransform(scrollY, [0, 400], [0, 150]);
    const contentY = useTransform(scrollY, [0, 400], [0, -50]);

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                setLoading(true);
                try {
                    const foundArticle = await articleService.getById(id);
                    setArticle(foundArticle);

                    const allArticles = await articleService.getAll();
                    setRelatedArticles(allArticles.filter(a => a.id.toString() !== id).slice(0, 3));
                } catch (error) {
                    console.error("Failed to fetch article", error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchData();
    }, [id, articleService]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [article]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
                <MeshGradient className="opacity-30" />
                <div className="animate-pulse flex flex-col items-center gap-4 relative z-10">
                    <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                    <p className="text-text-secondary font-medium">Loading article...</p>
                </div>
            </div>
        );
    }

    if (!article) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background text-text-primary relative">
                <MeshGradient className="opacity-20" />
                <div className="text-center z-10">
                    <h2 className="text-3xl font-display font-bold mb-4">Article not found</h2>
                    <Button onClick={() => navigate('/learn')}>Back to Learn Hub</Button>
                </div>
            </div>
        );
    }

    const bookmarked = isBookmarked(article.id);

    return (
        <div className="min-h-screen bg-background relative transition-colors duration-300">
            <SEO
                title={`${article.title} | Psychage`}
                description={article.description}
                image={article.image}
                type="article"
            />
            <ReadingProgress />

            {/* Immersive Hero Section */}
            <div className="relative h-[85vh] w-full overflow-hidden flex items-end pb-24">
                {/* Dynamic Background */}
                <div className="absolute inset-0 z-0">
                    <MeshGradient className="opacity-60" />
                    {article.image && (
                        <div className="absolute inset-0 z-[-1]">
                            <img
                                src={article.image}
                                alt=""
                                className="w-full h-full object-cover opacity-20 blur-3xl scale-110"
                            />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                </div>

                {/* Hero Content */}
                <motion.div
                    style={{ opacity: heroOpacity, y: heroY }}
                    className="container mx-auto max-w-[1280px] px-6 relative z-10"
                >
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm text-text-tertiary mb-6 overflow-x-auto whitespace-nowrap hide-scrollbar">
                        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                        <ChevronRight size={14} />
                        <Link to="/learn" className="hover:text-primary transition-colors">Learn</Link>
                        <ChevronRight size={14} />
                        <Link to={`/learn/${article.category.slug}`} className="hover:text-primary transition-colors font-medium text-primary/80">
                            {article.category.name}
                        </Link>
                    </nav>

                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                            <Badge variant="outline" className="mb-6 backdrop-blur-md bg-white/10 border-white/20 text-text-primary">
                                {article.category.name}
                            </Badge>
                            <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl text-text-primary leading-[1.1] mb-6 drop-shadow-sm">
                                {article.title}
                            </h1>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                            className="flex flex-wrap items-center gap-6 text-sm font-medium text-text-secondary"
                        >
                            <div className="flex items-center gap-3">
                                {article.author?.image ? (
                                    <img src={article.author.image} alt={article.author.name} className="w-10 h-10 rounded-full border-2 border-background object-cover" />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                                        {article.author?.name?.charAt(0) || 'P'}
                                    </div>
                                )}
                                <div>
                                    <p className="text-text-primary">{article.author?.name || 'Psychage Team'}</p>
                                    <p className="text-xs text-text-tertiary">{article.author?.role || 'Contributor'}</p>
                                </div>
                            </div>
                            <div className="h-4 w-px bg-border" />
                            <div className="flex items-center gap-2">
                                <Calendar size={16} className="text-primary" />
                                <span>{article.updatedAt || 'Recently Updated'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock size={16} className="text-primary" />
                                <span>{article.readTime} min read</span>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* Main Layout */}
            <main className="container mx-auto max-w-[1280px] px-6 pb-24 -mt-12 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                    {/* Left Sidebar (Share/Controls) */}
                    <div className="hidden lg:block lg:col-span-1">
                        <div className="sticky top-32 flex flex-col gap-4">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleShare}
                                className={cn(
                                    "w-12 h-12 rounded-full border shadow-lg flex items-center justify-center transition-all",
                                    shareStatus === 'copied'
                                        ? "bg-green-500 text-white border-green-500"
                                        : "bg-surface border-white/10 text-text-secondary hover:text-primary hover:border-primary/30"
                                )}
                                aria-label={shareStatus === 'copied' ? "Link copied!" : "Share article"}
                            >
                                {shareStatus === 'copied' ? <Check size={20} /> : <Share2 size={20} />}
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => toggleBookmark(article.id)}
                                className={cn(
                                    "w-12 h-12 rounded-full border shadow-lg flex items-center justify-center transition-all",
                                    bookmarked
                                        ? "bg-primary text-white border-primary"
                                        : "bg-surface border-white/10 text-text-secondary hover:text-primary hover:border-primary/30"
                                )}
                                aria-label="Bookmark"
                            >
                                <Bookmark size={20} fill={bookmarked ? "currentColor" : "none"} />
                            </motion.button>
                        </div>
                    </div>

                    {/* Content Area */}
                    <motion.article
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-7"
                    >
                        {/* Disclaimer Banner */}
                        <div className="bg-primary/5 border-l-4 border-primary p-6 mb-10 rounded-r-xl backdrop-blur-sm">
                            <p className="text-sm text-text-secondary leading-relaxed">
                                <span className="font-bold text-primary block mb-1 uppercase text-xs tracking-wider">Medical Disclaimer</span>
                                This content is for educational purposes only and does not constitute medical advice. Always consult with a qualified healthcare provider for diagnosis and treatment.
                            </p>
                        </div>

                        {/* Article Image (Inline if needed, or keeping it clean) */}
                        <div className="rounded-3xl overflow-hidden shadow-2xl mb-12 border border-white/10 group">
                            <img src={article.image} alt={article.title} className="w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                        </div>

                        <div className="
                            prose prose-lg max-w-none 
                            prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-text-primary
                            prose-h1:text-4xl prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                            prose-h3:text-2xl prose-h3:mt-8
                            prose-p:text-lg prose-p:leading-[1.8] prose-p:text-text-secondary prose-p:mb-6
                            prose-a:text-primary prose-a:font-medium prose-a:no-underline hover:prose-a:underline hover:prose-a:text-primary-hover transition-colors
                            prose-strong:font-bold prose-strong:text-text-primary
                            prose-li:text-text-secondary prose-li:leading-7 prose-li:marker:text-primary
                            prose-ul:my-6 prose-ol:my-6
                            prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-surface/50 prose-blockquote:backdrop-blur-sm prose-blockquote:rounded-r-lg prose-blockquote:py-6 prose-blockquote:px-8 prose-blockquote:not-italic prose-blockquote:text-xl prose-blockquote:font-medium prose-blockquote:text-text-primary prose-blockquote:my-10
                            prose-img:rounded-2xl prose-img:shadow-xl prose-img:my-8
                        ">
                            {article.content || (
                                <p className="text-xl leading-relaxed text-text-secondary">
                                    {article.description}
                                </p>
                            )}
                        </div>

                        {/* References */}
                        <div className="mt-16 pt-8 border-t border-border/40">
                            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                                <Search size={20} className="text-primary" />
                                Sources & Citations
                            </h3>
                            <ReferenceList citations={article.citations || []} />
                        </div>

                        {/* Expert Review Badge */}
                        <InteractiveCard className="mt-12 flex items-center gap-5 p-6 bg-surface/40 backdrop-blur-md">
                            <div className="w-14 h-14 bg-success/10 rounded-full flex items-center justify-center text-success border border-success/20 shadow-inner">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </div>
                            <div>
                                <p className="text-base font-bold text-text-primary mb-1">Medically Reviewed</p>
                                <p className="text-sm text-text-secondary mb-1">By <span className="font-semibold text-text-primary">Dr. Sarah Chen, PhD</span>, Clinical Psychologist</p>
                                <p className="text-xs text-text-tertiary">Ensuring accuracy and clinical relevance.</p>
                            </div>
                        </InteractiveCard>
                    </motion.article>

                    {/* Right Column (TOC & Related) */}
                    <div className="hidden lg:block lg:col-span-4 pl-8">
                        <div className="sticky top-32 space-y-8">
                            <InteractiveCard className="p-6 bg-surface/30 backdrop-blur-sm border-white/5">
                                <h3 className="font-bold text-text-primary mb-4 text-xs uppercase tracking-widest text-primary">On this page</h3>
                                <TableOfContents />
                            </InteractiveCard>

                            <div>
                                <h3 className="font-bold text-text-primary mb-4 text-xs uppercase tracking-widest pl-1">Related Articles</h3>
                                <div className="space-y-4">
                                    {relatedArticles.map(rel => (
                                        <Link key={rel.id} to={`/learn/article/${rel.id}`} className="block group">
                                            <InteractiveCard className="flex gap-4 p-3 hover:bg-surface-hover/50 transition-colors">
                                                <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                                                    <img src={rel.image} alt={rel.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                </div>
                                                <div className="flex flex-col justify-center">
                                                    <h4 className="font-bold text-sm text-text-primary leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                                        {rel.title}
                                                    </h4>
                                                    <p className="text-xs text-text-tertiary">{rel.readTime} min read</p>
                                                </div>
                                            </InteractiveCard>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <Card className="p-6 bg-gradient-to-br from-primary/10 to-transparent border-primary/20 overflow-hidden relative">
                                <div className="relative z-10">
                                    <h4 className="font-bold text-lg text-primary mb-2">Need professional help?</h4>
                                    <p className="text-sm text-text-secondary mb-4">Connect with licensed therapists who understand what you're going through.</p>
                                    <Button size="sm" className="w-full shadow-lg shadow-primary/20" onClick={() => navigate('/find-care')}>Find a Provider</Button>
                                </div>
                                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl" />
                            </Card>
                        </div>
                    </div>

                </div>
            </main>

            {/* Mobile Footer Area */}
            <section className="bg-surface/50 backdrop-blur-md py-12 px-6 border-t border-border/50 lg:hidden">
                <div className="container mx-auto max-w-[1280px]">
                    <h3 className="font-display font-bold text-2xl text-text-primary mb-8">Related Articles</h3>
                    <div className="grid grid-cols-1 gap-6">
                        {relatedArticles.map(rel => (
                            <ArticleCard key={rel.id} article={rel} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ArticlePage;
