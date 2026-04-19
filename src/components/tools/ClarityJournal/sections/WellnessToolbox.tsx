import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Plus, Trash2, ChevronDown, ChevronUp, Heart, Users, Brain, Stethoscope, Download, LucideIcon } from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Button from '@/components/ui/Button';
import CrisisCallout from '../components/CrisisCallout';
import { useClarityJournal } from '../hooks/useClarityJournal';
import { WELLNESS_CATEGORIES, SAFETY_PLAN_SECTIONS } from '../constants';
import { generateId } from '../dates';
import { exportSafetyPlanPDF } from '../export';
import type { WellnessToolboxItem, SafetyPlanSection, SafetyPlanContact } from '../types';

const iconMap: Record<string, LucideIcon> = { Heart, Users, Brain, Stethoscope };

const WellnessToolbox: React.FC = () => {
  const navigate = useNavigate();
  const { data, addToolboxItem, deleteToolboxItem, saveSafetyPlan } = useClarityJournal();
  const [activeTab, setActiveTab] = useState<'toolbox' | 'safety'>('toolbox');
  const [expandedCat, setExpandedCat] = useState<string | null>('physical');
  const [addingToCat, setAddingToCat] = useState<string | null>(null);
  const [newItemText, setNewItemText] = useState('');

  // Safety plan local state
  const [safetyPlan, setSafetyPlan] = useState<SafetyPlanSection[]>(data.safetyPlan);
  const [addingToSection, setAddingToSection] = useState<number | null>(null);
  const [spText, setSpText] = useState('');
  const [spName, setSpName] = useState('');
  const [spPhone, setSpPhone] = useState('');

  const handleAddToolboxItem = (category: WellnessToolboxItem['category']) => {
    if (!newItemText.trim()) return;
    addToolboxItem({
      id: generateId(),
      category,
      text: newItemText.trim(),
      sortOrder: data.wellnessToolbox.filter(i => i.category === category).length,
    });
    setNewItemText('');
    setAddingToCat(null);
  };

  const handleAddSafetyItem = (sectionNumber: number) => {
    if (!spText.trim()) return;
    const section = SAFETY_PLAN_SECTIONS.find(s => s.number === sectionNumber);
    const hasContact = section && 'hasContact' in section && section.hasContact;
    const newItem: SafetyPlanContact = {
      id: generateId(),
      text: spText.trim(),
      contactName: hasContact ? spName || undefined : undefined,
      contactPhone: hasContact ? spPhone || undefined : undefined,
    };
    const updated = safetyPlan.map(s =>
      s.sectionNumber === sectionNumber
        ? { ...s, items: [...s.items, newItem] }
        : s,
    );
    setSafetyPlan(updated);
    saveSafetyPlan(updated);
    setSpText('');
    setSpName('');
    setSpPhone('');
    setAddingToSection(null);
  };

  const handleDeleteSafetyItem = (sectionNumber: number, itemId: string) => {
    const updated = safetyPlan.map(s =>
      s.sectionNumber === sectionNumber
        ? { ...s, items: s.items.filter(i => i.id !== itemId) }
        : s,
    );
    setSafetyPlan(updated);
    saveSafetyPlan(updated);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 pt-24 pb-12 px-6">
      <SEO title="Wellness Toolbox & Safety Plan | Clarity Journal" description="Your personal maintenance and crisis plan." />
      <div className="container mx-auto max-w-2xl">
        <div className="mb-8"><Breadcrumbs /></div>
        <button onClick={() => navigate('/tools/clarity-journal')} className="flex items-center gap-2 text-sm text-slate-500 dark:text-neutral-400 hover:text-teal-600 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Journal
        </button>

        <h1 className="font-display font-bold text-2xl md:text-3xl text-slate-900 dark:text-neutral-100 mb-2">Wellness Toolbox & Safety Plan</h1>
        <p className="text-slate-500 dark:text-neutral-400 mb-6">Your personal plan for hard days and crisis moments.</p>

        {/* Tab toggle */}
        <div className="flex gap-2 mb-6" role="tablist" aria-label="Wellness sections">
          <button
            role="tab"
            aria-selected={activeTab === 'toolbox'}
            onClick={() => setActiveTab('toolbox')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'toolbox' ? 'bg-teal-600 text-white' : 'bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-neutral-400 hover:bg-slate-200 dark:hover:bg-neutral-700'
            }`}
          >
            Wellness Toolbox
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'safety'}
            onClick={() => setActiveTab('safety')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeTab === 'safety' ? 'bg-red-600 text-white' : 'bg-slate-100 dark:bg-neutral-800 text-slate-600 dark:text-neutral-400 hover:bg-slate-200 dark:hover:bg-neutral-700'
            }`}
          >
            Safety Plan
          </button>
        </div>

        {activeTab === 'toolbox' ? (
          /* Part A: Wellness Toolbox */
          <div className="space-y-4">
            {WELLNESS_CATEGORIES.map(cat => {
              const Icon = iconMap[cat.icon] || Heart;
              const items = data.wellnessToolbox.filter(i => i.category === cat.id);
              const isExpanded = expandedCat === cat.id;

              return (
                <div key={cat.id} className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-slate-100 dark:border-neutral-800 overflow-hidden">
                  <button onClick={() => setExpandedCat(isExpanded ? null : cat.id)} className="w-full flex items-center justify-between p-5 text-left">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 dark:text-neutral-100">{cat.label}</h3>
                        <p className="text-xs text-slate-500 dark:text-neutral-400">{cat.description}</p>
                      </div>
                    </div>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400 dark:text-neutral-500" />}
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="px-5 pb-5 space-y-2">
                          {items.map(item => (
                            <div key={item.id} className="flex items-center gap-3 bg-slate-50 dark:bg-neutral-900 rounded-xl p-3">
                              <p className="flex-1 text-sm text-slate-700 dark:text-neutral-300">{item.text}</p>
                              <button onClick={() => deleteToolboxItem(item.id)} className="text-slate-300 dark:text-neutral-600 hover:text-red-500 transition-colors" aria-label="Delete">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                          {addingToCat === cat.id ? (
                            <div className="flex gap-2">
                              <input value={newItemText} onChange={e => setNewItemText(e.target.value)} placeholder="Add an item..." className="flex-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-neutral-700 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" autoFocus />
                              <Button variant="primary" size="sm" onClick={() => handleAddToolboxItem(cat.id)} disabled={!newItemText.trim()}>Add</Button>
                              <Button variant="outline" size="sm" onClick={() => setAddingToCat(null)}>Cancel</Button>
                            </div>
                          ) : (
                            <button onClick={() => setAddingToCat(cat.id)} className="flex items-center gap-1.5 text-sm text-teal-600 hover:text-teal-700 py-2">
                              <Plus className="w-4 h-4" /> Add
                            </button>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        ) : (
          /* Part B: Safety Plan */
          <div className="space-y-4">
            <CrisisCallout />

            {SAFETY_PLAN_SECTIONS.map(section => {
              const planSection = safetyPlan.find(s => s.sectionNumber === section.number);
              const items = planSection?.items || [];

              return (
                <div key={section.number} className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-slate-100 dark:border-neutral-800 p-5">
                  <h3 className="font-semibold text-slate-900 dark:text-neutral-100 mb-1">
                    <span className="text-teal-600 mr-2">{section.number}.</span>
                    {section.title}
                  </h3>

                  <div className="mt-3 space-y-2">
                    {items.map(item => (
                      <div key={item.id} className="flex items-center gap-3 bg-slate-50 dark:bg-neutral-900 rounded-xl p-3">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-slate-700 dark:text-neutral-300">{item.text}</p>
                          {(item.contactName || item.contactPhone) && (
                            <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">
                              {item.contactName}{item.contactPhone && ` — ${item.contactPhone}`}
                            </p>
                          )}
                        </div>
                        <button onClick={() => handleDeleteSafetyItem(section.number, item.id)} className="text-slate-300 dark:text-neutral-600 hover:text-red-500 transition-colors" aria-label="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}

                    {addingToSection === section.number ? (
                      <div className="space-y-2 bg-slate-50 dark:bg-neutral-900 rounded-xl p-3">
                        <input value={spText} onChange={e => setSpText(e.target.value)} placeholder={section.placeholder} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-neutral-700 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" autoFocus />
                        {'hasContact' in section && section.hasContact && (
                          <div className="grid grid-cols-2 gap-2">
                            <input value={spName} onChange={e => setSpName(e.target.value)} placeholder="Name (optional)" className="px-3 py-2 rounded-lg border border-slate-200 dark:border-neutral-700 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
                            <input value={spPhone} onChange={e => setSpPhone(e.target.value)} placeholder="Phone (optional)" className="px-3 py-2 rounded-lg border border-slate-200 dark:border-neutral-700 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500" />
                          </div>
                        )}
                        <div className="flex gap-2">
                          <Button variant="primary" size="sm" onClick={() => handleAddSafetyItem(section.number)} disabled={!spText.trim()}>Add</Button>
                          <Button variant="outline" size="sm" onClick={() => setAddingToSection(null)}>Cancel</Button>
                        </div>
                      </div>
                    ) : (
                      <button onClick={() => setAddingToSection(section.number)} className="flex items-center gap-1.5 text-sm text-teal-600 hover:text-teal-700 py-1">
                        <Plus className="w-4 h-4" /> Add
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            {/* PDF Export */}
            <button
              onClick={() => exportSafetyPlanPDF(safetyPlan)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-700 text-slate-600 dark:text-neutral-400 hover:bg-slate-50 dark:hover:bg-neutral-800 hover:text-slate-900 text-sm font-medium transition-colors"
            >
              <Download className="w-4 h-4" />
              Download Safety Plan as PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WellnessToolbox;
