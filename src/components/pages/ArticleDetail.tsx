import React, { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
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
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [article]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#050505] text-gray-900 dark:text-white">Loading...</div>;
  }

  if (!article) {
    return <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#050505] text-gray-900 dark:text-white">Article not found</div>;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] relative transition-colors duration-300">
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
          className="w-12 h-12 rounded-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 hover:border-teal-200 dark:hover:border-teal-800 transition-all"
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
      <main className="container mx-auto max-w-[1280px] px-6 pb-24">
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
                  prose-p:text-lg prose-p:leading-8 prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:mb-6
                  prose-a:text-teal-600 dark:prose-a:text-teal-400 prose-a:no-underline hover:prose-a:underline
                  prose-strong:font-bold prose-strong:text-gray-900 dark:prose-strong:text-white
                  prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-li:leading-7
                  prose-blockquote:border-l-4 prose-blockquote:border-teal-500 prose-blockquote:bg-gray-50 dark:prose-blockquote:bg-gray-800/50 prose-blockquote:rounded-r-lg prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:not-italic
                  text-gray-800 dark:text-gray-200
                ">
              {article.content || (
                // Fallback if no rich content defined
                <p className="text-xl leading-relaxed text-gray-700 dark:text-gray-300">
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
              <h3 className="font-bold text-gray-900 dark:text-white mb-6 text-sm uppercase tracking-wider">Related Articles</h3>
              <div className="space-y-6">
                {relatedArticles.map(rel => (
                  <div key={rel.id} className="group cursor-pointer" onClick={() => navigate(`/learn/article/${rel.id}`)}>
                    <div className="aspect-video rounded-lg overflow-hidden mb-3">
                      <img src={rel.image} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <h4 className="font-bold text-gray-900 dark:text-white leading-tight mb-1 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                      {rel.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Crisis Resources */}
      <CrisisResources />

      {/* Related Articles (Mobile/Bottom) */}
      <section className="bg-gray-50 dark:bg-[#0a0a0a] py-24 px-6 border-t border-gray-200 dark:border-gray-800 lg:hidden">
        <div className="container mx-auto max-w-[1280px]">
          <h3 className="font-display font-bold text-3xl text-gray-900 dark:text-white mb-12">Related Articles</h3>
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