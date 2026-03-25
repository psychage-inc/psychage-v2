/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, Shield, ChevronDown, ChevronUp } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { consentService } from '@/services/consentService';
import { privacyService } from '@/services/privacyService';

const COOKIE_CONSENT_KEY = 'psychage_cookie_consent';
const CONSENT_VERSION = 'v1.0';

interface CookiePreferences {
    essential: boolean; // always true
    analytics: boolean;
    marketing: boolean;
}

const defaultPreferences: CookiePreferences = {
    essential: true,
    analytics: false,
    marketing: false,
};

const CookieConsent: React.FC = () => {
    const { isAuthenticated } = useAuth();
    const [visible, setVisible] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);

    useEffect(() => {
        // Check if consent was already given
        const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (parsed.version === CONSENT_VERSION) {
                    setPreferences(parsed.preferences);
                    return; // Already consented with current version
                }
            } catch {
                // Invalid stored data, show banner
            }
        }

        // Check Global Privacy Control
        const gpc = (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl;
        if (gpc) {
            // Auto-reject non-essential per GPC spec
            handleAccept({ essential: true, analytics: false, marketing: false }, true);
            return;
        }

        // Show banner after a short delay for better UX
        const timer = setTimeout(() => setVisible(true), 1000);
        return () => clearTimeout(timer);
    }, []);

    const handleAccept = useCallback(async (prefs: CookiePreferences, silent = false) => {
        // Persist to localStorage
        localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify({
            version: CONSENT_VERSION,
            preferences: prefs,
            timestamp: new Date().toISOString(),
        }));

        setPreferences(prefs);
        if (!silent) setVisible(false);

        // Log consent
        await consentService.logConsent('analytics_cookies', prefs.analytics, CONSENT_VERSION);

        // If authenticated, also save to profile
        if (isAuthenticated) {
            await privacyService.updateCookieConsent(prefs);
        }
    }, [isAuthenticated]);

    const handleAcceptAll = () => {
        handleAccept({ essential: true, analytics: true, marketing: true });
    };

    const handleEssentialOnly = () => {
        handleAccept({ essential: true, analytics: false, marketing: false });
    };

    const handleSaveCustom = () => {
        handleAccept(preferences);
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="fixed bottom-0 left-0 right-0 z-[60] p-4 sm:p-6"
                    role="dialog"
                    aria-label="Cookie consent"
                    aria-describedby="cookie-consent-description"
                >
                    <div className="max-w-3xl mx-auto bg-surface border border-border/50 rounded-2xl shadow-xl backdrop-blur-md p-5 sm:p-6">
                        <div className="flex items-start gap-3">
                            <div className="p-2 rounded-xl bg-primary/10 text-primary shrink-0">
                                <Cookie size={20} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-semibold text-text-primary mb-1">
                                    Your Privacy Matters
                                </h3>
                                <p id="cookie-consent-description" className="text-sm text-text-secondary leading-relaxed">
                                    We use essential cookies to make Psychage work. We'd also like to use analytics
                                    cookies to understand how you use our platform, helping us improve the experience.
                                    Your wellness data is never used for advertising.
                                </p>
                            </div>
                        </div>

                        {/* Expandable details */}
                        <AnimatePresence>
                            {expanded && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden"
                                >
                                    <div className="mt-4 space-y-3 border-t border-border/30 pt-4">
                                        <CookieCategory
                                            name="Essential"
                                            description="Required for core functionality. Cannot be disabled."
                                            checked={true}
                                            disabled
                                            icon={<Shield size={14} />}
                                        />
                                        <CookieCategory
                                            name="Analytics"
                                            description="Privacy-focused analytics (Plausible) to understand usage patterns. No PII collected."
                                            checked={preferences.analytics}
                                            onChange={(checked) => setPreferences(p => ({ ...p, analytics: checked }))}
                                        />
                                        <CookieCategory
                                            name="Marketing"
                                            description="Used only for measuring the effectiveness of educational outreach campaigns."
                                            checked={preferences.marketing}
                                            onChange={(checked) => setPreferences(p => ({ ...p, marketing: checked }))}
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Actions */}
                        <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                            <button
                                onClick={() => setExpanded(!expanded)}
                                className="flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-medium text-text-secondary hover:text-text-primary transition-colors rounded-xl hover:bg-white/5"
                                aria-expanded={expanded}
                            >
                                Customize
                                {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            </button>

                            <div className="flex-1" />

                            {expanded ? (
                                <button
                                    onClick={handleSaveCustom}
                                    className="px-5 py-2.5 text-sm font-semibold rounded-xl bg-primary text-white hover:bg-primary-hover transition-colors shadow-md shadow-primary/20"
                                >
                                    Save Preferences
                                </button>
                            ) : (
                                <>
                                    <button
                                        onClick={handleEssentialOnly}
                                        className="px-5 py-2.5 text-sm font-medium rounded-xl border border-border/50 text-text-secondary hover:text-text-primary hover:bg-white/5 transition-colors"
                                    >
                                        Essential Only
                                    </button>
                                    <button
                                        onClick={handleAcceptAll}
                                        className="px-5 py-2.5 text-sm font-semibold rounded-xl bg-primary text-white hover:bg-primary-hover transition-colors shadow-md shadow-primary/20"
                                    >
                                        Accept All
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

interface CookieCategoryProps {
    name: string;
    description: string;
    checked: boolean;
    disabled?: boolean;
    onChange?: (checked: boolean) => void;
    icon?: React.ReactNode;
}

const CookieCategory: React.FC<CookieCategoryProps> = ({
    name,
    description,
    checked,
    disabled,
    onChange,
    icon,
}) => (
    <label className={`flex items-start gap-3 p-3 rounded-xl transition-colors ${disabled ? 'opacity-75' : 'hover:bg-white/5 cursor-pointer'}`}>
        <input
            type="checkbox"
            checked={checked}
            disabled={disabled}
            onChange={(e) => onChange?.(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-white/20 bg-white/5 text-primary focus:ring-primary focus:ring-offset-0 transition-colors cursor-pointer disabled:opacity-50"
        />
        <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
                {icon}
                <span className="text-sm font-medium text-text-primary">{name}</span>
                {disabled && (
                    <span className="text-[10px] font-medium text-text-tertiary bg-white/5 px-1.5 py-0.5 rounded">
                        Required
                    </span>
                )}
            </div>
            <p className="text-xs text-text-tertiary mt-0.5">{description}</p>
        </div>
    </label>
);

export default CookieConsent;
