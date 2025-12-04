import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Brain, ChevronRight } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateGeneric?: (view: string) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, onNavigateGeneric }) => {
  
  const handleNav = (view: string) => {
      onClose();
      if(onNavigateGeneric) onNavigateGeneric(view);
  };

  const menuItems = [
      { name: 'Home', view: 'home' },
      { name: 'Articles', view: 'home' }, // Should route to category in real app
      { name: 'Videos', view: 'home' },
      { name: 'Tools', view: 'clarity-score' },
      { name: 'Find Care', view: 'providers' },
      { name: 'About', view: 'about' },
      { name: 'Contact', view: 'contact' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[110] md:hidden"
          />

          {/* Slide-out Menu */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl z-[120] md:hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-6 flex items-center justify-between border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center text-white">
                     <Brain size={18} />
                </div>
                <span className="font-display font-bold text-xl text-gray-900">
                  Psychage
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Links */}
            <nav className="flex-1 overflow-y-auto py-6 px-6 flex flex-col gap-2">
              {menuItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNav(item.view)}
                  className="group flex items-center justify-between p-4 rounded-xl text-lg font-bold text-gray-700 hover:bg-gray-50 hover:text-teal-700 transition-all border border-transparent hover:border-gray-100 text-left w-full"
                >
                  {item.name}
                  <ChevronRight size={18} className="text-gray-300 group-hover:text-teal-500" />
                </button>
              ))}
              
              <div className="mt-6 pt-6 border-t border-gray-100">
                <button onClick={() => handleNav('about')} className="block w-full text-left py-3 font-medium text-gray-500 hover:text-gray-900">Help Center</button>
              </div>
            </nav>

            {/* Footer / CTA */}
            <div className="p-6 border-t border-gray-100 bg-gray-50">
              <button 
                onClick={() => handleNav('clarity-score')}
                className="w-full py-3.5 px-4 bg-teal-600 text-white rounded-xl font-bold shadow-lg shadow-teal-600/20 active:scale-[0.98] transition-all flex justify-center items-center gap-2"
              >
                Start Assessment <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;