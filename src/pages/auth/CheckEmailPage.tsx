import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MailCheck } from 'lucide-react';
import { Display, Text } from '@/components/ui/Typography';
import { LogoIcon } from '@/components/ui/LogoIcon';
import InteractiveCard from '@/components/ui/InteractiveCard';
import { RetryAction } from '@/components/auth/RetryAction';
import SEO from '@/components/SEO';
import { useToast } from '@/context/ToastContext';
import { supabase } from '@/lib/supabaseClient';
import { mapSupabaseAuthError } from '@/lib/auth/supabaseErrorMessages';
import { useTranslation } from 'react-i18next';

// Throttle the resend button after a successful send so users can't spam the
// confirmation mailer. RetryAction renders the live countdown.
const RESEND_THROTTLE_MS = 30_000;

/**
 * Post-signup "Check your email" screen. Signup redirects here (instead of
 * straight to /login) because email confirmation is required
 * (mailer_autoconfirm: false). The entered email is passed via router state.
 */
const CheckEmailPage: React.FC = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const toast = useToast();

    const email = (location.state as { email?: string } | null)?.email;
    const [throttledUntil, setThrottledUntil] = useState<number | null>(null);
    const [isResending, setIsResending] = useState(false);

    const handleResend = async () => {
        if (!email || isResending) return;
        setIsResending(true);
        try {
            const { error } = await supabase.auth.resend({ type: 'signup', email });
            if (error) {
                toast.error(t(mapSupabaseAuthError(error)));
            } else {
                toast.success(t('auth.checkEmail.resendSuccess'));
                setThrottledUntil(Date.now() + RESEND_THROTTLE_MS);
            }
        } catch {
            toast.error(t('auth.checkEmail.resendError'));
        } finally {
            setIsResending(false);
        }
    };

    return (
        <div className="min-h-[100dvh] flex items-center justify-center px-4 py-20 relative overflow-hidden bg-background">
            <SEO title="Check your email | Psychage" description="Confirm your email address to finish setting up your Psychage account." />
            {/* Dynamic Background */}
            <div className="absolute inset-0 bg-background/20 backdrop-blur-[1px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="w-full max-w-md relative z-10"
            >
                <div className="text-center mb-10">
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="flex justify-center mb-10"
                    >
                        <Link to="/" className="inline-block py-2">
                            <LogoIcon className="h-28 w-auto drop-shadow-lg" />
                        </Link>
                    </motion.div>
                    <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <Display className="text-4xl mb-3 font-bold bg-clip-text text-transparent bg-gradient-to-r from-text-primary to-text-secondary">
                            {t('auth.checkEmail.title')}
                        </Display>
                    </motion.div>
                </div>

                <InteractiveCard
                    spotlightColor="rgba(20, 184, 166, 0.1)"
                    className="p-8 md:p-10 border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl"
                >
                    <div className="text-center">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.4 }}
                            className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 text-primary flex items-center justify-center border border-primary/20"
                        >
                            <MailCheck className="w-8 h-8" />
                        </motion.div>

                        <Text className="text-text-secondary mb-8">
                            {email
                                ? <>
                                    {t('auth.checkEmail.bodyLead')}
                                    <span className="font-semibold text-text-primary block my-1">{email}</span>
                                    {t('auth.checkEmail.bodyTail')}
                                </>
                                : t('auth.checkEmail.bodyGeneric')}
                        </Text>

                        {email ? (
                            <div className="flex flex-col items-center gap-2">
                                <Text className="text-sm text-text-tertiary">{t('auth.checkEmail.resendPrompt')}</Text>
                                <RetryAction
                                    label={t('auth.retry.resend')}
                                    onRetry={handleResend}
                                    throttledUntil={throttledUntil}
                                    variant="primary"
                                />
                            </div>
                        ) : (
                            <Link to="/signup" className="text-sm font-medium text-primary hover:text-primary-hover hover:underline transition-colors">
                                {t('auth.checkEmail.backToSignup')}
                            </Link>
                        )}
                    </div>
                </InteractiveCard>
            </motion.div>
        </div>
    );
};

export default CheckEmailPage;
