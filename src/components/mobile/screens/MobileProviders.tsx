import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    ShieldCheck,
    Search as SearchIcon,
    MessageCircle,
    UserCheck,
    FlaskConical,
    Sparkles,
    ArrowRight,
    BadgeCheck,
} from 'lucide-react';
import SEO from '@/components/SEO';
import { ProviderSearchBar } from '@/components/providers/search/ProviderSearchBar';
import { useProviderLookups } from '@/context/ProviderLookupsContext';
import { parseLocation } from '@/lib/providers/locationUtils';

/**
 * Mobile Find Care (route `/providers`). A phone-composed directory entry that
 * leads with search, then the provider-type tiles as a 2-col grid (the desktop
 * landing scrolls them horizontally, which clips on a phone). Foundation wraps
 * this in the crisis header + bottom nav (Find Care tab active on `/providers`),
 * so we own only the `px-4 py-6` scroll body. Mirrors the desktop landing's data
 * (`useProviderLookups`, `ProviderSearchBar`, `parseLocation`) without porting
 * its hero or the tall dark "For Providers" band.
 */

const TRUST: { icon: typeof UserCheck; label: string }[] = [
    { icon: UserCheck, label: '400,000+ providers' },
    { icon: ShieldCheck, label: 'Verified credentials' },
    { icon: FlaskConical, label: 'No ratings or reviews' },
    { icon: Sparkles, label: 'Free to search' },
];

const HOW_IT_WORKS = [
    { step: 1, icon: SearchIcon, title: 'Search', description: 'Enter your location and the kind of support you need.' },
    { step: 2, icon: ShieldCheck, title: 'Review profiles', description: 'Compare credentials, specialties, and contact info.' },
    { step: 3, icon: MessageCircle, title: 'Connect', description: 'Reach out directly by phone, email, or their booking link.' },
];

const MobileProviders: React.FC = () => {
    const navigate = useNavigate();
    const { providerTypes } = useProviderLookups();

    const handleSearch = (query: string, location: string) => {
        const params = new URLSearchParams();
        if (query) params.set('q', query);
        if (location && location !== 'Near me') {
            const { city, state } = parseLocation(location);
            if (state) params.set('state', state);
            if (city) params.set('city', city);
        }
        navigate(`/providers/search?${params.toString()}`);
    };

    return (
        <div className="px-4 py-6">
            <SEO
                title="Find a Mental Health Provider | Psychage"
                description="Search verified therapists, psychologists, and counselors across all 50 states. Free to search, no account required."
            />

            <h1 className="font-display text-2xl font-semibold text-text-primary">Find Care</h1>
            <p className="mt-1 text-sm text-text-secondary">
                Search 400,000+ verified therapists, psychologists, and counselors. Free, no account needed.
            </p>

            {/* Search */}
            <div className="mt-5">
                <ProviderSearchBar onSearch={handleSearch} />
            </div>

            {/* Trust chips */}
            <ul className="mt-5 flex flex-wrap gap-2">
                {TRUST.map(({ icon: Icon, label }) => (
                    <li
                        key={label}
                        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-xs text-text-secondary"
                    >
                        <Icon size={14} className="text-teal-600 dark:text-teal-400" aria-hidden />
                        {label}
                    </li>
                ))}
            </ul>

            {/* Provider types — 2-col grid (no horizontal scroll) */}
            {providerTypes.length > 0 && (
                <section className="mt-8">
                    <h2 className="font-display text-lg font-semibold text-text-primary">
                        Find the right type of support
                    </h2>
                    <p className="mt-1 text-sm text-text-secondary">Different professionals for different needs.</p>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                        {providerTypes.map((type) => (
                            <Link
                                key={type.id}
                                to={`/providers/search?type=${type.id}`}
                                className="flex min-h-touch flex-col rounded-2xl border border-border bg-surface p-4 transition-colors hover:border-teal-200 active:bg-surface-hover dark:hover:border-teal-800"
                            >
                                <span className="font-display text-sm font-semibold text-text-primary">
                                    {type.label}
                                </span>
                                <span className="mt-1 line-clamp-2 text-xs text-text-secondary">
                                    {type.description}
                                </span>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* How it works — stacked */}
            <section className="mt-8">
                <h2 className="font-display text-lg font-semibold text-text-primary">How it works</h2>
                <ol className="mt-4 space-y-3">
                    {HOW_IT_WORKS.map(({ step, icon: Icon, title, description }) => (
                        <li
                            key={step}
                            className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-4"
                        >
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400">
                                <Icon size={18} aria-hidden />
                            </span>
                            <div>
                                <span className="block font-display text-sm font-semibold text-text-primary">
                                    {title}
                                </span>
                                <span className="mt-0.5 block text-xs text-text-secondary">{description}</span>
                            </div>
                        </li>
                    ))}
                </ol>
            </section>

            {/* For-providers CTA — slim, no dark band */}
            <Link
                to="/for-providers"
                className="mt-8 flex min-h-touch items-center justify-between gap-3 rounded-2xl border border-border bg-surface p-4 transition-colors active:bg-surface-hover"
            >
                <span className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-hover text-text-tertiary">
                        <BadgeCheck size={18} aria-hidden />
                    </span>
                    <span>
                        <span className="block font-display text-sm font-semibold text-text-primary">
                            Are you a provider?
                        </span>
                        <span className="mt-0.5 block text-xs text-text-secondary">
                            List or claim your practice — free.
                        </span>
                    </span>
                </span>
                <ArrowRight size={18} className="shrink-0 text-text-tertiary" aria-hidden />
            </Link>

            {/* How we verify */}
            <div className="mt-4 text-center">
                <Link
                    to="/how-we-verify"
                    className="text-sm text-text-secondary hover:text-teal-700 dark:hover:text-teal-400"
                >
                    Learn how we verify providers &rarr;
                </Link>
            </div>
        </div>
    );
};

export default MobileProviders;
