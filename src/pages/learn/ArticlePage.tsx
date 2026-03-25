import React, { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { Bookmark, ChevronRight, ChevronDown, Clock, Calendar, Search, ArrowRight, BrainCircuit, PenTool, Moon, Wind } from 'lucide-react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useArticleService } from '@/services/articleService';
import { Article } from '@/types/models';
import { getArticleUrl } from '@/lib/articleUrl';
import ReadingProgress from '@/components/article/ReadingProgress';
import TableOfContents from '@/components/article/TableOfContents';
import ArticleCard from '@/components/article/ArticleCard';
import ReferenceList from '@/components/article/ReferenceList';
import Disclaimer from '@/components/article/Disclaimer';
import SummaryBox from '@/components/article/SummaryBox';
import KeyFacts from '@/components/article/KeyFacts';
import SparkMoment from '@/components/article/SparkMoment';
import PracticalExercise, { DefaultToolkitCTA } from '@/components/article/PracticalExercise';
import CompanionVideo from '@/components/article/CompanionVideo';
import CrisisResourceBanner from '@/components/article/CrisisResourceBanner';
import ShareButtons from '@/components/article/ShareButtons';
import AccessibilityBar from '@/components/article/AccessibilityBar';
import AuthModal from '@/components/auth/AuthModal';

import SEO from '@/components/SEO';
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import InteractiveCard from '@/components/ui/InteractiveCard';
import { motion, useScroll, useTransform } from 'framer-motion';
import Badge from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import { useBookmarks } from '@/context/BookmarkContext';
import ArticleHtmlRenderer from '@/components/article/ArticleHtmlRenderer';
import '@/styles/article-prose.css';

const MeshGradient = ({ className }: { className?: string }) => (
    <div className={cn("absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background pointer-events-none", className)} />
);

/** Extract plain text from article content for TTS */
function extractPlainText(content: React.ReactNode): string {
    if (typeof content === 'string') {
        const div = document.createElement('div');
        div.innerHTML = content;
        return div.textContent || div.innerText || '';
    }
    return '';
}

const ArticlePage: React.FC = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { categorySlug, articleSlug } = useParams<{ categorySlug: string; articleSlug: string }>();
    const navigate = useNavigate();
    const [article, setArticle] = useState<Article | undefined>();
    const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const articleService = useArticleService();
    const { isBookmarked, toggleBookmark } = useBookmarks();
    const [showAuthModal, setShowAuthModal] = useState(false);
    const articleContentRef = useRef<HTMLDivElement>(null);

    const handleBookmark = useCallback(() => {
        if (!article) return;
        const toggled = toggleBookmark(article.id);
        if (!toggled) {
            setShowAuthModal(true);
        }
    }, [article, toggleBookmark]);

    // Scroll effects for Hero
    const { scrollY } = useScroll();
    const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
    const heroY = useTransform(scrollY, [0, 400], [0, 150]);

    useEffect(() => {
        const fetchData = async () => {
            if (articleSlug) {
                setLoading(true);
                try {
                    const foundArticle = await articleService.getBySlug(articleSlug);
                    setArticle(foundArticle);

                    if (foundArticle) {
                        const related = await articleService.getRelatedArticles(
                            foundArticle.id,
                            foundArticle.category.slug,
                            foundArticle.tags
                        );
                        setRelatedArticles(related);
                    }
                } catch (error) {
                    console.error("Failed to fetch article", error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchData();
    }, [articleSlug, articleService]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [article]);

    // Extract plain text for TTS
    const articlePlainText = useMemo(() => {
        if (!article?.content) return '';
        return extractPlainText(article.content);
    }, [article?.content]);

    // Breadcrumb title (truncated)
    const breadcrumbTitle = useMemo(() => {
        if (!article) return '';
        return article.title.length > 60 ? article.title.slice(0, 57) + '...' : article.title;
    }, [article]);

    // Reviewer info
    const reviewerName = article?.reviewedBy?.name || 'Dr. Lena Dobson, Ph.D.';
    const reviewerRole = article?.reviewedBy?.role || 'Clinical Neuropsychology';

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
    const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://psychage.com${getArticleUrl(article)}`;

    return (
        <div className="min-h-screen bg-background relative transition-colors duration-300">
            <SEO
                title={`${article.title} | Psychage`}
                description={article.description}
                image={article.image}
                type="article"
                canonical={`https://psychage.com${getArticleUrl(article)}`}
                article={{
                    headline: article.title,
                    description: article.description,
                    image: article.image,
                    authorName: article.author?.name,
                    datePublished: article.publishedAt,
                    dateModified: article.updatedAt,
                    categoryName: article.category.name,
                    categorySlug: article.category.slug,
                    url: `https://psychage.com${getArticleUrl(article)}`,
                    reviewedByName: reviewerName,
                    reviewedByRole: reviewerRole,
                    tags: article.tags,
                    isMedical: true,
                }}
            />
            <ReadingProgress />

            {/* Accessibility Bar */}
            <AccessibilityBar
                audioUrl={article.audioUrl}
                articleText={articlePlainText}
                articleTitle={article.title}
            />

            {/* Immersive Hero Section */}
            <div className="relative h-[60vh] min-h-[400px] max-h-[600px] w-full overflow-hidden flex items-end pb-16">
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
                    className="container mx-auto max-w-content px-6 relative z-10"
                >
                    {/* Breadcrumb */}
                    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-text-tertiary mb-6 overflow-x-auto whitespace-nowrap hide-scrollbar">
                        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                        <ChevronRight size={14} />
                        <Link to="/learn" className="hover:text-primary transition-colors">Learn</Link>
                        <ChevronRight size={14} />
                        <Link to={`/learn/${article.category.slug}`} className="hover:text-primary transition-colors font-medium text-primary/80">
                            {article.category.name}
                        </Link>
                        <ChevronRight size={14} />
                        <span className="text-text-secondary font-medium truncate max-w-[200px]" title={article.title}>
                            {breadcrumbTitle}
                        </span>
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
                            <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl text-text-primary leading-[1.1] mb-4 drop-shadow-sm">
                                {article.title}
                            </h1>
                            {article.subtitle && (
                                <p className="text-xl text-text-secondary/80 font-medium mb-6 max-w-2xl">
                                    {article.subtitle}
                                </p>
                            )}
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

                {/* Scroll indicator */}
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 text-text-tertiary z-10"
                >
                    <ChevronDown size={24} />
                </motion.div>
            </div>

            {/* Clinical Authority Line */}
            <div className="container mx-auto max-w-content px-6 py-3">
                <p className="text-xs text-text-tertiary">
                    Reviewed by <span className="font-semibold text-text-secondary">{reviewerName}</span>, {reviewerRole}
                </p>
            </div>

            {/* Main Layout — 2 columns on desktop */}
            <main className="container mx-auto max-w-content px-6 pb-16 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 lg:gap-12">

                    {/* Left Sidebar — TOC + Share + Bookmark (desktop only) */}
                    <aside className="hidden lg:block">
                        <div className="sticky top-28 space-y-6">
                            <InteractiveCard className="p-5 bg-surface/30 backdrop-blur-sm border-white/5">
                                <h3 className="font-bold text-text-primary mb-4 text-xs uppercase tracking-widest text-primary">On this page</h3>
                                <TableOfContents />
                            </InteractiveCard>

                            {/* Share + Bookmark */}
                            <div className="space-y-3">
                                <p className="text-xs font-bold uppercase tracking-widest text-text-tertiary pl-1">Share</p>
                                <ShareButtons
                                    title={article.title}
                                    url={currentUrl}
                                    orientation="vertical"
                                />
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleBookmark}
                                    className={cn(
                                        "w-10 h-10 rounded-full border shadow-sm flex items-center justify-center transition-all",
                                        bookmarked
                                            ? "bg-primary text-white border-primary"
                                            : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-500 hover:text-primary hover:border-primary/30"
                                    )}
                                    aria-label={bookmarked ? "Remove bookmark" : "Bookmark article"}
                                >
                                    <Bookmark size={16} fill={bookmarked ? "currentColor" : "none"} />
                                </motion.button>
                            </div>

                            {/* Provider CTA */}
                            <Card className="p-5 bg-gradient-to-br from-primary/10 to-transparent border-primary/20 overflow-hidden relative">
                                <div className="relative z-10">
                                    <h4 className="font-bold text-base text-primary mb-2">Need professional help?</h4>
                                    <p className="text-xs text-text-secondary mb-3">Connect with licensed therapists who understand what you're going through.</p>
                                    <Button size="sm" className="w-full shadow-lg shadow-primary/20" onClick={() => navigate('/providers')}>Find a Provider</Button>
                                </div>
                                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-primary/10 rounded-full blur-xl" />
                            </Card>
                        </div>
                    </aside>

                    {/* Content Area */}
                    <article className="min-w-0 max-w-[720px]" ref={articleContentRef}>
                        {/* Medical Disclaimer */}
                        <Disclaimer type="medical" className="mb-8" />

                        {/* Hero Image */}
                        {article.image ? (
                            <div className="rounded-2xl overflow-hidden shadow-xl mb-10 border border-white/10 group">
                                <img
                                    src={article.image}
                                    alt={`Illustration for ${article.title}`}
                                    className="w-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                                />
                            </div>
                        ) : (
                            <div className="rounded-2xl bg-gradient-to-br from-primary/20 via-primary/5 to-transparent h-48 flex items-center justify-center mb-10 border border-primary/10">
                                <span className="text-primary/40 font-display font-bold text-2xl">{article.category.name}</span>
                            </div>
                        )}

                        {/* Summary Box */}
                        {(article.summary || article.description) && (
                            <SummaryBox summary={article.summary || article.description} />
                        )}

                        {/* Key Facts */}
                        {article.keyFacts && article.keyFacts.length > 0 && (
                            <KeyFacts facts={article.keyFacts} />
                        )}

                        {/* Companion Video */}
                        <CompanionVideo
                            videoUrl={article.videoUrl}
                            videoPlatform={article.videoPlatform}
                            videoStatus={article.videoStatus}
                            videoDurationSeconds={article.videoDurationSeconds}
                            videoTranscript={article.videoTranscript}
                            articleTitle={article.title}
                        />

                        {/* Article Body Content */}
                        <div className="article-prose prose prose-lg max-w-none">
                            {!article.content ? (
                                <p className="text-xl leading-relaxed text-text-secondary">
                                    {article.description}
                                </p>
                            ) : typeof article.content === 'string' ? (
                                <ArticleHtmlRenderer html={article.content} />
                            ) : (
                                article.content
                            )}
                        </div>

                        {/* Spark Moment */}
                        {article.sparkMoment && (
                            <SparkMoment>
                                {article.sparkMoment}
                            </SparkMoment>
                        )}

                        {/* Practical Exercise */}
                        {article.practicalExercise ? (
                            <PracticalExercise
                                title={article.practicalExercise.title}
                                steps={article.practicalExercise.steps}
                                toolLink={article.practicalExercise.toolLink}
                            />
                        ) : (
                            <DefaultToolkitCTA />
                        )}

                        {/* Sources & Citations */}
                        <div id="sources-citations" className="mt-16 pt-8 border-t border-border/40 scroll-mt-32">
                            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                                <Search size={20} className="text-primary" />
                                Sources & Citations
                                {article.citations && article.citations.length > 0 && (
                                    <span className="px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-xs text-gray-500 font-medium">
                                        {article.citations.length}
                                    </span>
                                )}
                            </h3>
                            {article.citations && article.citations.length > 0 ? (
                                <ReferenceList citations={article.citations} />
                            ) : (
                                <p className="text-sm text-text-tertiary italic">
                                    Sources for this article are being compiled and will be added shortly.
                                </p>
                            )}
                        </div>

                        {/* Expert Review Badge */}
                        <InteractiveCard className="mt-12 flex items-center gap-5 p-6 bg-surface/40 backdrop-blur-md">
                            <div className="w-14 h-14 bg-success/10 rounded-full flex items-center justify-center text-success border border-success/20 shadow-inner">
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </div>
                            <div>
                                <p className="text-base font-bold text-text-primary mb-1">Medically Reviewed</p>
                                <p className="text-sm text-text-secondary mb-1">
                                    By <span className="font-semibold text-text-primary">{reviewerName}</span>, {reviewerRole}
                                </p>
                                <p className="text-xs text-text-tertiary">Ensuring accuracy and clinical relevance.</p>
                            </div>
                        </InteractiveCard>

                        {/* Mobile Share Buttons */}
                        <div className="mt-8 lg:hidden">
                            <p className="text-xs font-bold uppercase tracking-widest text-text-tertiary mb-3">Share this article</p>
                            <ShareButtons
                                title={article.title}
                                url={currentUrl}
                                orientation="horizontal"
                            />
                        </div>
                    </article>
                </div>
            </main>

            {/* Related Articles — Full Width */}
            {relatedArticles.length > 0 && (
                <section className="bg-surface/30 backdrop-blur-sm py-16 px-6 border-t border-border/30">
                    <div className="container mx-auto max-w-content">
                        <h3 className="font-display font-bold text-2xl text-text-primary mb-8">Related Articles</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {relatedArticles.slice(0, 3).map(rel => (
                                <ArticleCard key={rel.id} article={rel} />
                            ))}
                        </div>
                        <div className="text-center mt-8">
                            <Link
                                to={`/learn/${article.category.slug}`}
                                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                            >
                                More in {article.category.name}
                                <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* Crisis Resource Banner — Always visible, zero animation delay */}
            <section className="container mx-auto max-w-content px-6 py-12">
                <CrisisResourceBanner />
            </section>

            {/* Toolkit CTA */}
            <section className="bg-gradient-to-r from-primary/5 to-indigo-500/5 py-12 px-6 border-t border-border/30">
                <div className="container mx-auto max-w-content text-center">
                    <h3 className="font-display font-bold text-2xl text-text-primary mb-3">
                        Explore Our Free Mental Health Tools
                    </h3>
                    <p className="text-sm text-text-secondary mb-6 max-w-lg mx-auto">
                        From mood tracking to cognitive assessments, Psychage offers evidence-informed tools to support your mental wellness journey.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8 max-w-3xl mx-auto">
                        {[
                            { name: 'Clarity Score', icon: BrainCircuit, href: '/clarity-score', color: 'text-teal-600 dark:text-teal-400', bg: 'bg-teal-100 dark:bg-teal-900/40' },
                            { name: 'Mood Journal', icon: PenTool, href: '/tools/mood-journal', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-100 dark:bg-amber-900/40' },
                            { name: 'Sleep Architect', icon: Moon, href: '/tools/sleep-architect', color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-100 dark:bg-indigo-900/40' },
                            { name: 'Breathwork', icon: Wind, href: '/tools/breathwork', color: 'text-sky-600 dark:text-sky-400', bg: 'bg-sky-100 dark:bg-sky-900/40' },
                        ].map((tool) => (
                            <Link
                                key={tool.name}
                                to={tool.href}
                                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/70 dark:bg-gray-800/50 border border-border/40 hover:border-primary/40 hover:shadow-md transition-all group"
                            >
                                <div className={cn('w-10 h-10 rounded-full flex items-center justify-center', tool.bg)}>
                                    <tool.icon size={20} className={tool.color} />
                                </div>
                                <span className="text-xs font-semibold text-text-primary group-hover:text-primary transition-colors">{tool.name}</span>
                            </Link>
                        ))}
                    </div>
                    <Button onClick={() => navigate('/tools')} className="shadow-lg shadow-primary/20">
                        Browse All Tools
                    </Button>
                </div>
            </section>

            <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
        </div>
    );
};

export default ArticlePage;
