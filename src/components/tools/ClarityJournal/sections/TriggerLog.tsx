import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import SEO from '@/components/SEO';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Button from '@/components/ui/Button';
import { useClarityJournal } from '../hooks/useClarityJournal';
import { TRIGGER_SUBCATEGORIES } from '../constants';
import { generateId, nowISO } from '../dates';
import type { TriggerLogItem } from '../types';

type Category = TriggerLogItem['category'];

const CATEGORY_META: Record<Category, { title: string; description: string }> = {
  triggers: { title: 'Triggers', description: 'Events or situations that push your mood down or anxiety up' },
  warning_signs: { title: 'Early Warning Signs', description: 'Internal signals that things are starting to slip' },
  what_helps: { title: 'What Helps', description: 'Strategies that actually work to bring you back' },
  what_worsens: { title: 'What Makes It Worse', description: 'Patterns that feel good in the moment but make things worse' },
};

const CATEGORIES: Category[] = ['triggers', 'warning_signs', 'what_helps', 'what_worsens'];

const TriggerLog: React.FC = () => {
  const navigate = useNavigate();
  const { data, addTrigger, deleteTrigger } = useClarityJournal();
  const [expandedCategory, setExpandedCategory] = useState<Category | null>('triggers');
  const [addingTo, setAddingTo] = useState<Category | null>(null);
  const [newText, setNewText] = useState('');
  const [newSubCategory, setNewSubCategory] = useState('');
  const [newSeverity, setNewSeverity] = useState(3);
  const [newEffectiveness, setNewEffectiveness] = useState(3);

  const handleAdd = (cat: Category) => {
    if (!newText.trim()) return;
    const item: TriggerLogItem = {
      id: generateId(),
      category: cat,
      text: newText.trim(),
      severity: cat === 'triggers' ? newSeverity : undefined,
      subCategory: newSubCategory || undefined,
      effectivenessRating: cat === 'what_helps' ? newEffectiveness : undefined,
      sortOrder: data.triggerLog.filter(i => i.category === cat).length,
      createdAt: nowISO(),
      updatedAt: nowISO(),
    };
    addTrigger(item);
    setNewText('');
    setNewSubCategory('');
    setAddingTo(null);
  };

  const getItems = (cat: Category) => data.triggerLog.filter(i => i.category === cat);
  const subCategories = (cat: Category) =>
    cat in TRIGGER_SUBCATEGORIES
      ? TRIGGER_SUBCATEGORIES[cat as keyof typeof TRIGGER_SUBCATEGORIES]
      : [];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-6">
      <SEO title="Trigger & Pattern Log | Clarity Journal" description="Map your personal triggers and early warning signs." />
      <div className="container mx-auto max-w-2xl">
        <div className="mb-8"><Breadcrumbs /></div>
        <button onClick={() => navigate('/tools/clarity-journal')} className="flex items-center gap-2 text-sm text-slate-500 hover:text-teal-600 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Journal
        </button>

        <h1 className="font-display font-bold text-2xl md:text-3xl text-slate-900 mb-2">Trigger & Pattern Log</h1>
        <p className="text-slate-500 mb-8">Map the landscape of what affects you.</p>

        <div className="space-y-4">
          {CATEGORIES.map(cat => {
            const meta = CATEGORY_META[cat];
            const items = getItems(cat);
            const isExpanded = expandedCategory === cat;

            return (
              <div key={cat} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <button
                  onClick={() => setExpandedCategory(isExpanded ? null : cat)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <div>
                    <h2 className="font-display font-semibold text-slate-900">{meta.title}</h2>
                    <p className="text-xs text-slate-500 mt-0.5">{meta.description}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">{items.length}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </div>
                </button>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 space-y-2">
                        {items.map(item => (
                          <div key={item.id} className="flex items-center gap-3 bg-slate-50 rounded-xl p-3">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-slate-700">{item.text}</p>
                              <div className="flex gap-2 mt-1">
                                {item.subCategory && (
                                  <span className="text-xs text-slate-400">{item.subCategory}</span>
                                )}
                                {item.severity !== undefined && (
                                  <span className="text-xs text-slate-400">Severity: {item.severity}/5</span>
                                )}
                                {item.effectivenessRating !== undefined && (
                                  <span className="text-xs text-slate-400">Effectiveness: {item.effectivenessRating}/5</span>
                                )}
                              </div>
                            </div>
                            <button onClick={() => deleteTrigger(item.id)} className="text-slate-300 hover:text-red-500 transition-colors" aria-label="Delete">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}

                        {addingTo === cat ? (
                          <div className="bg-slate-50 rounded-xl p-4 space-y-3">
                            <input
                              type="text"
                              value={newText}
                              onChange={e => setNewText(e.target.value)}
                              placeholder={`Describe the ${cat === 'triggers' ? 'trigger' : cat === 'warning_signs' ? 'warning sign' : 'item'}...`}
                              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                              autoFocus
                            />
                            {subCategories(cat).length > 0 && (
                              <select
                                value={newSubCategory}
                                onChange={e => setNewSubCategory(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                              >
                                <option value="">Category (optional)</option>
                                {subCategories(cat).map(sc => (
                                  <option key={sc} value={sc}>{sc}</option>
                                ))}
                              </select>
                            )}
                            {cat === 'triggers' && (
                              <div>
                                <label className="text-xs text-slate-500">Severity: {newSeverity}/5</label>
                                <input type="range" min={1} max={5} value={newSeverity} onChange={e => setNewSeverity(Number(e.target.value))} className="w-full" />
                              </div>
                            )}
                            {cat === 'what_helps' && (
                              <div>
                                <label className="text-xs text-slate-500">Effectiveness: {newEffectiveness}/5</label>
                                <input type="range" min={1} max={5} value={newEffectiveness} onChange={e => setNewEffectiveness(Number(e.target.value))} className="w-full" />
                              </div>
                            )}
                            <div className="flex gap-2">
                              <Button variant="primary" size="sm" onClick={() => handleAdd(cat)} disabled={!newText.trim()}>Add</Button>
                              <Button variant="outline" size="sm" onClick={() => setAddingTo(null)}>Cancel</Button>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => setAddingTo(cat)}
                            className="flex items-center gap-1.5 text-sm text-teal-600 hover:text-teal-700 transition-colors py-2"
                          >
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
      </div>
    </div>
  );
};

export default TriggerLog;
