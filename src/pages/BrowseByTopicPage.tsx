import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import SEO from '../components/SEO';
import CategoryCard from '../components/articles/CategoryCard';
import { categoryService } from '../services/categoryService';
import { getCategoryUrl } from '../lib/articleUrl';
import { useAsyncData } from '@/hooks/useAsyncData';

/**
 * Browse by Topic — standalone route for the grouped category index.
 *
 * A focused page version of the "Browse by topic" section on `/learn`. It reuses the
 * same source of truth (`categoryService.getGrouped()` — the live `articleCount > 0`
 * filter that also feeds the Learn nav and the `/learn` index) and the same
 * `CategoryCard`, so it can never drift from them and never renders a dead "0 articles"
 * link. Read-only: no article-status, serving, or gate logic.
 */
const BrowseByTopicPage: React.FC = () => {
    const navigate = useNavigate();
    const { data: groups, loading } = useAsyncData(() => categoryService.getGrouped(), []);

    return (
        <div className="bg-background min-h-screen">
            <SEO
                title="Browse by Topic | Psychage"
                description="Everything we cover, grouped into three areas. Pick a topic to read all its articles."
            />

            <section className="pt-12 pb-16">
                <div className="container mx-auto max-w-content px-6">
                    <div className="mb-8">
                        <h1 className="text-3xl md:text-4xl font-display font-bold text-text-primary tracking-tight">
                            Browse by topic
                        </h1>
                        <p className="text-base text-text-secondary mt-2 max-w-2xl leading-relaxed">
                            Everything we cover, grouped into three areas. Pick a topic to read all its articles.
                        </p>
                    </div>

                    {loading && !groups ? (
                        <div className="flex items-center justify-center py-24 text-text-tertiary">
                            <Loader2 className="animate-spin" size={28} aria-label="Loading topics" />
                        </div>
                    ) : (
                        <div className="space-y-12">
                            {(groups ?? []).map(group => (
                                <div key={group.id}>
                                    <div className="mb-5">
                                        <h2 className="text-xl font-display font-bold text-text-primary tracking-tight">
                                            {group.title}
                                        </h2>
                                        <p className="text-sm text-text-secondary mt-1 max-w-2xl leading-relaxed">
                                            {group.description}
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {group.categories.map(category => (
                                            <CategoryCard
                                                key={category.slug}
                                                category={category}
                                                onClick={() => navigate(getCategoryUrl(category.slug))}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default BrowseByTopicPage;
