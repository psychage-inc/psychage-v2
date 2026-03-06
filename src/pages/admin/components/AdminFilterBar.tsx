import React from 'react';
import { Input } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Search, X } from 'lucide-react';

interface FilterOption {
    key: string;
    label: string;
}

interface AdminFilterBarProps {
    searchValue: string;
    onSearchChange: (value: string) => void;
    searchPlaceholder?: string;
    filters?: FilterOption[];
    activeFilter?: string;
    onFilterChange?: (key: string) => void;
}

const AdminFilterBar: React.FC<AdminFilterBarProps> = ({
    searchValue,
    onSearchChange,
    searchPlaceholder = 'Search...',
    filters,
    activeFilter,
    onFilterChange,
}) => {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
                <Input
                    value={searchValue}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder={searchPlaceholder}
                    className="pl-9 pr-9"
                />
                {searchValue && (
                    <button
                        onClick={() => onSearchChange('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-primary transition-colors"
                        aria-label="Clear search"
                    >
                        <X size={14} />
                    </button>
                )}
            </div>

            {filters && filters.length > 0 && onFilterChange && (
                <div className="flex gap-2 flex-wrap">
                    {filters.map((filter) => (
                        <Button
                            key={filter.key}
                            variant={activeFilter === filter.key ? 'primary' : 'outline'}
                            size="sm"
                            onClick={() => onFilterChange(filter.key)}
                            className="capitalize"
                        >
                            {filter.label}
                        </Button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminFilterBar;
