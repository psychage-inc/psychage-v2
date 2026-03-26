import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export interface RelatedTool {
  name: string;
  path?: string; // Internal path (uses React Router Link)
  link?: string; // External link (uses regular <a> tag)
  description: string;
  icon?: React.ReactNode;
}

export interface RelatedToolsBlockProps {
  tools: RelatedTool[];
  className?: string;
}

/**
 * RelatedToolsBlock — Cards linking to related Psychage interactive tools
 * Maximum 3 tools per article recommended
 */
export const RelatedToolsBlock: React.FC<RelatedToolsBlockProps> = ({
  tools,
  className = '',
}) => {
  const prefersReducedMotion = useReducedMotion();

  if (!tools || tools.length === 0) return null;

  // Limit to 3 tools maximum
  const displayTools = tools.slice(0, 3);

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`not-prose my-10 scroll-mt-32 ${className}`}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center">
          <Wrench size={20} className="text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Related Tools
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Interactive resources to help you apply what you've learned
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {displayTools.map((tool, index) => {
          const href = tool.link || tool.path || '#';
          const isExternal = !!tool.link;
          const Component = isExternal ? 'a' : Link;
          const linkProps = isExternal
            ? { href, target: '_blank', rel: 'noopener noreferrer' }
            : { to: tool.path || '/' };

          return (
            <Component
              key={index}
              {...linkProps}
              className="group relative bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-xl p-5 hover:border-primary dark:hover:border-primary transition-all duration-300 hover:shadow-md"
            >
              <div className="flex items-start gap-3 mb-3">
                {tool.icon ? (
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    {tool.icon}
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-indigo-500 flex items-center justify-center shrink-0">
                    <Wrench size={18} className="text-white" />
                  </div>
                )}
                <div className="flex-1">
                  <h4 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-1 group-hover:text-primary transition-colors">
                    {tool.name}
                  </h4>
                </div>
                <ArrowRight
                  size={18}
                  className="text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 mt-0.5"
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {tool.description}
              </p>
            </Component>
          );
        })}
      </div>
    </motion.div>
  );
};

export default RelatedToolsBlock;
