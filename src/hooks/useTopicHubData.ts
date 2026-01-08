import { useState, useEffect } from 'react';
import { useArticleService } from '@/services/articleService';
import { useVideoService } from '@/services/videoService';
import { useCategoryService } from '@/services/categoryService';
import type { Article, Video, Category } from '@/types/models';

interface TopicHubData {
    category: Category | null;
    articles: Article[];
    videos: Video[];
    loading: boolean;
}

export function useTopicHubData(categoryId: string, showVideos: boolean = true): TopicHubData {
    const articleService = useArticleService();
    const videoService = useVideoService();
    const categoryService = useCategoryService();

    const [data, setData] = useState<TopicHubData>({
        category: null,
        articles: [],
        videos: [],
        loading: true
    });

    useEffect(() => {
        let cancelled = false;

        async function fetchData() {
            try {
                // Fetch category metadata first
                const category = await categoryService.getBySlug(categoryId);

                if (cancelled) return;

                // Fetch articles and videos in parallel
                const [articlesResult, videosResult] = await Promise.all([
                    articleService.getByCategory(categoryId),
                    showVideos && category
                        ? videoService.getAll({
                            category: category.name.toLowerCase(),
                            limit: 2
                        })
                        : Promise.resolve([])
                ]);

                if (!cancelled) {
                    setData({
                        category: category || null,
                        articles: articlesResult.slice(0, 3),
                        videos: videosResult,
                        loading: false
                    });
                }
            } catch (error) {
                console.error('Failed to fetch topic hub data:', error);
                if (!cancelled) {
                    setData(prev => ({ ...prev, loading: false }));
                }
            }
        }

        fetchData();
        return () => { cancelled = true; };
    }, [categoryId, showVideos, articleService, videoService, categoryService]);

    return data;
}
