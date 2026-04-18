import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowUpRight, Bookmark } from 'lucide-react';
import Badge from '../ui/Badge';
import { Article } from '../../types';
import { NoiseTexture } from '../home/hero/HeroAssets';
import { useBookmarks } from '../../context/BookmarkContext';
import InteractiveCard from '../ui/InteractiveCard';
import { getCategoryTheme, getCategoryBadgeClasses } from '../../config/categoryThemes';
import AuthModal from '../auth/AuthModal';

interface ArticleCardProps {
  article: Article;
  onClick?: () => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onClick }) => {
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const bookmarked = isBookmarked(article.id);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [imgError, setImgError] = useState(false);
  const theme = getCategoryTheme(article.category.slug);
  const FallbackIcon = theme.icon;

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    const toggled = toggleBookmark(article.id);
    if (!toggled) {
      setShowAuthModal(true);
    }
  };

  return (
    <InteractiveCard
      className={`group h-full flex flex-col cursor-pointer shadow-sm hover:shadow-md bg-surface ${theme.classes.border} ${theme.classes.borderDark} hover:border-primary/20 transition-all duration-300`}
      onClick={onClick}
      spotlightColor={getCategoryTheme(article.category.slug).classes.spotlight}
    >
      {/* Texture Overlay */}
      <NoiseTexture opacity={0.03} />

      {/* Image Container */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-active rounded-t-2xl">
        {article.image && !imgError ? (
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center ${theme.classes.bgLight} ${theme.classes.bgLightDark}`}>
            <FallbackIcon size={48} className={`${theme.classes.text} ${theme.classes.textDark} opacity-40`} />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category Badge - Floating */}
        <div className="absolute top-4 left-4 z-10">
          <Badge variant="neutral" className={`backdrop-blur-sm border-0 shadow-sm ${getCategoryBadgeClasses(article.category.slug)}`}>
            {article.category.name}
          </Badge>
        </div>

        {/* Bookmark Button - Floating Right */}
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={handleBookmark}
          className={`absolute top-4 right-4 z-20 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 ${bookmarked
            ? 'bg-primary text-white shadow-lg shadow-primary/40'
            : 'bg-black/30 text-white hover:bg-white dark:hover:bg-neutral-800 hover:text-primary'
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
          <h3 className="font-display font-bold text-xl text-text-primary leading-tight group-hover:text-primary transition-colors line-clamp-2">
            {article.title}
          </h3>
          <ArrowUpRight size={20} className="text-text-tertiary group-hover:text-primary group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300 shrink-0" />
        </div>

        <p className="text-text-secondary text-sm leading-relaxed line-clamp-2 mb-6 flex-grow">
          {article.description}
        </p>

        {/* Footer */}
        <div className="flex items-center text-text-tertiary text-xs font-bold uppercase tracking-wider pt-4 border-t border-border/50 mt-auto">
          <Clock size={14} className="mr-2 text-primary" />
          <span>{article.readTime} min read</span>
        </div>
      </div>
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </InteractiveCard>
  );
};

export default ArticleCard;
