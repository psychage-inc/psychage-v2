import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useArticleService } from '@/services/articleService';
import { getArticleUrl } from '@/lib/articleUrl';

/**
 * Backward-compatibility redirect: /learn/article/:id → /learn/:categorySlug/:articleSlug
 */
const ArticleRedirect: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const articleService = useArticleService();
    const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const resolve = async () => {
            if (!id) { setNotFound(true); return; }
            try {
                const article = await articleService.getById(id);
                if (article) {
                    setRedirectUrl(getArticleUrl(article));
                } else {
                    setNotFound(true);
                }
            } catch {
                setNotFound(true);
            }
        };
        resolve();
    }, [id, articleService]);

    if (notFound) return <Navigate to="/learn" replace />;
    if (redirectUrl) return <Navigate to={redirectUrl} replace />;

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
        </div>
    );
};

export default ArticleRedirect;
