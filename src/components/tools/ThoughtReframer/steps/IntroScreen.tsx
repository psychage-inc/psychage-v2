import React, { useState } from 'react';
import { Lightbulb, BookOpen, Zap, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ReframerMode } from '../types';

interface IntroScreenProps {
  onSelectMode: (mode: ReframerMode) => void;
  ruminationCount: number;
  onOpenLibrary: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({
  onSelectMode,
  ruminationCount,
  onOpenLibrary,
}) => {
  const [showAbout, setShowAbout] = useState(false);
  const showRuminationWarning = ruminationCount >= 3;

  return (
    <div className="flex flex-col items-center w-full text-center">
      <div className="w-20 h-20 bg-amber-100 rounded-3xl flex items-center justify-center mb-8">
        <Lightbulb size={40} className="text-amber-600" />
      </div>

      <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Thought Reframer
      </h2>

      <p className="text-lg text-gray-600 max-w-md mb-8 leading-relaxed">
        Our thoughts aren't always accurate. Learning to notice and question unhelpful
        thinking patterns is one of the most well-researched skills in mental health.
        This exercise walks you through it step by step.
      </p>

      {showRuminationWarning && (
        <div className="w-full max-w-md bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-left">
          <div className="flex items-start gap-3">
            <AlertCircle size={20} className="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-amber-800 font-medium mb-1">
                Taking a moment to check in
              </p>
              <p className="text-sm text-amber-700">
                It looks like this situation is weighing heavily on you. Sometimes talking
                to someone can help more than working through it alone.
              </p>
              <div className="flex gap-3 mt-3">
                <Link
                  to="/providers"
                  className="text-sm font-medium text-teal-700 hover:underline"
                >
                  Find a Provider
                </Link>
                <Link
                  to="/tools/mindmate"
                  className="text-sm font-medium text-teal-700 hover:underline"
                >
                  Talk to MindMate AI
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md mb-6">
        <button
          onClick={() => onSelectMode('guided')}
          className="flex-1 flex items-center justify-center gap-2 py-4 bg-gray-900 text-white rounded-full font-semibold text-lg hover:bg-black transition-colors focus:ring-4 focus:ring-gray-900/20 shadow-md"
        >
          <BookOpen size={20} />
          Guided Exercise
        </button>
        <button
          onClick={() => onSelectMode('quick')}
          className="flex-1 flex items-center justify-center gap-2 py-4 bg-white text-gray-700 rounded-full font-semibold text-lg border border-gray-200 hover:bg-gray-50 transition-colors focus:ring-4 focus:ring-gray-200/50 shadow-sm"
        >
          <Zap size={20} />
          Quick Mode
        </button>
      </div>

      <button
        onClick={onOpenLibrary}
        className="text-sm text-teal-600 font-medium hover:underline underline-offset-2 mb-8"
      >
        Learn about cognitive distortions
      </button>

      {/* Educational disclaimer */}
      <div className="w-full max-w-md">
        <button
          onClick={() => setShowAbout(!showAbout)}
          className="text-xs text-gray-400 hover:text-gray-500 transition-colors"
        >
          {showAbout ? 'Hide details' : 'About this tool'}
        </button>
        {showAbout && (
          <p className="text-xs text-gray-400 mt-2 leading-relaxed">
            This educational tool teaches a widely-used thinking skill based on cognitive
            behavioral therapy (CBT). It is not a substitute for professional mental health
            care. If you're in crisis, please use our{' '}
            <Link to="/crisis" className="underline">
              Crisis Support
            </Link>{' '}
            tool or contact a crisis helpline.
          </p>
        )}
      </div>
    </div>
  );
};
