import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Users, Search, MapPin, Calendar, ShieldCheck, HeartHandshake } from 'lucide-react';
import Button from '@/components/ui/Button';
import { Display, Text } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import SEO from '@/components/SEO';

const ConnectLandingPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background pt-24 pb-20">
            <SEO title="Find Mental Health Support | Psychage Connect" description="Connect with verified therapists, counselors, and support groups." />

            {/* Hero Section */}
            <section className="px-6 mb-24 text-center">
                <div className="container mx-auto max-w-5xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6">
                        <Users size={14} />
                        <span>Psychage Connect</span>
                    </div>
                    <Display as="h1" className="text-5xl md:text-7xl mb-8">
                        Find the right <span className="text-primary">support</span> for you.
                    </Display>
                    <Text className="text-xl max-w-2xl mx-auto mb-12">
                        Browse our network of verified mental health professionals, support groups, and crisis resources.
                    </Text>

                    <div className="bg-surface p-2 rounded-2xl shadow-xl shadow-shadow/10 max-w-3xl mx-auto border border-border flex flex-col md:flex-row gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary" size={20} />
                            <input
                                type="text"
                                placeholder="Condition, specialty, or therapist name..."
                                className="w-full pl-12 pr-4 py-4 rounded-xl bg-surface-hover/50 text-text-primary outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                onKeyDown={(e) => e.key === 'Enter' && navigate('/connect/search')}
                            />
                        </div>
                        <div className="relative flex-1 md:max-w-xs">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary" size={20} />
                            <input
                                type="text"
                                placeholder="City or Zip Code"
                                className="w-full pl-12 pr-4 py-4 rounded-xl bg-surface-hover/50 text-text-primary outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                            />
                        </div>
                        <Button size="lg" onClick={() => navigate('/connect/search')}>Search</Button>
                    </div>
                </div>
            </section>

            {/* How it Works */}
            <section className="px-6 mb-24">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Search,
                                title: "1. Search Providers",
                                desc: "Filter by specialty, insurance, and availability to find your match."
                            },
                            {
                                icon: ShieldCheck,
                                title: "2. Verified Profiles",
                                desc: "Review qualifications, certifications, and patient reviews for every provider."
                            },
                            {
                                icon: Calendar,
                                title: "3. Book Instantly",
                                desc: "Schedule appointments directly through our secure platform."
                            }
                        ].map((step, i) => (
                            <Card key={i} className="p-8 text-center hover:border-primary/50 transition-colors group">
                                <div className="w-16 h-16 bg-surface-hover rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                                    <step.icon size={32} />
                                </div>
                                <h3 className="font-bold text-xl text-text-primary mb-3">{step.title}</h3>
                                <p className="text-text-secondary">{step.desc}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Categories */}
            <section className="px-6 mb-24 text-center">
                <div className="container mx-auto max-w-4xl">
                    <Display as="h2" className="text-3xl mb-12">Popular Specialties</Display>
                    <div className="flex flex-wrap justify-center gap-4">
                        {['Anxiety', 'Depression', 'Trauma', 'Couples Therapy', 'Child Psychology', 'Addiction', 'Life Coaching', 'Psychiatry'].map(tag => (
                            <Link key={tag} to={`/connect/search?specialty=${tag}`}>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-6 py-3 rounded-full bg-surface border border-border hover:border-primary hover:text-primary transition-colors cursor-pointer shadow-sm font-medium"
                                >
                                    {tag}
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Provider CTA */}
            <section className="px-6 mb-20">
                <div className="container mx-auto max-w-6xl">
                    <div className="bg-primary rounded-3xl p-8 md:p-16 text-white overflow-hidden relative">
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                            <div className="max-w-xl">
                                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                                    <HeartHandshake size={14} /> For Professionals
                                </div>
                                <h2 className="font-display font-bold text-4xl mb-6">Join our network of care.</h2>
                                <p className="text-white/90 text-lg mb-8 leading-relaxed">
                                    Expand your practice, manage appointments, and connect with patients who need your expertise. Zero joining fees.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <Link to="/connect/join">
                                        <button className="h-12 px-8 bg-white text-primary rounded-xl font-bold hover:bg-surface transition-colors shadow-lg">
                                            Join as Provider
                                        </button>
                                    </Link>
                                    <button className="h-12 px-8 border border-white/30 text-white rounded-xl font-bold hover:bg-white/10 transition-colors">
                                        Learn More
                                    </button>
                                </div>
                            </div>

                            <div className="hidden md:block">
                                {/* Illustration or graphic placeholder */}
                                <div className="w-64 h-64 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20">
                                    <Users size={64} className="text-white/50" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ConnectLandingPage;
