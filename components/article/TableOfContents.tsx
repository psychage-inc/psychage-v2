import React from 'react';
import { motion } from 'framer-motion';

const TableOfContents: React.FC = () => {
  const sections = [
    { id: 'what-is-anxiety', title: 'What is Anxiety?' },
    { id: 'common-symptoms', title: 'Common Symptoms' },
    { id: 'when-to-seek-help', title: 'When to Seek Help' },
    { id: 'treatment-options', title: 'Treatment Options' },
  ];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="hidden lg:block sticky top-32">
       <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Contents</div>
       <ul className="space-y-4 border-l border-gray-100">
          {sections.map((section) => (
             <li key={section.id} className="-ml-px">
                <a 
                    href={`#${section.id}`}
                    onClick={(e) => handleClick(e, section.id)}
                    className="block pl-4 text-sm font-medium text-gray-500 hover:text-teal-600 hover:border-l-2 hover:border-teal-500 transition-all py-1"
                >
                    {section.title}
                </a>
             </li>
          ))}
       </ul>
       
       <div className="mt-12 p-6 bg-teal-50 rounded-2xl">
            <h4 className="font-bold text-teal-900 mb-2 text-sm">Need professional help?</h4>
            <p className="text-xs text-teal-700/80 mb-4 leading-relaxed">
                Find verified therapists specializing in anxiety in your area.
            </p>
            <button className="w-full py-2 bg-teal-600 text-white rounded-lg text-xs font-bold hover:bg-teal-700 transition-colors">
                Find Provider
            </button>
       </div>
    </div>
  );
};

export default TableOfContents;