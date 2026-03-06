import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Sun, ClipboardCheck, Lightbulb, Activity, Map, ShieldCheck, BookOpen, LucideIcon } from 'lucide-react';
import type { SectionMeta } from '../constants';

const iconMap: Record<string, LucideIcon> = {
  Sun, ClipboardCheck, Lightbulb, Activity, Map, ShieldCheck, BookOpen,
};

interface SectionCardProps {
  section: SectionMeta;
  lastEntry?: string; // Formatted date or null
  entryCount?: number;
}

const SectionCard: React.FC<SectionCardProps> = ({ section, lastEntry, entryCount }) => {
  const Icon = iconMap[section.icon] || Sun;

  return (
    <Link
      to={section.route}
      className="group bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md hover:border-teal-200 transition-all duration-200"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-colors">
          <Icon className="w-5 h-5" />
        </div>
        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-teal-500 transition-colors" />
      </div>
      <h3 className="font-display font-semibold text-slate-900 mb-1">{section.title}</h3>
      <p className="text-xs text-slate-500 mb-3 line-clamp-2">{section.description}</p>
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>{section.frequency}</span>
        <span>{lastEntry || 'Not started'}</span>
      </div>
    </Link>
  );
};

export default SectionCard;
