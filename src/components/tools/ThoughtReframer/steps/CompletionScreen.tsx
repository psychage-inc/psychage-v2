import React from 'react';
import { ArrowRight, Save, RotateCcw, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { ThoughtRecord } from '../types';
import { COGNITIVE_DISTORTIONS } from '../types';

interface CompletionScreenProps {
  data: ThoughtRecord;
  onSave: () => void;
  onStartAnother: () => void;
  saved: boolean;
}

export const CompletionScreen: React.FC<CompletionScreenProps> = ({
  data,
  onSave,
  onStartAnother,
  saved,
}) => {
  const distortionNames = data.distortions
    .map(id => COGNITIVE_DISTORTIONS.find(d => d.id === id)?.name)
    .filter(Boolean);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-6">
        <CheckCircle2 size={32} className="text-teal-600" />
      </div>

      <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 text-center mb-3">
        Nice work
      </h2>
      <p className="text-gray-500 text-center mb-8 max-w-md">
        You just practiced a skill therapists teach every day. The more you do this, the more automatic it becomes.
      </p>

      {/* Summary card */}
      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8">
        {/* Situation */}
        <div className="px-5 py-4 border-b border-gray-50">
          <p className="text-xs text-gray-400 mb-1">Situation</p>
          <p className="text-sm text-gray-700 line-clamp-2">{data.situation}</p>
        </div>

        {/* Thought transformation */}
        <div className="px-5 py-4 border-b border-gray-50">
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <p className="text-xs text-rose-400 mb-1">Original thought</p>
              <p className="text-sm text-gray-700 italic">"{data.automaticThought}"</p>
            </div>
            <ArrowRight size={16} className="text-gray-300 mt-4 shrink-0" />
            <div className="flex-1">
              <p className="text-xs text-teal-500 mb-1">Balanced thought</p>
              <p className="text-sm text-gray-700">"{data.balancedThought}"</p>
            </div>
          </div>
        </div>

        {/* Distortions */}
        <div className="px-5 py-3 border-b border-gray-50">
          <p className="text-xs text-gray-400 mb-2">Patterns identified</p>
          <div className="flex flex-wrap gap-1.5">
            {distortionNames.map(name => (
              <span
                key={name}
                className="px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium"
              >
                {name}
              </span>
            ))}
          </div>
        </div>

        {/* Emotion changes */}
        <div className="px-5 py-4">
          <p className="text-xs text-gray-400 mb-3">Emotional shift</p>
          <div className="space-y-2">
            {data.emotions.map(before => {
              const after = data.emotionsAfter.find(e => e.name === before.name);
              const afterVal = after?.intensity ?? before.intensity;
              const diff = afterVal - before.intensity;

              return (
                <div key={before.name} className="flex items-center gap-3">
                  <span className="text-sm text-gray-700 w-24 shrink-0">{before.name}</span>
                  <div className="flex-1 flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-rose-300 rounded-full transition-all"
                        style={{ width: `${before.intensity}%` }}
                      />
                    </div>
                    <ArrowRight size={12} className="text-gray-300 shrink-0" />
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-teal-400 rounded-full transition-all"
                        style={{ width: `${afterVal}%` }}
                      />
                    </div>
                  </div>
                  <span className={`text-xs font-medium w-10 text-right ${
                    diff < 0 ? 'text-teal-600' : diff > 0 ? 'text-rose-500' : 'text-gray-400'
                  }`}>
                    {diff > 0 ? '+' : ''}{diff}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md mb-6">
        {!saved ? (
          <button
            onClick={onSave}
            className="flex-1 flex items-center justify-center gap-2 py-4 bg-gray-900 text-white rounded-full font-semibold text-lg hover:bg-black transition-colors focus:ring-4 focus:ring-gray-900/20 shadow-md"
          >
            <Save size={20} />
            Save to My History
          </button>
        ) : (
          <div className="flex-1 flex items-center justify-center gap-2 py-4 bg-teal-50 text-teal-700 rounded-full font-semibold text-lg border border-teal-200">
            <CheckCircle2 size={20} />
            Saved
          </div>
        )}
        <button
          onClick={onStartAnother}
          className="flex-1 flex items-center justify-center gap-2 py-4 bg-white text-gray-700 rounded-full font-semibold border border-gray-200 hover:bg-gray-50 transition-colors focus:ring-4 focus:ring-gray-200/50 shadow-sm"
        >
          <RotateCcw size={18} />
          Start Another
        </button>
      </div>

      <Link
        to="/tools"
        className="text-sm text-teal-600 font-medium hover:underline underline-offset-2 mb-8"
      >
        Explore Other Tools
      </Link>

      {/* Motivational note */}
      <p className="text-xs text-gray-400 max-w-sm text-center mb-4 leading-relaxed">
        Many people find that after a few weeks of practice, they start catching distorted thoughts in real time — without needing to write them down.
      </p>

      {/* Educational disclaimer */}
      <p className="text-xs text-gray-400 max-w-sm text-center leading-relaxed">
        This educational tool teaches a widely-used thinking skill. It is not a substitute for
        professional mental health care. If you're in crisis, please use our{' '}
        <Link to="/crisis" className="underline">
          Crisis Support
        </Link>{' '}
        tool or contact a crisis helpline.
      </p>
    </div>
  );
};
