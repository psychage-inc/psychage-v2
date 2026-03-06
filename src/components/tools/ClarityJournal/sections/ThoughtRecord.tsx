import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Lightbulb, ExternalLink, Clock } from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Button from '@/components/ui/Button';
import type { ThoughtRecord as ThoughtRecordType } from '../../ThoughtReframer/types';

/**
 * Thought Record section — links to the existing Thought Reframer tool.
 * Shows a brief explanation and recent ThoughtReframer entries from localStorage.
 */
const ThoughtRecord: React.FC = () => {
  const navigate = useNavigate();
  const [recentRecords, setRecentRecords] = useState<ThoughtRecordType[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('psychage_thought_reframer_v1');
      if (raw) {
        const records = JSON.parse(raw) as ThoughtRecordType[];
        setRecentRecords(records.filter(r => r.completed).slice(0, 5));
      }
    } catch {
      // Ignore
    }
  }, []);

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    } catch {
      return '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-6">
      <SEO title="Thought Record | Clarity Journal" description="Challenge negative thought patterns with CBT thought records." />
      <div className="container mx-auto max-w-2xl">
        <div className="mb-8"><Breadcrumbs /></div>
        <button onClick={() => navigate('/tools/clarity-journal')} className="flex items-center gap-2 text-sm text-slate-500 hover:text-teal-600 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Journal
        </button>

        <h1 className="font-display font-bold text-2xl md:text-3xl text-slate-900 mb-2">Thought Record</h1>
        <p className="text-slate-500 mb-8">See your thoughts clearly, instead of being swept away by them.</p>

        {/* Explanation card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 mb-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <Lightbulb className="w-5 h-5" />
            </div>
            <h2 className="font-display font-semibold text-slate-900">Thought Reframer</h2>
          </div>

          <p className="text-sm text-slate-600 mb-4 leading-relaxed">
            When something bothers you, the Thought Reframer guides you through a structured CBT exercise.
            You will identify the situation, examine your automatic thoughts, check the evidence, and find a
            more balanced perspective. Most people find their emotional intensity drops after completing a record.
          </p>

          <p className="text-sm text-slate-500 mb-6">
            Use it when you notice a strong emotional reaction that feels disproportionate, or when a worry
            keeps circling and will not let go.
          </p>

          <Link to="/tools/thought-reframer">
            <Button variant="primary" size="lg" className="w-full">
              <Lightbulb className="w-5 h-5 mr-2" />
              Open Thought Reframer
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>

        {/* Recent records */}
        {recentRecords.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h3 className="font-display font-semibold text-slate-800 mb-4">Recent Thought Records</h3>
            <div className="space-y-3">
              {recentRecords.map(record => (
                <div key={record.id} className="bg-slate-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Clock className="w-3 h-3" />
                      {formatDate(record.createdAt)}
                    </div>
                    <div className="flex gap-1">
                      {record.emotions.slice(0, 3).map((e, i) => (
                        <span key={i} className="text-xs bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">
                          {e.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-slate-700 line-clamp-2">{record.situation}</p>
                  {record.balancedThought && (
                    <p className="text-xs text-teal-600 mt-2 line-clamp-1">
                      Balanced: {record.balancedThought}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThoughtRecord;
