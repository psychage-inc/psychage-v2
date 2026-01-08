import React, { useEffect, useState } from 'react';
import UserSidebar from './UserSidebar';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { BookMarked, ArrowRight, User, GraduationCap, MapPin, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { api } from '@/lib/api';

const BookmarksPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'articles' | 'providers'>('articles');
    const [bookmarks, setBookmarks] = useState<any[]>([]);
    const [favorites, setFavorites] = useState<any[]>([]);
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
                    setBookmarks(articlesRes.data);
                }

                if (providersRes.success && providersRes.data) {
                    setFavorites(providersRes.data);
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
                <div key={i} className="h-24 bg-surface-hover rounded-xl animate-pulse" />
            ))}
        </div>
    );

    const EmptyState = ({ type }: { type: string }) => (
        <div className="text-center py-12">
            <div className="w-16 h-16 bg-surface-hover rounded-full flex items-center justify-center mx-auto mb-4 text-text-tertiary">
                <BookMarked size={32} />
            </div>
            <h3 className="text-xl font-bold text-text-primary mb-2">No {type} saved yet</h3>
            <p className="text-text-secondary mb-6">Save {type} to access them quickly here.</p>
            <Link to={type === 'articles' ? '/learn' : '/providers'}>
                <Button>Explore {type === 'articles' ? 'Content' : 'Providers'}</Button>
            </Link>
        </div>
    );

    return (
        <div className="min-h-screen bg-background pt-24 pb-20 px-6">
            <SEO title="My Bookmarks | Psychage" />

            <div className="container mx-auto max-w-[1200px]">
                <h1 className="text-3xl font-display font-bold text-text-primary mb-8">My Bookmarks</h1>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-1">
                        <UserSidebar />
                    </div>

                    <div className="lg:col-span-3">
                        <Card className="p-0 overflow-hidden">
                            {/* Tabs */}
                            <div className="flex border-b border-border">
                                <button
                                    onClick={() => setActiveTab('articles')}
                                    className={`flex-1 py-4 text-center font-bold transition-colors ${activeTab === 'articles'
                                        ? 'text-primary border-b-2 border-primary bg-primary/5'
                                        : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                                        }`}
                                >
                                    Saved Articles
                                </button>
                                <button
                                    onClick={() => setActiveTab('providers')}
                                    className={`flex-1 py-4 text-center font-bold transition-colors ${activeTab === 'providers'
                                        ? 'text-primary border-b-2 border-primary bg-primary/5'
                                        : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                                        }`}
                                >
                                    Favorite Providers
                                </button>
                            </div>

                            <div className="p-8">
                                {isLoading ? (
                                    <LoadingSkeleton />
                                ) : activeTab === 'articles' ? (
                                    bookmarks.length > 0 ? (
                                        <div className="space-y-4">
                                            {bookmarks.map((item) => (
                                                <div key={item.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-surface-hover rounded-xl border border-border group hover:border-primary/30 transition-colors">
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span className="text-xs uppercase font-bold text-primary tracking-wider flex items-center gap-1">
                                                                <GraduationCap size={12} />
                                                                Article
                                                            </span>
                                                            <span className="text-text-tertiary">•</span>
                                                            <span className="text-xs text-text-tertiary">{item.category}</span>
                                                        </div>
                                                        <h3 className="font-bold text-text-primary text-lg group-hover:text-primary transition-colors">{item.title}</h3>
                                                        <p className="text-sm text-text-secondary line-clamp-1">{item.summary || item.description}</p>
                                                    </div>
                                                    <div className="flex items-center gap-3 mt-4 md:mt-0">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => removeBookmark(item.id)}
                                                            className="text-text-tertiary hover:text-error"
                                                        >
                                                            Remove
                                                        </Button>
                                                        <Link to={`/learn/article/${item.id}`}>
                                                            <Button size="sm" rightIcon={<ArrowRight size={14} />}>
                                                                Read
                                                            </Button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : <EmptyState type="articles" />
                                ) : (
                                    favorites.length > 0 ? (
                                        <div className="space-y-4">
                                            {favorites.map((provider) => (
                                                <div key={provider.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-surface-hover rounded-xl border border-border group hover:border-primary/30 transition-colors">
                                                    <div className="flex items-start gap-4">
                                                        <div className="w-12 h-12 rounded-full bg-surface border-2 border-surface shadow-sm overflow-hidden flex-shrink-0">
                                                            {provider.avatar_url ? (
                                                                <img src={provider.avatar_url} alt={provider.name} className="w-full h-full object-cover" />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-bold">
                                                                    {provider.name?.charAt(0) || 'P'}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <h3 className="font-bold text-text-primary text-lg group-hover:text-primary transition-colors">{provider.name}</h3>
                                                            <p className="text-primary text-sm font-medium">{provider.specialization}</p>
                                                            <div className="flex items-center gap-1 text-xs text-text-secondary mt-1">
                                                                <MapPin size={12} />
                                                                {provider.location || 'Online'}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3 mt-4 md:mt-0 pl-16 md:pl-0">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => removeFavorite(provider.id)}
                                                            className="text-text-tertiary hover:text-error"
                                                        >
                                                            Remove
                                                        </Button>
                                                        <Link to={`/providers/${provider.id}`}>
                                                            <Button size="sm" rightIcon={<ArrowRight size={14} />}>
                                                                Profile
                                                            </Button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : <EmptyState type="providers" />
                                )}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookmarksPage;
