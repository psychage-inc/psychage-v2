import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Moon, ArrowLeft, RotateCcw, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../../ui/Breadcrumbs';
import Button from '../../ui/Button';

import {
  SleepPlanInputs,
  DEFAULT_INPUTS,
  Nap,
  UserProfile,
  computeSleepPlan,
} from './model';
import { savePlan, loadPlan } from './storage';
import { extractPlanFromUrl } from './share';

import SleepTimeline from './components/SleepTimeline';
import SummaryCards from './components/SummaryCards';
import NapEditor from './components/NapEditor';
import Presets from './components/Presets';
import RecommendedTimes from './components/RecommendedTimes';
import ProfileSettings from './components/ProfileSettings';
import ExportPanel from './components/ExportPanel';
import HygieneChecklist from './components/HygieneChecklist';

const SleepArchitect: React.FC = () => {
  const navigate = useNavigate();

  // ─── State ────────────────────────────────────────────────────────────────
  const [inputs, setInputs] = useState<SleepPlanInputs>(() => {
    // Priority: URL hash > localStorage > defaults
    const fromUrl = extractPlanFromUrl();
    if (fromUrl) return fromUrl;
    return loadPlan();
  });

  const [hygieneChecked, setHygieneChecked] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('psychage_sleep_hygiene_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // ─── Computed output ──────────────────────────────────────────────────────
  const output = useMemo(() => computeSleepPlan(inputs), [inputs]);

  // ─── Persist on change ────────────────────────────────────────────────────
  useEffect(() => {
    savePlan(inputs);
  }, [inputs]);

  useEffect(() => {
    try {
      localStorage.setItem('psychage_sleep_hygiene_v1', JSON.stringify(hygieneChecked));
    } catch { /* ignore */ }
  }, [hygieneChecked]);

  // Clear URL hash after loading (so user can bookmark clean URL)
  useEffect(() => {
    if (window.location.hash.startsWith('#plan=')) {
      history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  // ─── Handlers ─────────────────────────────────────────────────────────────
  const updateField = useCallback(<K extends keyof SleepPlanInputs>(
    field: K,
    value: SleepPlanInputs[K]
  ) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  }, []);

  const applyPreset = useCallback((partial: Partial<SleepPlanInputs>) => {
    setInputs(prev => ({
      ...prev,
      ...partial,
      // For nap presets, merge rather than replace if user has existing naps
      naps: partial.naps
        ? [...prev.naps, ...partial.naps]
        : prev.naps,
      profile: partial.profile
        ? { ...prev.profile, ...partial.profile }
        : prev.profile,
    }));
  }, []);

  const addNap = useCallback(() => {
    const newNap: Nap = {
      id: crypto.randomUUID(),
      startTime: '14:00',
      durationMinutes: 20,
    };
    setInputs(prev => ({ ...prev, naps: [...prev.naps, newNap] }));
  }, []);

  const removeNap = useCallback((id: string) => {
    setInputs(prev => ({ ...prev, naps: prev.naps.filter(n => n.id !== id) }));
  }, []);

  const updateNap = useCallback((id: string, field: 'startTime' | 'durationMinutes', value: string | number) => {
    setInputs(prev => ({
      ...prev,
      naps: prev.naps.map(n => n.id === id ? { ...n, [field]: value } : n),
    }));
  }, []);

  const updateProfile = useCallback((profile: UserProfile) => {
    setInputs(prev => ({ ...prev, profile }));
  }, []);

  const resetAll = useCallback(() => {
    setInputs(DEFAULT_INPUTS);
    setHygieneChecked([]);
  }, []);

  const toggleHygiene = useCallback((id: string) => {
    setHygieneChecked(prev =>
      prev.includes(id) ? prev.filter(h => h !== id) : [...prev, id]
    );
  }, []);

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-indigo-50/30 pt-24 pb-12 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6">
          <Breadcrumbs />
        </div>
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/tools')}
            className="flex items-center gap-2 text-gray-400 hover:text-gray-900 font-bold text-sm uppercase tracking-wider"
          >
            <ArrowLeft size={16} /> Back to Tools
          </button>
          <button
            onClick={resetAll}
            className="flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-gray-600 transition-colors"
            title="Reset all settings"
          >
            <RotateCcw size={14} />
            Reset
          </button>
        </div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center gap-4 mb-3">
            <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center">
              <Moon size={28} />
            </div>
            <div>
              <h1 className="font-display font-bold text-3xl md:text-4xl text-gray-900">
                Sleep Architect
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Design your sleep schedule and see estimated architecture
              </p>
            </div>
          </div>
        </motion.div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* ─── Left: Input Panel ──────────────────────────────────── */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-xl shadow-indigo-100/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-32 bg-indigo-500/5 blur-[80px] rounded-full" />

              <div className="relative z-10 space-y-5">
                {/* Bedtime / Wake time */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="bedtime" className="text-sm font-bold text-gray-700 block mb-1.5">
                      Bedtime
                    </label>
                    <input
                      id="bedtime"
                      type="time"
                      value={inputs.bedtime}
                      onChange={e => updateField('bedtime', e.target.value)}
                      className="w-full p-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none font-display font-bold text-lg text-gray-900"
                    />
                    <p className="text-[10px] text-gray-400 mt-1">When you get into bed</p>
                  </div>
                  <div>
                    <label htmlFor="wake-time" className="text-sm font-bold text-gray-700 block mb-1.5">
                      Wake Time
                    </label>
                    <input
                      id="wake-time"
                      type="time"
                      value={inputs.wakeTime}
                      onChange={e => updateField('wakeTime', e.target.value)}
                      className="w-full p-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none font-display font-bold text-lg text-gray-900"
                    />
                    <p className="text-[10px] text-gray-400 mt-1">Alarm or natural wake</p>
                  </div>
                </div>

                {/* Sleep Latency */}
                <div>
                  <label htmlFor="latency" className="text-sm font-bold text-gray-700 block mb-1.5">
                    Sleep Latency
                    <span className="text-xs font-normal text-gray-400 ml-1">
                      (minutes to fall asleep)
                    </span>
                  </label>
                  <input
                    id="latency"
                    type="range"
                    min={0}
                    max={60}
                    step={5}
                    value={inputs.sleepLatencyMinutes}
                    onChange={e => updateField('sleepLatencyMinutes', parseInt(e.target.value))}
                    className="w-full accent-indigo-600"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400 mt-0.5">
                    <span>0 min</span>
                    <span className="font-bold text-indigo-600 text-xs">{inputs.sleepLatencyMinutes} min</span>
                    <span>60 min</span>
                  </div>
                </div>

                {/* Awakenings */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="awakenings-count" className="text-xs font-bold text-gray-700 block mb-1">
                      Night Awakenings
                    </label>
                    <input
                      id="awakenings-count"
                      type="number"
                      min={0}
                      max={10}
                      value={inputs.awakeningsCount}
                      onChange={e => updateField('awakeningsCount', parseInt(e.target.value) || 0)}
                      className="w-full p-2.5 rounded-xl border border-gray-200 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="awakening-duration" className="text-xs font-bold text-gray-700 block mb-1">
                      Minutes Each
                    </label>
                    <input
                      id="awakening-duration"
                      type="number"
                      min={0}
                      max={60}
                      step={5}
                      value={inputs.awakeningMinutesEach}
                      onChange={e => updateField('awakeningMinutesEach', parseInt(e.target.value) || 0)}
                      className="w-full p-2.5 rounded-xl border border-gray-200 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none"
                      disabled={inputs.awakeningsCount === 0}
                    />
                  </div>
                </div>

                {/* Presets */}
                <Presets currentInputs={inputs} onApply={applyPreset} />

                {/* Naps */}
                <NapEditor
                  naps={inputs.naps}
                  napAnalysis={output.napAnalysis}
                  onAdd={addNap}
                  onRemove={removeNap}
                  onUpdate={updateNap}
                />

                {/* Profile settings (collapsed) */}
                <ProfileSettings profile={inputs.profile} onChange={updateProfile} />
              </div>
            </div>

            {/* Hygiene Checklist */}
            <HygieneChecklist checked={hygieneChecked} onToggle={toggleHygiene} />
          </div>

          {/* ─── Right: Results Panel ──────────────────────────────── */}
          <div className="lg:col-span-7 space-y-6">
            {/* Summary Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-[2rem] p-6 md:p-8 shadow-xl shadow-indigo-100/50"
            >
              <h2 className="font-display font-bold text-xl text-gray-900 mb-4">
                Sleep Summary
              </h2>
              <SummaryCards output={output} />
            </motion.div>

            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-[2rem] p-6 md:p-8 shadow-xl shadow-indigo-100/50"
            >
              <h2 className="font-display font-bold text-xl text-gray-900 mb-4">
                Sleep Architecture
              </h2>
              <SleepTimeline
                bedtime={inputs.bedtime}
                wakeTime={inputs.wakeTime}
                latencyMinutes={inputs.sleepLatencyMinutes}
                cycles={output.cycleArchitecture}
                totalSleepMinutes={output.totalSleepTimeMinutes}
              />
            </motion.div>

            {/* Recommended Times */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-[2rem] p-6 md:p-8 shadow-xl shadow-indigo-100/50"
            >
              <RecommendedTimes
                wakeTimes={output.recommendedWakeTimes}
                bedtimes={output.recommendedBedtimes}
              />
            </motion.div>

            {/* Export / Share */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-[2rem] p-6 md:p-8 shadow-xl shadow-indigo-100/50"
            >
              <h2 className="font-display font-bold text-xl text-gray-900 mb-4">
                Export & Share
              </h2>
              <ExportPanel inputs={inputs} output={output} />
            </motion.div>

            {/* Disclaimer */}
            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 flex items-start gap-3">
              <Info size={18} className="text-gray-400 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-gray-500 leading-relaxed">
                <p className="font-bold text-gray-600 mb-1">About Sleep Architect</p>
                <p>
                  This tool provides estimates based on typical adult sleep patterns and the
                  ~90-minute sleep cycle model. Actual sleep architecture varies by individual,
                  health status, medications, and other factors.
                </p>
                <p className="mt-2 font-medium">
                  This is not medical advice. If you have persistent sleep problems, consult a
                  healthcare provider or sleep specialist.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SleepArchitect;
