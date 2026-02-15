import React, { useEffect, useState } from 'react';
import UserSidebar from './UserSidebar';
import InteractiveCard from '@/components/ui/InteractiveCard';
import Button from '@/components/ui/Button';
import { BookMarked, ArrowRight, GraduationCap, MapPin, Layout, UserSquare2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { api } from '@/lib/api';
import { Article, Provider } from '@/types/models';
import { motion, AnimatePresence } from 'framer-motion';
import MeshGradient from '@/components/ui/MeshGradient';
import { cn } from '@/lib/utils';

const BookmarksPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'articles' | 'providers'>('articles');
    const [bookmarks, setBookmarks] = useState<Article[]>([]);
    const [favorites, setFavorites] = useState<Provider[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [articlesRes, providersRes] = await Promise.all([
                    api.articles.getBookmarks(),
                    api.providers.getFavorites()
                ]);

                if (articlesRes.success && articlesRes.data) {
                    setBookmarks(articlesRes.data as unknown as Article[]);
                }

                if (providersRes.success && providersRes.data) {
                    setFavorites(providersRes.data as unknown as Provider[]);
                }
            } catch (error) {
                console.error('Failed to fetch bookmarks', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const removeBookmark = async (id: string) => {
        // Optimistic update
        setBookmarks(prev => prev.filter(b => b.id !== id));
        try {
            await api.articles.bookmark(id); // Toggle off
        } catch (error) {
            console.error('Failed to remove bookmark', error);
            // Revert on error would go here if strict
        }
    };

    const removeFavorite = async (id: string) => {
        // Optimistic update
        setFavorites(prev => prev.filter(f => f.id !== id));
        try {
            await api.providers.toggleFavorite(id);
        } catch (error) {
            console.error('Failed to remove favorite', error);
        }
    };

    const LoadingSkeleton = () => (
        <div className="space-y-4">
            {[1, 2, 3].map(i => (
                <div key={i} className="h-28 bg-white/5 rounded-2xl animate-pulse" />
            ))}
        </div>
    );

    const EmptyState = ({ type }: { type: string }) => (
        <div className="text-center py-16 px-4">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-text-tertiary border border-white/10">
                <BookMarked size={40} />
            </div>
            <h3 className="text-2xl font-bold text-text-primary mb-3">No {type} saved yet</h3>
            <p className="text-text-secondary mb-8 max-w-sm mx-auto leading-relaxed">
                Save {type} to access them quickly here. Your personal collection awaits.
            </p>
            <Link to={type === 'articles' ? '/learn' : '/providers'}>
                <Button>Explore {type === 'articles' ? 'Content' : 'Providers'}</Button>
            </Link>
        </div>
    );

    return (
        <div className="min-h-screen bg-background pt-24 pb-20 px-6 relative">
            <SEO title="My Bookmarks | Psychage" />

            {/* Background Mesh */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <MeshGradient className="opacity-[0.05]" />
            </div>

            <div className="container mx-auto max-w-[1200px] relative z-10">
                <h1 className="text-3xl font-display font-bold text-text-primary mb-8 px-2">My Bookmarks</h1>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-1">
                        <UserSidebar />
                    </div>

                    <div className="lg:col-span-3">
                        <InteractiveCard className="p-0 overflow-hidden bg-surface/30 backdrop-blur-md border-white/5 h-full">
                            {/* Tabs */}
                            <div className="flex border-b border-white/10 p-2 gap-2">
                                <button
                                    onClick={() => setActiveTab('articles')}
                                    className={cn(
                                        "flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 relative overflow-hidden",
                                        activeTab === 'articles' ? "text-white shadow-md" : "text-text-secondary hover:text-text-primary hover:bg-white/5"
                                    )}
                                >
                                    {activeTab === 'articles' && (
                                        <motion.div
                                            layoutId="active-bookmark-tab"
                                            className="absolute inset-0 bg-primary z-0"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className="relative z-10 flex items-center gap-2">
                                        <Layout size={16} /> Saved Articles
                                    </span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('providers')}
                                    className={cn(
                                        "flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 relative overflow-hidden",
                                        activeTab === 'providers' ? "text-white shadow-md" : "text-text-secondary hover:text-text-primary hover:bg-white/5"
                                    )}
                                >
                                    {activeTab === 'providers' && (
                                        <motion.div
                                            layoutId="active-bookmark-tab"
                                            className="absolute inset-0 bg-primary z-0"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className="relative z-10 flex items-center gap-2">
                                        <UserSquare2 size={16} /> Favorite Providers
                                    </span>
                                </button>
                            </div>

                            <div className="p-6 md:p-8">
                                <AnimatePresence mode="wait">
                                    {isLoading ? (
                                        <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                            <LoadingSkeleton />
                                        </motion.div>
                                    ) : activeTab === 'articles' ? (
                                        <motion.div
                                            key="articles"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            transition={{ duration: 0.3 }}
                                            className="space-y-4"
                                        >
                                            {bookmarks.length > 0 ? (
                                                bookmarks.map((item) => (
                                                    <div key={item.id} className="flex flex-col md:flex-row md:items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5 group hover:border-primary/40 hover:bg-white/10 transition-all duration-300">
                                                        <div className="mb-4 md:mb-0">
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <span className="text-[10px] uppercase font-bold text-primary tracking-wider flex items-center gap-1 bg-primary/10 px-2 py-0.5 rounded-full">
                                                                    <GraduationCap size={10} />
                                                                    Article
                                                                </span>
                                                                <span className="text-text-tertiary text-xs">•</span>
                                                                <span className="text-xs text-text-tertiary">{item.category?.name || 'Uncategorized'}</span>
                                                            </div>
                                                            <h3 className="font-bold text-text-primary text-xl group-hover:text-primary transition-colors leading-tight">{item.title}</h3>
                                                            <p className="text-sm text-text-secondary mt-2 line-clamp-1 opacity-80">{item.description}</p>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => removeBookmark(String(item.id))}
                                                                className="text-text-tertiary hover:text-error hover:bg-error/10"
                                                            >
                                                                Remove
                                                            </Button>
                                                            <Link to={`/learn/article/${item.id}`}>
                                                                <Button size="sm" rightIcon={<ArrowRight size={14} />} className="shadow-lg shadow-primary/20">
                                                                    Read
                                                                </Button>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : <EmptyState type="articles" />}
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="providers"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3 }}
                                            className="space-y-4"
                                        >
                                            {favorites.length > 0 ? (
                                                favorites.map((provider) => (
                                                    <div key={provider.id} className="flex flex-col md:flex-row md:items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5 group hover:border-primary/40 hover:bg-white/10 transition-all duration-300">
                                                        <div className="flex items-start gap-4">
                                                            <div className="w-14 h-14 rounded-full bg-surface border-2 border-surface shadow-md overflow-hidden flex-shrink-0 relative">
                                                                {provider.image ? (
                                                                    <img src={provider.image} alt={provider.name} className="w-full h-full object-cover" />
                                                                ) : (
                                                                    <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-bold text-lg">
                                                                        {provider.name?.charAt(0) || 'P'}
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div>
                                                                <h3 className="font-bold text-text-primary text-xl group-hover:text-primary transition-colors">{provider.name}</h3>
                                                                <p className="text-primary text-sm font-medium bg-primary/5 inline-block px-2 py-0.5 rounded-md mt-1">{provider.specialties[0] || 'General'}</p>
                                                                <div className="flex items-center gap-1 text-xs text-text-secondary mt-2 opacity-80">
                                                                    <MapPin size={12} />
                                                                    {provider.location || 'Online'}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-3 mt-4 md:mt-0 pl-16 md:pl-0">
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => removeFavorite(String(provider.id))}
                                                                className="text-text-tertiary hover:text-error hover:bg-error/10"
                                                            >
                                                                Remove
                                                            </Button>
                                                            <Link to={`/providers/${provider.id}`}>
                                                                <Button size="sm" rightIcon={<ArrowRight size={14} />} className="shadow-lg shadow-primary/20">
                                                                    Profile
                                                                </Button>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : <EmptyState type="providers" />}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </InteractiveCard>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookmarksPage;
