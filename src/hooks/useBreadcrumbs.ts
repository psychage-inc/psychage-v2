import { useLocation, useParams, matchPath } from 'react-router-dom';
import { breadcrumbConfig } from '../config/breadcrumbs';

export function useBreadcrumbs() {
    const location = useLocation();
    const params = useParams();

    const getBreadcrumbs = (pageData?: { title?: string; name?: string }) => {
        // Helper to find matching pattern
        const findMatchingPattern = (pathname: string) => {
            // Sort patterns by length descending to match most specific first
            const patterns = Object.keys(breadcrumbConfig).sort((a, b) => b.length - a.length);

            for (const pattern of patterns) {
                if (matchPath(pattern, pathname)) {
                    return pattern;
                }
            }
            return null;
        };

        const pattern = findMatchingPattern(location.pathname);
        if (!pattern) return [];

        const config = breadcrumbConfig[pattern];

        // Helper to replace dynamic segments
        const replaceDynamicLabel = (label: string, params: Record<string, string | undefined>, data?: any) => {
            if (label.startsWith(':')) {
                const key = label.substring(1);
                if (data && data[key]) return data[key]; // Prioritize page data (e.g., :title -> article title)
                if (params[key]) return params[key]; // Fallback to URL params
                return label; // Fallback to raw label if missing
            }
            return label;
        };

        const replaceDynamicPath = (path: string, params: Record<string, string | undefined>, data?: any) => {
            return path.split('/').map(segment => {
                if (segment.startsWith(':')) {
                    const key = segment.substring(1);
                    // Check params first, then pageData
                    if (params[key]) return params[key];
                    if (data && data[key]) return data[key];
                    return segment;
                }
                return segment;
            }).join('/');
        };

        return config.map(item => ({
            ...item,
            label: replaceDynamicLabel(item.label, params, pageData),
            href: item.href ? replaceDynamicPath(item.href, params, pageData) : undefined
        }));
    };

    return { getBreadcrumbs };
}
