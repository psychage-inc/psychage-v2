import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, BookOpen, Users, X } from 'lucide-react';

const DISMISSED_KEY = 'psychage_welcome_dismissed';

const AnonymousWelcomeBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(DISMISSED_KEY)) {
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    localStorage.setItem(DISMISSED_KEY, 'true');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="rounded-xl border border-border bg-surface p-6 md:p-8 relative"
        >
          <button
            onClick={dismiss}
            className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-surface-hover transition-colors text-text-tertiary"
            aria-label="Dismiss"
          >
            <X size={14} />
          </button>

          <h3 className="font-display font-bold text-lg text-text-primary mb-2">
            New here? Welcome.
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed mb-5 max-w-lg">
            Psychage is a free mental health education platform. Explore at your own pace — everything is private and evidence-based.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/tools/symptom-navigator"
              onClick={dismiss}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:underline transition-colors"
            >
              <Compass size={14} />
              Explore what you're feeling
            </Link>
            <span className="text-border">|</span>
            <Link
              to="/learn"
              onClick={dismiss}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:underline transition-colors"
            >
              <BookOpen size={14} />
              Browse articles
            </Link>
            <span className="text-border">|</span>
            <Link
              to="/providers"
              onClick={dismiss}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] hover:underline transition-colors"
            >
              <Users size={14} />
              Find a provider
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnonymousWelcomeBanner;
