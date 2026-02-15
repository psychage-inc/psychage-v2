import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    items?: BreadcrumbItem[];
    className?: string;
    pageData?: any;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className, pageData }) => {
    const { getBreadcrumbs } = useBreadcrumbs();

    // Use provided items or generate them automatically
    const breadcrumbs = items || getBreadcrumbs(pageData);

    if (!breadcrumbs.length) return null;

    return (
        <nav aria-label="Breadcrumb" className={cn("flex items-center text-sm text-text-tertiary", className)}>
            <div className="flex items-center flex-wrap gap-2">
                {!items && (
                    <Link to="/" aria-label="Home" className="flex items-center hover:text-text-primary transition-colors">
                        <Home size={14} />
                    </Link>
                )}

                {breadcrumbs.map((item, index) => {
                    const isLast = index === breadcrumbs.length - 1;
                    const showSeparator = index > 0 || (!items && index === 0); // If auto, first item needs separator from Home icon? No, wait. 
                    // My hook implementation might include Home? Let's check hook.
                    // useBreadcrumbs hook config: usually doesn't include Home unless path includes it.
                    // But standard breadcrumbs usually start with Home.
                    // Let's assume the hook returns the path segments.
                    // If I put Home icon manually first, then I need separator before the first item?
                    // Typically: Home > Dashboard > Profile

                    return (
                        <div key={item.href || index} className="flex items-center">
                            {(index > 0 || !items) && <ChevronRight size={14} className="mx-2 text-text-tertiary/50" />}

                            {item.href && !isLast ? (
                                <Link
                                    to={item.href}
                                    className="hover:text-primary transition-colors hover:underline decoration-border underline-offset-4"
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <span className={cn("font-medium max-w-[200px] md:max-w-xs truncate", isLast ? "text-text-primary" : "")} aria-current={isLast ? 'page' : undefined}>
                                    {item.label}
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>
        </nav>
    );
};

export default Breadcrumbs;
