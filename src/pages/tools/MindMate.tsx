/**
 * Psychage AI Page - AI Mental Health Education Assistant
 *
 * Full-page chat interface for Psychage's AI assistant
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { PsychageAI } from '@/components/ai';
import { Sparkles, Shield, Brain } from 'lucide-react';

const PsychageAIPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Psychage AI - Your Mental Health Education Companion | Psychage</title>
        <meta
          name="description"
          content="Chat with Psychage AI, your intelligent mental health education companion. Get evidence-based answers, discover curated resources, and explore mental wellness topics 24/7."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-teal-50/30 to-emerald-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex flex-col">
        {/* Enhanced Page Header */}
        <div className="relative bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 dark:from-teal-700 dark:via-emerald-700 dark:to-cyan-700 text-white overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '32px 32px'
            }} />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* AI Icon */}
                <div className="relative">
                  <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl" />
                  <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-white/90 to-white/70 flex items-center justify-center shadow-lg backdrop-blur-sm">
                    <Brain className="text-teal-600" size={32} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-3xl sm:text-4xl font-bold">
                      Psychage AI
                    </h1>
                    <Sparkles className="text-yellow-300" size={24} />
                  </div>
                  <p className="text-teal-100 text-sm sm:text-base font-medium">
                    Your 24/7 mental health education companion
                  </p>
                </div>
              </div>

              {/* AI Badge */}
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                <Shield size={16} className="text-white" />
                <span className="text-xs font-semibold uppercase tracking-wide">
                  AI-Powered
                </span>
              </div>
            </div>

            {/* Feature Pills */}
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                'Evidence-Based Information',
                'Crisis Support',
                'Personalized Resources',
                'Confidential & Secure'
              ].map((feature) => (
                <div
                  key={feature}
                  className="px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 text-xs font-medium"
                >
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="flex-1 flex flex-col">
          <PsychageAI />
        </div>

        {/* Enhanced Footer Disclaimer */}
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="flex items-start gap-3">
              <div className="shrink-0 w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mt-0.5">
                <Shield size={16} className="text-amber-600 dark:text-amber-400" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                  <strong className="font-semibold">Important:</strong> Psychage AI is an educational assistant, not a licensed therapist or medical professional.
                  Information provided is for educational purposes only and should not be considered medical advice or diagnosis.
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  <strong className="text-red-600 dark:text-red-400 font-semibold">Crisis Support:</strong> If you're experiencing a mental health emergency,
                  contact <a href="tel:988" className="underline hover:text-red-600 dark:hover:text-red-400 transition-colors">988 (Suicide & Crisis Lifeline)</a> immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PsychageAIPage;
