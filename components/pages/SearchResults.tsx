
import React from 'react';
import { motion } from 'framer-motion';
import { Search, FileText, Video as VideoIcon, PenTool } from 'lucide-react';
import { articles } from '../../data/richArticles';
import { videos } from '../../data/videos';
import { tools } from '../../data/tools';
import ArticleCard from '../article/ArticleCard';
import VideoCard from '../video/VideoCard';
import ToolCard from '../tool/ToolCard';

interface SearchResultsProps {
  query: string;
  onNavigateToArticle: (id: number) => void;
  onNavigateToVideo: (id: number) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ query, onNavigateToArticle, onNavigateToVideo }) => {
  const normalizedQuery = query.toLowerCase();

  // Simple Filtering Logic
  const matchedArticles = articles.filter(item => 
    item.title.toLowerCase().includes(normalizedQuery) || 
    item.description.toLowerCase().includes(normalizedQuery) ||
    item.category.toLowerCase().includes(normalizedQuery)
  );

  const matchedVideos = videos.filter(item => 
    item.title.toLowerCase().includes(normalizedQuery) || 
    item.category.toLowerCase().includes(normalizedQuery)
  );

  const matchedTools = tools.filter(item => 
    item.name.toLowerCase().includes(normalizedQuery) || 
    item.description.toLowerCase().includes(normalizedQuery)
  );

  const totalResults = matchedArticles.length + matchedVideos.length + matchedTools.length;

  return (
    <div className="min-h-screen bg-[#fafaf9] pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-[1200px]">
        
        {/* Header */}
        <div className="mb-12">
            <h1 className="font-display font-bold text-3xl md:text-4xl text-gray-900 mb-2">
                Search results for "{query}"
            </h1>
            <p className="text-gray-500 font-medium">
                Found {totalResults} matches across our library.
            </p>
        </div>

        {totalResults === 0 && (
            <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-gray-200">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                    <Search size={32} />
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-500">Try adjusting your keywords or browsing by category.</p>
            </div>
        )}

        {/* Results Sections */}
        <div className="space-y-16">
            
            {matchedTools.length > 0 && (
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-amber-100 text-amber-600 rounded-lg"><PenTool size={20} /></div>
                        <h2 className="font-bold text-2xl text-gray-900">Tools</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {matchedTools.map(tool => (
                            <ToolCard key={tool.id} tool={tool} />
                        ))}
                    </div>
                </section>
            )}

            {matchedArticles.length > 0 && (
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-teal-100 text-teal-600 rounded-lg"><FileText size={20} /></div>
                        <h2 className="font-bold text-2xl text-gray-900">Articles</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {matchedArticles.map(article => (
                            <div key={article.id} className="h-[400px]">
                                <ArticleCard article={article} onClick={() => onNavigateToArticle(article.id)} />
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {matchedVideos.length > 0 && (
                <section>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg"><VideoIcon size={20} /></div>
                        <h2 className="font-bold text-2xl text-gray-900">Videos</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {matchedVideos.map(video => (
                             <div key={video.id} onClick={() => onNavigateToVideo(video.id)}>
                                <VideoCard video={video} />
                             </div>
                        ))}
                    </div>
                </section>
            )}

        </div>

      </div>
    </div>
  );
};

export default SearchResults;
