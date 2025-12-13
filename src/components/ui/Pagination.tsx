import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from './Button';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
    className = ''
}) => {
    if (totalPages <= 1) return null;

    // Generate page numbers to show
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            // Always show first, last, and pages around current
            if (currentPage <= 3) {
                pages.push(1, 2, 3, 4, '...', totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
            }
        }
        return pages;
    };

    return (
        <div className={`flex items-center justify-center gap-2 ${className}`}>
            <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="w-9 h-9 p-0 flex items-center justify-center rounded-lg disabled:opacity-50"
                aria-label="Previous page"
            >
                <ChevronLeft size={16} />
            </Button>

            <div className="flex items-center gap-1">
                {getPageNumbers().map((page, index) => (
                    <React.Fragment key={index}>
                        {typeof page === 'number' ? (
                            <button
                                onClick={() => onPageChange(page)}
                                className={`
                                    w-9 h-9 rounded-lg text-sm font-bold transition-all
                                    ${currentPage === page
                                        ? 'bg-primary text-white shadow-md shadow-primary/20'
                                        : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary'
                                    }
                                `}
                                aria-current={currentPage === page ? 'page' : undefined}
                            >
                                {page}
                            </button>
                        ) : (
                            <span className="w-9 h-9 flex items-center justify-center text-text-tertiary">
                                ...
                            </span>
                        )}
                    </React.Fragment>
                ))}
            </div>

            <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className="w-9 h-9 p-0 flex items-center justify-center rounded-lg disabled:opacity-50"
                aria-label="Next page"
            >
                <ChevronRight size={16} />
            </Button>
        </div>
    );
};

export default Pagination;
