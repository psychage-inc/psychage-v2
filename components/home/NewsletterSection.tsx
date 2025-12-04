import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button';

const NewsletterSection: React.FC = () => {
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

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                 <Button className="w-full sm:w-auto bg-teal-500 text-teal-950 hover:bg-teal-400 border-none font-bold">
                    Try for free
                 </Button>
                 <Button variant="outline" className="w-full sm:w-auto border-teal-800 text-white hover:bg-teal-900 hover:border-teal-700">
                    Get a demo
                 </Button>
              </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;