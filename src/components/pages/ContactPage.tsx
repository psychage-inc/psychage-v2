import React, { useEffect, useState } from 'react';
import { Mail, MapPin, Phone, MessageSquare, Send, Check } from 'lucide-react';
import Button from '../ui/Button';
import SEO from '../SEO';

const ContactPage: React.FC = () => {
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setSubmitted(true);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#fafaf9] pt-28 pb-20">
            <SEO
                title="Contact Us - Psychage"
                description="Get in touch with the Psychage team for support, partnerships, or general inquiries."
            />

            <div className="container mx-auto px-6 max-w-6xl">

                <div className="text-center mb-16">
                    <h1 className="font-display font-bold text-4xl md:text-5xl text-gray-900 mb-4">
                        Get in touch.
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                        Whether you have a question about our tools, want to partner with us, or just want to say hello.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-gray-200/50 border border-gray-100">

                    {/* Contact Info Sidebar */}
                    <div className="lg:col-span-5 bg-teal-900 text-white p-10 md:p-12 flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500 rounded-full blur-[80px] opacity-20 translate-x-1/2 -translate-y-1/2" />

                        <div className="relative z-10">
                            <h3 className="font-display font-bold text-2xl mb-8">Contact Information</h3>

                            <div className="space-y-8">
                                <div className="flex items-start gap-4">
                                    <Mail className="text-teal-400 mt-1" size={20} />
                                    <div>
                                        <div className="font-bold mb-1">Email</div>
                                        <div className="text-gray-300">support@psychage.com</div>
                                        <div className="text-gray-300">partners@psychage.com</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <MapPin className="text-teal-400 mt-1" size={20} />
                                    <div>
                                        <div className="font-bold mb-1">Headquarters</div>
                                        <div className="text-gray-300">
                                            100 Mental Health Way<br />
                                            Suite 400<br />
                                            San Francisco, CA 94103
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <Phone className="text-teal-400 mt-1" size={20} />
                                    <div>
                                        <div className="font-bold mb-1">Phone</div>
                                        <div className="text-gray-300">+1 (555) 123-4567</div>
                                        <div className="text-xs text-teal-400 mt-1">Mon-Fri, 9am-5pm PST</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 mt-12">
                            <div className="p-6 bg-teal-800/50 rounded-2xl border border-teal-700/50">
                                <h4 className="flex items-center gap-2 font-bold text-teal-300 mb-2">
                                    <MessageSquare size={16} /> Crisis Support
                                </h4>
                                <p className="text-sm text-teal-100/80 mb-4">
                                    We do not provide emergency services through this form. If you are in crisis:
                                </p>
                                <a href="tel:988" className="inline-block px-4 py-2 bg-white text-teal-900 rounded-lg text-sm font-bold hover:bg-teal-50 transition-colors">
                                    Call 988 Now
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Form Area */}
                    <div className="lg:col-span-7 p-10 md:p-12">
                        {submitted ? (
                            <div className="h-full flex flex-col items-center justify-center text-center py-12">
                                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                                    <Check size={32} strokeWidth={3} />
                                </div>
                                <h3 className="font-display font-bold text-2xl text-gray-900 mb-2">Message Sent!</h3>
                                <p className="text-gray-500 max-w-sm mx-auto mb-8">
                                    Thank you for reaching out. Our team will get back to you within 24 hours.
                                </p>
                                <Button variant="outline" onClick={() => setSubmitted(false)}>
                                    Send Another Message
                                </Button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 ml-1">First Name</label>
                                        <input
                                            required
                                            type="text"
                                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all font-medium"
                                            placeholder="Jane"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 ml-1">Last Name</label>
                                        <input
                                            required
                                            type="text"
                                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all font-medium"
                                            placeholder="Doe"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                                    <input
                                        required
                                        type="email"
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all font-medium"
                                        placeholder="jane@example.com"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 ml-1">Subject</label>
                                    <select className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all font-medium">
                                        <option>General Inquiry</option>
                                        <option>Technical Support</option>
                                        <option>Partnership Opportunity</option>
                                        <option>Press/Media</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 ml-1">Message</label>
                                    <textarea
                                        required
                                        rows={5}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all font-medium resize-none"
                                        placeholder="How can we help you?"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-teal-600 hover:bg-teal-700 h-14"
                                    isLoading={isLoading}
                                    rightIcon={<Send size={18} />}
                                >
                                    Send Message
                                </Button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;