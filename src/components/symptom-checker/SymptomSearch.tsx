import React, { useState } from 'react';
import { Search, Plus, X } from 'lucide-react';
import { SYMPTOMS } from '../../data/symptom-checker';
import Button from '../ui/Button';

interface SearchProps {
    onNext: (symptoms: string[]) => void;
    initialSelected?: string[];
}

const SymptomSearch: React.FC<SearchProps> = ({ onNext, initialSelected = [] }) => {
    const [query, setQuery] = useState('');
    const [selected, setSelected] = useState<string[]>(initialSelected);

    const filteredSymptoms = query
        ? SYMPTOMS.filter(s => s.label.toLowerCase().includes(query.toLowerCase()) && !selected.includes(s.id))
        : [];

    const toggleSymptom = (id: string) => {
        if (selected.includes(id)) {
            setSelected(prev => prev.filter(s => s !== id));
        } else {
            setSelected(prev => [...prev, id]);
            setQuery(''); // Clear search on select
        }
    };

    const commonSymptoms = SYMPTOMS.slice(0, 8).filter(s => !selected.includes(s.id));

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-display font-bold text-text-primary mb-4 text-center">What's bothering you?</h1>
            <p className="text-text-secondary text-center mb-10 text-lg">
                Search for your symptoms or select from common issues below.
            </p>

            {/* Search Bar */}
            <div className="relative mb-8">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-text-tertiary">
                    <Search size={24} />
                </div>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="e.g. anxiety, tired, can't sleep..."
                    className="w-full bg-surface border border-border text-text-primary text-xl placeholder:text-text-tertiary rounded-2xl py-6 pl-16 pr-6 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all shadow-sm"
                    autoFocus
                />

                {/* Autocomplete Dropdown */}
                {filteredSymptoms.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-surface text-text-primary border border-border rounded-xl shadow-xl z-20 overflow-hidden max-h-60 overflow-y-auto">
                        {filteredSymptoms.map(symptom => (
                            <button
                                key={symptom.id}
                                onClick={() => toggleSymptom(symptom.id)}
                                className="w-full text-left px-6 py-4 hover:bg-surface-hover flex items-center justify-between group transition-colors"
                            >
                                <span className="font-medium text-lg">{symptom.label}</span>
                                <Plus size={20} className="text-text-tertiary group-hover:text-primary" />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Selected Tags */}
            {selected.length > 0 && (
                <div className="mb-10 flex flex-wrap gap-3 justify-center">
                    {selected.map(id => {
                        const s = SYMPTOMS.find(sym => sym.id === id);
                        return (
                            <div key={id} className="bg-primary text-background pl-4 pr-3 py-2 rounded-full flex items-center gap-2 text-sm font-bold shadow-md animate-in fade-in zoom-in duration-200">
                                {s?.label}
                                <button onClick={() => toggleSymptom(id)} className="hover:bg-white/20 rounded-full p-1 transition-colors">
                                    <X size={14} />
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Common Symptoms / Suggestions */}
            <div className="mb-12">
                <h3 className="text-xs font-bold text-text-tertiary uppercase tracking-widest mb-4 text-center">Common Symptoms</h3>
                <div className="flex flex-wrap gap-3 justify-center">
                    {commonSymptoms.map(symptom => (
                        <button
                            key={symptom.id}
                            onClick={() => toggleSymptom(symptom.id)}
                            className="bg-surface hover:bg-surface-hover border border-border text-text-secondary px-4 py-2 rounded-xl text-sm font-medium transition-all hover:scale-105 active:scale-95"
                        >
                            {symptom.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Action */}
            <div className="flex justify-center">
                <Button
                    size="lg"
                    onClick={() => onNext(selected)}
                    disabled={selected.length === 0}
                    className="w-full md:w-auto px-12"
                >
                    Continue
                </Button>
            </div>
        </div>
    );
};

export default SymptomSearch;
