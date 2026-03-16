import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Lightbulb, BookOpen } from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Button from '@/components/ui/Button';

/**
 * Thought Record section — standalone CBT thought record guidance.
 * Explains the cognitive restructuring process and links to the Clarity Journal.
 */
const ThoughtRecord: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-6">
      <SEO title="Thought Record | Clarity Journal" description="Challenge negative thought patterns with structured CBT exercises." />
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
            <h2 className="font-display font-semibold text-slate-900">Cognitive Restructuring</h2>
          </div>

          <p className="text-sm text-slate-600 mb-4 leading-relaxed">
            Cognitive restructuring is a core technique in CBT (Cognitive Behavioral Therapy).
            It helps you identify automatic negative thoughts, examine the evidence for and against them,
            and develop a more balanced perspective.
          </p>

          <p className="text-sm text-slate-500 mb-6">
            Use it when you notice a strong emotional reaction that feels disproportionate, or when a worry
            keeps circling and will not let go. Most people find their emotional intensity drops after completing a record.
          </p>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
              <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">1</div>
              <div>
                <p className="text-sm font-medium text-slate-700">Identify the situation</p>
                <p className="text-xs text-slate-500">What happened? Where were you? Who was involved?</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
              <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">2</div>
              <div>
                <p className="text-sm font-medium text-slate-700">Notice your automatic thoughts</p>
                <p className="text-xs text-slate-500">What went through your mind? What were you telling yourself?</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
              <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">3</div>
              <div>
                <p className="text-sm font-medium text-slate-700">Examine the evidence</p>
                <p className="text-xs text-slate-500">What supports this thought? What contradicts it?</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
              <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">4</div>
              <div>
                <p className="text-sm font-medium text-slate-700">Find a balanced perspective</p>
                <p className="text-xs text-slate-500">What would you tell a friend? What's a more realistic view?</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA to journal */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100"
        >
          <div className="flex items-center gap-3 mb-3">
            <BookOpen className="w-5 h-5 text-teal-600" />
            <h3 className="font-display font-semibold text-slate-800">Practice in Your Journal</h3>
          </div>
          <p className="text-sm text-slate-500 mb-4">
            Use the free-form journaling section in your Clarity Journal to work through thought records at your own pace.
          </p>
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={() => navigate('/tools/clarity-journal')}
          >
            Open Clarity Journal
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default ThoughtRecord;
