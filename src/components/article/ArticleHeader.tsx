import React, { useState } from 'react';
import { Calendar, Clock, Share2, Bookmark } from 'lucide-react';
import { Article } from '../../types';
import Badge from '../ui/Badge';
import { useBookmarks } from '../../context/BookmarkContext';
import Breadcrumbs from '../ui/Breadcrumbs';
import { getCategoryBadgeClasses } from '../../config/categoryThemes';
import AuthModal from '../auth/AuthModal';
import AuthorLink from './AuthorLink';

interface ArticleHeaderProps {
  article: Article;
}

const ArticleHeader: React.FC<ArticleHeaderProps> = ({ article }) => {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(article.id);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleBookmark = () => {
    const toggled = toggleBookmark(article.id);
    if (!toggled) {
      setShowAuthModal(true);
    }
  };

  return (
    <header className="max-w-4xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 lg:pt-32 pb-12 text-center md:text-left">
      {/* Breadcrumb */}
      <div className="flex justify-center md:justify-start mb-8">
        <Breadcrumbs
          pageData={{
            title: article.title,
            category: article.category.name,
            categorySlug: article.category.slug
          }}
        />
      </div>

      <div className="mb-8">
        <Badge variant="neutral" className={`mb-6 ${getCategoryBadgeClasses(article.category.slug)}`}>{article.category.name}</Badge>
        <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-text-primary leading-[1.1] mb-6">
          {article.title}
        </h1>

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-2">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="neutral" className="bg-surface-hover text-text-secondary border border-border">
                #{tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Author & Meta */}
      <div className="flex flex-col md:flex-row items-center md:justify-between gap-6 border-t border-b border-border py-6">
        <div className="flex items-center gap-4">
          {article.author?.image && (
            <img
              src={article.author.image}
              alt={article.author.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-surface dark:border-border shadow-sm"
            />
          )}
          <div className="text-left">
            <AuthorLink author={article.author} className="font-bold text-text-primary text-sm" />
            <div className="text-xs text-text-tertiary font-medium">{article.author?.role || 'Medical Review Team'}</div>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-text-tertiary">
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-teal-500" />
            <span>{article.publishedAt || 'Jan 1, 2025'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-teal-500" />
            <span>{article.readTime} min read</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button className="p-2.5 rounded-full hover:bg-surface-hover text-text-tertiary hover:text-text-primary transition-colors">
            <Share2 size={18} />
          </button>
          <button
            onClick={handleBookmark}
            className={`p-2.5 rounded-full transition-colors ${bookmarked
              ? 'bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400'
              : 'hover:bg-surface-hover text-text-tertiary hover:text-text-primary'
              }`}
            title={bookmarked ? "Remove Bookmark" : "Save Article"}
          >
            <Bookmark size={18} fill={bookmarked ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </header>
  );
};

export default ArticleHeader;
