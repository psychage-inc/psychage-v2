import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
    className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
    return (
        <nav aria-label="Breadcrumb" className={`flex items-center text-sm text-text-tertiary ${className}`}>
            <ol className="flex items-center flex-wrap gap-2">
                <li className="flex items-center hover:text-text-primary transition-colors">
                    <Link to="/" aria-label="Home">
                        <Home size={14} />
                    </Link>
                </li>

                {items.map((item, index) => {
                    const isLast = index === items.length - 1;

                    return (
                        <li key={index} className="flex items-center">
                            <ChevronRight size={14} className="mx-1 text-text-tertiary/50" />
                            {item.href && !isLast ? (
                                <Link
                                    to={item.href}
                                    className="hover:text-text-primary transition-colors hover:underline decoration-border underline-offset-4"
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <span className="font-medium text-text-primary" aria-current="page">
                                    {item.label}
                                </span>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
