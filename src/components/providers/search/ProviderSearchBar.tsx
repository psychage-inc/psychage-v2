import React, { useState } from 'react';
import { Search, MapPin, Crosshair } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useGeolocation } from '@/hooks/useGeolocation';

interface ProviderSearchBarProps {
  initialQuery?: string;
  initialLocation?: string;
  onSearch: (query: string, location: string) => void;
  onUseLocation?: (lat: number, lng: number) => void;
}

export const ProviderSearchBar: React.FC<ProviderSearchBarProps> = ({
  initialQuery = '',
  initialLocation = '',
  onSearch,
  onUseLocation,
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [location, setLocation] = useState(initialLocation);
  const { requestLocation, isLoading: geoLoading, latitude, longitude } = useGeolocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, location);
  };

  const handleUseLocation = () => {
    requestLocation();
  };

  // When geolocation resolves, notify parent
  React.useEffect(() => {
    if (latitude != null && longitude != null && onUseLocation) {
      onUseLocation(latitude, longitude);
      setLocation('Near me');
    }
  }, [latitude, longitude]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Keyword input */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary" size={18} />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by name, specialty, or condition..."
            className="w-full pl-11 pr-4 py-3.5 bg-surface border border-border rounded-xl text-sm font-medium text-text-primary placeholder:text-text-tertiary focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>

        {/* Location input */}
        <div className="relative sm:w-64">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary" size={18} />
          <input
            type="text"
            value={location}
            onChange={e => setLocation(e.target.value)}
            placeholder="City, state, or zip..."
            className="w-full pl-11 pr-10 py-3.5 bg-surface border border-border rounded-xl text-sm font-medium text-text-primary placeholder:text-text-tertiary focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
          <button
            type="button"
            onClick={handleUseLocation}
            disabled={geoLoading}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-primary transition-colors disabled:opacity-50"
            title="Use my location"
            aria-label="Use my location"
          >
            <Crosshair size={16} className={geoLoading ? 'animate-spin' : ''} />
          </button>
        </div>

        {/* Search button */}
        <Button
          type="submit"
          className="bg-primary hover:bg-primary-hover text-white font-bold text-sm px-8 py-3.5 rounded-xl"
        >
          Search
        </Button>
      </div>
    </form>
  );
};

export default ProviderSearchBar;
