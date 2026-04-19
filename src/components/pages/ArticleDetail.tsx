import React, { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { articleService } from '../../services/articleService';
import { Article } from '../../types/models';
import ReadingProgress from '../article/ReadingProgress';
import ArticleHeader from '../article/ArticleHeader';
import TableOfContents from '../article/TableOfContents';
import ArticleCard from '../article/ArticleCard';
import Disclaimer from '../article/Disclaimer';
import ReferenceList from '../article/ReferenceList';
import CrisisResources from '../layout/CrisisResources';
import SEO from '../SEO';
import { getArticleUrl } from '../../lib/articleUrl';

const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | undefined>();
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setLoading(true);
        try {
          const foundArticle = await articleService.getById(id);
          // Defense-in-depth: only render published articles on public site
          if (foundArticle?.status && foundArticle.status !== 'published') {
            setArticle(undefined);
          } else {
            setArticle(foundArticle);
          }

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
  }, [id]);

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
    <div className="min-h-screen bg-background relative transition-colors duration-300">
      <SEO
        title={`${article.title} | Psychage`}
        description={article.description}
        image={article.image}
        type="article"
      />
      <ReadingProgress />

      {/* Back Button (Sticky) */}
      <div className="fixed top-24 left-6 z-40 hidden xl:block">
        <button
          onClick={() => navigate('/')}
          className="w-12 h-12 rounded-full bg-surface border border-border shadow-sm flex items-center justify-center text-text-tertiary hover:text-teal-600 dark:hover:text-teal-400 hover:border-teal-200 dark:hover:border-teal-800 transition-all"
        >
          <ArrowLeft size={20} />
        </button>
      </div>

      <ArticleHeader article={article} />

      {/* Hero Image */}
      <div className="container mx-auto max-w-5xl px-6 mb-16">
        <div className="relative aspect-[21/9] w-full overflow-hidden rounded-[2rem] shadow-xl shadow-gray-200/50 dark:shadow-black/50">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      </div>

      {/* Main Layout */}
      <main className="container mx-auto max-w-content px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Sidebar (TOC) */}
          <aside className="lg:col-span-3">
            <TableOfContents />
          </aside>

          {/* Content Area */}
          <article className="lg:col-span-6">
            <div className="
                  prose prose-lg max-w-none 
                  prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight
                  prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
                  prose-p:text-lg prose-p:leading-8 prose-p:text-text-secondary prose-p:mb-6
                  prose-a:text-teal-600 dark:prose-a:text-teal-400 prose-a:no-underline hover:prose-a:underline
                  prose-strong:font-bold prose-strong:text-text-primary
                  prose-li:text-text-secondary prose-li:leading-7
                  prose-blockquote:border-l-4 prose-blockquote:border-teal-500 prose-blockquote:bg-surface prose-blockquote:rounded-r-lg prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:not-italic
                  text-text-secondary
                ">
              {article.content || (
                // Fallback if no rich content defined
                <p className="text-xl leading-relaxed text-text-secondary">
                  {article.description}
                </p>
              )}
            </div>

            {/* References */}
            <ReferenceList citations={article.citations || []} />

            {/* Disclaimer */}
            <div className="mt-12">
              <Disclaimer type="medical" />
            </div>
          </article>

          {/* Right Column (Related Articles Sidebar) */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-32">
              <h3 className="font-bold text-text-primary mb-6 text-sm uppercase tracking-wider">Related Articles</h3>
              <div className="space-y-6">
                {relatedArticles.map(rel => (
                  <Link key={rel.id} to={getArticleUrl(rel)} className="group block">
                    <div className="aspect-video rounded-lg overflow-hidden mb-3">
                      <img src={rel.image} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <h4 className="font-bold text-text-primary leading-tight mb-1 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-text-tertiary line-clamp-2">
                      {rel.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Crisis Resources */}
      <CrisisResources />

      {/* Related Articles (Mobile/Bottom) */}
      <section className="bg-surface py-24 px-6 border-t border-border lg:hidden">
        <div className="container mx-auto max-w-content">
          <h3 className="font-display font-bold text-3xl text-text-primary mb-12">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedArticles.map(rel => (
              <div key={rel.id} className="h-96">
                <ArticleCard article={rel} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArticleDetail;