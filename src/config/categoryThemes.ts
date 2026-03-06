import { LucideIcon } from 'lucide-react';
import {
    CloudRain, Moon, Shield, Brain, Fingerprint, Anchor, Scale, Activity,
    BedDouble, Sun, Leaf, Smartphone, Heart, Briefcase, Home, CloudFog,
    Flame, UserRound, Flower2, Sparkles, MessageCircle, Pill,
} from 'lucide-react';

/**
 * Shade palette for a category — 4 stops from light to dark.
 * Used for subcategory differentiation and UI variants.
 */
export interface CategoryShades {
    50: string;
    100: string;
    500: string;
    600: string;
}

/**
 * Complete theme for one category, including all utility classes
 * needed across every rendering context.
 */
export interface CategoryTheme {
    label: string;
    colorFamily: string;
    icon: LucideIcon;
    shades: CategoryShades;
    classes: {
        bg: string;
        bgLight: string;
        bgLightDark: string;
        text: string;
        textDark: string;
        border: string;
        borderDark: string;
        spotlight: string;
        gradient: string;
        ring: string;
    };
}

export type CategoryThemeMap = Record<string, CategoryTheme>;

export const categoryThemes: CategoryThemeMap = {
    // ─── CONDITIONS ──────────────────────────────────────────────
    'anxiety': {
        label: 'Anxiety Disorders',
        colorFamily: 'teal',
        icon: CloudRain,
        shades: { 50: 'teal-50', 100: 'teal-100', 500: 'teal-500', 600: 'teal-600' },
        classes: {
            bg: 'bg-teal-500',
            bgLight: 'bg-teal-50',
            bgLightDark: 'dark:bg-teal-950/30',
            text: 'text-teal-600',
            textDark: 'dark:text-teal-400',
            border: 'border-teal-200',
            borderDark: 'dark:border-teal-800',
            spotlight: 'rgba(20, 184, 166, 0.15)',
            gradient: 'from-teal-400 to-teal-600',
            ring: 'ring-teal-500/40',
        },
    },
    'mood-disorders': {
        label: 'Mood Disorders',
        colorFamily: 'blue',
        icon: Moon,
        shades: { 50: 'blue-50', 100: 'blue-100', 500: 'blue-500', 600: 'blue-600' },
        classes: {
            bg: 'bg-blue-500',
            bgLight: 'bg-blue-50',
            bgLightDark: 'dark:bg-blue-950/30',
            text: 'text-blue-600',
            textDark: 'dark:text-blue-400',
            border: 'border-blue-200',
            borderDark: 'dark:border-blue-800',
            spotlight: 'rgba(59, 130, 246, 0.15)',
            gradient: 'from-blue-400 to-blue-600',
            ring: 'ring-blue-500/40',
        },
    },
    'trauma-stress': {
        label: 'Trauma & PTSD',
        colorFamily: 'rose',
        icon: Shield,
        shades: { 50: 'rose-50', 100: 'rose-100', 500: 'rose-500', 600: 'rose-600' },
        classes: {
            bg: 'bg-rose-500',
            bgLight: 'bg-rose-50',
            bgLightDark: 'dark:bg-rose-950/30',
            text: 'text-rose-600',
            textDark: 'dark:text-rose-400',
            border: 'border-rose-200',
            borderDark: 'dark:border-rose-800',
            spotlight: 'rgba(244, 63, 94, 0.15)',
            gradient: 'from-rose-400 to-rose-600',
            ring: 'ring-rose-500/40',
        },
    },
    'neurodiversity': {
        label: 'Neurodiversity',
        colorFamily: 'orange',
        icon: Brain,
        shades: { 50: 'orange-50', 100: 'orange-100', 500: 'orange-500', 600: 'orange-600' },
        classes: {
            bg: 'bg-orange-500',
            bgLight: 'bg-orange-50',
            bgLightDark: 'dark:bg-orange-950/30',
            text: 'text-orange-600',
            textDark: 'dark:text-orange-400',
            border: 'border-orange-200',
            borderDark: 'dark:border-orange-800',
            spotlight: 'rgba(249, 115, 22, 0.15)',
            gradient: 'from-orange-400 to-orange-600',
            ring: 'ring-orange-500/40',
        },
    },
    'personality-disorders': {
        label: 'Personality Disorders',
        colorFamily: 'violet',
        icon: Fingerprint,
        shades: { 50: 'violet-50', 100: 'violet-100', 500: 'violet-500', 600: 'violet-600' },
        classes: {
            bg: 'bg-violet-500',
            bgLight: 'bg-violet-50',
            bgLightDark: 'dark:bg-violet-950/30',
            text: 'text-violet-600',
            textDark: 'dark:text-violet-400',
            border: 'border-violet-200',
            borderDark: 'dark:border-violet-800',
            spotlight: 'rgba(139, 92, 246, 0.15)',
            gradient: 'from-violet-400 to-violet-600',
            ring: 'ring-violet-500/40',
        },
    },
    'addiction': {
        label: 'Addiction & Recovery',
        colorFamily: 'slate',
        icon: Anchor,
        shades: { 50: 'slate-50', 100: 'slate-100', 500: 'slate-500', 600: 'slate-600' },
        classes: {
            bg: 'bg-slate-500',
            bgLight: 'bg-slate-50',
            bgLightDark: 'dark:bg-slate-950/30',
            text: 'text-slate-600',
            textDark: 'dark:text-slate-400',
            border: 'border-slate-200',
            borderDark: 'dark:border-slate-800',
            spotlight: 'rgba(100, 116, 139, 0.15)',
            gradient: 'from-slate-400 to-slate-600',
            ring: 'ring-slate-500/40',
        },
    },
    'eating-disorders': {
        label: 'Eating Disorders',
        colorFamily: 'fuchsia',
        icon: Scale,
        shades: { 50: 'fuchsia-50', 100: 'fuchsia-100', 500: 'fuchsia-500', 600: 'fuchsia-600' },
        classes: {
            bg: 'bg-fuchsia-500',
            bgLight: 'bg-fuchsia-50',
            bgLightDark: 'dark:bg-fuchsia-950/30',
            text: 'text-fuchsia-600',
            textDark: 'dark:text-fuchsia-400',
            border: 'border-fuchsia-200',
            borderDark: 'dark:border-fuchsia-800',
            spotlight: 'rgba(217, 70, 239, 0.15)',
            gradient: 'from-fuchsia-400 to-fuchsia-600',
            ring: 'ring-fuchsia-500/40',
        },
    },
    'psychosis': {
        label: 'Psychosis & Schizophrenia',
        colorFamily: 'gray',
        icon: Activity,
        shades: { 50: 'gray-50', 100: 'gray-100', 500: 'gray-500', 600: 'gray-600' },
        classes: {
            bg: 'bg-gray-600',
            bgLight: 'bg-gray-50',
            bgLightDark: 'dark:bg-gray-950/30',
            text: 'text-gray-600',
            textDark: 'dark:text-gray-400',
            border: 'border-gray-200',
            borderDark: 'dark:border-gray-800',
            spotlight: 'rgba(107, 114, 128, 0.15)',
            gradient: 'from-gray-400 to-gray-600',
            ring: 'ring-gray-500/40',
        },
    },

    // ─── WELLNESS ────────────────────────────────────────────────
    'sleep': {
        label: 'Sleep & Rest',
        colorFamily: 'indigo',
        icon: BedDouble,
        shades: { 50: 'indigo-50', 100: 'indigo-100', 500: 'indigo-500', 600: 'indigo-600' },
        classes: {
            bg: 'bg-indigo-500',
            bgLight: 'bg-indigo-50',
            bgLightDark: 'dark:bg-indigo-950/30',
            text: 'text-indigo-600',
            textDark: 'dark:text-indigo-400',
            border: 'border-indigo-200',
            borderDark: 'dark:border-indigo-800',
            spotlight: 'rgba(99, 102, 241, 0.15)',
            gradient: 'from-indigo-400 to-indigo-600',
            ring: 'ring-indigo-500/40',
        },
    },
    'wellness': {
        label: 'Holistic Wellness',
        colorFamily: 'amber',
        icon: Sun,
        shades: { 50: 'amber-50', 100: 'amber-100', 500: 'amber-500', 600: 'amber-600' },
        classes: {
            bg: 'bg-amber-500',
            bgLight: 'bg-amber-50',
            bgLightDark: 'dark:bg-amber-950/30',
            text: 'text-amber-600',
            textDark: 'dark:text-amber-400',
            border: 'border-amber-200',
            borderDark: 'dark:border-amber-800',
            spotlight: 'rgba(245, 158, 11, 0.15)',
            gradient: 'from-amber-400 to-amber-600',
            ring: 'ring-amber-500/40',
        },
    },
    'mindfulness': {
        label: 'Mindfulness',
        colorFamily: 'emerald',
        icon: Leaf,
        shades: { 50: 'emerald-50', 100: 'emerald-100', 500: 'emerald-500', 600: 'emerald-600' },
        classes: {
            bg: 'bg-emerald-500',
            bgLight: 'bg-emerald-50',
            bgLightDark: 'dark:bg-emerald-950/30',
            text: 'text-emerald-600',
            textDark: 'dark:text-emerald-400',
            border: 'border-emerald-200',
            borderDark: 'dark:border-emerald-800',
            spotlight: 'rgba(16, 185, 129, 0.15)',
            gradient: 'from-emerald-400 to-emerald-600',
            ring: 'ring-emerald-500/40',
        },
    },
    'digital-wellbeing': {
        label: 'Digital Wellbeing',
        colorFamily: 'cyan',
        icon: Smartphone,
        shades: { 50: 'cyan-50', 100: 'cyan-100', 500: 'cyan-500', 600: 'cyan-600' },
        classes: {
            bg: 'bg-cyan-500',
            bgLight: 'bg-cyan-50',
            bgLightDark: 'dark:bg-cyan-950/30',
            text: 'text-cyan-600',
            textDark: 'dark:text-cyan-400',
            border: 'border-cyan-200',
            borderDark: 'dark:border-cyan-800',
            spotlight: 'rgba(6, 182, 212, 0.15)',
            gradient: 'from-cyan-400 to-cyan-600',
            ring: 'ring-cyan-500/40',
        },
    },

    // ─── LIFE & RELATIONSHIPS ────────────────────────────────────
    'relationships': {
        label: 'Relationships',
        colorFamily: 'pink',
        icon: Heart,
        shades: { 50: 'pink-50', 100: 'pink-100', 500: 'pink-500', 600: 'pink-600' },
        classes: {
            bg: 'bg-pink-500',
            bgLight: 'bg-pink-50',
            bgLightDark: 'dark:bg-pink-950/30',
            text: 'text-pink-600',
            textDark: 'dark:text-pink-400',
            border: 'border-pink-200',
            borderDark: 'dark:border-pink-800',
            spotlight: 'rgba(236, 72, 153, 0.15)',
            gradient: 'from-pink-400 to-pink-600',
            ring: 'ring-pink-500/40',
        },
    },
    'workplace': {
        label: 'Workplace Health',
        colorFamily: 'sky',
        icon: Briefcase,
        shades: { 50: 'sky-50', 100: 'sky-100', 500: 'sky-500', 600: 'sky-600' },
        classes: {
            bg: 'bg-sky-600',
            bgLight: 'bg-sky-50',
            bgLightDark: 'dark:bg-sky-950/30',
            text: 'text-sky-600',
            textDark: 'dark:text-sky-400',
            border: 'border-sky-200',
            borderDark: 'dark:border-sky-800',
            spotlight: 'rgba(14, 165, 233, 0.15)',
            gradient: 'from-sky-400 to-sky-600',
            ring: 'ring-sky-500/40',
        },
    },
    'parenting': {
        label: 'Parenting',
        colorFamily: 'lime',
        icon: Home,
        shades: { 50: 'lime-50', 100: 'lime-100', 500: 'lime-500', 600: 'lime-600' },
        classes: {
            bg: 'bg-lime-500',
            bgLight: 'bg-lime-50',
            bgLightDark: 'dark:bg-lime-950/30',
            text: 'text-lime-600',
            textDark: 'dark:text-lime-400',
            border: 'border-lime-200',
            borderDark: 'dark:border-lime-800',
            spotlight: 'rgba(132, 204, 22, 0.15)',
            gradient: 'from-lime-400 to-lime-600',
            ring: 'ring-lime-500/40',
        },
    },
    'grief': {
        label: 'Grief & Loss',
        colorFamily: 'stone',
        icon: CloudFog,
        shades: { 50: 'stone-50', 100: 'stone-100', 500: 'stone-500', 600: 'stone-600' },
        classes: {
            bg: 'bg-stone-500',
            bgLight: 'bg-stone-50',
            bgLightDark: 'dark:bg-stone-950/30',
            text: 'text-stone-600',
            textDark: 'dark:text-stone-400',
            border: 'border-stone-200',
            borderDark: 'dark:border-stone-800',
            spotlight: 'rgba(120, 113, 108, 0.15)',
            gradient: 'from-stone-400 to-stone-600',
            ring: 'ring-stone-500/40',
        },
    },
    'anger': {
        label: 'Anger Management',
        colorFamily: 'red',
        icon: Flame,
        shades: { 50: 'red-50', 100: 'red-100', 500: 'red-500', 600: 'red-600' },
        classes: {
            bg: 'bg-red-500',
            bgLight: 'bg-red-50',
            bgLightDark: 'dark:bg-red-950/30',
            text: 'text-red-600',
            textDark: 'dark:text-red-400',
            border: 'border-red-200',
            borderDark: 'dark:border-red-800',
            spotlight: 'rgba(239, 68, 68, 0.15)',
            gradient: 'from-red-400 to-red-600',
            ring: 'ring-red-500/40',
        },
    },

    // ─── IDENTITY ────────────────────────────────────────────────
    'mens-health': {
        label: "Men's Mental Health",
        colorFamily: 'blue',
        icon: UserRound,
        shades: { 50: 'blue-50', 100: 'blue-100', 500: 'blue-600', 600: 'blue-700' },
        classes: {
            bg: 'bg-blue-600',
            bgLight: 'bg-blue-50',
            bgLightDark: 'dark:bg-blue-950/30',
            text: 'text-blue-600',
            textDark: 'dark:text-blue-400',
            border: 'border-blue-200',
            borderDark: 'dark:border-blue-800',
            spotlight: 'rgba(37, 99, 235, 0.15)',
            gradient: 'from-blue-500 to-blue-700',
            ring: 'ring-blue-600/40',
        },
    },
    'womens-health': {
        label: "Women's Mental Health",
        colorFamily: 'rose',
        icon: Flower2,
        shades: { 50: 'rose-50', 100: 'rose-100', 500: 'rose-400', 600: 'rose-500' },
        classes: {
            bg: 'bg-rose-400',
            bgLight: 'bg-rose-50',
            bgLightDark: 'dark:bg-rose-950/30',
            text: 'text-rose-500',
            textDark: 'dark:text-rose-400',
            border: 'border-rose-200',
            borderDark: 'dark:border-rose-800',
            spotlight: 'rgba(251, 113, 133, 0.15)',
            gradient: 'from-rose-300 to-rose-500',
            ring: 'ring-rose-400/40',
        },
    },
    'lgbtq': {
        label: 'LGBTQ+ Support',
        colorFamily: 'purple',
        icon: Sparkles,
        shades: { 50: 'purple-50', 100: 'purple-100', 500: 'purple-500', 600: 'purple-600' },
        classes: {
            bg: 'bg-purple-500',
            bgLight: 'bg-purple-50',
            bgLightDark: 'dark:bg-purple-950/30',
            text: 'text-purple-600',
            textDark: 'dark:text-purple-400',
            border: 'border-purple-200',
            borderDark: 'dark:border-purple-800',
            spotlight: 'rgba(168, 85, 247, 0.15)',
            gradient: 'from-purple-400 to-purple-600',
            ring: 'ring-purple-500/40',
        },
    },

    // ─── THERAPY ─────────────────────────────────────────────────
    'therapy-types': {
        label: 'Types of Therapy',
        colorFamily: 'teal',
        icon: MessageCircle,
        shades: { 50: 'teal-50', 100: 'teal-100', 500: 'teal-600', 600: 'teal-700' },
        classes: {
            bg: 'bg-teal-600',
            bgLight: 'bg-teal-50',
            bgLightDark: 'dark:bg-teal-950/30',
            text: 'text-teal-700',
            textDark: 'dark:text-teal-400',
            border: 'border-teal-200',
            borderDark: 'dark:border-teal-800',
            spotlight: 'rgba(13, 148, 136, 0.15)',
            gradient: 'from-teal-500 to-teal-700',
            ring: 'ring-teal-600/40',
        },
    },
    'medication': {
        label: 'Medication',
        colorFamily: 'blue',
        icon: Pill,
        shades: { 50: 'blue-50', 100: 'blue-100', 500: 'blue-400', 600: 'blue-500' },
        classes: {
            bg: 'bg-blue-400',
            bgLight: 'bg-blue-50',
            bgLightDark: 'dark:bg-blue-950/30',
            text: 'text-blue-500',
            textDark: 'dark:text-blue-300',
            border: 'border-blue-200',
            borderDark: 'dark:border-blue-800',
            spotlight: 'rgba(96, 165, 250, 0.15)',
            gradient: 'from-blue-300 to-blue-500',
            ring: 'ring-blue-400/40',
        },
    },
};

/** Fallback theme for unknown category slugs */
export const defaultCategoryTheme: CategoryTheme = {
    label: 'General',
    colorFamily: 'gray',
    icon: Brain,
    shades: { 50: 'gray-50', 100: 'gray-100', 500: 'gray-500', 600: 'gray-600' },
    classes: {
        bg: 'bg-gray-500',
        bgLight: 'bg-gray-50',
        bgLightDark: 'dark:bg-gray-950/30',
        text: 'text-gray-600',
        textDark: 'dark:text-gray-400',
        border: 'border-gray-200',
        borderDark: 'dark:border-gray-800',
        spotlight: 'rgba(107, 114, 128, 0.15)',
        gradient: 'from-gray-400 to-gray-600',
        ring: 'ring-gray-500/40',
    },
};

// ─── HELPER FUNCTIONS ────────────────────────────────────────────

/** Get the full theme for a category by slug. Always returns a valid theme. */
export function getCategoryTheme(slug: string): CategoryTheme {
    return categoryThemes[slug] ?? defaultCategoryTheme;
}

/** Get just the pre-computed classes for a category slug. */
export function getCategoryClasses(slug: string): CategoryTheme['classes'] {
    return getCategoryTheme(slug).classes;
}

/** Get the Lucide icon component for a category slug. */
export function getCategoryIcon(slug: string): LucideIcon {
    return getCategoryTheme(slug).icon;
}

/** Get the spotlight RGBA string for InteractiveCard. */
export function getCategorySpotlight(slug: string): string {
    return getCategoryTheme(slug).classes.spotlight;
}

/**
 * Get Badge-compatible inline className for a category.
 * Returns bgLight + text classes to pass to Badge's className prop,
 * avoiding the need to extend BadgeVariant for all 22 categories.
 */
export function getCategoryBadgeClasses(slug: string): string {
    const { bgLight, bgLightDark, text, textDark } = getCategoryTheme(slug).classes;
    return `${bgLight} ${bgLightDark} ${text} ${textDark}`;
}
