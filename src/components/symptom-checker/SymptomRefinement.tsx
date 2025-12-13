
import React from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { SYMPTOMS } from '../../data/symptom-checker';

interface RefinementProps {
    selectedIds: string[];
    onNext: () => void;
}

const SymptomRefinement: React.FC<RefinementProps> = ({ selectedIds, onNext }) => {
    // In a real app we'd capture this state, for MVP we just want the interaction

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-display font-bold text-text-primary mb-4 text-center">Let's get more detail.</h1>
            <p className="text-text-secondary text-center mb-10 text-lg">
                Help us understand the severity of what you're experiencing.
            </p>

            <div className="space-y-6 mb-12">
                {selectedIds.map((id, index) => {
                    const symptom = SYMPTOMS.find(s => s.id === id);
                    if (!symptom) return null;

                    return (
                        <motion.div
                            key={id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-surface border border-border rounded-2xl p-6 md:p-8"
                        >
                            <h3 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-3">
                                {symptom.label}
                                <span className={`text-xs px-2 py-1 rounded-md uppercase tracking-wider bg-surface-hover ${symptom.category === 'emotional' ? 'text-blue-500' :
                                    symptom.category === 'physical' ? 'text-amber-500' :
                                        symptom.category === 'cognitive' ? 'text-purple-500' : 'text-green-500'
                                    }`}>
                                    {symptom.category}
                                </span>
                            </h3>

                            <div className="space-y-6">
                                {/* Severity Slider */}
                                <div>
                                    <label className="block text-sm font-bold text-text-tertiary uppercase tracking-wider mb-4">Severity</label>
                                    <input
                                        type="range"
                                        min="1"
                                        max="10"
                                        defaultValue="5"
                                        className="w-full h-2 bg-surface-hover rounded-lg appearance-none cursor-pointer accent-primary"
                                    />
                                    <div className="flex justify-between text-xs text-text-tertiary mt-2">
                                        <span>Mild</span>
                                        <span>Moderate</span>
                                        <span>Severe</span>
                                    </div>
                                </div>

                                {/* Duration */}
                                <div>
                                    <label className="block text-sm font-bold text-text-tertiary uppercase tracking-wider mb-4">How long?</label>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                        {['Just today', 'A few days', 'Weeks', 'Months+'].map(duration => (
                                            <button
                                                key={duration}
                                                className="px-3 py-2 rounded-lg border border-border text-sm font-medium hover:bg-surface-hover hover:border-text-tertiary text-text-secondary transition-colors focus:ring-2 focus:ring-primary/20 focus:border-primary active:bg-primary/5 active:border-primary active:text-primary"
                                                onClick={(e) => {
                                                    // Quick active state toggle for demo
                                                    e.currentTarget.classList.toggle('border-primary');
                                                    e.currentTarget.classList.toggle('text-primary');
                                                    e.currentTarget.classList.toggle('bg-primary/5');
                                                }}
                                            >
                                                {duration}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <div className="flex justify-center">
                <Button size="lg" onClick={onNext} className="w-full md:w-auto px-12">
                    Analyze Symptoms
                </Button>
            </div>
        </div>
    );
};

export default SymptomRefinement;
