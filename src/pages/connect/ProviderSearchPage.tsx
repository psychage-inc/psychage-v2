import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, MapPin, ArrowLeft, Check, RefreshCw } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { providerService } from '@/services/providerService';
import { Provider } from '@/types/models';
import ProviderCard from '@/components/providers/ProviderCard';
import Button from '@/components/ui/Button';
import Pagination from '@/components/ui/Pagination';
import { SkeletonProviderDirectory } from '@/components/ui/Skeletons';
import SEO from '@/components/SEO';

const ProviderSearchPage: React.FC = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    // Core Data
    const [providers, setProviders] = useState<Provider[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Search & Filter State
    const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
    const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
    const [selectedInsurance, setSelectedInsurance] = useState<string[]>([]);
    const [availabilityFilter, setAvailabilityFilter] = useState<string>('any');
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

    // Pagination & Sorting State
    const [currentPage, setCurrentPage] = useState(1);
    const [sortOption, setSortOption] = useState('relevance');
    const ITEMS_PER_PAGE = 12;

    // Fetch providers
    useEffect(() => {
        const fetchProviders = async () => {
            try {
                setIsLoading(true);
                const data = await providerService.getAll();
                setProviders(data);
            } catch (err) {
                setError('Failed to load providers. Please try again later.');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProviders();
    }, []);

    // Sync URL search param with internal state
    useEffect(() => {
        const query = searchParams.get('q');
        if (query !== null) {
            setSearchTerm(query);
        }
    }, [searchParams]);

    // Update URL when search changes
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchTerm) {
                setSearchParams({ q: searchTerm });
            } else {
                setSearchParams({});
            }
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [searchTerm, setSearchParams]);

    // Reset page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedSpecialties, selectedInsurance, availabilityFilter, sortOption]);

    // Extract unique values for filters
    const allSpecialties = useMemo(() => {
        const specialties = new Set<string>();
        providers.forEach(p => p.specialties.forEach(s => specialties.add(s)));
        return Array.from(specialties).sort();
    }, [providers]);

    const allInsurance = useMemo(() => {
        const insurance = new Set<string>();
        providers.forEach(p => p.insurance.forEach(i => insurance.add(i)));
        return Array.from(insurance).sort();
    }, [providers]);

    const toggleSpecialty = (spec: string) => {
        setSelectedSpecialties(prev => prev.includes(spec) ? prev.filter(s => s !== spec) : [...prev, spec]);
    };

    const toggleInsurance = (ins: string) => {
        setSelectedInsurance(prev => prev.includes(ins) ? prev.filter(i => i !== ins) : [...prev, ins]);
    };

    const clearFilters = () => {
        setSelectedSpecialties([]);
        setSelectedInsurance([]);
        setAvailabilityFilter('any');
        setSearchTerm('');
        setSortOption('relevance');
    };

    // Filter Logic
    const filteredProviders = useMemo(() => {
        return providers.filter(p => {
            const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));

            const matchesSpecialty = selectedSpecialties.length === 0 || selectedSpecialties.some(s => p.specialties.includes(s));
            const matchesInsurance = selectedInsurance.length === 0 || selectedInsurance.some(i => p.insurance.includes(i));

            let matchesAvailability = true;
            if (availabilityFilter === 'week') matchesAvailability = p.availability.toLowerCase().includes('week') || p.availability.toLowerCase().includes('tomorrow');
            if (availabilityFilter === 'tomorrow') matchesAvailability = p.availability.toLowerCase().includes('tomorrow');

            return matchesSearch && matchesSpecialty && matchesInsurance && matchesAvailability;
        });
    }, [providers, searchTerm, selectedSpecialties, selectedInsurance, availabilityFilter]);

    // Sorting Logic
    const sortedProviders = useMemo(() => {
        const result = [...filteredProviders];
        if (sortOption === 'rating') {
            result.sort((a, b) => b.rating - a.rating);
        } else if (sortOption === 'experience') {
            result.sort((a, b) => b.yearsExperience - a.yearsExperience);
        }
        // 'relevance' (default) keeps original order
        return result;
    }, [filteredProviders, sortOption]);

    // Pagination Logic
    const totalPages = Math.ceil(sortedProviders.length / ITEMS_PER_PAGE);
    const displayedProviders = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return sortedProviders.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [sortedProviders, currentPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (isLoading) return <SkeletonProviderDirectory />;
    if (error) return <div className="min-h-screen pt-32 flex items-center justify-center text-error">{error}</div>;

    return (
        <div className="min-h-screen bg-background pt-24 pb-20 transition-colors duration-300">
            <SEO title="Find a Therapist | Psychage Connect" description="Connect with verified mental health providers." />

            {/* Header */}
            <div className="bg-surface border-b border-border pb-12 pt-8 mb-8">
                <div className="container mx-auto max-w-[1400px] px-6">
                    <Link to="/connect" className="flex items-center gap-2 text-text-tertiary hover:text-text-primary mb-8 font-bold text-sm uppercase tracking-wider transition-colors">
                        <ArrowLeft size={16} /> Back to Hub
                    </Link>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl"
                    >
                        <h1 className="font-display font-bold text-4xl md:text-5xl text-text-primary mb-6">
                            Find your partner in mental health.
                        </h1>

                        {/* Search Bar */}
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="relative flex-grow">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search by name, specialty, or condition..."
                                    className="w-full h-12 pl-12 pr-4 rounded-xl bg-surface-hover border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-medium text-text-primary"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="relative md:w-64">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary" size={20} />
                                <input
                                    type="text"
                                    placeholder="City or Zip"
                                    className="w-full h-12 pl-12 pr-4 rounded-xl bg-surface-hover border border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-medium text-text-primary"
                                />
                            </div>
                            <Button
                                className="h-12 px-8 bg-text-primary text-background hover:bg-text-primary/90 md:w-auto w-full"
                                onClick={() => setIsMobileFiltersOpen(true)}
                            >
                                <span className="md:hidden flex items-center gap-2"><Filter size={18} /> Filters</span>
                                <span className="hidden md:inline">Search</span>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="container mx-auto max-w-[1400px] px-6">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Sidebar Filters (Desktop & Mobile Overlay) */}
                    <aside className={`fixed inset-0 z-50 bg-surface p-6 lg:static lg:bg-transparent lg:p-0 lg:block w-72 shrink-0 space-y-8 overflow-y-auto transition-transform duration-300 ${isMobileFiltersOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                        <div className="flex items-center justify-between lg:hidden mb-6">
                            <h2 className="text-xl font-bold text-text-primary">Filters</h2>
                            <button onClick={() => setIsMobileFiltersOpen(false)} className="p-2 text-text-tertiary">
                                <Check size={24} />
                            </button>
                        </div>
                        <div>
                            <h3 className="font-bold text-text-primary mb-4 flex items-center justify-between">
                                Availability
                            </h3>
                            <div className="space-y-2">
                                {['any', 'week', 'tomorrow'].map(opt => (
                                    <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${availabilityFilter === opt ? 'border-primary bg-primary' : 'border-border group-hover:border-primary'}`}>
                                            {availabilityFilter === opt && <div className="w-2 h-2 bg-white rounded-full" />}
                                        </div>
                                        <input
                                            type="radio"
                                            name="availability"
                                            className="hidden"
                                            checked={availabilityFilter === opt}
                                            onChange={() => setAvailabilityFilter(opt)}
                                        />
                                        <span className="text-text-secondary capitalize text-sm">
                                            {opt === 'any' ? 'Any time' : opt === 'week' ? 'This week' : 'Tomorrow'}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="w-full h-px bg-border" />

                        <div>
                            <h3 className="font-bold text-text-primary mb-4">Specialties</h3>
                            <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                {allSpecialties.map(spec => (
                                    <label key={spec} className="flex items-center gap-3 cursor-pointer group">
                                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedSpecialties.includes(spec) ? 'border-primary bg-primary text-white' : 'border-border bg-surface group-hover:border-primary'}`}>
                                            {selectedSpecialties.includes(spec) && <Check size={12} strokeWidth={3} />}
                                        </div>
                                        <input
                                            type="checkbox"
                                            className="hidden"
                                            checked={selectedSpecialties.includes(spec)}
                                            onChange={() => toggleSpecialty(spec)}
                                        />
                                        <span className="text-text-secondary text-sm">{spec}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="w-full h-px bg-border" />

                        <div>
                            <h3 className="font-bold text-text-primary mb-4">Insurance</h3>
                            <div className="space-y-2">
                                {allInsurance.map(ins => (
                                    <label key={ins} className="flex items-center gap-3 cursor-pointer group">
                                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedInsurance.includes(ins) ? 'border-primary bg-primary text-white' : 'border-border bg-surface group-hover:border-primary'}`}>
                                            {selectedInsurance.includes(ins) && <Check size={12} strokeWidth={3} />}
                                        </div>
                                        <input
                                            type="checkbox"
                                            className="hidden"
                                            checked={selectedInsurance.includes(ins)}
                                            onChange={() => toggleInsurance(ins)}
                                        />
                                        <span className="text-text-secondary text-sm">{ins}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Results Grid */}
                    <div className="flex-grow">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="font-bold text-text-primary">
                                {sortedProviders.length} Providers Found
                            </h2>
                            <div className="flex items-center gap-2 text-sm text-text-secondary">
                                <span>Sort by:</span>
                                <select
                                    value={sortOption}
                                    onChange={(e) => setSortOption(e.target.value)}
                                    className="bg-transparent font-medium text-text-primary outline-none cursor-pointer border-none focus:ring-0 p-0"
                                >
                                    <option value="relevance">Relevance</option>
                                    <option value="rating">Highest Rated</option>
                                    <option value="experience">Most Experienced</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
                            <AnimatePresence mode='popLayout'>
                                {displayedProviders.length > 0 ? (
                                    displayedProviders.map((provider) => (
                                        <ProviderCard key={provider.id} provider={provider} />
                                    ))
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="col-span-full py-20 text-center"
                                    >
                                        <div className="w-20 h-20 bg-surface-hover rounded-full flex items-center justify-center mx-auto mb-6 text-text-tertiary">
                                            <Search size={40} />
                                        </div>
                                        <h3 className="text-xl font-bold text-text-primary mb-2">No providers match your search</h3>
                                        <p className="text-text-secondary mb-8 max-w-md mx-auto">
                                            Try adjusting your filters, clearing your search terms, or browsing all available providers.
                                        </p>
                                        <Button
                                            onClick={clearFilters}
                                            variant="outline"
                                            leftIcon={<RefreshCw size={16} />}
                                        >
                                            Reset All Filters
                                        </Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Pagination */}
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                            className="mt-8"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProviderSearchPage;
