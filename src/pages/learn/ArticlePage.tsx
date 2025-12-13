import React, { useEffect, useState } from 'react';
import { Share2, Bookmark, ChevronRight } from 'lucide-react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useArticleService } from '@/services/articleService';
import { Article } from '@/types/models';
import ReadingProgress from '@/components/article/ReadingProgress';
import ArticleHeader from '@/components/article/ArticleHeader';
import TableOfContents from '@/components/article/TableOfContents';
import ArticleCard from '@/components/article/ArticleCard';
import ReferenceList from '@/components/article/ReferenceList';

import SEO from '@/components/SEO';
import Button from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
// Removed unused Heading, Paragraph imports

const ArticlePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [article, setArticle] = useState<Article | undefined>();
    const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const articleService = useArticleService();

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
        return <div className="min-h-screen flex items-center justify-center bg-background text-text-primary">Loading...</div>;
    }

    if (!article) {
        return <div className="min-h-screen flex items-center justify-center bg-background text-text-primary">Article not found</div>;
    }

    return (
        <div className="min-h-screen bg-background relative transition-colors duration-300 pt-20">
            <SEO
                title={`${article.title} | Psychage`}
                description={article.description}
                image={article.image}
                type="article"
            />
            <ReadingProgress />

            {/* Breadcrumb */}
            <div className="container mx-auto max-w-[1280px] px-6 py-4">
                <nav className="flex items-center text-sm text-text-tertiary">
                    <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                    <ChevronRight size={14} className="mx-2" />
                    <Link to="/learn" className="hover:text-primary transition-colors">Learn</Link>
                    <ChevronRight size={14} className="mx-2" />
                    <Link to={`/learn/${article.category.slug}`} className="hover:text-primary transition-colors">{article.category.name}</Link>
                    <ChevronRight size={14} className="mx-2" />
                    <span className="text-text-primary font-medium truncate max-w-[200px]">{article.title}</span>
                </nav>
            </div>

            <ArticleHeader article={article} />

            {/* Hero Image */}
            <div className="container mx-auto max-w-5xl px-6 mb-12">
                <div className="relative aspect-[21/9] w-full overflow-hidden rounded-[2rem] shadow-xl shadow-shadow/10">
                    <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
            </div>

            {/* Main Layout */}
            <main className="container mx-auto max-w-[1280px] px-6 pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Left Sidebar (Share/Citations) */}
                    <div className="hidden lg:block lg:col-span-1">
                        <div className="sticky top-32 flex flex-col gap-4">
                            <Button variant="secondary" size="sm" className="w-10 h-10 p-0 rounded-full" aria-label="Share">
                                <Share2 size={18} />
                            </Button>
                            <Button variant="secondary" size="sm" className="w-10 h-10 p-0 rounded-full" aria-label="Bookmark">
                                <Bookmark size={18} />
                            </Button>
                        </div>
                    </div>

                    {/* Content Area */}
                    <article className="lg:col-span-8">
                        {/* Disclaimer Banner */}
                        <div className="bg-primary/5 border-l-4 border-primary p-4 mb-8 rounded-r-lg">
                            <p className="text-sm text-text-secondary">
                                <span className="font-bold text-primary">Medical Disclaimer:</span> This content is for educational purposes only and does not constitute medical advice.
                            </p>
                        </div>

                        <div className="
                  prose prose-lg max-w-none 
                  prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight
                  prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
                  prose-p:text-lg prose-p:leading-8 prose-p:text-text-secondary prose-p:mb-6
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                  prose-strong:font-bold prose-strong:text-text-primary
                  prose-li:text-text-secondary prose-li:leading-7
                  prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-surface prose-blockquote:rounded-r-lg prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:not-italic
                  text-text-primary
                ">
                            {article.content || (
                                <p className="text-xl leading-relaxed text-text-secondary">
                                    {article.description}
                                </p>
                            )}
                        </div>

                        {/* References */}
                        <div className="mt-12 pt-8 border-t border-border">
                            <h3 className="font-bold text-lg mb-4">Sources & Citations</h3>
                            <ReferenceList citations={article.citations || []} />
                        </div>

                        {/* Expert Review Badge */}
                        <div className="mt-8 flex items-center gap-4 p-4 bg-surface rounded-xl border border-border">
                            <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center text-success">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-text-primary">Medically Reviewed</p>
                                <p className="text-xs text-text-secondary">By Dr. Sarah Chen, PhD, Clinical Psychologist</p>
                            </div>
                        </div>
                    </article>

                    {/* Right Column (TOC & Related) */}
                    <div className="hidden lg:block lg:col-span-3">
                        <div className="sticky top-32 space-y-8">
                            <div>
                                <h3 className="font-bold text-text-primary mb-4 text-xs uppercase">On this page</h3>
                                <TableOfContents />
                            </div>

                            <div>
                                <h3 className="font-bold text-text-primary mb-4 text-xs uppercase">Related Articles</h3>
                                <div className="space-y-4">
                                    {relatedArticles.map(rel => (
                                        <div key={rel.id} className="group cursor-pointer" onClick={() => navigate(`/learn/article/${rel.id}`)}>
                                            <div className="aspect-video rounded-lg overflow-hidden mb-2 bg-surface-hover">
                                                <img src={rel.image} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            </div>
                                            <h4 className="font-bold text-sm text-text-primary leading-tight mb-1 group-hover:text-primary transition-colors">
                                                {rel.title}
                                            </h4>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Card className="p-4 bg-primary/5 border-primary/20">
                                <h4 className="font-bold text-primary mb-2">Need professional help?</h4>
                                <Button size="sm" className="w-full" onClick={() => navigate('/find-care')}>Find a Provider</Button>
                            </Card>
                        </div>
                    </div>

                </div>
            </main>

            {/* Mobile Footer Area */}
            <section className="bg-surface py-12 px-6 border-t border-border lg:hidden">
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
