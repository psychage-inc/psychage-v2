import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import TrendChart from '../components/TrendChart';
import { useClarityJournal } from '../hooks/useClarityJournal';
import { formatDate } from '../dates';

const JournalInsights: React.FC = () => {
  const navigate = useNavigate();
  const { data } = useClarityJournal();

  // Prepare mood/energy/sleep trend data from daily check-ins (last 30)
  const recentCheckIns = [...data.dailyCheckIns]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-30);

  const moodData = recentCheckIns.map(c => ({ label: formatDate(c.date), value: c.mood }));
  const energyData = recentCheckIns.map(c => ({ label: formatDate(c.date), value: c.energy }));
  const sleepData = recentCheckIns.map(c => ({ label: formatDate(c.date), value: c.sleepHours }));

  // Screening trends
  const recentScreenings = [...data.weeklyScreenings]
    .sort((a, b) => a.weekStartDate.localeCompare(b.weekStartDate))
    .slice(-12);

  const phqData = recentScreenings.map(s => ({ label: formatDate(s.weekStartDate), value: s.phq2.total }));
  const gadData = recentScreenings.map(s => ({ label: formatDate(s.weekStartDate), value: s.gad2.total }));

  const hasCheckInData = moodData.length >= 2;
  const hasScreeningData = phqData.length >= 2;

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-6">
      <SEO title="Insights | Clarity Journal" description="Trends and patterns in your journal data." />
      <div className="container mx-auto max-w-3xl">
        <div className="mb-8"><Breadcrumbs /></div>
        <button onClick={() => navigate('/tools/clarity-journal')} className="flex items-center gap-2 text-sm text-slate-500 hover:text-teal-600 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Journal
        </button>

        <h1 className="font-display font-bold text-2xl md:text-3xl text-slate-900 mb-2">Insights & Trends</h1>
        <p className="text-slate-500 mb-8">Notice the trends, not the individual days.</p>

        {!hasCheckInData && !hasScreeningData ? (
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 text-center">
            <p className="text-slate-400 text-sm">Complete at least 2 daily check-ins or weekly screenings to see your trends here.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {hasCheckInData && (
              <>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                  <TrendChart data={moodData} color="#0d9488" label="Mood Over Time" yDomain={[0, 10]} />
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                  <TrendChart data={energyData} color="#6366f1" label="Energy Over Time" yDomain={[0, 10]} />
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                  <TrendChart data={sleepData} color="#8b5cf6" label="Sleep Hours Over Time" yDomain={[0, 12]} height={180} />
                </div>
              </>
            )}

            {hasScreeningData && (
              <>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                  <TrendChart data={phqData} color="#dc2626" label="Depression Screen (PHQ-2) Over Time" yDomain={[0, 6]} height={180} />
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                  <TrendChart data={gadData} color="#f59e0b" label="Anxiety Screen (GAD-2) Over Time" yDomain={[0, 6]} height={180} />
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default JournalInsights;
