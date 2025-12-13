import React from 'react';
import UserSidebar from './UserSidebar';
import { Card } from '@/components/ui/Card';
import { useBookmarks } from '@/context/BookmarkContext';
import { BookMarked, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';

const BookmarksPage: React.FC = () => {
    const { bookmarks, toggleBookmark } = useBookmarks();

    // Mock enrichment of bookmarks since we only store IDs
    const enrichedBookmarks = bookmarks.map(id => ({
        id,
        type: 'Article', // Mock type
        title: `Bookmarked Item ${id}`, // Mock title
        path: `/learn/article/${id}`
    }));

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
                        <Card className="p-8">
                            {enrichedBookmarks.length > 0 ? (
                                <div className="space-y-4">
                                    {enrichedBookmarks.map((item) => (
                                        <div key={item.id} className="flex items-center justify-between p-4 bg-surface-hover rounded-xl border border-border">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-xs uppercase font-bold text-primary tracking-wider">{item.type}</span>
                                                    <span className="text-text-tertiary">•</span>
                                                    <span className="text-xs text-text-tertiary">Saved recently</span>
                                                </div>
                                                <h3 className="font-bold text-text-primary text-lg">{item.title}</h3>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => toggleBookmark(item.id)}
                                                    className="text-text-tertiary hover:text-error"
                                                >
                                                    Remove
                                                </Button>
                                                <Link to={item.path}>
                                                    <Button size="sm" rightIcon={<ArrowRight size={14} />}>
                                                        View
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-surface-hover rounded-full flex items-center justify-center mx-auto mb-4 text-text-tertiary">
                                        <BookMarked size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold text-text-primary mb-2">No bookmarks yet</h3>
                                    <p className="text-text-secondary mb-6">Save articles, videos, and providers to access them quickly here.</p>
                                    <Link to="/learn">
                                        <Button>Explore Content</Button>
                                    </Link>
                                </div>
                            )}
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookmarksPage;
