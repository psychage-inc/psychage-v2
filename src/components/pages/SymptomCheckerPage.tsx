
import React, { useState, useEffect } from 'react';
import SEO from '../SEO';
import SymptomLayout from '../symptom-checker/SymptomLayout';
import SymptomSearch from '../symptom-checker/SymptomSearch';
import SymptomRefinement from '../symptom-checker/SymptomRefinement';
import ResultsAnalysis from '../symptom-checker/ResultsAnalysis';

const SymptomCheckerPage: React.FC = () => {
    const [step, setStep] = useState(1);
    const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [step]); // Scroll to top on step change

    const handleSearchNext = (symptoms: string[]) => {
        setSelectedSymptoms(symptoms);
        setStep(2);
    };

    const handleRefinementNext = () => {
        setStep(3);
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        } else {
            // Navigate home handled by layout link vs helper
            window.location.href = '/';
        }
    };

    const handleReset = () => {
        setSelectedSymptoms([]);
        setStep(1);
    };

    return (
        <>
            <SEO
                title="Symptom Checker | Psychage"
                description="Analyze your mental health symptoms and get evidence-based insights."
            />

            <SymptomLayout
                currentStep={step}
                totalSteps={3}
                onBack={handleBack}
                onReset={handleReset}
            >
                {step === 1 && (
                    <SymptomSearch
                        onNext={handleSearchNext}
                        initialSelected={selectedSymptoms}
                    />
                )}
                {step === 2 && (
                    <SymptomRefinement
                        selectedIds={selectedSymptoms}
                        onNext={handleRefinementNext}
                    />
                )}
                {step === 3 && (
                    <ResultsAnalysis selectedIds={selectedSymptoms} />
                )}
            </SymptomLayout>
        </>
    );
};

export default SymptomCheckerPage;
