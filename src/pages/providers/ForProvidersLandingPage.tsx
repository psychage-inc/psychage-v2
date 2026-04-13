import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ChevronDown,
  Shield,
  MapPin,
  Users,
  BarChart3,
  Search,
  Camera,
  Video,
  MessageSquare,
  Crown,
  Check,
  Sparkles,
  Globe,
  TrendingUp,
  Eye,
  Calendar,
  Award,
  FileText,
  Star,
} from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { ease, staggerContainer, staggerItem } from '@/lib/animations';
import {
  FIGURES,
  FIGURE_ALT,
  SCENES,
  SCENE_ALT,
  OBJECTS,
} from '@/components/home/v2/homeImages';
import { cn } from '@/lib/utils';
import SEO from '@/components/SEO';

// =============================================================================
// Data Constants
// =============================================================================

const STATS = [
  { icon: Shield, value: '423,404+', label: 'NPI-Verified Providers' },
  { icon: MapPin, value: '50 States + DC', label: 'Complete Coverage' },
  { icon: Sparkles, value: '6 Interactive', label: 'Patient Tools' },
];

const PLATFORM_FEATURES = [
  {
    icon: Shield,
    title: 'Verified Profile',
    description:
      'NPI verification, license checks, and a verified badge that builds instant trust with patients.',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description:
      'Track profile views, search impressions, click-throughs, and favorites with real-time trend data.',
  },
  {
    icon: Search,
    title: 'Search Visibility',
    description:
      'Appear in searches filtered by specialty, insurance, language, and location. Higher tiers get priority placement.',
  },
  {
    icon: MessageSquare,
    title: 'Patient Reviews',
    description:
      'Receive and respond to patient feedback. Build social proof that converts profile visitors into clients.',
  },
  {
    icon: Globe,
    title: 'Cultural Competencies',
    description:
      'Showcase language skills, cultural competencies, and specialized training to reach underserved communities.',
  },
  {
    icon: Camera,
    title: 'Rich Media Profile',
    description:
      'Photos, video introductions, extended bios, and availability calendars to show the full picture of your practice.',
  },
];

const HOW_IT_WORKS = [
  {
    step: 1,
    title: 'Apply or Claim',
    description:
      'Create a new listing or claim your existing NPI-verified profile. It takes under 5 minutes.',
  },
  {
    step: 2,
    title: 'Get Verified',
    description:
      'Our team verifies your NPI number and state licenses against official databases. Most approvals within 24 hours.',
  },
  {
    step: 3,
    title: 'Go Live',
    description:
      'Your verified profile is live and searchable. Upgrade anytime to unlock analytics, reviews, and priority placement.',
  },
];

const DEEP_DIVES = [
  {
    sectionLabel: 'Analytics',
    heading: 'Understand how patients find you',
    body: 'Track profile views, search impressions, click-through rates, and favorites. See trends over time and understand which specialties drive the most traffic to your profile.',
    bullets: [
      { icon: Eye, text: 'Real-time profile view tracking' },
      { icon: TrendingUp, text: 'Weekly and monthly trend analysis' },
      { icon: BarChart3, text: 'Competitor benchmarking (Elite)' },
    ],
    ctaText: 'See plans with analytics',
    ctaHref: '#pricing',
    image: SCENES.score,
    imageAlt: SCENE_ALT.score,
    reverse: false,
  },
  {
    sectionLabel: 'Your Profile',
    heading: 'Show patients who you really are',
    body: 'Go beyond name and credentials. Our 8-section profile editor lets you showcase your approach, cultural competencies, languages, insurance accepted, and more.',
    bullets: [
      { icon: FileText, text: 'Extended bios up to 3,000 characters' },
      { icon: Camera, text: 'Up to 5 photos + video introduction' },
      { icon: Award, text: 'Cultural competency badges & certifications' },
    ],
    ctaText: 'Start building your profile',
    ctaHref: '/for-providers/apply',
    image: SCENES.companion,
    imageAlt: SCENE_ALT.companion,
    reverse: true,
  },
  {
    sectionLabel: 'Visibility',
    heading: 'Be found by the right patients',
    body: 'Patients search by specialty, insurance, language, location, and cultural competency. Higher tiers get priority placement so you appear first in relevant searches.',
    bullets: [
      { icon: Search, text: 'Multi-filter search by 8+ criteria' },
      { icon: MapPin, text: 'Location-based results across all 50 states' },
      { icon: Crown, text: 'Priority and top placement for Pro & Elite' },
    ],
    ctaText: 'Compare visibility tiers',
    ctaHref: '#pricing',
    image: FIGURES.rising,
    imageAlt: FIGURE_ALT.rising,
    reverse: false,
    useMask: true,
  },
];

interface PricingTier {
  name: string;
  monthlyPrice: number;
  annualMonthly: number;
  annualTotal: number;
  subtitle: string;
  features: string[];
  badge?: string;
  recommended?: boolean;
  badgeIcon?: typeof Crown;
  badgeColor?: string;
}

const PRICING_TIERS: PricingTier[] = [
  {
    name: 'Free',
    monthlyPrice: 0,
    annualMonthly: 0,
    annualTotal: 0,
    subtitle: 'Get started at no cost',
    features: [
      'Basic directory listing',
      'Name & credentials displayed',
      'Specialty tags',
      'Contact information',
      'NPI verification badge',
      '1 profile photo',
      '500 character bio',
    ],
  },
  {
    name: 'Pro',
    monthlyPrice: 50,
    annualMonthly: 40,
    annualTotal: 480,
    subtitle: 'Grow your practice',
    badge: 'Most Popular',
    badgeIcon: Star,
    recommended: true,
    features: [
      'Everything in Free',
      'Priority search placement',
      'Extended bio (1,500 chars)',
      'Up to 3 profile photos',
      'Analytics dashboard',
      'Patient reviews',
      'Cultural competency badges',
    ],
  },
  {
    name: 'Elite',
    monthlyPrice: 120,
    annualMonthly: 96,
    annualTotal: 1150,
    subtitle: 'Maximum visibility',
    badge: 'Premium',
    badgeIcon: Crown,
    badgeColor: 'amber',
    features: [
      'Everything in Pro',
      'Top search placement',
      'Rich text bio (3,000 chars)',
      '5 photos + video intro',
      'Availability calendar',
      'Competitor benchmarking',
      'Psychage Certified badge',
    ],
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Psychage's analytics dashboard transformed how I understand my patient pipeline. I can see exactly which specialties drive traffic to my profile.",
    name: 'Dr. Sarah Chen',
    title: 'Clinical Psychologist',
    photo: '/images/providers/provider-sarah-chen.jpg',
  },
  {
    quote:
      'The cultural competency badges helped me reach the Latino community in my area. My caseload grew 40% in the first three months.',
    name: 'Marcus Rivera',
    title: 'LCSW',
    photo: '/images/providers/provider-marcus-rivera.jpg',
  },
  {
    quote:
      'Being NPI-verified on a trusted platform gives my patients confidence before they even walk through the door.',
    name: 'Dr. Amara Okeke',
    title: 'Psychiatrist',
    photo: '/images/providers/provider-amara-okeke.jpg',
  },
];

const FAQ_ITEMS = [
  {
    question: 'How much does it cost?',
    answer:
      'Creating a basic listing on Psychage is completely free. The Free tier includes your name, credentials, specialty tags, contact information, and NPI verification. Pro ($50/month) adds priority search placement, analytics, reviews, and cultural competency badges. Elite ($120/month) adds top search placement, video introductions, availability calendar, and competitor benchmarking.',
  },
  {
    question: 'How do I get verified?',
    answer:
      'Verification starts when you submit your application or claim an existing profile using your NPI number. Our team verifies your credentials against the NPI Registry and state licensing databases. Once approved, your profile displays a verified badge that builds trust with potential clients.',
  },
  {
    question: 'Can I edit my profile after creating it?',
    answer:
      'Yes. Once your profile is approved, you can update your bio, specialties, contact information, photos, languages, cultural competencies, insurance plans, and session availability at any time from your 8-section profile editor. Changes to credentials or NPI information may require re-verification.',
  },
  {
    question: "What's the difference between Free, Pro, and Elite?",
    answer:
      'Free gives you a basic directory listing. Pro adds priority search placement, an analytics dashboard to track views and clicks, patient reviews, extended bio (1,500 chars), 3 photos, and cultural competency badges. Elite adds top search placement, rich text bio (3,000 chars), 5 photos plus video intro, availability calendar, competitor benchmarking, and Psychage Certified badge eligibility.',
  },
  {
    question: 'How long does verification take?',
    answer:
      'Most NPI and license verifications complete within 24 hours. In rare cases involving unusual licensing situations, it may take up to 72 hours. You will receive an email notification once your profile is verified and live.',
  },
  {
    question: 'What analytics can I track?',
    answer:
      'Pro and Elite providers can track profile views, search impressions, click-through rates, and favorites with trend indicators. Elite providers also get competitor benchmarking data showing how their profile performance compares to similar providers in their area.',
  },
  {
    question: 'Can patients leave reviews?',
    answer:
      'Yes. Pro and Elite providers can receive patient reviews and respond to them directly from their dashboard. Reviews appear on your public profile and help build social proof that converts visitors into clients.',
  },
  {
    question: 'Is there an annual billing discount?',
    answer:
      'Yes. Annual billing saves approximately 20% compared to monthly billing. Pro annual is $480/year ($40/month equivalent) and Elite annual is $1,150/year (~$96/month equivalent). You can switch between billing cycles at any time.',
  },
  {
    question: 'What is the Psychage Certified badge?',
    answer:
      'The Psychage Certified badge is available to Elite-tier providers who maintain a complete profile, respond to reviews, and keep their credentials up to date. It is our highest trust signal and appears prominently on your listing in search results.',
  },
  {
    question: 'Can I cancel or downgrade anytime?',
    answer:
      'Yes. You can change your plan at any time from your provider dashboard. Downgrades take effect at the end of your current billing period. There are no cancellation fees or long-term commitments.',
  },
];

// =============================================================================
// Component
// =============================================================================

const ForProvidersLandingPage: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');

  // Animation helpers (matching homepage patterns)
  const textAnim = (delay = 0) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: ease.decelerate },
        };

  const sectionAnim = (delay = 0) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.3 },
          transition: { duration: 0.6, delay, ease: ease.decelerate },
        };

  const slideAnim = (x: number, delay = 0) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, x },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true, amount: 0.25 },
          transition: { duration: 0.7, delay, ease: ease.decelerate },
        };

  const softEdgeMask =
    'radial-gradient(ellipse 85% 80% at 50% 48%, black 45%, transparent 100%)';

  return (
    <>
      <SEO
        title="For Providers — Join the Psychage Provider Network"
        description="List your practice in Psychage's NPI-verified provider directory. Reach patients searching by specialty, insurance, and language. Free to start, with Pro and Elite tiers for analytics, reviews, and priority placement."
      />

      <div className="relative bg-[var(--color-homepage-bg)] min-h-screen">
        {/* ================================================================
            1. HERO SECTION
            ================================================================ */}
        <section
          aria-label="Provider landing hero"
          className="relative w-full min-h-[auto] lg:min-h-[80vh] flex items-center overflow-hidden pt-24 pb-14 lg:pt-32 lg:pb-20"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-8 w-full">
            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-6">
              {/* Text Column */}
              <div className="w-full lg:w-[48%] text-center lg:text-left">
                <motion.p
                  {...textAnim(0)}
                  className="uppercase tracking-[0.18em] text-[11px] sm:text-xs text-[var(--color-primary)]/55 font-sans font-medium mb-5"
                >
                  For mental health providers
                </motion.p>

                <motion.h1
                  {...textAnim(0.06)}
                  className={cn(
                    'font-display font-bold leading-[1.12] tracking-tight',
                    'text-[2rem] sm:text-[2.5rem] lg:text-[2.9rem] xl:text-[3.4rem]',
                    'text-[var(--color-text-primary)]'
                  )}
                >
                  Your expertise deserves
                  <br />
                  <span className="text-[var(--color-text-tertiary)]">
                    the right audience.
                  </span>
                </motion.h1>

                <motion.p
                  {...textAnim(0.12)}
                  className={cn(
                    'font-sans text-[15px] lg:text-[17px] leading-[1.7]',
                    'text-[var(--color-text-secondary)]',
                    'mt-6 max-w-[480px] mx-auto lg:mx-0'
                  )}
                >
                  Join 423,000+ verified providers on the platform where people
                  actively search for mental health support. List your practice,
                  build trust, and grow.
                </motion.p>

                <motion.div
                  {...textAnim(0.18)}
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-9 justify-center lg:justify-start"
                >
                  <Link
                    to="/for-providers/apply"
                    className={cn(
                      'inline-flex items-center justify-center gap-2',
                      'bg-[var(--color-primary)] text-white',
                      'font-semibold text-[15px] lg:text-base',
                      'py-3.5 px-7 lg:py-4 lg:px-9 rounded-2xl',
                      'hover:bg-[var(--color-primary-hover)] hover:-translate-y-0.5',
                      'hover:shadow-[0_8px_24px_-6px_rgba(26,155,140,0.3)]',
                      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]',
                      'transition-all duration-300 ease-out'
                    )}
                  >
                    Create Your Listing
                    <ArrowRight size={16} />
                  </Link>
                  <Link
                    to="/for-providers/claim"
                    className={cn(
                      'inline-flex items-center justify-center gap-2',
                      'border-[1.5px] border-[var(--color-primary)]',
                      'text-[var(--color-primary)]',
                      'font-semibold text-[15px] lg:text-base',
                      'py-3.5 px-7 lg:py-4 lg:px-9 rounded-2xl',
                      'hover:bg-[var(--color-primary)] hover:text-white hover:-translate-y-0.5',
                      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]',
                      'transition-all duration-300 ease-out'
                    )}
                  >
                    Claim Existing Profile
                    <Shield size={16} />
                  </Link>
                </motion.div>

                <motion.div
                  {...textAnim(0.26)}
                  className="flex items-center gap-2 mt-4 justify-center lg:justify-start"
                >
                  <Shield
                    size={13}
                    className="text-[var(--color-text-tertiary)] flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-[13px] text-[var(--color-text-tertiary)] font-sans">
                    NPI-verified. HIPAA-aware. Trusted in all 50 states.
                  </span>
                </motion.div>
              </div>

              {/* Image Column */}
              <motion.div
                {...(prefersReducedMotion
                  ? {}
                  : {
                      initial: { opacity: 0, y: 24, scale: 0.97 },
                      animate: { opacity: 1, y: 0, scale: 1 },
                      transition: {
                        duration: 0.7,
                        delay: 0.15,
                        ease: ease.decelerate,
                      },
                    })}
                className="w-full lg:w-[52%] relative"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/10 dark:shadow-black/30">
                  <img
                    src={SCENES.map}
                    alt={SCENE_ALT.map}
                    className="w-full h-[280px] sm:h-[360px] lg:h-[440px] object-cover brightness-[1.02] dark:brightness-[0.9]"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                {/* Floating stat badge */}
                <motion.div
                  {...(prefersReducedMotion
                    ? {}
                    : {
                        initial: { opacity: 0, scale: 0.9 },
                        animate: { opacity: 1, scale: 1 },
                        transition: {
                          duration: 0.5,
                          delay: 0.5,
                          ease: ease.decelerate,
                        },
                      })}
                  className="absolute -bottom-4 -right-4 md:bottom-6 md:right-6 bg-white dark:bg-[var(--color-surface)] rounded-2xl px-5 py-3 shadow-lg border border-[var(--color-border)]/50"
                >
                  <p className="text-2xl font-bold text-[var(--color-text-primary)] font-display">
                    423K+
                  </p>
                  <p className="text-xs text-[var(--color-text-tertiary)]">
                    verified providers
                  </p>
                </motion.div>
                {/* Ambient object */}
                <img
                  src={OBJECTS.pairedPebbles}
                  alt=""
                  aria-hidden="true"
                  className="absolute -top-6 -left-6 h-[40px] lg:h-[55px] w-auto object-contain opacity-20 hidden sm:block rounded-full"
                  loading="lazy"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ================================================================
            2. STATS BAR
            ================================================================ */}
        <section className="bg-white dark:bg-[var(--color-surface)] border-y border-[var(--color-border)]">
          <div className="max-w-6xl mx-auto px-6 md:px-8 py-10 md:py-14">
            <motion.div
              variants={prefersReducedMotion ? undefined : staggerContainer}
              initial={prefersReducedMotion ? undefined : 'hidden'}
              whileInView={prefersReducedMotion ? undefined : 'visible'}
              viewport={{ once: true, amount: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-8"
            >
              {STATS.map((stat) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    variants={prefersReducedMotion ? undefined : staggerItem}
                    className="text-center"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                      style={{
                        backgroundColor:
                          'color-mix(in srgb, var(--color-primary) 10%, transparent)',
                      }}
                    >
                      <Icon
                        size={20}
                        style={{ color: 'var(--color-primary)' }}
                      />
                    </div>
                    <p className="font-display font-bold text-2xl md:text-3xl text-[var(--color-text-primary)]">
                      {stat.value}
                    </p>
                    <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                      {stat.label}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ================================================================
            3. PLATFORM OVERVIEW — "What You Get"
            ================================================================ */}
        <section className="py-20 md:py-28 lg:py-32">
          <div className="max-w-6xl mx-auto px-6 md:px-8">
            <motion.div {...sectionAnim()} className="text-center mb-12 md:mb-16">
              <p className="uppercase tracking-[0.18em] text-[11px] text-[var(--color-primary)]/55 font-sans font-medium mb-4">
                Platform Features
              </p>
              <h2
                className={cn(
                  'font-display font-bold leading-[1.15] tracking-tight',
                  'text-[1.65rem] sm:text-[1.85rem] lg:text-[2.1rem]',
                  'text-[var(--color-text-primary)]'
                )}
              >
                Everything you need to grow your practice
              </h2>
              <p className="text-sm sm:text-base text-[var(--color-text-secondary)] mt-3 max-w-xl mx-auto leading-relaxed">
                From your first listing to a full analytics suite, our provider
                platform scales with your needs.
              </p>
            </motion.div>

            <motion.div
              variants={prefersReducedMotion ? undefined : staggerContainer}
              initial={prefersReducedMotion ? undefined : 'hidden'}
              whileInView={prefersReducedMotion ? undefined : 'visible'}
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {PLATFORM_FEATURES.map((feature) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    variants={prefersReducedMotion ? undefined : staggerItem}
                    className={cn(
                      'rounded-2xl p-6',
                      'bg-white/50 dark:bg-[var(--color-surface)]/50',
                      'border border-[var(--color-border)]/50',
                      'hover:border-[var(--color-primary)]/40',
                      'hover:bg-white/80 dark:hover:bg-[var(--color-surface)]/80',
                      'shadow-[0_1px_4px_rgba(0,0,0,0.04)]',
                      'hover:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.08)]',
                      'dark:shadow-[0_1px_4px_rgba(0,0,0,0.15)]',
                      'dark:hover:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.3)]',
                      'transition-all duration-300 ease-out'
                    )}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-3.5"
                      style={{
                        backgroundColor:
                          'color-mix(in srgb, var(--color-primary) 12%, transparent)',
                      }}
                    >
                      <Icon
                        className="w-5 h-5"
                        style={{ color: 'var(--color-primary)' }}
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="font-semibold text-sm text-[var(--color-text-primary)]">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-[var(--color-text-secondary)] mt-1.5 leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ================================================================
            4. HOW IT WORKS
            ================================================================ */}
        <section className="py-20 md:py-28 bg-white dark:bg-[var(--color-surface)]">
          <div className="max-w-4xl mx-auto px-6 md:px-8">
            <motion.div {...sectionAnim()} className="text-center mb-14">
              <p className="uppercase tracking-[0.18em] text-[11px] text-[var(--color-primary)]/55 font-sans font-medium mb-4">
                How It Works
              </p>
              <h2
                className={cn(
                  'font-display font-bold leading-[1.15] tracking-tight',
                  'text-[1.65rem] sm:text-[1.85rem] lg:text-[2.1rem]',
                  'text-[var(--color-text-primary)]'
                )}
              >
                Live in three simple steps
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
              {HOW_IT_WORKS.map((item, index) => (
                <motion.div
                  key={item.step}
                  {...sectionAnim(index * 0.1)}
                  className="relative text-center"
                >
                  {/* Connecting line (desktop) */}
                  {index < 2 && (
                    <div className="hidden md:block absolute top-10 left-[calc(50%+36px)] w-[calc(100%-72px)] border-t-2 border-dashed border-[var(--color-border)]" />
                  )}
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                    style={{
                      backgroundColor: 'var(--color-primary)',
                      boxShadow: '0 8px 24px color-mix(in srgb, var(--color-primary) 30%, transparent)',
                    }}
                  >
                    <span className="font-display font-bold text-2xl text-white">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-xl text-[var(--color-text-primary)] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed max-w-xs mx-auto">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================
            5. FEATURE DEEP-DIVES (3 alternating sections)
            ================================================================ */}
        {DEEP_DIVES.map((dive, idx) => (
          <section
            key={dive.sectionLabel}
            className={cn(
              'py-20 md:py-28 lg:py-32',
              idx % 2 === 0
                ? 'bg-[var(--color-homepage-bg)]'
                : 'bg-white dark:bg-[var(--color-surface)]'
            )}
          >
            <div className="max-w-6xl mx-auto px-6 md:px-8">
              <div
                className={cn(
                  'grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center',
                  dive.reverse && 'direction-rtl'
                )}
                style={
                  dive.reverse
                    ? { direction: 'ltr' }
                    : undefined
                }
              >
                {/* Image */}
                <motion.div
                  {...slideAnim(dive.reverse ? 30 : -30)}
                  className={cn(
                    'relative',
                    dive.reverse && 'lg:order-2'
                  )}
                >
                  <div
                    className={cn(
                      'relative rounded-3xl overflow-hidden',
                      !dive.useMask &&
                        'shadow-2xl shadow-black/10 dark:shadow-black/30'
                    )}
                  >
                    <img
                      src={dive.image}
                      alt={dive.imageAlt}
                      className={cn(
                        'w-full object-cover dark:brightness-[0.9]',
                        dive.useMask
                          ? 'h-auto max-h-[400px] object-contain'
                          : 'h-[320px] md:h-[400px] brightness-[1.02]'
                      )}
                      style={
                        dive.useMask
                          ? {
                              maskImage: softEdgeMask,
                              WebkitMaskImage: softEdgeMask,
                            }
                          : undefined
                      }
                      loading="lazy"
                    />
                    {!dive.useMask && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
                    )}
                  </div>
                </motion.div>

                {/* Content */}
                <motion.div
                  {...slideAnim(dive.reverse ? -30 : 30, 0.1)}
                  className={cn(dive.reverse && 'lg:order-1')}
                >
                  <p className="uppercase tracking-[0.18em] text-[11px] text-[var(--color-primary)]/55 font-sans font-medium mb-4">
                    {dive.sectionLabel}
                  </p>
                  <h2
                    className={cn(
                      'font-display font-bold leading-[1.15] tracking-tight',
                      'text-2xl md:text-3xl lg:text-[2.2rem]',
                      'text-[var(--color-text-primary)]'
                    )}
                  >
                    {dive.heading}
                  </h2>
                  <p className="text-[var(--color-text-secondary)] text-[15px] leading-relaxed mt-4 max-w-lg">
                    {dive.body}
                  </p>

                  <div className="mt-6 space-y-3">
                    {dive.bullets.map((bullet) => {
                      const BulletIcon = bullet.icon;
                      return (
                        <div
                          key={bullet.text}
                          className="flex items-center gap-3"
                        >
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                            style={{
                              backgroundColor:
                                'color-mix(in srgb, var(--color-primary) 10%, transparent)',
                            }}
                          >
                            <BulletIcon
                              size={16}
                              style={{ color: 'var(--color-primary)' }}
                            />
                          </div>
                          <span className="text-sm text-[var(--color-text-secondary)]">
                            {bullet.text}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-8">
                    <Link
                      to={dive.ctaHref}
                      className={cn(
                        'inline-flex items-center gap-2',
                        'text-sm font-semibold',
                        'hover:gap-3 transition-all duration-300'
                      )}
                      style={{ color: 'var(--color-primary)' }}
                    >
                      {dive.ctaText}
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        ))}

        {/* ================================================================
            6. PRICING SECTION
            ================================================================ */}
        <section
          id="pricing"
          className="py-20 md:py-28 lg:py-32 bg-white dark:bg-[var(--color-surface)]"
        >
          <div className="max-w-6xl mx-auto px-6 md:px-8">
            <motion.div {...sectionAnim()} className="text-center mb-12">
              <p className="uppercase tracking-[0.18em] text-[11px] text-[var(--color-primary)]/55 font-sans font-medium mb-4">
                Pricing
              </p>
              <h2
                className={cn(
                  'font-display font-bold leading-[1.15] tracking-tight',
                  'text-[1.65rem] sm:text-[1.85rem] lg:text-[2.1rem]',
                  'text-[var(--color-text-primary)]'
                )}
              >
                Simple, transparent pricing
              </h2>
              <p className="text-sm sm:text-base text-[var(--color-text-secondary)] mt-3 max-w-xl mx-auto leading-relaxed">
                Start free. Upgrade when you're ready for more visibility and
                insights.
              </p>

              {/* Billing Toggle */}
              <div className="flex items-center justify-center gap-3 mt-8">
                <button
                  type="button"
                  onClick={() => setBilling('monthly')}
                  className={cn(
                    'px-5 py-2 rounded-full text-sm font-medium transition-all duration-200',
                    billing === 'monthly'
                      ? 'bg-white dark:bg-[var(--color-surface-active)] text-[var(--color-text-primary)] shadow-sm'
                      : 'text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)]'
                  )}
                >
                  Monthly
                </button>
                <div className="bg-[var(--color-surface-hover)] dark:bg-[var(--color-surface-active)] rounded-full p-1 flex">
                  <button
                    type="button"
                    onClick={() => setBilling('annual')}
                    className={cn(
                      'px-5 py-2 rounded-full text-sm font-medium transition-all duration-200',
                      billing === 'annual'
                        ? 'bg-white dark:bg-[var(--color-surface)] text-[var(--color-text-primary)] shadow-sm'
                        : 'text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)]'
                    )}
                  >
                    Annual
                  </button>
                </div>
                {billing === 'annual' && (
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{
                      backgroundColor:
                        'color-mix(in srgb, var(--color-primary) 12%, transparent)',
                      color: 'var(--color-primary)',
                    }}
                  >
                    Save 20%
                  </span>
                )}
              </div>
            </motion.div>

            <motion.div
              variants={prefersReducedMotion ? undefined : staggerContainer}
              initial={prefersReducedMotion ? undefined : 'hidden'}
              whileInView={prefersReducedMotion ? undefined : 'visible'}
              viewport={{ once: true, amount: 0.15 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start"
            >
              {PRICING_TIERS.map((tier) => {
                const price =
                  billing === 'monthly'
                    ? tier.monthlyPrice
                    : tier.annualMonthly;
                const isAmber = tier.badgeColor === 'amber';

                return (
                  <motion.div
                    key={tier.name}
                    variants={prefersReducedMotion ? undefined : staggerItem}
                    className={cn(
                      'rounded-3xl p-8 border transition-all duration-300',
                      'bg-white/70 dark:bg-[var(--color-surface)]/70',
                      tier.recommended
                        ? 'border-[var(--color-primary)] ring-1 ring-[var(--color-primary)]/20 shadow-[0_4px_24px_-6px_rgba(26,155,140,0.15)] md:scale-[1.03]'
                        : 'border-[var(--color-border)] shadow-[0_1px_4px_rgba(0,0,0,0.04)]'
                    )}
                  >
                    {/* Badge */}
                    {tier.badge && (
                      <div
                        className={cn(
                          'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4',
                          isAmber
                            ? 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400'
                            : 'bg-[color-mix(in_srgb,var(--color-primary)_12%,transparent)] text-[var(--color-primary)]'
                        )}
                      >
                        {tier.badgeIcon &&
                          React.createElement(tier.badgeIcon, { size: 12 })}
                        {tier.badge}
                      </div>
                    )}

                    <h3 className="font-display font-bold text-xl text-[var(--color-text-primary)]">
                      {tier.name}
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                      {tier.subtitle}
                    </p>

                    {/* Price */}
                    <div className="mt-5 mb-6">
                      <div className="flex items-baseline gap-1">
                        <span className="font-display font-bold text-4xl text-[var(--color-text-primary)]">
                          {price === 0 ? 'Free' : `$${price}`}
                        </span>
                        {price > 0 && (
                          <span className="text-sm text-[var(--color-text-tertiary)]">
                            /mo
                          </span>
                        )}
                      </div>
                      {billing === 'annual' && tier.annualTotal > 0 && (
                        <p className="text-xs text-[var(--color-text-tertiary)] mt-1">
                          Billed ${tier.annualTotal.toLocaleString()}/year
                        </p>
                      )}
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-[var(--color-border)] mb-6" />

                    {/* Features */}
                    <ul className="space-y-3 mb-8">
                      {tier.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2.5 text-sm text-[var(--color-text-secondary)]"
                        >
                          <Check
                            size={16}
                            className="shrink-0 mt-0.5"
                            style={{ color: 'var(--color-primary)' }}
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Link
                      to="/for-providers/apply"
                      className={cn(
                        'block w-full text-center font-semibold text-sm py-3.5 rounded-2xl transition-all duration-300',
                        tier.recommended || tier.badgeColor === 'amber'
                          ? 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-6px_rgba(26,155,140,0.3)]'
                          : 'border-[1.5px] border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white hover:-translate-y-0.5'
                      )}
                    >
                      {tier.monthlyPrice === 0
                        ? 'Get Started Free'
                        : `Start ${tier.name}`}
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ================================================================
            7. TESTIMONIALS
            ================================================================ */}
        <section className="py-20 md:py-28 bg-[var(--color-homepage-bg)]">
          <div className="max-w-6xl mx-auto px-6 md:px-8">
            <motion.div {...sectionAnim()} className="text-center mb-12">
              <p className="uppercase tracking-[0.18em] text-[11px] text-[var(--color-primary)]/55 font-sans font-medium mb-4">
                Provider Stories
              </p>
              <h2
                className={cn(
                  'font-display font-bold leading-[1.15] tracking-tight',
                  'text-[1.65rem] sm:text-[1.85rem] lg:text-[2.1rem]',
                  'text-[var(--color-text-primary)]'
                )}
              >
                Trusted by providers across the country
              </h2>
            </motion.div>

            <motion.div
              variants={prefersReducedMotion ? undefined : staggerContainer}
              initial={prefersReducedMotion ? undefined : 'hidden'}
              whileInView={prefersReducedMotion ? undefined : 'visible'}
              viewport={{ once: true, amount: 0.15 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {TESTIMONIALS.map((testimonial) => (
                <motion.div
                  key={testimonial.name}
                  variants={prefersReducedMotion ? undefined : staggerItem}
                  className={cn(
                    'rounded-2xl p-6',
                    'bg-white/70 dark:bg-[var(--color-surface)]/70',
                    'border border-[var(--color-border)]/50',
                    'shadow-[0_1px_4px_rgba(0,0,0,0.04)]'
                  )}
                >
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className="fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>

                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed italic">
                    "{testimonial.quote}"
                  </p>

                  <div className="h-px bg-[var(--color-border)] my-4" />

                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.photo}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full object-cover"
                      loading="lazy"
                    />
                    <div>
                      <p className="font-semibold text-sm text-[var(--color-text-primary)]">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-[var(--color-text-tertiary)]">
                        {testimonial.title}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ================================================================
            8. FAQ SECTION
            ================================================================ */}
        <section className="py-20 md:py-28 bg-white dark:bg-[var(--color-surface)]">
          <div className="max-w-3xl mx-auto px-6 md:px-8">
            <motion.div {...sectionAnim()} className="text-center mb-12">
              <p className="uppercase tracking-[0.18em] text-[11px] text-[var(--color-primary)]/55 font-sans font-medium mb-4">
                FAQ
              </p>
              <h2
                className={cn(
                  'font-display font-bold leading-[1.15] tracking-tight',
                  'text-[1.65rem] sm:text-[1.85rem] lg:text-[2.1rem]',
                  'text-[var(--color-text-primary)]'
                )}
              >
                Questions? We've got answers.
              </h2>
            </motion.div>

            <div className="space-y-3">
              {FAQ_ITEMS.map((item, index) => (
                <motion.div
                  key={index}
                  {...sectionAnim(index * 0.04)}
                  className={cn(
                    'rounded-xl border overflow-hidden',
                    'border-[var(--color-border)]',
                    'bg-white/50 dark:bg-[var(--color-surface)]/50'
                  )}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenFaq((prev) => (prev === index ? null : index))
                    }
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group"
                    aria-expanded={openFaq === index}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span className="font-display font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors">
                      {item.question}
                    </span>
                    <ChevronDown
                      size={20}
                      className={cn(
                        'flex-shrink-0 text-[var(--color-text-tertiary)] transition-transform duration-300',
                        openFaq === index &&
                          'rotate-180 text-[var(--color-primary)]'
                      )}
                      style={
                        openFaq === index
                          ? { color: 'var(--color-primary)' }
                          : undefined
                      }
                    />
                  </button>

                  <div
                    id={`faq-answer-${index}`}
                    role="region"
                    className={cn(
                      'overflow-hidden transition-all duration-300 ease-in-out',
                      openFaq === index
                        ? 'max-h-96 opacity-100'
                        : 'max-h-0 opacity-0'
                    )}
                  >
                    <div className="px-6 pb-5 text-sm text-[var(--color-text-secondary)] leading-relaxed">
                      {item.answer}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================
            9. BOTTOM CTA / CLOSING
            ================================================================ */}
        <section
          aria-label="Get started"
          className="relative w-full bg-[var(--color-homepage-closing)] py-20 md:py-28 overflow-hidden"
        >
          <div className="max-w-6xl mx-auto px-6 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Clay figure */}
              <motion.div
                {...sectionAnim(0)}
                className="flex justify-center lg:justify-end"
              >
                <img
                  src={FIGURES.holder}
                  alt={FIGURE_ALT.holder}
                  className="h-48 md:h-64 lg:h-72 w-auto object-contain rounded-3xl border border-[var(--color-border)]/60 shadow-[0_8px_28px_-10px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_28px_-10px_rgba(0,0,0,0.35)]"
                  loading="lazy"
                />
              </motion.div>

              {/* Content */}
              <div className="text-center lg:text-left">
                <motion.h2
                  {...sectionAnim(0.1)}
                  className={cn(
                    'font-display font-bold leading-[1.15] tracking-tight',
                    'text-2xl md:text-3xl lg:text-[2.2rem]',
                    'text-[var(--color-text-primary)] mb-3'
                  )}
                >
                  Ready to reach the patients who need you?
                </motion.h2>
                <motion.p
                  {...sectionAnim(0.15)}
                  className="text-[var(--color-text-secondary)] text-base md:text-lg max-w-lg mx-auto lg:mx-0 mb-6 leading-relaxed"
                >
                  Join the fastest-growing mental health provider directory.
                  Create your listing in under 5 minutes.
                </motion.p>

                {/* Quick links */}
                <motion.div
                  {...sectionAnim(0.2)}
                  className="flex flex-wrap gap-3 justify-center lg:justify-start mb-6"
                >
                  <Link
                    to="/for-providers/apply"
                    className="inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    Create listing <ArrowRight size={14} />
                  </Link>
                  <span className="text-[var(--color-border)]">|</span>
                  <Link
                    to="/for-providers/claim"
                    className="inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    Claim profile <ArrowRight size={14} />
                  </Link>
                  <span className="text-[var(--color-border)]">|</span>
                  <a
                    href="#pricing"
                    className="inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    Compare plans <ArrowRight size={14} />
                  </a>
                </motion.div>

                <motion.p
                  {...sectionAnim(0.25)}
                  className="text-xs text-[var(--color-text-tertiary)]"
                >
                  Free to start. No credit card required.
                </motion.p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ForProvidersLandingPage;
