import React, { useEffect, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { articleService } from '@/services/articleService';
import { ArticleRowCard, ArticleRowCardSkeleton } from '@/components/mobile/cards/ArticleRowCard';

/**
 * Mobile Browse → "All articles" — the flat, paginated listing of every
 * published article. Co-located with `MobileBrowse` (its only consumer); not a
 * shared/generic component. Pages the corpus server-side via
 * `articleService.getPage` so the full ~1,200-row corpus is never pulled at
 * once. New pages load on scroll via an IntersectionObserver sentinel.
 */

const PAGE_SIZE = 20;
const INITIAL_SKELETONS = 6;
const NEXT_PAGE_SKELETONS = 3;

const MobileBrowseAllArticles: React.FC = () => {
    const {
        data,
        isLoading,
        isError,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
    } = useInfiniteQuery({
        queryKey: ['articles', 'all-paged'],
        queryFn: ({ pageParam }) => articleService.getPage({ page: pageParam, limit: PAGE_SIZE }),
        initialPageParam: 0,
        getNextPageParam: (last) => (last.hasMore ? last.page + 1 : undefined),
        staleTime: 5 * 60 * 1000,
    });

    const articles = data?.pages.flatMap((p) => p.articles) ?? [];

    // Load the next page when the sentinel scrolls into view. Guard on
    // hasNextPage + not-already-fetching so we never double-request a page.
    const sentinelRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const node = sentinelRef.current;
        if (!node || !hasNextPage) return;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0]?.isIntersecting && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            { rootMargin: '400px' },
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

    if (isLoading) {
        return (
            <div className="mt-6 flex flex-col gap-1" aria-busy="true">
                {Array.from({ length: INITIAL_SKELETONS }).map((_, i) => (
                    <ArticleRowCardSkeleton key={i} />
                ))}
            </div>
        );
    }

    if (isError) {
        return (
            <p className="mt-6 text-sm text-text-secondary">
                We couldn’t load articles right now. Please try again in a moment.
            </p>
        );
    }

    if (articles.length === 0) {
        return (
            <p className="mt-6 text-sm text-text-secondary">
                No articles to show yet. Check back soon.
            </p>
        );
    }

    return (
        <div className="mt-6 flex flex-col gap-1">
            {articles.map((article) => (
                <ArticleRowCard key={article.id} article={article} />
            ))}

            {isFetchingNextPage ? (
                <div className="flex flex-col gap-1" aria-busy="true">
                    {Array.from({ length: NEXT_PAGE_SKELETONS }).map((_, i) => (
                        <ArticleRowCardSkeleton key={i} />
                    ))}
                </div>
            ) : null}

            {/* Infinite-scroll trigger — only present while more pages remain. */}
            {hasNextPage ? <div ref={sentinelRef} aria-hidden className="h-px" /> : null}
        </div>
    );
};

export default MobileBrowseAllArticles;
