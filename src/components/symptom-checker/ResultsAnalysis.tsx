import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle2, Activity, BookOpen, ChevronRight, User } from 'lucide-react';
import { checkSymptoms } from '@/services/symptomService';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';

interface ResultsProps {
    selectedIds: string[];
}

const ResultsAnalysis: React.FC<ResultsProps> = ({ selectedIds }) => {
    const { conditions, isCrisis } = checkSymptoms(selectedIds);

    // If Crisis
    if (isCrisis) {
        return (
            <div className="max-w-2xl mx-auto text-center">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-error/5 border-2 border-error rounded-3xl p-8 md:p-12 mb-8"
                >
                    <div className="w-20 h-20 bg-error/10 text-error rounded-full flex items-center justify-center mx-auto mb-6">
                        <AlertTriangle size={40} />
                    </div>
                    <h2 className="text-3xl font-display font-bold text-text-primary mb-4">Immediate Help Available</h2>
                    <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                        Your responses suggest you might be going through a difficult time. You don't have to face this alone. Confidential support is available 24/7.
                    </p>

                    <div className="flex flex-col gap-4">
                        <a href="tel:988" className="bg-error hover:bg-error-hover text-white font-bold py-4 rounded-xl text-xl shadow-lg shadow-error/20 transition-all flex items-center justify-center gap-3">
                            Call 988 (Crisis Lifeline)
                        </a>
                        <p className="text-sm text-text-tertiary">Free, confidential, 24/7.</p>
                    </div>
                </motion.div>

                <h3 className="font-bold text-text-primary mb-4">Other Resources</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-surface p-6 rounded-2xl border border-border">
                        <h4 className="font-bold mb-2">Crisis Text Line</h4>
                        <p className="text-sm text-text-secondary mb-3">Text HOME to 741741</p>
                    </div>
                    <div className="bg-surface p-6 rounded-2xl border border-border">
                        <h4 className="font-bold mb-2">Emergency Services</h4>
                        <p className="text-sm text-text-secondary mb-3">Call 911</p>
                    </div>
                </div>
            </div>
        );
    }

    // Normal Results
    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 border border-green-200 mb-6">
                    <CheckCircle2 size={14} />
                    <span className="text-xs font-bold tracking-widest uppercase">Analysis Complete</span>
                </div>
                <h1 className="text-4xl font-display font-bold text-text-primary mb-4">Potential Matches</h1>
                <p className="text-text-secondary max-w-xl mx-auto">
                    Based on the {selectedIds.length} symptoms you reported, here are some potential conditions to explore. This is for educational purposes only.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {/* Main Results Column */}
                <div className="md:col-span-2 space-y-6">
                    {conditions.length > 0 ? (
                        conditions.map((condition, index) => (
                            <motion.div
                                key={condition.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`bg - surface border rounded - 3xl p - 8 transition - all hover: shadow - lg relative overflow - hidden group ${index === 0 ? 'border-primary/50 shadow-md ring-1 ring-primary/20' : 'border-border'} `}
                            >
                                {index === 0 && (
                                    <div className="absolute top-0 right-0 bg-primary/10 text-primary text-xs font-bold px-4 py-2 rounded-bl-2xl">
                                        TOP MATCH
                                    </div>
                                )}

                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-2xl font-bold text-text-primary">{condition.name}</h3>
                                    <div className="flex items-center gap-1.5 text-sm font-bold text-text-primary bg-surface-hover px-3 py-1.5 rounded-full">
                                        <Activity size={16} className={index === 0 ? 'text-primary' : 'text-text-tertiary'} />
                                        {condition.matchRate}% Match
                                    </div>
                                </div>
                                <p className="text-text-secondary leading-relaxed mb-6">
                                    {condition.description}
                                </p>

                                <div className="bg-surface-hover rounded-xl p-4 mb-6">
                                    <h4 className="font-bold text-sm text-text-primary mb-2 flex items-center gap-2">
                                        <BookOpen size={16} className="text-text-tertiary" /> Recommended Action
                                    </h4>
                                    <p className="text-sm text-text-secondary">{condition.recommendedAction}</p>
                                </div>

                                <div className="flex gap-4">
                                    {condition.articleId && (
                                        <Link to={`/ learn / article / ${condition.articleId} `} className="flex-1">
                                            <Button variant="outline" className="w-full text-sm">Read Article</Button>
                                        </Link>
                                    )}
                                    <Link to={`/ find - care ? q = ${condition.name} `} className="flex-1">
                                        <Button className="w-full text-sm" rightIcon={<ChevronRight size={16} />}>Find Specialist</Button>
                                    </Link>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <div className="bg-surface border border-border rounded-3xl p-12 text-center">
                            <p className="text-text-secondary">We couldn't find a specific condition matching your symptoms, but talking to a professional is always a good first step.</p>
                            <div className="mt-6">
                                <Link to="/find-care">
                                    <Button>Find a Provider</Button>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
                        <h4 className="font-bold text-primary mb-2">Medical Disclaimer</h4>
                        <p className="text-xs text-text-secondary leading-relaxed mb-4">
                            This tool is not a diagnostic instrument. It provides educational information based on your inputs.
                        </p>
                        <p className="text-xs text-text-secondary leading-relaxed font-bold">
                            Always consult a qualified healthcare provider for diagnosis and treatment.
                        </p>
                    </div>

                    <div className="bg-surface border border-border rounded-2xl p-6">
                        <h4 className="font-bold text-text-primary mb-4 flex items-center gap-2">
                            <User size={18} /> Next Steps
                        </h4>
                        <ul className="space-y-3 text-sm text-text-secondary">
                            <li className="flex gap-3">
                                <span className="flex-none w-6 h-6 rounded-full bg-surface-hover flex items-center justify-center text-xs font-bold text-text-primary">1</span>
                                Read the recommended guides
                            </li>
                            <li className="flex gap-3">
                                <span className="flex-none w-6 h-6 rounded-full bg-surface-hover flex items-center justify-center text-xs font-bold text-text-primary">2</span>
                                Save your results (optional)
                            </li>
                            <li className="flex gap-3">
                                <span className="flex-none w-6 h-6 rounded-full bg-surface-hover flex items-center justify-center text-xs font-bold text-text-primary">3</span>
                                Book a consultation
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultsAnalysis;
