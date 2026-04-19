
import React, { useRef } from 'react';
import {
  ArrowRight,
  ArrowUp
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import CrisisBanner from './CrisisBanner';
import { useReducedMotion } from '@/hooks/useReducedMotion';

// interface FooterProps { }

interface FooterLink {
  name: string;
  view: string;
  id?: string;
}

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const currentYear = new Date().getFullYear();
  const reduced = useReducedMotion();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPath = (view: string, id?: string) => {
    if (view === 'home') return '/';
    if (view === 'category' && id) return `/learn/${id}`;
    if (view === 'clarity-score') return '/clarity-score';
    if (view === 'find-care' || view === 'providers') return '/providers';
    if (view === 'about') return '/about';
    if (view === 'contact') return '/contact';
    if (view === 'privacy') return '/legal/privacy';
    if (view === 'terms') return '/legal/terms';
    if (view === 'learn') return '/learn';
    if (view === 'tools') return '/tools';
    return `/${view}`;
  };

  const footerLinks: Record<string, FooterLink[]> = {
    learn: [
      { name: 'Anxiety & Stress', view: 'category', id: 'anxiety-stress' },
      { name: 'Depression & Grief', view: 'category', id: 'depression-grief' },
      { name: 'Trauma & Healing', view: 'category', id: 'trauma-healing' },
      { name: 'Relationships', view: 'category', id: 'relationships-communication' },
      { name: 'Self-Worth & Identity', view: 'category', id: 'self-worth-identity' },
      { name: 'Sleep & Body', view: 'category', id: 'sleep-body-connection' },
      { name: 'All Articles', view: 'learn' },
    ],
    popular: [
      { name: 'Clarity Score™', view: 'clarity-score' },
      { name: 'Find a Provider', view: 'providers' },
      { name: 'Articles', view: 'learn' },
      { name: 'Tools', view: 'tools' },
    ],
    company: [
      { name: 'About Us', view: 'about' },
      { name: 'Advisory Board', view: 'advisory-board' },
      { name: 'Content Standards', view: 'content-standards' },
      { name: 'Contact Us', view: 'contact' },
    ],
    connect: [
      { name: 'Contact Support', view: 'contact' },
      { name: 'Crisis Resources', view: 'crisis' },
      { name: 'For Providers', view: 'for-providers' },
    ]
  };


  return (
    <footer ref={footerRef} className="bg-background text-text-primary relative font-sans overflow-hidden flex flex-col border-t border-border transition-colors duration-500">
      {/* Crisis Banner floats on top */}
      <div className="relative z-30 border-b border-border">
        <CrisisBanner />
      </div>

      <div className="container mx-auto px-6 pt-24 max-w-wide relative z-20 flex-grow flex flex-col">

        {/* Footer Hero / Statement */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-24 gap-12">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="max-w-4xl"
          >
            <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-8xl tracking-tight leading-[0.9] mb-8 text-text-primary">
              Good information <br />
              <span className="text-text-tertiary">is the start of good care.</span>
            </h2>
            <p className="text-xl md:text-2xl text-text-tertiary max-w-xl leading-relaxed font-light">
              Building a future where quality care is accessible, understandable, and destigmatized for everyone.
            </p>
          </motion.div>

          <motion.div
            initial={reduced ? false : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col gap-8 items-start"
          >
            <Link to="/about" className="group flex items-center gap-4 text-xl md:text-3xl font-semibold hover:text-primary transition-colors">
              Join the movement
              <span className="bg-text-primary text-background rounded-full p-2 group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">
                <ArrowRight className="group-hover:-rotate-45 transition-transform duration-300" size={24} />
              </span>
            </Link>

          </motion.div>
        </div>

        <motion.div
          initial={reduced ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "circOut" }}
          className="h-px w-full bg-border mb-20 origin-left"
        />

        {/* Massive Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-16 flex-grow">
          {[
            { title: "Learn", links: footerLinks.learn },
            { title: "Popular", links: footerLinks.popular },
            { title: "Company", links: footerLinks.company },
            { title: "Connect", links: footerLinks.connect }
          ].map((column, colIndex) => (
            <motion.div
              key={column.title}
              initial={reduced ? false : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: colIndex * 0.1 }}
            >
              <h4 className="text-sm font-bold text-text-tertiary mb-8 uppercase tracking-widest">{column.title}</h4>
              <ul className="space-y-4">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={getPath(link.view, link.id)}
                      className="group flex items-center gap-2 text-lg text-text-secondary hover:text-text-primary transition-colors duration-300"
                    >
                      <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                      <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Socials & Legal */}
        <div className="bg-background border-t border-border pt-16 pb-8 mt-24 mb-12 flex flex-col md:flex-row items-end justify-end gap-8">

          <div className="flex flex-col items-end gap-4 text-xs text-text-tertiary font-medium tracking-wide text-right">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-text-primary hover:text-primary transition-colors mb-4 text-sm font-bold uppercase tracking-widest group"
            >
              Back to Top <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform" />
            </button>
            <div className="flex flex-wrap gap-x-6 gap-y-2 justify-end">
              <Link to="/legal/privacy" className="hover:text-text-primary transition-colors">Privacy</Link>
              <Link to="/legal/terms" className="hover:text-text-primary transition-colors">Terms</Link>
              <Link to="/sitemap" className="hover:text-text-primary transition-colors">Sitemap</Link>
            </div>
            <p className="max-w-xs md:max-w-md md:text-right text-text-tertiary">Psychage is an educational tool and does not provide medical advice, diagnosis, or treatment.</p>
            <p>© {currentYear} Psychage Health, Inc.</p>
          </div>
        </div>
      </div>

      {/* Footer Watermark - decorative brand anchor */}
      <div className="w-full flex justify-center items-end select-none pointer-events-none pb-4" aria-hidden="true">
        <span className="font-display font-black text-[clamp(4rem,15vw,20rem)] leading-none text-border dark:text-border tracking-tighter whitespace-nowrap">
          psychage
        </span>
      </div>
    </footer >
  );
};


export default Footer;
