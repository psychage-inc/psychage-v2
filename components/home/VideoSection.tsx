
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { videos } from '../../data/videos';

const VideoSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Safety Check
  if (!videos || videos.length === 0) {
      return null;
  }

  return (
    <section className="bg-white dark:bg-[#050505] py-24 border-b border-gray-100 dark:border-gray-900 overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-[1440px]">
         <h2 className="font-display font-bold text-9xl text-gray-100 dark:text-gray-900 tracking-tighter mb-[-40px] relative z-0 select-none transition-colors duration-300">
            WATCH
         </h2>
         
         <div className="relative z-10 flex items-center justify-between mb-12">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">Expert Masterclasses</h3>
            <a href="#" className="text-sm font-bold uppercase tracking-widest text-teal-600 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-300">View All Series</a>
         </div>

         {/* Horizontal Scroller */}
         <div className="flex gap-8 overflow-x-auto pb-12 snap-x snap-mandatory no-scrollbar">
             {videos.map((video) => (
                 <motion.div 
                    key={video.id}
                    className="min-w-[350px] md:min-w-[450px] snap-center group cursor-pointer"
                    whileHover={{ y: -5 }}
                 >
                     <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-6">
                         <img 
                            src={video.thumbnail} 
                            alt={video.title}
                            loading="lazy" 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale-[30%] group-hover:grayscale-0"
                         />
                         <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                         <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                             <Play size={20} fill="currentColor" className="ml-1" />
                         </div>
                     </div>
                     
                     <div className="flex gap-4 items-start">
                         <span className="text-xs font-bold text-gray-400 dark:text-gray-600 mt-1">0{video.id}</span>
                         <div>
                            <h4 className="font-display font-bold text-xl text-gray-900 dark:text-gray-100 leading-tight mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                                {video.title}
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                                {video.category} • {Math.floor(video.duration / 60)} mins
                            </p>
                         </div>
                     </div>
                 </motion.div>
             ))}
         </div>
      </div>
    </section>
  );
};

export default VideoSection;
