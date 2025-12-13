import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, Filter, Calendar } from 'lucide-react';
import { useArticleService } from '@/services/articleService';
import { Article } from '@/types/models';
import ArticleCard from '@/components/article/ArticleCard';
import { Display, Text } from '@/components/ui/Typography';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import SEO from '@/components/SEO';

const SearchResultsPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState(query);
    const [results, setResults] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const articleService = useArticleService();

    useEffect(() => {
        setSearchTerm(query);
        const performSearch = async () => {
            if (!query) {
                setResults([]);
                return;
            }
            setIsLoading(true);
            try {
                // Determine if we need to implement search filters here
                // For now, client-side filtering of all articles
                const allArticles = await articleService.getAll();
                const filtered = allArticles.filter(a =>
                    a.title.toLowerCase().includes(query.toLowerCase()) ||
                    a.description.toLowerCase().includes(query.toLowerCase())
                );
                setResults(filtered);
            } catch (error) {
                console.error("Search failed:", error);
            } finally {
                setIsLoading(false);
            }
        };
        performSearch();
    }, [query, articleService]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setSearchParams({ q: searchTerm });
    };

    return (
        <div className="min-h-screen bg-background pt-24 pb-20 px-6">
            <SEO title={`Search Results for "${query}" | Psychage`} />

            <div className="container mx-auto max-w-6xl">
                {/* Search Header */}
                <div className="max-w-3xl mx-auto mb-12">
                    <form onSubmit={handleSearch} className="relative mb-6">
                        <Input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search articles, topics, and tools..."
                            className="h-14 pl-12 text-lg rounded-2xl shadow-sm"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary" size={24} />
                        {searchTerm && (
                            <button
                                type="button"
                                onClick={() => { setSearchTerm(''); setSearchParams({}); }}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-primary"
                            >
                                Clear
                            </button>
                        )}
                    </form>

                    <div className="flex items-center justify-between text-sm text-text-secondary">
                        <span>{isLoading ? 'Searching...' : `${results.length} results found for "${query}"`}</span>
                        <div className="flex gap-2">
                            <Button variant="ghost" size="sm" leftIcon={<Filter size={14} />}>Filter</Button>
                            <Button variant="ghost" size="sm" leftIcon={<Calendar size={14} />}>Date</Button>
                        </div>
                    </div>
                </div>

                {/* Results List */}
                {isLoading ? (
                    <div className="text-center py-20">Loading...</div>
                ) : results.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {results.map(article => (
                            <ArticleCard key={article.id} article={article} onClick={() => navigate(`/learn/article/${article.id}`)} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-surface rounded-3xl border border-dashed border-border max-w-3xl mx-auto">
                        <div className="w-16 h-16 bg-surface-subtle rounded-full flex items-center justify-center mx-auto mb-4 text-text-tertiary">
                            <Search size={32} />
                        </div>
                        <Display className="text-2xl mb-2">No results found</Display>
                        <Text className="mb-6">
                            We couldn't find anything matching "{query}". Try different keywords or browse by category.
                        </Text>
                        <div className="flex justify-center gap-4">
                            <Button onClick={() => navigate('/learn')} variant="outline">Browse Topics</Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchResultsPage;
