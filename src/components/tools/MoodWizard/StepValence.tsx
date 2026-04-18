import React from 'react';
import { motion } from 'framer-motion';
import { BloomVisualization } from './BloomVisualization';
import { WizardState } from './MoodWizard';

interface StepProps {
    data: WizardState;
    updateData: (updates: Partial<WizardState>) => void;
    onNext: () => void;
}

export const getValenceLabel = (v: number) => {
    const labels = ["Very Unpleasant", "Unpleasant", "Slightly Unpleasant", "Neutral", "Slightly Pleasant", "Pleasant", "Very Pleasant"];
    if (v <= 1) return labels[0];
    if (v <= 3) return labels[1];
    if (v <= 4) return labels[2];
    if (v <= 6) return labels[3];
    if (v <= 7) return labels[4];
    if (v <= 9) return labels[5];
    return labels[6];
};

export const StepValence: React.FC<StepProps> = ({ data, updateData, onNext }) => {

    return (
        <div className="flex flex-col items-center w-full">
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-text-primary text-center mb-2 mt-4">How are you feeling right now?</h2>
            <p className="text-xl text-text-tertiary mb-4">{getValenceLabel(Math.round(data.valence))}</p>

            <div className="transform scale-90 md:scale-100 ease-in-out duration-300 -my-4 md:my-0">
                <BloomVisualization valence={data.valence} />
            </div>

            <div className="w-full max-w-md mt-6 md:mt-10 mb-8 md:mb-12 relative">
                <div className="relative w-full h-10 flex items-center group">
                    {/* Glassmorphism Track */}
                    <div className="absolute inset-x-0 h-10 bg-white/30 backdrop-blur-2xl border border-white/40 rounded-full shadow-[inset_0_1px_3px_rgba(0,0,0,0.04),0_1px_6px_rgba(255,255,255,0.3)] overflow-hidden">

                        {/* Dynamic Progress Fill */}
                        <motion.div
                            className="absolute top-0 left-0 bottom-0 bg-teal-600/80 backdrop-blur-sm border-r border-white/20"
                            animate={{ width: `calc(${((data.valence - 1) / 9) * 100}% + ${16 - ((data.valence - 1) / 9) * 32}px)` }}
                            transition={{ type: "tween", duration: 0 }}
                        />

                        {/* Specular Highlight over the track/fill */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-transparent pointer-events-none mix-blend-overlay" />
                    </div>

                    {/* Visual Thumb */}
                    <motion.div
                        className="absolute w-8 h-8 bg-white rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.12),inset_0_-1px_2px_rgba(0,0,0,0.04)] border border-border/80 flex items-center justify-center pointer-events-none group-hover:scale-[1.08] group-active:scale-95 group-active:shadow-sm group-hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-transform duration-300 z-10 peer-focus-visible:ring-4 peer-focus-visible:ring-teal-500/30"
                        animate={{ left: `calc(${((data.valence - 1) / 9) * 100}% - ${((data.valence - 1) / 9) * 32}px)` }}
                        transition={{ type: "tween", duration: 0 }}
                    >
                        <div className="w-3 h-3 rounded-full bg-teal-600 shadow-[0_0_6px_rgba(13,148,136,0.4)]" />
                    </motion.div>

                    {/* Hidden Native Input */}
                    <input
                        type="range"
                        min="1" max="10" step="0.01"
                        value={data.valence}
                        onChange={(e) => updateData({ valence: parseFloat(e.target.value) })}
                        className="peer absolute inset-0 w-full h-full opacity-0 cursor-grab active:cursor-grabbing m-0 appearance-none touch-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:h-8 [&::-moz-range-thumb]:w-8 [&::-moz-range-thumb]:h-8 [&::-moz-range-thumb]:border-0 z-20"
                        aria-label="Valence slider"
                    />
                </div>

                <div className="flex justify-between text-xs text-text-tertiary font-bold mt-3 px-2 uppercase tracking-widest opacity-80">
                    <span>Unpleasant</span>
                    <span>Pleasant</span>
                </div>
            </div>

            <button onClick={onNext} className="w-full max-w-md mx-auto block py-4 bg-teal-600 text-white rounded-full font-semibold text-lg hover:bg-teal-700 transition-colors focus:ring-4 focus:ring-teal-500/20 shadow-md shadow-teal-600/20">
                Next
            </button>
        </div>
    );
};
