import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Wrench } from 'lucide-react';

export interface ActionCardItem {
  type: 'tool' | 'article';
  title: string;
  description: string;
  href: string;
}

interface ActionCardsProps {
  cards: ActionCardItem[];
}

const ActionCards: React.FC<ActionCardsProps> = ({ cards }) => {
  if (!cards || cards.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="mt-3"
    >
      <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-2">
        Suggested
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {cards.map((card, i) => (
          <Link
            key={i}
            to={card.href}
            className="flex items-start gap-2.5 border border-slate-200 dark:border-neutral-700 rounded-lg px-3 py-2.5 hover:bg-slate-50 dark:hover:bg-neutral-800/50 cursor-pointer transition-colors group"
          >
            <Wrench
              size={14}
              className="text-teal-600 dark:text-teal-400 shrink-0 mt-0.5"
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-slate-800 dark:text-neutral-200 truncate">
                {card.title}
              </p>
              <p className="text-xs text-slate-500 dark:text-neutral-400 truncate">
                {card.description}
              </p>
            </div>
            <ArrowRight
              size={12}
              className="text-slate-300 dark:text-neutral-600 group-hover:text-teal-500 transition-colors shrink-0 mt-1"
            />
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export default ActionCards;
