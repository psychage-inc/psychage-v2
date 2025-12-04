import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { toolService } from '../../services/toolService';
import { Tool } from '../../types/models';
import { BrainCircuit, PenTool, Moon, Wind, Users, ShieldAlert, ArrowRight, Search, Filter, LucideIcon } from 'lucide-react';
import Button from '../ui/Button';
import SEO from '../SEO';

const iconMap: Record<string, LucideIcon> = {
    BrainCircuit,
    PenTool,
    Moon,
    Wind,
    Users,
    ShieldAlert
};

const colorVariants: Record<string, string> = {
    teal: 'bg-teal-100 text-teal-600 group-hover:bg-teal-600 group-hover:text-white',
    amber: 'bg-amber-100 text-amber-600 group-hover:bg-amber-600 group-hover:text-white',
    indigo: 'bg-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white',
    sky: 'bg-sky-100 text-sky-600 group-hover:bg-sky-600 group-hover:text-white',
    rose: 'bg-rose-100 text-rose-600 group-hover:bg-rose-600 group-hover:text-white',
    red: 'bg-red-100 text-red-600 group-hover:bg-red-600 group-hover:text-white',
};

const ToolsPage: React.FC = () => {
    const [tools, setTools] = useState<Tool[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [searchQuery, setSearchQuery] = useState('');

    React.useEffect(() => {
        const fetchTools = async () => {
            try {
                const data = await toolService.getAll();
                setTools(data);
            } catch (error) {
                console.error("Failed to fetch tools:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchTools();
    }, []);

    const categories = ['All', ...Array.from(new Set(tools.map(t => t.category)))];

    const filteredTools = tools.filter(tool => {
        const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
        const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            tool.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const getToolLink = (toolId: number) => {
        switch (toolId) {
            case 1: return '/clarity-score';
            case 2: return '/tools/mood-journal';
            case 3: return '/tools/sleep-architect';
            case 5: return '/find-care';
            default: return '#'; // Coming soon
        }
    };

    const isComingSoon = (toolId: number) => {
        return ![1, 2, 3, 5].includes(toolId);
    };

    if (isLoading) return <div className="min-h-screen bg-gray-50 pt-32 text-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-6">
            <SEO title="Mental Health Toolkit | Psychage" description="Clinically-validated tools and exercises for your mental well-being." />
            <div className="container mx-auto max-w-6xl">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h1 className="font-display font-bold text-4xl md:text-5xl text-gray-900 mb-6">
                        Mental Health Toolkit
                    </h1>
                    <p className="text-xl text-gray-500 leading-relaxed">
                        A collection of clinically-validated tools and exercises to help you understand, manage, and improve your mental well-being.
                    </p>
                </div>

                {/* Filters & Search */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-12 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${selectedCategory === category
                                    ? 'bg-gray-900 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    } `}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search tools..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                        />
                    </div>
                </div>

                {/* Tools Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTools.map((tool, index) => {
                        const Icon = iconMap[tool.iconName] || BrainCircuit;
                        const comingSoon = isComingSoon(tool.id);

                        return (
                            <motion.div
                                key={tool.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden ${comingSoon ? 'opacity-75' : ''} `}
                            >
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors ${colorVariants[tool.color] || colorVariants.teal} `}>
                                    <Icon size={28} />
                                </div>

                                <div className="mb-4">
                                    <span className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 block">
                                        {tool.category}
                                    </span>
                                    <h3 className="font-display font-bold text-2xl text-gray-900 group-hover:text-teal-600 transition-colors">
                                        {tool.name}
                                    </h3>
                                </div>

                                <p className="text-gray-500 mb-8 line-clamp-3">
                                    {tool.description}
                                </p>

                                <div className="space-y-3 mb-8">
                                    {tool.features.slice(0, 2).map(feature => (
                                        <div key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                                            <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                                            {feature}
                                        </div>
                                    ))}
                                </div>

                                {comingSoon ? (
                                    <div className="w-full py-3 rounded-xl bg-gray-100 text-gray-400 font-bold text-center text-sm cursor-not-allowed">
                                        Coming Soon
                                    </div>
                                ) : (
                                    <Link to={getToolLink(tool.id)}>
                                        <Button className="w-full group-hover:bg-teal-600 group-hover:border-teal-600" rightIcon={<ArrowRight size={18} />}>
                                            Open Tool
                                        </Button>
                                    </Link>
                                )}
                            </motion.div>
                        );
                    })}
                </div>

                {filteredTools.length === 0 && (
                    <div className="text-center py-24">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                            <Filter size={24} />
                        </div>
                        <h3 className="font-bold text-gray-900 text-lg mb-2">No tools found</h3>
                        <p className="text-gray-500">Try adjusting your search or filters</p>
                        <button
                            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                            className="mt-4 text-teal-600 font-bold hover:underline"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ToolsPage;
