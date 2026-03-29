import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';

interface SitemapSection {
    title: string;
    links: { label: string; path: string }[];
}

const sections: SitemapSection[] = [
    {
        title: 'Learn',
        links: [
            { label: 'All Articles', path: '/learn' },
            { label: 'Emotional Regulation', path: '/learn/emotional-regulation' },
            { label: 'Anxiety & Stress', path: '/learn/anxiety-stress' },
            { label: 'Depression & Mood', path: '/learn/depression-mood' },
            { label: 'Relationships', path: '/learn/relationships' },
            { label: 'Sleep & Recovery', path: '/learn/sleep-recovery' },
        ],
    },
    {
        title: 'Tools',
        links: [
            { label: 'All Tools', path: '/tools' },
            { label: 'Mood Journal', path: '/tools/mood-journal' },
            { label: 'Sleep Architect', path: '/tools/sleep-architect' },
            { label: 'Clarity Journal', path: '/tools/clarity-journal' },
            { label: 'Symptom Navigator', path: '/tools/symptom-navigator' },
            { label: 'Clarity Score', path: '/clarity-score' },
            { label: 'Medication Tracker', path: '/tools/medication-tracker' },
            { label: 'Relationship Health Check', path: '/tools/relationship-health' },
        ],
    },
    {
        title: 'Find Care',
        links: [
            { label: 'Provider Directory', path: '/providers' },
            { label: 'Search Providers', path: '/providers/search' },
            { label: 'For Providers', path: '/for-providers' },
            { label: 'Apply as Provider', path: '/for-providers/apply' },
        ],
    },
    {
        title: 'Support',
        links: [
            { label: 'Crisis Resources', path: '/crisis' },
            { label: 'Contact Us', path: '/contact' },
            { label: 'About Psychage', path: '/about' },
        ],
    },
    {
        title: 'Account',
        links: [
            { label: 'Dashboard', path: '/dashboard' },
            { label: 'Settings', path: '/dashboard/settings' },
            { label: 'Bookmarks', path: '/dashboard/bookmarks' },
            { label: 'Assessment History', path: '/dashboard/history' },
        ],
    },
    {
        title: 'Legal',
        links: [
            { label: 'Privacy Policy', path: '/legal/privacy' },
            { label: 'Terms of Service', path: '/legal/terms' },
        ],
    },
];

const SitemapPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-white pt-28 pb-20 px-6">
            <SEO
                title="Sitemap - Psychage"
                description="Navigate all pages and features available on Psychage."
            />

            <div className="container mx-auto max-w-4xl">
                <div className="text-center mb-16 border-b border-gray-100 pb-12">
                    <h1 className="font-display font-bold text-4xl text-gray-900 mb-4">Sitemap</h1>
                    <p className="text-gray-500 font-medium">All pages and features on Psychage</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                    {sections.map((section) => (
                        <div key={section.title}>
                            <h2 className="font-display font-bold text-lg text-gray-900 mb-4">{section.title}</h2>
                            <ul className="space-y-2.5">
                                {section.links.map((link) => (
                                    <li key={link.path}>
                                        <Link
                                            to={link.path}
                                            className="text-sm text-gray-600 hover:text-teal-600 transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SitemapPage;
