
import React from 'react';
import { motion } from 'framer-motion';
import { articles } from '../../data/richArticles';
import { videos } from '../../data/videos';
import { tools } from '../../data/tools';
import ArticleCard from '../article/ArticleCard';
import VideoCard from '../video/VideoCard';
import ToolCard from '../tool/ToolCard';
import { Brain, ArrowLeft } from 'lucide-react';

interface CategoryPageProps {
  category: string;
  onBack: () => void;
  onNavigateToArticle: (id: number) => void;
  onNavigateToVideo: (id: number) => void;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ category, onBack, onNavigateToArticle, onNavigateToVideo }) => {
  // Mock filter logic - in real app would filter by actual category prop
  const categoryArticles = articles.slice(0, 4); 
  const categoryVideos = videos.slice(0, 3);
  const categoryTools = tools.slice(0, 2);

  return (
    <div className="min-h-screen bg-[#fafaf9] pt-28 pb-20">
       {/* Hero */}
       <div className="bg-teal-900 text-white py-20 px-6 mb-12 relative overflow-hidden">
           <div className="absolute inset-0 opacity-20">
               <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
               <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-500 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />
           </div>

           <div className="container mx-auto max-w-[1280px] relative z-10">
               <button onClick={onBack} className="flex items-center gap-2 text-teal-300 hover:text-white mb-8 transition-colors text-sm font-bold uppercase tracking-wider">
                   <ArrowLeft size={16} /> Back to Home
               </button>
               
               <div className="flex items-center gap-6 mb-6">
                   <div className="w-16 h-16 rounded-2xl bg-teal-800 flex items-center justify-center border border-teal-700 shadow-xl">
                       <Brain size={32} className="text-teal-300" />
                   </div>
                   <h1 className="font-display font-bold text-5xl md:text-6xl tracking-tight">
                       {category}
                   </h1>
               </div>
               
               <p className="text-xl text-teal-100 max-w-2xl font-light leading-relaxed">
                   Comprehensive resources, expert insights, and clinical tools designed to help you understand and manage {category.toLowerCase()}.
               </p>

               <div className="flex gap-8 mt-12 text-sm font-bold uppercase tracking-widest text-teal-400">
                   <div>{categoryArticles.length} Articles</div>
                   <div>{categoryVideos.length} Videos</div>
                   <div>{categoryTools.length} Tools</div>
               </div>
           </div>
       </div>

       <div className="container mx-auto max-w-[1280px] px-6 space-y-20">
           
           {/* Articles Section */}
           <section>
               <div className="flex items-center justify-between mb-8">
                   <h2 className="font-display font-bold text-3xl text-gray-900">Latest Articles</h2>
                   <button className="text-teal-600 font-bold hover:text-teal-800 transition-colors">View All</button>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                   {categoryArticles.map(article => (
                       <div key={article.id} className="h-[400px]">
                           <ArticleCard article={article} onClick={() => onNavigateToArticle(article.id)} />
                       </div>
                   ))}
               </div>
           </section>

           {/* Tools Section */}
           <section>
               <h2 className="font-display font-bold text-3xl text-gray-900 mb-8">Interactive Tools</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {categoryTools.map(tool => (
                       <ToolCard key={tool.id} tool={tool} />
                   ))}
               </div>
           </section>

           {/* Videos Section */}
           <section>
               <div className="flex items-center justify-between mb-8">
                   <h2 className="font-display font-bold text-3xl text-gray-900">Video Guides</h2>
                   <button className="text-teal-600 font-bold hover:text-teal-800 transition-colors">View All</button>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                   {categoryVideos.map(video => (
                       <div key={video.id} onClick={() => onNavigateToVideo(video.id)}>
                           <VideoCard video={video} />
                       </div>
                   ))}
               </div>
           </section>

       </div>
    </div>
  );
};

export default CategoryPage;
