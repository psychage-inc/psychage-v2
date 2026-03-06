import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2, CheckCircle, Mail } from 'lucide-react';
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';
import { useNewsletterService } from '@/services/newsletterService';
import { consentService } from '@/services/consentService';

type SubscriptionStatus = 'idle' | 'loading' | 'success' | 'error';

const NewsletterSection: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<SubscriptionStatus>('idle');
  const newsletterService = useNewsletterService();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === 'loading') return;

    setStatus('loading');
    try {
      await newsletterService.subscribe(email);
      consentService.logConsent('newsletter', true, 'v1.0', { email, source: 'homepage' }).catch(console.error);
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <section className="py-28 px-6 bg-white dark:bg-slate-950">
      <div className="container mx-auto max-w-[1280px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden px-8 py-16 md:px-16 md:py-20"
        >
          {/* Liquid Glass Background Layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-950 via-teal-900 to-slate-900" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(20,184,166,0.25),_transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,_rgba(13,148,136,0.2),_transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.03),_transparent_70%)]" />

          {/* Glass Shimmer Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] via-transparent to-white/[0.02]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-400/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-400/10 to-transparent" />

          {/* Floating Glass Orbs */}
          <div className="absolute top-12 right-16 w-32 h-32 bg-teal-400/8 rounded-full blur-2xl" />
          <div className="absolute bottom-8 left-12 w-40 h-40 bg-emerald-400/6 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-cyan-400/5 rounded-full blur-2xl" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-white mb-5 tracking-tight">
              Start understanding your mind today.
            </h2>
            <p className="text-teal-100/70 text-lg mb-10 max-w-xl mx-auto">
              Take a free assessment, explore your symptoms privately, or browse 50+ evidence-based articles. No account required.
            </p>

            {/* Primary CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button
                className="h-14 px-8 rounded-full text-base bg-white text-teal-950 hover:bg-teal-50 font-bold shadow-lg shadow-black/10"
                rightIcon={<ArrowRight size={18} />}
                onClick={() => navigate('/clarity-score')}
              >
                Take a Free Assessment
              </Button>
              <Button
                variant="ghost"
                className="h-14 px-8 rounded-full text-base text-white border border-white/15 hover:bg-white/10 hover:border-white/25 backdrop-blur-sm"
                onClick={() => navigate('/learn')}
              >
                Explore the Library
              </Button>
            </div>

            {/* Newsletter as secondary */}
            <div className="border-t border-white/10 pt-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Mail className="w-4 h-4 text-teal-400" />
                <span className="text-sm text-teal-300/80 font-medium">Get weekly mental health insights</span>
              </div>

              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center justify-center gap-2 text-teal-300"
                >
                  <CheckCircle size={18} />
                  <span className="text-sm font-medium">Thanks for subscribing!</span>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex items-center justify-center gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="h-10 px-4 flex-1 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 text-white text-sm placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="h-10 px-5 bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/10 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-60 flex items-center gap-2"
                  >
                    {status === 'loading' ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : status === 'error' ? (
                      'Retry'
                    ) : (
                      'Subscribe'
                    )}
                  </button>
                </form>
              )}
              <p className="text-[10px] text-white/20 mt-2 max-w-md mx-auto">
                By subscribing you consent to receiving emails from Psychage. You can unsubscribe at any time.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
