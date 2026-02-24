import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigator } from '../../context/NavigatorContext';
import { SymptomSearch } from '../navigator/SymptomSearch';
import { SymptomCategory } from '../navigator/SymptomCategory';
import { SymptomToggle } from '../navigator/SymptomToggle';
import { NavigatorButton } from '../navigator/NavigatorButton';
import { SafetyBanner } from '../navigator/SafetyBanner';
import { Symptom, SymptomCategory as CategoryType } from '../../lib/navigator/types';

export const SymptomSelectionScreen: React.FC = () => {
    const { state, dispatch } = useNavigator();
    const { knowledgeBase, selectedDomains, selectedSymptoms, crisisTriggered } = state;
    const [searchQuery, setSearchQuery] = useState('');

    // If knowledge base isn't loaded yet, return null
    if (!knowledgeBase) return null;

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

        // Safety check - if this symptom has a red flag associated with it
        const symptom = knowledgeBase.symptoms.find(s => s.id === id);
        if (symptom?.red_flag_level && !selectedSymptoms.has(id)) {
            // Trigger crisis mode if it's high or emergent
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

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto py-8 px-4 sm:px-6 relative"
        >
            <div className="mb-8">
                <h2 className="text-3xl sm:text-4xl font-serif font-medium text-white mb-4">
                    Select what you're experiencing
                </h2>
                <p className="text-lg text-charcoal-300">
                    Choose all the symptoms that apply to you. You can use the search bar to find specific things quickly.
                </p>
            </div>

            <div className="sticky top-16 lg:top-24 z-20 bg-charcoal-950/80 backdrop-blur-xl pb-4 pt-4 -mx-4 px-4 sm:-mx-6 sm:px-6 border-b border-white/5 shadow-sm">
                <SymptomSearch
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder="Search symptoms (e.g., sleep, tired, anxious)..."
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
                    <div className="text-center py-12 px-4 bg-white/5 backdrop-blur-sm rounded-2xl border-2 border-dashed border-white/10">
                        <p className="text-charcoal-300 font-medium">
                            No symptoms found matching your search.
                        </p>
                        <button
                            onClick={() => setSearchQuery('')}
                            className="mt-3 text-teal-400 hover:text-teal-300 hover:underline font-medium focus:outline-none transition-colors"
                        >
                            Clear search
                        </button>
                    </div>
                ) : (
                    Object.entries(groupedSymptoms).map(([category, symptoms]) => (
                        <SymptomCategory
                            key={category}
                            category={category as CategoryType}
                            title={category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            count={symptoms.length}
                            initiallyExpanded={true}
                        >
                            {symptoms.map(symptom => (
                                <SymptomToggle
                                    key={symptom.id}
                                    symptom={symptom}
                                    isSelected={selectedSymptoms.has(symptom.id)}
                                    onToggle={handleToggleSymptom}
                                />
                            ))}
                        </SymptomCategory>
                    ))
                )}
            </div>

            {/* Floating Bottom Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 bg-charcoal-950/80 backdrop-blur-xl border-t border-white/10 p-4 pb-safe sm:p-6 sm:pb-safe z-30 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] transform translate-y-0 pb-8 sm:pb-8">
                <div className="max-w-3xl mx-auto flex items-center justify-between">
                    <div className="hidden sm:block bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
                        <p className="text-charcoal-200 font-medium tracking-wide">
                            <span className="text-white font-bold">{selectedCount}</span> symptom{selectedCount !== 1 ? 's' : ''} selected
                        </p>
                    </div>

                    <NavigatorButton
                        size="lg"
                        variant="primary"
                        onClick={handleNext}
                        isDisabled={selectedCount === 0}
                        className="w-full sm:w-auto min-w-[200px]"
                    >
                        Continue to Details
                    </NavigatorButton>
                </div>
            </div>
        </motion.div>
    );
};
