import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { staggerContainer, staggerItem } from '@/lib/animations';

interface Testimonial {
    quote: string;
    author: string;
    role: string;
    rating: number;
}

const testimonials: Testimonial[] = [
    {
        quote: "The Clarity Score gave me a vocabulary for what I was feeling. It was the first step toward getting actual help instead of just wondering if I was okay.",
        author: "Sarah J.",
        role: "Software Engineer",
        rating: 5,
    },
    {
        quote: "I use the Mood Journal daily. Seeing my emotional patterns mapped out visually helped me realize how much my sleep was affecting my anxiety.",
        author: "David M.",
        role: "Graduate Student",
        rating: 5,
    },
    {
        quote: "The Symptom Navigator is incredibly thorough but not overwhelming. It helped me prepare for my first therapy appointment with confidence.",
        author: "Elena R.",
        role: "Teacher",
        rating: 5,
    }
];

const UserTestimonials: React.FC = () => {
    return (
        <section className="py-14 sm:py-16 lg:py-24 px-6 bg-white dark:bg-slate-900 overflow-hidden">
            <div className="container mx-auto max-w-6xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center max-w-2xl mx-auto mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
                        Real people. Real insights.
                    </h2>
                    <p className="text-lg text-slate-600 dark:text-slate-400">
                        Join thousands who have gained clarity and taken control of their mental health journey.
                    </p>
                </motion.div>

                {/* Testimonials Grid / Carousel */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex overflow-x-auto pb-8 -mx-6 px-6 snap-x snap-mandatory gap-6 md:grid md:grid-cols-3 md:overflow-visible md:pb-0 md:mx-0 md:px-0 scrollbar-hide"
                >
                    {testimonials.map((testimonial, i) => (
                        <motion.div
                            key={i}
                            variants={staggerItem}
                            className="w-[min(85vw,21.25rem)] shrink-0 snap-center md:w-auto flex flex-col p-8 rounded-2xl bg-surface-hover dark:bg-slate-800/50 border border-border relative group"
                        >
                            <Quote className="absolute top-6 right-6 w-8 h-8 text-border group-hover:text-primary/20 transition-colors" />

                            <div className="flex gap-1 mb-6 relative z-10">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                                ))}
                            </div>

                            <p className="text-text-primary leading-relaxed mb-8 flex-grow relative z-10">
                                "{testimonial.quote}"
                            </p>

                            <div className="mt-auto relative z-10">
                                <p className="font-semibold text-text-primary">
                                    {testimonial.author}
                                </p>
                                <p className="text-sm text-text-secondary">
                                    {testimonial.role}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default UserTestimonials;
