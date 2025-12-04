import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin, X } from 'lucide-react';
import { providers } from '../../data/providers';
import ProviderCard from '../providers/ProviderCard';
import Button from '../ui/Button';
import { SkeletonProviderDirectory } from '../ui/Skeletons';

const ProviderDirectory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading on mount
  useEffect(() => {
      const timer = setTimeout(() => {
          setIsLoading(false);
      }, 800);
      return () => clearTimeout(timer);
  }, []);
  
  const toggleFilter = (tag: string) => {
      setActiveFilters(prev => 
          prev.includes(tag) ? prev.filter(f => f !== tag) : [...prev, tag]
      );
  };

  const clearFilters = () => {
      setActiveFilters([]);
      setSearchTerm('');
  };

  const filteredProviders = providers.filter(p => {
    const matchesSearch = 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));

    // Logic: Provider must match ALL active filters (strict) OR At least one (loose).
    // Let's go with a mix: Verified tags usually mean "Must have".
    // For simplicity: If filter is in specialty, insurance, or location keyword, it matches.
    // Provider matches if they satisfy ALL selected filters (AND logic).
    const matchesFilters = activeFilters.length === 0 || activeFilters.every(filter => {
        return (
            p.specialties.includes(filter) || 
            p.insurance.includes(filter) ||
            p.availability.includes(filter) ||
            (filter === 'Virtual' && p.location.includes('Virtual'))
        );
    });

    return matchesSearch && matchesFilters;
  });

  if (isLoading) {
      return <SkeletonProviderDirectory />;
  }

  const commonFilters = ['Anxiety', 'Depression', 'ADHD', 'Relationships', 'Blue Cross', 'Aetna', 'Virtual'];

  return (
    <div className="min-h-screen bg-[#fafaf9] pt-28 pb-20">
      
      {/* Header */}
      <div className="container mx-auto max-w-[1200px] px-6 mb-12">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl mx-auto mb-12"
        >
            <h1 className="font-display font-bold text-4xl md:text-5xl text-gray-900 mb-6">
                Find your partner in mental health.
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed">
                Connect with verified therapists and psychiatrists who match your specific needs, insurance, and location.
            </p>
        </motion.div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-4 border border-gray-100 flex flex-col md:flex-row gap-4 items-center max-w-4xl mx-auto">
            <div className="flex-grow w-full relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                    type="text" 
                    placeholder="Search by name, specialty, or condition..."
                    className="w-full h-12 pl-12 pr-4 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all outline-none font-medium text-gray-900"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            
            <div className="w-px h-8 bg-gray-200 hidden md:block" />
            
            <div className="w-full md:w-auto relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                    type="text" 
                    placeholder="City or Zip"
                    className="w-full h-12 pl-12 pr-4 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all outline-none font-medium text-gray-900"
                />
            </div>

            <Button className="w-full md:w-auto h-12 px-8 rounded-xl bg-gray-900 text-white hover:bg-black">
                Search
            </Button>
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
             {commonFilters.map(tag => {
                 const isActive = activeFilters.includes(tag);
                 return (
                    <button 
                        key={tag} 
                        onClick={() => toggleFilter(tag)}
                        className={`
                            px-4 py-2 rounded-full border text-sm font-bold transition-all
                            ${isActive 
                                ? 'bg-teal-600 text-white border-teal-600 shadow-lg shadow-teal-500/30' 
                                : 'bg-white border-gray-200 text-gray-600 hover:border-teal-500 hover:text-teal-600'}
                        `}
                    >
                        {tag}
                    </button>
                 );
             })}
             
             {(activeFilters.length > 0 || searchTerm) && (
                 <button 
                    onClick={clearFilters}
                    className="px-4 py-2 rounded-full bg-red-50 border border-red-100 text-sm font-bold text-red-600 hover:bg-red-100 transition-colors flex items-center gap-2"
                 >
                     <X size={14} /> Clear
                 </button>
             )}
        </div>
      </div>

      {/* Grid */}
      <div className="container mx-auto max-w-[1200px] px-6">
          <div className="flex items-center justify-between mb-6">
               <h2 className="font-bold text-gray-900">
                   {filteredProviders.length} Providers Verified
                   {activeFilters.length > 0 && <span className="text-gray-400 font-normal ml-2 text-sm">(Filtered)</span>}
               </h2>
               <div className="text-sm text-gray-500 font-medium">Sorted by: <span className="text-gray-900 cursor-pointer">Relevance</span></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {filteredProviders.map((provider) => (
                   <ProviderCard key={provider.id} provider={provider} />
               ))}
          </div>

          {filteredProviders.length === 0 && (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                      <Filter size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No providers match your filters</h3>
                  <p className="text-gray-500 mb-6">Try removing some filters or adjusting your search.</p>
                  <Button onClick={clearFilters} variant="outline">Clear All Filters</Button>
              </div>
          )}
      </div>
    </div>
  );
};

export default ProviderDirectory;