import React, { useEffect } from 'react';
import { ArrowLeft, ShieldCheck, Star, MapPin, Video, Building, Calendar, Phone, Mail } from 'lucide-react';
import { Provider, providers } from '../../data/providers';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { SkeletonProviderProfile } from '../ui/Skeletons';
import ReviewCard from '../providers/ReviewCard';
import ProviderCard from '../providers/ProviderCard';

interface ProviderProfileProps {
  provider: Provider;
  onBack: () => void;
  isLoading?: boolean;
}

const ProviderProfile: React.FC<ProviderProfileProps> = ({ provider, onBack, isLoading }) => {
  useEffect(() => {
    window.scrollTo(0,0);
  }, [provider]);

  if (isLoading) {
      return <SkeletonProviderProfile />;
  }

  // Mock Reviews Data (In real app, fetch based on provider ID)
  const reviews = [
    { id: '1', author: 'Anonymous Patient', date: '2 weeks ago', rating: 5, text: 'Dr. Chen is incredibly empathetic and skilled. She helped me navigate a very difficult transition in my life with practical tools.' },
    { id: '2', author: 'Michael R.', date: '1 month ago', rating: 5, text: 'I felt heard for the first time. Highly recommend for anyone dealing with anxiety.' },
    { id: '3', author: 'Sarah L.', date: '2 months ago', rating: 4, text: 'Great experience overall. The virtual sessions are very convenient.' }
  ];

  // Get related providers (exclude current, take 3)
  const relatedProviders = providers.filter(p => p.id !== provider.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#fafaf9] pt-28 pb-20">
      <div className="container mx-auto max-w-5xl px-6">
        
        <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-8 font-bold text-sm uppercase tracking-wider transition-colors">
            <ArrowLeft size={16} /> Back to Directory
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Main Content */}
            <div className="lg:col-span-8">
                {/* Header Card */}
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm mb-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-32 bg-teal-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/4" />
                    
                    <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                        <div className="shrink-0 relative">
                            <img 
                                src={provider.image} 
                                alt={provider.name} 
                                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                            />
                            {provider.verified && (
                                <div className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow-md">
                                    <ShieldCheck size={24} className="text-teal-500 fill-teal-50" />
                                </div>
                            )}
                        </div>
                        
                        <div className="flex-grow">
                            <h1 className="font-display font-bold text-3xl text-gray-900 mb-1">{provider.name}</h1>
                            <p className="text-lg text-gray-500 font-medium mb-4">{provider.role}</p>
                            
                            <div className="flex flex-wrap gap-4 text-sm font-medium text-gray-600 mb-6">
                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-lg">
                                    <Star size={16} className="text-amber-500 fill-amber-500" />
                                    <span className="text-gray-900 font-bold">{provider.rating}</span>
                                    <span className="text-gray-400">({provider.reviews} reviews)</span>
                                </div>
                                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-lg">
                                    <MapPin size={16} className="text-gray-400" />
                                    {provider.location}
                                </div>
                            </div>

                            <div className="flex gap-2 flex-wrap">
                                {provider.specialties.map(spec => (
                                    <Badge key={spec} variant="neutral">{spec}</Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* About Section */}
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm mb-8">
                    <h2 className="font-display font-bold text-xl text-gray-900 mb-4">About</h2>
                    <div className="prose prose-gray max-w-none text-gray-600">
                        <p className="mb-4">
                            Hello! I am dedicated to helping individuals navigate life's challenges with resilience and clarity. With over 10 years of experience in clinical practice, I specialize in anxiety, depression, and stress management.
                        </p>
                        <p>
                            My approach is integrative, combining Cognitive Behavioral Therapy (CBT) with mindfulness-based techniques to help you not only manage symptoms but address root causes. I believe in creating a safe, non-judgmental space where we can work collaboratively towards your goals.
                        </p>
                    </div>
                </div>

                {/* Credentials */}
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm mb-8">
                    <h2 className="font-display font-bold text-xl text-gray-900 mb-6">Education & Credentials</h2>
                    <ul className="space-y-4">
                        <li className="flex gap-4">
                            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center shrink-0 text-gray-400">
                                <Building size={20} />
                            </div>
                            <div>
                                <div className="font-bold text-gray-900">Ph.D. in Clinical Psychology</div>
                                <div className="text-sm text-gray-500">Stanford University • 2012</div>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center shrink-0 text-gray-400">
                                <ShieldCheck size={20} />
                            </div>
                            <div>
                                <div className="font-bold text-gray-900">Licensed Psychologist</div>
                                <div className="text-sm text-gray-500">License #PSY12345 • California Board of Psychology</div>
                            </div>
                        </li>
                    </ul>
                </div>

                {/* Reviews Section */}
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="font-display font-bold text-xl text-gray-900">Patient Reviews</h2>
                        <span className="text-teal-600 font-bold text-sm cursor-pointer hover:underline">View all {provider.reviews}</span>
                    </div>
                    <div className="space-y-6">
                        {reviews.map(review => (
                            <ReviewCard key={review.id} review={review} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Sidebar: Booking */}
            <div className="lg:col-span-4">
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-lg shadow-gray-200/50 sticky top-32">
                    <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-50">
                        <div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Availability</span>
                            <div className="text-green-600 font-bold flex items-center gap-2 mt-1">
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                {provider.availability}
                            </div>
                        </div>
                        <div className="text-right">
                             <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Session</span>
                             <div className="font-bold text-gray-900 mt-1">$150 - $200</div>
                        </div>
                    </div>

                    <div className="space-y-4 mb-8">
                        <button className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-teal-500 hover:bg-teal-50 transition-all group">
                            <div className="flex items-center gap-3">
                                <Video className="text-gray-400 group-hover:text-teal-600" size={20} />
                                <div className="text-left">
                                    <div className="font-bold text-gray-900">Virtual Session</div>
                                    <div className="text-xs text-gray-500">50 mins • Zoom</div>
                                </div>
                            </div>
                            <div className="w-5 h-5 rounded-full border-2 border-gray-300 group-hover:border-teal-500" />
                        </button>
                        <button className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-teal-500 hover:bg-teal-50 transition-all group">
                            <div className="flex items-center gap-3">
                                <Building className="text-gray-400 group-hover:text-teal-600" size={20} />
                                <div className="text-left">
                                    <div className="font-bold text-gray-900">In-Person</div>
                                    <div className="text-xs text-gray-500">50 mins • Office</div>
                                </div>
                            </div>
                            <div className="w-5 h-5 rounded-full border-2 border-gray-300 group-hover:border-teal-500" />
                        </button>
                    </div>

                    <Button size="lg" className="w-full mb-4 font-bold">Request Appointment</Button>
                    
                    <div className="flex justify-center gap-4">
                        <button className="p-3 rounded-xl bg-gray-50 text-gray-500 hover:bg-gray-100 transition-colors">
                            <Phone size={20} />
                        </button>
                        <button className="p-3 rounded-xl bg-gray-50 text-gray-500 hover:bg-gray-100 transition-colors">
                            <Mail size={20} />
                        </button>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-50">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Accepted Insurance</span>
                        <div className="flex flex-wrap gap-2">
                            {provider.insurance.map(ins => (
                                <span key={ins} className="px-2 py-1 bg-gray-50 rounded text-xs font-medium text-gray-600">{ins}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </div>

        {/* Related Providers */}
        <div className="mt-20 pt-12 border-t border-gray-200">
            <h3 className="font-display font-bold text-2xl text-gray-900 mb-8">Similar Specialists</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedProviders.map(rp => (
                    <div key={rp.id} className="h-full">
                        <ProviderCard provider={rp} />
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderProfile;