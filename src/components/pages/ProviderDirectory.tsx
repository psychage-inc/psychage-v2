import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, MapPin, Check } from 'lucide-react';
import { providerService } from '../../services/providerService';
import { Provider } from '../../types/models';
import ProviderCard from '../providers/ProviderCard';
import Button from '../ui/Button';
import { SkeletonProviderDirectory } from '../ui/Skeletons';
import SEO from '../SEO';

const ProviderDirectory: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [locationSearch, setLocationSearch] = useState('');
    const [sortBy, setSortBy] = useState<'relevance' | 'rating' | 'experience'>('relevance');
    const [isLoading, setIsLoading] = useState(true);
    const [providers, setProviders] = useState<Provider[]>([]);
    const [error, setError] = useState<string | null>(null);

    // Filters
    const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
    const [selectedInsurance, setSelectedInsurance] = useState<string[]>([]);
    const [availabilityFilter, setAvailabilityFilter] = useState<string>('any');
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

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
        setLocationSearch('');
        setSortBy('relevance');
    };

    const filteredProviders = useMemo(() => {
        let filtered = providers.filter(p => {
            const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));

            const matchesLocation = locationSearch === '' || p.location.toLowerCase().includes(locationSearch.toLowerCase());

            const matchesSpecialty = selectedSpecialties.length === 0 || selectedSpecialties.some(s => p.specialties.includes(s));
            const matchesInsurance = selectedInsurance.length === 0 || selectedInsurance.some(i => p.insurance.includes(i));

            let matchesAvailability = true;
            if (availabilityFilter === 'week') matchesAvailability = p.availability.toLowerCase().includes('week') || p.availability.toLowerCase().includes('tomorrow');
            if (availabilityFilter === 'tomorrow') matchesAvailability = p.availability.toLowerCase().includes('tomorrow');

            return matchesSearch && matchesLocation && matchesSpecialty && matchesInsurance && matchesAvailability;
        });

        if (sortBy === 'rating') {
            filtered = [...filtered].sort((a, b) => b.rating - a.rating);
        } else if (sortBy === 'experience') {
            filtered = [...filtered].sort((a, b) => (b.yearsExperience || 0) - (a.yearsExperience || 0));
        }

        return filtered;
    }, [providers, searchTerm, locationSearch, selectedSpecialties, selectedInsurance, availabilityFilter, sortBy]);

    if (isLoading) return <SkeletonProviderDirectory />;
    if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;

    return (
        <div className="min-h-screen bg-[#fafaf9] dark:bg-[#050505] pt-24 pb-20 transition-colors duration-300">
            <SEO title="Find a Therapist | Psychage" description="Connect with verified mental health providers." />

            {/* Header */}
            <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 pb-12 pt-8 mb-8">
                <div className="container mx-auto max-w-[1400px] px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl"
                    >
                        <h1 className="font-display font-bold text-4xl md:text-5xl text-gray-900 dark:text-white mb-6">
                            Find your partner in mental health.
                        </h1>
                        <p className="text-xl text-gray-500 dark:text-gray-400 leading-relaxed mb-8">
                            Connect with verified therapists and psychiatrists who match your specific needs, insurance, and location.
                        </p>

                        {/* Search Bar */}
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="relative flex-grow">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search by name, specialty, or condition..."
                                    className="w-full h-12 pl-12 pr-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all outline-none font-medium text-gray-900 dark:text-white"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="relative md:w-64">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="City or State"
                                    className="w-full h-12 pl-12 pr-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all outline-none font-medium text-gray-900 dark:text-white"
                                    value={locationSearch}
                                    onChange={(e) => setLocationSearch(e.target.value)}
                                />
                            </div>
                            <Button
                                className="h-12 px-8 bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-black dark:hover:bg-gray-100 md:w-auto w-full"
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
                    <aside className={`fixed inset-0 z-50 bg-white dark:bg-gray-900 p-6 lg:static lg:bg-transparent lg:p-0 lg:block w-72 shrink-0 space-y-8 overflow-y-auto transition-transform duration-300 ${isMobileFiltersOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                        <div className="flex items-center justify-between lg:hidden mb-6">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Filters</h2>
                            <button onClick={() => setIsMobileFiltersOpen(false)} className="p-2 text-gray-500">
                                <Check size={24} />
                            </button>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-between">
                                Availability
                            </h3>
                            <div className="space-y-2">
                                {['any', 'week', 'tomorrow'].map(opt => (
                                    <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${availabilityFilter === opt ? 'border-teal-500 bg-teal-500' : 'border-gray-300 dark:border-gray-600 group-hover:border-teal-400'}`}>
                                            {availabilityFilter === opt && <div className="w-2 h-2 bg-white rounded-full" />}
                                        </div>
                                        <input
                                            type="radio"
                                            name="availability"
                                            className="hidden"
                                            checked={availabilityFilter === opt}
                                            onChange={() => setAvailabilityFilter(opt)}
                                        />
                                        <span className="text-gray-600 dark:text-gray-300 capitalize text-sm">
                                            {opt === 'any' ? 'Any time' : opt === 'week' ? 'This week' : 'Tomorrow'}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="w-full h-px bg-gray-200 dark:bg-gray-800" />

                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Specialties</h3>
                            <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                {allSpecialties.map(spec => (
                                    <label key={spec} className="flex items-center gap-3 cursor-pointer group">
                                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedSpecialties.includes(spec) ? 'border-teal-500 bg-teal-500 text-white' : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 group-hover:border-teal-400'}`}>
                                            {selectedSpecialties.includes(spec) && <Check size={12} strokeWidth={3} />}
                                        </div>
                                        <input
                                            type="checkbox"
                                            className="hidden"
                                            checked={selectedSpecialties.includes(spec)}
                                            onChange={() => toggleSpecialty(spec)}
                                        />
                                        <span className="text-gray-600 dark:text-gray-300 text-sm">{spec}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="w-full h-px bg-gray-200 dark:bg-gray-800" />

                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Insurance</h3>
                            <div className="space-y-2">
                                {allInsurance.map(ins => (
                                    <label key={ins} className="flex items-center gap-3 cursor-pointer group">
                                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedInsurance.includes(ins) ? 'border-teal-500 bg-teal-500 text-white' : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 group-hover:border-teal-400'}`}>
                                            {selectedInsurance.includes(ins) && <Check size={12} strokeWidth={3} />}
                                        </div>
                                        <input
                                            type="checkbox"
                                            className="hidden"
                                            checked={selectedInsurance.includes(ins)}
                                            onChange={() => toggleInsurance(ins)}
                                        />
                                        <span className="text-gray-600 dark:text-gray-300 text-sm">{ins}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Results Grid */}
                    <div className="flex-grow">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="font-bold text-gray-900 dark:text-white">
                                {filteredProviders.length} Providers Found
                            </h2>
                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                <span>Sort by:</span>
                                <select
                                    className="bg-transparent font-medium text-gray-900 dark:text-white outline-none cursor-pointer"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as 'relevance' | 'rating' | 'experience')}
                                >
                                    <option value="relevance">Relevance</option>
                                    <option value="rating">Rating</option>
                                    <option value="experience">Experience</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            <AnimatePresence mode='popLayout'>
                                {filteredProviders.map((provider) => (
                                    <ProviderCard key={provider.id} provider={provider} />
                                ))}
                            </AnimatePresence>
                        </div>

                        {filteredProviders.length === 0 && (
                            <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800">
                                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                                    <Filter size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No providers match your filters</h3>
                                <p className="text-gray-500 dark:text-gray-400 mb-6">Try removing some filters or adjusting your search.</p>
                                <Button onClick={clearFilters} variant="outline">Clear All Filters</Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProviderDirectory;