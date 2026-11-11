import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, MapPin } from 'lucide-react';
import Button from '@/components/ui/Button';

interface ProviderSearchBarProps {
  initialQuery?: string;
  initialLocation?: string;
  onSearch: (query: string, location: string) => void;
}

export const ProviderSearchBar: React.FC<ProviderSearchBarProps> = ({
  initialQuery = '',
  initialLocation = '',
  onSearch,
}) => {
  const { t } = useTranslation();
  const [query, setQuery] = useState(initialQuery);
  const [location, setLocation] = useState(initialLocation);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, location);
  };

  // Re-sync the inputs when the URL-derived props change (chip clear, "Clear
  // all", back/forward). Without this the box keeps showing stale text and a
  // submit silently re-applies the removed query/location.
  React.useEffect(() => { setQuery(initialQuery); }, [initialQuery]);
  React.useEffect(() => { setLocation(initialLocation); }, [initialLocation]);

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Keyword input */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary" size={18} />
          <input
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={t('providers.searchbar.query_placeholder')}
            aria-label={t('providers.searchbar.query_aria')}
            className="w-full pl-11 pr-4 py-3.5 bg-surface border border-border rounded-xl text-base font-medium text-text-primary placeholder:text-text-tertiary focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>

        {/* Location input */}
        <div className="relative sm:w-64">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary" size={18} />
          <input
            type="text"
            value={location}
            onChange={e => setLocation(e.target.value)}
            placeholder={t('providers.searchbar.location_placeholder')}
            aria-label={t('providers.searchbar.location_aria')}
            className="w-full pl-11 pr-4 py-3.5 bg-surface border border-border rounded-xl text-base font-medium text-text-primary placeholder:text-text-tertiary focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>

        {/* Search button */}
        <Button
          type="submit"
          className="bg-primary hover:bg-primary-hover text-white font-bold text-sm px-8 py-3.5 rounded-xl"
        >
          {t('providers.search.search_button')}
        </Button>
      </div>
    </form>
  );
};

export default ProviderSearchBar;
