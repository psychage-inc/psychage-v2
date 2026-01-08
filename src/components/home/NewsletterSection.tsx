import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2, CheckCircle } from 'lucide-react';
import Button from '../ui/Button';
import { useNewsletterService } from '@/services/newsletterService';

type SubscriptionStatus = 'idle' | 'loading' | 'success' | 'error';

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<SubscriptionStatus>('idle');
  const newsletterService = useNewsletterService();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === 'loading') return;

    setStatus('loading');
    try {
      await newsletterService.subscribe(email);
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
      // Reset after showing error briefly
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <section className="py-24 px-6 bg-white">
      <div className="container mx-auto max-w-[1280px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative bg-teal-950 rounded-2xl overflow-hidden px-8 py-16 md:px-16 md:py-20 text-center"
        >
          {/* Decorative Pattern */}
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <div className="w-64 h-64 border-4 border-teal-500 rounded-full" />
          </div>
          <div className="absolute bottom-0 left-0 p-8 opacity-10 transform translate-y-1/2 -translate-x-1/2">
            <div className="w-48 h-48 bg-teal-500 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-6 tracking-tight">
              Exceed every expectation.
            </h2>
            <p className="text-teal-100/80 text-xl font-medium mb-10">
              Join our community of 50,000+ subscribers receiving evidence-based mental health insights.
            </p>

            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-3 text-teal-300"
              >
                <CheckCircle size={24} />
                <span className="text-lg font-medium">Thanks for subscribing!</span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="h-12 px-6 w-full sm:w-80 rounded-lg bg-teal-900/50 border border-teal-800 text-white placeholder-teal-400/60 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
                <Button
                  type="submit"
                  disabled={status === 'loading'}
                  className="h-12 px-8 bg-gray-900 text-white hover:bg-black disabled:opacity-70"
                  rightIcon={status === 'loading' ? <Loader2 size={18} className="animate-spin" /> : <ArrowRight size={18} />}
                >
                  {status === 'loading' ? 'Subscribing...' : status === 'error' ? 'Try Again' : 'Subscribe'}
                </Button>
                <Button variant="outline" className="w-full sm:w-auto border-teal-800 text-white hover:bg-teal-900 hover:border-teal-700">
                  Get a demo
                </Button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;