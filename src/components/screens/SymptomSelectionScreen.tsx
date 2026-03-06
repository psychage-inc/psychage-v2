import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigator } from '../../context/NavigatorContext';
import { SymptomSearch } from '../navigator/SymptomSearch';
import { SymptomCategory } from '../navigator/SymptomCategory';
import { SymptomToggle } from '../navigator/SymptomToggle';
import { NavigatorButton } from '../navigator/NavigatorButton';
import { SafetyBanner } from '../navigator/SafetyBanner';
import { ContentLanguageNotice } from '../navigator/ContentLanguageNotice';
import { Symptom, SymptomCategory as CategoryType } from '../../lib/navigator/types';
import { ShieldAlert, SearchX } from 'lucide-react';
import { useDebounce } from '../../hooks/useDebounce';

export const SymptomSelectionScreen: React.FC = () => {
    const { t } = useTranslation();
    const { state, dispatch, announcePolite } = useNavigator();
    const { knowledgeBase, selectedDomains, selectedSymptoms, crisisTriggered } = state;
    const [searchQuery, setSearchQuery] = useState('');

    // Debounced announcement to prevent screen reader spam (WCAG 4.1.3)
    const debouncedAnnounce = useDebounce(announcePolite, 300);

    // Handle loading state
    if (state.isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4" aria-busy="true" aria-live="polite">
                <div className="w-8 h-8 border-4 border-teal-500/30 border-t-teal-500 rounded-full animate-spin" />
                <p className="text-charcoal-300 font-medium tracking-wide">Loading symptoms...</p>
            </div>
        );
    }

    // Handle error state
    if (state.error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-6 text-center px-4" role="alert">
                <div className="w-16 h-16 bg-crisis-red/10 rounded-full flex items-center justify-center">
                    <ShieldAlert className="w-8 h-8 text-crisis-red" />
                </div>
                <div>
                    <h3 className="text-2xl font-serif text-white mb-2">We encountered an issue</h3>
                    <p className="text-charcoal-300 max-w-md">{state.error}</p>
                </div>
                <NavigatorButton
                    variant="outline"
                    onClick={() => dispatch({ type: 'RESET_FLOW' })}
                >
                    Start Over
                </NavigatorButton>
            </div>
        );
    }

    // Handle empty knowledge base
    if (!knowledgeBase) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-6 text-center px-4">
                <h3 className="text-2xl font-serif text-white mb-2">Knowledge Base Unavailable</h3>
                <p className="text-charcoal-300 max-w-md">The symptom data is currently not available. Please try again later.</p>
                <NavigatorButton
                    variant="outline"
                    onClick={() => dispatch({ type: 'RESET_FLOW' })}
                >
                    Start Over
                </NavigatorButton>
            </div>
        );
    }

    // Filter symptoms based on search query AND selected domains
    const filteredSymptoms = useMemo(() => {
        let symptoms = knowledgeBase.symptoms;

        // Filter by domain
        if (selectedDomains.length > 0) {
            symptoms = symptoms.filter(s => selectedDomains.includes(s.domain));
        }

        // Filter by search
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            symptoms = symptoms.filter(s =>
                s.name.toLowerCase().includes(q) ||
                s.description?.toLowerCase().includes(q) ||
                s.synonyms?.some(syn => syn.toLowerCase().includes(q))
            );
        }

        return symptoms;
    }, [knowledgeBase.symptoms, selectedDomains, searchQuery]);

    // Group symptoms by category
    const groupedSymptoms = useMemo(() => {
        const groups: Record<string, Symptom[]> = {};
        filteredSymptoms.forEach(symptom => {
            const category = symptom.category;
            if (!groups[category]) {
                groups[category] = [];
            }
            groups[category].push(symptom);
        });
        return groups;
    }, [filteredSymptoms]);

    const handleToggleSymptom = (id: string) => {
        dispatch({ type: 'TOGGLE_SYMPTOM', payload: id });

        const isCurrentlySelected = selectedSymptoms.has(id);
        const newCount = isCurrentlySelected ? selectedSymptoms.size - 1 : selectedSymptoms.size + 1;

        // Debounced announcement to prevent screen reader spam during rapid toggles (WCAG 4.1.3)
        debouncedAnnounce(`${newCount} symptom${newCount !== 1 ? 's' : ''} selected`);

        // Safety check - if this symptom has a red flag associated with it
        const symptom = knowledgeBase.symptoms.find(s => s.id === id);
        if (symptom?.red_flag_level && !selectedSymptoms.has(id)) {
            // Trigger crisis mode if it's high or emergent (announce assertively, not debounced)
            if (symptom.red_flag_level === 'CRISIS' || symptom.red_flag_level === 'URGENT') {
                dispatch({ type: 'TRIGGER_CRISIS', payload: symptom.red_flag_level });
            }
        }
    };

    const selectedCount = selectedSymptoms.size;

    const handleNext = () => {
        if (selectedCount > 0) {
            dispatch({ type: 'SET_STEP', payload: 'details' });
        }
    };

    // Category actions: select all / clear all in a category
    const handleSelectAllInCategory = (categorySymptoms: Symptom[]) => {
        categorySymptoms.forEach(symptom => {
            if (!selectedSymptoms.has(symptom.id)) {
                dispatch({ type: 'TOGGLE_SYMPTOM', payload: symptom.id });
            }
        });
        announcePolite(`All ${categorySymptoms.length} symptoms in category selected`);
    };

    const handleClearCategory = (categorySymptoms: Symptom[]) => {
        categorySymptoms.forEach(symptom => {
            if (selectedSymptoms.has(symptom.id)) {
                dispatch({ type: 'TOGGLE_SYMPTOM', payload: symptom.id });
            }
        });
        announcePolite(`Category cleared`);
    };

    return (
        <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 relative">
            <div className="mb-8">
                <ContentLanguageNotice />
                <h2 className="text-3xl sm:text-4xl font-serif font-medium text-white mb-4">
                    {t('navigator.symptom_selection.title')}
                </h2>
                <p className="text-lg text-charcoal-300">
                    {t('navigator.symptom_selection.subtitle')}
                </p>
            </div>

            <div className="sticky top-16 lg:top-24 z-20 bg-charcoal-950/80 backdrop-blur-xl pb-4 pt-4 -mx-4 px-4 sm:-mx-6 sm:px-6 border-b border-white/5 shadow-sm">
                <SymptomSearch
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder={t('navigator.symptom_selection.search_placeholder')}
                />
            </div>

            <AnimatePresence>
                {!crisisTriggered && selectedCount > 0 && selectedCount <= 3 && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                        <SafetyBanner />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="space-y-6 mt-6 pb-36 sm:pb-40">
                {Object.keys(groupedSymptoms).length === 0 ? (
                    <div className="text-center py-16 px-6 bg-white/5 backdrop-blur-sm rounded-2xl border-2 border-dashed border-white/10 space-y-5 max-w-xl mx-auto">
                        <div className="w-16 h-16 mx-auto bg-charcoal-800/50 rounded-full flex items-center justify-center border border-white/5">
                            <SearchX className="w-8 h-8 text-charcoal-400" aria-hidden="true" />
                        </div>
                        <div className="space-y-2">
                            <p className="text-white font-semibold text-lg">
                                No symptoms match "{searchQuery}"
                            </p>
                            <p className="text-charcoal-300 text-sm leading-relaxed">
                                Try using fewer words, a different term, or check your spelling. This tool includes {knowledgeBase?.symptoms.length || 82} symptoms across 12 categories.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                            <button
                                type="button"
                                onClick={() => setSearchQuery('')}
                                className="px-5 py-2.5 text-teal-400 hover:text-teal-300 hover:bg-teal-500/10 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-900 transition-colors rounded-lg border border-teal-500/30 hover:border-teal-400/50"
                            >
                                Clear search
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setSearchQuery('');
                                    dispatch({ type: 'SELECT_ALL_DOMAINS' });
                                }}
                                className="px-5 py-2.5 text-charcoal-200 hover:text-white hover:bg-white/10 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-900 transition-colors rounded-lg border border-white/10 hover:border-white/20"
                            >
                                Show all symptoms
                            </button>
                        </div>
                    </div>
                ) : (
                    Object.entries(groupedSymptoms).map(([category, symptoms]) => {
                        const categorySelectedCount = symptoms.filter(s => selectedSymptoms.has(s.id)).length;
                        return (
                            <SymptomCategory
                                key={category}
                                category={category as CategoryType}
                                title={category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                count={symptoms.length}
                                initiallyExpanded={true}
                                onSelectAll={() => handleSelectAllInCategory(symptoms)}
                                onClearAll={() => handleClearCategory(symptoms)}
                                selectedCount={categorySelectedCount}
                            >
                                {symptoms.map(symptom => (
                                    <SymptomToggle
                                        key={symptom.id}
                                        symptom={symptom}
                                        isSelected={selectedSymptoms.has(symptom.id)}
                                        onToggle={handleToggleSymptom}
                                        searchQuery={searchQuery}
                                    />
                                ))}
                            </SymptomCategory>
                        );
                    })
                )}
            </div>

            {/* Floating Bottom Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-charcoal-950/80 backdrop-blur-xl border-t border-white/10 p-4 pb-safe sm:p-6 sm:pb-safe z-30 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] transform translate-y-0 pb-8 sm:pb-8">
                <div className="max-w-3xl mx-auto flex items-center justify-between gap-3">
                    <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
                        <p className="text-charcoal-200 font-medium tracking-wide" aria-live="polite" aria-atomic="true">
                            <motion.span
                                key={selectedCount}
                                initial={{ scale: 1 }}
                                animate={{ scale: [1, 1.15, 1] }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className="text-white font-bold inline-block"
                            >
                                {selectedCount}
                            </motion.span>{' '}
                            <span className="inline sm:inline">{t('navigator.symptom_selection.symptoms_selected', { count: selectedCount })}</span>
                        </p>
                    </div>

                    <NavigatorButton
                        size="lg"
                        variant="primary"
                        onClick={handleNext}
                        isDisabled={selectedCount === 0}
                        className="flex-shrink-0 min-w-[140px] sm:min-w-[200px]"
                    >
                        {t('navigator.symptom_selection.continue')}
                    </NavigatorButton>
                </div>
            </div>
        </div>
    );
};
