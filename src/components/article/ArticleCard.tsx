import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowUpRight, Bookmark } from 'lucide-react';
import Badge from '../ui/Badge';
import { Article } from '../../types';
import { NoiseTexture } from '../home/hero/HeroAssets';
import { useBookmarks } from '../../context/BookmarkContext';
import InteractiveCard from '../ui/InteractiveCard';

interface ArticleCardProps {
  article: Article;
  onClick?: () => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onClick }) => {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(article.id);

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleBookmark(article.id);
  };

  return (
    <InteractiveCard
      className="group h-full flex flex-col cursor-pointer border-white/5 bg-white/5 backdrop-blur-sm dark:bg-white/5 dark:border-white/5 hover:border-primary/20 hover:bg-white/10 transition-all duration-300"
      onClick={onClick}
      spotlightColor="rgba(20, 184, 166, 0.15)"
    >
      {/* Texture Overlay */}
      <NoiseTexture opacity={0.03} />

      {/* Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-t-2xl">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category Badge - Floating */}
        <div className="absolute top-4 left-4 z-10">
          <Badge variant="neutral" className="bg-white/90 backdrop-blur-sm dark:bg-black/80 text-gray-900 dark:text-white border-0 shadow-sm">
            {article.category.name}
          </Badge>
        </div>

        {/* Bookmark Button - Floating Right */}
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={handleBookmark}
          className={`absolute top-4 right-4 z-20 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 ${bookmarked
            ? 'bg-primary text-white shadow-lg shadow-primary/40'
            : 'bg-black/30 text-white hover:bg-white hover:text-primary'
            }`}
        >
          <motion.div
            initial={false}
            animate={{
              scale: bookmarked ? [1, 1.3, 1] : 1,
              rotate: bookmarked ? [0, -15, 15, 0] : 0
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Bookmark size={18} fill={bookmarked ? "currentColor" : "none"} />
          </motion.div>
        </motion.button>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col flex-grow p-6">
        <div className="flex justify-between items-start mb-3 gap-4">
          <h3 className="font-display font-bold text-xl text-gray-900 dark:text-gray-100 leading-tight group-hover:text-primary transition-colors line-clamp-2">
            {article.title}
          </h3>
          <ArrowUpRight size={20} className="text-gray-400 group-hover:text-primary group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300 shrink-0" />
        </div>

        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-2 mb-6 flex-grow">
          {article.description}
        </p>

        {/* Footer */}
        <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider pt-4 border-t border-gray-100/10 dark:border-gray-800/50 mt-auto">
          <Clock size={14} className="mr-2 text-primary" />
          <span>{article.readTime} min read</span>
        </div>
      </div>
    </InteractiveCard>
  );
};

export default ArticleCard;
