
import React from 'react';
import { ChevronRight, Calendar, Clock, Share2, Bookmark } from 'lucide-react';
import { Article } from '../../types';
import Badge from '../ui/Badge';
import { useBookmarks } from '../../context/BookmarkContext';

interface ArticleHeaderProps {
  article: Article;
}

const ArticleHeader: React.FC<ArticleHeaderProps> = ({ article }) => {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(article.id);

  return (
    <header className="max-w-4xl mx-auto px-6 pt-32 pb-12 text-center md:text-left">
      {/* Breadcrumb */}
      <nav className="flex items-center justify-center md:justify-start gap-2 text-sm text-gray-500 mb-8 overflow-x-auto whitespace-nowrap">
        <span className="hover:text-teal-600 cursor-pointer transition-colors">Home</span>
        <ChevronRight size={14} />
        <span className="hover:text-teal-600 cursor-pointer transition-colors">Learn</span>
        <ChevronRight size={14} />
        <span className="font-semibold text-teal-700">{article.category}</span>
      </nav>

      <div className="mb-8">
        <Badge variant="teal" className="mb-6">{article.category}</Badge>
        <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-gray-900 leading-[1.1] mb-6 dark:text-white">
          {article.title}
        </h1>
        
        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-2">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="neutral" className="bg-gray-100 text-gray-600 border border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700">
                #{tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Author & Meta */}
      <div className="flex flex-col md:flex-row items-center md:justify-between gap-6 border-t border-b border-gray-100 dark:border-gray-800 py-6">
        <div className="flex items-center gap-4">
          {article.author?.image && (
            <img 
                src={article.author.image} 
                alt={article.author.name} 
                className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-sm"
            />
          )}
          <div className="text-left">
            <div className="font-bold text-gray-900 dark:text-white text-sm">{article.author?.name || 'Psychage Editorial'}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">{article.author?.role || 'Medical Review Team'}</div>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
           <div className="flex items-center gap-2">
             <Calendar size={14} className="text-teal-500" />
             <span>{article.date || 'Jan 1, 2025'}</span>
           </div>
           <div className="flex items-center gap-2">
             <Clock size={14} className="text-teal-500" />
             <span>{article.readTime} min read</span>
           </div>
        </div>

        <div className="flex gap-2">
             <button className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                <Share2 size={18} />
             </button>
             <button 
                onClick={() => toggleBookmark(article.id)}
                className={`p-2.5 rounded-full transition-colors ${
                  bookmarked 
                    ? 'bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
                title={bookmarked ? "Remove Bookmark" : "Save Article"}
             >
                <Bookmark size={18} fill={bookmarked ? "currentColor" : "none"} />
             </button>
        </div>
      </div>
    </header>
  );
};

export default ArticleHeader;
