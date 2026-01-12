import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { Video } from '../../data/videos';

const VIDEO_PLACEHOLDER = '/images/videos/video-placeholder.svg';

interface VideoCardProps {
  video: Video;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const [imageError, setImageError] = useState(false);
  // Format seconds to MM:SS
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Format views (e.g., 1200000 -> 1.2M)
  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return (views / 1000000).toFixed(1) + 'M';
    } else if (views >= 1000) {
      return (views / 1000).toFixed(0) + 'K';
    }
    return views.toString();
  };

  const handlePlay = () => {
    alert(`Playing: ${video.title}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handlePlay();
    }
  };

  return (
    <motion.div
      className="group relative cursor-pointer rounded-2xl outline-none focus-visible:ring-4 focus-visible:ring-teal-500/40"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      onClick={handlePlay}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Play video: ${video.title}`}
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-gray-900 shadow-md">
        <motion.img
          src={imageError ? VIDEO_PLACEHOLDER : video.thumbnail}
          alt={`Thumbnail for ${video.title}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => setImageError(true)}
        />
        
        {/* Dark Overlay on Hover */}
        <div className="absolute inset-0 bg-black/10 transition-colors duration-300 group-hover:bg-black/30" aria-hidden="true" />

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center" aria-hidden="true">
          <motion.div
            className="flex h-16 w-16 items-center justify-center rounded-full bg-white/30 backdrop-blur-md shadow-glow border border-white/50 text-teal-600 transition-all duration-300"
            whileHover={{ scale: 1.15, backgroundColor: "rgba(255, 255, 255, 0.45)" }}
          >
            <Play size={28} fill="currentColor" className="ml-1" />
          </motion.div>
          
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="mt-3 text-sm font-semibold text-white drop-shadow-md opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 translate-y-2"
          >
            Watch now
          </motion.span>
        </div>

        {/* Duration Badge */}
        <div 
          className="absolute bottom-3 right-3 rounded-md bg-black/80 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm"
          aria-label={`Duration: ${formatDuration(video.duration)}`}
        >
          {formatDuration(video.duration)}
        </div>
      </div>

      {/* Video Info */}
      <div className="mt-4 px-1">
        <h3 className="mb-2 font-display text-lg font-bold leading-tight text-gray-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
          {video.title}
        </h3>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 font-medium">
          <span aria-label={`${formatViews(video.views)} views`}>{formatViews(video.views)} views</span>
          <span className="mx-2 text-gray-300 dark:text-gray-600" aria-hidden="true">•</span>
          <span className="text-teal-600 dark:text-teal-400">{video.category}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default VideoCard;
